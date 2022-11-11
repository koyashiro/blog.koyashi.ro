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
        <div className="py-6">
          <h1 className="before:mr-2 before:content-['#'] hover:underline">
            {post.title}
          </h1>

          <div className="flex items-center space-x-1 mt-1">
            <AiOutlineCalendar />
            <time title={date.toISOString()} dateTime={date.toISOString()}>
              {date.toISOString().slice(0, 10)}
            </time>
          </div>
        </div>

        <Content content={post.content} />
      </article>
    </>
  );
};

export default Slug;
