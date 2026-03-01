+++
title = "This Month for Pythonistas - February 2026"
description = "New Python releases, upcoming `frozendict`, Claude 4.6, GPT-5.3, GLM-5, Agent Skills and more fun stuff"
slug = "this-month-for-pythonistas-2026-02"
date = 2026-02-28T21:00:00+08:00
authors = ["Zeyang Lin"]
tags = ["python", "news", "podcast", "llm", "linux"]
categories = ["python"]
series = ["this month for pythonistas"]
keywords = ["python", "2026", "AI", "agentic", "llm", "openai", "anthropic", "claude"]
image = "title.jpg"
draft = false
+++

```python
from datetime import date

print(date.today().year, date.today().month)
# 2026 2
```

![issue-2026-02](splash.jpg)

Welcome back Pythonistas! This is the February 2026 issue of "This Month for Pythonistas", bringing you curated Python news, tutorials, articles, podcasts and community highlights.

Before we continue, please note that this blog is synced across the following platforms:

- [Github Pages](https://blueberry-py.github.io/blog/post/this-month-for-pythonistas-2026-02/)
- [Netlify](https://blueberrypy.netlify.app/post/this-month-for-pythonistas-2026-02/)
- [Render](https://blueberrypy.onrender.com/post/this-month-for-pythonistas-2026-02/)
- [Vercel](https://blueberrypy-blog.vercel.app/post/this-month-for-pythonistas-2026-02/)

Ready? Let's get started!

---

## Events & Social

### [Python Unplugged](https://lp.jetbrains.com/python-unplugged/)

Python Unplugged is a free online conference bringing together the leading voices of the Python community. It would be live on Youtube on 4th of March, 2026 from 11:00 am to 6:30 pm CET.

### [Introducing Claude Opus 4.6](https://www.anthropic.com/news/claude-opus-4-6)

Anthropic has released **Claude Opus 4.6**, its "most capable" AI model yet. The new flagship significantly improves coding, planning, and agentic task execution, with enhanced ability to work autonomously on complex, long-running projects. It features a 1M token context window (first for Opus-class) and achieves state-of-the-art results on key benchmarks including Terminal-Bench 2.0, Humanity's Last Exam, and GDPval-AA, outperforming competitors by wide margins. Despite intelligence gains, Opus 4.6 maintains excellent safety with low misaligned behavior and minimal over-refusals. The model is available now on claude.ai, the API, and major cloud platforms with new developer features including adaptive thinking, effort controls, and context compaction.

### [Introducing GPT-5.3-Codex](https://openai.com/index/introducing-gpt-5-3-codex/)

OpenAI has launched **GPT-5.3-Codex**, a highly capable agentic coding model that is 25% faster and sets new industry records on coding benchmarks like SWE-Bench Pro (56.8%) and Terminal-Bench 2.0 (77.3%). It can build complex games and handle professional tasks beyond coding, including data analysis and presentations. Notably, this model helped accelerate its own development. GPT-5.3-Codex offers real-time interactive steering, strong cybersecurity capabilities classified as "High capability," and is available through paid ChatGPT plans and API access.

### [GLM-5: From Vibe Coding to Agentic Engineering](https://z.ai/blog/glm-5)

GLM-5 is Z.ai's latest model targeting complex systems engineering and long-horizon agentic tasks. It scales up to 744B parameters (40B active) with 28.5T tokens of training data, integrating _DeepSeek Sparse Attention_ for efficiency. A novel asynchronous RL infrastructure called "slime" improves training. GLM-5 achieves best-in-class performance among open-source models on reasoning, coding, and agent benchmarks, ranking #1 on Vending Bench 2 with a $4,432 final balance. It's open-sourced under MIT license, available via API, and supports local deployment with compatibility for Claude Code and OpenClaw.

### [MiniMax M2.5: Built for Real-World Productivity.](https://www.minimax.io/news/minimax-m25)

MiniMax introduces M2.5, a new AI model extensively trained with reinforcement learning in complex real-world environments. It achieves state-of-the-art performance in coding (80.2% SWE-Bench Verified), tool use, search (76.3% BrowseComp), and office work. M2.5 completes tasks 37% faster than its predecessor M2.1, matching Claude Opus 4.6's speed while costing only 10% as much. At $1 per hour (100 tokens/sec) or $0.30 (50 tokens/sec), it offers extremely cost-effective AI for productivity applications.

### [Nano Banana 2: Combining Pro capabilities with lightning-fast speed](https://blog.google/innovation-and-ai/technology/ai/nano-banana-2/)

Google DeepMind has launched Nano Banana 2, a new AI image generation model that combines the advanced capabilities of Nano Banana Pro with the speed of Gemini Flash. The model offers enhanced features including advanced world knowledge with real-time information, subject consistency for up to five characters and 14 objects, precise instruction following, production-ready specs (512px to 4K), and improved visual fidelity.

### [Hello Entire World](https://entire.io/blog/hello-entire-world/)

**Entire**, a new company backed by a $60 million seed round, aiming to create the world's next developer platform for AI‑driven coding agents. Their first product, the **Entire CLI**, introduces "Checkpoints" – a Git‑compatible primitive that automatically records an agent's full context (prompts, transcripts, token usage, tool calls, etc.) with each commit, storing it on a dedicated branch. This makes AI‑generated code traceable, easier to review, and reusable across sessions, while reducing token waste and supporting multiple agents. The CLI is open‑source, supports Claude Code and Gemini now, and will expand to other models. The vision is an AI‑native, open, and scalable software‑development lifecycle.

## New Versions

### Python 3.15.0 alpha 6

This [sixth alpha build](https://www.python.org/downloads/release/python-3150a6/) of 3.15 arrives in the middle of February.

Additionally, _Python 3.14.3_ and _3.13.12_ (both being bugfix releases) are also available.

### transformers 5

**Transformers v5** was released as a major upgrade, with support for over 400 model architectures (up from ~40 in v4) and 750,000+ model checkpoints. Key improvements include 20-30% faster inference, a new modular architecture that simplifies adding models, streamlined tokenizers and image processors, and native quantization support. It also introduces a built-in HTTP server (`transformers serve`) for easy deployment. The library now integrates tightly with popular inference engines like vLLM and SGLang, and supports GGUF files for local execution. Existing v4 checkpoints remain compatible, though PyTorch-only support means Flax/TensorFlow have been deprecated.

### isort 8

isort 8 drops support of Python 3.9, and fixes a number of issues.

## Tutorials

### Deeplearning.ai's [Agent Skills with Anthropic](https://www.deeplearning.ai/short-courses/agent-skills-with-anthropic/) by Anthropic

> In this course, you'll learn how skills work, explore best practices for creating them, and build skills for different use cases. You'll see skills in action across Claude.ai, Claude Code, the Claude API, and the Claude Agent SDK, and learn how to combine them with MCP and subagents for complex workflows.

### Deeplearning.ai's [A2A: The Agent2Agent Protocol](https://www.deeplearning.ai/short-courses/a2a-the-agent2agent-protocol/) by Google Cloud and IBM

> In this course, you'll build a healthcare multi-agent system with three specialized agents using different frameworks. You'll wrap each agent in an A2A server, build A2A clients to communicate with them, and orchestrate them into sequential and hierarchical workflows. You'll see how A2A complements MCP: while MCP connects agents to external data systems, A2A enables agents to collaborate with each other.

## Articles

### [PEP 814 – Add frozendict built-in type](https://peps.python.org/pep-0814/)

PEP 814 is **accepted**. This PEP proposes adding an immutable `frozendict` built-in type to Python 3.15. It implements the Mapping protocol, preserves insertion order, and is hashable when all keys/values are hashable. Unlike `MappingProxyType`, it's truly immutable and hashable, making it safe for use with `@functools.lru_cache()` and as dictionary keys. It supports union operators (|, |=) and can replace mutable dicts in stdlib constants for safety. Unlike `collections.frozenmap`, frozendict maintains insertion order and provides O(1) lookups. The implementation shares code with dict but is not a subclass to prevent mutation via dict methods.

### [From Python 3.3 to today: ending 15 years of subprocess polling](https://gmpy.dev/blog/2026/event-driven-process-waiting)

For 15 years, Python's `subprocess` module and `psutil` used busy-loop polling to wait for processes, causing unnecessary CPU usage and latency. The author replaced this with event-driven approaches: using `pidfd_open()` with `poll()` on Linux (kernel 5.3+), `kqueue()` on BSD/macOS, and existing mechanisms on Windows. This eliminates busy-looping - the process blocks until the kernel signals process termination or timeout. Measurements show dramatic reduction in CPU context switches (from 258+ to just 2). The improvement first landed in `psutil` and was contributed upstream to CPython.

### [Speeding up Pillow's open and save](https://hugovk.dev/blog/2026/faster-pillow/)

This blog post by Hugo van Kemenade details performance improvements to Pillow's image open/save operations using Python 3.15's _Tachyon_ profiler. Previously, Pillow would import many image format plugins unnecessarily even when only one format was needed. A new file extension-to-plugin mapping enables lazy loading, only importing relevant plugins. Results: PNG opening 2.6x faster, WebP opening 14x faster, PNG saving 2.2x faster, and WebP saving 7.9x faster. These optimizations will be included in Pillow 12.2.0, making image processing more efficient especially for command-line tools.

### [Is it a class or a function?](https://www.pythonmorsels.com/class-or-function/)

The article explains that in Python both classes and functions are _callables_ — they're invoked with parentheses and may return a value. Examples: `print` and `sum` are built‑in functions; `str`, `list`, `bool`, `enumerate`, and `type` are classes that behave like functions, returning new objects when called. Because the user‑facing syntax is the same, Python programmers often call any callable a "function" even when it's technically a class. This fuzzy terminology fits Python's duck‑typing philosophy: what matters is the object's behavior (being callable), not its exact implementation.

### [Anatomy of a Python Function](https://www.mostlypython.com/anatomy-of-a-python-function/)

The article explains the terminology for a Python function's parts. The **function body** is everything indented after the definition. The **function definition** runs from `def` to the end of the body, though many think it ends at the colon. The first line (from `def` to the colon) is called the **function header** by the author; others may call it a **declaration**, but not a **signature**. A **signature** consists only of the parameter list and return annotation, as defined by PEP 362. Clear naming matters for type‑checking and communication.

### [switch-case in Python? It's not match-case!](https://www.pythonmorsels.com/switch-case-in-python/)

Python lacks a traditional switch-case statement, though it has `match-case` from Python 3.10. However, `match-case` is designed for structural pattern-matching (matching iterables, dictionaries, objects, and nested patterns), not simple value-based switching. For basic switch-case needs, `if-elif` chains are more readable and require less indentation. When mapping input values to outputs, dictionaries are typically the best alternative. The article advises using `match-case` only for advanced pattern-matching scenarios, not as a direct replacement for switch statements found in other languages. Most Python programmers are unfamiliar with `match-case`, so simpler constructs are usually preferable.

### [Making Pyrefly Diagnostics 18x Faster](https://pyrefly.org/blog/2026/02/06/performance-improvements/)

Pyrefly achieved an 18x performance improvement in diagnostic updates through two key optimizations. The first was implementing fine-grained dependency tracking, which reduces module invalidation from 2000+ to just 100+ by tracking exactly which types are used rather than all imports. The second was streaming diagnostics directly to the IDE as files are rechecked, rather than waiting for the entire recheck process to complete. These changes reduce diagnostic update time from ~3.6 seconds to under 200ms on an M4 Macbook Pro, making type errors refresh instantly after saving a file. The team continues prioritizing speed, memory efficiency, and functionality as they approach the v1 release.

### [Better Python tests with `inline-snapshot`](https://pydantic.dev/articles/inline-snapshot)

The article introduces `inline-snapshot`, a Python testing library that automatically manages test data. Instead of manually writing assertions for complex data structures, developers use `snapshot()` placeholders that get auto-populated when running `pytest --inline-snapshot=fix`. This eliminates tedious maintenance when data changes. The library pairs well with `dirty-equals` to handle dynamic fields like timestamps via `IsInt()` and `IsNow()`. Snapshots can even be nested within complex structures. The underlying `executing` library enables automatic source code updates by inspecting Python AST.

### [Django: profile memory usage with `Memray`](https://adamj.eu/tech/2026/01/29/django-profile-memray/)

This blog post explains how to profile and reduce memory usage in Django projects using `Memray`, a memory profiler from Bloomberg. The author demonstrates profiling the Django "check" command, generating flame graphs to visualize allocations, and identifying that importing `numpy.random` consumed 5.7MB (23% of peak 25.2MB). By replacing `numpy.random` with Python's built-in `random.shuffle()`, memory usage dropped 22% to 19.4MB. The post also offers solutions like deferred imports, lazy imports (upcoming in Python 3.15), and provides a Zsh one-liner for faster iteration. The key takeaway: Memray helps pinpoint and eliminate unnecessary memory bloat in Django applications.

### [Implementing local-first agentic AI: A practical guide](https://blog.logrocket.com/local-first-agentic-ai-guide/)

This article provides a practical guide for implementing local-first agentic AI using Small Language Models (SLMs) in privacy-sensitive environments. It presents an enterprise use case: an HR triage system that processes sensitive employee reports. The system uses a three-stage pipeline: intent detection (classifying issues like harassment or burnout), planning (creating remediation steps), and tool execution (performing actions like opening HR cases). Key models include `sentence-transformers/all-MiniLM-L6-v2` (~90M), `Phi-3-mini` (~3.8B), and `Function Gemma` (~2B). The "Local First, Cloud Last" architecture runs on modest hardware without GPUs, offering privacy, cost efficiency, and auditability while avoiding cloud latency and compliance risks. SLMs require precise prompt engineering but enable easy local testing without paid tokens, making them ideal for enterprise workloads with strict data locality constraints.

### [Agent Trace: Capturing the Context Graph of Code](https://cognition.ai/blog/agent-trace)

[**Agent Trace**](https://agent-trace.dev/) is an open, vendor-neutral specification for recording AI contributions alongside human authorship in version-controlled codebases. It solves the modern problem of context loss by linking each code change to its originating conversation and context, rather than just storing line differences like traditional git. This enables powerful engineering management tools (blaming AI vs humans, PR breakdowns, dashboards) and significantly improves AI agent performance by making context retrievable, reducing wasted inference time. The spec represents a shift where context—not lines of code—becomes the precious resource in the AI era.

## Podcasts

### 🐍 RealPython Podcast

- [Episode 283: Improving Your GitHub Developer Experience](https://realpython.com/podcasts/rpp/283/)
- [Episode 284: Running Local LLMs With Ollama and Connecting With Python](https://realpython.com/podcasts/rpp/284/)
- [Episode 285: Exploring MCP Apps & Adding Interactive UIs to Clients](https://realpython.com/podcasts/rpp/285/)
- [Episode 286: Overcoming Testing Obstacles With Python's Mock Object Library](https://realpython.com/podcasts/rpp/286/)

### 🥧 Python Bytes Podcast

- [#468 A bolt of Django](https://pythonbytes.fm/episodes/show/468/a-bolt-of-django)
- [#469 Commands, out of the terminal](https://pythonbytes.fm/episodes/show/469/commands-out-of-the-terminal)
- [#470 A Jolting Episode](https://pythonbytes.fm/episodes/show/470/a-jolting-episode)

### 🦜 Talk Python to me

- [#536: Fly inside FastAPI Cloud](https://talkpython.fm/episodes/show/536/fly-inside-fastapi-cloud)
- [#537: Datastar: Modern web dev, simplified](https://talkpython.fm/episodes/show/537/datastar-modern-web-dev-simplified)

### 🍕 Pybites Podcast

- [#214: Building useful AI - from classroom to real business impact](https://www.pybitespodcast.com/1501156/episodes/18609456-214-building-useful-ai-from-classroom-to-real-business-impact)
- [#215: Arthur Pastel on creating actionable optimisations with CodSpeed](https://www.pybitespodcast.com/1501156/episodes/18654038-215-arthur-pastel-on-creating-actionable-optimisations-with-codspeed)
- [#216: Resolving our own git mess](https://www.pybitespodcast.com/1501156/episodes/18691634-216-resolving-our-own-git-mess)
- [#217: Revisiting Quiet Links with Tim Gallati](https://www.pybitespodcast.com/1501156/episodes/18698592-217-revisiting-quiet-links-with-tim-gallati)

### VS Code Insiders Podcast

- [Episode 19: Subagents: Parallel Execution and Context Isolation](https://www.vscodepodcast.com/19)

## Repositories

### [volcengine/OpenViking](https://github.com/volcengine/OpenViking) (Apache 2.0)

[OpenViking](https://openviking.ai/) is a context database designed specifically for AI Agents which unifies the management of context (memory, resources, and skills) that Agents need through a file system paradigm, enabling hierarchical context delivery and self-evolving.

### [NevaMind-AI/memU](https://github.com/NevaMind-AI/memU) (Apache 2.0)

`memU` is a memory framework built for 24/7 proactive agents. It is designed for long-running use and greatly reduces the LLM token cost of keeping agents always online, making always-on, evolving agents practical in production systems. memU continuously captures and understands user intent. Even without a command, the agent can tell what you are about to do and act on it by itself.

## Have time for some fun?

### Kena: Scars of Kosmora is announced during _State of Play_

![Kena: Scars of Kosmora](https://blog.playstation.com/tachyon/2026/02/dc57cf4a6e860a184aab3403caed4b1002316736.png?resize=1088%2C612&crop_strategy=smart&zoom=1)

[Kena: Scars of Kosmora](https://blog.playstation.com/2026/02/12/kena-scars-of-kosmora-announced-for-ps5-and-pc-out-2026/), the second chapter of Kena's adventure, brings our Spirit Guide to the mysterious realm of Kosmora, an island "full of buried secrets from a tragic past". You can watch the announcement trailer [here](https://www.youtube.com/watch?v=12EQpTwn4lY).

It is expected to launch on PlayStation 5 and PC later this year.

---

As we wrap up this journey together, I want to take a moment to express my gratitude for your reading. If you've enjoyed what you just read and would like to help sustain this blog, consider [starring this blog on github](https://github.com/blueberry-py/blog/stargazers), it would be great motivation for me to keep updating the blogs!

Alright, that concludes the February Edition of "This Month for Pythonistas". Thank you again for reading my post. I hope you enjoy it or find something useful. Happy coding and see you in March! 👋
