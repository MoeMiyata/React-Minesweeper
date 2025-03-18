type calculateAroundBombsProps = {
  sizeRow: number;
  sizeColumn: number;
  Bombs: string[][];
};

// 各マスの周辺（全方位9マス）に存在する爆弾の数を計算する関数
export const calculateAroundBombs = (props: calculateAroundBombsProps) => {
  const { sizeRow, sizeColumn, Bombs } = props;

  const arryCntAroundBombs = Array(sizeRow)
    .fill(null)
    .map(() => Array(sizeColumn).fill(null));

  for (let row = 0; row < sizeRow; row++) {
    for (let column = 0; column < sizeColumn; column++) {
      if (Bombs[row][column] !== "bomb") {
        let cntBombs = 0;

        if (row > 0) {
          for (let aroundColumn = -1; aroundColumn < 2; aroundColumn++) {
            if (
              !(
                (column + aroundColumn < 0 && aroundColumn === -1) ||
                (column + aroundColumn > sizeColumn - 1 && aroundColumn === 1)
              )
            ) {
              if (Bombs[row - 1][column + aroundColumn] === "bomb") {
                cntBombs++;
              }
            }
          }
        }
        if (row < sizeRow - 1) {
          for (let aroundColumn = -1; aroundColumn < 2; aroundColumn++) {
            if (
              !(
                (column + aroundColumn < 0 && aroundColumn === -1) ||
                (column + aroundColumn > sizeColumn - 1 && aroundColumn === 1)
              )
            ) {
              if (Bombs[row + 1][column + aroundColumn] === "bomb") {
                cntBombs++;
              }
            }
          }
        }
        if (column > 0) {
          if (Bombs[row][column - 1] === "bomb") {
            cntBombs++;
          }
        }
        if (column < sizeColumn - 1) {
          if (Bombs[row][column + 1] === "bomb") {
            cntBombs++;
          }
        }
        arryCntAroundBombs[row][column] = cntBombs === 0 ? null : cntBombs;
      }
    }
  }

  return arryCntAroundBombs;
};
