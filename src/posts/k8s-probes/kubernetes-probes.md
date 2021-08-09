![image](/images/k8s-probes/kubernetes-probes.png)

## Kubernetes Probes -  Never let your production environment go down during deployment

###### **Aug 09, 2021**

Software development teams which work in an Agile mode often focus on speeding up the deployment process and these deployments are quite frequent.

### First things first:

The reader is expected to have a very basic understanding of [Kubernetes(k8s)](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/), [Docker](https://docs.docker.com/get-started/overview/) and [containers](https://www.docker.com/resources/what-container). This blog post assumes the deployment of the application is happening in a k8s cluster. The deployment strategy can be assumed to be in rolling update fashion.(It’s beyond the scope of this post).

Trying to keep it as simple as possible even if the reader is new to these terms.

### The need:

With great power, comes great responsibility! When the builds and deployments are backed up by CI/CD pipelines, one has to be vigilant about the production environment not going down while deploying the changes. But we often end up in scenarios where the new instances of your application gets deployed and the production environment is puff !! … just gone !!

There could be many reasons why this happened — new instances get crashed, problem with re-balancing the data if application is state full etc.

        An ounce of prevention is worth a pound of cure
        — Benjamin Franklin

Ain’t it better and easier to stop a problem from happening than stopping it or correcting it after it has started ?

And that is where k8s probes come to rescue us from the chaos. There are three types of probes one can implement — `Liveness`, `Readiness`, `Startup`

### Common ground:

This section tries to set a common ground for all the readers with a basic context to make the post more inclusive. (You can skip this section if you know below terms. Below definitions are taken from k8s documentation. )

**Kubelet:** The [kubelet](https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/) is the primary “node agent” that runs on each node. It can register the node with the apiserver. The kubelet works in terms of a PodSpec. A PodSpec is a YAML or JSON object that describes a pod. The kubelet takes a set of PodSpecs that are provided through various mechanisms (primarily through the apiserver) and ensures that the containers described in those PodSpecs are running and healthy. The kubelet doesn’t manage containers which were not created by Kubernetes.

**Liveness Probe:** The kubelet uses liveness probes to know when to restart a container. For example, liveness probes could catch a deadlock, where an application is running, but unable to make progress. Restarting a container in such a state can help to make the application more available despite bugs.

**Readiness Probe:** The kubelet uses readiness probes to know when a container is ready to start accepting traffic. A Pod is considered ready when all of its containers are ready. One use of this signal is to control which Pods are used as backends for Services. When a Pod is not ready, it is removed from Service load balancers.

---

### Implementation:

That was enough of a theory now ! Let’s take a look implementing these probes are testing them on a developer’s machine(typically referred as local environment).

Below is the summary of what we are going to do as part of implementation:

1. Create an application.
2. Figure out the health end points of the application or create custom health end points.
3. Setting up k8s and minikube.
4. Build a docker image of this application.
5. Create a k8s deployment for above docker image.
6. Implement the probes in the deployment configuration.
7. Update the deployment.
8. Test the probes.

### Create an application:

Head over to [Spring Initializr](https://start.spring.io/) and create a Spring boot application with build automation tool of your choice. Add only two dependencies — `Spring Web` and `Spring Boot Actuator`. Actuator exposes default health end points through in the path — `actuator/health`

**Note:** Here a spring boot application is deliberately chosen to demonstrate as it has a slower startup time and this helps us in taking a look at what probes are doing from the logs.

Run the application in your local machine, fire up the browser and check the health status of your application using the endpoint below.

```
https://start.spring.io/
```

This point should return HTTP.200 OK status with — `{“status”:”UP”}`. If not, check the port, it could be running on a different port. (My server.port is configured to 8060)

## Setting up k8s and minikube:

Install docker desktop, k8s and minikube based on your OS.

Docker: https://www.docker.com/products/docker-desktop

k8s: https://kubernetes.io/releases/download/

minikube: https://minikube.sigs.k8s.io/docs/start/

minikube is local Kubernetes, focusing on making it easy to learn and develop for Kubernetes.

## Build a docker image of this application:

Start docker desktop.

Start your minikube (Requires docker to be running in your desktop.)

```shell
minikube start
```

### Create a k8s deployment for above docker image.

You can create deployments in minikube with out pushing your docker images to any public repository. Setting up an environment variable is the key for this.

```shell
eval $(minikube docker-env)
```

Go to the root folder of your application code and create a docker image. This creates a docker image with name `spring-k8s-docker`

```shell
docker build -t spring-k8s-docker .
```

You should now be able to see the image in the listing by running `docker image ls`

In the same root folder, now create a deployment file for the image we created using previous command with name deployment.yaml using below command. It creates a basic deployment configuration for you.

```shell
kubectl create deployment spring-k8s --image=spring-k8s-docker --dry-run -o=yaml > deployment.yaml
```

You should be able to see a `deployment.yaml` file with below configuration in your code base.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  creationTimestamp: null
  labels:
    app: spring-k8s
  name: spring-k8s
spec:
  replicas: 1
  selector:
    matchLabels:
      app: spring-k8s
  strategy: {}
  template:
    metadata:
      creationTimestamp: null
      labels:
        app: spring-k8s
    spec:
      containers:
        - image: spring-k8s-docker
          name: spring-k8s-docker
          resources: {}
status: {}
```

The `imagePullPolicy` pull policy has to be updated to `never` for this deployment to run in minikube. Update the above config file by adding `imagePullPolicy` under `spec → containers → ..`
Also, Update the `replicas` in above config file to `3`.

```yaml
# rest of the config file remains same. Only add imagePullPolicy.
spec:
  containers:
    - image: spring-k8s-docker
      name: spring-k8s-docker
      imagePullPolicy: Never
      resources: {}
```

Now apply this deployment with below command. This creates a deployment in `spring-k8s` name space of the minikube.

```shell
kubectl apply -f deployment.yaml
```

This creates the deployments and runs the pods immediately. To get the pods information, use the command below.

```shell
kubectl get pods
```

Once, you run this you should be able to see the out come similar to below in your terminal.

```
➜spring-k8s kubectl get pods
NAME                          READY   STATUS    RESTARTS   AGE
spring-k8s-7fb746575f-499p2   1/1     Running   0          3s
spring-k8s-7fb746575f-7cvc7   1/1     Running   0          3s
spring-k8s-7fb746575f-q4qz2   1/1     Running   0          35s
➜spring-k8s
```

Now, this is the problem us. What if the new pods are not ready to take the traffic, this is just running the pods right away, we don’t want that.This can bring down the production environment.

To look into the logs of any pod running above, run the below command.

```shell
kubectl logs -f spring-k8s-7fb746575f-499p2
```

Logs should look normal as they got deployed and running successfully.

### Implement the probes in the deployment configuration:

Add probes to the `deployment.yaml` file. The updated deployment.yaml is below.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  creationTimestamp: null
  labels:
    app: spring-k8s
  name: spring-k8s
spec:
  replicas: 4
  selector:
    matchLabels:
      app: spring-k8s
  strategy: {}
  template:
    metadata:
      creationTimestamp: null
      labels:
        app: spring-k8s
    spec:
      containers:
        - image: spring-k8s-docker
          name: spring-k8s-docker
          imagePullPolicy: Never
          resources: {}
          readinessProbe:
            httpGet:
              scheme: HTTP
              path: actuator/health
              port: 8060
            failureThreshold: 3
            periodSeconds: 10
          livenessProbe:
            httpGet:
              path: actuator/health
              port: 8060
            failureThreshold: 3
            periodSeconds: 10
          startupProbe:
            httpGet:
              scheme: HTTP
              path: actuator/health
              port: 8060
            failureThreshold: 12
            periodSeconds: 10

status: {}
```

**Note:** The paths and ports used in each probe can you different according to what end point your applications is exposing for health checks. They could be custom end points as well.

### Update the deployment:

Apply the above deployment configuration.

```shell
kubectl apply -f deployment.yaml
```

### Test the pods:

Now, k8s pods will not run all the pods immeidately. It will wait for the start probe, checks the liveness using liveness probe configuration and similarly readiness.

Try getting the running pods and you can see the delayed start up of each pod.

### Conclusion

And yes !! your probes are configured. You should not see your production environment going down anymore during your deployments as the probes will not replace the existing healthy probes unless they find the new instances are ready and able to take the traffic.

### Few exercises for the reader:

1. Try misconfiguring the health check end points in the readiness probe (any other probe too). Check if the new pods are replacing the existing pods or not. Bring up the logs to see what is happening inside the the pods when the health check end points are misconfigured.

2. Try deleting a healthy pod `kubectl delete pod <pod_name>` . Checkout what liveness probe does for you:)

3. Play around with `failureThreshold`, `periodSeconds` and figure out what is the most optimal configuration based on your application’s startup time.

## Clean up:

Delete the name space. This deletes all the resources under that name space.

```shell
kubectl delete -n default deployment spring-k8s
```

Stop the minikube

```shell
minikube stop
```

## Credits:

[Prabhu Jayakumar](https://www.linkedin.com/in/prabhu43/) for his valuable inputs.

## References :

[Getting Started | Spring Boot Kubernetes](https://spring.io/guides/gs/spring-boot-kubernetes/)

[Getting Started | Spring Boot with Docker](https://spring.io/guides/gs/spring-boot-docker/)

[linux — How to use local docker images with Minikube? — Stack Overflow](https://stackoverflow.com/questions/42564058/how-to-use-local-docker-images-with-minikube)

[Configure Liveness, Readiness and Startup Probes | Kubernetes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/)

[You (probably) need liveness and readiness probes | Red Hat Developer](https://developers.redhat.com/blog/2020/11/10/you-probably-need-liveness-and-readiness-probes#example_4__putting_it_all_together)

[Deploy to Kubernetes | Docker Documentation](https://docs.docker.com/get-started/kube-deploy/)

[Kubernetes deployment strategies](https://blog.container-solutions.com/kubernetes-deployment-strategies)
