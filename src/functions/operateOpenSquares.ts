import { judgeExistAroundNull } from "./judgeExistAroundNull";

type openSquaresProps = {
  sizeRow: number;
  sizeColumn: number;
  squares: string[][];
  squaresOpen: string[][];
  setSquaresOpen: React.Dispatch<React.SetStateAction<string[][]>>;
  Bombs: string[][];
  posSquare: number[];
};

// 各マス（ボタン）を押下した時にマスの中身を表示する関数
export const operateOpenSquares = (props: openSquaresProps) => {
  const {
    sizeRow,
    sizeColumn,
    squares,
    squaresOpen,
    setSquaresOpen,
    Bombs,
    posSquare,
  } = props;

  const newSquaresOpen = squaresOpen.map((row) => [...row]);

  let ArrPosExistNull = judgeExistAroundNull({
    sizeRow,
    sizeColumn,
    posSquare,
    Bombs,
    squares,
    squaresOpen: newSquaresOpen,
  });

  while (ArrPosExistNull.length > 0) {
    ArrPosExistNull.map((pos) => {
      newSquaresOpen[pos[0]][pos[1]] = "open";
    });

    let ArrPosExistNullLoop: number[][] = [];

    ArrPosExistNull.map((pos) => {
      ArrPosExistNullLoop = [
        ...ArrPosExistNullLoop,
        ...judgeExistAroundNull({
          sizeRow,
          sizeColumn,
          posSquare: pos,
          Bombs,
          squares,
          squaresOpen: newSquaresOpen,
        }),
      ];
    });

    // 新しく調べる必要のあるsquareの位置の格納配列
    const newArrPosExistNull: number[][] = [
      ...new Map(
        ArrPosExistNullLoop.map((pos: number[]) => [JSON.stringify(pos), pos])
      ).values(),
    ].filter(
      (item) =>
        !ArrPosExistNull.some(
          (removeItem) => JSON.stringify(item) === JSON.stringify(removeItem)
        )
    );

    ArrPosExistNull = [...newArrPosExistNull];
  }

  return newSquaresOpen;
};
