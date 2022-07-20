---
title: "Hello world!"
date: "2022-07-21T00:00:00+09:00"
---

## ブログを作った

自分用の備忘録としてブログを作った。

<https://blog.koyashi.ro/>

## 実装

Gatsby や Hugo の採用も考えたが、勉強も兼ねて Next.js で自作することにした。Markdown で書いた記事を Next.js の SSG で静的サイトに変換している。

具体的には

1. [remark-parse](https://github.com/remarkjs/remark) で Markdown を mdast にパース
2. [remark-gfm](https://github.com/remarkjs/remark-gfm) で GitHub Flavored Markdown を有効化
3. [remark-rehype](https://github.com/remarkjs/remark-rehype) で `mdast` から `hast` に変換
4. [rehype-react](https://github.com/rehypejs/rehype-react) で `hast` から `ReactNode` に変換

という流れで `ReactNode` に変換してからレンダリングしている。1~3 は `getStaticProps` で実行し、生成された `hast` がキャッシュされるようにした[^1]。

突貫で作ったため、全体的に寂しい。少しずつ改良していきたい。

## ホスティング

いつものように脳死で Cloudflare Pages を採用した。

Vercel も使ってみたいのでそのうち移行するかもしれない。

## リポジトリ

[koyashiro/blog.koyashi.ro](https://github.com/koyashiro/blog.koyashi.ro)

[^1]: `ReactNode` まで変換してしまうと [JSON にシリアライズ](https://nextjs.org/docs/basic-features/data-fetching/get-static-props#statically-generates-both-html-and-json)できなくなってしまう。
