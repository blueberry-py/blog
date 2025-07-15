+++
title = "This Month for Pythonistas - July 2025"
description = "XXX and other fun stuff"
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

Welcome back! TBC

Before we continue, please note that this blog is synced across several platforms:

- [Github Pages](https://linzeyang.github.io/blog/post/this-month-for-pythonistas-2025-07/)
- [Netlify](https://blueberrypy.netlify.app/post/this-month-for-pythonistas-2025-07/)
- [Render](https://blueberrypy.onrender.com/post/this-month-for-pythonistas-2025-07/)

Ready? Let's get started!

---

## Events & Social

EuroPython 2025 took place in Prague again this year.

## New Versions

### Python 3.14.0 beta 4

The fourth and last beta release of 3.14 is here! Source code as well as binary distributions can be found [here](https://www.python.org/downloads/release/python-3140b4/).

## Tutorials

- Deeplearning.ai's [Post-training of LLMs](https://www.deeplearning.ai/short-courses/post-training-of-llms/) from NexusFlow

> In this course, you’ll learn three common post-training methods—Supervised Fine-Tuning (SFT), Direct Preference Optimization (DPO), and Online Reinforcement Learning (RL)—and how to use each one effectively.

## Articles

- [330× faster: Four different ways to speed up your code](https://pythonspeed.com/articles/different-ways-speed/)

The article discusses four ways to accelerate Python code: efficiency improvements by reducing unnecessary calculations, using compilation to optimize performance, leveraging parallelism with multiple CPU cores, and adopting development processes like benchmarking and testing. An example analyzing letter frequency in Jane Austen’s Northanger Abbey demonstrates how combining these methods yields significant speedups, ultimately achieving a 330× faster performance.

- [The Missing Manual for Signals: State Management for Python Developers](https://bui.app/the-missing-manual-for-signals-state-management-for-python-developers/)

The article discusses state management using Signals in Python, highlighting their benefits in handling complex state dependencies and cascading updates. It contrasts Signals with traditional manual approaches, which can lead to bugs and maintenance challenges due to implicit dependencies.

- [Reflections on 2 years of CPython’s JIT Compiler: The good, the bad, the ugly](https://fidget-spinner.github.io/posts/jit-reflections.html)

...

- [Getting extensions to work with free-threaded Python](https://lwn.net/Articles/1025893/)

...

- [Tools: Code Is All You Need](https://lucumr.pocoo.org/2025/7/3/tools/)

...

- [Wasm-agents: AI agents running in your browser](https://blog.mozilla.ai/wasm-agents-ai-agents-running-in-your-browser/)

...

- [Learnings from building AI agents](https://www.cubic.dev/blog/learnings-from-building-ai-agents)

The article discusses lessons learned from developing an AI code review agent at Cubic. Initially, the tool was too noisy, generating many false positives and irrelevant comments. Improvements included requiring the AI to explicitly justify its findings, simplifying the toolset to essential components, and employing specialized micro-agents for different tasks. These changes reduced false positives by 51%, improved developer trust, and streamlined the code review process.

- [A Guide For LLM-Assisted Web Research](https://www.lesswrong.com/posts/uAEhvX6scvcZANWwg/a-guide-for-llm-assisted-web-research)

The article reviews various LLMs and web research tools for internet-based research tasks. Overall, standard ChatGPT with web search is recommended for its speed, manageability, and iterative capabilities, while more complex, slower tools are less practical for routine research tasks.

- [Context Engineering](https://blog.langchain.com/context-engineering-for-agents/)

...

- [Stop Building AI Agents](https://decodingml.substack.com/p/stop-building-ai-agents)

...

- [Programming as Theory Building: Why Senior Developers Are More Valuable Than Ever](https://cekrem.github.io/posts/programming-as-theory-building-naur/)

The article discusses Peter Naur's 1985 idea that programming is about building a shared theory of how a system works. Source code is just a representation, and critical knowledge is in developers' minds. Today's AI tools and novice developers risk losing this underlying theory, leading to incoherent code and technical debt. Senior developers are now more vital than ever because they preserve and evaluate the theoretical framework, ensuring system coherence and understanding the "why" behind code decisions.

- [Writing Code Was Never The Bottleneck](https://ordep.dev/posts/writing-code-was-never-the-bottleneck)

...

## Podcasts

### 🥝 core.py

- [The Megahertz](https://podcasters.spotify.com/pod/show/corepy/episodes/The-Megahertz-e35ffoi)

### 🐍 RealPython Podcast

- [Episode 256: Solving Problems and Saving Time in Chemistry With Python](https://realpython.com/podcasts/rpp/256/)
- [Episode 257: Comparing Real-World Python Performance Against Big O](https://realpython.com/podcasts/rpp/257/)

### 🥧 Python Bytes Podcast

- [#438 Motivation time](https://pythonbytes.fm/episodes/show/438/motivation-time)
- [#439 That Astral Episode](https://pythonbytes.fm/episodes/show/439/that-astral-episode)

### 🦜 Talk Python to me

- [#512: Building a JIT Compiler for CPython](https://talkpython.fm/episodes/show/512/building-a-jit-compiler-for-cpython)
- [#513: Stories from Python History](https://talkpython.fm/episodes/show/513/stories-from-python-history)

### 🍕 Pybites Podcast

- [#194: Evolution, not extinction: why developers still matter in the age of AI](https://www.pybitespodcast.com/1501156/episodes/17416659-194-evolution-not-extinction-why-developers-still-matter-in-the-age-of-ai)

## Repositories

- [huggingface/screenenv](https://github.com/huggingface/screenenv)

blog -> [ScreenEnv: Deploy your full stack Desktop Agent](https://huggingface.co/blog/screenenv)

- [google-gemini/genai-processors](https://github.com/google-gemini/genai-processors)

blog -> [Announcing GenAI Processors: Build powerful and flexible Gemini applications](https://developers.googleblog.com/en/genai-processors/)

## Have time for some fun?

...

---

As we wrap up this journey together, I want to take a moment to express my gratitude for your reading. If you've enjoyed what you just read and would like to help sustain this blog, consider [starring this blog on github](https://github.com/linzeyang/blog/stargazers), it would be great motivation for me to keep updating the blogs!

Alright, that concludes the fifth issue of "This Month of Pythonistas". Thank you again for reading my post. I hope you enjoy it or find something useful, and see you in August!
