+++
title = 'This Month for Pythonistas - March 2025'
description = "MCP, OpenAI agents, dify, langgraph, Gemma 3, and other fun stuff"
slug = "this-month-for-pythonistas-2025-03"
date = 2025-03-31T15:00:00+08:00
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

Welcome and thank you for reading **This Month for Pythonistas**, a monthly update dedicated to Python developers, professionals, and hobbyists.

In this *inaugural* issue, I would like to compile a list of news, articles, repositories, and tools worth noting in March 2025, as well as other fun stuff that may not necessarily be bound to Python community.

Before we continue, please note that this blog is synced across several platforms:

- [Github Pages](https://linzeyang.github.io/blog/post/this-month-for-pythonistas-2025-03/)
- [Netlify](https://blueberrypy.netlify.app/post/this-month-for-pythonistas-2025-03/)
- [Render](https://blueberrypy.onrender.com/post/this-month-for-pythonistas-2025-03/)

Ready? Let's get started!

---

## Events & Social

### EuroPython 2025 Updates

[EuroPython 2025](https://ep2025.europython.eu/) stays in Prague, Czech Republic (which makes Prague the host city three years in a row!), and the ticket sales start this month.

![europython-2025-keynote-speaker](https://blog.europython.eu/content/images/2025/03/savannah-2.svg)

Python Core Developer [Savannah Ostrowski](https://www.linkedin.com/in/savannahostrowski/) is going to be one of the keynote speakers this year.

Get to know more in their [blog](https://blog.europython.eu/keynote-ticket-sales-announcement/).

## New versions

### `ipython` 9.0.2

The first major version update in three years! Check it out on [pypi](https://pypi.org/project/ipython/9.0.2/).

### `dify` v1.1.3

This major update (v1) brings a plugin system, a new Agent node in workflow, "Extenstion", "Dify Marketplace", and more!

Check this particular release on [github](https://github.com/langgenius/dify/releases/tag/1.1.3).

## Tutorials

- Deeplearning.ai's [Event-Driven Agentic Document Workflows](https://www.deeplearning.ai/short-courses/event-driven-agentic-document-workflows/) from LlamaIndex

> Build an event-driven agentic workflow that parses forms, retrieves relevant information from a source document using RAG, and returns answers to the form’s fields as structured outputs.

- Deeplearning.ai's [Long-Term Agentic Memory with LangGraph](https://www.deeplearning.ai/short-courses/long-term-agentic-memory-with-langgraph/) from LangChain

> Build a personal email agent with routing, writing, scheduling tools to automatically ignore, respond to, or notify about incoming emails.

- RealPython's [LangGraph: Build Stateful AI Agents in Python](https://realpython.com/langgraph-python/)

Here is another tutorial regarding `LangGraph`.

> Explore the full tutorial to gain hands-on experience with LangGraph, including setting up workflows and building a LangGraph agent that can autonomously parse emails, send emails, and interact with API services.

- RealPython's [Python's Instance, Class, and Static Methods Demystified](https://realpython.com/instance-class-and-static-methods-demystified/)

> Instance, class, and static methods each serve a distinct role in Python, and knowing when to use one over another is key to writing clean, maintainable code. Instance methods operate on individual objects using self, while class methods use cls to access class-level data. Static methods, on the other hand, provide organizational structure without relying on class or instance state.

- RealPython's [Python Code Quality: Best Practices and Tools](https://realpython.com/python-code-quality/)

> In this tutorial, you’ll learn about code quality and the key factors that make Python code high-quality. You’ll explore effective strategies, powerful tools, and best practices to elevate your code to the next level.

## Articles

- [Performance of the Python 3.14 tail-call interpreter](https://blog.nelhage.com/post/cpython-tail-call/)

The CPython project's new tail-call interpreter initially showed a 10 - 15% performance boost. However, the author found this was mainly due to an LLVM 19 regression. When benchmarked against better baselines, the gain dropped to 1 - 5%. The LLVM 19 regression affected the bytecode interpreter's optimization. Also, the "computed goto" approach might be unnecessary for modern Clang.

- [New tools for building agents](https://openai.com/index/new-tools-for-building-agents/)

OpenAI introduces their new approach on building agents systems: the new Responses API which would replace Assistants API, a new Python SDK as a agents framework, and more.

- [Google's Gemma 3](https://blog.google/technology/developers/gemma-3/)

![gemma-3](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Gemma3_KeywordBlog_RD3_V01b.width-2200.format-webp.webp)

Latest iteration of Google's open-weight LLM includes four sizes from small to medium: 1B, 4B, 12B, and 27B. Here's the [technical report](https://storage.googleapis.com/deepmind-media/gemma/Gemma3Report.pdf).

- [Mistral Small 3.1](https://mistral.ai/news/mistral-small-3-1)

Mistral releases its newest "small" (24B) multi-modal, multilingual LLM, claiming it "outperforms comparable models like Gemma 3 and GPT-4o Mini, while delivering inference speeds of 150 tokens per second".

![mistral-small-3.1-performance](https://cms.mistral.ai/assets/1977a3f1-eae3-4eed-b2c7-e1701c4692ed.png?width=1988&height=1050)

Its "instruct" variation's weight is obtainable from [HuggingFace](https://huggingface.co/mistralai/Mistral-Small-3.1-24B-Instruct-2503).

- [A Deep Dive Into MCP and the Future of AI Tooling](https://a16z.com/a-deep-dive-into-mcp-and-the-future-of-ai-tooling/)

![model-context-protocol](https://d1lamhf6l6yk6d.cloudfront.net/uploads/2025/03/250319-MCP-x2000.png)

This article delves into the Model Context Protocol (MCP), an open protocol aiming to standardize AI model interactions with tools. Inspired by LSP, MCP supports autonomous AI workflows and human-in-the-loop operations. It has various use cases in dev-centric workflows and net-new experiences. However, the MCP ecosystem is in its early stage, facing challenges like authentication, authorization, and server discoverability. If these issues are resolved, MCP could reshape AI-tool interactions, leading to new pricing models, hosting modes, and a shift in tool development and consumption.

- [Introducing KBLaM: Bringing plug-and-play external knowledge to LLMs](https://www.microsoft.com/en-us/research/blog/introducing-kblam-bringing-plug-and-play-external-knowledge-to-llms/)

![kblam-diagram](https://www.microsoft.com/en-us/research/wp-content/uploads/2025/03/KBLaM-BlogHeroFeature-1400x788-1-1.png)

KBLaM is a new approach to integrate structured knowledge bases into pre-trained LLMs. Traditional methods like fine-tuning and RAG have drawbacks, and in-context learning has computational issues. KBLaM converts knowledge bases into continuous key-value vector pairs and uses rectangular attention for efficient integration. It's scalable, with linear cost and dynamic updates. KBLaM also enhances interpretability and reliability, reducing hallucinations. It paves the way for more reliable AI systems in critical fields.

## Podcasts

### 🥝 core.py

- [Episode 19: Async hacks, unicorns and velociraptors](https://open.spotify.com/episode/3SSIu0lvHD1jT8m23VSBFB)
- [Episode 20: Remote Code Execution By Design](https://open.spotify.com/episode/4tB8m8DyUv6PDR1DvVJFKd)

### 🐍 RealPython Podcast

- [Episode 241: Deciphering Python Jargon & Compiling Python 1.0](https://realpython.com/podcasts/rpp/241/)
- [Episode 242: Eric Matthes: Maybe Don't Start With Unit Tests](https://realpython.com/podcasts/rpp/242/)
- [Episode 243: Manage Projects With pyproject.toml & Explore Polars LazyFrames](https://realpython.com/podcasts/rpp/243/)
- [Episode 244: A Decade of Automating the Boring Stuff With Python](https://realpython.com/podcasts/rpp/244/)

### 🥧 Python Bytes Podcast

- [#422 You need 4 spaces](https://pythonbytes.fm/episodes/show/422/you-need-4-spaces)
- [#423 Traveling the Python Universe](https://pythonbytes.fm/episodes/show/423/traveling-the-python-universe)
- [#424 We Will Test in Production](https://pythonbytes.fm/episodes/show/424/we-will-test-in-production)
- [#425 If You Were a Klingon Programmer](https://pythonbytes.fm/episodes/show/425/if-you-were-a-klingon-programmer)

### 🦜 Talk Python to me

- [#496: Scaf: Complete blueprint for new Python Kubernetes projects](https://talkpython.fm/episodes/show/496/scaf-complete-blueprint-for-new-python-kubernetes-projects)
- [#497: Outlier Detection with Python](https://talkpython.fm/episodes/show/497/outlier-detection-with-python)
- [#498: Algorithms for high performance terminal apps](https://talkpython.fm/episodes/show/498/algorithms-for-high-performance-terminal-apps)

### 🍕 Pybites Podcast

- [#183: AI’s silent takeover - are we losing our programming skills?](https://www.pybitespodcast.com/1501156/episodes/16730593-183-ai-s-silent-takeover-are-we-losing-our-programming-skills)
- [#184: The pathway to success - how an open mind can lead to your dream job](https://www.pybitespodcast.com/1501156/episodes/16755254-184-the-pathway-to-success-how-an-open-mind-can-lead-to-your-dream-job)

## Tools

### Warp on Windows

Warp is one of my favorite new toys in year 2024, and now it comes to Windows platform. Check their [blog](https://www.warp.dev/blog/launching-warp-on-windows)!

### Cherry Studio 1.1.10

Cherry Studio catches quite a lot of eyes recently, and it just reaches 1.0 not too long ago. [official download](https://cherry-ai.com/download)

## Repositories

### `lmstudio-python` (MIT)

I personally have been using [LM Studio](https://lmstudio.ai/) for roughly one year, and this `lmstudio-python` (alongside lmstudio-js for JavaScript) is their official SDK with which you can easily manage the models, conversations and more using pure Python code. They have documentations too: [docs](https://lmstudio.ai/docs/python).

The source code is hosted on [github](https://github.com/lmstudio-ai/lmstudio-python).

### `openai-agents-python` (MIT)

OpenAI's latest contribution to open-source includes this framework for creating multi-agent workflows. This is also among the new toys from OpenAI which I mentioned earlier in this issue.

The source code is on [github](https://github.com/openai/openai-agents-python), and the [documentation](https://openai.github.io/openai-agents-python/) too.

Update: The Agents SDK has support for MCP, which means you can now [connect MCP servers to Agents](https://openai.github.io/openai-agents-python/mcp/).

### `smolagents` (Apache-2.0)

Another light-weight ("smol") framework which helps you build AI agents, brought by the HuggingFace team.

Here's the [repostitory](https://github.com/huggingface/smolagents)

### `DeepSeek-V3-0324`

The is an updated version of V3, released just this March. The weights can be found on [HuggingFace](https://huggingface.co/deepseek-ai/DeepSeek-V3-0324)

### `Qwen2.5-Omni-7B`

Qwen team has released *their* version of "omni" model on [HuggingFace](https://huggingface.co/Qwen/Qwen2.5-Omni-7B).

## Have time for some fun?

### Command & Conquer games go open-source

Despite their infamous and disastrous management on this beloved franchise, EA chose to open-source some of the classic C&C games on github, potentially enriching the Modding community support.

Here are the repositories (Mostly C++, plus some C, Assembly and others; under GNU GPL v3):

- [Tiberian Dawn (1995)](https://github.com/electronicarts/CnC_Tiberian_Dawn)
- [Red Alert (1996)](https://github.com/electronicarts/CnC_Red_Alert)
- [Renegade (2002)](https://github.com/electronicarts/CnC_Renegade)
- [Generals (2003) and Generals: Zero Hour (2003)](https://github.com/electronicarts/CnC_Generals_Zero_Hour)

### Death Stranding 2: On the Beach (finally) has a launch date

It would be on the shelves on June 26th (or 24th for Deluxe Edition owners), 2025 for Playstation only (... for a while at least), and the pre-order starts March 17th.

![death-stranding-2-digital-standard-edition](https://blog.playstation.com/tachyon/2025/03/39b76949d94b8c18a90f34664c1ff989b8afee67-scaled.jpg?fit=1024%2C576&zoom=1)

The price starts from 69.99 USD, 79.99 EUR, 568 HKD or 8,980 JPY.

More details can be found in this [playstation blog](https://blog.playstation.com/2025/03/09/death-stranding-2-on-the-beach-launches-june-26-collectors-edition-revealed/).

### StarCraft goes to tabletop

In their [blog](https://archon-studio.com/blog/starcraft-tmg/starcraft-tabletop-miniatures-game-announcement), Archon Studio announced an official partnership with Blizzard Entertainment, launching a StarCraft tabletop miniatures game in 2026, followed by board games set in the StarCraft universe in 2027.

![starcraft-miniatures](https://archon-studio.com/files/scaled-thumbs/Blog/starcraft-tabletop-miniatures-game-announcement/SC%201x1%20announcement.png/1200_1200.webp)

More details, like miniature previews and gameplay mechanics, will be revealed later in 2025.

---

Alright, that concludes the very first issue of "This Month of Pythonistas". Thank you again for reading my post. I hope you enjoy it or find something useful, and see you in April!
