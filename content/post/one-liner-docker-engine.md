+++
title = "[one-liner] Install Docker Engine community and docker-compose"
date = 2021-06-23T16:11:39+08:00
description = "Install docker on ubuntu using one line of command"
slug = "one-liner-docker-engine"
authors = ["Zeyang Lin"]
tags = ["docker", "linux", "ubuntu"]
categories = ["docker", "linux"]
externalLink = ""
series = ["one liner"]
+++

## One-Liner series: Docker and docker-compose

|OS| Shell |
|--|--|
| Ubuntu Server 22.04 Jammy | Bash |

### Install Docker Engine community

[source](https://docs.docker.com/engine/install/ubuntu/#install-using-the-convenience-script)

```bash
curl -fsSL https://get.docker.com -o get-docker.sh && sudo sh get-docker.sh
```

**docker-compose is now installed along with docker engine, and becomes** `docker compose`.
**However docker-compose can still be installed as a stand-alone binary**:

```bash
sudo curl -SL https://github.com/docker/compose/releases/download/v2.24.5/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose
```
