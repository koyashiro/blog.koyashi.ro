import { Root as HastRoot } from "hast";
import { createElement, FC, Fragment } from "react";
import rehypeReact from "rehype-react";
import { unified } from "unified";

import A from "./a";
import Code from "./code";
import H1 from "./h1";
import H2 from "./h2";
import H3 from "./h3";
import H4 from "./h4";
import H5 from "./h5";
import H6 from "./h6";
import Li from "./li";
import Ol from "./ol";
import P from "./p";
import Ul from "./ul";

type Props = {
  content: HastRoot;
};

const Content: FC<Props> = ({ content }) => {
  const element = unified()
    .use(rehypeReact, {
      createElement,
      Fragment,
      components: {
        a: A,
        code: Code,
        h1: H1,
        h2: H2,
        h3: H3,
        h4: H4,
        h5: H5,
        h6: H6,
        li: Li,
        ol: Ol,
        p: P,
        ul: Ul,
      },
    })
    .stringify(content);

  return <div>{element}</div>;
};

export default Content;
