import { css } from "@emotion/react";
import { ComponentProps, FC } from "react";

type Props = ComponentProps<"h6">;

const H6: FC<Props> = (props) => {
  return (
    <h6
      css={css`
        margin-left: 0;
        margin-right: 0;
        margin-top: 8px;
        margin-bottom: 8px;
        font-size: 1.125rem;
        &:before {
          content: "###### ";
        }
      `}
      {...props}
    />
  );
};

export default H6;
