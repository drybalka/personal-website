---
title: Learning AWS with hello-world projects
date: 2023-11-09
---

Until a few months ago cloud technologies were a mystery to me.
I knew they were very important and widely used, but the sheer number of different services and a non-zero chance to cause a multi-thousand euro bill somehow always put me off.
If you have the same doubts then maybe this post will help you.

I have to confess, I am a terrible visual and auditory learner.
In order to learn something I need to do it myself, in my own tempo.
Therefore, in my self-educational effort I decided to challenge myself with a few hello-world-like projects that connect only a few essential services.
Below I gather a few tips on where to start with AWS and provide a list of my projects for your inspiration.

### Preparations

Information on how to sign up for a free tier and install aws-cli is quite easy to find and follow.
After that I suggest that you browse the actual [AWS documentation](https://docs.aws.amazon.com/index.html), where you can find a Developer Guide for any AWS service.
Outside this documentation I found the learning resources from AWS to be quite chaotic: there are workshops, tutorials, courses, walkthroughs, blogs, and plenty of other resources that are disconnected, non-searchable, dispersed over different domains, and may even contain outdated information.
In addition to the AWS services themselves some of the projects require a basic knowledge of Docker, so you may want to somewhat familiarize yourself with it first (it is not very complicated).

If you want to start with some theory then I highly recommend taking the free [Cloud Practitioner Essentials](https://explore.skillbuilder.aws/learn/courses/134/aws-cloud-practitioner-essentials) course.
There you will get an eagle-eye overview of the AWS cloud and different services it provides.
In addition to that I also quite enjoyed the [Developer Guide to Serverless](https://docs.aws.amazon.com/serverless/latest/devguide/welcome.html) architecture where they explain how to build your systems to run without the need to manage servers (whether this is a good idea or not is a separate issue).

For each project I advise to start with glancing through documentation.
Oftentimes it will contain a tutorial that describes what and how is to be done in order to finish the project.
Because of this I would also advise to complete them using the Console, i.e., AWS web-based interface.
After you already feel comfortable with the services you may try switching to the command line interface (aws-cli) or doing a few projects using either the cloud development kit (aws-cdk) or Terraform, as both are quite popular in the real development work for managing Infrastructure as Code (IaC).
I would also advise prefixing all the created resources, as it makes subsequent usage and cleaning up much easier.

### Projects

The list of projects in the approximate logical order and order of complexity:

- **[S3]** - Create a new S3 bucket and manually add/delete files from it
- **[Lambda]** - Write a hello-world Lambda function
- **[Lambda, S3]** - Invoke Lambda on a file upload to S3 bucket
- **[Lambda, API Gateway]** - Build a hello-world REST API with Lambda
- **[Lambda, DynamoDB]** - Create a DynamoDB table and write a Lambda function capable of reading from and writing to it
- **[VPC]** - Set up a VPC with a subnet, routing, and security groups such that instances in it are only accessible from your ip address (I spent quite a bit of time here trying to understand how all of it works together). You should use this VPC in the projects below.
- **[VPC, EC2]** - Host a hello-world website on an EC2 instance with assigned (and then elastic) public ip address (such that it is accessible only from your ip)
- **[VPC, EC2, ELB]** - Use Elastic Load Balancer (ELB) to split traffic between EC2 instances in different AZ
- **[VPC, Route 53, S3/EC2/ELB]** - Use Route 53 to link a hello-world website. This can be either a static webpage on S3 bucket, or HTTP server on EC2 instance, or even ELB.
- **[VPC, Route 53, S3/EC2/ELB]** - Host a hello-world website like in previous step, but this time with SSL encryption.
- **[Fargate]** - Host a hello-world website using Fargate (ECS)

> Don't forget to clean up the created resources after yourself after each project - this saves costs and is simply the right thing to do!

In the process of working through these projects you will inevitably come into contact with other essential AWS services that have a more supporting role, such as Identity and Access Management (IAM) for creating/modifying roles and permissions for your resources or AWS CloudWatch for looking through logs.

Of course the list of covered services is far from being comprehensive, but with such a start I already feel comfortable in my ability to learn any other service.
