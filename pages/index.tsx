import { css } from "@emotion/react";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { AiOutlineCalendar } from "react-icons/ai";

import A from "../components/A";
import { getPosts, Post } from "../lib/post";

type Props = {
  posts: Post[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await getPosts();
  return { props: { posts } };
};

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>blog.koyashi.ro</title>
      </Head>

      <div>
        {posts.map((p) => {
          const date = new Date(p.date);
          return (
            <div key={p.slug}>
              <A
                href={`/${p.slug}`}
                css={css`
                  font-size: 1.6rem;
                  font-weight: 600;
                `}
              >
                {p.title}
              </A>

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

              <hr
                css={css`
                  margin-bottom: 20px;
                `}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
