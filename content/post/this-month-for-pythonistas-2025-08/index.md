+++
title = "This Month for Pythonistas - August 2025"
description = "Python 3.14 RC2 & 3.13.7, OpenAI open models, Agentic AI and other fun stuff"
slug = "this-month-for-pythonistas-2025-08"
date = 2025-08-31T21:00:00+08:00
authors = ["Zeyang Lin"]
tags = ["python", "cli", "linux", "podcast", "news"]
categories = ["python"]
series = ["this month for pythonistas"]
keywords = ["python", "linux", "podcast", "AI", "LLM", "agent", "mcp", "openai"]
image = "title.jpg"
draft = false
+++

```python
from datetime import date

print(date.today().year, date.today().month)
# 2025 8
```

![issue-2025-08](splash.jpg)

Welcome back Pythonistas! I'm glad to see you back reading the sixth issue of my "This month for Pythonistas" series which curates the news, articles, tutorials, podcasts, and more Python stuff worth noting in this month.

Before we continue, please note that this blog is synced across several platforms:

- [Github Pages](https://blueberry-py.github.io/blog/post/this-month-for-pythonistas-2025-08/)
- [Netlify](https://blueberrypy.netlify.app/post/this-month-for-pythonistas-2025-08/)
- [Render](https://blueberrypy.onrender.com/post/this-month-for-pythonistas-2025-08/)

Ready? Let's get started!

---

## Events & Social

[Python: The Documentary | An origin story](https://www.youtube.com/watch?v=GfH4QL4VqJ0) is available on Youtube now.

## New Versions

### Python 3.13.7

Python 3.13.7 is an expedited release which aims to fix a significant issue with the 3.13.6 release:
> `gh-137583`: Regression in ssl module between 3.13.5 and 3.13.6: reading from a TLS-encrypted connection blocks

The official downloads are available [here](https://www.python.org/downloads/release/python-3137/).

### Python 3.14 RC2

> This is the penultimate release candidate of Python 3.14.

RC2 was originally planned as the final Release Candidate, but a bug was discovered and a third RC is scheduled in September, before October's 3.14 final release.

The official downloads are available [here](https://www.python.org/downloads/release/python-3140rc2/).

## Tutorials

- DeepLearning.ai's [Claude Code: A Highly Agentic Coding Assistant](https://www.deeplearning.ai/short-courses/claude-code-a-highly-agentic-coding-assistant/) from Anthropic

> In this course, you’ll learn best practices for using Claude Code to improve your coding workflow. You’ll learn key tips on how to provide Claude Code with clear context, such as specifying the relevant files, clearly defining the features and functionality, and connecting Claude Code to MCP servers.

- DeepLearning.ai's [Agentic Knowledge Graph Construction](https://www.deeplearning.ai/short-courses/agentic-knowledge-graph-construction/) from neo4j

> You’ll implement an agentic system using Google’s Agent Development Kit (ADK), to build a knowledge graph that helps you find the root cause of product issues. You’ll work with structured data consisting of product and supplier information, and unstructured data consisting of product reviews.

- Coursera's [Fast Prototyping of GenAI Apps with Streamlit](https://www.coursera.org/learn/fast-prototyping-of-genai-apps-with-streamlit)

> Build and iterate GenAI apps in hours instead of days! Start with a simple chatbot, then add prompt engineering and RAG powered by Snowflake’s secure data and LLM services, then push your prototype to Snowflake or Streamlit Community Cloud for instant feedback and quick improvement.

- RealPython's [AsyncIO Python](https://realpython.com/async-io-python/)

> In this tutorial, you’ll learn how Python asyncio works, how to define and run coroutines, and when to use asynchronous programming for better performance in applications that perform I/O-bound tasks.

- RealPython's [What Are Mixin Classes in Python?](https://realpython.com/python-mixin/)

> Mixins offer a powerful way to reuse code across multiple Python classes without forcing them into a rigid inheritance hierarchy. Instead of building deep and brittle class trees, you can use mixins to share common behaviors in a modular and flexible way.

## Articles

- [How Python Grew From a Language to a Community](https://thenewstack.io/how-python-grew-from-a-language-to-a-community/)

Python's growth from a programming language to a thriving community represents an inspiring story of collaboration and dedication. Starting in 1991, Python began as a pet project by Guido van Rossum, distributed through Usenet newsgroups. The pivotal moment came in 1994 with an in-person meeting of 20 developers in Maryland, where the Python community was born as something separate from the language itself.

The journey from these humble beginnings to becoming the world's #1 programming language involved several key phases. Early attempts to commercialize Python through a consortium model failed, but the passion and commitment of its community led to the creation of the nonprofit Python Software Foundation in 2001. This foundation, guided by open-source principles, employed Python's core team to work full-time on the language.

PyCon conferences became the "real engine for change", generating revenue through sponsorships from tech giants like Google. This funding enabled the foundation to hire professional staff and support ongoing development and infrastructure projects. The foundation's commitment to diversity and heterogeneous cultures positioned Python to capitalize on emerging trends like AI, ensuring its continued relevance and growth in the tech landscape.

- [The State of Python 2025](https://blog.jetbrains.com/pycharm/2025/08/the-state-of-python-2025/)

The article summarizes key findings from the 2025 Python Developers Survey, highlighting major trends in the Python ecosystem. It notes that 86% of respondents use Python as their main language, emphasizing its central role. Importantly, 50% of developers have less than two years of professional coding experience, and 39% have less than two years with Python. This underscores Python’s popularity among beginners and the importance of supporting newcomers with detailed tutorials and resources. The insights are based on over 30,000 responses and aim to guide both individual developers and tool vendors.

- [pyx: a Python-native package registry, now in Beta](https://astral.sh/blog/introducing-pyx)

Astral.sh's ambition to build Python's next-gen infrastructure (the Astral Platform) begins with `pyx`, a "Python-native package registry" which could be seen as an optimized backend for tools like `uv`. Some of its early partners are already using it while other have to submit their information to be on the waitlist.

- [Inside HRT’s Python Fork: Leveraging PEP 690 for Faster Import](https://www.hudsonrivertrading.com/hrtbeat/inside-hrts-python-fork/)

HRT implemented "lazy imports" by forking CPython, using Meta's `Cinder` patches. This defers module loading until first use, solving import overhead in their Python monorepo. After migration challenges (2023-2024), all HRT Python now uses lazy imports by default, cutting CLI startup times and distributed compute overhead dramatically.

- [How Your Code Runs in a JIT Build](https://savannah.dev/posts/how-your-code-runs-in-a-jit-build/)

This post explains how JIT compilation works in Python, focusing on CPython's Tier 2 and Tier 3 optimizations. It covers bytecode evolution, how code transforms from Tier 1 basic bytecode through Tier 2 micro-ops to Tier 3 machine code, the role of specializations for common patterns, and how JIT bridges Python's flexibility with C-like performance through runtime optimization based on actual execution patterns.

- [asyncio: a library with too many sharp corners](https://sailor.li/asyncio)

The article criticizes Python's `asyncio` library and suggests that it is "too many sharp corners". It details four major problems: cancellation is broken (edge-triggered vs level-triggered), tasks can be garbage collected while pending due to weak references, I/O APIs are convoluted callback-based systems inherited from `Twisted`, and `asyncio.Queue` has poor backpressure handling. Additional issues include thread integration problems, signal handling limitations, and broken eager tasks. The author recommends using `Trio` or `AnyIO` libraries instead, which implement cancellation properly with level-triggered semantics and saner I/O abstractions.

- [From Async/Await to Virtual Threads](https://lucumr.pocoo.org/2025/7/26/virtual-threads/)

In this post Armin Ronacher explores the concept of virtual threads and structured concurrency as a way to simplify concurrent programming, especially in Python. It contrasts traditional async/await models with the idea of virtual threads managed in thread groups, where parallel tasks are spawned and automatically managed with cancellation and error propagation.

- [Agentic Coding Things That Didn’t Work](https://lucumr.pocoo.org/2025/7/30/things-that-didnt-work/)

This is another post from Armin Ronacher in which Armin discusses various approaches and tools to improve workflow automation with LLMs but found ineffective. It is highlighted that clear, manual instruction often outperforms elaborate automations. They caution that over-reliance on automation leads to mental disengagement and reduced code quality, emphasizing the importance of active review and critical thinking.

- [AI Agent Design Patterns: How to Build Reliable AI Agent Architecture for Production](https://live-comet-marketing-site.pantheonsite.io/blog/ai-agent-design/)

The article emphasizes that building reliable AI agents requires more than prompt engineering—it needs modular, role-based design, observability, and feedback loops. Modular design assigns specialized roles to agents, making systems scalable and easier to maintain. Observability involves monitoring and logging every step for improvement. Feedback loops enable agents to learn and self-optimize.

- [Best Practices for Building Agentic AI Systems: What Actually Works in Production](https://userjot.com/blog/best-practices-building-agentic-ai-systems)

The article outlines proven best practices for building productive agentic AI systems based on real-world implementation at UserJot. Key insights include using a simple two-tier architecture (primary agent + specialized subagents), keeping subagents stateless for predictability, and employing task decomposition (vertical for sequential tasks, horizontal for parallel processing). The system emphasizes structured communication protocols, parallel execution for performance, and robust error handling with graceful degradation.

- [Building MCP PyExec: Secure Python Execution Server with Docker & Authentication](https://objectgraph.com/blog/building-mcp-pyexec-python-execution-server/)

The blog details building MCP PyExec, a secure Python execution server using the Model Context Protocol (MCP). It covers three components: the PyExec server implementing MCP for streaming Python code execution; an OAuth 2.0 Identity Provider (IDP) for secure authentication supporting authorization code flow, JWT, and token validation; and a PyExec client for testing and interaction that manages OAuth tokens and streaming results.

- [Introducing gpt-oss](https://openai.com/index/introducing-gpt-oss/)

OpenAI has released their first open-weight models since GPT-2 - `gpt-oss-120b` and `gpt-oss-20b` - under Apache 2.0 license.

- [Why Observability Isn’t Just for SREs (and How Devs Can Get Started)](https://signoz.io/blog/why-observability-isnt-just-for-sres/)

This blog post serves as a guide for developers to understand the importance of observability and provides a playbook for integrating it into their workflow. Observability helps developers maintain cleaner code, manage systems better, and reduce technical debt by considering more edge cases and improving debugging processes.

- [Vibe code is legacy code](https://blog.val.town/vibe-code)

This blog highlights that vibe coding quickly generates tech debt as the produced code often becomes legacy code—difficult to understand or maintain. Vibe coding works well for prototypes and throwaway projects but is risky for large, maintainable systems, especially if done by non-programmers. Serious coding with AI requires caution, thorough understanding, and careful maintenance. The author emphasizes that while AI changes programming, deep technical knowledge and theory-building remain essential.

## Podcasts

### 🥝 core.py

- [Episode 25: A Python That Never Was](https://podcasters.spotify.com/pod/show/corepy/episodes/Episode-25-A-Python-That-Never-Was-e37bk50)

### 🐍 RealPython Podcast

- [Episode 259: Design Patterns That Don't Translate to Python](https://realpython.com/podcasts/rpp/259/)
- [Episode 260: Harnessing the Power of Python Polars](https://realpython.com/podcasts/rpp/260/)
- [Episode 261: Selecting Inheritance or Composition in Python](https://realpython.com/podcasts/rpp/261/)
- [Episode 262: Travis Oliphant: SciPy, NumPy, and Fostering Scientific Python](https://realpython.com/podcasts/rpp/262/)
- [Episode 263: Exploring Mixin Classes in Python](https://realpython.com/podcasts/rpp/263/)

### 🥧 Python Bytes Podcast

- [#443 Patching Multiprocessing](https://pythonbytes.fm/episodes/show/443/patching-multiprocessing)
- [#444 Begone Python of Yore!](https://pythonbytes.fm/episodes/show/444/begone-python-of-yore)
- [#445 Auto-activate Python virtual environments for any project](https://pythonbytes.fm/episodes/show/445/auto-activate-python-virtual-environments-for-any-project)
- [#446 State of Python 2025](https://pythonbytes.fm/episodes/show/446/state-of-python-2025)

### 🦜 Talk Python to me

- [#515: Durable Python Execution with Temporal](https://talkpython.fm/episodes/show/515/durable-python-execution-with-temporal)
- [#516: Accelerating Python Data Science at NVIDIA](https://talkpython.fm/episodes/show/516/accelerating-python-data-science-at-nvidia)
- [#517: Agentic Al Programming with Python](https://talkpython.fm/episodes/show/517/agentic-al-programming-with-python)
- [#518: Celebrating Django's 20th Birthday With Its Creators](https://talkpython.fm/episodes/show/518/celebrating-djangos-20th-birthday-with-its-creators)

### 🍕 Pybites Podcast

- [#199: Charlie Marsh on ty, uv, and the Python tooling renaissance](https://www.pybitespodcast.com/1501156/episodes/17587007-199-charlie-marsh-on-ty-uv-and-the-python-tooling-renaissance)
- [#200: Celebrating 200 episodes of our Pybites journey](https://www.pybitespodcast.com/1501156/episodes/17658068-200-celebrating-200-episodes-of-our-pybites-journey)

### VS Code Insiders Podcast

- [Episode 1: Hello GPT-5 & GPT-5 mini](https://www.vscodepodcast.com/1)
- [Episode 2: Iteration Plan for August & Re-writing Terminal Tools](https://www.vscodepodcast.com/2)

## Repositories

- [jd-opensource/oxygent](https://github.com/jd-opensource/oxygent) (Apache 2.0)

`OxyGent` is an open-source Python framework from [JD](www.jd.com) retail department for building production-ready multi-agent AI systems. It provides modular components that snap together like LEGO bricks, enabling efficient development of collaborative AI agents. Features include intelligent real-time task decomposition, elastic distributed architecture, continuous learning capabilities, and standardized tools/LLM integration.

You can find more at their [project website](https://oxygent.jd.com/).

- [google/langextract](https://github.com/google/langextract) (Apache 2.0)

`LangExtract` is a Python library by Google that uses LLMs to extract structured data from unstructured text. Key features include precise source grounding (mapping extractions to exact source locations), optimized handling of long documents via chunking and parallel processing, interactive HTML visualization, and support for cloud models like Gemini and local LLMs via Ollama.

- [nottelabs/notte](https://github.com/nottelabs/notte) (Server Side Public License 1.0)

`Notte` is an open-source web automation framework for building reliable AI agents. It provides essential tools for creating and deploying agents that interact with the web, combining AI reasoning with traditional scripting for cost-efficiency. Key features include structured data extraction, vaults for credential management, stealth browser sessions with CAPTCHA solving, and hybrid workflows.

- [langdiff](https://github.com/globalaiplatform/langdiff) (Apache 2.0)

...

- [mcp-use](https://github.com/mcp-use/mcp-use) (MIT)

This is a Python library that provides a simple way to connect any LLM to any MCP server and build custom MCP agents that have tool access, without using closed source or application clients.

- [openai/gpt-oss](https://github.com/openai/gpt-oss) (Apache 2.0)

This is the repository as part of OpenAI's GPT-OSS, which provides a set of code implementations including a `gpt-oss` Python library, `harmony`, and more.

- [KittenTTS](https://github.com/KittenML/KittenTTS) (Apache 2.0)

This is the accompanying Python library for KittenTTS, an open-source realistic text-to-speech model with just 15 million parameters which can run without a GPU.

---

## Have time for some fun?

### GamesCom 2025

- _Hollow Knight Silk Song_ finally has revealed its launch date: Sept. 4, 2025.
- _Resident Evil Requiem_ debuts a cinematic trailer featuring Grace Ashcroft for the sequel to the critically acclaimed survival horror game franchise.
- _Black Myth: Zhong Kui_ introduces Zhong Kui, a legendary demon-slayer from Chinese folklore, as the central figure of the sequel to hit Black Myth: Wukong.
- _Warhammer 40K Dawn of War IV_ is officially announced.
- _Lords of the Fallen II_ takes place a century after its predecessor, featuring faster and more punishing combat.
- _LEGO Batman: Legacy of the Dark Knight_ covers the story of Batman, starting from a young Bruce Wayne.

---

As we wrap up this journey together, I want to take a moment to express my gratitude for your reading. If you've enjoyed what you just read and would like to help sustain this blog, consider [starring this blog on github](https://github.com/blueberry-py/blog/stargazers), it would be great motivation for me to keep updating the blogs!

Alright, that concludes August Edition of "This Month of Pythonistas". Thank you again for reading my post. I hope you enjoy it or find something useful. Happy coding and see you in September!
