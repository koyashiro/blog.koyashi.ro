import { FC } from "react";
import { ComponentProps } from "react";

type Props = ComponentProps<"code">;

const Code: FC<Props> = (props) => {
  return <code {...props}></code>;
};

export default Code;
