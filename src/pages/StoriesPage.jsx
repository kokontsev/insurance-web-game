import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetGame } from "../utils/resetGame";
import stories from "../data/stories";
import giftIcon from "../assets/images/gift-icon.png";
import exitIcon from "../assets/images/exit-icon.png";
import exitIconHover from "../assets/images/exit-icon-hover.png";
import CornerActionButton from "../components/CornerActionButton";

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;


function StoriesPage() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "Имя";
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const widthScale = window.innerWidth / DESIGN_WIDTH;
      const heightScale = window.innerHeight / DESIGN_HEIGHT;
      setScale(Math.min(widthScale, heightScale));
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const successCount = stories.filter(
    (story) => localStorage.getItem(`story_${story.id}_success`) === "true"
  ).length;

  useEffect(() => {
    const certificateShown = localStorage.getItem("certificateShown") === "true";

    if (
        successCount === stories.length &&
        stories.length > 0 
    ) {
        localStorage.setItem("certificateShown", "true");
        navigate("/certificate");
    }
    }, [successCount, navigate]);

  const handleOpenStory = (storyId) => {
    navigate(`/story/${storyId}`);
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
            <div style={styles.hello}>Привет, {userName}!</div>

            <div style={styles.progressCenter}>
              <div style={styles.progressText}>Твой прогресс</div>

              <div style={styles.progressRow}>
                <div style={styles.progressTrack}>
                  <div
                    style={{
                      ...styles.progressFill,
                      width: `${(successCount / stories.length) * 100}%`,
                    }}
                  />
                </div>

                <img src={giftIcon} alt="" style={styles.giftIcon} />
              </div>
            </div>
          </div>

          <CornerActionButton
            onClick={() => {
                resetGame();
                navigate("/");
            }}
            icon={exitIcon}
            hoverIcon={exitIconHover}
            style={{
              top: "12px",
              left: "1680px",
              width: "40px",
              height: "40px",
            }}
          />

          <h1 style={styles.title}>Выбери историю!</h1>

          <div style={styles.cardsArea}>
            {stories.map((story) => {
              const isCompleted =
                localStorage.getItem(`story_${story.id}_completed`) === "true";
              const isSuccess =
                localStorage.getItem(`story_${story.id}_success`) === "true";

              let cardBackground = "#CFAEF7";
              let textColor = "#141414";
              let buttonText = "Играть";

              if (isCompleted && isSuccess) {
                cardBackground = "#141414";
                textColor = "#FFFFFF";
                buttonText = "Пройти снова";
              } else if (isCompleted && !isSuccess) {
                cardBackground = "#FF5C5D";
                textColor = "#141414";
                buttonText = "Пройти снова";
              }

              return (
                <div
                    key={story.id}
                    onMouseEnter={() => setHoveredCard(story.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{
                        ...styles.card,
                        backgroundColor: cardBackground,
                        boxShadow:
                            hoveredCard === story.id
                                ? "0 0px 50px rgba(141, 44, 255, 1)"
                                : "none",
                        transform: hoveredCard === story.id ? "translateY(-2px)" : "translateY(0)",
                        transition: "box-shadow 0.2s ease, transform 0.2s ease",
                    }}
                    >
                  <h2 style={{ ...styles.cardTitle, color: textColor }}>
                    {story.title}
                  </h2>

                  <p style={{ ...styles.cardSubtitle, color: textColor }}>
                    {story.subtitle}
                  </p>

                  <img src={story.image} alt={story.title} style={styles.image} />

                  {/* <div style={styles.imageArea}>
                    <img src={story.image} alt={story.title} style={styles.image} />
                  </div> */}

                  <button
                    style={styles.cardButton}
                    onClick={() => handleOpenStory(story.id)}
                  >
                    {buttonText}
                  </button>
                </div>
              );
            })}
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
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
    height: "64px",
    backgroundColor: "#D6FF32",
    padding: "10px 200px 14px 200px",
    boxSizing: "border-box",
  },

  hello: {
    position: "absolute",
    left: "200px",
    top: "14px",
    width: "172px",
    height: "36px",
    color: "#141414",
    fontFamily: "Roboto, Arial, sans-serif",
    fontWeight: "400",
    fontSize: "28px",
    lineHeight: "130%",
    whiteSpace: "nowrap",
  },

  progressCenter: {
    position: "absolute",
    left: "50%",
    top: "10px",
    transform: "translateX(-42%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },

  progressText: {
  width: "240px",
  height: "22px",
  color: "#141414",
  fontFamily: "Roboto, Arial, sans-serif",
  fontWeight: "400",
  fontSize: "17px",
  lineHeight: "130%",
  textAlign: "left",
  marginBottom: "2px",
},

  progressRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "-2px",
  },

  progressTrack: {
    width: "220px",
    height: "12px",
    backgroundColor: "rgba(20,20,20,0.18)",
    borderRadius: "8px",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#8D2CFF",
    borderRadius: "8px",
  },

  giftIcon: {
    width: "40px",
    height: "40px",
    top: "-20px",
    objectFit: "contain",
    display: "block",
    marginTop: "-20px",
  },

  title: {
    position: "absolute",
    top: "100px",
    left: "718px",
    width: "485px",
    height: "60px",
    margin: 0,
    color: "#EAEAEA",
    fontFamily: '"Epilepsy Sans Bold", "Arial Black", sans-serif',
    fontWeight: "700",
    fontSize: "60px",
    lineHeight: "100%",
    textAlign: "center",
    whiteSpace: "nowrap",
  },

  cardsArea: {
    position: "absolute",
    top: "200px",
    left: "200px",
    width: "1520px",
    height: "812px",
    display: "grid",
    gridTemplateColumns: "repeat(3, 493px)",
    gridTemplateRows: "repeat(2, 396px)",
    columnGap: "20px",
    rowGap: "20px",
  },

  card: {
    width: "493px",
    height: "396px",
    borderRadius: "50px",
    border: "2px solid #8D2CFF",
    boxSizing: "border-box",
    padding: "28px 28px 22px 28px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  cardTitle: {
    margin: "0 0 8px 0",
    fontFamily: '"Epilepsy Sans", "Arial Black", sans-serif',
    fontWeight: "500",
    fontSize: "48px",
    lineHeight: "100%",
    textAlign: "center",
  },

  cardSubtitle: {
    margin: "0 0 8px 0",
    fontFamily: "Roboto, Arial, sans-serif",
    fontWeight: "400",
    fontSize: "22px",
    lineHeight: "130%",
    textAlign: "center",
  },

  imageArea: {
  width: "363px",
  height: "170px",
  backgroundColor: "transparent",
  borderRadius: "36px",
  border: "none",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "18px",
  boxSizing: "border-box",
},

  image: {
    width: "92%%",
    height: "92%%",
    borderRadius: "36px",
    objectFit: "cover",
    display: "block",
  },

  cardButton: {
    marginTop: "auto",
    width: "100%",
    height: "52px",
    border: "none",
    borderRadius: "999px",
    background: "linear-gradient(90deg, #8D2CFF 0%, #A13BFF 100%)",
    color: "#FFFFFF",
    fontFamily: "Roboto, Arial, sans-serif",
    fontWeight: "400",
    fontSize: "20px",
    lineHeight: "130%",
    cursor: "pointer",
  },
};

export default StoriesPage;