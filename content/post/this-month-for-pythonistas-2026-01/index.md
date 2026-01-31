+++
title = "This Month for Pythonistas - January 2026"
description = "Pandas 3.0, Anthropic Investment, EuroPython 2026, Agentic AI and more fun stuff"
slug = "this-month-for-pythonistas-2026-01"
date = 2026-01-31T12:00:00+08:00
authors = ["Zeyang Lin"]
tags = ["python", "news", "podcast", "ai", "agentic", "llm", "linux"]
categories = ["python"]
series = ["this month for pythonistas"]
keywords = ["python", "news", "AI", "2026", "llm", "openai", "anthropic"]
image = "title.jpg"
draft = false
+++

```python
from datetime import date

print(date.today().year, date.today().month)
# 2026 1
```

![issue-2026-01](splash.jpg)

Welcome back Pythonistas and Happy New Year 🎉! This is the first issue of 2026, and I'm excited to kick off another year of "This Month for Pythonistas" with curated Python news, tutorials, articles, podcasts and community highlights. And as a "special" issue it would cover also retrospectives of 2025 and expectations for 2026.

Before we continue, please note that this blog is synced across the following platforms:

- [Github Pages](https://blueberry-py.github.io/blog/post/this-month-for-pythonistas-2026-01/)
- [Netlify](https://blueberrypy.netlify.app/post/this-month-for-pythonistas-2026-01/)
- [Render](https://blueberrypy.onrender.com/post/this-month-for-pythonistas-2026-01/)
- [Vercel](https://blueberrypy-blog.vercel.app/post/this-month-for-pythonistas-2026-01/)

Ready? Let's get started!

---

## Events & Social

### EuroPython 2026 Location Revealed

EuroPython 2026 will take place in Kraków, Poland from 13th to 19th July, 2026. The CFP (Call for Proposals) is open now until 15th of February. This is also the 25th anniversary of EuroPython. Learn more [here](https://ep2026.europython.eu/).

### [Anthropic invests $1.5 million in the Python Software Foundation and open source security](https://pyfound.blogspot.com/2025/12/anthropic-invests-in-python.html)

Anthropic invests $1.5M over two years in the Python Software Foundation (PSF). Funds will enhance Python ecosystem security (e.g., automated PyPI package reviews to ward off supply-chain attacks) and sustain the PSF's core work supporting CPython, its global community and infrastructure.

### [2026 Python Developers Survey](https://surveys.jetbrains.com/s3/python-developers-survey-2026)

This is the nineth official Developer Survey by PSF, in partnership with JetBrains. Completing the survey contributes to understanding the state of Python development and the Python community.

### [PEP 686 - Make UTF-8 mode default](https://peps.python.org/pep-0686/)

PEP 686 is _Final_. Starting from Python 3.15, Python will use UTF-8 mode by default in text encoding. This change represents a significant step toward modernizing Python's text handling while maintaining backward compatibility through opt-out mechanisms and warnings.

## New Versions

### Python 3.15.0 alpha 5

![python-release-cycle](https://devguide.python.org/_static/release-cycle.svg)

Here comes the [fifth](https://www.python.org/downloads/release/python-3150a5/) of ~~seven~~ eight planned alpha releases of Python 3.15, just a couple of days after alpha 4 was released.

### Pandas 3.0.0

Pandas 3.0.0 is the long-awaited major release which brings significant improvements to pandas, but also features some potentially breaking changes. The release notes can be found [here](https://pandas.pydata.org/docs/whatsnew/v3.0.0.html).

### FastMCP 3.0.0 beta 1

FastMCP 3.0 introduces a redesigned framework for building Model Context Protocol servers. Built around three primitives — Components, Providers, and Transforms — it transforms from simple tool servers into dynamic "Context Applications" that intelligently manage information for AI agents. Read more at [What’s New in FastMCP 3.0](https://www.jlowin.dev/blog/fastmcp-3-whats-new).

## Tutorials

### Deeplearning.ai's [Document AI: From OCR to Agentic Doc Extraction](https://www.deeplearning.ai/short-courses/document-ai-from-ocr-to-agentic-doc-extraction/) from LandingAI

> This course shows you how to build agentic workflows that process documents the way humans do: breaking them into parts, examining each piece carefully, and extracting information through multiple iterations.

### Deeplearning.ai's [Gemini CLI: Code & Create with an Open-Source Agent](https://www.deeplearning.ai/short-courses/gemini-cli-code-and-create-with-an-open-source-agent/) from Google

> In this course, you'll apply Gemini CLI to software development and creative tasks by building features for an AI conference. You'll develop a website session catalog, create a data dashboard combining local and cloud data sources, and generate social media content from recordings. You'll master context management, integrate MCP servers, and orchestrate across multiple services with Gemini CLI extensions.

### RealPython's [How to Build a Personal Python Learning Roadmap](https://realpython.com/build-python-learning-roadmap/)

> This tutorial will help you craft a personal Python learning roadmap so you can track your progress and stay accountable to your goals and timeline.

## Articles

### [Python Numbers Every Programmer Should Know](https://mkennedy.codes/posts/python-numbers-every-programmer-should-know/)

This article from Michael Kennedy outlines key Python performance and memory metrics for developers. Latency benchmarks include fast attribute reads (14 ns), dict lookups (22 ns), and FastAPI's quick JSON responses (8.63 µs). Memory usage notes are striking: small ints/floats take 28/24 bytes, empty Python processes use ~15.7 MB, and slots-class instances (5 attributes) consume 212 bytes (vs 694 bytes for regular classes). Other stats highlight list append speed (28.7 ns) and SQLite query efficiency. These numbers aid in optimizing performance-sensitive algorithms.

### [Recent optimizations in Python's Reference Counting](https://rushter.com/blog/python-refcount/)

The article discusses Python 3.14+ optimizations for reference counting in CPython. It introduces a new bytecode instruction `LOAD_FAST_BORROW` that avoids incrementing reference counts when loading local variables in hot loops, reducing memory management overhead. This optimization uses static lifetime analysis to ensure safety - borrowed references must be consumed within one code block, used for simple operations, and the source value can't change during execution. The optimization is similar to Rust's lifetime analysis and immutable borrowing concept. Additionally, there are ongoing efforts to eliminate redundant reference counting in JIT compiled code, though this is experimental and disabled by default.

### [The Hidden Cost of Python Dictionaries (And 3 Safer Alternatives)](https://codecut.ai/hidden-cost-python-dictionaries-safer-alternatives/)

This article explains the hidden dangers of Python dictionaries: typos in keys cause silent bugs, and type errors lead to data corruption. It presents three safer alternatives with increasing protection:

1. **NamedTuple** – Fixed structure with IDE autocomplete; immutable
2. **dataclass** – Mutable fields, safe defaults, custom validation via `__post_init__`
3. **Pydantic** – Runtime type enforcement, automatic type coercion, built-in constraints

The author recommends using dicts for quick prototyping and Pydantic for production code where safety matters.

### [Implicit string concatenation](https://www.pythonmorsels.com/implicit-string-concatenation/)

Python automatically concatenates string literals placed next to each other without any operator - called "implicit string concatenation". This feature is mainly used for breaking long strings across multiple lines using parentheses for implicit line continuation. However, it can cause bugs when commas are accidentally omitted in lists or function calls. The article recommends avoiding this feature in favor of explicit concatenation with `+` or using multiline strings with `textwrap.dedent()`, and suggests using linters to prevent accidental usage.

### [What async really means for your python web app?](https://hackeryarn.com/post/async-python-benchmarks/)

Python async web benchmarks reveal surprising results: synchronous Django with database connection pooling consistently outperforms async alternatives. Testing static content, database reads, and contentious writes shows that FastAPI excels only when it's the sole bottleneck. For typical web services that directly access databases, the database — not the web service — is usually the bottleneck. Async Django shows 10x slower performance than sync Django for static content, while database pooling eliminates sync latency issues without code changes. The article concludes that for most services directly connecting to databases, optimized sync configurations deliver better performance than async alternatives.

### [Asyncio is neither fast nor slow](https://blog.changs.co.uk/asyncio-is-neither-fast-nor-slow.html)

This article critiques misleading benchmarks comparing Python's async vs sync web frameworks. The author discovered that performance discrepancies often stem from implementation bugs (like SQLAlchemy fetching all results) rather than `asyncio` itself. After proper configuration, async and sync perform similarly.

The key takeaway: `asyncio`'s advantage isn't speed but resource efficiency — achieving comparable performance without extra threads/processes. The author advises against taking benchmarks at face value and encourages testing for your specific requirements. Performance depends more on implementation details and connection pools than the async/sync paradigm itself.

### [How to Type Hint a Decorator in Python](https://www.blog.pythonlibrary.org/2026/01/14/how-to-type-hint-a-decorator-in-python/)

This article explains how to properly type hint Python decorators. Using `TypeVar` causes mypy errors. Instead, use `ParamSpec` with `TypeVar` to capture generic parameter and return types. For Python 3.12+, **PEP 695** offers simplified syntax using square brackets (e.g., `def info[**P, R]`) to implicitly declare `ParameterSpec`. Both approaches maintain type safety for decorated functions while preserving their original signatures.

### [Static Protocols in Python: Behaviour Over Inheritance](https://patrickm.de/static-protocols-in-python/)

This article explains static protocols in Python - a way to check object behavior rather than inheritance. Protocols enable structural typing where objects are validated by having required methods/attributes, not by class hierarchy. The author contrasts this with traditional "goose typing" using `isinstance()`, showing how protocols reduce coupling and enable static type checking. A real-world ML example demonstrates using a Predictable protocol for models with predict_top_k methods. Static protocols (Python 3.8+) provide type safety while maintaining flexibility, allowing different coding styles to work together without complex inheritance trees. They catch errors at development time rather than runtime.

### [Unit testing your code's performance, part 1: Big-O scaling](https://pythonspeed.com/articles/big-o-tests/)

This article explains how to unit test your Python code's performance by testing Big-O scalability. It introduces the `bigO` library to empirically determine and test algorithm complexity. The author demonstrates how to track function performance, generate reports showing time/memory bounds (like O(n) or O(n²)), and write automated tests that fail when scalability changes. This approach catches critical performance regressions where algorithms become less efficient, which is especially important for processing large datasets. The method is presented as a starting point for performance testing, with plans to cover additional efficiency testing in future articles.

### [How we made Python's packaging library 3x faster](https://iscinumpy.dev/post/packaging-faster/)

Python's `packaging` library was optimized to achieve 3x faster performance in version 26.0rc1. Key improvements include: Version construction became 2x faster, SpecifierSet operations up to 3x faster, and some operations up to 5x faster. Optimizations involved removing redundant `NamedTuple` structures, eliminating duplicate `Version` creation, using faster regex patterns, replacing `singledispatch` with `if` statements, and implementing better caching. The team used Python 3.15's statistical profiler and PyPI metadata to measure performance. These changes significantly speed up dependency resolution for tools like pip, which creates millions of `Version` objects during package installation.

### [WebAssembly as a Python extension platform](https://nullprogram.com/blog/2026/01/01/)

This blog post explores using WebAssembly (Wasm) as a Python extension platform. The author discusses two main use cases: (1) replacing Python functions with faster C-compiled-to-Wasm code for 10x performance improvements, and (2) embedding secure crypto libraries like Monocypher in Python applications. Key challenges include handling pointers as unsigned integers, managing memory allocation between host and guest, and working around wasmtime-py limitations.

The author provides detailed examples showing how to create Python bindings for Wasm modules while avoiding common pitfalls like negative pointer arithmetic. Despite rough edges like large binary sizes and API instability, this approach enables distributing architecture-independent Python packages without requiring native toolchains.

### [The Emperor Has No Clothes: How to Code Claude Code in 200 Lines of Code](https://www.mihaileric.com/The-Emperor-Has-No-Clothes/)

This article reveals that AI coding assistants like Claude Code aren't magic — they're built on a simple 200-line Python architecture. The core concept is a conversation loop between an LLM and a toolbox of three essential functions: read files, list files, and edit files.

The process works by having the LLM decide when to use tools, sending structured tool calls, executing them locally, and feeding results back. The LLM never directly touches the filesystem—it just requests actions that your code performs.

While production tools add features like better error handling, streaming, and more tools, the fundamental architecture remains this simple request-execute-respond cycle. The author demonstrates how anyone can build a functional coding agent using this straightforward pattern, proving that sophisticated AI coding tools are built on surprisingly simple foundations.

### [The Future of Software Development is Software Developers](https://codemanship.wordpress.com/2025/11/25/the-future-of-software-development-is-software-developers/)

The article argues that despite claims that AI (especially LLMs) will replace software developers, history shows new technologies don't reduce programming needs but increase demand. The hard part of programming is translating human ambiguity into precise code, which AI struggles with. LLMs often slow development and produce unreliable code. While AI may assist in prototyping or inline completion, developers will remain essential. The current AI hype will likely fade, and businesses should hire and train developers now. The future will see AI as a tool, not a replacement, with more demand for skilled programmers.

### [Agent-native Architectures](https://every.to/guides/agent-native)

This guide outlines a revolutionary approach to software development where AI agents are first-class citizens, not just add-ons. The core principle: build applications where features aren't code you write, but outcomes you describe that agents achieve using tools in loops.

Five key principles govern this architecture: **Parity** (agents can do everything users can via UI), **Granularity** (atomic tools enable flexible composition), **Composability** (new features emerge from prompt combinations), **Emergent capability** (agents accomplish unanticipated tasks), and **Improvement over time** (apps get better through context and prompt refinement).

The approach shifts from traditional feature-by-feature development to creating a capable foundation and observing what users request, then formalizing patterns. Files serve as the universal interface due to their transparency and agent-friendliness.

This architecture enables applications that are simple to start but endlessly powerful, discover latent user demand organically, and improve without code updates. The ultimate test: can your agent accomplish domain-specific outcomes you never explicitly built features for?

### [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)

This article explains how to effectively evaluate AI agents, whose autonomy and flexibility make them harder to assess than traditional models. Good evaluations prevent reactive debugging cycles by catching issues before they affect users.

The authors outline a comprehensive evaluation framework with key components: tasks (individual tests), trials (multiple attempts), graders (scoring logic), transcripts (complete interaction records), and evaluation harnesses (infrastructure). They recommend combining three grader types: code-based (fast, objective), model-based (flexible, nuanced), and human (gold standard validation).

Different agent types require tailored approaches: coding agents use unit tests and static analysis; conversational agents need multidimensional scoring including interaction quality; research agents require groundedness and coverage checks; computer use agents need outcome verification in real environments.

The article provides a practical roadmap: start early with 20-50 real-world tasks, build robust harnesses with stable environments, design thoughtful graders, and maintain long-term through transcript review. When combined with production monitoring, A/B testing, and user feedback, evaluations create a comprehensive quality system that accelerates development rather than slowing it down.

### How to build self-improving coding agents

#### [Part 1](https://ericmjl.github.io/blog/2026/1/17/how-to-build-self-improving-coding-agents-part-1/)

To build self-improving coding agents without changing model weights, the author proposes modifying the agent's environment using two key levers: **AGENTS.md** as repository memory and **skills** as reusable playbooks.

`AGENTS.md` helps agents navigate codebases quickly through code maps and encodes repo-specific corrections and norms, preventing repeated mistakes. When agents discover mismatches or receive user feedback, they should update the documentation automatically, creating a durable feedback loop. This operational approach reduces repetitive guidance and makes agents improvement without constant babysitting.

#### [Part 2](https://ericmjl.github.io/blog/2026/1/18/how-to-build-self-improving-coding-agents-part-2/)

The second explores "skills" for coding agents—reusable prompt folders (`SKILL.md` + assets) that streamline repetitive tasks. Skills explicitly define when to use them, steps to follow, and expected outputs. Examples include GitHub debugging, release announcements, ML model reports, and domain-specific troubleshooting. Skills evolve through iteration and feedback, making them easier to refine than starting from scratch. While distribution is less mature than MCP servers, tools like OpenSkills now help with installation and updates.

#### [Part 3](https://ericmjl.github.io/blog/2026/1/19/how-to-build-self-improving-coding-agents-part-3/)

Part 3 combines repo memory (`AGENTS.md`) and skills into a practice with a maturity model: ad hoc prompting → repo-local memory → global personal skills → shared team skills. Watch agent traces to identify patterns—repo-specific go into `AGENTS.md`, reusable workflows become skills. Markdown becomes executable when agents turn instructions into tool calls. The key distinction: `AGENTS.md` for how a repo works; skills for repeatable, on-demand procedures. The meta skill is metacognition—watching yourself work to systematize repeated tasks. Coding agents are evolving beyond coding tools into general-purpose teammates across all intellectual work.

### [AI writes code faster. Your job is still to prove it works.](https://addyosmani.com/blog/code-review-ai/)

AI accelerates coding but shifts the burden from writing to proving code works. By 2026, 30% of senior developers ship mostly AI-generated code, which has 75% more logic errors. Solo developers rely on automated testing as safety nets, while teams use human review for security, context, and accountability. AI generates 45% of code with security flaws and increases PR volume by 18%, creating review bottlenecks. The new "PR contract" requires authors to provide evidence of working code through tests and manual verification. AI serves as first-pass reviewer, but human judgment remains essential for quality control and responsibility.

### [AI Makes Exploration Cheap, Not Decisions Easy](https://www.nucleate.dev/blog/ai-makes-exploration-cheap-not-decisions-easy)

AI makes exploration cheaper, not decisions easier. The key insight is that AI accelerates the exploration phase of creative work, allowing designers and developers to try more options in less time, but it doesn't eliminate the need for human judgment.

Great work requires "wasted work" - trying multiple approaches that don't work to discover what does. AI compresses this process from days/weeks to hours, enabling rapid prototyping and experimentation. However, AI cannot make final decisions because it lacks context about users, brand, constraints, and past experiences.

The human role shifts to Director-Curator-Craftsman: setting vision, selecting from AI-generated abundance, and applying taste and judgment. The real benefit is faster learning - each failed attempt teaches something valuable about the problem.

The trap is letting AI make decisions for you. Instead, use AI to multiply exploration, then apply critical thinking to choose the best option. Your value lies in knowing what should get built and why, not in the mechanical production work.

### [Top Python libraries of 2025](https://tryolabs.com/blog/top-python-libraries-2025)

Tryolabs' 11th 2025 top Python libraries list balances LLM-focused tools and broader ecosystem innovations (performance, security, dev experience). It includes 10 top general picks (e.g., Rust-powered `ty` type checker) and 10 AI/ML/Data tools, plus runners-up for each category to reflect real-world AI system building.

### [PyPI in 2025: A Year in Review](https://blog.pypi.org/posts/2025-12-31-pypi-2025-in-review/)

The PyPI 2025 Year in Review highlights major growth and security improvements. Key statistics: over 3.9 million new files, 130,000 new projects, 1.92 exabytes transferred. Security enhancements included improved 2FA (52% of active users), trusted publishing (50,000+ projects), email verification, phishing protection, and zipfile security. Organizations grew to 7,742 created with 9,059 projects managed. The team processed 2,000+ malware reports (66% resolved in 4 hours), handled 2,221 account recoveries, and resolved 500+ name retention requests. New features included project archiving, new Terms of Service, and enhanced incident reporting transparency.

### [2025: The year in LLMs](https://simonwillison.net/2025/Dec/31/the-year-in-llms/)

2025 was a transformative year for LLMs, with key trends including "reasoning" as a dominant feature—models like OpenAI's o3 and o4-mini excelled in multi-step problem-solving and tool integration. Agents emerged critical, particularly coding agents (e.g., Claude Code, Codex CLI) handling asynchronous tasks, generating $1B in run-rate revenue. Chinese open-weight models (GLM-4.7, Qwen3) outperformed competitors, ranking highly. Prompt-driven image editing tools (GPT-4o, Google's Nano Banana) drove viral adoption. Meta's Llama 4 underperformed, and long tasks advanced, with models completing hours-long assignments. Agents streamlined search, and async coding tools became mainstream. Leadership shifted, with OpenAI and Google innovating, while Chinese models challenged Western dominance.

### [Five Takes to End 2025](https://parkerortolani.blog/2025/12/30/five-takes-to-end.html)

Parker Ortolani's year-end tech analysis covers five key takes:

- OpenAI risks distraction by over-productizing instead of focusing on core AI models;
- Google's dominance is resurgent with successful AI initiatives;
- departing Apple designer Alan Dye deserves more credit for his influential 12-year tenure;
- software-on-demand through AI coding tools is disrupting traditional app development;
- while Apple delivered excellent hardware in 2025, they must launch a spectacular AI Siri in 2026 after delays.

### [Software Engineering in 2026](https://benjamincongdon.me/blog/2025/12/29/Software-Engineering-in-2026/)

The article explores how 2025's AI coding advances will reshape software engineering in 2026. LLM tools have significantly reduced the marginal cost of producing quality code, shifting bottlenecks elsewhere. Key changes expected: infrastructure abstractions become more valuable, CI infrastructure needs higher quality, human-guided abstractions grow crucial for preventing technical debt, code review must evolve to focus on high-impact decisions, and project timeline estimates will increase in variance. While building code becomes cheaper, operating systems and high-value projects remain less LLM-amenable, requiring deeper human expertise.

### [17 predictions for AI in 2026](https://www.understandingai.org/p/17-predictions-for-ai-in-2026)

This article presents 17 AI predictions from experts with confidence scores, focusing on technology advancement and economic impact. Key predictions include Big Tech exceeding $500B in capital expenditures, OpenAI/Anthropic hitting 2026 revenue goals ($30B/$15B), context windows stabilizing around 1M tokens, and US GDP growth remaining under 3.5%.

Other notable predictions include Tesla offering driverless taxi service, Chinese companies potentially surpassing Waymo's robotaxi fleet, and AI avoiding major catastrophes.

Overall, the authors expect steady AI improvement but modest real-world economic impacts, dismissing both AI bubble fears and rapid "fast takeoff" scenarios, instead predicting gradual integration across industries.

## Podcasts

### 🥝 core.py

- [Episode 28: 2025 In Review](https://open.spotify.com/episode/5PR5PeuIb4f2Qyo4w9hTli)

### 🐍 RealPython Podcast

- [Episode 278: PyCoder's Weekly 2025 Top Articles & Hidden Gems](https://realpython.com/podcasts/rpp/278/)
- [Episode 279: Coding Python With Confidence: Beginners Live Course Participants](https://realpython.com/podcasts/rpp/279/)
- [Episode 280: Considering Fast and Slow in Python Programming](https://realpython.com/podcasts/rpp/280/)
- [Episode 281: Continuing to Improve the Learning Experience at Real Python](https://realpython.com/podcasts/rpp/281/)
- [Episode 282: Testing Python Code for Scalability & What's New in pandas 3.0](https://realpython.com/podcasts/rpp/282/)

### 🥧 Python Bytes Podcast

- [#464 Malicious Package? No Build For You!](https://pythonbytes.fm/episodes/show/464/malicious-package-no-build-for-you)
- [#465 Stack Overflow is Cooked](https://pythonbytes.fm/episodes/show/465/stack-overflow-is-cooked)
- [#466 PSF Lands $1.5 million](https://pythonbytes.fm/episodes/show/466/psf-lands-1.5-million)
- [#467 Toads in my AI](https://pythonbytes.fm/episodes/show/467/toads-in-my-ai)

### 🦜 Talk Python to me

- [#533: Web Frameworks in Prod by Their Creators](https://talkpython.fm/episodes/show/533/web-frameworks-in-prod-by-their-creators)
- [#534: diskcache: Your secret Python perf weapon](https://talkpython.fm/episodes/show/534/diskcache-your-secret-python-perf-weapon)
- [#535: PyView: Real-time Python Web Apps](https://talkpython.fm/episodes/show/535/pyview-real-time-python-web-apps)

### 🍕 Pybites Podcast

- [#210: Codeflash and continuous Python performance with Saurabh Misra](https://www.pybitespodcast.com/1501156/episodes/18354849-210-codeflash-and-continuous-python-performance-with-saurabh-misra)
- [#211: Keeping the joy in coding - a new year's resolution](https://www.pybitespodcast.com/1501156/episodes/18492644-211-keeping-the-joy-in-coding-a-new-year-s-resolution)
- [#212: Elmer Bulthuis on Rust, WebAssembly, and Sustainable Design](https://www.pybitespodcast.com/1501156/episodes/18532295-212-elmer-bulthuis-on-rust-webassembly-and-sustainable-design)
- [#213: Seven Software Engineering Tips to Make Real Progress This Year](https://www.pybitespodcast.com/1501156/episodes/18564716-213-seven-software-engineering-tips-to-make-real-progress-this-year)

### 🚀 VS Code Insiders Podcast

- [Episode 18: Orchestrating Multiple Agents in VS Code with Ben & Peng](https://www.vscodepodcast.com/18)

## Repositories

### [adamchainz/tprof](https://github.com/adamchainz/tprof) (MIT)

`tprof` is a targeting profiler for Python 3.12+ that only measures the time spent in specified target functions. You can use it to measure your program before and after an optimization to see if it made any difference, with a quick report on the command line.

---

As we wrap up this journey together, I want to take a moment to express my gratitude for your reading. If you've enjoyed what you just read and would like to help sustain this blog, consider [starring this blog on github](https://github.com/blueberry-py/blog/stargazers), it would be great motivation for me to keep updating the blogs!

Alright, that concludes the January Edition of "This Month for Pythonistas". Thank you again for reading my post. I hope you enjoy it or find something useful. Happy coding and see you in February! 👋
