import { useEffect, useState } from "react";
import { Board } from "./layouts/Board";
import { judgeGameClear } from "./functions/judgeGameClear";

type GameProps = {
  mode: string;
};

// ゲーム機能
export const Game = (props: GameProps) => {
  const { mode } = props;

  let cntBomb = 0;
  let sizeRow = 0;
  let sizeColumn = 0;
  if (mode === "easy") {
    cntBomb = 10;
    sizeRow = 9;
    sizeColumn = 9;
  } else if (mode === "normal") {
    cntBomb = 40;
    sizeRow = 16;
    sizeColumn = 16;
  } else if (mode === "hard") {
    cntBomb = 99;
    sizeRow = 16;
    sizeColumn = 30;
  }

  // ゲーム終了判定
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameClear, setIsGameClear] = useState(false);
  // play時間保持
  const [playTime, setPlayTime] = useState(0);
  // 旗の所持数
  const [cntFlg, setCntFlg] = useState(cntBomb);
  // flageモードかplayモードか保持（true:flg, false:play）
  const [isModeFlg, setIsModeFlg] = useState(false);
  // 最初のマス選択か判別
  const [isFirstSquare, setIsFirstSquare] = useState(true);

  // 時間計測
  useEffect(() => {
    if (isGameOver || isGameClear) return; // ゲームオーバー時は処理しない

    const handle = setInterval(
      () => setPlayTime((newPlayTime) => (newPlayTime += 1)),
      1000
    );

    return () => clearInterval(handle);
  }, [isGameOver, isGameClear]);

  // 盤面の答えの状態
  const squares = Array(sizeRow)
    .fill(null)
    .map(() => Array(sizeColumn).fill(null));

  // 盤面の答えの状態
  const squaresDisplay = Array(sizeRow)
    .fill(null)
    .map(() => Array(sizeColumn).fill(null));

  // openした状態の場所を保持する行列（デフォルトはclose）
  const [squaresOpen, setSquaresOpen] = useState(
    Array(sizeRow)
      .fill(null)
      .map(() => Array(sizeColumn).fill("close"))
  );

  // 盤面の旗の状態
  const [squaresFlg, setSquaresFlg] = useState(
    Array(sizeRow)
      .fill(null)
      .map(() => Array(sizeColumn).fill(""))
  );

  // ゲームクリアか判定
  useEffect(() => {
    judgeGameClear({
      cntBomb,
      sizeRow,
      sizeColumn,
      setIsGameClear,
      squaresOpen,
    });
  }, [squaresOpen]);

  return (
    <Board
      mode={mode}
      cntBomb={cntBomb}
      sizeRow={sizeRow}
      sizeColumn={sizeColumn}
      squares={squares}
      squaresOpen={squaresOpen}
      setSquaresOpen={setSquaresOpen}
      squaresDisplay={squaresDisplay}
      cntFlg={cntFlg}
      setCntFlg={setCntFlg}
      squaresFlg={squaresFlg}
      setSquaresFlg={setSquaresFlg}
      isModeFlg={isModeFlg}
      setIsModeFlg={setIsModeFlg}
      playTime={playTime}
      isGameOver={isGameOver}
      setIsGameOver={setIsGameOver}
      isGameClear={isGameClear}
      isFirstSquare={isFirstSquare}
      setIsFirstSquare={setIsFirstSquare}
    />
  );
};
