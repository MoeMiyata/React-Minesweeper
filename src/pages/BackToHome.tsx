import { useNavigate } from "react-router-dom";

// 404ページの代用
export const BackToHome = () => {
  const navigate = useNavigate();
  const handleBackToHome = () => {
    navigate("/");
  };
  return (
    <>
      <div className="header">Minesweeper</div>
      <div className="btnBack">
        <button className="btn btnGoToHome" onClick={handleBackToHome}>
          Back to Home
        </button>
      </div>
    </>
  );
};
export default BackToHome;
