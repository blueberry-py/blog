+++
title = "[one-liner] Install Node.js and NPM"
date = 2022-05-07T22:06:58+08:00
description = "Install nodejs and npm on ubuntu using one line of command"
slug = "one-liner-nodejs"
authors = ["Zeyang Lin"]
tags = ["nodejs", "linux", "javascript", "ubuntu", "debian"]
categories = ["nodejs", "linux"]
externalLink = ""
series = ["one liner"]
+++

## One-Liner series: Node.js and NPM

### Optional 1: DEB package through apt

[source: nodesource github](https://github.com/nodesource/distributions/blob/master/README.md)

#### Install on Ubuntu

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

#### Install on Debian, as _root_

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
```

### Optional 2: Through NVM (Node Version Manager)

[source: nodejs.org](https://nodejs.org/en/download/package-manager)

```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Download and install Node.js
nvm install 20
```
