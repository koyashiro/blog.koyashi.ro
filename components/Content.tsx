import { Root as HastRoot } from "hast";
import rehypeReact from "rehype-react";
import { unified } from "unified";
import { ComponentProps, createElement, FC, Fragment } from "react";
import Link from "next/link";
import { BiLinkExternal } from "react-icons/bi";

import { isInternalLink } from "../lib/link";
import classNames from "classnames";

const A: FC<ComponentProps<"a">> = (props) => {
  if (isInternalLink(props.href)) {
    return (
      <Link
        {...props}
        href={props.href ?? ""}
        ref={typeof props.ref === "string" ? undefined : props.ref}
        className={classNames("hover:underline", props.className)}
      >
        {props.children}
      </Link>
    );
  } else {
    return (
      <a
        {...props}
        target="_blank"
        rel="noreferrer"
        className={classNames(
          "flex items-center space-x-2 hover:underline",
          props.className,
        )}
      >
        <span>{props.children}</span>
        <BiLinkExternal />
      </a>
    );
  }
};

const H2: FC<ComponentProps<"h2">> = (props) => {
  const id = props.id || (props.children?.toString() ?? "");
  return (
    <h2
      {...props}
      id={id}
      className={classNames(
        "border-b-2 before:content-['##'] before:mr-2 hover:underline",
        props.className,
      )}
    >
      <a href={`#${id}`}>{props.children}</a>
    </h2>
  );
};

const H3: FC<ComponentProps<"h3">> = (props) => {
  const id = props.id || (props.children?.toString() ?? "");
  return (
    <h3
      {...props}
      id={id}
      className={classNames(
        "before:content-['###'] before:mr-2",
        props.className,
      )}
    >
      <a href={`#${id}`}>{props.children}</a>
    </h3>
  );
};

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
        h2: H2,
        h3: H3,
      },
    })
    .stringify(content);

  return <div className="first:mt-0">{element}</div>;
};

export default Content;
