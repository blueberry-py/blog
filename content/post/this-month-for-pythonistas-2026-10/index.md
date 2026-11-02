---
title: This Month for Pythonistas - October 2026
description: Monthly roundup for Pythonistas — October 2026
slug: this-month-for-pythonistas-2026-10
date: 2026-10-31T21:00:00+08:00
authors:
  - Zeyang Lin
tags:
  - python
  - news
  - podcast
  - AI
categories:
  - python
series:
  - this month for pythonistas
keywords:
  - python
  - AI
  - agentic
  - podcast
  - linux
  - openai
  - gemini
  - moonshot
image: title.jpg
draft: false
---

```python
from datetime import date

print(date.today().year, date.today().month)
# 2026 10
```

![issue-2026-10](splash.jpg)

Welcome back Pythonistas! This is the October 2026 issue of "This Month for Pythonistas", bringing you curated Python news, tutorials, articles, podcasts, repositories and community highlights worth noting this month.

Before we continue, please note that this blog is synced across the following platforms:

- [Github Pages](https://blueberry-py.github.io/blog/post/this-month-for-pythonistas-2026-10/)
- [Netlify](https://blueberrypy.netlify.app/post/this-month-for-pythonistas-2026-10/)
- [Render](https://blueberrypy.onrender.com/post/this-month-for-pythonistas-2026-10/)
- [Vercel](https://blueberrypy-blog.vercel.app/post/this-month-for-pythonistas-2026-10/)
- [Cloudflare](https://blog.blueberrypy.workers.dev/post/this-month-for-pythonistas-2026-10/)

Ready? Let's get started!

---

## Events & Social

### [eMudhra Intermediate CA Compromise](https://emudhra.we-have-a-problem.com/)

eMudhra disclosed that private keys of eight intermediate CA certificates were compromised, chaining to roots trusted by Mozilla, Microsoft, Apple and Chrome. Proof: a message signed with each key, reported to root programs on 17 October. The keys were wrongly generated and recoverable from the certificates since April 2025, though empty Certificate Transparency logs suggest browsers were not targeted. Firefox, Chrome, Apple and Microsoft have blocked the certs via OneCRL, CRLite and CRLSets. The site offers a trust checker, user-agent statistics, patch lists for OSes and toolchains, and untrust workarounds for macOS, Linux, Windows, NetBSD and FreeBSD.

### [Compromised LiteLLM 1.107.0 on PyPI Installs a Credential Stealer and Backdoor](https://safedep.io/litellm-pypi-compromise-credential-stealer-backdoor/)

LiteLLM 1.107.0 on PyPI shipped a credential stealer and remote code execution backdoor in all seven wheels, though the upstream GitHub source is clean. A `cook.pth` file runs `cook.py` in every Python process, harvesting SSH keys, cloud and CI/CD secrets, browser passwords, AI tool tokens, and LiteLLM proxy API keys, then encrypting and posting them to www.litellm[.]dev. A `sitecustomize.py` daemon re-runs the stealer hourly and downloads second-stage code. Attackers used stolen GitHub CLI tokens of three developers to hijack the release pipeline. PyPI removed it within hours.

### [Checking email reputation, and allowing Outlook again](https://blog.pypi.org/posts/2026-10-16-email-reputation-and-outlook/)

PyPI has added an email reputation check when registering accounts or adding email addresses, rejecting disposable addresses and re-allowing `outlook.com` and `hotmail.com`. In June 2024 PyPI banned Outlook domains after a malware campaign registered accounts in bulk; the old static domain lists (public disposable-email-domains plus an internal list) couldn't distinguish throwaway addresses on large providers, forcing broad domain bans and slow, staff-driven remediation. The new service-based check catches fast-registering disposable providers and throwaway aliases, automatically adding confirmed disposable domains to the prohibited list — no volunteer time needed, critical amid autonomous exploits.

### [Bringing uv and ty together](https://astral.sh/blog/uv-ty-integration)

Astral announced an experimental, preview integration between uv (its Python package manager) and ty (its type checker/language server), aimed at a unified, more capable toolchain. It adds first-class support for [PEP 723](https://peps.python.org/pep-0723/) inline-metadata scripts: ty discovers scripts, invokes uv to build each script's environment, and provides type checking, completions, navigation, and hover info on both CLI and editor (opt-in via `ty.experimental.useUv`). It also introduces `uv check`, a unified diagnostics command that syncs dependencies, checks packages or whole workspaces, respects lockfile-pinned ty versions, and powers the ty pre-commit hook. Requires uv 0.12.3+ and ty 0.0.76+.

### [Gemini 4 Argon](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/)

Gemini 4 Argon is the Google's flagship frontier model — a sparse mixture-of-experts, natively multimodal (text, image, audio, video) transformer built for deep, long-horizon reasoning across software engineering, legal and finance work, science, and defensive cybersecurity. It features an industry-leading unified 1M-token input/output window with long decode up to 1M tokens and adjustable thinking levels. Argon sets records on DeepSWE v1.1 (77.9%), leads the Vals Index, and ties first on CWE-Bench v1 (68%).

### [Introducing Claude Haiku 5.5: the cheapest, fastest, and most capable small model we’ve ever released.](https://www.anthropic.com/claude-haiku-5-5)

Anthropic has launched Claude Haiku 5.5, its "cheapest, fastest, and most capable" small model, built for high-volume, cost-sensitive work like summarization, compaction, database queries, classification, live customer support, and browser use — plus acting as a coding subagent alongside Opus 5.5 and Sonnet 5.5. Benchmark scores substantially exceed Haiku 4.5 (e.g., 45.9% on Humanity's Last Exam, 39.2% on Terminal-Bench 4.0), and pricing is roughly 75% lower on average, with tiered rates based on prompt length. Haiku 5.5 adds an adjustable effort setting, improved alignment, and stricter cyber safeguards.

### [MiniMax M3.1 Flash: Redefining Agent Performance and Cost](https://www.minimax.io/blog/minimax-m31f)

MiniMax announced the release of MiniMax M3.1 Flash, a next-generation "Flash" model evolved from its anonymous agent, Space Bunny (which processed 200+ trillion tokens). The model delivers a generational leap in agentic tasks, coding, Computer Use and cybersecurity, with online inference nearly3× faster and usage costs cut 70% versus its predecessor. Benchmarks include 76.2 on BankerToolBench, 73.7% on DeepSWE v1.1, 61.7 on OSWorld V2, 29.6 on Agents' Last Exam (ranking first among Chinese models on both), and 82% on CyberGym. Inference sparsity optimizations deliver 200+ TPS output, 170+ TPS median.

### [Introducing Kimi K3.1 Pro](https://www.kimi.ai/blog/kimi-k3-1-pro)

Moonshot introduces K3.1 Pro, a 3T-class open-weight model with a 1-million-token context, post-trained from K3 with far more reinforcement-learning compute across hundreds of domains. It matches or approaches top proprietary models across coding, agentic and knowledge benchmarks: 65.7% on Terminal-Bench 4.0 (ahead of GPT-6 Astra's 58.2%), 92.7% on BenchCAD with tools, and 64.4 on OfficeQA Pro v2, while claim-level hallucination fell from 23.4% to 8.3%.

### [Introducing GPT-6.1 Terra](https://openai.com/index/introducing-gpt-6-1-terra/)

GPT-6.1 Terra is the mid-tier model in its Luna–Terra–Sol–Astra lineup, succeeding GPT-5.6 Terra. It pairs detailed visual reasoning and precise computer use—drafting proposals, reading technical drawings, filling forms, editing videos—with clearer, more natural writing. API pricing is 50% lower ($ 1 input, $ 0.05 cached, $ 5 output per million tokens), with a ~1.05M-token context window. OpenAI reports 50.3% on Terminal-Bench 4.0 versus 21.5%, errors down to 4.3%, Astra-level results at a tenth the cost, and 3× faster tasks, though these are vendor-reported.

## New Versions

![python-release-cycle](https://devguide.python.org/_static/release-cycle.svg)

### [Python 3.15.2, 3.14.10, 3.13.18, 3.12.16 and 3.11.18 are out](https://blog.python.org/2026/10/python-3152-31410-31318-31216-31118/)

Python released expedited security updates — 3.15.2, 3.14.10, 3.13.18, 3.12.16 and 3.11.18 — on October 26, 2026. They block the compromised eMudhra intermediate CA keys in the ssl module, so ordinary pip use, including upgrading pip, is now safe even without updating pip. All five fix tarfile.tar_filter link replacement and http.cookiejar negative-version cookies (plus two CVEs); 3.13/3.12/3.11 also gain Expat 2.9.0, a Windows mimetypes.knownfiles change and a header refolding fix. Binary installers ship for 3.15.2 and 3.14.10; the rest are source-only. Upgrading is strongly recommended.

### [Python 3.15.1, 3.14.9 and 3.13.17 are out](https://blog.python.org/2026/10/python-3151-3149-31317/)

Expedited security releases of Python 3.15, 3.14 and 3.13 are now available. All three bundle pip 26.2.2, which incorporates certifi 2026.10.19 to fix the eMudhra/eMSign CA certificate security incident. Although pip is normally not updated in security-only releases like 3.13 for backward-compatibility reasons, a special release with installers was considered prudent since 3.13 just entered security-only mode. Users are urged to upgrade pip and uv in existing virtual environments via `python -m pip install pip @ <wheel URL>`.

### [Python 3.15.0 (final) is here!](https://blog.python.org/2026/10/python-3150-final-is-here/)

![python-3.15-logo](https://blog.python.org/_astro/python-3.15.Cl03WkPb_2ux1jo.webp)

The release of 3.15 was delayed due to an issue with lazy import, and after an unscheduled release candidate 3, the final was able to land on October 9, 2026.

3.15 is an exiting release, with a bunch of new features, fixes, and performance improvements. The [What's New in Python 3.15](https://docs.python.org/3.15/whatsnew/3.15.html) page has a full list of changes.

You can now grab the source tarballs and binary distributions [here](https://www.python.org/downloads/release/python-3150/).

### [Python 3.16.0 alpha 1 is now available](https://blog.python.org/2026/10/python-3160-alpha-1-is-now-available/)

> There's plenty still to come in Python 3.16, but its first alpha is ready to try! Python 3.16.0a1 is the first of seven planned alpha releases. See [What’s new in Python 3.16](https://docs.python.org/3.16/whatsnew/3.16.html) for changes so far.

### [Python 3.10.22, 3.11.17, 3.12.15, 3.13.16 and 3.14.8 are now available!](https://blog.python.org/2026/10/python-31022-31117/)

> Python 3.10.22 is the final release of Python 3.10. After five years, the series has reached end of life and will receive no further security updates. Python 3.10.22 and 3.11.17 are source-only. Python 3.12.15 is also a source-only security release, with security support continuing until October 2028. Python 3.13.16 is the last full maintenance release of 3.13; future 3.13 releases will contain security fixes only. Python 3.14.8 is a maintenance release, and both 3.13.16 and 3.14.8 include binary installers.

### [Release of Polars 2.0](https://pola.rs/posts/release-polars-2/)

Polars 2.0 is out. Highlights: `collect()` on a `LazyFrame` now defaults to the streaming engine (row order no longer guaranteed unless `maintain_order=True`), and out-of-core spill-to-disk is enabled by default (starts at ~80% RAM, 64 GB disk budget), greatly improving memory resilience. SQL is now a first-class citizen, with optimizer gains like join reordering, common-subplan elimination, and dynamic predicates. A new native `Map` dtype replaces Arrow MapType's old List(Struct) representation, with key lookup, contains_key, keys and values methods. Polars also became stricter about dtypes and implicit behavior, aiding fast feedback for AI-driven development. In TPC-H/TPC-DS benchmarks Polars outran DuckDB 1.5.6, DuckDB 2.0 alpha, and DataFusion, which timed out on some queries.

## Tutorials

### deeplearning.ai's [Context Engineering](https://www.deeplearning.ai/courses/context-engineering) from Chroma

> Jeff Huber, co-founder and CEO of Chroma, teaches this course with guest speaker Drew Breunig, editor of O'Reilly's Context Engineering Handbook. You'll learn tools and techniques for context management and build agent harnesses from scratch in Python, without frameworks, so you can see how the pieces fit together. Along the way, you'll read your agent's traces to measure each change and use evals to make improvements.

### deeplearning.ai's [Loop Engineering with LangChain Deep Agents](https://www.deeplearning.ai/courses/loop-engineering-with-langchain-deep-agents) from LangChain

> This course gives you a framework for thinking about these different loops, and shows you how to build each one. You’ll apply them to a requirements-review agent that analyzes software specifications for facts, ambiguities, assumptions, and clarification questions. Learn from Sydney Runkle, Product Manager and maintainer of Deep Agents at LangChain, and Esmaeil Gargari, Curriculum Product Lead at DeepLearning.AI.

## Articles

### [The 5 most exciting new features of Python 3.15](https://mathspp.com/blog/the-5-most-exciting-new-features-of-python-315)

Python 3.15's five headline features: **lazy imports** (PEP 810) introduce a `lazy` keyword so modules like `json` only load when actually used, speeding up startup; **frozendict** (PEP 814) is a new immutable, hashable built-in dictionary that raises `TypeError` on any mutation and can serve as a dict key; **sentinel** (PEP 661) creates named placeholder objects (e.g. `NOTHING`) that are self-typed and checkable with `is`; **unpacking inside comprehensions** (PEP 798) allows `[*sub for sub in nested]`, a cleaner alternative to double-`for` comprehensions in list, dict, set comprehensions and generators; and **Tachyon** (PEP 799), a standard-library sampling profiler (`python -m profiling.sampling`) that samples up to 1,000,000 times per second, supports seven output formats, and can attach to running processes with near-zero overhead.

### [How fast is Python 3.15?](https://blog.miguelgrinberg.com/post/how-fast-is-python-3-15)

The author benchmarks Python 3.15 (3.15.0rc3) against CPython 3.10 – 3.14, PyPy 3.12, Node 26.3, and Rust 1.97, using Fibonacci and bubble-sort scripts in single- and 4-thread modes, with standard, JIT, and free-threading (FT) builds on Linux. Results: 3.15 is essentially on par with 3.14 (roughly 1–4% gains, some regressions); 3.11 and 3.14 were the only major speedup releases. The standout is the experimental JIT build, 1.20–1.28x faster than standard 3.15, and free-threading, ~4.5x faster in multithreaded Fibonacci but slower single-threaded. PyPy, Node, and Rust remain far ahead (Rust up to 77x). Conclusion: 3.15 is a minor overall improvement; only the JIT shows clear gains, so upgrading isn't urgent.

### [How we built an async-aware Python profiler](https://www.datadoghq.com/blog/engineering/async-python-profiler/)

Datadog's engineering blog explains how they built an async-aware Python profiler for asyncio-based services. Traditional flame graphs report each task's stack independently, losing which application path triggered work; their "stacked stacks" model tracks parent-child task dependencies and rebuilds a dependency tree to preserve the logical execution path, including tasks that outlive their creators. Because per-task overhead is O(n_tasks), they reduced costs by removing C++ exceptions (-15%), interning strings (-25%), and replacing the process_vm_readv syscall with guarded memcpy plus a SIGSEGV/SIGBUS recovery handler (-50%), cutting total overhead over 60% while improving fidelity. In production it uncovered a pylzstr infinite loop, wasteful debug logging, and NumPy hot spots, and ships in recent ddtrace releases.

### [Python's experimental JIT to be removed](https://lwn.net/SubscriberLink/1102102/0c00e4d550f25f8c/)

Python's experimental JIT compiler, merged into CPython in 2024 for Python 3.13, is being removed. After the steering council paused JIT work in June and demanded a standards-track PEP addressing maintenance, compatibility, and success metrics, maintainers drafted PEP 836, but the council found it too vague on support plans, performance criteria, user impact, security, and platform parity, and too slow on compatibility testing. On October 19, the authors withdrew the PEP, citing limited bandwidth. The reference implementation will remain available, but the JIT will be pulled from CPython's main branch, with future development left to community interest.

### [Towards Async Transactions in Django](https://noumenal.es/stack-report/towards-async-transactions-in-django/)

Carlton Gibson reports on progress toward `async with transaction.atomic()` in Django, targeted for 6.2. Concurrency conflicts with database transactions: shared connections can lose writes on rollback. Django's current fix is `sync_to_async(thread_sensitive=True)`, which serialises ORM work on one worker thread/connection per request. At the Django on the Med sprint in Pescara, Gibson, Caleb Hattingh and others designed a solution: nested `ThreadSensitiveContext`s give an async transaction its own connection, and only the task opening the block may nest further `atomic()` calls (else `TransactionManagementError`). Subtasks inside a transaction should use `TaskGroup`/`gather`; a new connection per transaction means pools need tuning and `CONN_MAX_AGE` persistent connections should be disabled.

### [Why Parquet Dominates Modern Data Engineering](https://oedokumaci.com/blog/posts/apache-parquet/)

This post explains why Apache Parquet dominates modern data engineering, using NYC taxi trip data. Switching from CSV to Parquet shrank the file to one-sixth its size and sped up reading 27× (175 ms → 6.6 ms). Key advantages: columnar storage lets readers skip unneeded columns; built-in column types avoid CSV's re-parsing and type-inference errors; dictionary, run-length, and bit-packing encodings shrink data (payment types: 76 MB → 2.2 MB); Zstandard compression shrinks further and speeds up network reads; page and row-group metadata enable predicate pushdown, so sorted data allows skipping most row groups.

## Podcasts

### 🐍 RealPython Podcast

- [Episode 313: Python 3.15: Exploring the New Features](https://realpython.com/podcasts/rpp/313/)
- [Episode 314: Codemoo: Demonstrating How Coding Agents Work](https://realpython.com/podcasts/rpp/314/)
- [Episode 315: Python Pitfalls: Common Mistakes and How to Avoid Them](https://realpython.com/podcasts/rpp/315/)
- [Episode 316: The Future of Python Security: Trends, Challenges, and Solutions](https://realpython.com/podcasts/rpp/316/)
- [Episode 317: Demystifying Python Memory Management & Choosing a Project Layout](https://realpython.com/podcasts/rpp/317/)

### 🍕 Python Bytes Podcast

- [#499 So many questions??](https://pythonbytes.fm/episodes/show/499/so-many-questions)
- [#500 Episode 500!](https://pythonbytes.fm/episodes/show/500/episode-500)
- [#501 A Nod to Sir-Mix-Alot](https://pythonbytes.fm/episodes/show/501/a-nod-to-sir-mix-alot)
- [#502 Introducing chameleon-rs](https://pythonbytes.fm/episodes/show/502/introducing-chameleon-rs)

### 📣 Talk Python to me

- [#565: Tachyon, Python 3.15's Built-in Sampling Profiler](https://talkpython.fm/episodes/show/565/tachyon-python-3.15s-built-in-sampling-profiler)
- [#566: State of the art in Python 2026](https://talkpython.fm/episodes/show/566/state-of-the-art-in-python-2026)
- [#567: Personal AI Agents for Pythonistas](https://talkpython.fm/episodes/show/567/personal-ai-agents-for-pythonistas)

## Repositories

### [NVIDIA/OpenShell](https://github.com/NVIDIA/OpenShell) (Apache-2.0)

> OpenShell is the safe, private runtime for fleets of autonomous AI agents. Agents are most useful when they can read files, install packages, call APIs, and use credentials. OpenShell gives them that capability without giving them unrestricted access to your data, secrets, or network. You declare what each agent can touch in a policy, and OpenShell enforces it.

---

As we wrap up this journey together, I want to take a moment to express my gratitude for your reading. If you've enjoyed this issue and would like to help sustain this blog, please consider [starring this blog on github](https://github.com/blueberry-py/blog/stargazers), it would be great motivation for me to keep updating!

Alright, that concludes the October Edition of "This Month for Pythonistas". Thank you again for reading my post and I hope you enjoy it or find something useful. Happy coding and see you in November! 👋
