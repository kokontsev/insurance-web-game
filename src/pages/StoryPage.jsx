import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import stories from "../data/stories";
import CornerActionButton from "../components/CornerActionButton";
import { resetGame } from "../utils/resetGame";

import balanceIcon from "../assets/story/balance-icon.png";
import insuranceIcon from "../assets/story/insurance-icon.png";
import exitIcon from "../assets/images/exit-icon.png";
import exitIconHover from "../assets/images/exit-icon-hover.png";
import scrollImage from "../assets/story/scroll.png";

import phoneLeft from "../assets/story/phone-left.png";
import phoneRight from "../assets/story/phone-right.png";
import skateLeft from "../assets/story/skate-left.png";
import skateRight from "../assets/story/skate-right.png";
import accountLeft from "../assets/story/account-left.png";
import accountRight from "../assets/story/account-right.png";
import concertLeft from "../assets/story/concert-left.png";
import concertRight from "../assets/story/concert-right.png";
import tripLeft from "../assets/story/trip-left.png";
import tripRight from "../assets/story/trip-right.png";
import scooterLeft from "../assets/story/scooter-left.png";
import scooterRight from "../assets/story/scooter-right.png";

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;

const storyAssets = {
  phone: { left: phoneLeft, right: phoneRight },
  skate: { left: skateLeft, right: skateRight },
  account: { left: accountLeft, right: accountRight },
  concert: { left: concertLeft, right: concertRight },
  trip: { left: tripLeft, right: tripRight },
  scooter: { left: scooterLeft, right: scooterRight },
};

function StoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scale, setScale] = useState(1);
  const [hoveredButton, setHoveredButton] = useState(null);

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

  if (!story) {
    return (
      <div style={styles.page}>
        <div
          style={{
            ...styles.sceneWrapper,
            width: DESIGN_WIDTH * scale,
            height: DESIGN_HEIGHT * scale,
          }}
        >
          <div
            style={{
              ...styles.scene,
              transform: `scale(${scale})`,
            }}
          >
            <div style={styles.fallback}>История не найдена</div>
          </div>
        </div>
      </div>
    );
  }

  const assets = storyAssets[id];

  const handleChoiceClick = (choiceId) => {
    localStorage.setItem(`story_${story.id}_choice`, choiceId);
    navigate(`/story/${story.id}/ohno`);
  };

  return (
    <div style={styles.page}>
      <div
        style={{
          ...styles.sceneWrapper,
          width: DESIGN_WIDTH * scale,
          height: DESIGN_HEIGHT * scale,
        }}
      >
        <div
          style={{
            ...styles.scene,
            transform: `scale(${scale})`,
          }}
        >
          <div style={styles.topBar}>
            <div style={styles.heroName}>{story.heroName}</div>

            <div style={styles.badges}>
              <div style={styles.badge}>
                <img src={balanceIcon} alt="" style={styles.badgeIcon} />
                <span style={styles.badgeLabel}>Баланс:</span>
                <span style={styles.badgeValue}>{story.startBalance}</span>
              </div>

              <div style={styles.badge}>
                <img src={insuranceIcon} alt="" style={styles.badgeIcon} />
                <span style={styles.badgeLabel}>Страховка:</span>
                <span style={styles.badgeValue}>{story.insuranceLabel}</span>
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

          <div style={styles.mainContainer}>
            <div style={styles.leftCard}>
              <h2 style={styles.sectionTitle}>Ситуация</h2>

              <div style={styles.leftTextArea}>
                <p style={styles.bodyText}>{story.situationText}</p>
              </div>

              <div style={styles.leftImageArea}>
                <img src={assets.left} alt="" style={styles.leftImage} />
              </div>

              <div style={styles.bottomQuestion}>{story.questionText}</div>
            </div>

            <div style={styles.rightCard}>
              <h2 style={styles.sectionTitle}>Твой ход</h2>

              <div style={styles.rightTextArea}>
                <p style={styles.bodyText}>{story.choiceText}</p>
              </div>

              <div style={styles.choiceColumns}>
                <div style={styles.choiceBlockLeft}>
                  <img src={scrollImage} alt="" style={styles.scrollImage} />

                  <button
                    onMouseEnter={() => setHoveredButton("left")}
                    onMouseLeave={() => setHoveredButton(null)}
                    style={{
                        ...styles.choiceButton,
                        boxShadow:
                        hoveredButton === "left"
                            ? "0 0 35px rgba(141, 44, 255, 1)"
                            : "none",
                        transform: hoveredButton == "left" ? "translateY(-1px)" : "translateY(0)",
                        transition: "box-shadow 0.2s ease, transform 0.2s ease",
                    }}
                    onClick={() => handleChoiceClick(story.choices[0].id)}
                    >
                    {story.choices[0].label}
                    </button>
                </div>

                <div style={styles.choiceBlockRight}>
                  <img src={assets.right} alt="" style={styles.rightChoiceImage} />

                  <button
                    onMouseEnter={() => setHoveredButton("right")}
                    onMouseLeave={() => setHoveredButton(null)}
                    style={{
                        ...styles.choiceButton,
                        boxShadow:
                        hoveredButton === "right"
                            ? "0 0 35px rgba(141, 44, 255, 1)"
                            : "none",
                        transform: hoveredButton == "right" ? "translateY(-1px)" : "translateY(0)",
                        transition: "box-shadow 0.2s ease, transform 0.2s ease",
                    }}
                    onClick={() => handleChoiceClick(story.choices[1].id)}
                    >
                    {story.choices[1].label}
                    </button>
                </div>
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

  mainContainer: {
    position: "absolute",
    top: "176px",
    left: "200px",
    width: "1520px",
    height: "800px",
    backgroundColor: "#D4AFFF",
    borderRadius: "72px",
    padding: "40px",
    boxSizing: "border-box",
    display: "flex",
    gap: "20px",
  },

  leftCard: {
    width: "582px",
    height: "652px",
    borderRadius: "50px",
    border: "2px solid #8D2CFF",
    backgroundColor: "#EAEAEA",
    padding: "20px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
  },

  rightCard: {
  width: "838px",
  height: "652px",
  borderRadius: "50px",
  border: "2px solid #8D2CFF",
  backgroundColor: "#EAEAEA",
  padding: "20px 40px 20px 40px",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
},

  sectionTitle: {
    margin: "0 0 14px 0",
    color: "#141414",
    fontFamily: '"Epilepsy Sans", "Arial Black", sans-serif',
    fontWeight: "500",
    fontSize: "48px",
    lineHeight: "100%",
    textAlign: "center",
  },

  leftTextArea: {
    width: "100%",
    minHeight: "140px",
  },

  rightTextArea: {
    width: "100%",
    minHeight: "110px",
  },

  bodyText: {
    margin: 0,
    color: "#141414",
    fontFamily: "Roboto, Arial, sans-serif",
    fontWeight: "400",
    fontSize: "20px",
    lineHeight: "130%",
  },

  leftImageArea: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  leftImage: {
    maxWidth: "96%",
    maxHeight: "96%",
    objectFit: "contain",
    display: "block",
  },

  bottomQuestion: {
    marginTop: "8px",
    color: "#141414",
    fontFamily: "Roboto, Arial, sans-serif",
    fontWeight: "400",
    fontSize: "20px",
    lineHeight: "130%",
    textAlign: "center",
  },

  choiceColumns: {
  display: "flex",
  justifyContent: "space-between",
  gap: "20px",
  flex: 1,
  minHeight: 0,
},

  choiceBlockLeft: {
  width: "369px",
  height: "100%",
  borderRadius: "48px",
  padding: "16px 10px 0 20px",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  minHeight: 0,
},

  choiceBlockRight: {
  width: "369px",
  height: "100%",
  borderRadius: "48px",
  padding: "16px 20px 0 10px",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  minHeight: 0,
},

  scrollImage: {
    width: "219.81px",
    height: "370.98px",
    objectFit: "contain",
    display: "block",
    transform: "rotate(10.62deg)",
  },

  rightChoiceImage: {
    maxWidth: "337px",
    maxHeight: "370px",
    objectFit: "contain",
    display: "block",
  },

  choiceButton: {
    width: "339px",
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

export default StoryPage;