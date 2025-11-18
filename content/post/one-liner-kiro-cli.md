+++
title = "[one-liner] Install Kiro Cli"
date = 2025-11-18T16:20:00+08:00
description = "Install Kiro Cli using one line of command"
slug = "one-liner-kiro-cli"
authors = ["Zeyang Lin"]
tags = ["aws", "amazon", "kiro", "cli", "linux", "ubuntu", "macos"]
categories = ["cli", "linux"]
externalLink = ""
series = ["one liner"]
+++

## One-Liner series: Kiro Cli

[source: kiro.dev docs](https://kiro.dev/docs/cli/installation/)

### Install on Linux/macOS

```bash
curl -fsSL https://cli.kiro.dev/install | bash
```

### Important note on Amazon Q CLI

If Amazon Q CLI was already installed, running the script above would result in:

```text
Kiro CLI installer:

Detected existing Amazon Q CLI installation
Kiro CLI is the new version of Amazon Q CLI. Updating to latest version.


⚠️ Q CLI at /usr/bin/q does not support auto-update. Please uninstall it and rerun this script to install Kiro CLI.
```

To uninstall Q CLI, run:

```bash
sudo apt remove amazon-q
```

If succeeded, run the kiro-cli script again:

```bash
curl -fsSL https://cli.kiro.dev/install | bash
```

It should install Kiro CLI:

```text
Kiro CLI installer:

Downloading package...
✓ Downloaded and extracted
✓ Package installed successfully

🎉 Installation complete! Happy coding!

Next steps:
Use the command "kiro-cli" to get started!
```

This script would install Kiro Cli into current user's .local/ directory:

```bash
which kiro-cli
```

```text
/home/******/.local/bin/kiro-cli
```

### Update

```bash
kiro-cli update
```
