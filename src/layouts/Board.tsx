import { useRef } from "react";
import { calculateAroundBombs } from "../functions/calculateAroundBombs";
import { operateOpenSquares } from "../functions/operateOpenSquares";
import { playTimeForDisplay } from "../functions/playTimeForDisplay";
import { positioningOfBomb } from "../functions/positioningOfBomb";
import { Square } from "./Square";

type BoardProps = {
  mode: string;
  cntBomb: number;
  sizeRow: number;
  sizeColumn: number;
  squares: string[][];
  squaresOpen: string[][];
  setSquaresOpen: React.Dispatch<React.SetStateAction<string[][]>>;
  squaresDisplay: string[][];
  cntFlg: number;
  setCntFlg: React.Dispatch<React.SetStateAction<number>>;
  squaresFlg: string[][];
  setSquaresFlg: React.Dispatch<React.SetStateAction<string[][]>>;
  isModeFlg: boolean;
  setIsModeFlg: React.Dispatch<React.SetStateAction<boolean>>;
  playTime: number;
  isGameOver: boolean;
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  isGameClear: boolean;
  isFirstSquare: boolean;
  setIsFirstSquare: React.Dispatch<React.SetStateAction<boolean>>;
};

// 盤面の表示や各マスを押下した時の処理
export const Board = (props: BoardProps) => {
  const {
    mode,
    cntBomb,
    sizeRow,
    sizeColumn,
    squares,
    squaresOpen,
    setSquaresOpen,
    squaresDisplay,
    cntFlg,
    setCntFlg,
    squaresFlg,
    setSquaresFlg,
    isModeFlg,
    setIsModeFlg,
    playTime,
    isGameOver,
    setIsGameOver,
    isGameClear,
    isFirstSquare,
    setIsFirstSquare,
  } = props;

  const newBombs = positioningOfBomb({
    cntBomb,
    sizeRow,
    sizeColumn,
  });
  const newArryCntAroundBombs = calculateAroundBombs({
    sizeRow,
    sizeColumn,
    Bombs: newBombs,
  });

  // Bombsは爆弾の配置行列，arryCntAroundBombsは爆弾周辺のマスの表示する数字の行列
  const BombsRef = useRef<string[][]>(newBombs);
  const arryCntAroundBombsRef = useRef<number[][]>(newArryCntAroundBombs);

  // squareの盤面保持用
  const classNames = Array(sizeRow)
    .fill(null)
    .map(() => Array(sizeColumn).fill("square"));

  // squaresOpenとclassNamesを合体
  for (let row = 0; row < sizeRow; row++) {
    for (let column = 0; column < sizeColumn; column++) {
      squaresDisplay[row][
        column
      ] = `${squaresOpen[row][column]} ${classNames[row][column]}`;
    }
  }

  // 時間表示
  const { timeHoursDisplay, timeMinutesDisplay, timeSecondsDisplay } =
    playTimeForDisplay({
      playTime,
    });

  // 各マスを押した時の処理
  const onClickSquare = (row: number, column: number): void => {
    if (isGameOver || isGameClear) return;

    // 最初に選択したマスだったら盤面を作成する
    if (isFirstSquare) {
      while (
        BombsRef.current[row][column] === "bomb" ||
        arryCntAroundBombsRef.current[row][column] !== null
      ) {
        const Bombs = positioningOfBomb({
          cntBomb,
          sizeRow,
          sizeColumn,
        });
        const arryCntAroundBombs = calculateAroundBombs({
          sizeRow,
          sizeColumn,
          Bombs,
        });

        BombsRef.current = Bombs;
        arryCntAroundBombsRef.current = arryCntAroundBombs;
      }
      setIsFirstSquare(false);

      for (let row = 0; row < sizeRow; row++) {
        for (let column = 0; column < sizeColumn; column++) {
          squares[row][column] = `${
            BombsRef.current[row][column] !== null ? "💣" : ""
          } ${
            arryCntAroundBombsRef.current[row][column] !== null
              ? arryCntAroundBombsRef.current[row][column]
              : ""
          }`;
        }
      }
    }

    if (isModeFlg) {
      const newSquaresFlg = squaresFlg.map((row) => [...row]);
      if (squaresOpen[row][column] === "close") {
        if (squaresFlg[row][column] === "") {
          if (cntFlg === 0) return;
          newSquaresFlg[row][column] = "flag";
          setCntFlg((prev) => (prev -= 1));
        } else {
          newSquaresFlg[row][column] = "";
          setCntFlg((prev) => (prev += 1));
        }
      }
      setSquaresFlg(newSquaresFlg);
    } else {
      if (squaresFlg[row][column] !== "flag") {
        const clickedSquaresOpen = squaresOpen.map((row) => [...row]);
        clickedSquaresOpen[row][column] = "open";

        if (BombsRef.current[row][column] === "bomb") {
          setIsGameOver(true);
        }

        const newSquaresOpen = operateOpenSquares({
          sizeRow,
          sizeColumn,
          squares,
          squaresOpen: clickedSquaresOpen,
          setSquaresOpen,
          Bombs: BombsRef.current,
          posSquare: [row, column],
        });

        setSquaresOpen(newSquaresOpen);
      }
    }
  };

  // 旗の切り替えボタンを押した時の処理
  const onClickFlg = (): void => {
    if (isFirstSquare) return;
    setIsModeFlg(!isModeFlg);
  };

  // BombsとarryCntAroundBombsを合体
  for (let row = 0; row < sizeRow; row++) {
    for (let column = 0; column < sizeColumn; column++) {
      squares[row][column] = `${
        BombsRef.current[row][column] !== null ? "💣" : ""
      } ${
        arryCntAroundBombsRef.current[row][column] !== null
          ? arryCntAroundBombsRef.current[row][column]
          : ""
      }`;
    }
  }

  return (
    <>
      <div className="header">Minesweeper</div>
      <div
        className={`board ${
          mode === "easy"
            ? "easy"
            : mode === "normal"
            ? "normal"
            : mode === "hard"
            ? "hard"
            : null
        }`}
      >
        {(() => {
          const listSquares = [];
          let index = 0;
          for (let row = 0; row < sizeRow; row++) {
            for (let column = 0; column < sizeColumn; column++) {
              listSquares.push(
                <Square
                  key={index}
                  className={squaresDisplay[row][column]}
                  value={
                    squaresOpen[row][column] === "open"
                      ? squares[row][column]
                      : squaresFlg[row][column] === "flag"
                      ? "🚩"
                      : null
                  }
                  // value={squares[row][column]}
                  onClickSquare={() => onClickSquare(row, column)}
                />
              );
              index++;
            }
          }
          return listSquares;
        })()}
      </div>
      <div className="flgAndtime">
        <div className="flg">
          <h1 className="iconFlg">{`🚩 ${cntFlg}`}</h1>
          <button
            className={`btn ${isModeFlg ? "btnFlg" : "btnPlay"}`}
            onClick={onClickFlg}
          >
            {isModeFlg ? "Change to Play Mode" : "Change to Flag Mode"}
          </button>
        </div>
        <div className="time">
          <h1 className="iconTime">{`⏳ Time : ${timeHoursDisplay}:${timeMinutesDisplay}:${timeSecondsDisplay}`}</h1>
        </div>
      </div>
      {isGameOver ? (
        <div className={`gameover ${mode === "easy" ? "gameEasy" : null}`}>
          Game Over
        </div>
      ) : null}
      {isGameClear && !isGameOver ? (
        <div className={`gameclear ${mode === "easy" ? "gameEasy" : null}`}>
          Game Clear
        </div>
      ) : null}
    </>
  );
};
