type judgeExistAroundNullProps = {
  sizeRow: number;
  sizeColumn: number;
  posSquare: number[];
  Bombs: string[][];
  squares: string[][];
  squaresOpen: string[][];
};

// 各マスの周辺（全方向の9マス）にnullが存在するか判定
export const judgeExistAroundNull = (props: judgeExistAroundNullProps) => {
  const { sizeRow, sizeColumn, posSquare, Bombs, squares, squaresOpen } = props;

  const ArrPosExistNull = [];

  if (squares[posSquare[0]][posSquare[1]] === " ") {
    // 上方向
    if (
      posSquare[0] > 0 &&
      Bombs[posSquare[0] - 1][posSquare[1]] !== "bomb" &&
      squaresOpen[posSquare[0] - 1][posSquare[1]] === "close"
    ) {
      ArrPosExistNull.push([posSquare[0] - 1, posSquare[1]]);
    }
    // 右上方向
    if (
      posSquare[0] > 0 &&
      posSquare[1] < sizeColumn - 1 &&
      Bombs[posSquare[0] - 1][posSquare[1] + 1] !== "bomb" &&
      squaresOpen[posSquare[0] - 1][posSquare[1] + 1] === "close"
    ) {
      ArrPosExistNull.push([posSquare[0] - 1, posSquare[1] + 1]);
    }
    // 右方向
    if (
      posSquare[1] < sizeColumn - 1 &&
      Bombs[posSquare[0]][posSquare[1] + 1] !== "bomb" &&
      squaresOpen[posSquare[0]][posSquare[1] + 1] === "close"
    ) {
      ArrPosExistNull.push([posSquare[0], posSquare[1] + 1]);
    }
    // 右下方向
    if (
      posSquare[0] < sizeRow - 1 &&
      posSquare[1] < sizeColumn - 1 &&
      Bombs[posSquare[0] + 1][posSquare[1] + 1] !== "bomb" &&
      squaresOpen[posSquare[0] + 1][posSquare[1] + 1] === "close"
    ) {
      ArrPosExistNull.push([posSquare[0] + 1, posSquare[1] + 1]);
    }
    // 下方向
    if (
      posSquare[0] < sizeRow - 1 &&
      Bombs[posSquare[0] + 1][posSquare[1]] !== "bomb" &&
      squaresOpen[posSquare[0] + 1][posSquare[1]] === "close"
    ) {
      ArrPosExistNull.push([posSquare[0] + 1, posSquare[1]]);
    }
    // 左下方向
    if (
      posSquare[0] < sizeRow - 1 &&
      posSquare[1] > 0 &&
      Bombs[posSquare[0] + 1][posSquare[1] - 1] !== "bomb" &&
      squaresOpen[posSquare[0] + 1][posSquare[1] - 1] === "close"
    ) {
      ArrPosExistNull.push([posSquare[0] + 1, posSquare[1] - 1]);
    }
    // 左方向
    if (
      posSquare[1] > 0 &&
      Bombs[posSquare[0]][posSquare[1] - 1] !== "bomb" &&
      squaresOpen[posSquare[0]][posSquare[1] - 1] === "close"
    ) {
      ArrPosExistNull.push([posSquare[0], posSquare[1] - 1]);
    }
    // 左上方向
    if (
      posSquare[0] > 0 &&
      posSquare[1] > 0 &&
      Bombs[posSquare[0] - 1][posSquare[1] - 1] !== "bomb" &&
      squaresOpen[posSquare[0] - 1][posSquare[1] - 1] === "close"
    ) {
      ArrPosExistNull.push([posSquare[0] - 1, posSquare[1] - 1]);
    }
  }
  return ArrPosExistNull;
};
