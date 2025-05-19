+++
title = "This Month for Pythonistas - May 2025"
description = "PyCon US, MS Build, Python 3.14 beta 1, and more"
slug = "this-month-for-pythonistas-2025-05"
date = 2025-05-31T15:00:00+08:00
authors = ["Zeyang Lin"]
tags = ["python", "cli", "linux", "windows", "news"]
categories = ["python"]
series = ["this month for pythonistas"]
keywords = ["python", "pypi", "pycon", "linux", "github", "podcast", "AI", "LLM"]
image = "title.webp"
draft = false
+++

```python
from datetime import date

print(date.today().year, date.today().month)
# 2025 5
```

![issue-2025-05](splash.webp)

Welcome back! TBD

Before we continue, please note that this blog is synced across several platforms:

- [Github Pages](https://linzeyang.github.io/blog/post/this-month-for-pythonistas-2025-05/)
- [Netlify](https://blueberrypy.netlify.app/post/this-month-for-pythonistas-2025-05/)
- [Render](https://blueberrypy.onrender.com/post/this-month-for-pythonistas-2025-05/)

Ready? Let's get started!

---

## Events & Social

### PyCon US 2025

...

### Microsoft Build 2025

...

### Google I/O 2025

...

### Announcing the PyTorch Docathon 2025

[This docathon](https://pytorch.org/blog/docathon-2025/) is a hackathon-style event aimed at enhancing PyTorch documentation with the support of the community.

### Python Documentary

A documentary about Python is coming.

![bluesky-python-documentary](bsky_post_py_docu.jpeg)

## New versions

### Python 3.14.0 beta 1

The first of four planned beta releases of 3.14 is here! Source code as well as binary distributions can be found on the [download page](https://www.python.org/downloads/release/python-3140b1/).

### wagtail 7.0 LTS

This is a major update and the first ever LTS release of Wagtail, which aligns with Django 5.2 LTS.

For more check their blog post [Flying into a new era with Wagtail 7.0](https://wagtail.org/blog/wagtail-70/).

### redis-py 6.1

...

## Tutorials

- DeepLearning.ai's [LLMs as Operating Systems: Agent Memory](https://www.deeplearning.ai/short-courses/llms-as-operating-systems-agent-memory/) from Letta

> Learn how to build agentic memory into your applications in this short course, LLMs as Operating Systems: Agent Memory, created in partnership with Letta, and taught by its founders Charles Packer and Sarah Wooders.

- DeepLearning.ai's [Building AI Voice Agents for Production](https://www.deeplearning.ai/short-courses/building-ai-voice-agents-for-production/)

> In this course, you’ll learn how to build voice agents that listen, reason, and respond naturally. You’ll follow the architecture used to create Andrew Avatar, a collaborative project between DeepLearning.AI and RealAvatar that responds to users in Andrew Ng’s voice.

- DeepLearning.ai's [MCP: Build Rich-Context AI Apps with Anthropic](https://www.deeplearning.ai/short-courses/mcp-build-rich-context-ai-apps-with-anthropic/)

> Explore how MCP standardizes access to tools and data for AI applications, its underlying architecture, and how it simplifies the integration of new tools and connections to external systems.

- RealPython's [Modern Web Automation With Python and Selenium](https://realpython.com/modern-web-automation-with-python-and-selenium/)

This tutorial introduces modern web automation using Python and Selenium, focusing on practical techniques for navigating and interacting with web pages. It explains how to navigate web pages, locate elements within the DOM, and interact with them through clicks, keystrokes, and form submissions.

- RealPython's [Managing Python Projects With uv: An All-in-One Solution](https://realpython.com/python-uv/)

`uv` is designed to streamline workflows by providing an all-in-one solution that integrates installation, package management, and environment setup. The guide covers how to install uv using a standalone installer or through other package managers, and demonstrates its use cases in managing complex projects.

## Articles

- [PEP 773 – A Python Installation Manager for Windows](https://peps.python.org/pep-0773/)

PEP 773 is **accepted**.

- [PEP 784 – Adding Zstandard to the standard library](https://peps.python.org/pep-0784/)

PEP 784 is **accepted**.

- [Unravelling t-strings](https://snarky.ca/unravelling-t-strings/)

T-strings expose the parser used for f-strings, allowing introspection of the parts inside the curly braces. Brett demonstrates how to replicate f-string behavior using Python code to parse and format the components (value, conversion, and format spec) of t-strings. This parsing helps understand how expressions inside f-strings are evaluated and formatted internally.

- [Takeaways from DjangoCon EU 2025](https://www.zachbellay.com/posts/djangocon-eu-2025/)

The article summarizes key takeaways from DjangoCon EU 2025 in Dublin, highlighting the community's enthusiasm and valuable technical insights. Topics include database management techniques such as row locking with select_for_update, moving to BigInt primary keys, and partitioning large tables for performance. It also covers optimization strategies like reducing PostgreSQL index sizes significantly by using partial indexes.

- [PyTorch: The Open Language of AI](https://pytorch.org/blog/pytorch-the-open-language-of-ai/)

PyTorch has evolved from a framework focused on AI research to supporting production, deep AI compilation and has become foundational to thousands of projects and companies in the AI ecosystem. The PyTorch Foundation is expanding to be an umbrella organization and will now house some of the most popular and highly complementary projects making it easier for users to build AI at scale.

- [The first year of free-threaded Python](https://labs.quansight.org/blog/free-threaded-one-year-recap)

The first year of free-threaded Python has seen significant progress in enabling Python to fully utilize multicore CPUs and GPUs by removing the Global Interpreter Lock (GIL). Major packages and tools like NumPy, SciPy, Cython, and setuptools have been updated to support the free-threaded build. While many packages still require auditing and fixes for thread safety, the ecosystem has improved considerably.

- [Asyncio Demystified: Rebuilding it From Scratch One Yield at a Time](https://dev.indooroutdoor.io/asyncio-demystified-rebuilding-it-from-scratch-one-yield-at-a-time)

...

- [A Critical Look at MCP](https://raz.sh/blog/2025-05-02_a_critical_look_at_mcp)

...

- [MCP is a powerful new AI coding technology: Understand the risks](https://www.reversinglabs.com/blog/mcp-powerful-ai-coding-risk)

While MCP offers powerful capabilities, it poses significant security risks because it is not secure by default. Experts warn that deploying MCP in production environments without robust safeguards is risky. However, ongoing efforts from industry and security researchers aim to enhance MCP’s security, making it a promising but still maturing technology.

## Podcasts

### 🥝 core.py

- [Episode 22: Beta Frenzy](https://open.spotify.com/episode/5ZTwjntjAM3230I86ylKgi)

### DjangoChat

- [DjangoCon Europe 2025 Recap](https://djangochat.com/episodes/djangocon-europe-2025-recap)

### 🐍 RealPython Podcast

- [Episode 248: Experiments With Gen AI, Knowledge Graphs, Workflows, and Python](https://realpython.com/podcasts/rpp/248/)

### 🥧 Python Bytes Podcast

- [#431 Nerd Gas](https://pythonbytes.fm/episodes/show/431/nerd-gas)

### 🦜 Talk Python to me

- [#504: Developer Trends in 2025](https://talkpython.fm/episodes/show/504/developer-trends-in-2025)
- [#505: t-strings in Python (PEP 750)](https://talkpython.fm/episodes/show/505/t-strings-in-python-pep-750)

### 🍕 Pybites Podcast

- [#189: The Year of Oui: Huy Nguyen on Connection, Community and Showing Up](https://www.pybitespodcast.com/1501156/episodes/17100578-189-the-year-of-oui-huy-nguyen-on-connection-community-and-showing-up)

## Repositories

- [facebook/pyrefly](https://github.com/facebook/pyrefly) (MIT)

...

- [astral-sh/ty](https://github.com/astral-sh/ty) (MIT)

...

## Have time for some fun?

- Gears of War: Reloaded Comes to Xbox Series, PlayStation 5 and Steam this August

![gears-of-war-reloaded-announced](https://xboxwire.thesourcemediaassets.com/sites/2/2025/05/GoW_Reloaded_Keyart_4K-97bf0e7a9de7dc68b771-scaled.jpg)

This is a Remastered version of the first ever game in its franchise, featuring 4K/60FPS in the Campaign with HDR, Dolby Atmos, cross-platform play, etc. Those who own the digital version of Gears of War: Ultimate Edition would receive a free upgrade to Gears of War: Reloaded.

Read more on [xbox.com](https://news.xbox.com/en-us/2025/05/05/gears-of-war-reloaded-release-date/).

---

As we wrap up this journey together, I want to take a moment to express my gratitude for your reading. If you've enjoyed what you just read and would like to help sustain this blog, consider [starring this blog on github](https://github.com/linzeyang/blog/stargazers), it would be great motivation for me to keep updating the blogs!

Alright, that concludes the third issue of "This Month of Pythonistas". Thank you again for reading my post. I hope you enjoy it or find something useful, and see you in June!
