# Bilibili Bangumi Downloader - [Latest release](https://github.com/proflylab/bilibili/releases)

### Work in progress

- [x] Bilibili subtitle format (.json)
- [x] Convert Bilibili subtitle format (.json) to (.srt)
- [ ] Video 360p, 480p, 720p? coming soon
- [ ] Audio coming soon

### Install Deno

Shell (Mac, Linux):

```sh
curl -fsSL https://deno.land/x/install/install.sh | sh
```

PowerShell (Windows):

```powershell
iwr https://deno.land/x/install/install.ps1 -useb | iex
```

[Homebrew](https://formulae.brew.sh/formula/deno) (Mac):

```sh
brew install deno
```

[Chocolatey](https://chocolatey.org/packages/deno) (Windows):

```powershell
choco install deno
```

Build and install from source using [Cargo](https://crates.io/crates/deno):

```sh
cargo install deno
```

Read more https://github.com/denoland/deno/#deno

### Getting Started

First install denon if you don't exist
```sh
deno install -qAf --unstable https://deno.land/x/denon/denon.ts
```

```
Usage:
  $ bilibili <command> [options]

Commands:
  info <sId>  View info
  get <epId>  Get subtitle
  list        Lists of anime

For more info, run any command with the `--help` flag:
  $ bilibili info --help
  $ bilibili get --help
  $ bilibili list --help

Options:
  -h, --help     Display this message
  -v, --version  Display version number
```

### How to build

```sh
deno compile --unstable ./src/app.ts
```
