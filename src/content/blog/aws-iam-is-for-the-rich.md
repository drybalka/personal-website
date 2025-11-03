---
title: AWS IAM is for the rich
date: 2025-11-01
---

Not so long ago I have participated in a workshop covering STACKIT cloud provider, which positions itself as one of the smaller European alternatives to AWS, similar to Scaleway and Exoscale.
In the discussion round afterwards a common opinion was that while STACKIT covers most of the cloud essentials like storage, managed databases, and kubernetes, it unfortunately lacks a sophisticated access management system like AWS IAM.
This was generally perceived as a sign of immaturity and afterthought-like approach to security on the platform.
I personally was somewhat surprised by this attitude as I've always regarded IAM to be confusing, overly complicated, and frankly more of nuisance most of the time.

AWS and STACKIT follow two distinct philosophies when it comes to access management.
AWS is "Zero Trust" by default and nothing can access anything without an explicit permission.
In practice this results in dozens of lines of CloudFormation/Terraform code creating and attaching various policies and roles just to connect two resources with each other.
On the other hand, STACKIT and others follow a simplified "Trust within Boundary" approach, where resources in the same project trust each other.
And while on paper the former sounds more secure, I would argue only a handful of cloud clients really benefit from it.

As wise Alberto says, one should concentrate efforts on things that bring the most value.
And in my subjective list of priorities the advanced granular access management stands deeply below a robust ci/cd pipeline, thought out and documented architecture, functioning deployment scripts, backup strategy, updated dependencies, logging and monitoring, properly configured CSRF/CSP/CORS, etc..
So yes, if your development setup is advanced enough to have all of the above covered and the project itself is complex enough to have multiple entry points and independent data flows, then AWS IAM may be a powerful security tool for you.
I guess Amazon itself (with all Kindle, Prime Video and other services) and its vast engineering team fits this description perfectly and they must be perfectly happy with the full power and complexity of IAM.
For all the other smaller and more focused projects it might just be an overkill that solves a problem they don't have.

I would like to think that this is the reason why the newer cloud providers went with the simplified approach - not as an oversight or a flaw, but as a lesson learned.
