+++
title = "This Month for Pythonistas - August 2025"
description = "Python 3.14 RC2, OpenAI open models, Agentic AI and other fun stuff"
slug = "this-month-for-pythonistas-2025-08"
date = 2025-08-31T21:00:00+08:00
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
# 2025 8
```

![issue-2025-08](splash.jpg)

Welcome back Pythonistas! I hope you enjoy your summer vacation if you actually have one. But in any case I'm glad to see you back reading the sixth issue of my "This month for Pythonistas" series which curates the news, articles, tutorials, podcasts, and more Python stuff worth noting in this month.

Before we continue, please note that this blog is synced across several platforms:

- [Github Pages](https://blueberry-py.github.io/blog/post/this-month-for-pythonistas-2025-08/)
- [Netlify](https://blueberrypy.netlify.app/post/this-month-for-pythonistas-2025-08/)
- [Render](https://blueberrypy.onrender.com/post/this-month-for-pythonistas-2025-08/)

Ready? Let's get started!

---

## Events & Social

## New Versions

### Python 3.13.6

...

### Python 3.14 RC2

...

## Tutorials

- DeepLearning.ai's [Claude Code: A Highly Agentic Coding Assistant](https://www.deeplearning.ai/short-courses/claude-code-a-highly-agentic-coding-assistant/) from Anthropic

> In this course, you’ll learn best practices for using Claude Code to improve your coding workflow. You’ll learn key tips on how to provide Claude Code with clear context, such as specifying the relevant files, clearly defining the features and functionality, and connecting Claude Code to MCP servers.

- [Fast Prototyping of GenAI Apps with Streamlit](https://www.coursera.org/learn/fast-prototyping-of-genai-apps-with-streamlit)

> Build and iterate GenAI apps in hours instead of days! Start with a simple chatbot, then add prompt engineering and RAG powered by Snowflake’s secure data and LLM services, then push your prototype to Snowflake or Streamlit Community Cloud for instant feedback and quick improvement.

- RealPython's [What Are Mixin Classes in Python?](https://realpython.com/python-mixin/)

> Mixins offer a powerful way to reuse code across multiple Python classes without forcing them into a rigid inheritance hierarchy. Instead of building deep and brittle class trees, you can use mixins to share common behaviors in a modular and flexible way.

## Articles

- [How Python Grew From a Language to a Community](https://thenewstack.io/how-python-grew-from-a-language-to-a-community/)

...

- [asyncio: a library with too many sharp corners](https://sailor.li/asyncio)

...

- [From Async/Await to Virtual Threads](https://lucumr.pocoo.org/2025/7/26/virtual-threads/)

In this post Armin Ronacher explores the concept of virtual threads and structured concurrency as a way to simplify concurrent programming, especially in Python. It contrasts traditional async/await models with the idea of virtual threads managed in thread groups, where parallel tasks are spawned and automatically managed with cancellation and error propagation.

- [Agentic Coding Things That Didn’t Work](https://lucumr.pocoo.org/2025/7/30/things-that-didnt-work/)

This is another post from Armin Ronacher in which Armin discusses various approaches and tools to improve workflow automation with LLMs but found ineffective. It is highlighted that clear, manual instruction often outperforms elaborate automations. They caution that over-reliance on automation leads to mental disengagement and reduced code quality, emphasizing the importance of active review and critical thinking.

- [Building MCP PyExec: Secure Python Execution Server with Docker & Authentication](https://objectgraph.com/blog/building-mcp-pyexec-python-execution-server/)

The blog details building MCP PyExec, a secure Python execution server using the Model Context Protocol (MCP). It covers three components: the PyExec server implementing MCP for streaming Python code execution; an OAuth 2.0 Identity Provider (IDP) for secure authentication supporting authorization code flow, JWT, and token validation; and a PyExec client for testing and interaction that manages OAuth tokens and streaming results.

- [Introducing gpt-oss](https://openai.com/index/introducing-gpt-oss/)

OpenAI has released their first open-weight models since GPT-2 - `gpt-oss-120b` and `gpt-oss-20b` - under Apache 2.0 license.

- [Why Observability Isn’t Just for SREs (and How Devs Can Get Started)](https://signoz.io/blog/why-observability-isnt-just-for-sres/)

This blog post serves as a guide for developers to understand the importance of observability and provides a playbook for integrating it into their workflow. Observability helps developers maintain cleaner code, manage systems better, and reduce technical debt by considering more edge cases and improving debugging processes.

- [Full-breadth Developers](https://justin.searls.co/posts/full-breadth-developers/)

The author discusses how the rise of generative AI is transforming the software industry, creating opportunities for full-breadth developers—those with both technical and product skills. These developers are excelling due to their ability to leverage new tools effectively, enabling them to complete tasks much faster.

- [AI is a Floor Raiser, not a Ceiling Raiser](https://elroy.bot/blog/2025/07/29/ai-is-a-floor-raiser-not-a-ceiling-raiser.html)

The article discusses how AI reshapes the learning curve by meeting learners at their skill levels, making initial learning stages easier. However, mastery remains challenging due to AI's limitations in handling advanced or controversial topics. It also highlights the potential for cheating, where relying solely on AI can lead to a plateau in skills.

- [Vibe code is legacy code](https://blog.val.town/vibe-code)

This blog highlights that vibe coding quickly generates tech debt as the produced code often becomes legacy code—difficult to understand or maintain. Vibe coding works well for prototypes and throwaway projects but is risky for large, maintainable systems, especially if done by non-programmers. Serious coding with AI requires caution, thorough understanding, and careful maintenance. The author emphasizes that while AI changes programming, deep technical knowledge and theory-building remain essential.

## Podcasts

### 🥝 core.py

- [The Megahertz](https://podcasters.spotify.com/pod/show/corepy/episodes/The-Megahertz-e35ffoi)

### 🐍 RealPython Podcast

- [Episode 259: Design Patterns That Don't Translate to Python](https://realpython.com/podcasts/rpp/259/)
- [Episode 260: Harnessing the Power of Python Polars](https://realpython.com/podcasts/rpp/260/)

### 🥧 Python Bytes Podcast

- [#443 Patching Multiprocessing](https://pythonbytes.fm/episodes/show/443/patching-multiprocessing)
- [#444 Begone Python of Yore!](https://pythonbytes.fm/episodes/show/444/begone-python-of-yore)

### 🦜 Talk Python to me

- [#515: Durable Python Execution with Temporal](https://talkpython.fm/episodes/show/515/durable-python-execution-with-temporal)

### 🍕 Pybites Podcast

- [#199: Charlie Marsh on ty, uv, and the Python tooling renaissance](https://www.pybitespodcast.com/1501156/episodes/17587007-199-charlie-marsh-on-ty-uv-and-the-python-tooling-renaissance)

## Repositories

- [jd-opensource/oxygent](https://github.com/jd-opensource/oxygent) (Apache 2.0)

This is a 100% Python framework from [JD](www.jd.com) retail department for building Multi-Agent Systems, which unifies tools, models, and agents into modular components. Check more at their [project website](https://oxygent.jd.com/).

- [google/langextract](https://github.com/google/langextract) (Apache 2.0)

This is a Python library from Google which uses LLMs to extract structured information from unstructured text documents based on user-defined instructions.

- [nottelabs/notte](https://github.com/nottelabs/notte) (Server Side Public License)

...

- [langdiff](https://github.com/globalaiplatform/langdiff) (Apache 2.0)

...

- [mcp-use](https://github.com/mcp-use/mcp-use) (MIT)

This is a Python library that provides a simple way to connect any LLM to any MCP server and build custom MCP agents that have tool access, without using closed source or application clients.

- [openai/gpt-oss](https://github.com/openai/gpt-oss) (Apache 2.0)

This is the repository as part of OpenAI's GPT-OSS, which provides a set of code implementations including a `gpt-oss` Python library, `harmony`, and more.

- [KittenTTS](https://github.com/KittenML/KittenTTS) (Apache 2.0)

This is the accompanying Python library for KittenTTS, an open-source realistic text-to-speech model with just 15 million parameters which can run without a GPU.

---

As we wrap up this journey together, I want to take a moment to express my gratitude for your reading. If you've enjoyed what you just read and would like to help sustain this blog, consider [starring this blog on github](https://github.com/blueberry-py/blog/stargazers), it would be great motivation for me to keep updating the blogs!

Alright, that concludes the sixth issue of "This Month of Pythonistas". Thank you again for reading my post. I hope you enjoy it or find something useful, and see you in September!
