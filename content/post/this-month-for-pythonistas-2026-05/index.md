+++
title = "This Month for Pythonistas - May 2026"
description = "Python 3.15 beta 1, PyCon US 2026, thoughts on Agentic AI and vibe coding, harness, and other fun stuff"
slug = "this-month-for-pythonistas-2026-05"
date = 2026-05-31T21:00:00+08:00
authors = ["Zeyang Lin"]
tags = ["python", "news", "podcast", "AI", "pycon"]
categories = ["python"]
series = ["this month for pythonistas"]
keywords = ["python", "news", "2026", "AI", "agentic", "openai", "podcast", "pycon", "linux", "claude"]
image = "title.jpg"
draft = false
+++

```python
from datetime import date

print(date.today().year, date.today().month)
# 2026 5
```

![issue-2026-05](splash.jpg)

Welcome back Pythonistas! This is the May 2026 issue of "This Month for Pythonistas", bringing you curated Python news, tutorials, articles, podcasts and community highlights.

Before we continue, please note that this blog is synced across the following platforms:

- [Github Pages](https://blueberry-py.github.io/blog/post/this-month-for-pythonistas-2026-05/)
- [Netlify](https://blueberrypy.netlify.app/post/this-month-for-pythonistas-2026-05/)
- [Render](https://blueberrypy.onrender.com/post/this-month-for-pythonistas-2026-05/)
- [Vercel](https://blueberrypy-blog.vercel.app/post/this-month-for-pythonistas-2026-05/)

Ready? Let's get started!

---

## Events & Social

### PyCon US 2026

PyCon US was held in Long Beach, California this May with 2000+ total attendees, 57% of which were first-time. It was a great success - thanks to PSF and the whole community - and I look forward to PyCon US 2027 already (still in Long Beach)! You can check out social media (X, Mastodon, BlueSky, etc.) for highlights.

The recordings of the conference would be published to PyCon US Youtube channel later this year.

### [Introducing Claude Opus 4.8](https://www.anthropic.com/news/claude-opus-4-8)

![claude-opus-4.8](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2F0eaa0ed2dce9810169112e1c77de2585fcf1f5c2-2880x1620.jpg&w=3840&q=75)

Anthropic introduced **Claude Opus 4.8**, an upgrade over Opus 4.7 with improved benchmark performance across coding, agentic skills, reasoning, and knowledge work, at the same price. Key improvements include greater honesty — Opus 4.8 is roughly four times less likely to let code flaws pass unremarked — and lower misaligned behavior rates. Launching alongside it are: **dynamic workflows** in Claude Code (enabling massive parallel subagent tasks like codebase-scale migrations), **effort control** on claude.ai (letting users adjust how deeply Claude thinks), and **system entries inside the messages array** via the API. Opus 4.8 defaults to high effort, with "extra" and "max" options for harder tasks. Anthropic also teased upcoming cheaper Opus-class models and a more intelligent "Mythos"-class model pending stronger safety safeguards.

## New Versions

### [Python 3.15.0 beta 1 is here!](https://blog.python.org/2026/05/python-3150-beta-1/)

Python 3.15.0 beta 1 was released on May 7, 2026, marking the first beta and feature freeze. Developers encourage third-party projects to test the preview and report bugs, though it is not recommended for production. Major features include explicit lazy imports, new built-in types like `frozendict` and `sentinel`, a dedicated profiling package, default _UTF-8_ encoding, `TypedDict` improvements, and an upgraded JIT compiler delivering 8–13% performance gains. Other changes include frame pointers by default, unpacking in comprehensions, and stable ABI for free-threaded builds.

The tarball and binary distributions for beta 1 can be downloaded [here](https://www.python.org/downloads/release/python-3150b1/). The next pre-release, 3.15.0b2, is scheduled for June 2, 2026.

### [Python 3.14.5 is out!](https://blog.python.org/2026/05/python-3145-is-out/)

This is a very rare patch release due to a release candidate being released several days before the final release.

> The incremental garbage collector shipped in Python 3.14.0 - 3.14.4 has been reverted back to the generational garbage collector from 3.13, due to a number of reports of significant memory pressure in production environments.

### [What's new in pip 26.1 - lockfiles and dependency cooldowns!](https://ichard26.github.io/blog/2026/04/whats-new-in-pip-26.1/)

pip 26.1, released April 2026, drops Python 3.9 support and introduces key features: experimental lockfile support via `-r pylock.toml` (PEP 751), dependency cooldowns with `--uploaded-prior-to=P3D`, and fixes to the 2020 resolver. Security updates patch archive handling vulnerabilities and upgrade `urllib3` to 2.x. The legacy resolver moves closer to removal (planned 2027), and `PIP_CONSTRAINT` for build dependencies is deprecated for pip 26.2. A future `pip sync` command is planned to complete lockfile support.

### [Pyrefly v1.0 is here!](https://pyrefly.org/blog/v1.0/)

![pyrefly-1.0-release](https://pyrefly.org/assets/images/v1.0-53562449e846074eba274828c237e963.jpg)

Pyrefly, Meta's open-source Python type checker and language server, has reached its stable v1.0 release, marking it as production-ready after over 60 minor releases since its alpha launch in mid-2025. Already used at scale by Instagram, PyTorch, NumPy, Pandas, and JAX, Pyrefly delivers significant performance improvements — up to 125x faster incremental editor updates and 34% faster full type checks on large codebases. It offers both CLI and IDE extension support for consistent results across environments, with built-in support for Pydantic and Django, and an upcoming integration with Microsoft's Pylance via a new Type Server Protocol. The tool supports gradual adoption through configurable presets, migration from Mypy/Pyright, and incremental type annotation via `pyrefly infer`. Looking ahead, Pyrefly is developing experimental tensor shape checking for ML frameworks and exploring integration into AI-assisted coding workflows.

### [PyTorch 2.12 Release Blog](https://pytorch.org/blog/pytorch-2-12-release-blog/)

PyTorch 2.12 has been released with 2,926 commits from 457 contributors. Key highlights include: batched `linalg.eigh` on CUDA is up to 100x faster; a new device-agnostic `torch.accelerator.Graph` API unifies graph capture across CUDA, XPU, and other backends; `torch.export.save` now supports Microscaling (MX) quantization formats for deploying compressed models; fused Adagrad optimizer joins Adam, AdamW, and SGD; and `torch.cond` control flow can now be captured within CUDA Graphs. ROCm users gain expandable memory segments, rocSHMEM symmetric memory collectives, and FlexAttention pipelining. TorchScript is now deprecated, with `torch.export` as its replacement.

## Tutorials

### DeepLearning.ai's [Build Interactive Agents with Generative UI](https://www.deeplearning.ai/short-courses/build-interactive-agents-with-generative-ui/) from CopilotKit

> You'll work across the full Generative UI Spectrum, from hand-crafted components you control precisely, to declarative layouts the agent assembles from building blocks, all the way to open-ended experiences powered by MCP Apps. You'll finish by building a canvas application where the agent works alongside the user on shared data. By the end, you'll have a production-ready fullstack agent built on CopilotKit and AG-UI, an open protocol with first-party integrations across LangGraph, Google, AWS, Microsoft, and more.

### DeepLearning.ai's [AI Agents for Image and Video Generation](https://www.deeplearning.ai/courses/ai-agents-for-image-and-video-generation) from Google

> In this course, you’ll learn three complementary evaluation techniques, then combine them with image and video generation to build autonomous media agents. You’ll build an image agent that turns brand guidelines into UI mockups, and a video agent that plans multi-scene explainers, animates reference frames with synchronized audio, and checks consistency across scenes. In the final lesson, you’ll use Gemini CLI to build a generative media agent in natural language, packaging what you’ve learned into reusable agent skills.

## Articles

### [PEP 661 – Sentinel Values](https://peps.python.org/pep-0661/)

PEP 661 is **accepted**. It introduces a new built-in `sentinel()` class for creating unique sentinel values in Python. Sentinel values are special placeholder objects used when a distinct sentinel is needed that's different from None. The new builtin addresses issues with common sentinel idioms like `object()` which have uninformative reprs, lack distinct types, and behave unexpectedly after copying or pickling. The `sentinel(name)` call creates a sentinel with a readable repr, proper identity preservation, pickling support, and type-checking integration. Sentinels are truthy and should be checked with `is` operator. The feature targets Python 3.15+ with both Python and C API implementations, providing a standardized way to define sentinels throughout the standard library and user code.

### [Python 3.15: features that didn't make the headlines](https://blog.changs.co.uk/python-315-features-that-didnt-make-the-headlines.html)

This blog post covers lesser-known Python 3.15 features including: (1) **asyncio TaskGroup cancellation** — a new `tg.cancel()` method that simplifies graceful task group termination, replacing the awkward workaround of raising custom exceptions; (2) **Context Manager Improvements** — `ContextDecorator` now properly wraps the full lifecycle of async functions, generators, and async iterators, making context managers an ideal way to create decorators; and (3) **Thread Safe Iterators** — new `threading.serialize_iterator` and `threading.synchronized_iterator` functions that enable safe shared iteration across threads, solving issues with skipped values or broken iterator state when using threading or free-threading.

### [PyCon US 2026 Typing Summit Recap](https://bernat.tech/posts/pycon-us-2026-typing-summit-recap/)

The PyCon US 2026 Typing Summit featured eight talks and a Typing Council Q&A. Key highlights: _Guido van Rossum_ argued PEP 484's _no-new-syntax_ rule is already broken and urged prioritizing user pain over power features, citing the 2025 Typing Survey. _Jelle Zijlstra_ proposed intersection and negation types for the spec. _Michael Sullivan_ presented PEP 827 for type manipulation (conditional/mapped types). _Douglas Creager_ showed how ty's constraint-set solver fixes a `partial(choose, None)` example all current checkers get wrong. _Conner Nilsen_ found type-checker feedback helps AI agents on well-typed code but not lightly-typed codebases. _Jia Chen_ formalized Python typing in Lean 4, and _Avik Chaudhuri_ demoed tensor-shape types in Pyrefly. The council panel updated on checker landscape (Pyre and pytype winding down) and open spec issues.

### [I spent 2 years building the async Python task queue I wished existed](https://aleksul.space/posts/i-spent-2-years-building-repid/)

The author spent two years developing Repid v2, an async Python task queue that solves the lack of modern async background processing tools. The Python web ecosystem excels with frameworks like FastAPI, but task queues remained antiquated, requiring separate sync contexts and lacking automatic documentation. Repid v1 showed promise but had fundamental design flaws: it was too opinionated about broker capabilities and assumed features like delayed messaging were universal. Production issues with AMQP 0.9.1 prompted the author to write a custom AMQP 1.0 implementation. The v2 redesign embraces simplicity: user-defined message types, broker-agnostic AsyncAPI documentation, and support for multiple brokers including AMQP 1.0, SQS, Kafka, and Redis Streams. Despite modest adoption, the project represents the exact library the author wanted—a self-documenting, truly async message consumer that gets out of the developer's way.

### [Learn concurrency - a deep dive into multithreading with Python](https://blog.geekuni.com/2026/04/python-concurrency.html)

This blog post provides a comprehensive overview of concurrency in Python, covering key concepts like multithreading, multiprocessing, race conditions, and synchronization mechanisms such as locks. It explains the differences between sequential, concurrent, and parallel execution, with practical examples. The Global Interpreter Lock (GIL) is discussed as a major limitation preventing true CPU-bound multithreading in Python, though it doesn't hinder I/O-bound tasks. The article highlights the drawbacks of GIL — such as inability to leverage modern multi-core hardware and the complexity of multiprocessing — and introduces the emerging "free-threaded" build (PEP 703) starting in Python 3.13, which allows developers to disable the GIL and achieve true parallel multithreading.

### [Behavior-Oriented Concurrency in Python](https://microsoft.github.io/bocpy/)

![behavior-oriented concurrency](https://microsoft.github.io/bocpy/images/logo.svg)

`bocpy` is a Python library implementing Behavior-Oriented Concurrency (BOC), a lock-less, deadlock-free paradigm for parallel programming. It uses "cowns" (concurrent-owned variables) to ensure temporal data ownership across sub-interpreters, eliminating traditional locks. Behaviors — decorated functions — declare required cowns and are automatically scheduled for parallel execution, simplifying concurrent code. The library includes a noticeboard for eventually-consistent state sharing and a `Matrix` class for high-performance numerical operations. `bocpy` achieves near-linear multi-core scaling via lock-free scheduling and zero-copy data transfer, offering an intuitive alternative to thread-based concurrency.

### [The Simplest MCP Example Possible in Python](https://inventwithpython.com/blog/basic-mcp-python-example.html)

This blog post by _Al Sweigart_ demonstrates the simplest possible MCP (Model Context Protocol) example in Python, showing how to give a local LLM access to external tools. Using FastMCP and Ollama, the author creates an MCP server with two tools — `get_current_time` and `get_current_date` — that return the current time and date as formatted strings. A client script connects the Llama 3.2 model to these tools, allowing it to answer time-related questions. The post includes complete code for both the server and client, along with a sample conversation showing the model's mixed results — correctly answering some questions but also exhibiting common LLM hallucinations, such as incorrectly converting 24-hour time and confidently stating the wrong day of the week.

### [Using LLMs to find Python C-extension bugs](https://lwn.net/Articles/1067234/)

The article describes how hobbyist Daniel Diniz used Claude Code to systematically discover 575+ bugs in 44 Python C-extensions covering nearly a million lines of code. His cext-review-toolkit employs 13 specialized agents targeting reference-counting, GIL handling, and exception state issues. The approach emphasizes maintainer control, providing high-quality reports with reproducers via secret GitHub gists and adapting based on feedback to minimize false positives. While the reaction has been positive, maintainers note concerns about bug severity and prioritization, suggesting improvements. The article presents this as a responsible example of LLM-assisted bug finding that avoids overwhelming maintainers.

### [uv is fantastic, but its package management UX is a mess](https://www.loopwerk.io/articles/2026/uv-ux-mess/)

Astral's **uv** is praised for its speed and ability to replace multiple Python tools with one binary, but the author argues its package management UX lags behind peers like `pnpm` and `poetry`. Key complaints include: no simple `uv outdated` command (only `uv tree --outdated --depth 1` which displays a cluttered 50-line tree), unsafe default version constraints without upper bounds unlike pnpm's caret syntax, and awkward upgrade commands requiring repeated `--upgrade-package` flags. The author welcomes the new `--bounds` option but notes it's opt-in and a preview feature. Post-HN reader clarifications noted that `uv pip list --outdated` exists, `--bounds` can be set globally in pyproject.toml, and the no-upper-bounds default makes sense for libraries (to avoid dependency resolution issues) but not for applications.

### [Stop writing edge case tests. Let Hypothesis find them instead.](https://dev.to/peytongreen_dev/stop-writing-edge-case-tests-let-hypothesis-find-them-instead-5hl0)

The author shares how they wrote 47 edge case tests for a URL normalizer, but when they used `Hypothesis`, it generated 10,000 test cases in 30 seconds and found a critical bug — an all-whitespace URL silently returned an empty string. Unlike conventional tests that check specific inputs, property-based tests define invariants that should hold for any input. Hypothesis generates diverse inputs, shrinks failures to minimal examples, and stores failing cases in a local database for regression testing. The author recommends adding one or two `@given` tests per function to catch bugs you didn't know to look for, and provides examples of useful properties like round-trip invariants, idempotency, and monotonicity.

### [Announcing Genkit Middleware: Intercept, extend, and harden your agentic apps](https://developers.googleblog.com/announcing-genkit-middleware-intercept-extend-and-harden-your-agentic-apps/)

`Genkit`, Google's open-source framework for building AI-powered agentic applications, has introduced a middleware system to enhance reliability, security, and observability. Available in TypeScript, Go, Dart and Python, middleware allows developers to intercept generation calls and tool execution loops to inject custom behaviors. The system offers pre-built solutions including Retry for handling transient errors with exponential backoff, Fallback for switching to alternative models during failures, Tool Approval for human-in-the-loop confirmation of sensitive actions, Skills for dynamically loading contextual knowledge, and Filesystem for scoped file access. Developers can also create custom middleware to enforce specific business rules, such as preventing models from mentioning competitor products, providing a composable way to harden production-ready AI applications.

### [Inside the Microsoft Agent Framework: How we designed a layered SDK](https://commandline.microsoft.com/agent-framework-layered-sdk-loops-workflows-harnesses/)

![microsoft-agent-framework-harness](https://commandline.microsoft.com/wp-content/uploads/2026/05/AgentHarness-1536x833.png)

**Microsoft Agent Framework (MAF)** is Microsoft's layered SDK for building production-ready AI agents, which is organized around three core concepts. **Agent loops** are the fundamental execution cycle where an agent receives input, reasons, calls tools, and iterates until done. **Workflows** provide structured orchestration for multi-step, multi-agent, or business-critical processes, supporting patterns like sequential flows, handoffs, and author/critic loops. **Harnesses** supply reusable runtime capabilities — tools, context, memory, planning, permissions, and middleware — that surround the agent and make it practical for real-world use. The framework is provider-agnostic, working across models from Microsoft, OpenAI, Anthropic, and others, and is available for .NET and Python.

### [The Anatomy of an Agent Harness](https://langchain.com/blog/the-anatomy-of-an-agent-harness)

This Langchain blog explains that an agent is composed of two parts: a model containing the intelligence and a harness that makes that intelligence useful. A harness includes all the code, configuration, and execution logic around the model. Key harness components include filesystems for durable storage and context management, bash/code execution for autonomous problem-solving, sandboxes for secure isolated execution, memory systems for continual learning, context compaction strategies to prevent context rot, and long-horizon execution features like planning and self-verification loops. The author argues that harness engineering will remain valuable even as models become more capable, as well-designed harnesses optimize model performance for specific tasks. The field continues evolving with active research into multi-agent orchestration, dynamic tool assembly, and self-improving systems.

### [Agent Skills](https://addyosmani.com/blog/agent-skills/)

This article explores how AI coding agents skip essential senior-engineer practices — specs, tests, reviews, scope discipline — because they optimize for speed, not reliability. The project packages “skills” as workflow-driven markdown files injected into agent context, encoding six lifecycle phases (define, plan, build, verify, review, ship) with concrete exit criteria. Five principles guide design: process over prose, anti-rationalization tables rebutting plausible shortcuts, non-negotiable verification, progressive disclosure to limit context, and strict scope discipline. Skills embed Google-scale practices (Hyrum's Law, test pyramids, DAMP tests, small PRs, trunk-based development) that agents otherwise ignore. Used as installed slash commands or lightweight runbooks, they force the scaffolding senior engineers provide, turning optional polish into mandatory guardrails for safe, reviewable, ship-worthy code.

### [How to Work and Compound with AI](https://eugeneyan.com//writing/working-with-ai/)

The article outlines practical principles for working effectively with AI so that collaboration compounds over time. It argues that every finished artifact — code, docs, analysis, decisions — should become reusable context, while corrections update configurations that reduce future errors. Key practices include organizing work into clear directory structures so models can retrieve relevant context, maintaining annotated indexes and per-project onboarding docs (like `CLAUDE.md` and `INDEX.md`) so each session starts with the right knowledge, and separating persistent memory (project state) from personal preferences and workflows. Taste and behavior should be encoded as configuration (global, repo, and project-level `CLAUDE.md` files), split into lazy‑loaded guides and skills to avoid context bloat. Skills capture repeatable weekly tasks as markdown workflows, bootstrapped by doing a task once and refining it through session transcripts rather than direct edits. Verification is shifted left with deterministic checks, automated tests, and model‑run evals before human review, and long‑running tasks use a “pair programmer” session to detect execution and direction drift. To scale, delegate larger end‑to‑end tasks with clear success criteria and parallel sessions, and make work observable with status signals and remote‑control options. Finally, close the loop by sharing openly, mining transcripts for missing steps or corrections, and periodically refactoring configs to avoid contradictions—the same principles that apply to managing human teams.

### [Vibe coding and agentic engineering are getting closer than I’d like](https://simonwillison.net/2026/May/6/vibe-coding-and-agentic-engineering/)

Simon Willison distinguishes "vibe coding" — accepting AI‑generated code without review — from "agentic engineering", where professionals use AI tools to build high-quality systems while maintaining security and maintainability. In this post he observes that the two practices are increasingly overlapping: because AI agents are becoming highly reliable, he now routinely ships production code he hasn't reviewed, feeling uncomfortable about accountability. He also notes that AI makes it trivially easy to produce polished repos with tests and docs, so real evidence of value now comes from whether software has been actively used. Although AI has shifted bottlenecks from coding to design and evaluation, he believes the core difficulty of software engineering remains, and he doubts a widespread threat to enterprise SaaS since companies generally prefer proven, professionally managed solutions over DIY vibecoded projects.

### [How I use LLMs as a staff engineer in 2026](https://www.seangoedecke.com/how-i-use-llms-in-2026/)

In 2026, the author has significantly expanded his use of LLMs compared to 2025. The biggest shift is that AI agents are now reliable enough to produce entire pull requests in areas he's familiar with, and he uses them constantly for bug investigation (correctly diagnosing ~80% of issues), codebase research, testing, and local setup tasks. He still writes his own PR descriptions and all public communications by hand, believing humans better convey core ideas and signal genuine review. He also avoids using LLMs for UI testing or writing blog posts, though he uses them for draft feedback. His core job — shipping projects, exercising judgment, and navigating politics — remains unchanged, but agents have expanded his capacity to take on small tasks. He warns that many people either under-utilize agents (not delegating enough) or over-utilize them (trusting them with unreviewed sweeping changes), and finding the right balance remains key.

### [The bottleneck was never the code](https://www.thetypicalset.com/blog/thoughts-on-coding-agents)

The article argues that coding agents shift the bottleneck in software development from writing code to collaboration, decision-making, and context-sharing. While agents dramatically boost individual productivity, the real challenge for organizations is producing precise specifications and maintaining shared context — something humans acquire informally but agents require explicitly. The author emphasizes that focus (saying no to unnecessary features) and organizational coherence become more critical as code becomes cheaper to produce. Agents can help by reading exhaustively to extract implicit knowledge, but some tacit context remains unrecoverable. Ultimately, the companies that thrive will be those that treat coherence and context as maintainable artifacts, not just those with the best technical tools.

### [Agentic Coding is a Trap](https://larsfaye.com/articles/agentic-coding-is-a-trap)

The article argues that over-reliance on AI coding agents is a trap that erodes developers’ critical thinking and debugging skills while creating costly dependencies. It warns that "agentic coding" distances engineers from implementation, causing cognitive atrophy, vendor lock-in, unpredictable token costs, and fragile systems that must manage AI’s non-determinism. Junior and senior developers alike lose the friction essential for deep learning and ownership. Drawing parallels to past tech shifts, the author insists the risk is real and immediate. He advocates using LLMs as secondary aids for planning and research—not as autonomous orchestrators—while keeping hands-on coding central, ensuring competence, quality, and long-term value over short-term speed.

## Podcasts

### 🐍 RealPython Podcast

- [Episode 293: Agentic Data Science Pair Programming With marimo pair](https://realpython.com/podcasts/rpp/293/)
- [Episode 294: Declarative Charts in Python & Discerning Iterators vs Iterables](https://realpython.com/podcasts/rpp/294/)
- [Episode 295: Agentic Architecture: Why Files Aren't Always Enough](https://realpython.com/podcasts/rpp/295/)
- [Episode 296: Managing Polars Schema Issues & Profiling GitHub Users](https://realpython.com/podcasts/rpp/296/)
- [Episode 297: Improving Python Through PEPs and Protocols](https://realpython.com/podcasts/rpp/297/)

### 🍕 Python Bytes Podcast

- [#478 Iodine tablets and potable water](https://pythonbytes.fm/episodes/show/478/iodine-tablets-and-potable-water)
- [#479 Talking About Types](https://pythonbytes.fm/episodes/show/479/talking-about-types)
- [#480 Proud Parents](https://pythonbytes.fm/episodes/show/480/proud-parents)
- [#481 Ways to die](https://pythonbytes.fm/episodes/show/481/ways-to-die)

### 📣 Talk Python to me

- [#547: Parallel Python at Anyscale with Ray](https://talkpython.fm/episodes/show/547/parallel-python-at-anyscale-with-ray)
- [#548: Event Sourcing Design Pattern](https://talkpython.fm/episodes/show/548/event-sourcing-design-pattern)
- [#549: Great Docs](https://talkpython.fm/episodes/show/549/great-docs)
- [#550: AI Contributions and Maintainer Load in Open Source](https://talkpython.fm/episodes/show/550/ai-contributions-and-maintainer-load-in-open-source)

### 🚀 VS Code Insiders Podcast

- [Episode 22: Agent-First Development Workflows in VS Code with Brigit Murtaugh](https://www.vscodepodcast.com/22)

## Repositories

### [pydantic/httpx2](https://github.com/pydantic/httpx2) (BSD-3-Clause)

> With HTTPX itself seeing limited activity recently, Pydantic is picking up stewardship under the `HTTPX2` name so that users have a reliably maintained path forward - including timely security updates for a library that sits in the critical path of so many production systems.

### [MinishLab/semble](https://github.com/MinishLab/semble) (MIT)

> Semble is a code search library built for agents. It returns the exact code snippets they need instantly, using ~98% fewer tokens than grep+read. Indexing and searching a full codebase end-to-end takes under a second, with ~200x faster indexing and ~10x faster queries than a code-specialized transformer, at 99% of its retrieval quality.

### [microsoft/Webwright](https://github.com/microsoft/Webwright) (MIT)

> Webwright gives LLM a terminal where it can launch multiple browser sessions to inspect the page and complete a web task. It captures and inspects page screenshots/states only when needed. It enforces each web task to be completed end-to-end within a re-runnable Python script, i.e. your web agent browsing history is a single code file. No multi-agent system, no graph engine, no plugin layer, no hidden orchestration — just a terminal, a browser, and a model.

---

As we wrap up this journey together, I want to take a moment to express my gratitude for your reading. If you've enjoyed what you just read and would like to help sustain this blog, consider [starring this blog on github](https://github.com/blueberry-py/blog/stargazers), it would be great motivation for me to keep updating the blogs!

Alright, that concludes the May Edition of "This Month for Pythonistas". Thank you again for reading my post. I hope you enjoy it or find something useful. Happy coding and see you in June! 👋
