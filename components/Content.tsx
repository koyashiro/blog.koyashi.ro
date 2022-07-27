import { Root as HastRoot } from "hast";
import { createElement, FC, Fragment } from "react";
import rehypeReact from "rehype-react";
import { unified } from "unified";

import A from "./A";
import Code from "./Code";
import H1 from "./H1";
import H2 from "./H2";
import H3 from "./H3";
import H4 from "./H4";
import H5 from "./H5";
import H6 from "./H6";
import Li from "./Li";
import Ol from "./Ol";
import P from "./P";
import Ul from "./Ul";

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
