import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { AiOutlineCalendar } from "react-icons/ai";

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

      <div className="border-y-2 divide-y-2">
        {posts.map((p) => {
          const date = new Date(p.date);

          return (
            <div key={p.slug} className="py-2">
              <Link
                href={`/${p.slug}`}
                className="font-bold text-2xl text-gray-700 hover:text-gray-900 hover:underline"
              >
                {p.title}
              </Link>

              <div className="flex items-center space-x-1 mt-1">
                <AiOutlineCalendar />
                <time title={date.toISOString()} dateTime={date.toISOString()}>
                  {date.toISOString().slice(0, 10)}
                </time>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
