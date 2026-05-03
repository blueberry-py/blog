+++
title = "This Month for Pythonistas - April 2026"
description = "New Python versions, DjangoCon Europe, GPT-5.5, Claude Opus 4.7, GLM-5.1, Kimi K2.6, Harness, opinions on Agentic AI and other fun stuff"
slug = "this-month-for-pythonistas-2026-04"
date = 2026-04-30T21:00:00+08:00
authors = ["Zeyang Lin"]
tags = ["python", "news", "podcast", "AI", "llm", "linux", "blog"]
categories = ["python"]
series = ["this month for pythonistas"]
keywords = ["python", "news", "2026", "djangocon", "gpt", "claude", "openai", "moonshot", "AI", "agentic", "harness"]
image = "title.jpg"
draft = false
+++

```python
from datetime import date

print(date.today().year, date.today().month)
# 2026 4
```

![issue-2026-04](splash.jpg)

Welcome back Pythonistas! This is the April 2026 issue of "This Month for Pythonistas", bringing you curated Python news, tutorials, articles, podcasts and community highlights.

Before we continue, please note that this blog is synced across the following platforms:

- [Github Pages](https://blueberry-py.github.io/blog/post/this-month-for-pythonistas-2026-04/)
- [Netlify](https://blueberrypy.netlify.app/post/this-month-for-pythonistas-2026-04/)
- [Render](https://blueberrypy.onrender.com/post/this-month-for-pythonistas-2026-04/)
- [Vercel](https://blueberrypy-blog.vercel.app/post/this-month-for-pythonistas-2026-04/)

Ready? Let's get started!

---

## Events & Social

### [Reflecting on Five Years as the PSF’s First CPython Developer in Residence](https://pyfound.blogspot.com/2026/04/reflecting-on-five-years-as-psfs-first.html)

The article reflects on _Łukasz Langa_'s nearly five-year tenure as the PSF's first CPython Developer in Residence, highlighting contributions like transitioning to GitHub issues, automating the CLA process, introducing free threading, and modernizing the interactive shell. The role will continue with Meta's sponsorship through mid-2027. The position has expanded from one to five full-time engineers, ensuring its stability. Łukasz expresses gratitude to the Steering Council and excitement about moving to Vancouver while joining Meta, emphasizing ongoing commitment to the Python community.

### DjangoCon Europe 2026

DjangoCon Europe goes to Athens, Greece this year, from April 15th to 19th. More info can be found [here](https://2026.djangocon.eu/).

### [Introducing GPT‑5.5](https://openai.com/index/introducing-gpt-5-5/)

OpenAI released GPT-5.5 which excels in coding, knowledge work, scientific research and cybersecurity, matching GPT-5.4's latency with stronger performance. It has higher token efficiency and stricter safeguards. Now available for Plus/Pro/Business/Enterprise users; API versions launch soon. GPT-5.5 Pro delivers better accuracy for complex tasks.

### [Introducing Claude Opus 4.7](https://www.anthropic.com/news/claude-opus-4-7)

![claude-opus-4.7](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2F96ea2509a90e527642c822303e56296a07bcfce4-1920x1080.png&w=3840&q=75)

Claude Opus 4.7, Anthropic's latest model, is now generally available. It significantly advances Opus 4.6 in advanced software engineering, handling difficult coding tasks with greater autonomy, precision, and consistency. The model also features substantially improved vision, higher-resolution image understanding, and more creative, professional outputs. It demonstrates stronger reasoning, better instruction following, and enhanced multimodal capabilities. With safeguards for cybersecurity and expanded access across products and cloud platforms, Opus 4.7 aims to accelerate complex workflows while maintaining reliability and safety.

### [Qwen3.6-Plus: Towards Real World Agents](https://qwen.ai/blog?id=qwen3.6)

![qwen3.6-plus-image](https://qianwen-res.oss-accelerate.aliyuncs.com/Qwen3.6/Figures/3.6_plus_banner.png)

Qwen has launched _Qwen3.6-Plus_, a major upgrade featuring dramatically enhanced agentic coding capabilities and improved multimodal reasoning. The model now supports a 1M context window by default and excels in complex tasks like frontend development, terminal operations, and automated task execution. It demonstrates state-of-the-art performance across coding benchmarks (SWE-bench, Terminal-Bench 2.0), general agent tasks, and multimodal understanding (MMMU, document analysis, video reasoning).

### [GLM-5.1: Towards Long-Horizon Tasks](https://z.ai/blog/glm-5.1)

GLM-5.1 is Z.ai's next-generation flagship model designed for agentic engineering tasks with significantly improved coding capabilities. It achieves state-of-the-art performance on SWE-Bench Pro and leads on NL2Repo and Terminal-Bench 2.0 benchmarks. Unlike previous models that plateau early, GLM-5.1 excels at long-horizon optimization, demonstrated by achieving 6× better results over 600 iterations on vector database optimization, sustaining 3.6× speedup over 1,000+ turns on ML workloads, and building a complete Linux desktop environment over 8 hours through continuous refinement.

### [Kimi K2.6: Advancing Open-Source Coding](https://www.kimi.com/blog/kimi-k2-6)

![kimi-k2.6](https://kimi-file.moonshot.cn/prod-chat-kimi/kfs/4/2/2026-04-20/1d7j2jpl3v89kkei5mq70?x-tos-process=image%2Fauto-orient%2C1%2Fstrip%2Fignore-error%2C1)

Kimi K2.6 is an open-source model from Moonshot featuring advanced coding, long-horizon execution, and agent swarm capabilities. It demonstrates significant improvements over K2.5 in complex engineering tasks, autonomously handling multi-step workflows across programming languages like Rust, Go, and Python. The model excels at long-running tasks—such as optimizing financial engines and deploying models—with strong tool-calling accuracy (96.60%). K2.6 also enables coding-driven frontend design and full-stack development, while its _Agent Swarm_ architecture scales to 300 sub-agents executing 4,000 coordinated steps. Used in proactive agents like _OpenClaw_ and _Hermes_, it supports 24/7 autonomous operations and collaborative multi-agent systems through Claw Groups, achieving state-of-the-art performance on benchmarks like SWE-Bench and Terminal-Bench 2.0.

### [The next evolution of the Agents SDK](https://openai.com/en-US/index/the-next-evolution-of-the-agents-sdk/)

The article discusses the next evolution of OpenAI's Agents SDK, introducing enhanced capabilities for building AI agents. The updated SDK enables developers to create agents that can inspect files, execute commands, edit code, and handle long-term tasks within controlled sandbox environments. Key features include configurable memory, sandbox-aware orchestration, filesystem tools, MCP integration for tool use, and native sandbox execution with providers like Blaxel and Daytona. The architecture separates harness from compute, supports durable execution through snapshotting, and provides standardized primitives for building reliable, scalable agent systems with improved security and performance.

## New Versions

### [Python 3.15.0a8, 3.14.4 and 3.13.13 are out!](https://blog.python.org/2026/04/python-3150a8-3144-31313/)

3.15.0 alpha 8 is expected to be the last alpha build before beta 1 comes out in May 2026. You can find the full release schedule of Python 3.15 [here](https://peps.python.org/pep-0790/).

3.14.4 and 3.13.13 are bug fix releases for Python 3.14 and 3.13 respectively, both with binary as well as tarball distributions.

## Tutorials

### DeepLearning.ai's [Efficient Inference with SGLang: Text and Image Generation](https://www.deeplearning.ai/short-courses/efficient-inference-with-sglang-text-and-image-generation/)

> In this course, you'll build a clear mental model of how inference works (from input tokens to generated output) and learn why the memory bottleneck exists. From there, you'll implement the KV cache from scratch to store and reuse intermediate attention values within a single request. Then you'll go further with RadixAttention, SGLang's approach to sharing KV cache across requests by identifying common prefixes using a radix tree. Finally, you'll apply these same optimization principles to image generation using diffusion models.

### DeepLearning.ai's [Spec-Driven Development with Coding Agents](https://www.deeplearning.ai/short-courses/spec-driven-development-with-coding-agents/) from Paul Everitt

> In this course, you'll write project constitutions, plan and validate features in iterative loops, and apply the same repeatable workflow to both fresh and legacy codebases. You'll also see how specs preserve context across agent sessions, reduce cognitive debt, and improve intent fidelity, keeping your agent aligned with what you actually want.

### DeepLearning.ai's [Building Multimodal Data Pipelines](https://www.deeplearning.ai/short-courses/building-multimodal-data-pipelines/) from Snowflake

> Images, audio, and video make up a growing share of the data companies generate today, but most pipelines are still built for structured data alone. This course teaches you to build AI-powered pipelines that process multimodal data and turn it into LLM-ready text.

### RealPython's [Variables in Python: Usage and Best Practices](https://realpython.com/python-variables/)

![realpython-variables-in-python](https://realpython.com/cdn-cgi/image/width=1920,format=auto/https://files.realpython.com/media/UPDATE-Variables-in-Python_Watermarked.7d8b51f3adad.jpg)

In Python, "variables" are symbolic names that refer to objects or values stored in memory, created by assigning a value with the `=` operator. They are dynamically typed, so their type can change through reassignment, and naming follows rules like using letters, digits, and underscores but not starting with a digit, with snake_case preferred for readability. Variables can be used in expressions, as counters, accumulators, flags, loop variables, or data storage, and they exist in scopes (global, local, non-local, built-in) that determine accessibility. Python also supports type hints, multiple assignment, iterable unpacking, assignment expressions, and pattern matching for creating variables, while attributes in classes provide namespace-like behavior, and `del` can remove variables from scope.

## Articles

### [Cutting Python Web App Memory Over 31%](https://mkennedy.codes/posts/cutting-python-web-app-memory-over-31-percent/)

The article from _Michael Kennedy_ details how Michael Kennedy reduced his Python web app memory usage from 1,988 MB to 472 MB (over 31% reduction, saving 3.2 GB total) using five key techniques: migrating to Quart (async Flask) with a single Granian worker, replacing the MongoEngine ODM with a Raw+DataClass database pattern, isolating the search indexer into a subprocess (cutting it from 708 MB to 22 MB), moving heavy library imports like boto3 and pandas from global to local function-level imports, and shifting in-memory caches to disk-based caching using the diskcache library.

### [Python: introducing profiling-explorer](https://adamj.eu/tech/2026/04/03/python-introducing-profiling-explorer/)

The author introduces **profiling-explorer**, a new Python tool for exploring profiling data from pstats files generated by Python's built-in profilers. It provides a web-based interface with features like dark mode, sortable columns, search filtering, and navigation between callers and callees. The tool was motivated by the author's optimization work where the command-line pstats interface felt clunky. The article also explains Python's three profilers — profile (deprecated), profiling.tracing (cProfile), and the new sampling profiler Tachyon in Python 3.15 — and provides instructions for generating pstats files and using profiling-explorer to analyze them, sponsored by Rippling.

### [Django: fixing a memory “leak” from Python 3.14’s incremental garbage collection](https://adamj.eu/tech/2026/04/20/django-python-3.14-incremental-gc/)

The article details an out-of-memory error encountered when running Django migrations on Python 3.14, specifically on a resource-constrained Heroku server. Python 3.14 introduced **incremental garbage collection** to reduce pause times, but this algorithm struggled with Django's cyclical objects, causing memory usage to spike beyond limits. The author implemented a workaround by extending Django's migrate command to force full garbage collection after each migration using `gc.collect()`, which resolved the issue. Coincidentally, the Python core team announced they would revert incremental garbage collection in Python 3.14.5 due to widespread memory concerns, validating the problem and rendering the workaround temporary.

### [Using a `~/.pdbrc` file to customize the Python Debugger](https://treyhunner.com/2026/04/customizing-pdb-with-pdbrc/)

The article explores customizing Python's built-in debugger (pdb) via a `.pdbrc` configuration file. It details how to set up persistent aliases, command shortcuts, and environment adjustments to streamline debugging workflows. The author provides practical examples, such as defining custom commands and automating routine tasks, demonstrating how `.pdbrc` enhances productivity by reducing repetitive input. The piece also touches on best practices for organizing configurations and ensuring compatibility across different debugging sessions, making pdb more adaptable to individual developer preferences and complex project requirements.

### [Building a Python Library in 2026](https://stephenlf.dev/blog/python-library-in-2026/)

This blog post provides a comprehensive guide to building Python libraries in 2026, emphasizing modern tools and best practices. The author recommends using **uv** from Astral as the central tool for project initialization, dependency management, building, and publishing. Key components include: a standard `src` layout, `pyproject.toml` metadata, linting/formatting with **ruff**, type checking with **mypy** (or alternatives), testing with **pytest** and coverage, CI enforcement via GitHub Actions, and pre-commit hooks. The author also explores publishing options beyond PyPI and examines real-world implementations from OpenAI and Polars, demonstrating how these tools streamline modern Python package development.

### [Why pylock.toml includes digital attestations](https://snarky.ca/why-pylock-toml-includes-digital-attestations/)

This blog post from _Brett Cannon_ explains why `pylock.toml` includes digital attestations to enhance Python package security. Triggered by a recent PyPI project hack, the author highlights how _trusted publishing_ allows continuous deployment systems to securely upload packages without exposing credentials. Digital attestations verify that a package genuinely originated from its expected CD system. When recorded in `pylock.toml`, publisher details for each package enable automated or manual verification to detect suspicious changes, such as missing or altered attestation data. Ultimately, the author recommends maintainers adopt trusted publishing with attestations, use lock files like `pylock.toml`, and regularly review attestation consistency to catch potential supply chain attacks.

### [Continual learning for AI agents](https://blog.langchain.com/continual-learning-for-ai-agents/)

The blog post from Langchain explains that continual learning for AI agents can occur at three distinct layers: the model (weight updates using techniques like SFT or RL), the harness (optimizing the code and tools around the model), and the context (updating configuration, instructions, skills, or memory). While most discussions focus on model-level learning, the harness and context layers offer practical ways to improve agents over time. Traces — the full execution logs of agents — are central to all approaches, enabling analysis and improvement. The harness can be refined by reviewing traces to suggest code changes, while context can be updated at agent, user, or organization levels, either offline or in real-time. Tools like LangSmith and frameworks like Deep Agents support these patterns, allowing AI systems to continuously learn and adapt.

### [pixi: One Package Manager for Python and C/C++ Libraries](https://codecut.ai/uv-pixi-comparison/)

The article compares **uv** and **pixi** as Python package managers, explaining that while uv excels at fast dependency resolution and lockfiles for pure Python projects from PyPI, it cannot install compiled C/C++ system libraries like GDAL, requiring separate OS package managers. **pixi** solves this by managing both Python packages from PyPI and compiled libraries from conda-forge in a single tool, with automatic lockfiles, multi-platform support, built-in task running, and project-level environments. The author recommends using uv for simple Python projects and pixi when working with compiled dependencies, geospatial libraries, or needing unified package management across platforms.

### [Learning Rust Made Me a Better Python Developer](https://belderbos.dev/blog/rust-made-me-a-better-python-developer/)

Learning Rust improved the author's Python development by forcing explicit thinking about data ownership, error handling, and edge cases. Rust's compiler enforces strict patterns that prevent common bugs: ownership rules stop unexpected mutations, Result types make failure explicit in return types, and exhaustive pattern matching ensures all cases are handled. Though Python's type system can approximate these concepts, Rust's compiler builds a disciplined reflex. The author now writes cleaner, more predictable Python — asking who owns data before mutating, modeling errors explicitly, and treating all possible states — even though Rust and Python serve different roles (performance vs. orchestration) and aren't direct competitors.

### [What every dev should know about AI sandboxes](https://read.engineerscodex.com/p/every-dev-should-know-about-ai-sandboxes)

AI sandboxes are critical for safely running AI agents, protecting production systems from potentially harmful actions. The threat model has evolved: agents may confidently execute wrong instructions, not just malicious attacks. Isolation levels range from lightweight containers (fast but share kernel) to MicroVMs (hardware-level isolation but slower), gVisor (userspace kernel), OS-level primitives like Bubblewrap (zero overhead), and simulated environments. Trade-offs exist between speed and security. Vendors like E2B (Firecracker-based), Modal (gVisor), and Daytona (container-based) offer solutions. Building your own sandbox is discouraged unless it's your core product, as managing security, observability, and lifecycle complexity distracts from primary goals.

### [Long-running Agents](https://addyosmani.com/blog/long-running-agents/)

Long-running agents are AI systems that maintain progress across hours, days, or weeks, overcoming the limitations of traditional chat-based agents that forget and fail over long tasks. They require solving three core problems: finite context windows, lack of persistent state, and unreliable self-verification. Leading approaches from Anthropic, Cursor, and Google converge on decoupling the model's reasoning loop from execution sandboxes and durable session logs, while implementing patterns like checkpoint-and-resume, memory banks, and separate evaluators to ensure reliability. These systems enable economically feasible delegation of complex, multi-day work, though challenges remain around cost, security, alignment drift, and defining work that can survive autonomous execution.

### [Scaling Managed Agents: Decoupling the brain from the hands](https://www.anthropic.com/engineering/managed-agents)

Anthropic's _Managed Agents_ service decouples the "brain" (Claude and its harness) from the "hands" (execution sandboxes) and the "session" (event log) through stable, general-purpose interfaces. This architecture — inspired by operating system virtualization — addresses the fragility of earlier monolithic designs where components were tightly coupled in single containers. By treating each component as interchangeable "cattle" rather than precious "pets", the system gains reliability, security (credentials are isolated from execution), and performance (reducing time-to-first-token by 60-90%). The meta-harness design is opinionated about interfaces but unopinionated about specific implementations, allowing it to evolve alongside model improvements.

### [Multi-agent coordination patterns: Five approaches and when to use them](https://claude.com/blog/multi-agent-coordination-patterns)

The Claude blog outlines five multi-agent coordination patterns for teams building AI systems. The generator-verifier pattern loops output between generation and validation for quality-critical work. Orchestrator-subagent uses a lead agent to delegate clear, bounded subtasks. Agent teams employ persistent workers for independent, long-running parallel work. Message bus routes events through publish-subscribe for evolving pipelines. Shared state lets agents collaborate through a common knowledge store. The authors recommend starting with orchestrator-subagent as the simplest pattern, then evolving as needs clarify, emphasizing that patterns are building blocks often combined in production systems rather than mutually exclusive choices.

### [Managing context in long-run agentic applications](https://slack.engineering/managing-context-in-long-run-agentic-applications/)

![slack-engineering-investigation-notebook](https://slack.engineering/wp-content/uploads/sites/7/2026/03/investigation_notebook.png)

The article discusses managing context in long-running agentic systems, focusing on Slack's approach to maintaining coherence across multi-agent investigations. It addresses challenges posed by limited language model context windows and proposes three complementary channels: the Director's Journal for structured memory, the Critic's Review for credibility-scored findings, and the Critic's Timeline for consolidated, evidence-based chronology. These mechanisms enable specialized agent roles while preserving alignment and creativity, allowing systems to operate effectively over extended interactions. The solution emphasizes online summarization rather than accumulating message history, ensuring scalability and trustworthiness.

### [Components of A Coding Agent](https://magazine.sebastianraschka.com/p/components-of-a-coding-agent)

This article by Sebastian Raschka explains the core components of coding agents (like Claude Code and Codex CLI) that make LLMs more effective for programming tasks. The author describes six key building blocks:

(1) Live Repo Context - understanding the project structure and environment;
(2) Prompt Shape and Cache Reuse - efficiently packaging and caching stable information;
(3) Tool Access and Use - enabling structured tool calls with validation;
(4) Minimizing Context Bloat - compressing and deduplicating history;
(5) Structured Session Memory - maintaining both full transcripts and distilled working memory;
and (6) Delegation with Subagents - splitting tasks into bounded subtasks.

The article emphasizes that the harness layer often matters as much as the underlying model itself, explaining why coding agents feel significantly more capable than the same models in plain chat interfaces.

### [All your agents are going async](https://zknill.io/posts/all-your-agents-are-going-async/)

The post argues that AI agents are shifting from synchronous chat to asynchronous, background workflows, breaking HTTP request‑response transport. Async agents need durable state and push-based delivery because they outlive connections, push unprompted updates, switch devices, and serve multiple users. Current solutions like Anthropic Channels, Cloudflare Sessions, and OpenClaw’s WhatsApp model address state or delivery but often rely on polling or custom backends. The author advocates a durable, realtime session layer—bi‑directional, multi‑device, and resilient—that separates conversation state from transport, enabling reliable async collaboration between humans and agents.

### [Why we're rethinking cache for the AI era](https://blog.cloudflare.com/rethinking-cache-ai-humans/)

Cloudflare's analysis reveals that 32% of network traffic originates from automated sources, including AI bots and crawlers. Unlike human users, AI traffic exhibits high-volume sequential requests targeting long-tail content across websites, significantly raising cache miss rates and straining CDN infrastructure. This has caused real-world impacts like Wikipedia's 50% surge in bandwidth usage and service slowdowns across platforms like SourceHut and Fedora. Current cache algorithms such as LRU struggle under AI's constant scanning behavior. Cloudflare proposes AI-aware solutions including alternative cache replacement algorithms (SEIVE, S3FIFO), machine learning-based caching, and ultimately a separate cache layer dedicated to AI traffic to maintain performance for human users.

### [Your harness, your memory](https://blog.langchain.com/your-harness-your-memory/)

![langchain-deep-agents](https://storage.ghost.io/c/97/88/97889716-a759-46f4-b63f-4f5c46a13333/content/images/size/w1248/format/webp/2026/04/image--9--1.png)

Agent harnesses — the systems that coordinate LLMs with tools and data — are becoming the standard way to build AI agents, and they are fundamentally tied to memory management. Using closed, proprietary harnesses means surrendering control of your agent's memory to third parties, which creates significant lock-in. Memory is what allows agents to learn from interactions and deliver personalized experiences, making it a crucial competitive advantage. The article argues that both memory and harnesses should be open and independently owned to maintain flexibility and avoid platform dependency. To address this, the author introduces Deep Agents as an open-source, model-agnostic framework that gives developers full control over their agents' memory storage and retrieval.

### [Oh Memories, Where'd You Go](https://weaviate.io/blog/engram-internal-use-case)

_Engram_ is Weaviate's memory product (in private preview) designed to store context beyond what fits in Claude Code's built-in MEMORY.md file (~200 lines). The author tested it by building an MCP server integration but initially found Claude ignored Engram because MEMORY.md loads with zero latency. The solution involved categorizing memories (communication-style, domain-context, tool-preferences, workflow) and integrating at specific session lifecycle points. Testing showed Engram excelled at "decision archaeology" (30% faster with reasoning chains recalled), but failed on planning tasks where Claude defaults to forward-moving. Key improvements needed include fire-and-forget saves, automatic memory capture pipelines, and deterministic retrieval hooks at session start.

### [The Spec Layer](https://blog.matt-rickard.com/p/the-spec-layer)

The blog advocates for spec-driven development (SDD) to constrain AI agents' execution freedom and prevent "wrong kind of correct" mistakes. Unlike humans, agents make locally valid errors like disabling tests or reusing existing patterns. Written specs provide durable intent that narrows choices at implementation time. Historical protocol examples (RFCs for IP, HTTP, TLS, HTML) demonstrate how specs enable multiple implementations over decades. The ideal spec should be declarative, layered, and cheap to revise, with mechanical enforcement moved to lint, schemas, and tests. The goal is a narrow interface between human intent and machine execution: smaller specs, harder checks, and less guessing.

### [I Still Prefer MCP Over Skills](https://david.coffee/i-still-prefer-mcp-over-skills/)

The author argues that MCP (Model Context Protocol) is superior to Skills for connecting LLMs to external services because it's an API abstraction where the LLM only needs to know the "what", not the "how". MCP offers zero-install remote usage, seamless auto-updates, proper authentication handling, true portability, sandboxing, and smart tool discovery. Skills, however, require CLI installation, can't work in many environments like ChatGPT or Perplexity, create deployment and secret management nightmares, and bloat the context window. He concludes that MCP should be the standard for connecting to services, while Skills should only be used for teaching LLMs knowledge about existing tools or workflows — not as replacements for actual service connectors.

### [The Beginning of Programming as We’ll Know It](https://bitsplitting.org/2026/04/01/the-beginning-of-programming-as-well-know-it/)

The article discusses the impact of AI coding assistants on the programming profession. While AI tools like Claude and Codex can now complete significant coding tasks in minutes, the author argues that human programmers remain essential during this transitional period. Humans bring unique qualities like taste, wisdom, and caution that AI lacks. The author emphasizes that AI-generated code must be reviewed and corrected by humans before it can be considered real work. Despite AI's impressive capabilities, there's a "reality distortion field" around AI outputs that can mislead developers. The conclusion is that programmers who embrace AI while maintaining skepticism and human oversight will be better equipped than ever, while those who refuse these tools will fall behind.

### [The Cult Of Vibe Coding Is Insane](https://bramcohen.com/p/the-cult-of-vibe-coding-is-insane)

This article criticizes the "vibe coding" trend where developers avoid examining underlying code, instead relying solely on vague AI conversations. After Claude's source code leak revealed poor quality, the author argues that "pure vibe coding" is a myth — human contributions still occur through language and infrastructure frameworks. Bad software isn't inevitable with AI; it's a conscious choice. The author explains that AI excels at cleaning up technical debt when given proper guidance through collaborative dialogue, and developers should actively steer AI toward high-quality outcomes rather than accepting mediocrity. The core message: poor software quality is a decision, not a necessity.

### [Claude Is Not Your Architect. Stop Letting It Pretend.](https://www.hollandtech.net/claude-is-not-your-architect/)

The article warns against using AI like Claude as a software architect, arguing that while AI agents are excellent implementers, they cannot make real architectural decisions. AI is "pathologically agreeable" — always validating ideas enthusiastically without the crucial ability to say "no" or push back on complexity. It produces generic "Jenga tower" architectures that look sound but aren't tailored to specific teams, constraints, or production realities. The real danger is that engineers are reduced to implementing AI-designed tickets, while accountability vanishes — when systems fail, humans stay up debugging decisions they didn't make. The solution: humans must design, AI must implement.

## Podcasts

### 🥝 core.py

- [Episode 29: Is CPython developed with AI now?](https://open.spotify.com/episode/5pD08pb1Tt7Z7k2ZSIdih9)

### 🐍 RealPython Podcast

- [Episode 290: Advice on Managing Projects & Making Python Classes Friendly](https://realpython.com/podcasts/rpp/290/)
- [Episode 291: Reassessing the LLM Landscape & Summoning Ghosts](https://realpython.com/podcasts/rpp/291/)
- [Episode 292: Becoming a Better Python Developer Through Learning Rust](https://realpython.com/podcasts/rpp/292/)

### 🥧 Python Bytes Podcast

- [#476 Common themes](https://pythonbytes.fm/episodes/show/476/common-themes)
- [#477 Lazy, Frozen, and 31% Lighter](https://pythonbytes.fm/episodes/show/477/lazy-frozen-and-31-lighter)

### 🦜 Talk Python to me

- [#543: Deep Agents: LangChain's SDK for Agents That Plan and Delegate](https://talkpython.fm/episodes/show/543/deep-agents-langchains-sdk-for-agents-that-plan-and-delegate)
- [#544: Wheel Next + Packaging PEPs](https://talkpython.fm/episodes/show/544/wheel-next-packaging-peps)
- [#545: OWASP Top 10 (2025 List) for Python Devs](https://talkpython.fm/episodes/show/545/owasp-top-10-2025-list-for-python-devs)
- [#546: Self hosting apps for Python people](https://talkpython.fm/episodes/show/546/self-hosting-apps-for-python-people)

### 🚀 VS Code Insiders Podcast

- [Episode 21: Inside The Agent Loop with Pierce Boggan](https://www.vscodepodcast.com/21)

## Repositories

### [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) (MIT)

> The self-improving AI agent built by Nous Research. It's the only agent with a built-in learning loop — it creates skills from experience, improves them during use, nudges itself to persist knowledge, searches its own past conversations, and builds a deepening model of who you are across sessions.

### [dropseed/plain](https://github.com/dropseed/plain) (BSD-3)

Forked from Django, `plain` is an opinionated Python web framework which is ready for the AI Agent age. You can visit their [official website](https://plainframework.com/) for more information.

### [smelloscope/smello](https://github.com/smelloscope/smello) (MIT)

> Capture outgoing HTTP requests from your Python code and browse them in a local web dashboard — including gRPC calls made by Google Cloud libraries.

---

As we wrap up this journey together, I want to take a moment to express my gratitude for your reading. If you've enjoyed this issue and would like to help sustain this blog, please consider [starring this blog on github](https://github.com/blueberry-py/blog/stargazers), it would be great motivation for me to keep updating!

Alright, that concludes the April Edition of "This Month for Pythonistas". Thank you again for reading my post. I hope you enjoy it or find something useful. Happy coding and see you in May! 👋
