---
title: "[one-liner] Install OpenCode"
date: 2026-06-29T17:06:00+08:00
description: Install OpenCode CLI using one line of command
slug: one-liner-opencode
authors:
  - Zeyang Lin
tags:
  - opencode
  - ai
  - cli
  - windows
  - linux
  - ubuntu
  - macos
categories:
  - cli
  - linux
externalLink: ""
series:
  - one liner
---

## One-Liner series: OpenCode

[source: OpenCode documentation](https://opencode.ai/docs#install)

### Install on Linux or macOS

```bash
curl -fsSL https://opencode.ai/v2/install | bash
```

### Install on Windows

#### Install with npm

```bash
npm install -g @opencode/cli
```

### Verify installation

```bash
opencode --version
```

### Update

```bash
opencode upgrade
```
