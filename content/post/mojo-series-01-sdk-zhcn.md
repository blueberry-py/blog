+++
title = "MOJO 系列 第一篇: 在 Ubuntu 环境下安装本地 SDK"
date = 2023-09-08T18:00:00+08:00
description = "Install mojo sdk on Ubuntu (zh-cn)"
slug = "mojo-series-01-sdk-zhcn"
authors = ["Zeyang Lin"]
tags = ["mojo", "python", "AI", "ubuntu", "linux", "2023"]
categories = ["mojo"]
externalLink = ""
series = ["Mojo"]
+++

那个号称 **比 Python 快 35000倍** 的 Mojo 语言，今天终于开放了 SDK 的下载。就是说，你可以在自己的本地环境安装 Mojo 并运行 Mojo 程序了。

那么这篇文章是用来记录在 Ubuntu 环境下如何安装 SDK。

首先来看看前置条件－－官方的系统需求

# System Requirements

- Ubuntu 20.04 and later
- x86-64 CPU and minimum 4 GB RAM
- Python 3.8 - 3.10
- g++ or clang++ compiler

并无苛刻之处，都2023年了这些应该都是基础配置了吧。（除非你不用 Ubuntu 系列的 Linux）

那我自己的环境如下

# My environment

- Kubuntu 22.04.3
- AMD CPU with 16GB RAM
- Python 3.10.12
- g++ 11.4.0

然后你需要在 Modular 网站（https://developer.modular.com/download）上面用邮箱注册一个帐号，来获得你的 AUTHKEY 。这个 KEY 是后面步骤用来验证你的身份的。
图中的 `MODULAR_AUTH=` 后面的部分就是你的 AUTHKEY。

满足了官方需求后，下面就是一步一步安装了。需要注意的是你似乎是需要 ~~魔法~~ 才能成功完成下面的步骤。

# 安装步骤

## 1. 安装 Modular CLI

Modular CLI 是安装 mojo 的前置条件

```bash
# 首先切换到 root 用户：
sudo -u root -i

# 然后执行以下命令：
apt-get install -y apt-transport-https &&
  keyring_location=/usr/share/keyrings/modular-installer-archive-keyring.gpg &&
  curl -1sLf 'https://dl.modular.com/bBNWiLZX5igwHXeu/installer/gpg.0E4925737A3895AD.key' |  gpg --dearmor >> ${keyring_location} &&
  curl -1sLf 'https://dl.modular.com/bBNWiLZX5igwHXeu/installer/config.deb.txt?distro=debian&codename=wheezy' > /etc/apt/sources.list.d/modular-installer.list &&
  apt-get update &&
  apt-get install -y modular

# 然后切换回你自己的普通用户：
exit
```

## 2.验证 `modular` 已经安装

在命令行执行：

```bash
which modular
```

如果有下面的输出则表明`modular`安装成功

> /usr/bin/modular

如果没有任何输出，那你可能是需要 ~~魔法~~ 了。

## 3.安装 Mojo SDK

`modular`安装好后，就可以安装`mojo`了。

在命令行执行：

```bash
# 把下面的 <YOUR AUTH KEY> 替换成你自己的 key
modular auth <YOUR AUTH KEY> && modular install mojo
```

等待时间可能会比较久。。。
下面就是输出，可以看到它还会安装很多 python 库到系统的 python 环境里。。。

```text
# Found release for https://packages.modular.com/mojo @ 0.2.1, installing to /home/******/.modular/pkg/packages.modular.com_mojo
# Downloads complete, setting configs...
# Configs complete, running post-install hooks...

< 中间省略掉 >

Successfully installed ansiwrap-0.8.4 attrs-23.1.0 certifi-2023.7.22 charset-normalizer-3.2.0 entrypoints-0.4 fastjsonschema-2.18.0 find_libpython-0.3.0 idna-3.4 jsonschema-4.19.0 jsonschema-specifications-2023.7.1 jupyter-core-5.3.1 jupyter_client-8.3.1 nbclient-0.8.0 nbformat-5.9.2 papermill-2.4.0 platformdirs-3.10.0 python-dateutil-2.8.2 pyzmq-25.1.1 referencing-0.30.2 requests-2.31.0 rpds-py-0.10.2 tenacity-8.2.3 textwrap3-0.9.2 tornado-6.3.3 tqdm-4.66.1 traitlets-5.9.0 urllib3-2.0.4
。。。。。。。
Testing `MODULAR_HOME=/home/******/.modular`
* `/home/******/.modular/pkg/packages.modular.com_mojo/bin/mojo`...
TEST: `mojo --help`... OK
TEST: `mojo run --help`... OK
TEST: `mojo build test_mandelbrot.mojo`... OK
TEST: `mojo build test_python.mojo`... OK
TEST: `mojo demangle`... OK
TEST: `mojo format`... OK
TEST: `mojo package`... OK
TEST: `mojo test_mandelbrot.mojo`... OK
TEST: `mojo test_python.mojo`... OK
TEST: `mojo repl`... OK

🔥 Mojo installed! 🔥

Now run the following commands if you are using bash:

echo 'export MODULAR_HOME="/home/******/.modular"' >> ~/.bashrc
echo 'export PATH="/home/******/.modular/pkg/packages.modular.com_mojo/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

If you are using ZSH, run the following commands:

echo 'export MODULAR_HOME="/home/******/.modular"' >> ~/.zshrc
echo 'export PATH="/home/******/.modular/pkg/packages.modular.com_mojo/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

Then enter 'mojo' to start the Mojo REPL.

For tool help, enter 'mojo --help'.
For more docs, see https://docs.modular.com/mojo.
```

## 4.添加 `mojo` 到 `PATH`

```bash
# 把下面两个 <USERNAME> 替换成你自己的用户名
echo 'export MODULAR_HOME="/home/<USERNAME>/.modular"' >> ~/.bashrc

echo 'export PATH="/home/<USERNAME>/.modular/pkg/packages.modular.com_mojo/bin:$PATH"' >> ~/.bashrc

# 重新加载 .bachrc 令改动生效
source ~/.bashrc
```

现在验证 `mojo` 命令是否已经能用了:

```bash
which mojo
```

若输出为下面内容则表示安装成功：

> /home/******/.modular/pkg/packages.modular.com_mojo/bin/mojo

## 5. 体验 Mojo REPL

在命令行执行：

```bash
mojo
```

就进到了 mojo 的互动编程环境。熟悉 Python 或其它类似语言的小伙伴对这个一定不陌生。

> Welcome to Mojo! 🔥
Expressions are delimited by a blank line.
Type `:mojo help` for further assistance.

那么至此 mojo 的基础开发环境就已经搭建好了，在下一篇文章中我会记录如何运行最基础的 “Hello world” 程序。

# Bonus Round: 看看 mojo 目录的文件夹结构

```bash
tree $MODULAR_HOME
```

```bash
/home/******/.modular
├── crashdb
│   ├── attachments
│   ├── completed
│   ├── new
│   ├── pending
│   └── settings.dat
├── modular.cfg
└── pkg
    └── packages.modular.com_mojo
        ├── bin
        │   ├── lldb
        │   ├── lldb-argdumper
        │   ├── lldb-server
        │   ├── lldb-vscode
        │   ├── modular-crashpad-handler
        │   ├── mojo
        │   └── mojo-lsp-server
        ├── installed.json
        ├── jupyter
        │   ├── kernel
        │   │   ├── logo-64x64.png
        │   │   ├── logo.svg
        │   │   └── mojokernel.py
        │   └── manage_kernel.py
        ├── lib
        │   ├── libKGENCompilerRTShared.so -> /home/******/.modular/pkg/packages.modular.com_mojo/lib/libKGENCompilerRTShared.so.18git
        │   ├── libKGENCompilerRTShared.so.18git
        │   ├── libKGENCompilerRT-static.a
        │   ├── libLLCLRuntimeGlobals.so -> /home/******/.modular/pkg/packages.modular.com_mojo/lib/libLLCLRuntimeGlobals.so.18git
        │   ├── libLLCLRuntimeGlobals.so.18git
        │   ├── liblldb.so -> /home/******/.modular/pkg/packages.modular.com_mojo/lib/liblldb.so.18.0.0git
        │   ├── liblldb.so.18.0.0git
        │   ├── liblldb.so.18git -> /home/******/.modular/pkg/packages.modular.com_mojo/lib/liblldb.so.18.0.0git
        │   ├── libMojoJupyter.so -> /home/******/.modular/pkg/packages.modular.com_mojo/lib/libMojoJupyter.so.18git
        │   ├── libMojoJupyter.so.18git
        │   ├── libMojoLLDB.so -> /home/******/.modular/pkg/packages.modular.com_mojo/lib/libMojoLLDB.so.18git
        │   ├── libMojoLLDB.so.18git
        │   ├── libMSupportGlobals.so -> /home/******/.modular/pkg/packages.modular.com_mojo/lib/libMSupportGlobals.so.18git
        │   ├── libMSupportGlobals.so.18git
        │   ├── liborc_rt.a
        │   ├── lldb-visualizers
        │   │   ├── lldbDataFormatters.py
        │   │   └── mlirDataFormatters.py
        │   ├── mblack
        │   │   ├── base_library.zip
        │   │   ├── importlib_metadata-6.8.0.dist-info
        │   │   │   ├── INSTALLER
        │   │   │   ├── LICENSE
        │   │   │   ├── METADATA
        │   │   │   ├── RECORD
        │   │   │   ├── top_level.txt
        │   │   │   └── WHEEL
        │   │   ├── libbz2.so.1.0
        │   │   ├── libcrypto.so.1.1
        │   │   ├── lib-dynload
        │   │   │   ├── _asyncio.cpython-38-x86_64-linux-gnu.so
        │   │   │   ├── _bz2.cpython-38-x86_64-linux-gnu.so
        │   │   │   ├── _codecs_cn.cpython-38-x86_64-linux-gnu.so
        │   │   │   ├── _codecs_hk.cpython-38-x86_64-linux-gnu.so
        │   │   │   ├── _codecs_iso2022.cpython-38-x86_64-linux-gnu.so
        │   │   │   ├── _codecs_jp.cpython-38-x86_64-linux-gnu.so
        │   │   │   ├── _codecs_kr.cpython-38-x86_64-linux-gnu.so
        │   │   │   ├── _codecs_tw.cpython-38-x86_64-linux-gnu.so
        │   │   │   ├── _contextvars.cpython-38-x86_64-linux-gnu.so
        │   │   │   ├── _ctypes.cpython-38-x86_64-linux-gnu.so
        │   │   │   ├── _decimal.cpython-38-x86_64-linux-gnu.so
        │   │   │   ├── _hashlib.cpython-38-x86_64-linux-gnu.so
        │   │   │   ├── _json.cpython-38-x86_64-linux-gnu.so
        │   │   │   ├── _lzma.cpython-38-x86_64-linux-gnu.so
        │   │   │   ├── mmap.cpython-38-x86_64-linux-gnu.so
        │   │   │   ├── _multibytecodec.cpython-38-x86_64-linux-gnu.so
        │   │   │   ├── _multiprocessing.cpython-38-x86_64-linux-gnu.so
        │   │   │   ├── _opcode.cpython-38-x86_64-linux-gnu.so
        │   │   │   ├── _posixshmem.cpython-38-x86_64-linux-gnu.so
        │   │   │   ├── _queue.cpython-38-x86_64-linux-gnu.so
        │   │   │   ├── resource.cpython-38-x86_64-linux-gnu.so
        │   │   │   ├── _ssl.cpython-38-x86_64-linux-gnu.so
        │   │   │   ├── termios.cpython-38-x86_64-linux-gnu.so
        │   │   │   └── _uuid.cpython-38-x86_64-linux-gnu.so
        │   │   ├── libexpat.so.1
        │   │   ├── libffi.so.7
        │   │   ├── liblzma.so.5
        │   │   ├── libmpdec.so.2
        │   │   ├── libpython3.8.so.1.0
        │   │   ├── libssl.so.1.1
        │   │   ├── libuuid.so.1
        │   │   ├── libz.so.1
        │   │   ├── mblack
        │   │   └── mblib2to3
        │   │       ├── Grammar.txt
        │   │       ├── __init__.py
        │   │       ├── LICENSE
        │   │       ├── PatternGrammar.txt
        │   │       ├── pgen2
        │   │       │   ├── conv.py
        │   │       │   ├── driver.py
        │   │       │   ├── grammar.py
        │   │       │   ├── __init__.py
        │   │       │   ├── literals.py
        │   │       │   ├── parse.py
        │   │       │   ├── pgen.py
        │   │       │   ├── tokenize.py
        │   │       │   └── token.py
        │   │       ├── pygram.py
        │   │       ├── pytree.py
        │   │       └── README
        │   ├── mojo
        │   │   ├── algorithm.mojopkg
        │   │   ├── autotune.mojopkg
        │   │   ├── base64.mojopkg
        │   │   ├── benchmark.mojopkg
        │   │   ├── builtin.mojopkg
        │   │   ├── complex.mojopkg
        │   │   ├── math.mojopkg
        │   │   ├── memory.mojopkg
        │   │   ├── os.mojopkg
        │   │   ├── python.mojopkg
        │   │   ├── random.mojopkg
        │   │   ├── runtime.mojopkg
        │   │   ├── sys.mojopkg
        │   │   ├── tensor.mojopkg
        │   │   ├── testing.mojopkg
        │   │   ├── time.mojopkg
        │   │   └── utils.mojopkg
        │   └── mojo-repl-entry-point
        ├── licenses
        │   ├── LICENSE
        │   └── Third-Party-Notices
        ├── modular.cfg
        ├── root.json
        ├── scripts
        │   └── post-install
        │       ├── install-dependencies.sh
        │       ├── pick_python.py
        │       ├── requirements.txt
        │       └── self-test.py
        ├── share
        │   └── man
        │       └── man1
        │           ├── mojo.1
        │           ├── mojo-build.1
        │           ├── mojo-demangle.1
        │           ├── mojo-doc.1
        │           ├── mojo-format.1
        │           ├── mojo-package.1
        │           ├── mojo-repl.1
        │           └── mojo-run.1
        ├── snapshot.json
        ├── targets.json
        ├── test
        │   ├── test_format.mojo
        │   ├── test_jupyter.ipynb
        │   ├── test_mandelbrot.mojo
        │   ├── test_package
        │   │   └── __init__.mojo
        │   ├── test_package_user.mojo
        │   └── test_python.mojo
        ├── timestamp.json
        └── VERSION

26 directories, 133 files
```

# 本文参考了

- [Modular Developer Console](https://developer.modular.com/download)
