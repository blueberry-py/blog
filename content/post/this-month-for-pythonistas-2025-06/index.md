+++
title = "This Month for Pythonistas - June 2025"
description = "More Agentic AI, Python releases, new cli tools and other fun stuff"
slug = "this-month-for-pythonistas-2025-06"
date = 2025-06-30T21:00:00+08:00
authors = ["Zeyang Lin"]
tags = ["python", "cli", "linux", "podcast", "news"]
categories = ["python"]
series = ["this month for pythonistas"]
keywords = ["python", "gemini", "numpy", "linux", "podcast", "AI", "LLM", "agent", "mcp"]
image = "title.jpg"
draft = false
+++

```python
from datetime import date

print(date.today().year, date.today().month)
# 2025 6
```

![issue-2025-06](splash.webp)

Welcome back! Summer is really here and I hope you all enjoy the heat or rain. I'm glad to see you back reading the fourth issue of my "This month for Pythonistas" series which curates the news, articles, tutorials and more Python stuff worth noting in this month.

Before we continue, please note that this blog is synced across several platforms:

- [Github Pages](https://blueberry-py.github.io/blog/post/this-month-for-pythonistas-2025-06/)
- [Netlify](https://blueberrypy.netlify.app/post/this-month-for-pythonistas-2025-06/)
- [Render](https://blueberrypy.onrender.com/post/this-month-for-pythonistas-2025-06/)

Ready? Let's get started!

---

## Events & Social

DjangoCon US 2025 is coming this September in Chicago, United States. The in-person tickets are officially on sale now. You can also choose to attend online with even Sprints options available.

## New versions

### Python 3.14.0 beta 3

The third beta release of 3.14 is here! Source code as well as binary distributions can be found [here](https://www.python.org/downloads/release/python-3140b3/).

### Python 3.13.5

Python 3.13.4 was an expected release early this month but was found to be having bugs. So another bugfix release 3.13.5 is out soon after.

### Python 3.12.11, 3.11.13, 3.10.18 and 3.9.23

These are regular security releases with only offical tarball distributions. And remember that Python 3.9 is going to reach its end of life this October.

## Tutorials

- Deeplearning.ai's [DSPy: Build and Optimize Agentic Apps](https://www.deeplearning.ai/short-courses/dspy-build-optimize-agentic-apps/) from DataBricks

> This course teaches you how to use DSPy to build and optimize LLM-powered applications. You’ll write programs using DSPy’s signature-based programming model, debug them with MLflow tracing, and automatically improve their accuracy with DSPy Optimizer. Along the way, you’ll see how DSPy helps you easily switch models, manage complexity, and build agents that are both powerful and easy to maintain.

- Deeplearning.ai's [Orchestrating Workflows for GenAI Applications](https://www.deeplearning.ai/short-courses/orchestrating-workflows-for-genai-applications/) from Astronomer

> In this course, you’ll learn how to turn a Retrieval Augmented Generation (RAG) prototype into a robust, automated pipeline using Airflow 3.0, a leading open-source orchestration tool. You’ll build two workflows for a typical RAG application: one that ingests and embeds book description texts into a vector database, and another that queries that database to recommend books.

- Deeplearning.ai's [Building with Llama 4](https://www.deeplearning.ai/short-courses/building-with-llama-4/) from Meta

> In hands-on lessons, you’ll build apps using Llama 4’s long-context and its new multi-modal capabilities including reasoning across multiple images and "image grounding" in which you can identify elements and reason within specific image regions.

- Deeplearning.ai's [ACP: Agent Communication Protocol](https://www.deeplearning.ai/short-courses/acp-agent-communication-protocol/) from BeeAI and Linux Foundation

> You’ll learn how to wrap an agent inside an ACP server and set up an ACP client to connect to the server. You’ll build sequential and hierarchical workflows of agents hosted inside ACP servers, and learn how to manage this workflow on the client side through a process or another agent.

- RealPython's [How Can You Structure Your Python Script?](https://realpython.com/python-script-structure/)

This is a comprehensive guide on structuring a standalone, shareable Python script, including specifying its dependencies in the script itself following PEP 723, handling CLI inputs, proprerly logging, and more.

## Articles

- [PEP 734 – Multiple Interpreters in the Stdlib](https://peps.python.org/pep-0734/)

PEP 734 is **accepted**. It proposes to add a new module, `interpreters`, to support inspecting, creating, and running code in multiple interpreters in the current process.

- [PEP 779 – Criteria for supported status for free-threaded Python](https://peps.python.org/pep-0779/)

PEP 779 is **accepted**, which means that staring from Python 3.14 a "No-GIL" build is officially supported instead of being in "experimental" status like in Python 3.13.

- [How local variables work in Python bytecode](https://fromscratchcode.com/blog/how-local-variables-work-in-python-bytecode/)

Local variables are stored on the stack, specifically within the evaluation stack of a Frame in the CallStack. Despite this, most Python variables are actually references to objects stored on the heap. The post illustrates this concept through a simple function, demonstrating how the stack changes as the function executes.

- [Google decided to donate Agent2Agent protocol/project to Linux Foundation](https://developers.googleblog.com/en/google-cloud-donates-a2a-to-linux-foundation/)

The Linux Foundation has announced the creation of the Agent2Agent (A2A) project, which aims to develop an open standard protocol that enables AI agents from different vendors to communicate, collaborate, and share information securely. Google Cloud contributed the A2A protocol specifications, SDKs, and developer tools.

- [How we built our multi-agent research system](https://www.anthropic.com/engineering/built-multi-agent-research-system)

This post by Anthropic gives a behind-the-scenes look at how they set up a system where multiple AI agents can work together on different tasks. Think of it like a digital teamwork lab, where AI agents can play different roles—like writers, editors, or problem-solvers—and collaborate to get things done.

The team designed the system to be super flexible, so they could easily run different types of experiments. Some agents work together on writing tasks, while others negotiate or help delegate work among themselves. It’s all about seeing how AIs interact, cooperate, and sometimes even challenge each other.

Building this wasn’t all smooth sailing—they had to deal with tricky prompts, keep experiments reproducible, and figure out how to measure how well the agents were doing. Along the way, they learned a lot: use clear building blocks, design thoughtful communication between agents, and always keep good logs.

- [Agentic Search for Dummies](https://benanderson.work/blog/agentic-search-for-dummies/)

This blog post discusses building a search agent that uses full-text search with offline document augmentation to let AI models dynamically gather context from a large document corpus. The system uses a search index (Tantivy) and a set of tools to enable a language model to issue multiple queries, fuse results, and read selected documents iteratively until it produces a final answer. The post argues against relying on dense embeddings due to complexity and overhead, advocating for full-text search as a more predictable and effective method for agentic search.

- [O(no) You Didn't 😱](https://mrshiny608.github.io/MrShiny608/optimisation/2025/04/22/OhNoYouDidnt.html)

This article discusses the difference between theoretical Big-O performance and real-world performance, emphasizing that actual speed depends on context and profiling. Using a "Two Sum" problem as an example, it compares the brute-force O(n^2) approach with an optimized O(n) hashmap method. The article explains how memory access times and hardware factors influence performance, illustrating that understanding practical bottlenecks is crucial beyond just Big-O notation.

- [How to Vibe Code as a Senior Engineer](https://blog.alexmaccaw.com/how-to-vibe-code-as-a-senior-engineer/)

Despite concerns about AI-generated code quality, recent advancements in AI models have made vibe coding a valuable tool for experienced engineers. However, human oversight remains crucial for guiding architecture and ensuring code quality. The author emphasizes the importance of using a robust scaffold, establishing clear rules, and providing perfect context for optimal AI performance.

- [Will AI Replace Junior Developers? I Asked Experts at Pycon US](https://blog.adarshd.dev/posts/pycon-us-ai-and-future-of-programming/)

The blog discusses whether AI will replace junior developers, based on conversations at PyCon US. Most experts believe AI won't fully replace programmers but will change how they work, especially in tasks like boilerplate coding. Key figures like **Guido van Rossum** and **Trey Hunner** see AI as a tool for improving productivity rather than a threat. Some, like **Samuel Colvin**, think AI could replace certain roles to increase efficiency.

- [Don't Build Multi-Agents](https://cognition.ai/blog/dont-build-multi-agents)

The article argues against building multi-agent systems due to their fragility and context sharing challenges. It advocates for principles like sharing full context and implicit decision-making to build reliable AI agents. The author suggests simpler, single-threaded, linear agents or long-context compressed systems for better reliability.

## Podcasts

### 🥝 core.py

- [PyCon US 2025 Recap](https://open.spotify.com/episode/1C0oe2vgW40CGBOFAhRlWY)

### 🐍 RealPython Podcast

- [Episode 252: Rodrigo Girão Serrão: Python Training, itertools, and Idioms](https://realpython.com/podcasts/rpp/252/)
- [Episode 253: Starting With Marimo Notebooks & Python App Config Management](https://realpython.com/podcasts/rpp/253/)
- [Episode 254: Scaling Python Web Applications With Kubernetes and Karpenter](https://realpython.com/podcasts/rpp/254/)
- [Episode 255: Structuring Python Scripts & Exciting Non-LLM Software Trends](https://realpython.com/podcasts/rpp/255/)

### 🥧 Python Bytes Podcast

- [#434 Most of OpenAI’s tech stack runs on Python](https://pythonbytes.fm/episodes/show/434/most-of-openai-s-tech-stack-runs-on-python)
- [#435 Stop with .folders in my ~/](https://pythonbytes.fm/episodes/show/435/stop-with-.folders-in-my)
- [#436 Slow tests go last](https://pythonbytes.fm/episodes/show/436/slow-tests-go-last)
- [#437 Python Language Summit 2025 Highlights](https://pythonbytes.fm/episodes/show/437/python-language-summit-2025-highlights)

### 🦜 Talk Python to me

- [#507: Agentic AI Workflows with LangGraph](https://talkpython.fm/episodes/show/507/agentic-ai-workflows-with-langgraph)
- [#508: Program Your Own Computer with Python](https://talkpython.fm/episodes/show/508/program-your-own-computer-with-python)
- [#509: GPU Programming in Pure Python](https://talkpython.fm/episodes/show/509/gpu-programming-in-pure-python)
- [#510: 10 Polars Tools and Techniques To Level Up Your Data Science](https://talkpython.fm/episodes/show/510/10-polars-tools-and-techniques-to-level-up-your-data-science)
- [#511: From Notebooks to Production Data Science Systems](https://talkpython.fm/episodes/show/511/from-notebooks-to-production-data-science-systems)

### 🍕 Pybites Podcast

- [#192: Coding smarter not harder - 5 key ways to succeed as a developer](https://www.pybitespodcast.com/1501156/episodes/17226545-192-coding-smarter-not-harder-5-key-ways-to-succeed-as-a-developer)
- [#193: Why coding alone sucks!](https://www.pybitespodcast.com/1501156/episodes/17363363-193-why-coding-alone-sucks)

## Repositories

- [strands-agents/sdk-python](https://github.com/strands-agents/sdk-python) (Apache-2.0)

Strands Agents is an open source SDK introduced by AWS that simplifies the development of AI agents using a model-driven approach. It enables developers to build and run AI agents in a few lines of code, scaling from simple to complex use cases. Unlike other frameworks requiring complex workflows, Strands leverages the capabilities of advanced models to plan, chain thoughts, call tools, and reflect. You can start exploring the SDK on their [documentation](https://strandsagents.com/).

- [bytedance/deer-flow](https://github.com/bytedance/deer-flow) (MIT)

`deer-flow` is a _Deep Research_ framework by byte-dance team. It aims to combine language models with specialized tools for tasks like web search, crawling, and Python code execution. You can either host your own or try their online demo.

- [gemini-cli](https://github.com/google-gemini/gemini-cli) (Apache-2.0)

Gemini CLI is Google's answer to Anthropic's Claude Code and OpenAI's Codex, but with generous free-tier usage on Gemini-2.5-pro/flash at the moment.

- [mongodb/kingfisher](https://github.com/mongodb/kingfisher) (Apache-2.0)

Originally an internal tool from Mondodb, Kingfisher is an open-source command-line secrets scanner/validator written in Rust which has various built-in rules and runs "blazingly fast". It provides pre-built binaries for Windows, MacOS and Linux, and you can also build it yourself from the source.

- [microsoft/edit](https://github.com/microsoft/edit) (MIT)

Written in Rust, `Edit` is the promised open-source command line editor from Microsoft. It brings classic MS-DOS style UI to both Windows and Linux but also accommodates modern features.

## Have time for some fun?

### Call of Ducy: Black Ops 7 continues the stories of BO 2 and BO 6

![Call of Duty Black Ops 7 Reveal Image](https://bnetcmsus-a.akamaihd.net/cms/blog_header/7m/7MFT7FOIH3I31749406406524.jpg)

Two Black Ops games in a row! During Xbox Games Showcase 2025, Activision reveals the seventh game in the COD sub-franchise where players will fight as David Mason in futuristic world of year 2035. It is going to launch on PC (Steam, Battle.net, XBOX PC), Xbox Series/One and PlayStation 5/4.

### 007 First Light is gonna tell the origin story of James Bond in 2026

![007 First Light Video Game](https://blog.playstation.com/tachyon/2025/06/5d78650a856871c7fe6dc1d82c0039416452498d.jpg?resize=1088%2C612&crop_strategy=smart&zoom=1)

IO Interactive, the developer behind _Hitman 47_ series, announces during _State of Play_ that their 007 title "007 First Light", "a thrilling narrative action-adventure game" in third person, is going to be published in 2026. It is expected to be available on all major platforms: PC (Steam / Epic), Xbox Series, PlayStation 5, as well as Nintendo Switch 2.

---

As we wrap up this journey together, I want to take a moment to express my gratitude for your reading. If you've enjoyed what you just read and would like to help sustain this blog, consider [starring this blog on github](https://github.com/blueberry-py/blog/stargazers), it would be great motivation for me to keep updating the blogs!

Alright, that concludes the fourth issue of "This Month of Pythonistas". Thank you again for reading my post. I hope you enjoy it or find something useful, and see you in July!
