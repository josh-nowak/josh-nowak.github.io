---
title: "Local LLMs on macOS made simple with Ollama"
date: 2024-05-03 12:00:00 +0100
categories: [Tutorials]
render_with_liquid: false
image: 
    path: /assets/img/ollama.webp
---

Running large language models (LLMs) locally on a Mac has become easier than ever. At the same time, open-weight models have reached a quality level at which they become useful for everyday tasks. When data privacy is a concern, they can be a viable alternative to cloud-based services such as ChatGPT.

Consider use cases such as:  
- Summarizing emails, interview transcripts, customer feedback, or confidential documents
- Creating drafts for communicating internal projects
- Brainstorming or thought partnering on confidential topics

Outside of data science and software engineering communities, few people seem to be using local LLMs so far, most likely because the setup process is not entirely straightforward. However, open-source tools like [Ollama](https://ollama.com/) and [Ollamac](https://github.com/kevinhermawan/Ollamac) are lowering the barrier. This tutorial aims to provide a step-by-step guide with as little jargon and prerequisites as possible. There is no way around using the Terminal for one step, but you can simply copy and paste the commands provided. 

By the end of this post, you should be able to run the latest [llama3 model](https://llama.meta.com/llama3/) on your Mac with a nice chat interface. This will work especially well on newer Macs with Apple Silicon chips (M1 or later).

## Step 1: Install Ollama
Ollama is an open-source tool that runs LLMs on your Mac. Download the latest version of Ollama from the [official website](https://ollama.com/). Move it to your Applications folder and run it. Everything that follows requires Ollama, so make sure that it keeps running in the background.

## Step 2: Download an LLM
Once you installed Ollama, you can start downloading and using LLMs right away. A popular choice is llama3, the latest open-weight model by Meta. For this step you will need the Terminal, which you can find by searching for it in Spotlight (Cmd+Space).

Copy and paste the following command into the Terminal window and hit Enter to download llama3:

```bash
ollama pull llama3
```

If you are prompted to install the Command Line Tools, simply accept and follow the instructions.  

Sometimes the download fails or becomes very slow, in which case you can simply cancel the process using Ctrl+C and run the command again. The download will resume from where it left off.

## Step 3: Run the LLM
At this point, you can already chat with llama3 from your Terminal. Enter the following command and hit Enter:

```bash
ollama run llama3
```

This might not be the UX you were looking for, but it's a good way to test if everything is working. Disconnect yourself from the internet if you can't believe this is running on your machine (I sure couldn't). To exit the chat, type `/bye` and hit Enter.

## Step 4: Install Ollamac (optional UX improvement)
For a more natural chat interface, consider installing Ollamac. This is an open-source App that allows you to interact with Ollama models in a graphical user interface. The simplest way to install Ollamac is to [download the latest DMG file](https://github.com/kevinhermawan/Ollamac/releases/download/v1.1.1/Ollamac-1.1.1.dmg) from Github. Otherwise, you can always find the most recent version and installation instructions on the [Ollamac Github repository](https://github.com/kevinhermawan/Ollamac).

You might need to allow the app to run explicitly by right-clicking it and selecting "Open" the first time you run it. As with any open-source software, do this at your own risk and only if you trust the source.

![A screenshot of the Ollamac software showing a user prompt that requests a summary of a confidential report.](/assets/img/ollamac1.webp){: w="650"}
_Llama3 in Ollamac is ready to go._
![](/assets/img/ollamac2.webp){: w="650"}
_In my first tests, llama3 produced pretty good results. Of course, your mileage may vary._

---

That's it—you are ready to run open-weight LLMs on your Mac. If you found something unclear in this tutorial, feel free to [reach out](mailto:hi@joshua-nowak.com).