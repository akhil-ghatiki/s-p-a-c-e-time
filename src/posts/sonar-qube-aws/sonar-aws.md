![image](/images/sonar-qube-aws/sonar-aws1.jpeg)

## One point stop for Installing SonarQube server in an AWS EC2 instance

###### _Jun 14, 2020_

Writing clean code is an art. It is a pathway towards software craftsman /craftswoman ship. But sometimes not every one is well equipped with this art. As the saying goes it takes 10,000 hours to master a skill. So, we need something that will enforce the developers of the team to write the code in a cleaner and secure way.

SonarQube is an amazing tool that helps in this regard. It helps us detect the code smells, potential bugs and security vulnerabilities in your code. It can integrate with your existing workflow to enable continuous code inspection across your project branches and pull requests.

SonarQube can be run in you local machine or as a docker container or can be hosted in a server. When the requirement is for having it for the whole team and planning to integrate in the CI pipeline, you have the only option of hosting it in the server. In this write out we will be walking through hosting it in an AWS EC2 instance.

**First things first:**

The reader is expected to have a very basic understanding of cloud, servers, CI/CD, CLI , database.Familiarity with AWS ecosystem is good to have. Trying to keep it as simple as possible even if the reader is new to these terms.

---

**Spawning up an AWS EC2 instance:**

Create a AWS EC2 instance. Just putting out the screen shot of configuration as the intention of this write out is not inclined more towards creating EC2 instance.

![image](/images/sonar-qube-aws/sonar-aws2.png)

**Important note :** Be careful while choosing the Amazon Machine Image(AMI). Choose **Amazon Linux AMI 2018.03.0** (ami-005956c5f0f757d37). This image includes PostgreSql which we are going to use in further steps.

![image](/images/sonar-qube-aws/sonar-aws3.png)

Download the **“.pem file”** while creating the instance and save it in your machine. This is required to ssh into the instance in the further steps.

---

### Installing SonarQube server in the above created instance:

**SSHing into the instance :**

Connect to the EC2 instance using a secure shell. Thanks to the jumpbox server that lets us do this.

`ssh -i <<path to your .pem file>> ec2-user@<<ip address of your EC2>>`

**Setup PostgreSql :**
We have to setup a database for sonarqube to save the report analysis. This helps in maintaining the report versions as well. The supported databases include Oracle, Microsoft SQL server and PostgreSQL. We will be going ahead with PostgreSQL here.

`sudo yum install postgre96 postgresql96-server`

**Note :** Install the version higher than 9.3. The default version that gets installed if you do not mention the version in command will be 9.3 and this is not supported by SonarQube.

If you are going ahead with different AMI other than the above mentioned, checkout the supporting postgresql versions in this [link](https://www.postgresql.org/download/).

The below commands are self explanatory. Run them in this order:

```
sudo service postgresql96 initdb //creating a new postgre cluster

sudo service postgresql96 start  // starting the postgre sevice

sudo passwd postgres  // changing the password of the default server

su — postgres // login with the new password

psql // start the shell
```

**Create a user and database for sonar:**

```
CREATE USER sonar WITH ENCRYPTED PASSWORD ‘sonar_password’;

CREATE DATABASE sonarqube;

GRANT ALL PRIVILEGES ON DATABASE sonarqube to sonar
```

Now we need to edit the authentication modes of postgresql.

**Open the file in below path in vim :**

`sudo vi /var/lib/pgsql96/data/pg_hba.conf`

Change the modes as shown below: (Highlighted in block letters)

```
TYPE DATABASE USER ADDRESS METHOD
# “local” is for Unix domain socket connections only
local all sonar md5

local all all peer

# IPv4 local connections:

host all all 127.0.0.1/32 md5

# IPv6 local connections:

host all all ::1/128 md5
```

Restart the postgreSQL server to have the new authentication modes applied.

`sudo service postgresql96 restart`

---

### Installing OpenJDK11

We need JDK 11 or higher to run SonarQube 7.9 or more. The AWS EC2 instance comes with Amazon’s corretto distribution of java. But better stick to openJDK.

Download the zip in the instance:

`curl -O https://download.java.net/java/GA/jdk11/13/GPL/openjdk-11.0.1_linux-x64_bin.tar.gz`

Extract the zip:

`tar zxvf openjdk-11.0.1_linux-x64_bin.tar.gz`

Move the folder to your required location (This optional)

`sudo mv jdk-11.0.1 /usr/local/`

Change the access of the JDK folder:

`sudo chmod -R 755 /usr/local/jdk-11.0.1`

Add java home path:

`export JAVA_HOME=/usr/local/jdk-11.0.1export PATH=$JAVA_HOME/bin:$PATH`

check the java version:

`java -version`
This should show up the installed java version in the instance

---

### Installing the SonarQube

We are going to download the binaries and use them to install.

**Note:** Please be careful about the edition that you are going to install. Sonarqube comes in community, developer and enterprise editions.

We are going to use community edition in this write out. More details can be found here in [this link](https://www.sonarqube.org/downloads/). Right click on the respective download button and choose copy link location if you aim to install other edition.

Download the binaries:

`wget https://binaries.sonarsource.com/Distribution/sonarqube/sonarqube-8.3.1.34397.zip`

Unzip the binaries:

`unzip sonarqube-8.3.1.34397.zip`

Move the file path to desired location:

`sudo mv -v sonarqube-8.3.1.34397/* /opt/sonarqube`

Create a group for sonar users:

`sudo groupadd sonar`

Create a user:

`sudo useradd -c “Sonar System User” -d /opt/sonarqube -g sonar -s /bin/bash sonar`

Activating the user with password:

`sudo passwd sonar`

Add sonar user to EC2 user:

`sudo usermod -a -G sonar ec2-user`

    Exit from ec2-user bash and reconnect to the server to load new group for ec2-user

Change the ownership of all the sonar files to the sonar user:

`sudo chown -R sonar:sonar /opt/sonarqube`

Change file access privileges:

`sudo chmod -R 775 /opt/sonarqube`

---

### Configuring the SonarQube server:

Set run as user:

`sudo vi /opt/sonarqube/bin/linux-x86–64/sonar.sh`

    Find the line RUN_AS_USER, uncomment it by removing the pound sign and enter sonar user as the value below

`RUN_AS_USER=sonar`

Modify the sonar.properties to add the details of postgreSQL:

`sudo vi /opt/sonarqube/conf/sonar.properties`

Add jdbc user name and password:

`sonar.jdbc.username=sonar`
`sonar.jdbc.password=sonar_password`

Uncomment Postgres driver property.Remove current schema param if you are not using a custom schema for SonarQube database

`sonar.jdbc.url=jdbc:postgresql://localhost/sonarqube`

set a path for dedicated volume with fast io for Elasticsearch data storage

`sonar.path.data=/path/to/fast/io/volume/data`
`sonar.path.temp=/path/to/fast/io/volume/temp`

Start the server:

`$/opt/sonarqube/bin/linux-x86–64/sonar.sh start`

If you want to log the server logs in the terminal go for:

`$/opt/sonarqube/bin/linux-x86–64/sonar.sh console`

Yikes !! Your sonar should be up now. You can access the sonarQube UI at

`http://<<EC2 instance public ip>>:9000/sonarqube`

### Considerations:

We have installed the PostgreSQL within the instance. This kind off makes it a stateful and introduces a single point of failure of the database if the EC2 instance goes down. Consider using AWS RDS to to configure in place of internal DB like we did here. This will help in persisting even if the instance goes down. Once the new instance connects back to db in AWS RDS, you have everything back.

### Conclusion:

Tried to cover all the mistakes which were encountered while installing SonarQube in EC2. Hope this helps someone not to recommit them!

God Speed!!!

**References used to write this:**

https://stackoverflow.com/questions/44658510/setting-up-sonarqube-on-aws-using-ec2

https://medium.com/@mkaschke/how-to-install-sonarqube-on-aws-ec2-20e3a2fec634

https://medium.com/@harith.sankalpa/a-complete-guide-to-install-sonarqube-server-in-amazon-linux-ed1fee227d81

https://docs.sonarqube.org/latest/setup/install-server/

