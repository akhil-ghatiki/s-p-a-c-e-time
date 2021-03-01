![image](/images/distributed-systems/distributed.png)

# Debugging the performance issue of a distributed system
###### *Jul 03, 2019*

Debugging the performance of a distributed system 
is always a pain. But on the other side of this
coin, you get a lot of learning, knowing the 
system better and this helps in building an
architectural mindset.

Recently, I have spent close to 2 weeks on 
debugging a performance issue of a distributed
system our team was developing. I am sharing my 
learning from this period in this blog post.

**First things first:**

I assume the reader has some knowledge 
of micro services, distributed systems 
and how critical would a performance issue 
of a distributed could be. From here on, 
“system” or “DS” represents a distributed system.

**Do not go gentle into that good night….. :**

Read this poem by Dylan Thomas [here](https://poets.org/poem/do-not-go-gentle-good-night) 
(Its my favourite poem). But yeah, coming 
back to debugging, I would say DO GO gentle 
into “this” good night. Don’t just jump into 
the implementation and crave for the fix of 
the issue. This is the first mistake one can 
do. Without analyzing the existing implementation 
of the system, the developer just dives to 
fix it. When you know the system better and if 
you have a clear understanding of the performance 
issue, you can have a slight guess about where the 
issue could be and what could be the bottleneck 
of this system. So, first, analyze the existing 
system.

**Capture the metrics of the existing system:**

This is crucial. Unless you know how well/bad the 
existing system is performing, you can’t proceed 
further. Leverage the power of logs and profiles 
of the system to capture the metrics. These metrics 
could be about the I/O operations, thread pool 
profiling, publishing data to another system or 
subscribing data from another system or could be 
as simple as a small API call. Keep a note of 
memory usage and CPU usage of the system. It would 
be great if you are using a tool like Splunk to 
get insights from your logs. Dashboards built 
using the logs of a DS are helpful when you are 
dealing with this type of issue. They drastically 
reduce the time you put in. Invest time in 
developing dashboards (Ex: Splunk Dashboards) 
while developing itself. They will save a lot 
of time later. Proceed further once you are quite 
clear about the existing performance.

**Are you messing with default configurations ?**

When you are dealing with a distributed system, 
at times we configure a few parts of this system 
with default configurations. Let’s take a small 
use case. If you are using Kafka or RabbitMQ as 
a messaging broker in your system, in general, 
we go ahead with a few default configurations. 
For example, some configurations like `fetch.min.
bytes`, `max.poll.records`, `fetch.max.wait.ms` etc 
of Kafka should be left to default configurations 
unless you are very sure that it is not your system 
that is the bottleneck for the performance. 
Default configurations are default for a reason, 
they are not just random figures. The team which 
developed Kafka might have tested it rigorously 
and came up with these defaults. So, think 
twice before changing the defaults.

**Chalk out the architecture:**

This helps a lot. Doesn’t your office have 
whiteboards? No big deal, grab a paper and 
sketch your DS. Try to include every minute 
detail of the system. The key aspects would 
be drawing out, which part of the system is 
communicating with which part. Include all the 
API calls happening, the messaging brokers if 
any. The more detailed your sketch is, the less 
time you are going to spend solving the issue. 
From this sketch mark out the points which could 
be affecting your system.

**It’s not always the game of instance count:**

Yes, when capturing the metrics of a DS. 
Stick on to one instance of the system . 
Spawning up multiple instances of the system to 
capture metrics might mislead the decision. 
Performance should always be talked per instance. 
So, fix the problem per instance before you 
scale up the count.

**Divide and Conquer:**

Here lies the key aspect of debugging the 
performance of a DS. Divide the whole system 
into smaller chunks (of course in your mind. 
That is why I asked to chalk it out in the 
previous section). Now, decommission one part 
at a time in your DS either by bringing down 
the service or just commenting out the code. 
Capture the metrics after that. Loop this in 
until you narrow down the problem to a 
particular part of your system. Now, conquer 
the issue.

**God Speed !!!!**
