---
title: Creating local pacman packages
date: 2025-06-16
---

I sometimes contribute to open-source projects that I myself use, as one should, and one of those is [helix](https://helix-editor.com/) code editor.
It is then often I want to evaluate some hot new feature in real world scenarios, which means using the yet unpublished version of helix in my daily work.
However, I cannot just use the helix binary built with cargo for that, as I need to use it for the development of helix itself.

As I am using Archlinux btw. the most natural way for doing that is creating a local pacman package of the desired state of helix.
This means basically building the binary together with the supporting files and then copying them into the `/usr/bin` and `/usr/lib` folders.
This approach also has an additional benefit of providing the same binary for my personal and work system users on my machine.

First I started by shamelessly copying the official helix PKGBUILD file into the root directory of the helix repo.
This file describes the build process and already contains all the instructions for how to install helix on Archlinux.

The usual process for most packages starts with cloning a repository into a temporary folder - this what the `source` variable in a PKGBUILD is for.
I first considered the idea of using the `file://` option as the source, but then realized that I don't really need to copy anything anywhere as all the files are already available.
So in contrast to the usual process I operate directly in the repository folder, which also significantly saves the build time as cargo can reuse all the build information.

Having decided that the actual molding of the package build file looked like this:
1. Renaming `pkgname` to `helix-local` and `pkgver` to `local`, so that pacman does not try to update it with the remote one
2. Removing `source`, `install`, and `b2sums` fields as pacman does not need to download anything anymore
3. Removing `prepare()` and `check()` steps as my local helix should already be checked and prepared for everything
4. Removing other stuff that I don't need, like code-completions for shells, list of optional dependencies, etc.
5. Adapting the `build()` step to use helix own instructions for [building from source](https://docs.helix-editor.com/building-from-source.html)
6. Finally adapting the `package()` step to use the correct local paths. Note, that both steps start with `cd ..` as by default the source code is assumed to be located into the `src` folder.

The resulting PKGBUILD file ended up looking like this:
```bash
pkgname=helix-local
pkgver=local
pkgrel=1
arch=('x86_64')
license=('MPL-2.0')
depends=('gcc-libs' 'glibc')
conflicts=('helix')
provides=('hx')
options=('!lto' '!debug')

build() {
  cd ..
  export HELIX_DEFAULT_RUNTIME=/usr/lib/helix/runtime
  cargo build --profile opt --locked
}

package() {
  cd ..
  install -Dm 755 "target/opt/hx" "$pkgdir/usr/bin/hx"

  local runtime_dir="$pkgdir/usr/lib/helix/runtime"
  mkdir -p "$runtime_dir/grammars"
  cp -r "runtime/queries" "$runtime_dir"
  cp -r "runtime/themes" "$runtime_dir"
  find "runtime/grammars" -type f -name '*.so' -exec \
    install -Dm 755 {} -t "$runtime_dir/grammars" \;
  install -Dm 644 runtime/tutor -t "$runtime_dir"


  install -Dm 644 "contrib/completion/hx.zsh" "$pkgdir/usr/share/zsh/site-functions/_hx"
}
```

Now to install the package I can simply execute `makepkg --clean --install && rm *.pkg.tar.zst`, which builds the package in the same folder as PKGBUILD and then cleans up the generated files.

> As I ended up creating the PKGBUILD in the root of the helix repo I needed to make sure git ignores it.
The best way of doing that without modifying `.gitignore` was adding it to the `.git/info/exclude` file.

In the end I was surprised how simple and convenient creating own pacman packages turned out to be.
In the future I will probably prefer this method of system-wide installation of [scripts](https://github.com/drybalka/ssh-keygen-with-agent/blob/main/PKGBUILD) and programs for both my personal and work Linux users, instead of any hard-to-remember manual processes.
