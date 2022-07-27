import { css } from "@emotion/react";
import { ComponentProps, FC } from "react";

type Props = ComponentProps<"h4">;

const H4: FC<Props> = (props) => {
  return (
    <h4
      css={css`
        margin-top: 8px;
        margin-bottom: 8px;
        font-size: 1.25rem;
        &:before {
          content: "#### ";
        }
      `}
      {...props}
    />
  );
};

export default H4;
