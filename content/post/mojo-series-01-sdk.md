+++
title = "MOJO Series #1: Install SDK on UBUNTU"
date = 2023-09-08T18:00:00+08:00
description = "Install mojo sdk on Ubuntu"
slug = "mojo-series-01-sdk"
authors = ["Zeyang Lin"]
tags = ["mojo", "python", "AI", "ubuntu", "linux", "2023"]
categories = ["mojo"]
externalLink = ""
series = ["Mojo"]
+++

So, THAT 35000-times-faster-than-python language, mojo, released its SDK today. This means you can install Mojo
in your own environment and run mojo programs.

And here in this post, I will show you how to do it on Ubuntu.

# System Requirements

- Ubuntu 20.04 and later
- x86-64 CPU and minimum 4 GB RAM
- Python 3.8 - 3.10
- g++ or clang++ compiler

# My environment

- Kubuntu 22.04.3
- AMD CPU with 16GB RAM
- Python 3.10.12
- g++ 11.4.0

# Install steps

## 1. Install Modular CLI

```bash
# switch to root first
sudo -u root -i

# then run the following command
apt-get install -y apt-transport-https &&
  keyring_location=/usr/share/keyrings/modular-installer-archive-keyring.gpg &&
  curl -1sLf 'https://dl.modular.com/bBNWiLZX5igwHXeu/installer/gpg.0E4925737A3895AD.key' |  gpg --dearmor >> ${keyring_location} &&
  curl -1sLf 'https://dl.modular.com/bBNWiLZX5igwHXeu/installer/config.deb.txt?distro=debian&codename=wheezy' > /etc/apt/sources.list.d/modular-installer.list &&
  apt-get update &&
  apt-get install -y modular

# switch back to normal user
exit
```

## 2. Verify `modular` is installed

```bash
which modular
```

> /usr/bin/modular

## 3. Install Mojo SDK

```bash
modular auth <YOUR AUTH KEY> && modular install mojo
```

```text
# Found release for https://packages.modular.com/mojo @ 0.2.1, installing to /home/******/.modular/pkg/packages.modular.com_mojo
# Downloads complete, setting configs...
# Configs complete, running post-install hooks...

..................<OMITTED>

Successfully installed ansiwrap-0.8.4 attrs-23.1.0 certifi-2023.7.22 charset-normalizer-3.2.0 entrypoints-0.4 fastjsonschema-2.18.0 find_libpython-0.3.0 idna-3.4 jsonschema-4.19.0 jsonschema-specifications-2023.7.1 jupyter-core-5.3.1 jupyter_client-8.3.1 nbclient-0.8.0 nbformat-5.9.2 papermill-2.4.0 platformdirs-3.10.0 python-dateutil-2.8.2 pyzmq-25.1.1 referencing-0.30.2 requests-2.31.0 rpds-py-0.10.2 tenacity-8.2.3 textwrap3-0.9.2 tornado-6.3.3 tqdm-4.66.1 traitlets-5.9.0 urllib3-2.0.4
WARNING: Running pip as the 'root' user can result in broken permissions and conflicting behaviour with the system package manager. It is recommended to use a virtual environment instead: https://pip.pypa.io/warnings/venv
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

## 4. Add mojo to PATH

```bash
# You must replace two <USERNAME> with your own username
echo 'export MODULAR_HOME="/home/<USERNAME>/.modular"' >> ~/.bashrc

echo 'export PATH="/home/<USERNAME>/.modular/pkg/packages.modular.com_mojo/bin:$PATH"' >> ~/.bashrc

source ~/.bashrc
```

Now verify `mojo` command is accesible:

```bash
which mojo
```

> /home/******/.modular/pkg/packages.modular.com_mojo/bin/mojo

## 5. Mojo REPL

```bash
mojo
```

> Welcome to Mojo! 🔥
Expressions are delimited by a blank line.
Type `:mojo help` for further assistance.

# Bonus Round: directory structure

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

# References

- [Modular Developer Console](https://developer.modular.com/download)
