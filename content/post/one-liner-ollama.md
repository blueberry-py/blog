+++
title = "[one-liner] Install Ollama"
description = "Install Ollama on Ubuntu using one line of command"
slug = "one-liner-ollama"
date = 2024-07-17T13:33:41+08:00
authors = ["Zeyang Lin"]
tags = ["ollama", "AI", "Llama", "llm", "linux", "ubuntu"]
categories = ["llm", "AI", "linux"]
series = ["one liner"]
+++

## One-Liner series: Ollama

[source: ollama.com](https://ollama.com/download)

### Install on Ubuntu

```bash
curl -fsSL https://ollama.com/install.sh | sudo sh
```

#### Install a specific version

```bash
curl -fsSL https://ollama.com/install.sh | OLLAMA_VERSION=0.2.5 sudo sh
```

#### Alternative source (possibly not up-to-date with offical release)

```bash
pip install modelscope

modelscope download --model=modelscope/ollama-linux --local_dir ./ollama-linux

cd ollama-linux

chmod +x ./ollama-modelscope-install.sh

./ollama-modelscope-install.sh`
```

### Update on Ubuntu

Run the same command as above

```bash
curl -fsSL https://ollama.com/install.sh | sudo sh
```

### Uninstall on Ubuntu

```bash
sudo systemctl stop ollama
sudo systemctl disable ollama
sudo rm /etc/systemd/system/ollama.service

sudo rm $(which ollama)

sudo rm -r /usr/share/ollama
sudo userdel ollama
sudo groupdel ollama
```
