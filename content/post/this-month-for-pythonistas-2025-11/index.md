+++
title = "This Month for Pythonistas - November 2025"
description = "Python 3.15 alpha, Gemini 3, GPT 5.1, more Agentic AI, cloud outages and other fun stuff"
slug = "this-month-for-pythonistas-2025-11"
date = 2025-11-30T21:00:00+08:00
authors = ["Zeyang Lin"]
tags = ["python", "cli", "linux", "podcast", "news", "agentic", "llm", "ai"]
categories = ["python"]
series = ["this month for pythonistas"]
keywords = ["python", "linux", "podcast", "AI", "LLM", "agent", "mcp", "openai", "gemini"]
image = "title.jpg"
draft = false
+++

```python
from datetime import date

print(date.today().year, date.today().month)
# 2025 11
```

![issue-2025-11](splash.jpg)

Welcome back Pythonistas! I'm glad to see you back reading the ninth issue of my "This month for Pythonistas" series which curates the news, articles, tutorials, podcasts, and more Python stuff worth noting in this month.

Before we continue, please note that this blog is synced across the following platforms:

- [Github Pages](https://blueberry-py.github.io/blog/post/this-month-for-pythonistas-2025-11/)
- [Netlify](https://blueberrypy.netlify.app/post/this-month-for-pythonistas-2025-11/)
- [Render](https://blueberrypy.onrender.com/post/this-month-for-pythonistas-2025-11/)

Ready? Let's get started!

---

## Events & Social

### PyCon US 2026 CFP is Open

![PyCon-US-2026](pyconus2026.jpg)

The 2026 PyCon US [call for proposals](https://us.pycon.org/2026/speaking/guidelines/) (CFP) for Talks, Charlas, Tutorials and Posters is open until **December 19th, 2025**. Don't miss out on the largest Python conference in the world!

### PyCon Ireland 2025

![PyCon-Ireland-2025](https://s3.python.ie/images/Dublin_Skyline_2025-screen-size.width-800.png)

PyCon Ireland this year took place November 15-16 in UCD O'Reilly Hall, Dublin, featuring two talk tracks and two workshop tracks on both days.

### 20th anniversary of first ever Django release

For the past twenty years, Django has shipped over 440 releases, making it among the most popular and successful Python web frameworks. You can read more about it [here](https://www.djangoproject.com/weblog/2025/nov/19/twenty-years-of-django-releases/).

## New Versions

- Python 3.15.0 alpha 2

This is the second developer preview of the upcoming Python 3.15 release. It is available for download [here](https://www.python.org/downloads/release/python-3150a2/).

- Django 6.0 RC 1

Django 6.0 release candidate 1 is [now available](https://www.djangoproject.com/download/6.0rc1/tarball/). The provisional release notes can be found [here](https://docs.djangoproject.com/en/dev/releases/6.0/).

Provided no major bugs are discovered that can't be solved in the next two weeks, Django 6.0 will be released on or around _December 3_.

- pytest 9.0

pytest 9.0 brings significant improvements including native TOML configuration support, a new strict mode for better testing practices, and the long-awaited subtests feature.

## Tutorials

- DeepLearning.ai's [Jupyter AI: AI Coding in Notebooks](https://www.deeplearning.ai/short-courses/jupyter-ai-coding-in-notebooks/) by Andrew Ng and Brian Granger

> In this course, you’ll build a book research assistant using the Open Library API, and create a stock market data analysis workflow, all with the help of Jupyter AI. You’ll learn how to provide API documentation as context so the LLM generates accurate syntax for code that wasn’t part of its pretraining.

- DeepLearning.ai's [Semantic Caching for AI Agents](https://www.deeplearning.ai/short-courses/semantic-caching-for-ai-agents/) from Redis

> In this course, you’ll build a semantic cache that makes your AI agents faster and more cost-effective by recognizing when different questions mean the same thing. For example, when someone asks “How do I get a refund?” and another asks “I want my money back”， your cache will reuse the answer instead of making another API call, reducing the need for redundant model calls.

- DeepLearning.ai's [Design, Develop, and Deploy Multi-Agent Systems with CrewAI](https://www.deeplearning.ai/courses/design-develop-and-deploy-multi-agent-systems-with-crewai/)

_Disclaimer: This course contains a small portion of content which requires a paid PRO subscription to access._

> Learn how to build multi-agent systems that automate complex, end-to-end workflows. You’ll create intelligent agent teams that plan, reason, and collaborate using tools, memory, and guardrails, and learn how to scale them for production.

- RealPython's [Python MarkItDown: Convert Documents Into LLM-Ready Markdown](https://realpython.com/python-markitdown/)

> The MarkItDown library lets you quickly turn PDFs, Office files, images, HTML, audio, and URLs into LLM-ready Markdown. In this tutorial, you’ll compare MarkItDown with Pandoc, run it from the command line, use it in Python code, and integrate conversions into AI-powered workflows.

- [Build a coding agent with GPT 5.1](https://cookbook.openai.com/examples/build_a_coding_agent_with_gpt-5.1)

> In this guide, we’ll use the Agents SDK to build a coding agent that can scaffold a brand-new app from a prompt and refine it through user feedback.

## Articles

- [Why Performance Matters in Python Development](https://blog.jetbrains.com/pycharm/2025/10/why-performance-matters-in-python-development/)

_Disclaimer: This article contains promotional content regarding JetBrains products._

The blog from JetBrains emphasizes Python performance optimization as a strategic business imperative, not just technical concern. Despite Python's interpreted nature and GIL limitations, most bottlenecks stem from code-level inefficiencies. Performance impacts user experience, scalability, infrastructure costs, and development velocity. Key optimization areas include algorithmic improvements, proper data structures, I/O batching, and appropriate parallelism (threading for I/O-bound, multiprocessing for CPU-bound tasks). The article dispels myths about Python being universally slow, emphasizing profiling-driven optimization over intuition.

- [`await` is Not a Context Switch: Understanding Python's Coroutines vs Tasks](https://mergify.com/blog/await-is-not-a-context-switch-understanding-python-s-coroutines-vs-tasks)

This blog post clarifies a critical distinction in Python's `asyncio`: unlike JavaScript or C#, awaiting a coroutine does not automatically yield control to the event loop. In Python, `await` synchronously executes a coroutine until a suspension occurs; true concurrency and interleaving mainly happen with explicitly created Tasks (`asyncio.create_task`). This means critical sections without internal `await` statements are atomic relative to the event loop. Understanding this prevents unnecessary locking, as race conditions only occur at specific suspension points, not at every `async` function call.

- [`__slots__` for optimizing classes](https://www.pythonmorsels.com/__slots__/)

Python classes store instance attributes in a `__dict__` dictionary by default, allowing dynamic addition but consuming memory. Defining `__slots__ = ('attr1', 'attr2', ...)` replaces `__dict__` with a fixed, efficient array-like structure. Benefits: restricts attributes (no extras allowed), reduces memory usage (e.g., from 271KB to 176KB for 1M Point objects), and speeds up attribute lookups. Ideal for classes with many instances or frequent access.

- [Choose the Right Text Pattern Tool: Regex, Pregex, or Pyparsing](https://codecut.ai/regex-pregex-pyparsing-text-pattern-matching-guide/)

This article compares three Python text pattern matching tools: regex (regular expressions), pregex (human-readable regex alternative), and pyparsing (grammar-based parsing). It teaches when to use each tool for extracting emails, phone numbers, and parsing structured data. The guide helps developers choose the right approach for different text processing scenarios in Python.

- [How to use UUIDv7 in Python, Django and PostgreSQL](https://www.paulox.net//2025/11/14/how-to-use-uuidv7-in-python-django-and-postgresql/)

This guide explains using UUIDv7 -- time-ordered IDs for better index locality than UUIDv4 -- in Python 3.14 (`uuid.uuid7()`), Django 5.2 models, and PostgreSQL 18 (native `uuidv7()` generation and `uuid_extract_timestamp()` via GeneratedFields). Covers setup, migrations, client-side (SQLite) vs. DB-side generation, testing, and considerations for other databases like MySQL/Oracle. Recommends masking (UUIDv47) for public APIs to hide timestamps.

- [Python package managers: uv vs pixi?](https://jacobtomlinson.dev/posts/2025/python-package-managers-uv-vs-pixi/)

This post compares Python package managers uv (fast Rust pip reimplementation for PyPI) and pixi (next-gen conda for PyPI + conda-forge). uv suits scripts, apps, libraries; pixi excels in AI/CUDA/science with compiled deps. Historical evolution: pip → conda binaries → mamba speed → declarative locking. Author's recommendations: uv for most, pixi for GPU/research, conda+uv for interdependent libs.

- [Introducing GPT-5.1 for developers](https://openai.com/index/gpt-5-1-for-developers/)

OpenAI has released GPT-5.1 for the API platform, a model designed to balance intelligence and speed for agentic and coding tasks. It features adaptive reasoning, where the model dynamically adjusts thinking time based on task complexity—processing simple requests significantly faster while remaining persistent on difficult problems.

Key updates include:

- No Reasoning Mode: A setting for ultra-low latency tasks like tool calling and search, behaving like a standard non-reasoning model but with GPT-5.1's intelligence base.
- Extended Prompt Caching: Supports up to 24-hour cache retention to lower costs and latency for long-context workflows.
- New Developer Tools: Introduces `apply_patch` for reliable, structure-aware code editing and a `shell` tool for executing local commands.
- GPT-5.1 utilizes a more steerable coding personality and outperforms GPT-5 on benchmarks like SWE-bench Verified (76.3%). It is available immediately to developers on paid tiers, with pricing matching GPT-5. Specialized `codex` versions were also released for agentic coding workflows.

- [A new era of intelligence with Gemini 3](https://blog.google/products/gemini/gemini-3/)

![gemini-3-pro-tops-webdev-arena](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/gemini_3_webdev_arena_leaderboar.width-1000.format-webp.webp)

Google has introduced Gemini 3, its most intelligent and capable AI model to date. Gemini 3 Pro delivers state-of-the-art performance in multimodal reasoning, coding, and long-horizon planning, outperforming previous models on major benchmarks like Humanity’s Last Exam.

Key features include:

- Enhanced Reasoning: The model offers deeper nuance and reduced sycophancy. A new Deep Think mode, coming soon to Ultra subscribers, pushes reasoning capabilities even further for complex problem-solving.
- Developer Tools: Google launched **Antigravity**, a new agentic development platform where AI agents can autonomously plan, code, and validate software.
- Practical Applications: Gemini 3 helps users learn by synthesizing diverse inputs (like video and text), build complex apps via "vibe coding," and handle multi-step planning tasks for daily life.
- Gemini 3 is available immediately across Google products, including the Gemini app, AI Studio, Vertex AI, and within Google Search's AI Mode. The release emphasizes robust safety testing and improved resistance to misuse.

- [ADK architecture: When to use sub-agents versus agents as tools](https://cloud.google.com/blog/topics/developers-practitioners/where-to-use-sub-agents-versus-agents-as-tools)

This blog post compares _sub-agents_ vs. _agents as tools_ in multi-agent AI systems. Agents as tools are stateless, reusable for discrete tasks (e.g., NL2SQL, DB execution) with isolated context. Sub-agents are stateful, collaborative for complex workflows (e.g., data visualization, travel planning) sharing parent context. Decision matrix: Use tools for low-complexity/reusable tasks; sub-agents for high-complexity/stateful processes. Real-world cases include data analysis and trip planning.

- [The Learning Loop and LLMs](https://martinfowler.com/articles/llm-learning-loop.html)

The article argues that software development is fundamentally a learning process, not an assembly line. While LLMs excel at removing friction and generating code, they cannot replace the essential learning loop of observe-experiment-apply. True expertise comes from hands-on experience and understanding, not just AI-generated solutions. LLMs are best used as brainstorming partners, not autonomous builders, to avoid the "maintenance cliff" where systems become unmaintainable due to lack of deep understanding.

- [why agents DO NOT write most of our code - a reality check](https://octomind.dev/blog/why-agents-do-not-write-most-of-our-code-a-reality-check)

The article provides a reality check on AI coding agents. Despite building AI agents themselves, Octomind finds that most of their code is still written by humans. Through practical experiments, the author reveals that AI agents struggle with maintaining codebase mental models, produce overly verbose code (1000+ line PRs), lack self-reflection about their limitations, and often miss critical issues like transaction handling. While AI is valuable for brainstorming, debugging, and small tasks, the dream of agents writing most production code remains far from reality.

- [Becoming a Core Developer](https://stefaniemolin.com/articles/open-source/becoming-a-core-developer/)

Stefanie Molin became a numpydoc core developer by creating a pre-commit hook for docstring validation. Starting from fixing docstrings at a Scikit-Learn sprint, she developed `AstValidator` using Python's `ast` module for static analysis, avoiding code execution. This led to numpydoc-validation (v1.6.0+), with CLI linting and config via `pyproject.toml`. After PR merge and improvements, she joined as core dev in April 2024.

- [What caused the large AWS outage?](https://newsletter.pragmaticengineer.com/p/what-caused-the-large-aws-outage)

A major AWS outage on October 20, 2025 was caused by a DynamoDB DNS failure in us-east-1. The 14-hour incident started when race conditions between DNS enactors emptied DynamoDB's DNS records, making the database appear offline. This cascaded to EC2's droplet management system, causing capacity shortages and network connectivity issues that took 12+ hours to fully resolve.

- [Cloudflare outage on November 18, 2025](https://blog.cloudflare.com/18-november-2025-outage/)

On November 18, 2025, Cloudflare experienced a significant outage starting at 11:20 UTC that disrupted traffic across its network, causing widespread HTTP 5xx errors for customer websites and impacting services like Workers KV, Access, and the Dashboard.

The outage was not caused by a cyberattack but by an internal configuration error. A change to database permissions caused a query to generate duplicate entries in a "feature file" used by Cloudflare’s Bot Management system. This doubling in file size exceeded a hardcoded memory limit within the core proxy software, causing the system to crash (panic) globally.

Cloudflare engineers initially suspected a DDoS attack but soon identified the corrupt file. They resolved the issue by halting the bad file's propagation and manually reverting to a known good version. Core traffic began flowing normally by 14:30 UTC, and all systems were fully restored by 17:06 UTC. Cloudflare has apologized and is implementing new safeguards, such as stricter file validation and global kill switches, to prevent future occurrences.

## Podcasts

### 🥝 core.py

- [Episode 26.2: CPython Sprint Week in Cambridge UK, Part 2](https://open.spotify.com/episode/7rj1Sxqw8oOUvgkbbh59PN)

### 🐍 RealPython Podcast

- [Episode 273: Advice for Writing Maintainable Python Code](https://realpython.com/podcasts/rpp/273/)
- [Episode 274: Preparing Data Science Projects for Production](https://realpython.com/podcasts/rpp/274/)
- [Episode 275: Building a FastAPI Application & Exploring Python Concurrency](https://realpython.com/podcasts/rpp/275/)

### 🥧 Python Bytes Podcast

- [#456 You're so wrong](https://pythonbytes.fm/episodes/show/456/youre-so-wrong)
- [#457 Tapping into HTTP](https://pythonbytes.fm/episodes/show/457/tapping-into-http)
- [#458 I will install Linux on your computer](https://pythonbytes.fm/episodes/show/458/i-will-install-linux-on-your-computer)
- [#459 Inverted dependency trees](https://pythonbytes.fm/episodes/show/459/inverted-dependency-trees)

### 🦜 Talk Python to me

- [#526: Building Data Science with Foundation LLM Models](https://talkpython.fm/episodes/show/526/building-data-science-with-foundation-llm-models)
- [#527: MCP Servers for Python Devs](https://talkpython.fm/episodes/show/527/mcp-servers-for-python-devs)

### 🍕 Pybites Podcast

- [#204: The science of open science - with Leah Wasser, founder of pyOpenSci](https://www.pybitespodcast.com/1501156/episodes/17969765-204-the-science-of-open-science-with-leah-wasser-founder-of-pyopensci)
- [#205: Building reactive Python notebooks with Marimo](https://www.pybitespodcast.com/1501156/episodes/18047967-205-building-reactive-python-notebooks-with-marimo)
- [#206: The Power of One Clear Goal: Kishan Patel on building a Developer Mindset](https://www.pybitespodcast.com/1501156/episodes/18217165-the-power-of-one-clear-goal-kishan-patel-on-building-a-developer-mindset)

### 🚀 VS Code Insiders Podcast

- [Episode 12: Behind the Scenes of VS Code’s Planning Agent with Bhavya U](https://www.vscodepodcast.com/12)
- [Episode 13: Beyond the Keynote: VS Code at GitHub Universe 2025](https://www.vscodepodcast.com/13)
- [Episode 14: Designing for Everyone: Accessibility in VS Code with Megan Rogge](https://www.vscodepodcast.com/14)
- [Episode 15: Taming AI Assisted Coding Models with Eleanor Berger](https://www.vscodepodcast.com/15)

## Repositories

- [hyperflask](https://github.com/hyperflask/hyperflask) (MIT)

hyperflask is a Flask-based (very) opiniated full-stack web framework where all the tech choices have been made. It combines multiple Flask extensions and frontend libraries into a seamless experience.

- [langchain-ai/deepagents](https://github.com/langchain-ai/deepagents) (MIT)

Primarily inspired by Claude Code, deepagents is an agent harness built on langchain and langgraph, which is equipped with a planning tool, a filesystem backend, and the ability to spawn subagents - making them well-equipped to handle complex agentic tasks.

- [MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli) (Apache 2.0)

Kimi CLI is yet another command-line agent but built within Python ecosystem unlike other Claude Code-alike tools. Apart from agentic coding, it can also be switched to "shell mode" where you can run (some of) shell commands.

- [MemMachine](https://github.com/MemMachine/MemMachine) (Apache 2.0)

MemMachine is a open-source, "universal" memory layer for AI agents which persists across multiple sessions, agents, and large language models. It provides Python SDK, RESTful API as well as MCP for easy integration with agents.

- [OpenRouterTeam/python-sdk](https://github.com/OpenRouterTeam/python-sdk) (Apache 2.0)

This is OpenRouter's official Python SDK, a type-safe toolkit for building AI applications with access to 300+ language models through a unified API. You can find the docs [here](https://openrouter.ai/docs/sdks/python).

---

## Have time for some fun?

### Golden Joystick Awards 2025

![golder-joystick-ultimate-game-of-the-year](https://cdn.mos.cms.futurecdn.net/pqnA52wxB3ZWa6sVPJvyJZ-1200-80.jpg.webp)

The Golden Joystick Awards revealed its winners for 2025 on November 20th! Congratulations to the winners, especially **Clair Obscure Expedition 33** which was crowned the Ultimate Game of the Year (UGOTY) along with other six thophies, for their outstanding contributions to the video game industry!

---

As we wrap up this journey together, I want to take a moment to express my gratitude for your reading. If you've enjoyed what you just read and would like to help sustain this blog, consider [starring this blog on github](https://github.com/blueberry-py/blog/stargazers), it would be great motivation for me to keep updating the blogs!

Alright, that concludes the November Edition of "This Month of Pythonistas". Thank you again for reading my post. I hope you enjoy it or find something useful. Happy coding and see you in December!
