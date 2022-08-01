---
title: "自宅の仮想基盤を Proxmox VE に移行した"
date: "2022-08-01T22:00:00+09:00"
---

libvert (KVM + QEMU) で構築していた自宅の仮想基盤を Proxmox VE に移行したのでその際の作業メモ。

Proxmox VE 公式でインストーラーイメージが配布されているが、フルディスク暗号化に対応していなかった。
そこで Debian 11 をセットアップした後に、 Proxmox VE を手動で構築することにした。

## Debian 11 のセットアップ

通常通り Debian 11 のインストールを行った。
使用したバージョンは `11.4.0` 。

ディスクは `Guided - use entire disk and set up encrypted LVM` を選択して、フルディスク暗号化を実施した。

![debian-11-encryption](/debian-11-encryption.png)

以下はインストール後のセットアップ。

### デフォルトエディタの変更

`update-alternatives` でデフォルトのエディタを Vim に変更する。

```sh
apt install -y vim
update-alternatives --set editor /usr/bin/vim.basic
```

### IP アドレスの固定

`/etc/network/interfaces` を書き換えて IP アドレスを固定する。

```diff
- iface enp3s0 inet dhcp
+ iface enp3s0 inet static
+   address 192.168.1.110
+   network 192.168.1.0
+   netmask 255.255.255.0
+   broadcast 192.168.1.255
+   gateway 192.168.1.1
+   dns-nameservers 192.168.1.1
```

IP アドレス変更を反映。

```sh
systemctl restart networking.service ifup@enp3s0
```

### ホスト名の変更

`hostnamectl` コマンドでホスト名を変更する。

```sh
hostnamectl set-hostname pve.koyashi.ro
```

### SSH 設定の変更

`/etc/ssh/sshd_config` を書き換えて root ユーザーへのログインとパスワードでのログインを無効化する。

```diff
- PermitRootLogin prohibit-password
+ PermitRootLogin no

- #PasswordAuthentication yes
+ PasswordAuthentication no
```

設定変更を反映。

```sh
systemctl reload sshd.service
```

### 一般ユーザーのセットアップ

Debian 11 インストール時に設定した一般ユーザーの設定を行う。

#### `sudo` のセットアップ

一般ユーザーで `sudo` を使えるようにする。

```sh
apt install -y sudo
usermod -aG sudo koyashiro
```

#### SSH のセットアップ

SSH でログインできるようにする。

```sh
apt install -y curl
mkdir -m 700 /home/koyashiro/.ssh
curl https://github.com/koyashiro.keys >/home/koyashiro/.ssh/authorized_keys
chown -R koyashiro:koyashiro /home/koyashiro/.ssh
```

## Debian 11 に Proxmox VE をインストール

Proxmox 公式のドキュメントを参考に Debian 11 上に Proxmox VE をインストールする。

[Install Proxmox VE on Debian 11 Bullseye \- Proxmox VE](https://pve.proxmox.com/wiki/Install_Proxmox_VE_on_Debian_11_Bullseye)

### `/etc/hosts` の書き換え

`/etc/hosts` にマシンの IP アドレスを設定する。

```diff
- 127.0.1.1       pve.koyashi.ro  pve
+ 192.168.1.110   pve.koyashi.ro  pve
```

`hostname --ip-address` で設定した IP アドレスが返ってくるかを確認。

```console
$ hostname --ip-address
192.168.1.110
```

### `pve-no-subscription` リポジトリの追加

Proxmox VE のリポジトリを追加する。

```sh
echo 'deb [arch=amd64] http://download.proxmox.com/debian/pve bullseye pve-no-subscription' >/etc/apt/sources.list.d/pve-no-subscription.list
```

```sh
curl -o /etc/apt/trusted.gpg.d/proxmox-release-bullseye.gpg https://enterprise.proxmox.com/debian/proxmox-release-bullseye.gpg
```

```sh
apt update && apt full-upgrade -y
```

### Proxmox VE パッケージのインストール

```sh
apt install -y proxmox-ve postfix open-iscsi
```

```sh
reboot now
```

### Debian カーネルの削除

```sh
apt remove -y linux-image-amd64 'linux-image-5.10*'
```

```sh
update-grub
```

### `os-prober` パッケージの削除

```sh
apt remove -y os-prober
```

## 動作確認

以上で Proxmox VE のセットアップは終了。

<https://192.168.1.110:8006> で Web UI に接続し、ログイン画面が出ればセットアップ完了。

![proxmox-ve-login](/proxmox-ve-login.png)
