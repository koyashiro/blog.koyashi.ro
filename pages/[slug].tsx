import { css } from "@emotion/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { AiOutlineCalendar } from "react-icons/ai";

import Content from "../components/Content";
import useUrlFragmentScroll from "../hooks/useUrlFragmentScroll";
import { getPostBySlug, getPosts, Post as Slug } from "../lib/post";

type Props = {
  post: Slug;
};

type Params = {
  slug: string;
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const posts = await getPosts();
  const paths = posts.map((p) => ({ params: { slug: p.slug } }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  if (!params) {
    throw new Error("params is undefined");
  }

  const post = await getPostBySlug(params.slug);
  if (!post) {
    throw new Error("post is undefined");
  }

  return {
    props: { post },
  };
};

const Slug: NextPage<Props> = ({ post }) => {
  const date = new Date(post.date);

  useUrlFragmentScroll();

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>

      <article>
        <h1
          css={css`
            margin: 0;
            font-size: 2.5rem;
            &:before {
              margin-right: 8px;
              content: "#";
            }
          `}
        >
          {post.title}
        </h1>

        <div
          css={css`
            display: flex;
            align-items: center;
            color: #5b5b5b;
          `}
        >
          <AiOutlineCalendar />
          <span
            title={date.toLocaleString()}
            css={css`
              margin-left: 4px;
            `}
            suppressHydrationWarning
          >
            {date.toDateString()}
          </span>
        </div>

        <Content content={post.content} />
      </article>
    </>
  );
};

export default Slug;
