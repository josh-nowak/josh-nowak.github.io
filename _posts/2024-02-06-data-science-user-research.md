---
title: The role of data science in elevating user research
date: 2024-02-06 17:30:00 +0100
categories: [Trends]
render_with_liquid: false
image: 
    path: /assets/img/ur_ds.webp
---


User research and data science emerged as distinct fields, but are moving closer together these days. Both are “insights disciplines” aimed at improving business decisions based on information about users or customers. They differ with respect to the questions in focus and the approaches used to answer these questions.

The intersection is particularly strong when looking at **quantitative user research**. Often, user research relies on qualitative methods such as user interviewing or (qual.) usability testing, and this seems to remain the main differentiator to other insights roles (e.g, data analysts, BI people). However, the field of quantitative user research has grown and gained visibility in recent time. In my subjective perception, this was accelerated by the *[Quant UX Conference](https://www.quantuxcon.org/)* that was first held in 2022 and the release of the book *[Quantitative User Experience Research](https://link.springer.com/book/10.1007/978-1-4842-9268-6)* (Chapman & Rodden, 2023).

Lines start to blur when **comparing quantitative user research and data science**. Folks at Meta and Pinterest have already laid out [clear](https://medium.com/meta-research/how-quantitative-ux-research-differs-from-data-analytics-1bbf0903768b) [thoughts](https://pinterest.design/what-is-quantitative-user-experience-research-at-pinterest-8eb17c69a0fc) on this. Here are some key points:

- Quantitative user research tends to take a **human-centric perspective** when tackling business problems (i.e., considering users’ intentions, emotions, and context), while classic data science tends to focus on behavioral metrics that have a less mediated connection to business outcomes (e.g., conversion or retention rates).
- These different approaches are reflected in the **type of data** being analyzed. Quantitative user researchers more often rely on survey data in addition to behavioral data, which allows viewing user actions in their psychological and social context. Skills in survey design and psychometrics are therefore quite useful in quantitative user research.
- Apart from these key differences, both disciplines make use of similar methods and tools, such as logs analysis, statistical modeling, and machine learning.

Quantitative user research could be seen as the result of infusing classical user research with data science techniques, while maintaining the characteristic user-centered perspective.

# How to apply data science skills as a user researcher

Roles explicitly titled "*quantitative* user researcher" are pretty rare, but learning some data science skills can be useful for any user researcher. It can improve your workflow and allows investigating new types of research questions. Below are some of the most common ways of applying data science skills in user research that I have encountered so far.

## 1. Pull all the user data you need

For many user research projects, you’ll want to look at data from existing users. If you don’t have database access, obtaining the right data can be a waiting game. In an ideal scenario, there might be a data analyst available to help you. In reality though, data teams are often busy prioritizing among many requests, and it can take a few iterations to obtain the exact data in the right form that you had in mind.

Learning a bit of SQL to write your own database queries can go a long way. Not only does this allow you to pull any data when you need it—you also learn what user data exists in your organization and how it’s structured. Here’s a [great SQL tutorial](https://sqlbolt.com/) that teaches all the basic concepts interactively, no installation required. 

## 2. Craft advanced visualisations

When building charts in Excel or Google Sheets, you’ll often run into frustrating limitations and find yourself repeatedly tweaking chart elements manually. Libraries like [ggplot2](https://ggplot2.tidyverse.org/reference/ggplot.html) for R or [plotly](https://plotly.com/python/) for Python offer more freedom and control. You get access to a wider range of chart types, customization options, and sometimes interactivity (e.g., in the case of plotly). There is an initial learning hurdle when picking up these tools, but the benefits outweigh this after a while. Creating data visualizations this way also forces you to think through each chart individual element, considering the “grammar of graphics”, and decide which design will be most effective to get the right story across. Note that there is always the danger of over-engineering things. Sometimes, a simple Excel bar chart is all you need.

## 3. Keep things tidy and repeatable

Did you ever look back at a project and wonder how you got to a specific number? Without proper documentation, things get messy fast and people can lose trust in the insights. Handling your workflow programatically (like in Python or R) ensures that all steps of data processing, analysis, modeling, and visualization are reproducible and understandable. This does not only boost your rigor but also makes your job easier with recurring tasks (say, a weekly customer satisfaction report).

## 4. Segment your users with clustering techniques

A common task for user researchers is tackling some version of the question “Who are our users?”. The answer usually takes the form of user profiles, archetypes, personas, or segments, all of which need to rely on both qualitative and quantitative data. As a starting point, it can be interesting to look at natural groupings that emerge in a user base—for example, based on behavioral (logs) and/or attitudinal (survey) data. This can be done with clustering algorithms such as k-means, k-medoids, etc., which help discover groups of similar users and the attributes that differentiate between them.

## 5. Skim through feedback with natural language processing (NLP)

It’s often hard to keep up with user feedback that pours in through various channels—be it surveys, service requests, or reviews on public platforms. There are of course commercial tools that promise relief, but you can build a simple version of such a tool yourself. Natural language processing (NLP) models for text classification, sentiment analysis, or summarization are readily available on platforms like [Hugging Face](https://huggingface.co/). You can adapt and combine these models according to your needs, and have them summarize your users’ comments. At the least, it can be a reference point for further analysis. This approach can also have privacy advantages if you run the whole analysis in-house rather than relying on a third-party tool.

## 6. Work better with data teams

Knowing a thing or two about data science can also help you collaborate more effectively with data analysts, scientists, and engineers. Even if you’re not doing the heaving lifting yourself, it’s helpful to know the general concepts and methods so that you get a sense of what’s possible, have more informed conversations, and work on more complex projects together. 

# Outlook

Data science skills have the potential to level up user research initiatives and might help in today’s tough job market as well. The use cases I mentioned above are the most obvious ones and there is certainly more to explore—perhaps in a future post. In the meantime, I’d love to hear how other people are combining user research and data science. [Send me an email](mailto:hi@joshua-nowak.com) if you feel like talking about this.