+++
title = "[one-liner] Install minikube, kubectl and kustomize"
date = 2021-06-23T17:33:22+08:00
description = "Install kubernetes on ubuntu using one line of command"
slug = "one-liner-kubernetes"
authors = ["Zeyang Lin"]
tags = ["kubernetes", "linux", "ubuntu"]
categories = ["kubernetes", "linux"]
externalLink = ""
series = ["one liner"]
+++

## One-liner series: minikube, kubectl and kustomize

|OS| Shell |
|--|--|
| Ubuntu 20.04 amd64 | Bash |

### Install minikube

[source](https://minikube.sigs.k8s.io/docs/start/)

#### As Binary

```bash
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64

sudo install minikube-linux-amd64 /usr/local/bin/minikube
```

#### As DEB

```bash
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube_latest_amd64.deb

sudo dpkg -i minikube_latest_amd64.deb
```

### Install kubectl

[source](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/#install-kubectl-binary-with-curl-on-linux)

```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"

sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
```

>To download a specific version, replace the $(curl -L -s <https://dl.k8s.io/release/stable.txt>) portion of the command with the specific version.
>eg. v1.21.0

### Install kustomize

[source](https://kubectl.docs.kubernetes.io/installation/kustomize/binaries/)

```bash
curl -s "https://raw.githubusercontent.com/kubernetes-sigs/kustomize/master/hack/install_kustomize.sh"  | bash

sudo install -o root -g root -m 0755 kustomize /usr/local/bin/kustomize
```

-------------

### Setup command-line completion for minikube

[source](https://minikube.sigs.k8s.io/docs/commands/completion/#minikube-completion-bash)

```bash
sudo su root && minikube completion bash > /etc/bash_completion.d/minikube
```

### Setup command-line completion for kubectl

[source](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/#enable-shell-autocompletion)

```bash
sudo kubectl completion bash > /etc/bash_completion.d/kubectl
```

### Setup command-line completion for kustomize

```bash
sudo kustomize completion bash > /etc/bash_completion.d/kustomize
```
