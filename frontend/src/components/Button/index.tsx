import { FC } from "react";
import cn from "classnames";
import { Loader } from "../Loader";

import s from "./index.module.scss";

type Props = JSX.IntrinsicElements["button"] & {
  loading?: boolean;
};

export const Button: FC<Props> = ({
  children,
  disabled,
  loading,
  className,
  ...rest
}) => {
  return (
    <button
      disabled={loading || disabled}
      className={cn(s.button, className)}
      {...rest}
    >
      {loading ? <Loader /> : children}
    </button>
  );
};
