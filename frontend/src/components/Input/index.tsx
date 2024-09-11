import { FC } from "react";
import cn from "classnames";

import s from "./index.module.scss";

type Props = JSX.IntrinsicElements["input"];

export const Input: FC<Props> = ({ className, ...rest }) => {
  return <input className={cn(s.input, className)} {...rest} />;
};
