+++
title = 'This Month for Pythonistas - April 2025'
description = "A monthly update on Python and other fun stuff"
slug = "this-month-for-pythonistas-2025-04"
date = 2025-04-30T15:00:00+08:00
authors = ["Zeyang Lin"]
tags = ["python", "cli", "linux", "windows", "news"]
categories = ["python"]
series = ["this month for pythonistas"]
keywords = ["python", "pypi", "linux", "github", "podcast", "AI", "LLM"]
image = "title.webp"
draft = false
+++

```python
from datetime import date

print(date.today().year, date.today().month)
# 2025 4
```

![issue-2025-04](splash.webp)

Welcome back! TBD

Before we continue, please note that this blog is synced across several platforms:

- [Github Pages](https://linzeyang.github.io/blog/post/this-month-for-pythonistas-2025-04/)
- [Netlify](https://blueberrypy.netlify.app/post/this-month-for-pythonistas-2025-04/)
- [Render](https://blueberrypy.onrender.com/post/this-month-for-pythonistas-2025-04/)

Ready? Let's get started!

---

## Events & Social

### DjangoCon Europe 2025

Dublin, Ireland is the host city of this year's DjangoCon Europe, which is held from April 23rd to 27th, 2025.

[djangocon europe website](https://2025.djangocon.eu/)

### Microsoft turns 50

Like it or not, Microsoft had remarkable influence over the past decades and is still making a big impact right at the moment. This year it celebrates its [50th anniversary](https://unlocked.microsoft.com/50th/).

### GvR BDFL (🤡 April Fools 🤡)

<blockquote class="bluesky-embed" data-bluesky-uri="at://did:plc:sfrl4dmvaxeq4lqgaucotygo/app.bsky.feed.post/3llr34uismc2y" data-bluesky-cid="bafyreihuvskxhzkwxhqttm3hjsika6nksayqnf7rbuk23akdrwox2nn3qm" data-bluesky-embed-color-mode="system"><p lang="en">BREAKING! Guido van Rossum, the legendary creator of #Python, has officially reinstated himself as Benevolent Dictator for Life (BDFL).

Feat. Guido van Rossum, @pumpichank.bsky.social, @snarky.ca and @mariatta.ca

Stay tuned for the documentary coming this summer!

www.youtube.com/watch?v=wgxB...<br><br><a href="https://bsky.app/profile/did:plc:sfrl4dmvaxeq4lqgaucotygo/post/3llr34uismc2y?ref_src=embed">[image or embed]</a></p>&mdash; Python Software Foundation (<a href="https://bsky.app/profile/did:plc:sfrl4dmvaxeq4lqgaucotygo?ref_src=embed">@python.org</a>) <a href="https://bsky.app/profile/did:plc:sfrl4dmvaxeq4lqgaucotygo/post/3llr34uismc2y?ref_src=embed">April 1, 2025 at 10:22 PM</a></blockquote><script async src="https://embed.bsky.app/static/embed.js" charset="utf-8"></script>

## New versions

### Python 3.13.3 & 3.12.10

It's another month for Python version updates.

Python 3.14 Alpha 7 is out, and the first beta release is expected soon.

Python 3.13 and 3.12 receive bugfix updates:
- [Python 3.13.3 Downloads and Release Notes](https://www.python.org/downloads/release/python-3133/)
- [Python 3.12.10 Downloads and Release Notes](https://www.python.org/downloads/release/python-31210/)

The following versions receive only security-related fixes and no binary distributions are provided: 3.11.12, 3.10.17 and 3.9.22.

### Visual Studio Code 1.99.0

VS Code joins Claude Desktop and other "AI IDEs", having [Agent Mode](https://code.visualstudio.com/docs/copilot/chat/chat-agent-mode) and [MCP servers support (Preview)](https://code.visualstudio.com/docs/copilot/chat/mcp-servers).

A new open-source and local MCP server is introduced, allowing integration with any LLM tool supporting MCP. Read the details in [Vibe coding with GitHub Copilot: Agent mode and MCP support rolling out to all VS Code users](https://github.blog/news-insights/product-news/github-copilot-agent-mode-activated/).

### Django 5.2 LTS

This LTS version introduces new features and deprecates some functionalities, and it will receive security updates for the next three years at least. Check its [release notes](https://docs.djangoproject.com/en/5.2/releases/5.2/).

## Tutorials

- Deeplearning.ai's [Vibe Coding 101 with Replit](https://www.deeplearning.ai/short-courses/vibe-coding-101-with-replit/) from replit

Take your own discretion on "Vibe Coding" (there's an article about it below), but here's a hands-on tutorial on deeplearning.ai.

> You’ll use Replit’s cloud environment— with an integrated code editor, package manager, and deployment tools—to build and deploy two web applications with the help of an AI coding agent. Along the way, you’ll learn strategies for working effectively with agents and improve your development skills in the process.

- Deeplearning.ai's [Getting Structured LLM Output](https://www.deeplearning.ai/short-courses/getting-structured-llm-output/) from DotTxt

> You’ll gain a fundamental understanding of structured outputs and learn efficient ways to generate outputs in your defined schema or format.

- RealPython's [Introducing DuckDB](https://realpython.com/python-duckdb/)

> The tutorial will equip you with the practical knowledge necessary to get started with DuckDB, including its Online Analytical Processing (OLAP) features, which enable fast access to data through query optimization and buffering.

- freeCodeCamp.org's [Code DeepSeek V3 From Scratch in Python](https://www.youtube.com/watch?v=5avSMc79V-w)

This is a nearly-4-hours Youtube video tutorial brought by freeCodeCamp.

- HuggingFace's [Agents Course](https://huggingface.co/learn/agents-course)

A series of tutorials introducing various aspects of AI Agents.

## Articles

- [PEP 751 – A file format to record Python dependencies for installation reproducibility](https://peps.python.org/pep-0751/)

PEP 751 is **accepted**. This PEP proposes a standard for the format of a file recording the requirements/dependencies of a Python project (ie. a lock file but standardized, agreed across the whole community).

- [Share Python Scripts Like a Pro: uv and PEP 723 for Easy Deployment](https://thisdavej.com/share-python-scripts-like-a-pro-uv-and-pep-723-for-easy-deployment/)

> Sharing single-file Python scripts with external dependencies is now easy thanks to `uv` and PEP 723, which enable embedding dependency metadata directly within scripts.

- [Case Study: Developing and Testing Python Packages with uv](https://pybit.es/articles/developing-and-testing-python-packages-with-uv/)

This article highlights the simplicity of initializing a project with `uv`, which sets up essential files like `pyproject.toml`, `README.md`, and folder structures. This allows developers to manage dependencies effortlessly and set up virtual environments. It emphasizes the convenience of editable installations, enabling instant updates to package code without needing reinstallation.

- [The Llama 4 herd: The beginning of a new era of natively multimodal AI innovation](https://ai.meta.com/blog/llama-4-multimodal-intelligence/)

![llama-4-family](https://scontent-dfw5-2.xx.fbcdn.net/v/t39.2365-6/489528324_1866126614188079_2353760794201377773_n.png?_nc_cat=106&ccb=1-7&_nc_sid=e280be&_nc_ohc=6Mwql30RFp0Q7kNvwEs5-qS&_nc_oc=AdkUMZTdVtRQosXgVAxnJNZyg8mWiY3AyZ2a84hbzpIUiAM0UMZozRt5TS9UAQS0nSg&_nc_zt=14&_nc_ht=scontent-dfw5-2.xx&_nc_gid=7djufmCTfsR3gFwPt7uUMQ&oh=00_AfGHllzK9vdklX6gQDkECMvrCDZZUPMv7hq_ZBf6yC1nFQ&oe=681048F3)

Meta has introduced Llama 4, its latest suite of multimodal AI models including "Llama 4 Scout" and "Llama 4 Maverick", offering significant advancements in personalized AI experiences. Both models utilize a mixture-of-experts (MoE) architecture, allowing efficient use of parameters: Maverick has 17 billion active parameters with 128 experts, while Scout offers a remarkable context length of 10 million tokens. "Llama 4 Behemoth", a larger model with 288 billion parameters, serves as a teacher for the others, enhancing their capabilities.

- [The role of developer skills in agentic coding](https://martinfowler.com/articles/exploring-gen-ai.html#memo-13)

This article discusses the role of developer skills in agentic coding with AI assistants. The author categorizes AI missteps into three impact radius: time to commit, team flow, and long-term maintainability. The article emphasizes the need for developer oversight, caution against "good enough" solutions, and the importance of code quality practices and team communication.

- [MCP (Model Context Protocol): Simply explained in 5 minutes](https://read.highgrowthengineer.com/p/mcps-simply-explained)

![mcp-diagram](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6de5b04a-5e6c-47cf-a81e-e332dd3570df_2906x990.png)

Model Context Protocol is a way for LLMs to integrate with external tools. It is useful as it makes LLMs act more like developers. Behind the scenes, providers create MCP-compliant wrappers. Resources for MCP are also provided.

- [MCP - It's Hot, But Will It Win?](https://hardcoresoftware.learningbyshipping.com/p/230-mcp-its-hot-but-will-it-win)

In the author's point of view, while MCP is popular, its success is uncertain. Middleware like MCP often fails to live up to expectations. It may face issues such as monetization problems if widely adopted or exclusion by a key platform. Vendors may lose interest due to market realities.

- [The "S" in MCP stands for Security](https://elenacross7.medium.com/%EF%B8%8F-the-s-in-mcp-stands-for-security-91407b33ed6b)

Despite its benefits, such as standardized APIs and persistent sessions, MCP has significant security risks. These risks include potential side-channels into shells, secrets, or infrastructure when agents are connected to arbitrary servers without proper security measures. The author emphasizes the need for better security in MCP to prevent these vulnerabilities.

- [Git turns 20: A Q&A with Linus Torvalds](https://github.blog/open-source/git/git-turns-20-a-qa-with-linus-torvalds/)

![git-turns-twenty](https://github.blog/wp-content/uploads/2025/04/GitTurns20_BlogHeader_001-2.png?w=1600)

To celebrate two decades of Git, the author sat down with Linus himself to revisit those early days, explore the key design decisions behind Git’s lasting success, and discuss how it forever changed software development. The full video interview is also included in the blog.

- [Karpathy’s ‘Vibe Coding’ Movement Considered Harmful](https://nmn.gl/blog/dangers-vibe-coding)

The author argues that Karpathy's "vibe coding" is harmful. It leads to hidden costs, exponential technical debt, and security risks. A better approach is to use AI with a clear vision, break down AI-generated code, provide context, test thoroughly, and review code to maintain understanding.

- [Training and Finetuning Reranker Models with Sentence Transformers v4](https://huggingface.co/blog/train-reranker)

In this blogpost, the author shows how to use sentence-transformers to finetune a reranker model that beats all existing options on exactly your data. This method can also train extremely strong new reranker models from scratch.

## Podcasts

### 🥝 core.py

### 🐍 RealPython Podcast

- [Episode 245: GUIs & TUIs: Choosing a User Interface for Your Python Project](https://realpython.com/podcasts/rpp/245/)

### 🥧 Python Bytes Podcast

- [#426 Committing to Formatted Markdown](https://pythonbytes.fm/episodes/show/426/committing-to-formatted-markdown)
- [#427 Rise of the Python Lord](https://pythonbytes.fm/episodes/show/427/rise-of-the-python-lord)

### 🦜 Talk Python to me

- [#499: BeeWare and the State of Python on Mobile](https://talkpython.fm/episodes/show/499/beeware-and-the-state-of-python-on-mobile)

### 🍕 Pybites Podcast

- [#185: Expanding the world of Pybites with cohort coaching, book platforms and more!](https://www.pybitespodcast.com/1501156/episodes/16903500-185-expanding-the-world-of-pybites-with-cohort-coaching-book-platforms-and-more)

## Repositories

### `awslabs/mcp` (Apache-2.0)

https://github.com/awslabs/mcp

### `github-mcp-server` (MIT)

![github-mcp-server](https://github.com/user-attachments/assets/a2926942-1c3d-4f95-bb73-861d8003aecb)

https://github.com/github/github-mcp-server

### `playwright-mcp` (MIT)

javascript

https://github.com/microsoft/playwright-mcp

### `cocommit` (MIT)

python

https://github.com/andrewromanenco/cocommit

## Have time for some fun?

### Nintendo Switch 2 has a launch date

![nintendo-switch-2](https://assets-prd.ignimgs.com/2025/01/16/screenshot-161-1737034377908.png)

Nintendo reveals in their "Direct" livestream event that Switch 2 is available on June 5th, 2025 worldwide with starting price ~$449.99 outside Japan (multi-language version) and a much lower price inside Japan (Japanese-only version). Read more about it on their [official website](https://www.nintendo.com/us/gaming-systems/switch-2/).

### Clair Obscur: Expedition 33 sets sail on April 24th

In this dark fantasy RPG, players will explore the mysterious city of Lumière and engage in immersive turn-based battles with unique mechanics. Check their [official website](https://www.expedition33.com/) for more info.

---

As we wrap up this journey together, I want to take a moment to express my gratitude for your reading. If you’ve enjoyed what you’ve read and would like to help sustain this blog, consider <a href='https://ko-fi.com/O5O4ONNCD' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi6.png?v=6' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a> or <script type="text/javascript" src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js" data-name="bmc-button" data-slug="zeyanglin" data-color="#5F7FFF" data-emoji=""  data-font="Comic" data-text="Buy me a coffee" data-outline-color="#000000" data-font-color="#ffffff" data-coffee-color="#FFDD00" ></script>. Your generosity would be great motivation for me to keep updating the blogs!

Alright, that concludes the second issue of "This Month of Pythonistas". Thank you again for reading my post. I hope you enjoy it or find something useful, and see you in May!
