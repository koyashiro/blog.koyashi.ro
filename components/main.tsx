import { css } from "@emotion/react";
import { ComponentProps, FC } from "react";

type Props = ComponentProps<"main">;

const Main: FC<Props> = (props) => {
  return (
    <main {...props}>
      <div
        css={css`
          max-width: 900px;
          margin: 0 auto;
          padding: 0 8px;
          background-color: #ffffff;
        `}
      >
        {props.children}
      </div>
    </main>
  );
};

export default Main;
