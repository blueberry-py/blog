+++
title = "This Month for Pythonistas - June 2026"
description = "New Python 🐍 versions, JIT, free-threading internals, Claude Fable/Mythos drama, MiniMax M3, Qwen 3.7 Plus, more thoughts on Agentic AI 🤖 and vibe coding, as well as other fun stuff"
slug = "this-month-for-pythonistas-2026-06"
date = 2026-06-30T21:00:00+08:00
authors = ["Zeyang Lin"]
tags = ["python", "news", "podcast", "AI", "pycon"]
categories = ["python"]
series = ["this month for pythonistas"]
keywords = ["python", "AI", "agentic", "microsoft", "podcast", "pycon", "linux", "claude", "anthropic"]
image = "title.jpg"
draft = false
+++

```python
from datetime import date

print(date.today().year, date.today().month)
# 2026 6
```

![issue-2026-06](splash.jpg)

Welcome back Pythonistas! This is the June 2026 issue of "This Month for Pythonistas", bringing you curated Python news, tutorials, articles, podcasts, repositories and community highlights worth noting in this month.

Before we continue, please note that this blog is synced across the following platforms:

- [Github Pages](https://blueberry-py.github.io/blog/post/this-month-for-pythonistas-2026-06/)
- [Netlify](https://blueberrypy.netlify.app/post/this-month-for-pythonistas-2026-06/)
- [Render](https://blueberrypy.onrender.com/post/this-month-for-pythonistas-2026-06/)
- [Vercel](https://blueberrypy-blog.vercel.app/post/this-month-for-pythonistas-2026-06/)

Ready? Let's get started!

---

## Events & Social

### [An announcement from the Steering Council regarding the JIT project](https://discuss.python.org/t/an-announcement-from-the-steering-council-regarding-the-jit-project/107638)

The _Python Steering Council_ announced that the experimental JIT compiler in CPython must undergo formal review through a Standards Track PEP within six months. While acknowledging the developers' valuable work and real performance gains, the Council noted the JIT lacks proper formal approval — PEP 744 was only informational. Until an accepted PEP addresses maintenance plans, compatibility guarantees, success metrics, and architectural stability, no new JIT features can be added to main (only bug/security fixes permitted). If no PEP is accepted within six months, the JIT code must be removed from CPython's main repository.

### EuroPython 2026 schedule is revealed 📣

The full schedule for EuroPython 2026, hosted in Kraków, Poland, has been released. Check it out on [the official website](https://ep2026.europython.eu/schedule/).

### [Everything Security at PyCon US 2026](https://pyfound.blogspot.com/2026/06/everything-security-at-pycon-us-2026.html)

**PyCon US 2026** featured its first-ever dedicated security track, "Trailblazing Python Security", with seven talks covering phishing, zero trust, supply chain attacks, SBOMs, and more. The Python Software Foundation (PSF) delivered a security update highlighting a surge in malware and watering-hole attacks targeting PyPI. An Open Space session brought together open-source maintainers to discuss CI/CD hardening, the overwhelming flood of LLM-generated vulnerability reports consuming most of their time, and the need for contributor quality signals. Additionally, Alpha-Omega–sponsored security roles presented updates on Python Security Response Team governance reforms and efforts to combat supply-chain attacks on the Python ecosystem.

### [Building a hill-climbing machine: Launching seven new MAI models](https://microsoft.ai/news/building-a-hillclimbing-machine-launching-seven-new-mai-models/)

Microsoft AI (MAI) announced seven new in-house models during Microsoft Build 2026, spanning reasoning (MAI-Thinking-1), coding (MAI-Code-1-Flash), image generation (MAI-Image-2.5), transcription (MAI-Transcribe-1.5), and speech (MAI-Voice-2). All are trained from scratch on clean data without distillation from third parties. MAI also introduced **Microsoft Frontier Tuning**, enabling organizations to adapt models to their own workflows using reinforcement learning. A partnership with Mayo Clinic was announced to co-develop a frontier healthcare AI model. MAI's ultimate vision is "Humanist Superintelligence" — advanced AI designed to serve people, remain under human oversight, and never replace them.

### [Claude Fable 5 and Claude Mythos 5](https://www.anthropic.com/news/claude-fable-5-mythos-5)

![anthropic-claude-fable-5](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2Fb7055119423427c40a0e4d84054aed17682b50a2-2880x1620.png&w=3840&q=75)

Anthropic has launched Claude Fable 5, a _Mythos_-class AI model that is the most capable model they've ever made generally available, achieving state-of-the-art performance across software engineering, knowledge work, vision, and scientific research benchmarks. Due to its powerful capabilities, Fable 5 includes new safeguards that redirect sensitive queries on cybersecurity, biology, and chemistry to Claude Opus 4.8 instead. The company also released Claude Mythos 5, the same model with lifted safeguards for cyber defenders, deployed through Project Glasswing in collaboration with the US government.

### [Statement on the US government directive to suspend access to Fable 5 and Mythos 5](https://www.anthropic.com/news/fable-mythos-access)

Shortly after Anthropic released Claude Fable 5 and Claude Mythos 5, the US government issued an export control directive citing national security concerns on June 12th, ordering Anthropic to suspend all access to its _Fable 5_ and _Mythos 5_ models for _all users_, including foreign nationals. Anthropic is complying but disagrees with the decision, stating the government's evidence involves a narrow jailbreak revealing minor vulnerabilities already discoverable by other models. Anthropic argues its safeguards are robust and that applying this standard industry-wide would halt all frontier model deployments. The company believes this is a misunderstanding and is working to restore access as soon as possible.

### [MiniMax M3: Frontier Coding, 1M Context, Native Multimodality — All in One Model](https://www.minimax.io/blog/minimax-m3)

![minimax-sparse-attention](https://filecdn.minimax.chat/public/m3-msa-arch.png)

MiniMax M3 is MiniMax's latest frontier model combining three key capabilities: frontier-level coding/agentic performance, 1M-token context via MSA (MiniMax Sparse Attention), and native multimodality (image/video input and desktop operation). It surpasses GPT-5.5 and Gemini 3.1 Pro on SWE-Bench Pro, tops SVG-Bench and Claw-Eval, and excels at real-world tasks like independently reproducing research papers, optimizing CUDA kernels (achieving 9.4× speedup), and autonomously training models. Accompanying the release are MiniMax Code (an agent product), affordable Token Plans, and a tiered API. Model weights and a technical report have also been released.

### [Qwen3.7-Plus: Multimodal Agent Intelligence](https://qwen.ai/blog?id=qwen3.7-plus)

![qwen-3.7-plus](https://qianwen-res.oss-accelerate.aliyuncs.com/Qwen3.7/Figures/qwen3.7-plus-banner.png)

**Qwen3.7-Plus** is Alibaba's latest multimodal agent model that unifies vision and language into a versatile agent foundation. It operates as a "multimodal interactive hybrid agent," capable of perceiving real-world scenes, operating GUIs and CLIs, writing code from visual references, and completing end-to-end tasks. It excels in coding agent benchmarks (Terminal Bench 2.0, SWE-Verified), general-purpose agent tasks, STEM reasoning, and multimodal benchmarks including visual reasoning, search-augmented QA, video understanding, and autonomous driving perception.

### [GLM-5.2: Built for Long-Horizon Tasks](https://z.ai/blog/glm-5.2)

GLM-5.2 is Z.ai's latest flagship model designed for long-horizon tasks, featuring a solid 1M-token context window. It introduces _IndexShare_ architecture, reducing per-token computation by 2.9×, and offers flexible effort levels to balance performance and latency. The model excels in coding benchmarks, ranking as the highest-performing open-source model across long-horizon evaluations like FrontierSWE and SWE-Marathon. GLM-5.2 uses advanced RL training with anti-hacking mechanisms and is released under an MIT license.

## New Versions

![python-releases-chart](https://devguide.python.org/_static/release-cycle.svg)

### [Python 3.15.0 beta 3 is here!](https://blog.python.org/2026/06/python-3150-beta-3/)

This is the third of four planned beta releases of Python 3.15. Beta 4 is scheduled for 2026-07-18.

Beta 2 was also released earlier this month.

### [Python 3.14.6 and 3.13.14 are now available!](https://blog.python.org/2026/06/python-3146-31314/)

> Python 3.14.6 is the sixth maintenance release of 3.14, containing around 179 bugfixes, build improvements and documentation changes since 3.14.5. Python 3.13.14 is the fourteenth maintenance release of 3.13, containing around 240 bugfixes, build improvements and documentation changes since 3.13.13.

### [Pyodide 314.0 Release](https://blog.pyodide.org/posts/314-release/)

Pyodide 314.0 has been released, marking a major milestone for Python in the browser. The headline change is the acceptance of [PEP 783](https://peps.python.org/pep-0783/), enabling package maintainers to publish Pyodide wheels directly to PyPI instead of relying on the Pyodide team to build and host 300+ packages. The project adopted a new Python-version-based versioning scheme (314 = Python 3.14). This release ships Python 3.14.2 and Emscripten 5.0.3, restores several standard library modules, converts Pyodide to a native ES module, adds experimental Node.js socket support, and introduces JavaScript interop improvements including proper `bigint` roundtripping and enhanced array-like proxy support.

## Tutorials

### DeepLearning.ai's [Fast & Efficient LLM Inference with vLLM](https://www.deeplearning.ai/courses/fast-and-efficient-llm-inference-with-vllm) from Red Hat

> You'll run the full optimize-deploy-benchmark workflow on a real model: compressing an open-source Qwen model with LLM Compressor, serving it with vLLM, and benchmarking your deployment under realistic traffic using GuideLLM and lm-eval.

### DeepLearning.ai's [Voice for AI Agents and Applications](https://www.deeplearning.ai/courses/voice-for-ai-agents-and-applications) from Vocal Bridge

> Taught by Ashwyn Sharma, CEO and Co-Founder of Vocal Bridge (an AI Fund portfolio company), this course covers three practical integration patterns that meet you where you are: voice embedded in an application, voice layered onto an existing agent without touching its logic, and voice as a tool your LLM can call when it decides a conversation is the right modality.

### Microsoft's [Rust for Python Programmers](https://microsoft.github.io/RustTraining/python-book/)

> A comprehensive guide to learning Rust for developers with Python experience. This guide covers everything from basic syntax to advanced patterns, focusing on the conceptual shifts required when moving from a dynamically-typed, garbage-collected language to a statically-typed systems language with compile-time memory safety.

If you feel comfortable after learning this book and wish to move on, there's another book from Microsoft covering async Rust: [Async Rust: From Futures to Production](https://microsoft.github.io/RustTraining/async-book/).

## Articles

### [Free Threading internals: reference counting](https://vstinner.github.io/free-threading-reference-counting.html)

This article by Victor Stinner explores Python's free-threading reference counting challenges. Python uses reference counting (`Py_INCREF`/`Py_DECREF`) to track object lifetimes, requiring high efficiency. The "Gilectomy" project (2016-2018) initially used atomic operations but suffered severe performance issues — 18.9x slower on 7 cores due to lock contention. It later adopted buffered reference counting. The "nogil" project (2021-2026) solved this with _Biased Reference Counting_ (BRC), which recognizes that most objects are accessed by a single thread. BRC uses fast non-atomic operations for the owning thread and slower atomic operations for other threads, achieving better performance at the cost of increased implementation complexity.

### [Free Threading internals: deferred reference counting](https://vstinner.github.io/free-threading-deferred-reference-counting.html)

This article continues to explore CPython's Free Threading internals, focusing on techniques to reduce reference counting contention. **Immortal objects** ([PEP 683](https://peps.python.org/pep-0683/)) skip `Py_INCREF`/`Py_DECREF` entirely, eliminating contention for commonly used singletons like small integers, strings, and built-in types. **Deferred reference counting** avoids reference count adjustments altogether, relying on the tracing garbage collector for deallocation. **Stack references** — tagged pointer-sized values introduced in Python 3.13 — allow the bytecode evaluation loop to skip most `INCREF`/`DECREF` calls. Together with Biased Reference Counting, these techniques resolve reference count contention, enabling Python threads to scale efficiently across CPU cores.

### [Free Threading internals: PyMutex](https://vstinner.github.io/free-threading-pymutex.html)

This is the third part in the series regarding Free Threading, in which Victor Stinner discusses `PyMutex`, a lightweight 1-byte lock introduced in Python's free-threading implementation ([PEP 703](https://peps.python.org/pep-0703/)), which replaces the Global Interpreter Lock with per-object locks. Designed for efficiency, PyMutex uses only 2 bits and is based on WebKit's `WTF::Lock`. It provides fast, inlineable lock/unlock operations using atomic compare-exchange for uncontended cases. Benchmarks show PyMutex is 1.4x to 4x faster than the previous `PyThread_type_lock`. The implementation uses `_PyParkingLot` APIs (futex-like) and supports various locking flags. In practice, the critical section API is preferred over direct PyMutex usage to avoid deadlocks.

### [Python 3.14 garbage collection rigamarole](https://theconsensus.dev/p/2026/06/06/python-3-14-garbage-collection-rigamarole.html)

Python 3.14.0 replaced its traditional generational garbage collector with an incremental GC that reduced maximum pause times by scanning only part of the old generation per collection cycle. However, by doing less work each run, the incremental GC caused memory to accumulate in certain workloads — especially those generating cyclic garbage — leading to significantly higher peak memory usage and potential OOM kills. After users reported "memory pressure", the Python team reverted the change in Python 3.14.5. Notably, the GC change was not implemented as a switchable alternative and bypassed the standard PEP process, leaving users who benefited from it with no option to use it.

### [Two Python Scoping Bugs: A Lesson in Object Lifetimes](https://belderbos.dev/blog/two-scoping-bugs-object-lifetimes/)

This blog post illustrates two Python scoping bugs caused by mismatched object lifetimes. The first is **over-sharing**: a module-level SQLAlchemy engine shared across tests causes state leaks (e.g., auto-increment IDs carry over). The fix is creating a per-test engine using an in-memory SQLite database. The second is **under-sharing**: a FastAPI dependency that instantiates a new `FakeDataSource` per request gives each browser tab its own diverging simulator state instead of a shared reality. Fixes include `@lru_cache` or `app.state` for shared runtime state.

### [Down The Iterator Rabbit Hole](https://www.thepythoncodingstack.com/p/down-the-iterator-rabbit-hole-python)

This article explores Python iterator chains and how consuming values from one iterator affects others in the chain. Iterators don't store data — they create lightweight streams that fetch from the original source on demand. When you chain iterators (e.g., a list → first_iter → second_iter → third_iter), calling `next()` on any iterator in the chain consumes values that propagate through all dependent iterators. The author demonstrates how this can cause unexpected behavior, since iterators are one-way streams. The key takeaway: when building iterator chains, only use the final iterator to avoid confusion. Independent iterators from the same source, however, remain unaffected by each other.

### [Choosing a Python task queue library in 2026](https://aleksul.space/posts/choosing-python-task-queue-library/)

This article compares five Python task queue libraries in 2026: Celery, Dramatiq, FastStream, Taskiq, and Repid. It evaluates them across broker support, async vs. sync capabilities, throughput benchmarks for both I/O-bound and CPU-bound workloads, and features like dependency injection, result backends, AsyncAPI integration, and retry handling. The author (Repid's creator) finds that async-native libraries like Repid, FastStream, and Taskiq outperform sync-first Celery and Dramatiq in I/O-heavy scenarios, while differences shrink for CPU-bound tasks. Recommendations: Celery for the largest ecosystem, FastStream for stream-processing patterns, and Repid for high-throughput asyncio-native workloads.

### [How and why to run modified Python code using the ast module](https://pydantic.dev/articles/eval-type-backport)

This Pydantic blog demonstrates how to use Python's `ast` module to parse, transform, and execute modified Python code at runtime. Using the `eval-type-backport` library as an example, it shows how to convert newer type syntax like `X | Y` into `typing.Union[X, Y]` for older Python versions by manipulating abstract syntax trees with `ast.NodeTransformer`. The author shares how mastering AST metaprogramming helped him land jobs at Grist and Pydantic, and argues this skill is increasingly valuable in the AI era since it's harder to automate and essential for inspecting and controlling code produced by AI agents.

### [Why I wrote PEP 832 -- virtual environment discovery](https://snarky.ca/why-i-wrote-pep-832-virtual-environment-discovery/)

Brett Cannon proposes PEP 832 which addresses the challenge of virtual environment discovery for tools like VS Code. The problem: editors struggle to know which workflow tool (Poetry, uv, Hatch, etc.) a project uses and where environments are stored, making it difficult to run code and analyze dependencies. Proposed solutions include using .venv directories for local discovery, a .python-envs file listing environment paths, and a [workflow] table in pyproject.toml with a workflow server protocol (WSP) for tool communication. The goal is creating a tool-agnostic standard that simplifies environment setup across all editors, not just VS Code.

### [Vulnerability and malware checks in uv](https://astral.sh/blog/uv-audit)

Astral announces two new security features for **uv**: `uv audit`, a native command that scans dependencies for known vulnerabilities and deprecated packages — serving as a 4x–10x faster alternative to `pip-audit` — and a lightweight malware check integrated into sync operations (`uv add`, `uv sync`, etc.) that queries [OSV](https://osv.dev/) for known malicious packages, blocking installation before harmful code executes. Both features are currently in preview. The post explains the growing importance of supply chain security, distinguishes malware remediation from ordinary vulnerability patching, and outlines future plans including tighter tooling integration, improved finding precision, and support for additional vulnerability backends and packaging formats.

### [Give your agent its own computer](https://www.langchain.com/blog/give-your-ai-agent-its-own-computer)

LangChain's _LangSmith Sandboxes_ solve a critical problem: AI agents need real computers to execute code, but giving them access to your infrastructure is dangerous. Containers aren't secure enough for untrusted, model-generated code. LangSmith Sandboxes provide hardware-virtualized microVMs—each agent gets its own isolated computer with filesystem, shell, package manager, and persistent state. Features include instant startup, snapshots for forking sessions, pre-warmed blueprints, and secure credential injection. This enables production-ready coding assistants, CI agents, data pipelines, and RL training environments that can scale from zero to thousands of instances.

### [A Practical Guide to Becoming an AI-Native Engineer](https://blog.bytebytego.com/p/a-practical-guide-to-becoming-an)

This ByteByteGo article presents a practical guide for engineers transitioning to AI-native engineering. Rather than replacing engineers, AI shifts their role from code writers to orchestrators who command AI agents for 100x output. The guide outlines four core practices: context engineering (curating project-specific AI inputs), specification-driven development, critical verification (since ~45% of AI code contains security flaws), and problem decomposition. It recommends spending 40% of time on context-setting, 20% on generation, and 40% on verification. The article also details a three-phase individual transformation journey, team cultural foundations, an Agentic Development Life Cycle, and essential security guardrails against emerging AI-code threats.

### [Beyond code generation: rethinking engineering productivity in the age of AI agents](https://dropbox.tech/culture/beyond-code-generation-rethinking-engineering-productivity-in-the-age-of-ai-agents)

Dropbox's blog post argues that AI coding tools, while boosting code generation, merely shift bottlenecks downstream — into code review, CI, validation, release coordination, and production operations. Their internal agent platform, Nova, now generates ~1 in 12 pull requests, handling tasks like migrations and bug investigation within guardrails. The key insight: AI doesn't eliminate bottlenecks but relocates them. Dropbox rethinks productivity measurement through a four-stage model — Fuel, Adoption, Output, and Impact — emphasizing customer value over raw PR throughput. Engineers' roles evolve toward defining intent and reviewing outputs. Ultimately, success depends not on having the best models but on building the best systems around them.

### [Don't rely on instructions, use Agent Hooks to enforce guardrails](https://zarar.dev/agent-hooks-deterministic-guardrails-for-ai-generated-code/)

This blog post demonstrates "Agent Hooks" as deterministic guardrails for AI coding agents like Claude Code, arguing that text-based instructions (e.g., in CLAUDE.md) are unreliable since agents often ignore them. Unlike git hooks that run after code is written, agent hooks intercept the agent's workflow in real time. The author demonstrates two practical hooks: a **PreToolUse** hook that blocks raw `<input>` tags, forcing use of custom design components, and a **Stop** hook that prevents the agent from declaring completion until a design-system ratchet test passes. Both provide guaranteed, deterministic enforcement that prompt-based instructions cannot.

### [How to Keep Your Developer Instincts When AI Writes the Code](https://belderbos.dev/blog/dont-delegate-the-friction/)

The author argues that while AI tools promise to eliminate friction in software development, this friction is essential for building engineering intuition and judgment. He categorizes friction into three types: worth deleting (boilerplate), worth keeping (debugging, design decisions), and worth seeking out (deliberate practice). To avoid losing critical thinking skills, developers should adopt deliberate practices like forming expectations before prompting, carefully reviewing AI diffs, and coding without agents weekly. This routine is especially crucial for junior developers to build foundational skills and maintain the craft of engineering in an AI-driven era.

### [The Speed of Prototyping in the Age of AI](https://darylcecile.net/notes/speed-of-prototyping-age-of-ai)

The author reflects on how AI coding agents have transformed his prototyping workflow. Previously, his bottleneck was the time needed to scaffold projects; now, AI removes that friction, enabling him to ship far more functional prototypes—citing projects like the Sakoa programming language, the Kato notation format, and others. He estimates roughly 4x faster output, but the bigger shift is qualitative: he now thinks at a higher abstraction level, focusing on system boundaries and specifications rather than line-by-line implementation. This skill — clearly delegating work — transfers to managing people too. However, he deliberately carves out time for manual coding to stay sharp, and remains cautious about AI's broader environmental, financial, and social implications.

### [Domain Expertise Has Always Been the Real Moat](https://www.brethorsting.com/blog/2026/05/domain-expertise-has-always-been-the-real-moat/)

The article argues that domain expertise, not coding ability, has always been the true competitive moat in software development. Agentic AI has severed the link between understanding a domain and producing code, making code generation cheap while domain knowledge remains scarce. A domain expert with no coding background can now be remarkably effective with AI tools because they can verify whether outputs are correct. Conversely, a skilled generalist engineer lacking domain knowledge cannot distinguish plausible-but-wrong answers from right ones. The author advises experienced engineers to invest in deeply learning a real domain — whether regulatory, industrial, or scientific — as that verified domain model is the one thing AI cannot supply and is now the most valuable asset.

### [Software Is Not A Single-Player Game](https://www.davidpoll.com/2026/06/software-is-not-a-single-player-game/)

This blog post argues that software development is inherently a multiplayer game, not a solo endeavor. The author contends that code review — not design docs — is where the most consequential engineering judgments are made. As AI makes producing code dramatically cheaper, the primary artifact of collaboration is shifting from abstract documents to real, working changes. Teams can now reason about actual implementations rather than proxies, making review more central, not less. While some decisions still require upfront planning, that boundary is shrinking. The author traces this collaborative pattern back to Linux's early patch-review culture and concludes that building lasting software has always depended on groups exercising shared judgment together over concrete code changes.

### [AI’s brave new world of technical debt](https://www.infoworld.com/article/4178964/ais-brave-new-world-of-technical-debt.html)

This article argues that AI agents are creating a dangerous new form of technical debt in software development. Agents automate tasks by adding layers of delegation — MCP servers, prompts, and auto-managed dependencies — but each layer becomes a dependency and a security risk. Studies show AI agents select vulnerable package versions more often than humans and even hallucinate non-existent dependencies. While tools like Anthropic's Claude Mythos can cheaply discover zero-day exploits in old code, the article urges teams to adopt disciplined practices: minimize their attack surface, version-control prompts, and treat all AI integrations as production dependencies requiring rigorous review and governance.

### [Vibe Coder vs Software Engineer](https://yusufaytas.com/vibe-coder-vs-software-engineer)

This article distinguishes between "vibe coders" and "software engineers" in the age of AI-assisted development. A vibe coder focuses on rapid prototyping and measuring time to a working demo, while a software engineer prioritizes "time to safe merge" — encompassing code review, testing, ownership, rollback, and long-term maintainability. The author argues that AI-generated code must meet the same standards as hand-written code, and that engineers must fully own and understand what they submit, since AI cannot take accountability. Vibe coding suits discovery and ideation, but production delivery demands engineering discipline, bounded tasks, and human judgment built through apprenticeship and system knowledge.

## Podcasts

### 🐍 RealPython Podcast

- [Episode 298: Reducing the Size of Python Docker Containers](https://realpython.com/podcasts/rpp/298/)
- [Episode 299: EuroPython 2026: Celebrating 25 Years](https://realpython.com/podcasts/rpp/299/)
- [Episode 300: Maintaining Your Python Developer Instincts While Using LLM Tools](https://realpython.com/podcasts/rpp/300/)

### 🍕 Python Bytes Podcast

- [#482 Mr. Beast's episode](https://pythonbytes.fm/episodes/show/482/mr.-beasts-episode)
- [#483 Thanks Brian](https://pythonbytes.fm/episodes/show/483/thanks-brian)
- [#484 All our tools](https://pythonbytes.fm/episodes/show/484/all-our-tools)
- [#485 Creating memories](https://pythonbytes.fm/episodes/show/485/creating-memories)

### 📣 Talk Python to me

- [#551: Stroll Down Startup Lane - 2026](https://talkpython.fm/episodes/show/551/stroll-down-startup-lane-2026)
- [#552: Astral joins OpenAI](https://talkpython.fm/episodes/show/552/astral-joins-openai)
- [#553: All of our tools](https://talkpython.fm/episodes/show/553/all-of-our-tools)

## Repositories

### [LvcidPsyche/auto-browser](https://github.com/LvcidPsyche/auto-browser) (MIT)

> Auto Browser is an MCP-native browser control plane for authorized workflows. It gives MCP clients, LLM agents, and operators a shared Playwright browser with human takeover, reusable auth profiles, approvals, audit trails, and local-first deployment.

### [NVIDIA/SkillSpector](https://github.com/NVIDIA/SkillSpector) (Apache-2.0)

> Security scanner for AI agent skills. Detect vulnerabilities, malicious patterns, and security risks before installing agent skills.

### [microsoft/coreutils](https://github.com/microsoft/coreutils) (MIT)

> A Microsoft-maintained build of `uutils/coreutils`, `findutils`, and `grep` packaged as a single multi-call binary for Windows. The goal is to make moving between Linux, macOS, WSL, containers, and Windows frictionless.

## Have time for some fun?

### Sony's State of Play (2026-6-2)

![state-of-play-2026-6](https://blog.playstation.com/tachyon/2026/06/35782cc3ce6947f374ee128c62052a655a8cdb64-scaled.jpg?resize=1088%2C612&crop_strategy=smart&zoom=1)

- God of War: Laufey, the title from Santa Monica focusing on Kratos' wife, is coming to PS5 with release date unknown.
- Phantom Blade Zero, the fast-paced action RPG from S-Game, is delayed to October 29th, 2026 with full trailer and pre-order available soon in summer.
- Control Resonant, the sequel to Control (2019), is coming September 24th, 2026.
- Tomb Raider: Legacy of Atlantis, another "remake" of the first Tomb Raider game, is coming February 12th, 2027.
- Onimusha: Way of the Sword from Capcom launches this September, with a playable demo available right now.
- Ace Combat 8: Wings of Theve from Bandai Namco is coming this October.
- Until Dawn 2 is announced, "featuring a brand new cast, a whole new world to explore, and gut-wrenching decisions".

### Summer Game Fest

![summer-game-fest-2026](https://cdn.mos.cms.futurecdn.net/pAgh4TNRRiPZKoPYGrHptS-1200-80.jpg.webp)

- Resident Evil Veronica, the remake of Resident Evil: Code: Veronica (2000) from Capcom, follows Claire Redfield searching for her brother Chris and is coming in 2027 to PS5, Xbox Series X|S, Nintendo Switch 2, and PC.
- Final Fantasy VII Revelation, the third and final chapter in the FF7 Remake trilogy from Square Enix, adds Vincent and Cid as playable party members with a new Job Class system, and launches Spring 2027 on PS5, Xbox Series X|S, PC, and Nintendo Switch 2 with day-one multiplatform release.
- Stellar Blade: Blood Rain, the sequel to Stellar Blade from Shift Up, introduces new protagonist Evie and continues the story beyond the first game, with Shift Up self-publishing this time and no platforms or release date confirmed yet.
- Guild Wars 3 from ArenaNet, the first new entry in the franchise since 2012, is set over a thousand years before the original Guild Wars in the land of Orr, featuring momentum-based movement and coming to PC and PS5 (the series' first console release) with beta in Fall 2027.
- Trine 6: Together in Time from Frozenbyte, featuring two new playable characters Moira and Adrius alongside the classic trio, supports 1–4 player co-op and launches September 17, 2026 on PC, Nintendo Switch, Nintendo Switch 2, PS5, and Xbox Series X|S.
- Alien: Isolation 2 from Creative Assembly and SEGA, set on a remote storm-ravaged colony world at Kurosaki Station with both interior and exterior environments, is coming in 2027 to PS5, Xbox Series X|S, Nintendo Switch 2, and PC.
- Blood Message from 24 Entertainment and NetEase, the publisher's first AAA single-player title, is a cinematic action-adventure set in 848 AD Tang Dynasty China where a nameless messenger and his son embark on a perilous 1,000-mile odyssey to Chang'an, coming to PC and consoles with no release date yet.
- Hitman Classic Trilogy Remastered from Saber Interactive and IO Interactive, collecting Hitman: Codename 47, Hitman 2: Silent Assassin, and Hitman: Contracts with upgraded visuals and a graphics toggle, is coming to PC, PS5, and Xbox Series X|S in 2027.

---

As we wrap up this journey together, I want to take a moment to express my gratitude for your reading. If you've enjoyed this issue and would like to help sustain this blog, please consider [starring this blog on github](https://github.com/blueberry-py/blog/stargazers), it would be great motivation for me to keep updating!

Alright, that concludes the June Edition of "This Month for Pythonistas". Thank you again for reading my post and I hope you enjoy it or find something useful. Happy coding and see you in July! 👋
