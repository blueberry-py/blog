+++
title = "This Month for Pythonistas - September 2025"
description = "Python 3.14 RC3 and other fun stuff"
slug = "this-month-for-pythonistas-2025-09"
date = 2025-09-30T21:00:00+08:00
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
# 2025 9
```

![issue-2025-09](splash.jpg)

Welcome back Pythonistas! I'm glad to see you back reading the seventh issue of my "This month for Pythonistas" series which curates the news, articles, tutorials, podcasts, and more Python stuff worth noting in this month.

Before we continue, please note that this blog is synced across several platforms:

- [Github Pages](https://blueberry-py.github.io/blog/post/this-month-for-pythonistas-2025-09/)
- [Netlify](https://blueberrypy.netlify.app/post/this-month-for-pythonistas-2025-09/)
- [Render](https://blueberrypy.onrender.com/post/this-month-for-pythonistas-2025-09/)

Ready? Let's get started!

---

## Events & Social

- DjangoCon US 2025 was held in Chicago, United States.

- PyCon UK 2025 was held in Manchester, England.

- PyCon China 2025 was held in Shanghai, China.

## New Versions

### Python 3.14 RC3

This is the final release preview before 3.14 final, which is scheduled for Tuesday, 2025-10-07.

Source tarball and binary releases are available [here](https://www.python.org/downloads/release/python-3140rc3/).

## Tutorials

- Deeplearning.ai's [Knowledge Graphs for AI Agent API Discovery](https://www.deeplearning.ai/short-courses/knowledge-graphs-for-ai-agent-api-discovery/) from SAP

> You’ll implement API discovery that starts with semantic retrieval to reduce the API selection space, then adds APIs connected by business-process edges. The result is a small, relevant subset of APIs that includes the information about the process sequence the agent should follow.

- Deeplearning.ai's [Build AI Apps with MCP Servers: Working with Box Files](https://www.deeplearning.ai/short-courses/build-ai-apps-with-mcp-server-working-with-box-files/) from Box

> Build an LLM-powered invoice app that processes local PDF invoices to extract fields such as client name, total amount, and purchased product, and generates per-client reports.

- DeepLearning.ai's [Building and Evaluating Data Agents](https://www.deeplearning.ai/short-courses/building-and-evaluating-data-agents/) from snowflake

> You’ll know how to build, trace, and evaluate a multi-agent workflow that plans tasks, pulls context from structured and unstructured data, performs web search, and summarizes or visualizes the final results.

- [Guide to Agentic AI – Build a Python Coding Agent with Gemini](https://www.youtube.com/watch?v=YtHdaXuOAks)

> This project-based tutorial provides a deep understanding of how powerful AI tools work by guiding you through the creation of an agentic loop powered by tool calling. You will implement the core abilities for your agent to interact with and modify a codebase, including reading files, writing to files, and executing code to get feedback.

## Articles

- [Python has had async for 10 years -- why isn't it more popular?](https://tonybaloney.github.io/posts/why-isnt-python-async-more-popular.html)

Python's `async` / `await` (introduced 2015) remains niche due to limited I/O use cases (excludes disk ops, reliant on GIL), fragmented ecosystem (Flask/Django's patchy async adoption, duplicated sync/async APIs), and testing complexity. `FastAPI`'s rise indicates async success in web contexts, but 3.14's free-threading/sub-interpreter features may reduce async reliance.

- [Python: fix `SyntaxWarning: 'return' in a 'finally' block`](https://adamj.eu/tech/2025/08/29/python-fix-syntaxwarning-finally/)

Python 3.14+ warns about `return`/`break`/`continue` in `finally` blocks (PEP 765) as they override preceding flow control. Always returns the `finally` block's value, causing silent bugs. Fix it by restructuring code to avoid these keywords in `finally` blocks—move `return`s to `except` blocks or remove unnecessary exception handling.

- [Building your own CLI Coding Agent with Pydantic-AI](https://martinfowler.com/articles/build-own-coding-agent.html)

This article details building a custom CLI coding agent using Pydantic-AI and Model Context Protocol. Unlike commercial tools, a custom agent can be tailored to specific project needs, understanding project context and conventions. The agent combines Claude with specialized MCP servers for testing, code execution, documentation access, internet search, and file operations. Through incremental capabilities—from simple test running to full codebase management—the agent evolves into an intelligent development partner that maintains context, provides structured reasoning, and can autonomously debug and implement solutions.

- [Static Sites with Python, uv, Caddy, and Docker](https://nkantar.com/blog/2025/08/static-python-uv-caddy-docker/)

This blog post explains the author's deployment stack for Python-built static sites using `uv`, `Caddy`, and Docker. The author details a multi-stage Docker build approach: first stage uses `uv` with Python 3.13 to build the site, second stage uses `Caddy`'s Alpine image to serve static files. The setup includes custom `Caddy` configurations for reverse proxying analytics and handling custom error pages, domains, and content types.

- [Where to Host a Python Web App](https://judoscale.com/blog/where-to-host-python-app)

The article compares hosting options for Python web apps, recommending Heroku for non-Docker apps due to its excellent developer experience. Render offers a cheaper Heroku alternative, while Fly.io is usually the cheapest but requires more configuration. AWS ECS suits AWS-experienced users, and self-hosting is only viable with dedicated ops teams. Docker usage significantly impacts hosting choice. The author strongly recommends autoscaling regardless of platform choice, with Heroku being their top pick when prioritizing developer experience and reliability.

- [AI-Assisted Development: A Three-Act Play](https://betweentheprompts.com/three-act-play/)

The article presents three distinct approaches to AI-assisted software development: "Vibe Coding" (AI builds apps through chat iterations), "Copilot" (AI assists with planned code sections requiring human review), and "HUD" (AI serves as an intelligent code-completion tool). Author explains these methods aren't mutually exclusive but suited for different tasks—designers prefer vibe-coding for rapid prototypes while developers use HUD (Cursor's Tab) for production code.

- [Parallel AI Agents Are a Game Changer](https://morningcoffee.io/parallel-ai-agents-are-a-game-changer.html)

Parallel AI agents represent a major shift in software development, allowing multiple AI agents (like GitHub Copilot) to work simultaneously on different tasks. Instead of coding one feature at a time, developers can assign 10-20 issues to agents working in parallel, then focus on reviewing and refining their output.Success requires good system documentation, fast CI/CD, monorepo architecture, and skills in problem decomposition and code review rather than line-by-line coding.

- [Writing effective tools for agents — with agents](https://www.anthropic.com/engineering/writing-tools-for-agents)

The post explains how to create effective tools for AI agents using an evaluation-driven approach. Key insights include: building targeted tools for specific workflows rather than generic APIs, using clear namespacing to avoid confusion, returning meaningful context efficiently, and optimizing for token usage. The authors recommend prototyping quickly, creating comprehensive evaluations with real-world tasks, and collaborating with Claude itself to iteratively improve tool performance. Best practices involve designing tools that mirror human problem-solving while providing rich functionality under the hood.

- [Building Agents with the Claude Agent SDK](https://www.anthropic.com/engineering/building-agents-with-the-claude-agent-sdk)

The Claude Code SDK is now Claude Agent SDK. It helps developers build powerful autonomous agents using Claude. The framework operates on a feedback loop: gather context → take action → verify work → repeat. Key features include agentic search, tools/actions, subagents, MCP integrations, code generation, and verification methods.

## Podcasts

### 🐍 RealPython Podcast

- [Episode 264: Large Language Models on the Edge of the Scaling Laws](https://realpython.com/podcasts/rpp/264/)
- [Episode 265: Python App Hosting Choices & Documenting Python's History](https://realpython.com/podcasts/rpp/265/)
- [Episode 266: Dangers of Automatically Converting a REST API to MCP](https://realpython.com/podcasts/rpp/266/)
- [Episode 267: Managing Feature Flags & Comparing Python Visualization Libraries](https://realpython.com/podcasts/rpp/267/)

### 🥧 Python Bytes Podcast

- [#447 Going down a rat hole](https://pythonbytes.fm/episodes/show/447/going-down-a-rat-hole)
- [#448 I'm Getting the BIOS Flavor](https://pythonbytes.fm/episodes/show/448/im-getting-the-bios-flavor)
- [#449 Suggestive Trove Classifiers](https://pythonbytes.fm/episodes/show/449/suggestive-trove-classifiers)
- [#450 At-Cost Agentic IDE Tooling](https://pythonbytes.fm/episodes/show/450/at-cost-agentic-ide-tooling)
- [#451 Databases are a Fad](https://pythonbytes.fm/episodes/show/451/databases-are-a-fad)

### 🦜 Talk Python to me

- [#518: Celebrating Django's 20th Birthday With Its Creators](https://talkpython.fm/episodes/show/518/celebrating-djangos-20th-birthday-with-its-creators)
- [#519: Data Science Cloud Lessons at Scale](https://talkpython.fm/episodes/show/519/data-science-cloud-lessons-at-scale)
- [#520: pyx - the other side of the uv coin (announcing pyx)](https://talkpython.fm/episodes/show/520/pyx-the-other-side-of-the-uv-coin-announcing-pyx)
- [#521: Red Teaming LLMs and GenAI with PyRIT](https://talkpython.fm/episodes/show/521/red-teaming-llms-and-genai-with-pyrit)

### 🍕 Pybites Podcast

- [#202: Behind the scenes at Pybites with Bob and Julian](https://www.pybitespodcast.com/1501156/episodes/17830911-202-behind-the-scenes-at-pybites-with-bob-and-julian)

### VS Code Insiders Podcast

- [Episode 3: Building a MCP to Build VS Code & The Impact of AI on Kent C. Dodds](https://www.vscodepodcast.com/3)
- [Episode 4: Language Model Chat Provider (aka BYOK) API with Logan Ramos](https://www.vscodepodcast.com/4)
- [Episode 5: Life of a VS Code SWE Intern with Christy Nguyen](https://www.vscodepodcast.com/5)
- [Episode 6: The Future of Coding Agents in VS Code](https://www.vscodepodcast.com/6)
- [Episode 7: The Origins & Evolution of the GitHub MCP Registry](https://www.vscodepodcast.com/7)

## Repositories

- [langchain-ai/open-swe](https://github.com/langchain-ai/open-swe) (MIT)

OpenSWE is an open-source, cloud-based asynchronous coding agent built with LangGraph. It autonomously understand codebases, plans solutions, and executes code changes across repositories - creating issues and pull requests automatically. Features include human-in-the-loop feedback, parallel execution, and can be launched via web UI or GitHub issues with the "open-swe" label.

- [google-agentic-commerce/AP2](https://github.com/google-agentic-commerce/AP2) (Apache 2.0)

Agent Payments Protocol (AP2) is Google's initiative for secure, interoperable AI-driven payments. This repository provides code samples and demos using ADK and Gemini, with Python/Android scenarios for shopping agents. Features setup instructions, quickstart guides, and authentication via Google API Key or Vertex AI.

- [deepseek-ai/DeepSeek-V3.2-Exp](https://huggingface.co/deepseek-ai/DeepSeek-V3.2-Exp)

As an intermediate step toward DeepSeek's next-generation architecture, V3.2-Exp builds upon V3.1-Terminus by introducing DeepSeek Sparse Attention—a sparse attention mechanism designed to explore and validate optimizations for training and inference efficiency in long-context scenarios.

---

## Have time for some fun?

Tokyo Game Show 2025 took place from September 25-28, 2025, featuring numerous major game announcements and reveals across various platforms.

Major Xbox Announcements:

- Forza Horizon 6: The highly anticipated racing game was officially revealed
- Gungrave G.O.R.E Blood Heat: A new entry in the action series
- 007: First Light: A James Bond title
- Aniimo: A rhythm-based game
- Double Dragon: Revive: The classic franchise returns
- Hotel Barcelona: An adventure game
- Rhythm Doctor: A music/rhythm game
- Hitman: New content or entry in the franchise

Capcom Presentations:

- Pragmata: Updates revealed for this highly anticipated title
- Street Fighter 6: Continued support and new content
- Other Capcom franchises received updates or reveals

---

As we wrap up this journey together, I want to take a moment to express my gratitude for your reading. If you've enjoyed what you just read and would like to help sustain this blog, consider [starring this blog on github](https://github.com/blueberry-py/blog/stargazers), it would be great motivation for me to keep updating the blogs!

Alright, that concludes the September Edition of "This Month of Pythonistas". Thank you again for reading my post. I hope you enjoy it or find something useful. Happy coding and see you in October!
