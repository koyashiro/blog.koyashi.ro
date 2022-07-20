import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkGfm from "remark-gfm";
import { Root as HastRoot } from "hast";

export type Post = {
  slug: string;
  title: string;
  date: string;
  content: HastRoot;
};

const POSTS_DIR = path.join(process.cwd(), "posts");

/**
 *
 * @returns
 */
export const getPosts: () => Promise<Post[]> = async () => {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const post = await getPostBySlug(slug);
      if (!post) {
        throw new Error("post is undefined");
      }
      return post;
    })
  );

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
};

/**
 *
 * @param slug
 * @returns
 */
export const getPostBySlug: (
  slug: string
) => Promise<Post | undefined> = async (slug) => {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  const file = await fs.readFile(filePath);
  const { data, content } = matter(file);
  const { title, date } = data;

  if (typeof title !== "string") {
    throw new Error("title is not a string");
  }
  if (typeof date !== "string") {
    throw new Error("date is not a string");
  }

  const mdast = unified().use(remarkParse).use(remarkGfm).parse(content);
  const hast = (await unified()
    .use(remarkGfm)
    .use(remarkRehype)
    .run(mdast)) as HastRoot; // NOTE: `mdast.Root` -> `hast.Root`
  if (!hast) {
    throw new Error("hast is null or undefined");
  }

  return { slug, title, date, content: hast };
};

const getPostSlugs: () => Promise<string[]> = async () => {
  const dirents = await fs.readdir(POSTS_DIR, { withFileTypes: true });
  const dirs = dirents
    .filter((dirent) => dirent.isFile() && dirent.name.endsWith(".md"))
    .map((dirent) => dirent.name.replace(".md", ""));
  return dirs;
};
