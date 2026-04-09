import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import stories from "../data/stories";
import CornerActionButton from "../components/CornerActionButton";

import balanceIcon from "../assets/result/balance-icon.png";
import insuranceIcon from "../assets/result/insurance-icon.png";
import exitIcon from "../assets/images/exit-icon.png";
import exitIconHover from "../assets/images/exit-icon-hover.png";
import resultSuccess from "../assets/result/result-success.png";
import resultFail from "../assets/result/result-fail.png";
import resultSad from "../assets/result/result-sad.png";

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;

function ResultPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scale, setScale] = useState(1);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  useEffect(() => {
    const updateScale = () => {
      const widthScale = window.innerWidth / DESIGN_WIDTH;
      setScale(widthScale);
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const story = stories.find((item) => item.id === id);
  const savedChoice = localStorage.getItem(`story_${id}_choice`);

  if (!story || !savedChoice || !story.results[savedChoice]) {
    return (
      <div style={styles.page}>
        <div
          style={{
            ...styles.sceneWrapper,
            width: DESIGN_WIDTH * scale,
            height: DESIGN_HEIGHT * scale,
          }}
        >
          <div style={{ ...styles.scene, transform: `scale(${scale})` }}>
            <div style={styles.fallback}>Результат не найден</div>
          </div>
        </div>
      </div>
    );
  }

  const result = story.results[savedChoice];
  const isSuccess = savedChoice === "insured";
  const isSad = result.title.toLowerCase().includes("эх");
  const decorImage = isSuccess ? resultSuccess : isSad ? resultSad : resultFail;

  return (
    <div style={styles.page}>
      <div
        style={{
          ...styles.sceneWrapper,
          width: DESIGN_WIDTH * scale,
          height: DESIGN_HEIGHT * scale,
        }}
      >
        <div style={{ ...styles.scene, transform: `scale(${scale})` }}>
          <div style={styles.topBar}>
            <div style={styles.heroName}>{story.heroName}</div>

            <div style={styles.badges}>
              <div style={styles.badge}>
                <img src={balanceIcon} alt="" style={styles.badgeIcon} />
                <span style={styles.badgeLabel}>Баланс:</span>
                <span style={styles.badgeValue}>{result.balance}</span>
              </div>

              <div style={styles.badge}>
                <img src={insuranceIcon} alt="" style={styles.badgeIcon} />
                <span style={styles.badgeLabel}>Страховка:</span>
                <span style={styles.badgeValue}>{result.insuranceLabel}</span>
              </div>
            </div>
          </div>

          <CornerActionButton
            onClick={() => navigate("/stories")}
            icon={exitIcon}
            hoverIcon={exitIconHover}
            style={{
              top: "16px",
              left: "1680px",
              width: "40px",
              height: "40px",
            }}
          />

          <div style={styles.resultCard}>
            <h1 style={styles.resultTitle}>{result.title}</h1>

            <div style={styles.innerCard}>
              <div style={styles.textArea}>
                <p style={styles.bodyText}>{result.text}</p>
              </div>

              <div style={styles.imageArea}>
                <img src={decorImage} alt="" style={styles.resultImage} />
              </div>

              <button
                onMouseEnter={() => setIsButtonHovered(true)}
                onMouseLeave={() => setIsButtonHovered(false)}
                style={{
                    ...styles.mainButton,
                    boxShadow: isButtonHovered
                    ? "0 0 35px rgba(141, 44, 255, 1)"
                    : "none",
                    transform: isButtonHovered ? "translateY(-1px)" : "translateY(0)",
                    transition: "box-shadow 0.2s ease, transform 0.2s ease",
                }}
                onClick={() => navigate(`/story/${id}/memo`)}
              >
                Далее
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    width: "100vw",
    height: "100vh",
    overflowX: "hidden",
    overflowY: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },

  sceneWrapper: {
    position: "relative",
  },

  scene: {
    width: `${DESIGN_WIDTH}px`,
    height: `${DESIGN_HEIGHT}px`,
    position: "absolute",
    top: 0,
    left: 0,
    transformOrigin: "top left",
  },

  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "1920px",
    height: "72px",
    backgroundColor: "#D6FF32",
    padding: "10px 200px 14px 200px",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    gap: "18px",
  },

  heroName: {
    color: "#141414",
    fontFamily: '"Epilepsy Sans", "Arial Black", sans-serif',
    fontWeight: "500",
    fontSize: "48px",
    lineHeight: "100%",
    whiteSpace: "nowrap",
  },

  badges: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },

  badge: {
    width: "190px",
    minWidth: "190px",
    height: "36px",
    borderRadius: "24px",
    padding: "5px 10px",
    gap: "10px",
    border: "1px solid #8B8B8B",
    backgroundColor: "#EAEAEA",
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
  },

  badgeIcon: {
    width: "16px",
    height: "16px",
    objectFit: "contain",
    display: "block",
  },

  badgeLabel: {
    color: "#5C5C5C",
    fontFamily: "Roboto, Arial, sans-serif",
    fontWeight: "400",
    fontSize: "20px",
    lineHeight: "130%",
  },

  badgeValue: {
    color: "#141414",
    fontFamily: "Roboto, Arial, sans-serif",
    fontWeight: "400",
    fontSize: "20px",
    lineHeight: "130%",
  },

  resultCard: {
    position: "absolute",
    top: "176px",
    left: "585px",
    width: "750px",
    height: "800px",
    backgroundColor: "#D4AFFF",
    borderRadius: "72px",
    padding: "40px",
    boxSizing: "border-box",
  },

  resultTitle: {
    margin: "0 0 20px 0",
    color: "#141414",
    fontFamily: '"Epilepsy Sans", "Arial Black", sans-serif',
    fontWeight: "500",
    fontSize: "48px",
    lineHeight: "100%",
    textAlign: "center",
  },

  innerCard: {
    width: "670px",
    height: "652px",
    backgroundColor: "#EAEAEA",
    borderRadius: "50px",
    border: "2px solid #8D2CFF",
    padding: "30px 20px 20px 20px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    gap: "40px",
  },

  textArea: {
    width: "100%",
    minHeight: "150px",
  },

  bodyText: {
    margin: 0,
    color: "#141414",
    fontFamily: "Roboto, Arial, sans-serif",
    fontWeight: "400",
    fontSize: "20px",
    lineHeight: "130%",
    textAlign: "left",
  },

  imageArea: {
    width: "100%",
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  resultImage: {
    width: "507px",
    height: "370px",
    objectFit: "contain",
    display: "block",
  },

  mainButton: {
    width: "630px",
    height: "52px",
    border: "none",
    borderRadius: "24px",
    padding: "12px 20px 14px 20px",
    boxSizing: "border-box",
    background: "linear-gradient(90deg, #8D2CFF 0%, #A13BFF 100%)",
    color: "#FFFFFF",
    fontFamily: "Roboto, Arial, sans-serif",
    fontWeight: "400",
    fontSize: "20px",
    lineHeight: "130%",
    cursor: "pointer",
    alignSelf: "center",
  },

  fallback: {
    position: "absolute",
    top: "200px",
    left: "200px",
    fontSize: "40px",
    color: "#EAEAEA",
    fontFamily: "Roboto, Arial, sans-serif",
  },
};

export default ResultPage;