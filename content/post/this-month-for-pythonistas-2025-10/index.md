+++
title = "This Month for Pythonistas - October 2025"
description = "Python 3.14 final, Ubuntu 25.10, LangChain v1, more Agentic AI and other fun stuff"
slug = "this-month-for-pythonistas-2025-10"
date = 2025-10-31T21:00:00+08:00
authors = ["Zeyang Lin"]
tags = ["python", "cli", "linux", "podcast", "news", "agentic"]
categories = ["python"]
series = ["this month for pythonistas"]
keywords = ["python", "linux", "podcast", "AI", "LLM", "agent", "mcp", "langchain", "django", "pytorch"]
image = "title.jpg"
draft = false
+++

```python
from datetime import date

print(date.today().year, date.today().month)
# 2025 10
```

![issue-2025-10](splash.jpg)

Welcome back Pythonistas! In this big month for Python community, I'm glad to see you back reading the eighth issue of my "This month for Pythonistas" series which curates the news, articles, tutorials, podcasts, and more Python stuff worth noting in this month.

Before we continue, please note that this blog is synced across the following platforms:

- [Github Pages](https://blueberry-py.github.io/blog/post/this-month-for-pythonistas-2025-10/)
- [Netlify](https://blueberrypy.netlify.app/post/this-month-for-pythonistas-2025-10/)
- [Render](https://blueberrypy.onrender.com/post/this-month-for-pythonistas-2025-10/)

Ready? Let's get started!

---

## Events & Social

### OpenAI DevDay 2025

OpenAI DevDay 2025 was held on October 6, 2025 at Fort Mason in San Francisco. The keynote was delivered by CEO Sam Altman and featured special guest Jony Ive, the renowned Apple designer. The event focused on empowering developers to build groundbreaking applications faster than ever.

Highlights include:

- [Apps in ChatGPT](https://openai.com/index/introducing-apps-in-chatgpt/) and [Apps SDK](https://developers.openai.com/apps-sdk/)
- [AgentKit](https://platform.openai.com/docs/guides/agents/agent-builder)
- Sora 2 and Sora 2 Pro
- GPT-5 Pro API
- [Codex General-Available](https://openai.com/index/codex-now-generally-available/)
- GPT-Realtime-mini

### Github Universe 25

At **Github Universe 25**, which was held on October 28 - 29, 2025, GitHub announces **Agent HQ** - a unified platform bringing coding agents from Anthropic, OpenAI, Google, Cognition, and xAI directly into GitHub workflows as part of Copilot subscriptions. Features include mission control for managing agents across devices, VS Code integration with plan mode and custom agents, enterprise governance tools, code quality checks, and metrics dashboards. It would be available starting with OpenAI Codex for Copilot Pro+ users in VS Code Insiders.

A comprehensive recap can be found [here](https://github.com/events/universe/recap).

## New Versions

### Python 3.14.0 final

[![python3.14](https://hugovk.dev/python-3.14.png)](https://www.python.org/downloads/release/python-3140/)

Python 3.14 (Pi, 𝜋, or Pie) is finally here! This release brings officially supported free-threaded build and lots of new features. Besides, Python 3.13.9 is also released.

Python 3.12.12, 3.11.14, 3.10.19 and 3.9.24 are the latest security-only releases.

Python 3.9 is reaching End-Of-Life this October, so don't forget to upgrade!

### Python 3.15.0 alpha 1

Python 3.15.0 alpha 1 is the first of seven planned alpha releases for the Python 3.15 series. Key highlights include:

- Statistical Sampling Profiler (PEP 799): A new high-performance profiling tool with virtually zero overhead that can sample at up to 1,000,000 Hz
- UTF-8 as Default Encoding (PEP 686): Python now uses UTF-8 as the default encoding for I/O operations, improving cross-platform compatibility
- New C API (PEP 782): Introduction of PyBytesWriter for creating Python bytes objects
- Improved Error Messages: Enhanced developer experience with better error reporting

### LangChain 1.0 & LangGraph 1.0

This version marks LangChain's commitment to stability with no breaking changes until 2.0, while reducing complexity and focusing on core agent functionality.

### CrewAI 1.0

CrewAI 1.0 represents the transition from beta/experimental to production-grade enterprise solution, with better stability, enterprise features, and a more mature ecosystem while maintaining the core multi-agent orchestration capabilities.

### PyTorch 2.9

The 2.9 release focuses on enhancing multi-GPU programming, expanding hardware compatibility, and improving the developer experience for C++ extensions while maintaining performance optimizations.

Major New Features include:

- Symmetric Memory: New feature enabling easier multi-GPU kernel programming
- Enhanced torch.compile: Ability to arbitrarily toggle error or resume on graph breaks
- Expanded Hardware Support: Added ROCm, XPU, and CUDA 13 wheel variants
- FlexAttention: Now enabled on Intel GPUs with flash decoding optimization on x86 CPUs
- Arm Platform: Improvements and optimizations for Arm architecture
- Linux aarch64: Binary wheel builds across all CUDA versions

### isort 7.0

isort 7 is a conservative major release focused on updating Python version support and maintaining compatibility with newer Python versions. The changes are relatively minor compared to the major architectural changes seen between versions 4.x → 5.x. The main impact for users will be the requirement for Python 3.10+ and improved debugging information for file processing.

### Ubuntu 25.10

Ubuntu 25.10 "Questing Quokka" is released! It "introduces GNOME 49 with media and power controls on the lock screen, HDR brightness settings, and enhanced accessibility features in line with the European Accessibility Act."

It "also debuts Rust-based implementations of sudo and coreutils for improved memory safety, and adopts the new RVA23 profile as the baseline for RISC-V, paving the way to Ubuntu 26.04 LTS."

Other spins like Xubuntu, Lubuntu, Kubuntu, edubuntu, and Ubuntu Studio are also released. Pick your favorite and start coding!

## Tutorials

- DeepLearning.ai's [Agentic AI](https://www.deeplearning.ai/courses/agentic-ai/) by Andrew Ng

> In this course taught by Andrew Ng, you’ll gain a fundamental understanding and practical knowledge to develop production-ready agentic applications, from design patterns to deployment and evaluation.

- DeepLearning.ai's [Building Live Voice Agents with Google’s ADK](https://www.deeplearning.ai/short-courses/building-live-voice-agents-with-googles-adk/) from Google

> You’ll learn how to build and deploy AI agents with Google’s open source Agent Development Kit (ADK). ADK provides modular components such as models, tools, memory, and orchestration, that make it easier to create both simple and complex systems.

- DeepLearning.ai's [Governing AI Agents](https://www.deeplearning.ai/short-courses/governing-ai-agents/) from databricks

> Explore what it means to govern an agent, how to apply governance policies to a real dataset in Databricks, and how to add observability to track and debug performance. Through this course, you’ll know how to build agents that handle data responsibly while maintaining visibility, and safety.

## Articles

- [Python 3.14: Cool New Features for You to Try](https://realpython.com/python314-new-features/)

As usual, RealPython has a great article on the very latest Python version. This time it compiles a list of the new features in Python 3.14 (eg. t-strings, colorful REPL, deferred annotation evaluation) and demonstrates how to play with them.

- [Python 3.14 Is Here. How Fast Is It?](https://blog.miguelgrinberg.com/post/python-3-14-is-here-how-fast-is-it)

Python 3.14 is the fastest CPython release yet, showing significant improvements over previous versions. Benchmarks tested Fibonacci calculations and bubble sort algorithms across single-threaded and multi-threaded scenarios. Key findings show 3.14 running 27% faster than 3.13 for recursive functions. While the new JIT interpreter showed minimal gains, the free-threading variant delivered impressive 3x speed improvements for CPU-heavy multi-threaded workloads due to GIL removal. PyPy remained exceptionally fast, outperforming even Node.js in some tests, while Rust demonstrated the highest performance overall.

- [The future of Python web services looks GIL-free](https://blog.baro.dev/p/the-future-of-python-web-services-looks-gil-free)

Python 3.14's free-threaded implementation (no GIL) shows promising results for web services. Benchmarks reveal ASGI apps maintain similar performance with 20% lower memory usage, while WSGI apps see 3-4x throughput improvements for CPU-bound tasks. Despite 5-10% performance penalty in pure Python Python code, the elimination of GIL contention enables true multi-core utilization, potentially revolutionizing Python web deployment by simplifying concurrency and reducing memory requirements.

- [T-strings: Python's Fifth String Formatting Technique?](https://www.pythonmorsels.com/t-strings-in-python/)

Python 3.14 introduces t-strings, a fifth string formatting technique that returns Template objects instead of strings. Unlike f-strings which immediately interpolate values, t-strings enable lazy string interpolation - useful for library authors who need to pre-process inputs (like escaping SQL/HTML) before final string creation. T-strings use `t"..."` syntax and are primarily designed for tool/library maintainers, not typical Python developers.

- [Build Production-Ready LLM Agents with LangChain 1.0 Middleware](https://codecut.ai/langchain-1-0-middleware-production-agents/)

This tutorial demonstrates how to build production-ready LLM agents using LangChain 1.0's new middleware architecture. It covers five essential middleware components:

- Message Summarization: Manages context windows by condensing conversations
- PII Filtering: Protects sensitive data through automatic redaction
- Human-in-the-Loop: Adds approval workflows for sensitive actions
- Task Planning: Structures complex requests into manageable subtasks
- Intelligent Tool Selection: Pre-filters tools to reduce costs and improve accuracy

The middleware follows web server patterns, providing reusable, testable components that can be composed together. Each focuses on a single responsibility (monitor, modify, control, or enforce) and integrates seamlessly to build robust production agents with minimal infrastructure code.

- [Django: one ORM to rule all databases 💍](https://www.paulox.net/2025/10/06/django-orm-comparison/)

This article provides a comprehensive comparison of Django ORM features across PostgreSQL, SQLite, MariaDB, MySQL, and Oracle. It includes detailed feature matrices showing support levels (✅/⚠️/🚫) for various functionality including field types, constraints, query features, transactions, and GIS capabilities, using fictional data to illustrate what an automated feature comparison matrix could look like in Django's official documentation.

- [Why Reactive Programming Hasn't Taken Off in Python (And How Signals Can Change That)](https://bui.app/why-reactive-programming-hasnt-taken-off-in-python-and-how-signals-can-change-that/)

Reactive programming hasn't gained traction in Python because existing tools like RxPY are designed for event streams and require complex subscription management. However, signal-based reactive programming offers Python developers automatic state synchronization like spreadsheet formulas, reducing bugs and improving maintainability. The `reaktiv` library provides transparent, synchronous updates where derived values automatically stay in sync with base data without manual coordination.

- [From Claude Code to Agentic RAG](https://vectifyai.notion.site/agentic-retrieval)

The article advocates moving from traditional vector-based RAG systems to "agentic retrieval" - letting LLMs reason through documents directly. It introduces `PageIndex`, a vectorless hierarchical indexing system that creates human-like table-of-contents trees. Instead of complex vector databases, it gives LLMs navigational tools to find and retrieve relevant content, mirroring how Claude Code uses simple tools like grep. PageIndex achieved 98.7% accuracy on FinanceBench while requiring minimal infrastructure.

- [Vibe engineering](https://simonwillison.net/2025/Oct/7/vibe-engineering/)

Simon Willison proposes "vibe engineering" as the opposite of "vibe coding" - a sophisticated, accountable approach where experienced engineers use AI tools like coding agents responsibly. This method rewards advanced software practices: comprehensive testing, planning, documentation, version control, and good management skills.

- [State of LLMs in Late 2025](https://blog.arcbjorn.com/state-of-llms-2025)

The 2025 LLM landscape is hyper-specialized, moving from single generalist models to a diverse ecosystem where each model has distinct strengths. The article analyzes GPT-5's unified intelligence system with automatic model switching, Claude Sonnet 4.5's coding dominance (77% SWE-bench), open-source Llama 4 variants with 10M token contexts, Grok 4's mathematical supremacy, and efficient alternatives like Mistral. It provides practical guidance on choosing the right model based on specific use cases rather than "which is smartest," reflecting the era of tailored AI tools for specific tasks.

- [Two things LLM coding agents are still bad at](https://kix.dev/two-things-llm-coding-agents-are-still-bad-at/)

LLM coding agents struggle with two key areas. First, they don't use copy-paste operations—instead of moving code directly, they delete from the source and write from memory into the destination, which feels unnatural compared to human programming habits. Second, they're terrible at asking clarifying questions when uncertain; instead they make assumptions and brute-force solutions until hitting walls.

- [AI can code, but it can't build software](https://bytesauna.com/post/coding-vs-software-engineering)

The article argues that while AI can generate code, it cannot truly "build software" - the complex engineering required to create production-ready applications. Coding is solving isolated problems, but software engineering involves managing complexity, integration, and long-term maintainability. AI can demo features, but transforming prototypes into robust systems requires human expertise, explaining why non-technical founders still seek technical co-founders despite AI tools.

## Podcasts

### 🥝 core.py

- [Episode 26.1: CPython Sprint Week in Cambridge UK, Part 1](https://open.spotify.com/episode/3zMQYlP7hF7fKi8wdlAxyn)
- [Episode 26.2: CPython Sprint Week in Cambridge UK, Part 2](https://open.spotify.com/episode/...)

### 🐍 RealPython Podcast

- [Episode 268: Advice on Beginning to Learn Python](https://realpython.com/podcasts/rpp/268/)
- [Episode 269: Python 3.14: Exploring the New Features](https://realpython.com/podcasts/rpp/269/)
- [Episode 270: Evolving Teaching Python in the Classroom](https://realpython.com/podcasts/rpp/270/)
- [Episode 271: Benchmarking Python 3.14 & Enabling Asyncio to Scale](https://realpython.com/podcasts/rpp/271/)
- [Episode 272: Michael Kennedy: Managing Your Own Python Infrastructure](https://realpython.com/podcasts/rpp/272/)

### 🥧 Python Bytes Podcast

- [#452 pi py-day (or is it py pi-day?)](https://pythonbytes.fm/episodes/show/452/pi-py-day-or-is-it-py-pi-day)
- [#453 Python++](https://pythonbytes.fm/episodes/show/453/python)
- [#454 It's some form of Elvish](https://pythonbytes.fm/episodes/show/454/its-some-form-of-elvish)
- [#455 Gilded Python and Beyond](https://pythonbytes.fm/episodes/show/455/gilded-python-and-beyond)

### 🦜 Talk Python to me

- [#522: Data Sci Tips and Tricks from CodeCut.ai](https://talkpython.fm/episodes/show/522/data-sci-tips-and-tricks-from-codecut.ai)
- [#523: Pyrefly: Fast, IDE-friendly typing for Python](https://talkpython.fm/episodes/show/523/pyrefly-fast-ide-friendly-typing-for-python)
- [#524: 38 things Python developers should learn in 2025](https://talkpython.fm/episodes/show/524/38-things-python-developers-should-learn-in-2025)
- [#525: NiceGUI Goes 3.0](https://talkpython.fm/episodes/show/525/nicegui-goes-3.0)

### 🍕 Pybites Podcast

- [#203: Automating API Documentation with Zylosystems](https://www.pybitespodcast.com/1501156/episodes/17891539-203-automating-api-documentation-with-zylosystems)

### VS Code Insiders Podcast

- [Episode 8: Impact of AI on How We Learn to Code with Scott Tolinski](https://www.vscodepodcast.com/8)
- [Episode 9: Building agent memory for VS Code with Harald Kirschner](https://www.vscodepodcast.com/9)
- [Episode 10: Mastering Chat Modes in VS Code with Burke Holland](https://www.vscodepodcast.com/10)
- [Episode 11: Building & Scaling Open Source Communities with Steve Francia](https://www.vscodepodcast.com/11)

## Repositories

- [claude-agent-sdk-python](https://github.com/anthropics/claude-agent-sdk-python/) (MIT)

Claude Code SDK is renamed to Claude Agent SDK. It helps developers build powerful autonomous agents using Claude.

- [microsoft/agent-framework](https://github.com/microsoft/agent-framework) (MIT)

MAF is Microsoft's comprehensive multi-language framework for building, orchestrating, and deploying AI agents with support for both .NET and Python implementations. It's developed by the core AutoGen and Semantic Kernel teams at Microsoft, and is designed to be a new foundation for building AI applications going forward.

- [microsoft/agent-lightning](https://github.com/microsoft/agent-lightning) (MIT)

"The absolute trainer to light up AI agents."

- [PageIndex](https://github.com/VectifyAI/PageIndex) (MIT)

`PageIndex` is a Vector-less, reasoning-based RAG system that simulates how human experts navigate and extract knowledge from long documents through tree search, enabling LLMs to think and reason their way to the most relevant document sections.

- [/dev/push](https://github.com/hunvreus/devpush) (MIT)

`/dev/push` is a open-source Platform as a Service (PaaS) written in Python and HTML for developers to build and deploy their applications. It is self-hostable and can be considered as an alternative to Vercel, Netlify, etc.

- [mitmproxy/pdoc](https://github.com/mitmproxy/pdoc) (MIT-0)

`pdoc` is a Python library for generating API documentation from code and comments.

- [ludo-technologies/pyscn](https://github.com/ludo-technologies/pyscn) (MIT)

`pyscn` is a Python code quality analyzer written in Go. It detects dead code, tracks module dependencies, and analyzes complexity, etc. to make your code base more maintainable.

---

As we wrap up this journey together, I want to take a moment to express my gratitude for your reading. If you've enjoyed what you just read and would like to help sustain this blog, consider [starring this blog on github](https://github.com/blueberry-py/blog/stargazers), it would be great motivation for me to keep updating the blogs!

Alright, that concludes the October Edition of "This Month of Pythonistas". Thank you again for reading my post. I hope you enjoy it or find something useful. Happy coding and see you in November!
