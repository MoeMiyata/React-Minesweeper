import { useNavigate } from "react-router-dom";

// ゲーム難易度選択画面かつホーム画面
export const Home = () => {
  const navigate = useNavigate();
  const handleEasy = () => {
    navigate("/easy");
  };
  const handleNormal = () => {
    navigate("/normal");
  };
  const handleHard = () => {
    navigate("/hard");
  };
  return (
    <>
      <div className="header">Minesweeper</div>
      <div className="selectLevel">
        <div className="textSelect">
          <h1>Please choose the difficulty level !</h1>
        </div>
        <div className="btnSelect">
          <button className="btn btnEasy" onClick={handleEasy}>
            Easy
          </button>
          <p className="rule ruleEasy">9x9 with 10 mines</p>
          <br />
          <button className="btn btnNormal" onClick={handleNormal}>
            Normal
          </button>
          <p className="rule ruleNormal">16x16 with 40 mines</p>
          <br />
          <button className="btn btnHard" onClick={handleHard}>
            Hard
          </button>
          <p className="rule ruleHard">30x16 with 99 mines</p>
        </div>
      </div>
    </>
  );
};
export default Home;

// マインスイーパのルール
// 初級：9×9のマスに10個の地雷（Windows Meまでのバージョンは8×8）
// 中級：16×16のマスに40個の地雷
// 上級：30×16のマスに99個の地雷
