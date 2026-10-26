---
title: This Month for Pythonistas - September 2026
description: Monthly roundup for Pythonistas — September 2026
slug: this-month-for-pythonistas-2026-09
date: 2026-09-30T21:00:00+08:00
authors:
  - Zeyang Lin
tags:
  - python
  - news
  - podcast
  - AI
  - pycon
categories:
  - python
series:
  - this month for pythonistas
keywords:
  - python
  - AI
  - agentic
  - microsoft
  - podcast
  - pycon
  - linux
  - claude
  - anthropic
image: title.jpg
draft: false
---

```python
from datetime import date

print(date.today().year, date.today().month)
# 2026 9
```

![issue-2026-09](splash.jpg)

Welcome back Pythonistas! This is the September 2026 issue of "This Month for Pythonistas", curating Python news, tutorials, articles, podcasts, repositories and community highlights for this month.

Before we continue, please note that this blog is synced across the following platforms:

- [Github Pages](https://blueberry-py.github.io/blog/post/this-month-for-pythonistas-2026-09/)
- [Netlify](https://blueberrypy.netlify.app/post/this-month-for-pythonistas-2026-09/)
- [Render](https://blueberrypy.onrender.com/post/this-month-for-pythonistas-2026-09/)
- [Vercel](https://blueberrypy-blog.vercel.app/post/this-month-for-pythonistas-2026-09/)

Ready? Let's get started!

---

## Events & Social

### [RISC-V is now officially supported by CPython!](https://blog.python.org/2026/08/riscv-now-officially-supported/)

CPython now officially supports RISC‑V as a tier‑3 platform, thanks to months of community work and RISE project hardware. Contributors fixed architecture‑specific issues, improved builds, and added testing on real hardware. Ongoing CI integration and potential tier‑2 promotion are planned, plus architecture‑specific optimizations. Users with RISC‑V hardware are encouraged to build CPython, run workloads, and report issues to help improve support.

### [GPT-6.1 Sol](https://openai.com/index/introducing-gpt-6-1-sol/)

OpenAI introduced GPT‑6.1 Sol, an upgraded version of GPT‑6 Sol tuned for agentic coding, computer use and professional work, delivering performance close to flagship GPT‑6 Astra at roughly one‑fifth the price ($2/$10 per million input/output tokens, $0.10 cached). It gains +6.4 points on DeepSWE, beats Opus 5.5 on GDP.pdf and AutomationBench at far lower cost, improves OSWorld 2.0 by 7 points, more than doubles Terminal‑Bench Science scores, and lowers factual‑error rate to 4.1%, with stronger alignment.

### [Introducing Claude Opus 5.5](https://www.anthropic.com/claude-opus-5-5)

Anthropic introduces Claude Opus 5.5, the first model in its Claude 5.5 family — a new flagship roughly matching Claude Fable 5.1 while costing ~40% less than Opus 5 ($4/$20 per million tokens, $0.20 cache reads) and producing output 30%+ faster. It leads in agentic coding, computer use, knowledge work, and science benchmarks, with testers citing dramatic efficiency gains on long jobs like codebase migrations. It scores best-ever on Anthropic's behavioral audit, resists prompt injection better, keeps biology/cyber safeguards via verification programs, and writes more clearly.

### [Introducing Claude Sonnet 5.5](https://www.anthropic.com/claude-sonnet-5-5)

Claude Sonnet 5.5 is the second model in the Claude 5.5 family: a faster, cheaper complement to Opus 5.5, best for well-scoped everyday tasks, bug fixes, and polished documents, slides, and spreadsheets. It runs 30%+ faster and costs up to 30% less per task than Sonnet 5 at unchanged pricing. Gains are dramatic — 70.6% versus 10.3% on Terminal-Bench 4.0, near-Opus results on GDPval-AA, OSWorld, and chart recognition, and it's the first Sonnet to beat Pokémon Red from screenshots alone.

## New Versions

### [Python 3.15.0 candidate 2 is here!](https://blog.python.org/2026/09/python-3150-rc2/)

> This release, 3.15.0rc2, is the final planned release candidate, containing around 144 bugfixes, build improvements and documentation changes from 76 contributors since 3.15.0rc1. The next release of Python 3.15 will be 3.15.0 final, scheduled for 2026-10-01.

### [PyTorch 2.14 Release Blog](https://pytorch.org/blog/pytorch-2-14-release-blog/)

PyTorch 2.14 is released, built from 2,995 commits by 487 contributors since 2.13. Highlights include NVGEMM (CuTeDSL-based CUTLASS GEMM kernels in Inductor with epilogue fusion and NVFP4 support), a preview of the rewritten "nccl2" NCCL backend from torchcomms, first-class fault tolerance in c10d with in-place process-group reconfiguration, one-sided RMA windows, and a backend-agnostic Flight Recorder. Apple Silicon gains native linear algebra (SVD, QR, Cholesky) plus more Metal kernels. New compiler features include torch.switch, graph-captured while_loop, declarative @dynamic_spec shapes, experimental complex-tensor compilation, Python 3.15/free-threaded wheels, and expanded ROCm 7.14, Intel XPU, and NVIDIA Rubin support.

### [PyPy v8.0.0 release](https://pypy.org/posts/2026/09/pypy-v800-release.html)

PyPy v8.0.0 is a major version shipping three interpreters: PyPy2.7, PyPy3.11 (likely the last 3.11 release), and a first-ever "beta"-quality PyPy3.12. The major bump reflects Linux builds moving to manylinux_2_28 (AlmaLinux 8, glibc 2.28, gcc14). Python 3.12 adds cp312-abi3 support by hiding PyPy's internal `ob_pypy_link` field, so CPython limited-ABI wheels should work — though import machinery and pip/uv acceptance remain unfinished. RPython code generation improved via computed gotos, inlining, and source-mapping comments. The internal HPy backend was dropped, and the clang-based pyhdrdump tool was revived.

## Tutorials

### deeplearning.ai's [Building Adaptive AI Agents](https://www.deeplearning.ai/courses/building-adaptive-ai-agents) by Oracle

> In this course, you'll work with three adaptation layers. For behavior adaptation, you'll build a skill induction pipeline that turns the agent's traces, its conversations, tool calls, errors, and fixes, into reusable skills it applies the next time it sees a similar task, with a human in the loop approving each skill. For knowledge adaptation, you'll build a code knowledge graph that connects files through imports, function calls, and co-edits in git history, so the agent retrieves context by navigating the structure of the codebase instead of relying on keyword search. For model adaptation, you'll learn when it makes sense to adapt the model itself with techniques like fine-tuning.

### deeplearning.ai's [Building AI Assistants with On-Device Memory](https://www.deeplearning.ai/courses/building-ai-assistants-with-on-device-memory) by Qdrant

> A cloud-based assistant can remember what it sees, hears, and is told, but only by staying connected and sending that data to a remote server. An assistant that runs on the device builds that memory locally instead. Every note, photo, or recording becomes a vector you can search by meaning, tag with context, and delete on command, all without leaving the device.

### RealPython's [How to Write an AGENTS.md File for a Python Project](https://realpython.com/agents-md/)

> An AGENTS.md file gives your AI coding agent the context it needs to write code that fits your project's guidelines. It's a plain Markdown file at your project root where you can pin your Python version, dependency manager, coding conventions, and constraints. In this tutorial, you'll build one of these files section by section and watch your agent go from sloppy output to clean, idiomatic code.

## Articles

### [Speeding Up a Python Service with CinderX: JIT and Static Typing](https://dev.to/deadlovelll/speeding-up-a-python-service-with-cinderx-jit-and-static-typing-53bh)

This article examines `CinderX`, a CPython extension adding a full JIT compiler, "Static Python" typed subset, parallel garbage collector, and heap immortalization. Unlike CPython 3.14's cheaper copy-and-patch tier 2, CinderX compiles entire functions through typed HIR/LIR SSA passes into machine code. Benchmarking a real recommendation service shows only typed kernels plus JIT meaningfully helped: throughput rose from 140 to 250 requests/second, p99 fell from 279ms to 13ms. Flags alone changed nothing; NumPy-bound endpoints gained zero. Types without JIT cost 3.4× more.

### [Soft-deprecating re.match()](https://hugovk.dev/blog/2026/soft-deprecating-re.match/)

This post from Hugo van Kemenade explains Python 3.15's soft deprecation of `re.match()`, whose start-anchored-but-not-end-anchored behavior surprises many developers. Soft deprecation, introduced by [PEP 387](https://peps.python.org/pep-0387/), is a documentation-only recommendation: no warnings, no removal, and it doesn't graduate into hard deprecation. The release adds `re.prefixmatch()`, an explicit alias for `match()`, embodying "explicit is better than implicit." New code should use `prefixmatch()` for prefix matching, `re.search()` for unanchored matching, or `re.fullmatch()` when both ends must match; existing code supporting older Pythons can keep `match()`. The post includes a comparison table and Ruff config to ban `re.match()`.

### [Introducing wrapture](https://grahamdumpleton.me/posts/2026/08/introducing-wrapture/)

_Wrapture_ is a Python library that wraps real code rather than replacing it, enabling observation, testing and monkey‑patching from a single mechanism. Bindings name target methods, a timeline records calls with arguments, return values and call‑graph nesting, and can be queried in tests or streamed to sinks (printer, JSON, OpenTelemetry). The same bindings also support stubbing, raising, argument/result transforms, and ad‑hoc tracing of running applications without code changes.

### [The Mullet Stack: JavaScript in the front, Python in the back.](https://seanhelvey.com/mullet-stack/guide/)

The Mullet Stack guide pairs React + TypeScript frontend (Vite) with FastAPI + Pydantic backend, JavaScript in front, Python in back. It walks through parallel setup, defining/validating an Item model, contrasting TypeScript's build-time structural typing with Pydantic's runtime validation, testing with Vitest and pytest, handling CORS, and deriving frontend types from FastAPI's OpenAPI schema via openapi-typescript to prevent drift, noting alternatives like Django, Next.js, GraphQL, and concluding codegen unifies the stack.

### [Making a Python interpreter in 1024 bytes](https://austinhenley.com/blog/python1024.html)

The author describes building a Python-like interpreter in just 1024 bytes of C code, targeting a FizzBuzz program with recognizable Python syntax (def, colons, indentation). His first 512-byte attempt failed. Rather than tokenizing/compiling like CPython, he uses global arrays for source and symbols, recursive-descent parsing that executes immediately, the C call stack for indented blocks, and backward jumps re-parsing the source for loops and function calls (even recursion). Heavy "code golf" tricks — single-letter names, ASCII comparisons, bitwise/ternary tricks, C89 implicit ints — shrank a 4800-byte readable version to 1024.

### [How Libraries Run Rust Inside Python (with PyO3)](https://belderbos.dev/blog/how-libraries-run-rust-inside-python/)

The blog post explains how libraries like Pydantic v2 embed Rust in Python using `PyO3`, demonstrated with a hand-rolled JSON parser. Four steps get Rust into Python: write a Rust module, annotate it with `#[pyfunction]`/`#[pymodule]` macros, compile with `maturin` into a shared library, and import it. The parser returns a Rust `JsonValue` enum, which Python never sees directly. The key insight: `.into_pyobject()` must rebuild the entire tree as native Python objects, so on large documents this conversion can cost more than parsing itself. Errors translate via a `From` impl into Python exceptions. For scalar returns, port freely; for large structures, profile the boundary and consider lazy, Rust-backed views.

### [Creating temporary files in Python](https://www.pythonmorsels.com/temporary-files/)

This article by Trey Hunner explains creating temporary files and directories using Python's standard-library **tempfile** module. `NamedTemporaryFile` creates a file deleted when its `with` block exits; use `delete=False` (or Python 3.12's better `delete_on_close=False`) to keep the file so other code can use its name, then delete it manually. `TemporaryDirectory` offers an auto-deleted folder. `TemporaryFile` returns only a file descriptor, not a real filename, so a named file is usually preferable. Prefer pytest's built-in temp utilities when available; otherwise use `NamedTemporaryFile` and `TemporaryDirectory`.

### [pytest plugins that actually change how you test in 2026](https://dev.to/peytongreen_dev/pytest-plugins-that-actually-change-how-you-test-in-2026-1ecn)

In this hands-on guide, the author recommends seven pytest plugins that reshape testing workflows in 2026: `pytest-httpx` mocks HTTP at the transport layer and fails tests when registered mocks go unused; `pytest-randomly` exposes order dependencies via randomized runs and reproducible seeds; anyio's built-in plugin simplifies async tests across asyncio and trio backends; `syrupy` enables snapshot or golden-file testing; `pytest-watch` reruns tests on file save; `freezegun` deterministically freezes time, avoiding the outdated pytest-freezegun wrapper; and `pytest-cov`, configured with branch coverage, skip-covered reporting and thresholds, reveals real gaps. Together they form a free, no-subscription testing stack.

## Podcasts

### 🐍 RealPython Podcast

- [Episode 310: Performance Engineering: Profiling and Making Apps Fast by Default](https://realpython.com/podcasts/rpp/310/)
- [Episode 311: Django Developers Survey Results & Reproducible Python Builds](https://realpython.com/podcasts/rpp/311/)
- [Episode 312: Navigating AI in Open Source: Insights From Wagtail](https://realpython.com/podcasts/rpp/312/)

### 🍕 Python Bytes Podcast

- [#494 Python Wrapture](https://pythonbytes.fm/episodes/show/494/python-wrapture)
- [#495 Banned](https://pythonbytes.fm/episodes/show/495/banned)
- [#496 A lake house in Seattle](https://pythonbytes.fm/episodes/show/496/a-lake-house-in-seattle)
- [#497 Faster than light profiling](https://pythonbytes.fm/episodes/show/497/faster-than-light-profiling)
- [#498 A Tiny Episode](https://pythonbytes.fm/episodes/show/498/a-tiny-episode)

### 📣 Talk Python to me

- [#561: TonIO, a Multi-threaded Async Runtime for Python](https://talkpython.fm/episodes/show/561/tonio-a-multi-threaded-async-runtime-for-python)
- [#562: DuckLake: The Lakehouse That's Just SQL and Parquet](https://talkpython.fm/episodes/show/562/ducklake-the-lakehouse-thats-just-sql-and-parquet)
- [#563: Getting Started with Rust as Python Devs](https://talkpython.fm/episodes/show/563/getting-started-with-rust-as-python-devs)
- [#564: EVE Online Departs for Python 3](https://talkpython.fm/episodes/show/564/eve-online-departs-for-python-3)

## Repositories

### [BruceEckel/ThinkingInPython](https://github.com/BruceEckel/ThinkingInPython) (CC BY-NC-ND 4.0)

> An intermediate-to-advanced book for experienced programmers. It opens with a fast introduction for programmers coming from other languages.

### [reflex-dev/xy](https://github.com/reflex-dev/xy) (Apache 2.0)

> XY is an extremely fast, interactive, customizable Python charting library for the web, notebooks, and static exports. Charts are composed declaratively or through matplotlib conventions. You can fully customize them with Python, CSS, or Tailwind.

### [gi0baro/tonio](https://github.com/gi0baro/tonio) (BSD-3-Clause)

> TonIO is a multi-threaded async runtime for free-threaded Python, built in Rust on top of the mio crate, and inspired by tinyio, trio and tokio. It supports both using `yield` and the more canonical `async`/`await` notations, with the latter being available as part of the `tonio.colored` module.

## Have time for some fun?

### [The Move to Python 3 Begins!](https://store.steampowered.com/news/app/8500/view/690892322235222263)

![eve-online-moves-to-python-3](https://clan.akamai.steamstatic.com/images//3952729/0d80a9a92ff735bf308ef951f7a43dd82af80a45.jpg)

EVE Online has begun migrating its 2.4-million-line Stackless Python codebase from Python 2.7, unchanged since 2010, to Python 3 as part of the EVE Forever initiative. First Singularity-tested changes are now live, with success defined as invisibility to players. Motivations include major Python 3 performance gains, access to modern libraries, debuggers and profilers, and cleaner strings, integers and classes. The staged approach first uses Python-Future to make code parse under both versions — 95.9% already does, with only ~3,300 blocking lines — before tackling ~20,000 lines with changed behavior like division.

---

As we wrap up this journey together, I want to take a moment to express my gratitude for your reading. If you've enjoyed this issue and would like to help sustain this blog, please consider [starring this blog on github](https://github.com/blueberry-py/blog/stargazers), it would be great motivation for me to keep updating!

Alright, that concludes the September Edition of "This Month for Pythonistas". Thank you again for reading my post and I hope you enjoy it or find something useful. Happy coding and see you in October! 👋
