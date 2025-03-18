type positioningOfBombProps = {
  cntBomb: number;
  sizeRow: number;
  sizeColumn: number;
};

export const positioningOfBomb = (props: positioningOfBombProps) => {
  const { cntBomb, sizeRow, sizeColumn } = props;

  const arry0to255 = [...Array(sizeRow * sizeColumn)].map((_, i) => i);

  const arryBomb0to255 = [...arry0to255]
    .sort(() => Math.random() - 0.5)
    .slice(0, cntBomb);

  // const arryBombs = [];
  const Bombs = Array(sizeRow)
    .fill(null)
    .map(() => Array(sizeColumn).fill(null));

  let index = 0;
  for (let row = 0; row < sizeRow; row++) {
    for (let column = 0; column < sizeColumn; column++) {
      if (arryBomb0to255.includes(index)) {
        // arryBombs.push([row, column]);
        Bombs[row][column] = "bomb";
      }
      index++;
    }
  }

  return Bombs;
};
