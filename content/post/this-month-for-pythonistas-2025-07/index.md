+++
title = "This Month for Pythonistas - July 2025"
description = "Python 3.14 RC1, Agentic AI, context engineering and other fun stuff"
slug = "this-month-for-pythonistas-2025-07"
date = 2025-07-31T21:00:00+08:00
authors = ["Zeyang Lin"]
tags = ["python", "cli", "linux", "podcast", "news"]
categories = ["python"]
series = ["this month for pythonistas"]
keywords = ["python", "linux", "podcast", "AI", "LLM", "agent", "mcp"]
image = "title.jpg"
draft = false
+++

```python
from datetime import date

print(date.today().year, date.today().month)
# 2025 7
```

![issue-2025-07](splash.jpg)

Welcome back Pythonistas! I hope you enjoy your summer vacation if you actually have one. But in any case I'm glad to see you back reading the fifth issue of my "This month for Pythonistas" series which curates the news, articles, tutorials, podcasts, and more Python stuff worth noting in this month.

Before we continue, please note that this blog is synced across several platforms:

- [Github Pages](https://blueberry-py.github.io/blog/post/this-month-for-pythonistas-2025-07/)
- [Netlify](https://blueberrypy.netlify.app/post/this-month-for-pythonistas-2025-07/)
- [Render](https://blueberrypy.onrender.com/post/this-month-for-pythonistas-2025-07/)

Ready? Let's get started!

---

## Events & Social

EuroPython 2025 took place in Prague again this year. For those of you who did not attend, there's no official recordings of the talks yet.

## New Versions

### Python 3.14.0 release candidate 1

The first release candidate of Python 3.14 is ready! Source code as well as binary distributions can be found [here](https://www.python.org/downloads/release/python-3140rc1/).

> The second candidate (and the last planned release preview) is scheduled for Tuesday, 2025-08-26, while the official release of 3.14.0 is scheduled for Tuesday, 2025-10-07.

## Tutorials

- Deeplearning.ai's [Post-training of LLMs](https://www.deeplearning.ai/short-courses/post-training-of-llms/) from NexusFlow

> In this course, you’ll learn three common post-training methods—Supervised Fine-Tuning (SFT), Direct Preference Optimization (DPO), and Online Reinforcement Learning (RL)—and how to use each one effectively.

- Deeplearning.ai's [Pydantic for LLM Workflows](https://www.deeplearning.ai/short-courses/pydantic-for-llm-workflows/)

> Use Pydantic to generate structured outputs from LLMs, ensuring the responses follow a specific format that your application can reliably process.

## Articles

- [How global variables work in Python bytecode](https://fromscratchcode.com/blog/how-global-variables-work-in-python-bytecode/)

The blog post explains how global variables work in Python bytecode using the Memphis interpreter built in Rust as an example. It highlights that while the VM doesn't store the names of local variables, it performs dynamic name resolution for global variables, a key aspect of Python's flexibility.

- [Python Backstage • Disassembling Python Code Using the `dis` Module](https://www.thepythoncodingstack.com/p/python-disassembling-bytecode-dis-module)

This article explains how to use Python's `dis` module to view the bytecode generated from a simple script. The bytecode is a low-level representation of the Python code, showing the sequence of operations the Python interpreter performs. For example, the `LOAD_CONST` and `STORE_NAME` instructions represent assigning a constant value to a variable, while the `CALL` instruction indicates a function call.

- [330× faster: Four different ways to speed up your code](https://pythonspeed.com/articles/different-ways-speed/)

The article discusses four ways to accelerate Python code: efficiency improvements by reducing unnecessary calculations, using compilation to optimize performance, leveraging parallelism with multiple CPU cores, and adopting development processes like benchmarking and testing. An example analyzing letter frequency in Jane Austen’s Northanger Abbey demonstrates how combining these methods yields significant speedups, ultimately achieving a 330× faster performance.

- [The Missing Manual for Signals: State Management for Python Developers](https://bui.app/the-missing-manual-for-signals-state-management-for-python-developers/)

The article discusses state management using Signals in Python, highlighting their benefits in handling complex state dependencies and cascading updates. It contrasts Signals with traditional manual approaches, which can lead to bugs and maintenance challenges due to implicit dependencies.

- [Reflections on 2 years of CPython’s JIT Compiler: The good, the bad, the ugly](https://fidget-spinner.github.io/posts/jit-reflections.html)

This blog post discusses the current state of CPython's JIT (Just-In-Time) compiler. The author highlights that while the JIT is still experimental and not always faster than the interpreter, a growing community of contributors is working on improving it. Key areas for improvement include performance and coverage.

- [Getting extensions to work with free-threaded Python](https://lwn.net/Articles/1025893/)

The addition of free-threaded Python allows for better thread scalability, particularly in Python extensions like NumPy. Nathan Goldbaum and Lysandros Nikolaou presented at PyCon US 2025 about the challenges and solutions for migrating the Python ecosystem to support the new free-threaded model, emphasizing the importance of maintaining compatibility with existing C/C++/Rust-based extensions.

- [Tools: Code Is All You Need](https://lucumr.pocoo.org/2025/7/3/tools/)

The author details a method for converting a blog from reStructuredText to Markdown, using an LLM to generate and validate scripts, emphasizing the importance of trust in the automated process. It concludes that while MCP may be useful for certain tasks, it currently faces limitations in composability and context management compared to direct code generation.

- [Wasm-agents: AI agents running in your browser](https://blog.mozilla.ai/wasm-agents-ai-agents-running-in-your-browser/)

The article introduces Wasm-agents, a blueprint for creating AI agents that can run directly in your browser. These agents are packaged as standalone HTML files, utilizing WebAssembly and Pyodide to execute Python scripts and libraries.

- [Learnings from building AI agents](https://www.cubic.dev/blog/learnings-from-building-ai-agents)

The article discusses lessons learned from developing an AI code review agent at Cubic. Initially, the tool was too noisy, generating many false positives and irrelevant comments. Improvements included requiring the AI to explicitly justify its findings, simplifying the toolset to essential components, and employing specialized micro-agents for different tasks. These changes reduced false positives by 51%, improved developer trust, and streamlined the code review process.

- [A Guide For LLM-Assisted Web Research](https://www.lesswrong.com/posts/uAEhvX6scvcZANWwg/a-guide-for-llm-assisted-web-research)

The article reviews various LLMs and web research tools for internet-based research tasks. Overall, standard ChatGPT with web search is recommended for its speed, manageability, and iterative capabilities, while more complex, slower tools are less practical for routine research tasks.

- [Context Engineering](https://blog.langchain.com/context-engineering-for-agents/)

This article discusses "context engineering", which involves providing the right information to agents (like LLMs) within their context window to help them perform tasks effectively. It covers four strategies: write, select, compress, and isolate.

- [Programming as Theory Building: Why Senior Developers Are More Valuable Than Ever](https://cekrem.github.io/posts/programming-as-theory-building-naur/)

The article discusses Peter Naur's 1985 idea that programming is about building a shared theory of how a system works. Source code is just a representation, and critical knowledge is in developers' minds. Today's AI tools and novice developers risk losing this underlying theory, leading to incoherent code and technical debt. Senior developers are now more vital than ever because they preserve and evaluate the theoretical framework, ensuring system coherence and understanding the "why" behind code decisions.

- [Writing Code Was Never The Bottleneck](https://ordep.dev/posts/writing-code-was-never-the-bottleneck)

The article argues that while the creation of code may be sped up by tools like LLMs, the true bottlenecks in software engineering lie in code reviews, testing, debugging, coordination, and communication. These processes, which require deep understanding and collaboration, remain critical and cannot be bypassed.

## Podcasts

### 🥝 core.py

- [The Megahertz](https://podcasters.spotify.com/pod/show/corepy/episodes/The-Megahertz-e35ffoi)

### 🐍 RealPython Podcast

- [Episode 256: Solving Problems and Saving Time in Chemistry With Python](https://realpython.com/podcasts/rpp/256/)
- [Episode 257: Comparing Real-World Python Performance Against Big O](https://realpython.com/podcasts/rpp/257/)
- [Episode 258: Supporting the Python Package Index](https://realpython.com/podcasts/rpp/258/)

### 🥧 Python Bytes Podcast

- [#438 Motivation time](https://pythonbytes.fm/episodes/show/438/motivation-time)
- [#439 That Astral Episode](https://pythonbytes.fm/episodes/show/439/that-astral-episode)
- [#440 Can't Register for VibeCon](https://pythonbytes.fm/episodes/show/440/cant-register-for-vibecon)
- [#441 It's Michaels All the Way Down](https://pythonbytes.fm/episodes/show/441/its-michaels-all-the-way-down)
- [#442 Cloud bills in scientific notation](https://pythonbytes.fm/episodes/show/442/cloud-bills-in-scientific-notation)

### 🦜 Talk Python to me

- [#512: Building a JIT Compiler for CPython](https://talkpython.fm/episodes/show/512/building-a-jit-compiler-for-cpython)
- [#513: Stories from Python History](https://talkpython.fm/episodes/show/513/stories-from-python-history)
- [#514: Python Language Summit 2025](https://talkpython.fm/episodes/show/514/python-language-summit-2025)

### 🍕 Pybites Podcast

- [#194: Evolution, not extinction: why developers still matter in the age of AI](https://www.pybitespodcast.com/1501156/episodes/17416659-194-evolution-not-extinction-why-developers-still-matter-in-the-age-of-ai)
- [#195: Patterns, paradigms, and pythonic thinking with Rodrigo Girão Serrão](https://www.pybitespodcast.com/1501156/episodes/17436411-195-patterns-paradigms-and-pythonic-thinking-with-rodrigo-girao-serrao)
- [#196: Robin Quintero on Complexipy](https://www.pybitespodcast.com/1501156/episodes/17514265-196-robin-quintero-on-complexipy)
- [#197: Polars with Jeroen Janssens and Thijs Nieuwdorp](https://www.pybitespodcast.com/1501156/episodes/17538206-197-polars-with-jeroen-janssens-and-thijs-nieuwdorp)
- [#198: Tim Hopper on UV and smarter Python development](https://www.pybitespodcast.com/1501156/episodes/17574426-198-tim-hopper-on-uv-and-smarter-python-development)

## Repositories

- [huggingface/screenenv](https://github.com/huggingface/screenenv)

blog -> [ScreenEnv: Deploy your full stack Desktop Agent](https://huggingface.co/blog/screenenv)

- [google-gemini/genai-processors](https://github.com/google-gemini/genai-processors)

blog -> [Announcing GenAI Processors: Build powerful and flexible Gemini applications](https://developers.googleblog.com/en/genai-processors/)

---

As we wrap up this journey together, I want to take a moment to express my gratitude for your reading. If you've enjoyed what you just read and would like to help sustain this blog, consider [starring this blog on github](https://github.com/blueberry-py/blog/stargazers), it would be great motivation for me to keep updating the blogs!

Alright, that concludes the fifth issue of "This Month of Pythonistas". Thank you again for reading my post. I hope you enjoy it or find something useful, and see you in August!
