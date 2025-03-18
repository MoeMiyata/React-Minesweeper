type judgeGameClearProps = {
  cntBomb: number;
  sizeRow: number;
  sizeColumn: number;
  setIsGameClear: React.Dispatch<React.SetStateAction<boolean>>;
  squaresOpen: string[][];
};

// ゲームをクリアしているか判定する関数
export const judgeGameClear = (props: judgeGameClearProps) => {
  const { cntBomb, sizeRow, sizeColumn, setIsGameClear, squaresOpen } = props;
  let cntNotOpen = 0;
  for (let row = 0; row < sizeRow; row++) {
    for (let column = 0; column < sizeColumn; column++) {
      if (squaresOpen[row][column] === "close") {
        cntNotOpen++;
      }
    }
  }

  if (cntNotOpen <= cntBomb) {
    setIsGameClear(true);
  }
};
