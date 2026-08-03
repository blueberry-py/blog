+++
title = "This Month for Pythonistas - July 2026"
description = "Python 3.15 beta 4, EuroPython, package namespace, Claude Opus 5, GPT-5.6, more thoughts on Agentic AI 🤖 and vibe coding, as well as other fun stuff"
slug = "this-month-for-pythonistas-2026-07"
date = 2026-07-31T21:00:00+08:00
authors = ["Zeyang Lin"]
tags = ["python", "news", "podcast", "AI", "pycon"]
categories = ["python"]
series = ["this month for pythonistas"]
keywords = ["python", "AI", "agentic", "podcast", "europython", "linux", "claude", "anthropic", "openai"]
image = "title.jpg"
draft = false
+++

```python
from datetime import date

print(date.today().year, date.today().month)
# 2026 7
```

![issue-2026-07](splash.jpg)

Welcome back Pythonistas! This is the July 2026 issue of "This Month for Pythonistas", bringing you curated Python news, tutorials, articles, podcasts, repositories and community highlights for this month.

Before we continue, please note that this blog is synced across the following platforms:

- [Github Pages](https://blueberry-py.github.io/blog/post/this-month-for-pythonistas-2026-07/)
- [Netlify](https://blueberrypy.netlify.app/post/this-month-for-pythonistas-2026-07/)
- [Render](https://blueberrypy.onrender.com/post/this-month-for-pythonistas-2026-07/)
- [Vercel](https://blueberrypy-blog.vercel.app/post/this-month-for-pythonistas-2026-07/)

Ready? Let's get started!

---

## Events & Social

### EuroPython 2026

EuroPython 2026, held in Kraków, Poland from **13–19 July 2026**, celebrated the conference's **25th anniversary** and brought together over **1,500 Python developers, researchers, and enthusiasts**. The week featured tutorials, technical talks, community sessions, open-source sprints, and networking events. A highlight was its collaboration with **EuroSciPy**, including joint sprints that connected the wider scientific Python community. Hosted at the **ICE Kraków Congress Centre**, the event emphasized Python's growing role in software development, AI, data science, education, and open-source collaboration across Europe and beyond.

### [Releases now reject new files after 14 days](https://blog.pypi.org/posts/2026-07-22-releases-now-reject-new-files-after-14-days/)

PyPI now _rejects_ new file uploads to releases older than 14 days, preventing older, long-stable releases from being poisoned if publishing tokens or workflows are compromised. This change, discussed since [PEP 740](https://peps.python.org/pep-0740/) in January 2024 and accelerated after the LiteLLM and Telnyx supply chain attacks, was implemented on July 8, 2026. Data showed only 56 of 15,000 top projects had published Python 3.14 wheels more than 14 days post-release, indicating minimal disruption. The restriction reduces cleanup work for PyPI admins and prevents releases from ending in an indeterminate compromised state, though defined semantics for closed releases are still pending future standardization via [PEP 694](https://peps.python.org/pep-0694/) and Upload 2.0.

### [Planned Updates to the PyPI User Interface](https://blog.pypi.org/posts/2026-07-22-ui-updates/)

PyPI is rolling out user interface updates over the next few months, introducing a new Security tab for provenance and attestation data, horizontal navigation tabs, a right-placed metadata sidebar, trust-level labeling, and clearer status indicators. Changes are being deployed in four phases on TestPyPI first, allowing community feedback. These visual-only updates require no action from maintainers and automatically map existing attestations to the new UI.

### [Introducing Claude Sonnet 5](https://www.anthropic.com/news/claude-sonnet-5)

![claude-sonnet-5](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2F458ea645ef6b729f6847cba16932716e6b547f2f-2880x1620.png&w=3840&q=75)

Anthropic announced Claude Sonnet 5, their most agentic Sonnet model yet, capable of planning, using tools like browsers and terminals, and running autonomously at levels previously requiring more expensive models. Its performance approaches Opus 4.8 but at lower prices, with substantial improvements over Sonnet 4.6 in reasoning, tool use, coding, and knowledge work. Safety assessments show fewer undesirable behaviors than its predecessor.

### [Introducing Claude Opus 5](https://www.anthropic.com/news/claude-opus-5)

![claude-opus-5](https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2F54b7ab1d2c2521f83ae5d2da5f9d99321c370d24-2880x1620.png&w=3840&q=75)

Claude Opus 5 is now available as a thoughtful and proactive model that approaches the frontier intelligence of Claude Fable 5 at half the cost. It is the new state-of-the-art on coding and knowledge work benchmarks like Frontier-Bench and CursorBench, while remaining behind Mythos 5 on cybersecurity tasks. Opus 5 excels on software engineering, scientific research (especially organic chemistry and protein tasks), and visual outputs, while being the most aligned and safest model to date.

### [Redeploying Fable 5](https://www.anthropic.com/news/redeploying-fable-5)

After US export controls suspended access to Claude Fable 5 and Mythos 5 on June 12, the restrictions were lifted on June 30. Fable 5 is now available globally starting July 1, while Mythos 5 access resumed for select US organizations. Anthropic strengthened safeguards with improved safety classifiers, proposed a shared industry framework for assessing jailbreak severity, and deepened collaboration with the US government on pre-release testing, information sharing, and joint research.

### [GPT-5.6: Frontier intelligence that scales with your ambition](https://openai.com/index/gpt-5-6/)

OpenAI launched GPT-5.6 series including flagship _Solo_, balanced _Terra_ and cost-effective _Luna_ across ChatGPT, Codex and its API with global gradual rollout. All models beat competitors like Fable 5 and Claude Opus 4.8 in coding, agent workflows, cyber defense, life science research and office document creation, delivering stronger performance at far lower costs and shorter latency.

It supports Programmatic Tool Calling and Ultra multi-agent parallel processing for complex tasks, boasting advanced UI design judgment and precise template-following document generation. Equipped with OpenAI's most robust layered safety safeguards, it restricts high-risk cyber/biology features to verified users via Trusted Access without blocking legitimate defensive research. Tiered token pricing applies, alongside optimized prompt caching and beta multi-agent API functions for developers. Internal tests show it greatly accelerates AI research with doubled researcher token usage vs GPT-5.5.

### [Kimi K3: Open Frontier Intelligence](https://www.kimi.com/blog/kimi-k3)

![kimi-k3](https://kimi-file.moonshot.cn/prod-chat-kimi/kfs/4/2/2026-07-16/1d9ccb76dcmosb3rn6vk0?x-tos-process=image%2Fauto-orient%2C1%2Fstrip%2Fignore-error%2C1)

Kimi K3 is a new 2.8-trillion-parameter open model from Moonshot featuring native vision capabilities and a 1-million-token context window. Built on Kimi Delta Attention and Attention Residuals using Mixture of Experts (16 of 896 experts active), it excels at long-horizon coding, knowledge work, and reasoning. It demonstrated frontier-level performance across benchmarks, notably building a GPU compiler, designing a chip, and creating interactive research reports. The full model weights were then released on July 27, 2026.

### [Introducing Grok 4.5](https://x.ai/news/grok-4-5)

**Grok 4.5** is SpaceXAI's smartest model, launched July 8, 2026, built for coding, agentic tasks, and knowledge work. Trained on tens of thousands of NVIDIA GB300 GPUs with curated datasets spanning coding, science, engineering, and math, it excels at engineering benchmarks. Served at 80 tokens per second with twice the token efficiency of leading models, it delivers intelligent results quickly and cost-effectively at $2/M input and $6/M output tokens. It's available in Grok Build, Cursor, and via the SpaceXAI API console.

## New Versions

### [Python 3.15.0 beta 4 is here!](https://blog.python.org/2026/07/python-3150-beta-4/)

> This release, 3.15.0b4, is the final planned beta release, containing around 298 bugfixes, build improvements and documentation changes since 3.15.0b3. The next pre-release of Python 3.15 will be 3.15.0rc1, scheduled for 2026-08-04.

### [PyTorch 2.13 Release Blog](https://pytorch.org/blog/pytorch-2-13-release-blog/)

PyTorch 2.13 brings major performance and scalability improvements: FlexAttention lands on Apple Silicon with up to 12× speedups and gains deterministic backward on CUDA; CuTeDSL provides a second high-performance code path for Inductor; `nn.LinearCrossEntropyLoss` fuses linear and loss computation to cut peak GPU memory by up to 4×; a new torchcomms backend improves distributed training fault tolerance and debuggability; FSDP2 enables communication overlap for higher throughput; Python 3.15 wheel support is added; and broader platform gains include ROCm, Armv9-A, and Intel XPU updates.

### [Introducing Haystack 3.0: Agent Hooks, Skills and a Lighter Core](https://haystack.deepset.ai/blog/haystack-3-release)

Haystack 3.0 is a major release of the open-source AI orchestration framework, putting agents at the center. It introduces pre-configured agents (deep research, advanced RAG), hooks for controlling agent behavior, first-class skills with progressive disclosure, built-in introspection and observability, and a leaner core with fewer dependencies.

## Tutorials

### Deeplearning.ai's [AI Code Reviews](https://www.deeplearning.ai/courses/ai-code-review/)

> You'll start with practical techniques for getting more out of AI review, like reviewing before you open a pull request, giving the reviewer task and repository context, and triaging findings by risk. Then you'll build a context-aware review system of your own, beginning with a context engine that retrieves the most relevant code and extending it into an ensemble of specialized agents.

### RealPython's [LangGraph Tutorial: Build Stateful AI Agents in Python](https://realpython.com/langgraph-python/)

> Explore the full tutorial to gain hands-on experience with LangGraph, including setting up workflows and building a LangGraph agent that can autonomously parse emails, send emails, and interact with API services.

### RealPython's [CrewAI in Python: Coordinating Teams of AI Agents](https://realpython.com/crewai-python/)

> CrewAI is a Python framework that lets you build a crew of specialized AI agents, each focusing on one part of the job. For example, instead of cramming research, validation, and writing into a single prompt, you create a team. One agent researches, another validates, and a third writes. Each focuses on what it does best, working together to complete the task.

## Articles

### [PEP 752 – Implicit namespaces for package repositories](https://peps.python.org/pep-0752/)

PEP 752 is **accepted**. It introduces implicit namespace reservations for Python package repositories, allowing organizations to reserve name prefixes (e.g., `google-cloud-`, `aws-cdk-`) to prevent name-squatting, typosquatting, and dependency confusion attacks. Following the NuGet approach, it works within the existing flat namespace — no new package syntax or installer changes are required, and pre-existing packages are unaffected. Uploads matching a reserved namespace fail with HTTP 409 unless the uploader holds an active grant. The JSON API is upgraded to version 1.5 to expose namespace metadata. The PEP is accepted and has community support from organizations including Apache Airflow, Microsoft, Datadog, pytest, and Project Jupyter.

### [PEP 814: Add frozendict built-in type](https://vstinner.github.io/pep-814-add-frozendict-builtin-type.html)

Victor Stinner recounts the long journey to adding `frozendict` — an immutable, hashable dictionary type — as a built-in to Python 3.15. After his original [PEP-416](https://peps.python.org/pep-0416/) was rejected in 2012 and [PEP-603](https://peps.python.org/pep-0603/)'s `frozenmap` stalled, Stinner and Donghee Na wrote PEP 814, which the Steering Council accepted in February 2026. Implemented in C and sharing most code with `dict`, `frozendict` preserves insertion order but comparison and hashing are order-independent. The article covers C API additions, stdlib integration (e.g., `json`, `copy`, `pickle`), garbage collector bug fixes, and migration guidance for both Python and C code.

### [What Every Python Developer Should Know About the CPython ABI](https://labs.quansight.org/blog/python-abi-abi3t)

The CPython **Application Binary Interface** (ABI) underpins Python's ability to call native C, C++, Rust, or Fortran code and vice versa. This post explains what an ABI is, how it differs from a C API (which is source-level), and details the five layers of the CPython C API—Internal, Private, Unstable, Version-Specific, and Limited. It covers ABI compatibility tags in wheel filenames (cp3XY for version-specific, abi3 for the stable ABI, cp3XYt for free-threaded, and abi3t for the new free-threaded stable ABI in Python 3.15+). The post also explains how the free-threaded build changes the PyObject struct layout, breaking backward compatibility, and how PEP 803 introduces abi3t to let a single wheel target both GIL-enabled and free-threaded interpreters going forward.

### [When to use classmethod, staticmethod, or instance method in Python](https://belderbos.dev/blog/classmethod-vs-staticmethod-vs-instance-method-python/)

This article explains the differences between instance methods, classmethods, and staticmethods in Python. The key rule: if a method needs the instance (`self`), it's an instance method; if it needs the class (`cls`) but not a specific instance, use `@classmethod` (e.g., alternative constructors like `datetime.date.today()`, registries); if it needs neither, use `@staticmethod` for namespaced helper functions. The author warns that with AI-generated code, methods may look plausible but be structurally wrong, so developers should critically evaluate whether each method truly belongs where it is placed.

### [Selecting `random` values in Python](https://www.pythonmorsels.com/random-numbers/)

The article explains how to generate random values in Python using the **`random` module**, which provides pseudorandom numbers via the Mersenne Twister algorithm. It covers `randint` and `randrange` for integers, `random()` for floats between 0 and 1, and `choice`/`choices` for picking items from sequences — the author's most-used function. The deterministic nature allows reproducible results via `seed()`, useful for testing but risky for security. For cryptographically-secure randomness, Python's **`secrets` module** offers `choice`, `randbelow`, and `randbits`, while the `SystemRandom` class provides a full secure counterpart to `random`'s API.

### [Stacks and queues in Python](https://www.pythonmorsels.com/stacks-and-queues/)

Python lists are ideal for **stacks** (last-in, first-out) using `append()` and `pop()`, as they are optimized for adding/removing items at the end. For **queues** (first-in, first-out), use a `deque` (double-ended queue) from the `collections` module, which supports efficient `append()`/`popleft()` operations. While `deque` can also work as a stack, lists are recommended for stack-like needs and `deque` for queue-like needs in Python.

### [protobuf-py: Protobuf for Python, without compromises](https://buf.build/blog/protobuf-py)

Buf announced **protobuf-py**, a new Protocol Buffers library for Python written from scratch. It passes the full Protobuf conformance suite (proto2, proto3, editions), supports extensions, custom options, dynamic messages, and well-known types. Unlike Google's C-based package, it stores messages as plain Python objects with readable generated code and no runtime dependencies. An optional Rust accelerator boosts parsing/serialization for production workloads. It offers complete spec coverage with an idiomatic Python API, addressing the gap between Google's complete but clunky package and the nicer but incomplete `betterproto`.

### [Pip 26.2: –only-deps solves 16 years of app deployment hacks](https://jamesoclaire.com/2026/07/23/pip-26-2-only-deps-solves-16-years-of-app-deployment-hacks/)

pip 26.2 introduces the `--only-deps` flag, solving a 16-year problem of installing dependencies for application-style Python projects without installing the package itself. The author traces the history of workarounds — from `pip freeze`, manually cutting version pins, `pip install -e .`, to third-party tools like `pip-chill`, `pipreqs`, `poetry`, `hatch`, and `uv` — showing how community demand finally led to this native solution. Sebastian Höffner's PR #13895 adds a global flag allowing `pip install --only-deps .` to install only project dependencies from `pyproject.toml`, eliminating years of fragile manual deployment hacks.

### [How to publish to PyPI using GitHub Actions securely](https://snarky.ca/how-to-publish-to-pypi-using-github-actions-securely/)

This article by Brett Cannon outlines three steps to securely publish Python packages to PyPI via GitHub Actions: (1) Use the **zizmor** tool to scan workflows for insecure defaults — set no permissions by default, disable persisted credentials after checkout, and pin actions to commit hashes rather than tags; (2) adopt **Trusted Publishing** to eliminate API token management and gain attestations; and (3) **require manual approval** through GitHub Environments to prevent accidental or malicious releases. These measures mitigate recent GitHub Actions security incidents.

### [uv in production: the speed is real, the integration isn't free](https://tsv.one/articles/uv-in-production-caveats)

The article discusses the author's ~90-day production experience with **uv**, Astral's Python package manager. While uv delivers a genuine ~10x speed improvement over pip in CI, the article highlights five key caveats: (1) it refuses to install without an active venv, (2) auto-installing Python is blocked by corporate firewalls (fixable via a mirror), (3) parallel installs get serialized due to locking, (4) it defaults to first-index mode (defense against dependency confusion), and (5) bytecode compilation is off by default, slowing cold starts. The author concludes uv is worth adopting but warns that its deliberate strictness — unlike pip's leniency — requires budgeting time for integration.

### [Sandboxing an AI Agent](https://sajalsharma.com/posts/sandboxing-an-ai-agent/)

This post explores sandboxing AI agents by giving them isolated, disposable environments instead of running code directly on a host machine. He compares two architectures: a tool-backend model where the agent loop stays local and the sandbox executes commands remotely, versus the agent-in-the-box model where the entire agent lives inside the sandbox. He examines different isolation strengths—shared-kernel containers, gVisor's software kernel, and Firecracker microVMs — and concludes sandboxes are becoming a default layer of the agent stack for containment, parallelism, reproducibility, and cheap recovery.

### [State of CLI Coding Agents, Mid-2026](https://blog.arcbjorn.com/state-of-cli-coding-agents-2026)

The article surveys 35 CLI coding agents as of mid-2026, noting the terminal unexpectedly won over IDEs for serious AI coding work. Claude Code's February 2025 research preview set the template — agentic loop, file/shell tools, memory, hooks, subagents — that everyone else cloned. The landscape spans lab agents (Claude Code, Codex CLI, Antigravity CLI, Grok Build), platform CLIs (Copilot CLI, Cursor CLI, Amp, Junie), and open-source harnesses (OpenCode, Goose, Aider, Cline, Pi/Omp). Open-weight models like GLM-5.2 and DeepSeek V4 narrowed the frontier gap dramatically, while free tiers retreated industry-wide.

### [What our AI guiding principles actually mean](https://wagtail.org/blog/what-our-ai-guiding-principles-actually-mean/)

Wagtail has refreshed its AI guiding principles, emphasizing that AI will remain optional in core with features living in separate packages. The five principles include: no AI dependency in core, a responsible approach focused on ethics and sustainability, model and provider agnosticism favoring open-weight smaller models, only adopting AI where it delivers real value, and maintaining human-in-the-loop control to preserve user autonomy. The article stresses that while the principles are set, the real challenge lies in their practical implementation as AI adoption continues to evolve.

### [How much can you delegate to agents?](https://newsletter.posthog.com/p/agent-autonomy)

This article presents a framework for deciding agent autonomy levels based on two factors: how easy the task is to check and how cheap it is to undo. It defines four levels—Level 0 (agent as assistant for hard-to-check, costly-to-undo tasks), Level 1 (human-in-the-loop for hard-to-check, easy-to-undo tasks), Level 2 (agent delegation for easy-to-check, costly-to-undo tasks), and Level 3 (self-driving mode for easy-to-check, easy-to-undo tasks) — with real examples from PostHog's engineering work and practical advice on progressively increasing delegation safely.

### [The Short Leash AI Coding Method For Beating Fable](https://blog.okturtles.org/2026/07/short-leash-ai-method/)

The **Short Leash AI Coding Method** advocates for expert developers to use AI agents cautiously in security-critical software. Unlike "vibe coding" where AI works autonomously, this method keeps the developer actively engaged — reviewing every proposed diff, denying undesired changes, and committing after each subtask. For reviews, both AI and human input are essential: AI catches common mistakes like a linter, while humans handle high-level issues. The key principle is never letting the AI work unsupervised to maintain quality and codebase understanding.

### [Skill engineering and the case against one-shot AI design](https://www.latent.space/p/skill-engineering-design)

Paul Bakaus, creator of the open-source design skills system _Impeccable_, argues for "skill engineering" as a new discipline that gives AI agents a precise design vocabulary (e.g., "bolder," "quieter") instead of relying on one-shot AI design. He believes agents need domain knowledge and human steering, not full automation. His philosophy: AI quickly produces the first 80% of competent work, while humans own the final 20% where taste and context matter, rejecting the notion of "auto mode" entirely.

## Podcasts

### 🥝 core.py

- [Episode 30: Live from EuroPython, an Interview with Guido van Rossum](https://open.spotify.com/episode/1d7fOuGcUiP59O7owtc2mc)

### 🐍 RealPython Podcast

- [Episode 301: Running Python Locally in a Sandbox](https://realpython.com/podcasts/rpp/301/)
- [Episode 302: Constructing and Judging Modern Agentic Workflows](https://realpython.com/podcasts/rpp/302/)
- [Episode 303: Free-Threaded Python's History & uv in Production](https://realpython.com/podcasts/rpp/303/)
- [Episode 304: Configuring a Versatile LLM Harness & Scraping the Web With Scrapy](https://realpython.com/podcasts/rpp/304/)
- [Episode 305: Should You Understand Your Entire Python Codebase?](https://realpython.com/podcasts/rpp/305/)

### 🍕 Python Bytes Podcast

- [#486 underscore-underscore-ghost-emoji](https://pythonbytes.fm/episodes/show/486/underscore-underscore-ghost-emoji)
- [#487 Minimum requirements](https://pythonbytes.fm/episodes/show/487/minimum-requirements)
- [#488 tau - it's 2pi and it writes code](https://pythonbytes.fm/episodes/show/488/tau-its-2pi-and-it-writes-code)
- [#489 Or JSON?](https://pythonbytes.fm/episodes/show/489/or-json)
- [#490 It’s a vibe coding party](https://pythonbytes.fm/episodes/show/490/it-s-a-vibe-coding-party)

### 📣 Talk Python to me

- [#554: Trustworthy AI in Healthcare and Longevity](https://talkpython.fm/episodes/show/554/trustworthy-ai-in-healthcare-and-longevity)
- [#555: Marimo Pair - A Canvas for Agent + Developers Collaboration](https://talkpython.fm/episodes/show/555/marimo-pair-a-canvas-for-agent-developers-collaboration)
- [#556: Updates on Django's Async Story](https://talkpython.fm/episodes/show/556/updates-on-djangos-async-story)

### 🚀 VS Code Insiders Podcast

- [Episode 23: VS Code's Agent Host Protocol Explained with Connor Peet](https://www.vscodepodcast.com/23)

## Repositories

### [mozilla-ai/otari](https://github.com/mozilla-ai/otari)

> Open-source, OpenAI-compatible LLM gateway you run yourself. One endpoint for 40+ providers, with virtual keys, budgets, and usage tracking.

---

As we wrap up this journey together, I want to take a moment to express my gratitude for your reading. If you've enjoyed this issue and would like to help sustain this blog, please consider [starring this blog on github](https://github.com/blueberry-py/blog/stargazers), it would be great motivation for me to keep updating!

Alright, that concludes the July Edition of "This Month for Pythonistas". Thank you again for reading my post and I hope you enjoy it or find something useful. Happy coding and see you in August! 👋
