---
title: "Electify: Can AI help voter decision-making?"
description: "Thoughts and lessons learned from my final project at Data Science Retreat."
date: "May 25 2024"
draft: false
---

Electify is an AI-based web app I built with [Christian Liedl](https://www.linkedin.com/in/christian-liedl-2aaa03133/) and [Anna Neifer](https://www.linkedin.com/in/anna-neifer/) at [Data Science Retreat](https://datascienceretreat.com/). The main idea was to help voters in Germany make a more informed decision for the 2024 European elections by summarizing parties' positions on any political topic a voter cares about.

Long story short: We built a RAG (retrieval-augmented generation) system based on party manifestos and parliament debates, tweaked and evaluated it over a few weeks, built a web app around it with Streamlit, and deployed it at [electify.eu](https://electify.eu/). You're more than welcome to try it, spread the word, and [share your feedback](mailto:electify.eu@gmail.com). The code is available in our [GitHub repository](https://github.com/electify-eu/electify-app).

> **June 2024 update:** The EU elections are over, and the app is no longer live. Electify has seen more than 6,000 users and was covered by a few media outlets. It was an exciting time! Read more at [electify.eu](https://electify.eu/).

## How this project emerged

During our work at Data Science Retreat, my group noticed early on that we share an interest in politics and natural language processing. Among other things, we were all curious to explore how the latest large language models (LLMs) can help people make sense of political documents. With the European elections coming up, we quickly decided to build an LLM tool for voters.

Now, if you've ever tried chatting with an LLM about politics, you know that it's not fun.

- You **rarely know which sources** the LLM relied on to produce its response.
- Any LLM has an **inherent political bias** that is not fully transparent.
- You can't easily **specify the sources** that the LLM should consider (e.g., party manifestos).
- Some relevant sources are relatively **hard to obtain** (e.g., parliament protocols).
- Even if you try to include many relevant sources in your prompt, you'll quickly **exceed the context window length**.
- Oh, and these models still **make stuff up** all the time.

Using RAG helped us mitigate many of the above problems, and led to more sensible and factually correct responses for questions about parties' political positions.

## How the app works

If you know RAG, there are probably no surprises for you here:

1. The user enters a political question they care about (e.g., "How should AI be regulated?"), and selects the parties whose positions should be summarized.
2. The app retrieves relevant text excerpts from our database of party manifestos and parliament protocols by running a similarity search. This happens in parallel for all selected parties.
3. The user's question and the text excerpts are pasted into our prompt template, which requests a summary of a given party's position based on the provided excerpts. We send this prompt to an LLM API (in our case, OpenAI's GPT-3.5) and wait for the response. Again, this is parallelized for the selected parties.
4. The responses for all parties are shown in the app. The parties appear in random order.

This approach works fairly well, but it's not without inaccuracies. That's why below each summary we encourage users to check the party's manifesto. There is always a link that leads directly to the most relevant page (i.e., the page on which the most similar text excerpt was found in step 2).

![A screenshot of the Electify app, showing a summary of a party's position about nuclear power and a link to the relevant page in the party manifesto.](public/img/electify_summary.webp)
_For each party, the app provides a short summary and a link to the most relevant page in the manifesto._

We also added a little bonus feature: You can read the summaries without seeing the parties' names right away. Reveal them one by one to challenge your assumptions.

![A screenshot of the Electify app, showing a summary of a party's position without the party being named. There is a "Reveal" button to show the name and logo.](public/img/electify_hidden.webp)
_Any guesses? Hiding party names first is my favorite way to use the app._

## What we learned

**LangChain is great for getting started, but challenging later.** We had a working prototype in a few days thanks to the ready-made building blocks in LangChain. The framework helped us understand how RAG works without having to worry about all the details. After a while, we had to move away from LangChain in favor of a more custom approach.

**A simple prompt seemed better than a complicated one.** As we encountered more and more limitations and edge cases in the LLM responses, we tried adding additional instructions to our prompt or even repeating important aspects. This did more harm than good. In the end, we went back to a simpler prompt covering the essentials only, which worked better.

**Ask another LLM to evaluate your RAG.** We had to make many decisions about each part of the system: text chunk size and overlap, the embedding and generation models to use, temperature, or the specifics of similarity search. How could we know which options were best? Chris had a closer look at evaluation metrics such as context relevancy, answer relevancy, and faithfulness, all of which rely on another LLM acting as a "grading agent" for the RAG system.

**See what happens in your app with LangSmith and Trubrics.** For all things debugging, [LangSmith](https://www.langchain.com/langsmith)'s tracing capabilities were a big time-saver because they allowed us to zoom into every query that we sent. We were also lucky enough to have access to [Trubrics](https://www.trubrics.com/) while it was in its free access phase, which helped us collect feedback and log prompts from initial testings with friends and family.

There were more learnings in the process, and there are still a few things we didn't try (e.g., query transformations or a multi-agent approach). Overall, we were not that focused on technological sophistication but more on building a solution that creates value for voters and that we feel comfortable sharing with others.
