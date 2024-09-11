import { ChangeEvent, memo, useState } from "react";
import { Button, Input } from "components";
import s from "./Header.module.scss";

type Props = {
  onSubmit: (limit: number) => void;
  loading: boolean;
};

export const Header = memo<Props>(({ loading, onSubmit }) => {
  const [limit, setLimit] = useState(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (Number.isNaN(value)) return;
    setLimit(value > 100 ? 100 : value);
  };

  return (
    <div className={s.header}>
      <Input
        disabled={loading}
        onChange={handleChange}
        value={limit}
        placeholder="Limit"
      />
      <Button
        disabled={!limit}
        loading={loading}
        onClick={() => onSubmit(limit)}
      >
        Start
      </Button>
    </div>
  );
});
