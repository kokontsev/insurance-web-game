import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import stories from "../data/stories";
import CornerActionButton from "../components/CornerActionButton";

import balanceIcon from "../assets/outcomes/balance-icon.png";
import insuranceIcon from "../assets/outcomes/insurance-icon.png";
import exitIcon from "../assets/images/exit-icon.png";
import exitIconHover from "../assets/images/exit-icon-hover.png";

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;

function MemoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scale, setScale] = useState(1);
  const [hoveredButton, setHoveredButton] = useState(null);

  useEffect(() => {
    const updateScale = () => {
      setScale(window.innerWidth / DESIGN_WIDTH);
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const story = stories.find((item) => item.id === id);
  const savedChoice = localStorage.getItem(`story_${id}_choice`);

  if (!story || !savedChoice || !story.results[savedChoice]) {
    return null;
  }

  const result = story.results[savedChoice];

  const handleBackToStories = () => {
    localStorage.setItem(`story_${id}_completed`, "true");
    localStorage.setItem(
      `story_${id}_success`,
      savedChoice === "insured" ? "true" : "false"
    );

    navigate("/stories");
  };

  const handleReplay = () => {
    navigate(`/story/${id}`);
  };

  const memo = story.memo || [];

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

          <div style={styles.memoContainer}>
            <div style={styles.memoColumns}>
                <div style={styles.memoColumn}>
                    <div style={styles.titleCell}>Запомни</div>

                    <div style={styles.memoCardMedium}>
                    <div style={styles.memoCardTitle}>{memo[0]?.title || ""}</div>
                    <div style={styles.memoWhiteBox}>
                        <p style={styles.memoText}>{memo[0]?.text || ""}</p>
                    </div>
                    </div>

                    <div style={styles.memoCardLarge}>
                    <div style={styles.memoCardTitle}>{memo[1]?.title || ""}</div>
                    <div style={styles.memoWhiteBox}>
                        <p style={styles.memoText}>{memo[1]?.text || ""}</p>
                    </div>
                    </div>

                    <button
                        onMouseEnter={() => setHoveredButton("next")}
                        onMouseLeave={() => setHoveredButton(null)}
                        style={{
                            ...styles.memoButtonPrimary,
                            boxShadow:
                            hoveredButton === "next"
                                ? "0 0 35px rgba(141, 44, 255, 1)"
                                : "none",
                            transform: hoveredButton === "next" ? "translateY(-1px)" : "translateY(0)",
                            transition: "box-shadow 0.2s ease, transform 0.2s ease",
                        }}
                        onClick={handleBackToStories}
                        >
                        Далее
                    </button>
                </div>

                <div style={styles.memoColumn}>
                    <div style={styles.memoCardSmall}>
                    <div style={styles.memoCardTitle}>{memo[2]?.title || ""}</div>
                    <div style={styles.memoWhiteBox}>
                        <p style={styles.memoText}>{memo[2]?.text || ""}</p>
                    </div>
                    </div>

                    <div style={styles.memoCardMedium}>
                    <div style={styles.memoCardTitle}>{memo[3]?.title || ""}</div>
                    <div style={styles.memoWhiteBox}>
                        <p style={styles.memoText}>{memo[3]?.text || ""}</p>
                    </div>
                    </div>

                    <div style={styles.memoCardLarge}>
                    <div style={styles.memoCardTitle}>{memo[4]?.title || ""}</div>
                    <div style={styles.memoWhiteBox}>
                        <p style={styles.memoText}>{memo[4]?.text || ""}</p>
                    </div>
                    </div>

                    <button
                        onMouseEnter={() => setHoveredButton("replay")}
                        onMouseLeave={() => setHoveredButton(null)}
                        style={{
                            ...styles.memoButtonSecondary,
                            boxShadow:
                            hoveredButton === "replay"
                                ? "0 0 35px rgba(141, 44, 255, 1)"
                                : "none",
                            transform: hoveredButton === "replay" ? "translateY(-1px)" : "translateY(0)",
                            transition: "box-shadow 0.2s ease, transform 0.2s ease",
                        }}
                        onClick={handleReplay}
                        >
                        Пройти заново
                    </button>
                </div>
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
    fontSize: "20px",
    lineHeight: "130%",
  },

  badgeValue: {
    color: "#141414",
    fontFamily: "Roboto, Arial, sans-serif",
    fontSize: "20px",
    lineHeight: "130%",
  },

  memoContainer: {
  position: "absolute",
  top: "231px",
  left: "328px",
  width: "1264px",
  height: "718px",
  backgroundColor: "#D6FF32",
  borderRadius: "72px",
  padding: "40px",
  boxSizing: "border-box",
},

memoColumns: {
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "space-between",
  gap: "20px",
},

memoColumn: {
  width: "582px",
  height: "638px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
},

titleCell: {
  width: "582px",
  height: "150px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#141414",
  fontFamily: '"Epilepsy Sans", "Arial Black", sans-serif',
  fontWeight: "700",
  fontSize: "60px",
  lineHeight: "100%",
  textAlign: "center",
},

memoCardSmall: {
  width: "582px",
  height: "150px",
  backgroundColor: "#D4AFFF",
  borderRadius: "50px",
  padding: "12px 10px 12px 10px",
  border: "1px solid #8D2CFF",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
},

memoCardMedium: {
  width: "582px",
  height: "150px",
  backgroundColor: "#D4AFFF",
  borderRadius: "50px",
  padding: "12px 10px 12px 10px",
  border: "1px solid #8D2CFF",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
},

memoCardLarge: {
  width: "582px",
  height: "226px",
  backgroundColor: "#D4AFFF",
  borderRadius: "50px",
  padding: "12px 10px 12px 10px",
  border: "1px solid #8D2CFF",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
},

memoCardTitle: {
  color: "#141414",
  fontFamily: "Roboto, Arial, sans-serif",
  fontWeight: "400",
  fontSize: "24px",
  lineHeight: "130%",
  paddingLeft: "12px",
  marginBottom: "6px",
},

memoWhiteBox: {
  width: "562px",
  flex: 1,
  backgroundColor: "#EAEAEA",
  borderRadius: "32px",
  padding: "10px 20px",
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
},

memoText: {
  margin: 0,
  color: "#141414",
  fontFamily: "Roboto, Arial, sans-serif",
  fontWeight: "400",
  fontSize: "17px",
  lineHeight: "130%",
},

memoButtonPrimary: {
  width: "582px",
  height: "52px",
  border: "none",
  borderRadius: "24px",
  padding: "12px 20px 14px 20px",
  boxSizing: "border-box",
  background: "linear-gradient(90deg, #8D2CFF 0%, #A13BFF 100%)",
  color: "#FFFFFF",
  fontFamily: "Roboto, Arial, sans-serif",
  fontSize: "20px",
  lineHeight: "130%",
},

memoButtonSecondary: {
  width: "582px",
  height: "52px",
  borderRadius: "24px",
  padding: "12px 20px 14px 20px",
  boxSizing: "border-box",
  backgroundColor: "#D6FF32",
  border: "2px solid #8D2CFF",
  color: "#8D2CFF",
  fontFamily: "Roboto, Arial, sans-serif",
  fontSize: "20px",
  lineHeight: "130%",
},
};

export default MemoPage;