+++
title = 'This Month for Pythonistas - March 2025'
description = "A monthly update on Python and other fun stuff"
slug = "this-month-for-pythonistas-2025-03"
date = 2025-03-17T15:00:00+08:00
authors = ["Zeyang Lin"]
tags = ["python", "cli", "linux", "windows", "news"]
categories = ["python"]
series = ["this month for pythonistas"]
keywords = ["python", "pypi", "linux", "github", "podcast", "AI", "LLM"]
image = "title.webp"
draft = false
+++

```python
from datetime import date

print(date.today().year, date.today().month)
# 2025 3
```

![issue-2025-03](splash.webp)

Welcome to **This Month for Pythonistas**, a monthly update dedicated to Python developers, professionals, and hobbyists.

In this *inaugural* issue, I would like to compile a list of news, articles, repositories, and tools worth noting in March 2025, as well as other fun stuff that is not necessarily bound to Python.

Ready? Let's get started!

## New versions

### `ipython` 9.0.2

The first major version update in three years! Check it on [pypi](https://pypi.org/project/ipython/9.0.2/).

### `dify` v1.0.1

This major update brings a plugin system, a new Agent node in workflow, "Extenstion", "Dify Marketplace", and more!

Check this particular release on [github](https://github.com/langgenius/dify/releases/tag/1.0.1).

## Tutorials

- Deeplearning.ai's [Event-Driven Agentic Document Workflows](https://www.deeplearning.ai/short-courses/event-driven-agentic-document-workflows/) from LlamaIndex

> Build an event-driven agentic workflow that parses forms, retrieves relevant information from a source document using RAG, and returns answers to the form’s fields as structured outputs.

- Deeplearning.ai's [Long-Term Agentic Memory with LangGraph](https://www.deeplearning.ai/short-courses/long-term-agentic-memory-with-langgraph/) from LangChain

> Build a personal email agent with routing, writing, scheduling tools to automatically ignore, respond to, or notify about incoming emails.

## Articles

- [Performance of the Python 3.14 tail-call interpreter](https://blog.nelhage.com/post/cpython-tail-call/)

- [New tools for building agents](https://openai.com/index/new-tools-for-building-agents/)

OpenAI introduces their new approach on building agents systems: the new Responses API which would replace Assistants API, a new Python SDK as a agents framework, and more.

- [Google's Gemma 3](https://blog.google/technology/developers/gemma-3/)

Latest iteration of Google's open-weight LLM includes four sizes from small to medium: 1B, 4B, 12B, and 27B. Here's the [technical report](https://storage.googleapis.com/deepmind-media/gemma/Gemma3Report.pdf).

## Podcasts

### RealPython Podcast

- [Episode 241: Deciphering Python Jargon & Compiling Python 1.0](https://realpython.com/podcasts/rpp/241/)
- [Episode 242: Eric Matthes: Maybe Don't Start With Unit Tests](https://realpython.com/podcasts/rpp/242/)
- [Episode 243: Manage Projects With pyproject.toml & Explore Polars LazyFrames](https://realpython.com/podcasts/rpp/243/)

### Python Bytes Podcast

- [#422 You need 4 spaces](https://pythonbytes.fm/episodes/show/422/you-need-4-spaces)
- [#423 Traveling the Python Universe](https://pythonbytes.fm/episodes/show/423/traveling-the-python-universe)

### Talk Python to me

- [#496: Scaf: Complete blueprint for new Python Kubernetes projects](https://talkpython.fm/episodes/show/496/scaf-complete-blueprint-for-new-python-kubernetes-projects)

### Pybites Podcast

- [#183: AI’s silent takeover - are we losing our programming skills?](https://www.pybitespodcast.com/1501156/episodes/16730593-183-ai-s-silent-takeover-are-we-losing-our-programming-skills)

## Tools

### Warp on Windows

Warp is one of my favorite new toys in year 2024, and now it comes to Windows platform. Check their [blog](https://www.warp.dev/blog/launching-warp-on-windows)!

### Cherry Studio 1.0.6

Cherry Studio catches quite a lot of eyes recently, and it just reaches 1.0 not too long ago. [official download](https://cherry-ai.com/download)

## Repositories

### `lmstudio-python`

I personally have been using [LM Studio](https://lmstudio.ai/) for roughly one year, and this `lmstudio-python` (alongside lmstudio-js for JavaScript) is their official SDK with which you can easily manage the models, conversations and more using pure Python code. They have documentations too: [docs](https://lmstudio.ai/docs/python).

The source code is hosted on [github](https://github.com/lmstudio-ai/lmstudio-python).

### `openai-agents-python`

OpenAI's latest contribution to open-source includes this framework for creating multi-agent workflows. This is also among the new tools which I mentioned earlier in this issue.

The source code is on [github](https://github.com/openai/openai-agents-python), and the [documentation](https://openai.github.io/openai-agents-python/) too.

## Time for some fun?

### Command & Conquer games go open-source

Despite their infamous and disastrous management on this beloved franchise, EA chose to open-source some of the classic C&C games on github (again), potentially enriching the Modding community support.

Here are the repositories:

- [Tiberian Dawn (1995)](https://github.com/electronicarts/CnC_Tiberian_Dawn)
- [Red Alert (1996)](https://github.com/electronicarts/CnC_Red_Alert)
- [Renegade (2002)](https://github.com/electronicarts/CnC_Renegade)
- [Generals (2003) and Generals: Zero Hour (2003)](https://github.com/electronicarts/CnC_Generals_Zero_Hour)

### Death Stranding 2: On the Beach (finally) has a launch date

It would be on the shelves on June 26th, 2025 (for Playstation only (... for a while at least)), and the pre-order starts March 17th.

![death-stranding-2-digital-standard-edition](https://blog.playstation.com/tachyon/2025/03/39b76949d94b8c18a90f34664c1ff989b8afee67-scaled.jpg?fit=1024%2C576&zoom=1)

The price start from 69.99 USD, 79.99 Euro, or 8,980 JPY.

More details can be found in [playstation blog](https://blog.playstation.com/2025/03/09/death-stranding-2-on-the-beach-launches-june-26-collectors-edition-revealed/).
