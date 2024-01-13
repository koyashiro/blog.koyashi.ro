---
title: "Raspberry Pi 4 に Wireguard の VPN サーバーを構築した"
date: "2022-08-12T22:45:00+09:00"
---

## Raspberry Pi 4 が余った

自宅 LAN の名前解決のために Raspberry Pi 4 で dnsmasq を稼働させていたが、 RTX1200 の簡易 DNS 機能のお陰でおうち DNS サーバーが不要となった。
そこで余った Raspberry Pi 4 を WireGuard による VPN サーバーに転用することにした。

## WireGuard VPN のセットアップ

ネットワークの構成は以下を想定。

| ネットワーク | ネットワークアドレス |
| ------------ | -------------------- |
| 自宅 LAN     | `192.168.1.0/24`     |
| WireGuard    | `192.168.2.0/24`     |

WireGuard で使う IP アドレスは以下を使用する。

| デバイス     | IP アドレス   |
| ------------ | ------------- |
| サーバー     | `192.168.2.1` |
| クライアント | `192.168.2.2` |

### WireGuard のインストール

Raspberry Pi 4 に WireGuard をインストールする。

```sh
apt install wireguard
```

### サーバー鍵の生成

`wg` コマンドでサーバの秘密鍵と公開鍵を生成する。
ここでは自宅 LAN 内に置いた Raspberry Pi 4 をサーバーとする。

```sh
wg genkey | (umask 077 && tee server.key) | pubkey >server.pub
```

### クライアント鍵の生成

サーバー同様にクライアントの秘密鍵と公開鍵を生成する。
スマートフォンのモバイル回線に接続した MacBook Air をクライアントとする。

```sh
wg genkey | (umask 077 && tee client.key) | pubkey >client.pub
```

### サーバー用設定ファイルの作成

サーバー用の設定ファイルを作成する。

WireGuard のネットワーク(`192.168.2.0/24`) から自宅 LAN へのフォワーディングのため、 `iptables` を使用する。

Raspberry Pi OS（のベースである Debian 11 bullseye）にはデフォルトでインストールされていないため、必要に応じてインストールする。
`ufw` を使っている場合、依存関係で `iptables` も一緒にインストールされていはず。

```sh
apt install iptables
```

```conf
[Interface]
Address = 192.168.2.1/24
ListenPort = 51820
PrivateKey = $SERVER_PRIVKEY
PostUp = iptables -A FORWARD -i %i -j ACCEPT; iptables -A FORWARD -o %i -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
PostDown = iptables -D FORWARD -i %i -j ACCEPT; iptables -D FORWARD -o %i -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE

[Peer]
PublicKey = $CLIENT_PUBKEY
AllowedIPs = 192.168.2.2/32
EOF
```

### クライアント用設定ファイルの作成

クライアント用の設定ファイルを作成する。
自宅インフラの名前解決のため、 `Interface.DNS` は LAN のルーター(`192.168.1.1`)を設定する。
`Peer.Endpoint` は自宅のグローバル IP アドレスを設定する。

```conf
[Interface]
PrivateKey = $CLIENT_PRIVKEY
Address = 192.168.2.2/32
DNS = 192.168.1.1

[Peer]
PublicKey = $SERVER_PUBKEY
AllowedIPs = 0.0.0.0/0
Endpoint = 203.0.113.1:51820
```

## WireGuard サーバーの起動

`systemctl` で WireGuard のサービスを有効化する。
今回は WireGuard のインターフェイス名を `wg0` としたため、systemd のユニット名は `wg-quick@wg0` で有効化する。

```sh
systemctl enable --now wg-quick@wg0
```

以上でセットアップは完了。

## 参考

- [Quick Start \- WireGuard](https://www.wireguard.com/quickstart/)
- [WireGuard \- ArchWiki](https://wiki.archlinux.org/title/WireGuard)
