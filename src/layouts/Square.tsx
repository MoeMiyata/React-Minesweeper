type SquareProps = {
  className: string;
  value: string | null;
  onClickSquare: () => void;
};

// 各マスの作成
export const Square = (props: SquareProps) => {
  const { className, value, onClickSquare } = props;
  return (
    <button className={className} onClick={onClickSquare}>
      {value}
    </button>
  );
};
