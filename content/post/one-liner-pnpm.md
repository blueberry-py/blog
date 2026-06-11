+++
title = "[one-liner] Install pnpm"
date = 2026-06-11T16:20:00+08:00
description = "Install pnpm using one line of command"
slug = "one-liner-pnpm"
authors = ["Zeyang Lin"]
tags = ["pnpm", "javascript", "windows", "linux", "ubuntu", "macos"]
categories = ["cli", "linux"]
externalLink = ""
series = ["one liner"]
+++

## One-Liner series: pnpm

[source: pnpm docs](https://pnpm.io/installation)

### Install on POSIX systems (except Intel Macs (darwin-x64))

```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

### Install on Windows (PowerShell)

```powershell
Invoke-WebRequest https://get.pnpm.io/install.ps1 -UseBasicParsing | Invoke-Expression
```

### Update

```bash
pnpm self-update
```
