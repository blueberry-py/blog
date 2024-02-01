+++
title = "[one-liner] Install Node.js and NPM"
date = 2022-05-07T22:06:58+08:00
description = "Install nodejs and npm on ubuntu using one line of command"
slug = "one-liner-nodejs"
authors = ["Zeyang Lin"]
tags = ["nodejs", "linux", "javascript", "ubuntu"]
categories = ["nodejs", "linux"]
externalLink = ""
series = ["one liner"]
+++

## One-Liner series: Node.js and NPM

[source: nodesource](https://github.com/nodesource/distributions/blob/master/README.md)

### Install on Ubuntu

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Install on Debian, as _root_

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs
```
