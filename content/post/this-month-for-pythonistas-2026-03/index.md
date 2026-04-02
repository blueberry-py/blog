+++
title = "This Month for Pythonistas - March 2026"
description = "New Python versions, JIT, PyCon US, GvR interviews, Gemini, GPT-5.4, AI coding thoughts and other fun stuff"
slug = "this-month-for-pythonistas-2026-03"
date = 2026-03-31T21:00:00+08:00
authors = ["Zeyang Lin"]
tags = ["python", "news", "podcast", "AI", "GPT", "LLM", "linux"]
categories = ["python"]
series = ["this month for pythonistas"]
keywords = ["python", "news", "2026", "openai", "gemini", "podcast", "AI", "agent"]
image = "title.jpg"
draft = false
+++

```python
from datetime import date

print(date.today().year, date.today().month)
# 2026 3
```

![issue-2026-03](splash.jpg)

Welcome back Pythonistas! This is the March 2026 issue of "This Month for Pythonistas", bringing you curated Python news, tutorials, articles, podcasts and community highlights.

Time flies! It has been a whole year since the first issue of "This Month for Pythonistas". I'm excited to kick off another year of informative content and community engagement, and I can't wait to see what you have in store for this month.

Before we continue, please note that this blog is synced across the following platforms:

- [Github Pages](https://blueberry-py.github.io/blog/post/this-month-for-pythonistas-2026-03/)
- [Netlify](https://blueberrypy.netlify.app/post/this-month-for-pythonistas-2026-03/)
- [Render](https://blueberrypy.onrender.com/post/this-month-for-pythonistas-2026-03/)
- [Vercel](https://blueberrypy-blog.vercel.app/post/this-month-for-pythonistas-2026-03/)

Ready? Let's get started!

---

## Events & Social

### [OpenAI acquires Astral](https://openai.com/index/openai-to-acquire-astral/)

OpenAI has announced its acquisition of Astral, the company behind popular Python developer tools including _uv_, _Ruff_, and _ty_. This deal aims to integrate these widely-used open source tools into OpenAI's Codex ecosystem, which has grown to over 2 million weekly active users with 3x user growth and 5x increased usage since the start of the year. The acquisition will help expand Codex beyond simple code generation to participate in the entire software development workflow, from planning changes to maintaining software over time. The deal is subject to regulatory approval, and Astral's team will join OpenAI's Codex team after closing.

Astral founder _Charlie Marsh_ announced that this acquisition will accelerate their mission to make programming more productive by combining Astral's tooling expertise with AI innovation at the frontier of software development. OpenAI will continue supporting Astral's open source tools after the deal closes, maintaining their commitment to building in the open alongside the Python community for broader ecosystem impact.

### [PyCon US 2026 Schedule Revealed](https://us.pycon.org/2026/schedule/)

The PyCon US 2026 schedule has been released! Besides, the keynote speakers are announced: Lin Qiao, Pablo Galindo Salgado, amanda casari, Rachell Calhoun, as well as Tim Schilling.

### [The Python Insider Blog Has Moved!](https://blog.python.org/2026/03/the-python-insider-blog-has-moved/)

The _Python Insider_ official blog has moved from Blogger to **blog.python.org**, with all 307 past posts migrated and old URLs auto-redirecting; RSS readers will update automatically without action. Shifting to Markdown/Git pull requests lowered contribution barriers vs. the prior Blogger/Google account setup. New site features include filtered/paginated posts, author/tag pages, Ctrl+K search, dark mode, and static Astro hosting.

### [Guido van Rossum Interviews Thomas Wouters](https://gvanrossum.github.io/interviews/ThomasWouters.html)

This interview with **Thomas Wouters**, conducted by **Guido van Rossum**, chronicles Wouters' journey from discovering Python via LambdaMOO in the late 1990s to becoming a core Python developer. He contributed augmented assignment operators (+=) and range literals (PEP 203), while participating in pivotal discussions about backward compatibility and nested scopes that led to future imports. Wouters reflects on the friendly Python community during the Usenet era, mentioning key figures like Tim Peters, Fredrik Lundh, and Jeremy Hilton. He also discusses the founding of the Python Software Foundation in 2001 and the challenges of organizing the first PyCon, highlighting how Python evolved from individual use to corporate deployment while maintaining its collaborative spirit.

### [Guido van Rossum Interviews Brett Cannon](https://gvanrossum.github.io/interviews/BrettCannon.html)

This interview with Python core developer **Brett Cannon**, also conducted by **Guido van Rossum**, explores Brett's journey into the Python community. In 2000, philosophy student Brett discovered Python at UC Berkeley while seeking an object-oriented language for a CS course. After reading the tutorial and an O'Reilly book, he fell in love with the language. During a gap year before grad school, he submitted a pure-Python `strptime` implementation to python-dev, which led to his first core contribution in 2002. He volunteered to write the python-dev summaries, became PSF member, gained commit rights in April 2003, and was involved in major projects like importlib and Python 3 (PEP 3000/3100). Brett reflects on the early community's small, passionate nature, the transition from volunteer contributions to paid maintainers, and Python's evolution through CVS, Subversion, Mercurial, and Git on SourceForge to GitHub.

### [Py AI Conference](https://luma.com/i3cbt3sz)

Hosted on March 10th at San Francisco, California, this one-day conference is for Python teams shipping AI to production. Keynote speakers include ​Guido van Rossum, Sebastián Ramírez (FastAPI) and more.

### [Gemini 3.1 Flash-Lite: Built for intelligence at scale](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-flash-lite/)

![gemini-3-1-flash-lite](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/gemini-3.1_flash_Lite_blog_keywo.width-2200.format-webp.webp)

Google has launched **Gemini 3.1 Flash-Lite**, its fastest and most cost-efficient AI model in the Gemini 3 series. Priced at just $0.25 per million input tokens and $1.50 per million output tokens, it delivers 2.5x faster response times and 45% higher output speed compared to its predecessor 2.5 Flash. The model achieves a 1432 Elo score and outperforms competitors on reasoning and multimodal benchmarks. Available via Google AI Studio and Vertex AI, Flash-Lite is optimized for high-volume workloads like translation, content moderation, and UI generation, with adaptive thinking levels for developer control.

### [Gemini Embedding 2: Our first natively multimodal embedding model](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-embedding-2/)

![gemini-embedding-2](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/gemini-2_embedding_keyword_blog_.width-2200.format-webp.webp)

Google has also released Gemini Embedding 2, its first natively multimodal embedding model that maps text, images, videos, audio, and documents into a single unified embedding space, supporting over 100 languages. The model handles up to 8192 text tokens, 6 images, 120 seconds of video, native audio without transcription, and PDFs up to 6 pages per request. It supports interleaved multi-modal inputs in a single request and uses Matryoshka Representation Learning to offer flexible output dimensions (3072, 1536, or 768).

### [Introducing GPT‑5.4](https://openai.com/index/introducing-gpt-5-4/)

OpenAI has launched GPT-5.4, their most powerful and efficient frontier model for professional workloads. The model combines advanced reasoning, programming, and agent capabilities with native computer use functionality and 1M token context support. GPT-5.4 introduces "Thinking mode" in ChatGPT, providing transparent reasoning plans, and features improved web search, tool search, and higher accuracy with 33% reduced hallucinations. Performance benchmarks show significant improvements across knowledge work, coding, and complex tasks.

### [MiniMax M2.7: Early Echoes of Self-Evolution](https://www.minimax.io/news/minimax-m27-en)

![minimax-m2.7](https://www.minimax.io/_next/image?url=https%3A%2F%2Ffilecdn.minimax.chat%2Fpublic%2F86637d58-0e78-44f5-bb08-d149ed0c4418.png&w=2048&q=75)

MiniMax M2.7 is a groundbreaking AI model that deeply participates in its own self-evolution, capable of building complex agent harnesses and completing elaborate productivity tasks. It excels in professional software engineering with 56.22% accuracy on SWE-Pro benchmark, demonstrates top-tier office software capabilities with the highest ELO score among open-source models (1495 on GDPval-AA), and maintains 97% skill adherence across 40 complex skills. The model shows enhanced character consistency and emotional intelligence for entertainment applications.

## New Versions

### Python 3.15.0 alpha 7

This is [the seventh](https://www.python.org/downloads/release/python-3150a7/) and possiblly the second last alpha release for 3.15 series before the scheduled beta phase begins in May 2026.

Besides, Python [3.12.13, 3.11.15 and 3.10.20](https://blog.python.org/2026/03/python-31213-31115-31020/), the security bugfix releases for 3.12, 3.11 and 3.10 respectively with only tarball distributions, are also available.

## Tutorials

### DeepLearning.ai's [Agent Memory: Building Memory-Aware Agents](https://www.deeplearning.ai/short-courses/agent-memory-building-memory-aware-agents/) from Oracle

> You'll design a complete memory system that stores and retrieves different memory types, scales tool access using semantic search, and builds write-back loops that allow agents to update their own memory autonomously. By the end, you'll have assembled a fully stateful Memory Aware Agent that loads prior context at startup, assembles relevant context, state, tools, and outputs and improves across sessions.

### Real Python's [Pydantic AI: Build Type-Safe LLM Agents in Python](https://realpython.com/pydantic-ai/)

![realpython-pydantic-ai](https://realpython.com/cdn-cgi/image/width=1920,format=auto/https://files.realpython.com/media/Pydantic-AI-Typed-LLM-Agents-with-Structured-Outputs_Watermarked.043c8afd949c.jpg)

Pydantic AI is a Python framework for building type-safe LLM agents that return validated, structured outputs using Pydantic models. It eliminates the need for error-prone string parsing by defining schemas with type hints, letting the framework handle validation automatically. The framework uses `@agent.tool` decorator to register Python functions that LLMs can invoke based on user queries and docstrings. It also supports dependency injection with `deps_type` for type-safe runtime context like database connections without using global state.

## Articles

### [Thoughts on OpenAI acquiring Astral and uv/ruff/ty](https://simonwillison.net/2026/Mar/19/openai-acquiring-astral)

uv stands out as the most impactful tool with 126 million+ monthly downloads, becoming essential for Python environment management. The author discusses potential risks of a major company owning critical infrastructure, parallels to Anthropic's Bun acquisition, and concerns about OpenAI's limited track record maintaining open source projects. The author notes that due to permissive licensing, forking remains a viable exit strategy if maintenance deteriorates after the transition.

### [Python 3.15's JIT is now back on track](https://fidget-spinner.github.io/posts/jit-on-track.html)

Python 3.15's JIT compiler has achieved its performance goals ahead of schedule, delivering 11-12% speed improvements on macOS AArch64 and 5-6% on x86_64 Linux compared to the interpreter. The article recounts how the original JIT in Python 3.13 and 3.14 was often slower than the interpreter, and funding cuts to the Faster CPython team made the project's future uncertain. The author attributes the revival to community-led development, lucky technical choices like trace recording with dual dispatch and reference count elimination, and strong teamwork. Daily performance tracking and breaking complex problems into manageable tasks helped attract contributors, transforming the JIT from an opaque project into something newcomers could contribute to.

### [The Optimization Ladder](https://cemrehancavdar.com/2026/03/10/optimization-ladder/)

This article presents a comprehensive benchmark of Python optimization techniques, demonstrating a spectrum of approaches from simple to complex. CPython's dynamic design makes it fundamentally slow (177-875x slower than C for compute benchmarks). The "optimization ladder" shows increasing speedups at higher effort levels: upgrading Python (1.4x), alternative runtimes like PyPy/GraalPy (6-66x), compilation tools like Mypyc (2.4-14x), Numba (56-135x), Cython (99-124x), and JAX (up to 1,633x). For real-world JSON processing, gains were more modest. The author emphasizes that the choice depends on your specific problem - Python as an orchestration layer with NumPy can achieve near-compiled speeds, while pure compute loops benefit most from aggressive optimization.

### [When to make a class in Python](https://www.pythonmorsels.com/when-are-classes-used/)

This article outlines when to use Python classes. Most developers first use classes when required by frameworks like Django for database models. Classes excel at bundling related data and functionality — for example, replacing functions passing a shared server object with an `IMAPChecker` class. They also clarify data, like shutil's terminal size class over a bare tuple. While much Python code avoids custom classes, classes improve readability by grouping state and methods together.

### [Invent your own comprehensions in Python](https://www.pythonmorsels.com/custom-comprehensions/)

This article explains how to create "custom comprehensions" in Python using generator expressions. While Python has built-in comprehensions for lists, sets, and dictionaries, it lacks tuple, frozenset, and other specialized collection comprehensions.

The solution is to pass generator expressions to callable functions or classes that accept iterables. For example:

- `tuple(n**2 for n numbers)` acts as a "tuple comprehension"
- `frozenset(w.strip(...) for w in words)` acts as a "frozenset comprehension"
- `Counter(w.strip(...) for w in words)` acts as a "Counter comprehension"

Generator expressions also work with reducer functions like `sum()`, `any()`, `all()`, and `join()`. The key insight is that **any** iterable-accepting callable can essentially become a custom comprehension tool.

### [Fire and forget (or never) with Python’s asyncio](https://mkennedy.codes/posts/fire-and-forget-or-never-with-python-s-asyncio/)

The article discusses a critical issue with fire-and-forget tasks in Python's asyncio. Starting in Python 3.12, `asyncio.create_task()` can silently garbage collect tasks before they execute because the event loop only maintains weak references. This means tasks that aren't explicitly referenced may never run, creating subtle bugs. The solution is to store task references in a set and register a `done_callback` to clean them up after completion. This non-obvious workaround violates Python's "one obvious way" principle but prevents tasks from disappearing mid-execution, ensuring reliable background task execution in async applications.

### [Reinventing Python's AsyncIO](https://blog.baro.dev/p/reinventing-pythons-asyncio)

The author discusses reinventing Python's `asyncio` due to its complexity and limitations around the GIL. After discovering _tinyio_ — a simple event loop implementation — the author created `TonIO`, a new async runtime built in Rust centered on two simple primitives: Event and Waiter. Unlike asyncio, TonIO leverages free-threaded Python to run code across multiple threads without worrying about the main thread. Benchmarks show TonIO is 2-3.5x faster than asyncio for both computation and I/O operations. The author advocates for "reinventing the wheel" to truly understand low-level concepts, encouraging developers to build rather than just ship code.

### [What Python's asyncio primitives get wrong about shared state](https://www.inngest.com/blog/no-lost-updates-python-asyncio)

This blog post discusses problems with Python's asyncio primitives (Event, Condition, Queue) when coordinating concurrent tasks around shared state.

The author explains that while `asyncio.Condition` seems to solve the problem of waiting for specific states, it suffers from a **lost update** bug under real concurrency: when a state changes rapidly (e.g., "closing" → "closed" in the same event loop tick), consumers wake up and check against the _current_ value, missing the intermediate state they were waiting for.

The solution is **per-consumer queues**: instead of waking consumers and asking "is the current state what you want?", buffer every state transition into each consumer's queue. This ensures no intermediate states are missed.

The author provides a `ValueWatcher` class implementation (about 300 lines) with features like thread safety, timeouts, predicate-based matching, and atomic registration.

### [CLI subcommands with lazy imports](https://snarky.ca/subcommands-with-lazy-imports/)

Brett Cannon's article discusses using lazy imports (PEP 810 in Python 3.15) with CLI subcommands to improve startup performance. While lazy imports allow importing only needed modules per subcommand, traditional argparse patterns break this: storing lazy imports in dicts or as default function arguments triggers their reification, defeating the purpose. Solutions include using a match statement instead of a dict for dispatching, or wrapping lazy imports in lambdas to add an indirection layer. Both approaches prevent accidental reification while keeping code organized.

### [The Story of Python's Lazy Imports: Why It Took Three Years and Two Attempts](https://techlife.blog/posts/the-story-of-pythons-lazy-imports-why-it-took-three-years-and-two-attempts/)

This blog post tells the story of Python's lazy imports feature, which took three years and two attempts to implement. The problem: running simple commands like `mytool --help` forces Python to load heavy libraries (PyTorch, NumPy, pandas) even when unnecessary. Companies like Meta and Hudson River Trading built their own forks with lazy imports, achieving 50-70% startup time improvements.

**PEP 690** (2022) proposed a global `-L` flag to make all imports lazy by default, but the Steering Council rejected it, fearing it would create "two Pythons" and break the ecosystem.

At the 2023 Language Summit, Thomas Wouters was the only attendee who said he could "never" support lazy imports.

**PEP 810** (2025) changed the design: instead of a global flag, it uses an opt-in `lazy import` keyword with proxy objects—avoiding changes to Python's internal dictionary structure. Wouters himself became a co-author. The Steering Council unanimously accepted PEP 810 in November 2025, and it will arrive in Python 3.15.

### [Python Type Checker Comparison: Typing Spec Conformance](https://pyrefly.org/blog/typing-conformance-comparison/)

This article compares Python type checkers' conformance to the typing specification, presenting test pass rates: Pyright (97.8%), Zuban (96.4%), Pyrefly (87.8%), mypy (58.3%), and ty (53.2%). It explains that conformance measures how closely checkers follow formal typing rules, with lower conformance forcing developers to work around limitations. However, the article notes conformance has limitations — it doesn't assess type inference, narrowing behavior, performance, IDE integration, error clarity, or third-party package support. The conclusion recommends considering multiple factors beyond conformance when selecting a type checker, as overall developer experience depends on many dimensions.

### [Rewriting a 20-year-old Python library](https://www.b-list.org/weblog/2026/mar/23/20-year-library/)

The author recounts rewriting `akismet`, a 20-year-old Python library for spam filtering originally created by Michael Foord. The rewrite, completed in 2024-2025, separated the library into `SyncClient` and `AsyncClient` classes to support both synchronous and asynchronous operations, introduced an enum-based response system to handle "blatant" spam detection, and switched from requests to httpx for better async support and testability. The codebase was reorganized into multiple files, added comprehensive type hints, pytest fixtures, and test client variants. The author dedicated the work to Foord, who passed away in 2025, hoping to honor his legacy by ensuring the library remains maintainable for decades to come.

### [Replacing tox with UV](https://blog.changs.co.uk/replacing-tox-with-uv.html)

This blog post discusses replacing tox with UV for testing Python libraries across multiple Python versions. The author was upgrading libraries to Python 3.10+ and needed to run tests on different Python versions. While tox and nox are common tools for this, UV offers a more convenient single-tool solution.

Key features of UV for testing include:

- Using `uv run -p 3.10 pytest` to test with specific Python versions
- Specifying extras and dependency groups with `--extra` and `--group` flags
- Overriding package versions with `--with` or `-w` options
- Using `--isolated` to avoid contaminating the development virtual environment
- Running tests in parallel with commands like `parallel "uv run -p {} --isolated pytest" ::: 3.{10..14}`

The author concludes that while tox remains useful, UV provides a faster, more streamlined approach for debugging version incompatibilities.

### [Unit testing your code's performance, part 2: Catching speed changes](https://pythonspeed.com/articles/speed-unit-tests/)

This article presents a technique for using unit tests to detect performance changes in code by measuring CPU instruction counts rather than elapsed time. The method involves using libraries like `py-perf-event` or Valgrind's `Cachegrind` to count instructions during test runs. If the instruction count changes beyond a threshold, the test fails, providing early warning to developers before committing changes. The approach requires reducing noise through consistent environments, hash seeds, and disabling ASLR. While not a replacement for benchmarks, these tests offer immediate feedback during development. The technique has caveats: it may not work in virtualized CI, and results vary across hardware, but can help catch accidental performance regressions early.

### [Defense in Depth: A Practical Guide to Python Supply Chain Security](https://bernat.tech/posts/securing-python-supply-chain/)

The article offers a practical guide to Python supply chain security, advocating defense in depth. Key strategies: use ruff security linting; pin dependencies with cryptographic hashes via uv; run `pip-audit` in CI; generate SBOMs with CycloneDX; adopt Trusted Publishing (OIDC) instead of long-lived tokens; audit GitHub Actions with zizmor; consider delayed ingestion for internal mirrors. It covers threats like dependency confusion, account takeover, and malicious packages, and provides a phased implementation roadmap. The core message: no single control is perfect, so layer multiple defenses.

### [Building shared coding guidelines for AI (and people too)](https://stackoverflow.blog/2026/03/26/coding-guidelines-for-ai-agents-and-people-too/)

This StackOverflow blog post explains how to create effective coding guidelines for AI coding agents. Unlike human developers who absorb tacit knowledge, AI agents lack contextual understanding and require explicit, unambiguous instructions. Guidelines should cover naming conventions, formatting, error handling, and comments using clear, simple language without idioms. Providing both correct and incorrect code examples, plus a "gold standard" reference file, helps agents learn patterns. Errors should be treated as feedback to iteratively improve guidelines collaboratively with the team. Ultimately, these guidelines should be stored in agent configuration files while still using traditional tools like linters to catch basics.

### [When AI Writes the World’s Software, Who Verifies It?](https://leodemoura.github.io/blog/2026/02/28/when-ai-writes-the-worlds-software.html)

This post notes AI is already writing a growing share of global software — 25-30% of Google/Microsoft's new code, plus a 100k-line C compiler in two weeks. It warns unvetted AI code risks widespread security flaws and supply chain attacks, with current poor software quality costing the US $2.4T annually. The solution is formal mathematical proofs, and Lean has emerged as the leading platform to guarantee correct, secure AI-generated code.

### [AI Coding is Gambling](https://notes.visaint.space/ai-coding-is-gambling/)

AI coding generates impressive initial results but behaves like gambling — pulling a slot machine hoping for a jackpot. While AI makes codebase changes trivial and reduces cognitive burden, it often produces plausible yet flawed solutions. The process is addictive but lacks the traditional coding rewards: deep thinking, clever problem-solving, and the satisfaction of making things work. AI offloads the mental work that nurtures the soul, transforming coding from creative problem-solving into mindless slot-pulling, leaving developers to merely clean up poorly implemented code rather than genuinely building solutions.

### [Is AI Killing Software Engineering Jobs?](https://codemanship.wordpress.com/2026/03/02/is-ai-killing-software-engineering-jobs/)

The article argues that AI is not responsible for declining software engineering jobs. The downturn actually began in May 2022, before ChatGPT's launch, triggered by rising interest rates following pandemic-era cheap money. Hiring has been recovering (~5% growth recently). The apparent job shortage stems from reduced employee churn and fear-driven narratives, not AI replacing engineers. Despite layoffs, the developer population continued growing. Businesses claiming to replace engineers with AI still hire them. The author criticizes fear-mongering "AI thought leaders" and predicts demand will recover as it has after previous bust cycles, addressing the temporary pain of those who lost jobs.

### [Reports of code's death are greatly exaggerated](https://stevekrouse.com/precision)

The article argues against the notion that AI will eliminate coding. The author explains that English specifications feel precise until complexity reveals their vagueness, using examples like collaborative text editors. The solution to managing complexity is abstraction—compressing many details into single concepts. Even with AGI, code will remain essential because human thinking requires precise abstractions to master complexity, similar to how ChatGPT hasn't replaced novelists. AI will actually enhance coding by helping create better abstractions and higher-quality code, not make it obsolete. The article concludes that code is just getting started, not dying.

### [Read Less, Steer More](https://blog.ezyang.com/2026/03/read-less-steer-more/)

The blog post argues that with AI coding agents, developers should focus less on reading generated code and more on steering the AI precisely. The author recommends treating AI as a fast typist executing your specifications rather than as an autonomous teammate, demanding justification when something doesn't make sense. "Vibe coding" is a trap — instead, maintain active involvement to reduce cognitive burden. Beginners should practice without "accept edits" to train intuition, while recognizing that genuine discovery still requires human-speed creation and cannot be rushed. The key mindset shift: don't accommodate the AI's output; steer it to match your exact vision.

### [“Design Me a Highly Resilient Database”](https://nikogura.com/DatabaseDesign.html)

This article argues that there's no such thing as a "highly resilient database" in the abstract — it always depends on the specific use case. The author recounts failing a job interview by asking clarifying questions about data types, query patterns, and failure modes instead of simply naming a database like "Cassandra". The piece explains that different databases serve different purposes: PostgreSQL provides ACID compliance essential for financial transactions, Cassandra handles write-heavy workloads with eventual consistency for IoT data, and Redis works best for caching. The author emphasizes that the CAP theorem forces tradeoffs between consistency and availability, and choosing the wrong database — like eventual consistency for ledgers — can lead to audit failures and regulatory issues. The right approach starts with questions, not product names.

## Podcasts

### 🐍 RealPython Podcast

- [Episode 287: Crafting and Editing In-Depth Tutorials at Real Python](https://realpython.com/podcasts/rpp/287/)
- [Episode 288: Automate Exploratory Data Analysis & Invent Python Comprehensions](https://realpython.com/podcasts/rpp/288/)
- [Episode 289: Limitations in Human and Automated Code Review](https://realpython.com/podcasts/rpp/289/)

### 🥧 Python Bytes Podcast

- [#471 The ORM pattern of 2026?](https://pythonbytes.fm/episodes/show/471/the-orm-pattern-of-2026/)
- [#472 Monorepos](https://pythonbytes.fm/episodes/show/472/monorepos)
- [#473 A clean room rewrite?](https://pythonbytes.fm/episodes/show/473/a-clean-room-rewrite/)
- [#474 Astral to join OpenAI](https://pythonbytes.fm/episodes/show/474/astral-to-join-openai/)
- [#475 Haunted warehouses](https://pythonbytes.fm/episodes/show/475/haunted-warehouses)

### 🦜 Talk Python to me

- [#538: Python in Digital Humanities](https://talkpython.fm/episodes/show/538/python-in-digital-humanities)
- [#539: Catching up with the Python Typing Council](https://talkpython.fm/episodes/show/539/catching-up-with-the-python-typing-council)
- [#540: Modern Python monorepo with uv and prek](https://talkpython.fm/episodes/show/540/modern-python-monorepo-with-uv-and-prek)
- [#541: Monty - Python in Rust for AI](https://talkpython.fm/episodes/show/541/monty-python-in-rust-for-ai)
- [#542: Zensical - a modern static site generator](https://talkpython.fm/episodes/show/542/zensical-a-modern-static-site-generator)

### 🍕 Pybites Podcast

- [#218: Why Python developers are learning Rust](https://www.pybitespodcast.com/1501156/episodes/18764761-218-why-python-developers-are-learning-rust)

### 🚀 VS Code Insiders Podcast

- [Episode 20: Autopilot Mode with Justin Chen](https://www.vscodepodcast.com/20)

## Repositories

- [agentscope-ai/ReMe](https://github.com/agentscope-ai/ReMe) (Apache-2.0)

ReMe is a memory management framework designed for AI agents, providing both file-based and vector-based memory systems.

It tackles two core problems of agent memory: limited context window (early information is truncated or lost in long conversations) and stateless sessions (new sessions cannot inherit history and always start from scratch).

- [alibaba/OpenSandbox](https://github.com/alibaba/OpenSandbox) (Apache-2.0)

OpenSandbox is a general-purpose sandbox platform for AI applications, offering multi-language SDKs, unified sandbox APIs, and Docker/Kubernetes runtimes for scenarios like Coding Agents, GUI Agents, Agent Evaluation, AI Code Execution, and RL Training.

- [NVIDIA/OpenShell](https://github.com/NVIDIA/OpenShell) (Apache-2.0)

OpenShell is the safe, private runtime for autonomous AI agents. It provides sandboxed execution environments that protect your data, credentials, and infrastructure — governed by declarative YAML policies that prevent unauthorized file access, data exfiltration, and uncontrolled network activity.

- [Gen-Verse/OpenClaw-RL](https://github.com/Gen-Verse/OpenClaw-RL) (Apache-2.0)

OpenClaw-RL is a fully asynchronous reinforcement learning framework that turns everyday conversations into training signals for personalized AI agents, and supports training general agents with large-scale environment parallelization.

---

As we wrap up this journey together, I want to take a moment to express my gratitude for your reading. If you've enjoyed what you just read and would like to help sustain this blog, consider [starring this blog on github](https://github.com/blueberry-py/blog/stargazers), it would be great motivation for me to keep updating the blogs!

Alright, that concludes the March Edition of "This Month for Pythonistas". Thank you again for reading my post. I hope you enjoy it or find something useful. Happy coding and see you next month! 👋
