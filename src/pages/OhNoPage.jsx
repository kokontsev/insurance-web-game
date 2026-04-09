import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import stories from "../data/stories";
import CornerActionButton from "../components/CornerActionButton";

import balanceIcon from "../assets/outcomes/balance-icon.png";
import insuranceIcon from "../assets/outcomes/insurance-icon.png";
import exitIcon from "../assets/images/exit-icon.png";
import exitIconHover from "../assets/images/exit-icon-hover.png";
import decorOhNo from "../assets/outcomes/decor-ohno.png";

import phoneOhNo from "../assets/outcomes/phone-ohno.png";
import skateOhNo from "../assets/outcomes/skate-ohno.png";
import accountOhNo from "../assets/outcomes/account-ohno.png";
import concertOhNo from "../assets/outcomes/concert-ohno.png";
import tripOhNo from "../assets/outcomes/trip-ohno.png";
import scooterOhNo from "../assets/outcomes/scooter-ohno.png";

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;

const innerImages = {
  phone: phoneOhNo,
  skate: skateOhNo,
  account: accountOhNo,
  concert: concertOhNo,
  trip: tripOhNo,
  scooter: scooterOhNo,
};

function OhNoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scale, setScale] = useState(1);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

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

  if (!story || !savedChoice) {
    return null;
  }

  const insuranceLabel = savedChoice === "insured" ? "Да" : "Нет";

  return (
    <div style={styles.page}>
      <div style={{ ...styles.sceneWrapper, width: DESIGN_WIDTH * scale, height: DESIGN_HEIGHT * scale }}>
        <div style={{ ...styles.scene, transform: `scale(${scale})` }}>
          <Header
            heroName={story.heroName}
            balance={story.startBalance}
            insuranceLabel={insuranceLabel}
            navigate={navigate}
            balanceIcon={balanceIcon}
            insuranceIcon={insuranceIcon}
            exitIcon={exitIcon}
          />

          <img src={decorOhNo} alt="" style={styles.decorOhNo} />

          <div style={{ ...styles.resultCard, backgroundColor: "#D6FF32" }}>
            <h1 style={styles.resultTitle}>О нет!</h1>

            <div style={styles.innerCard}>
              <div style={styles.innerTextArea}>
                <p style={styles.bodyText}>{story.ohNoText}</p>
              </div>

              <div style={styles.innerImageArea}>
                <img src={innerImages[id]} alt="" style={styles.innerImage} />
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
                onClick={() => navigate(`/story/${id}/outcome`)}
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

function Header({
  heroName,
  balance,
  insuranceLabel,
  navigate,
  balanceIcon,
  insuranceIcon,
  exitIcon,
}) {
  return (
    <>
      <div style={styles.topBar}>
        <div style={styles.heroName}>{heroName}</div>

        <div style={styles.badges}>
          <div style={styles.badge}>
            <img src={balanceIcon} alt="" style={styles.badgeIcon} />
            <span style={styles.badgeLabel}>Баланс:</span>
            <span style={styles.badgeValue}>{balance}</span>
          </div>

          <div style={styles.badge}>
            <img src={insuranceIcon} alt="" style={styles.badgeIcon} />
            <span style={styles.badgeLabel}>Страховка:</span>
            <span style={styles.badgeValue}>{insuranceLabel}</span>
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
    </>
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
    zIndex: 10,
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
  decorOhNo: {
    position: "absolute",
    width: "1298px",
    height: "728px",
    top: "174px",
    left: "294px",
    objectFit: "contain",
    pointerEvents: "none",
    zIndex: 1,
  },
  resultCard: {
    position: "absolute",
    width: "750px",
    height: "800px",
    top: "176px",
    left: "585px",
    borderRadius: "72px",
    padding: "40px",
    boxSizing: "border-box",
    zIndex: 2,
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
  padding: "30px 20px 28px 20px",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  gap: "24px",
},
  innerTextArea: {
  width: "100%",
  minHeight: "130px",
},
  bodyText: {
    margin: 0,
    color: "#141414",
    fontFamily: "Roboto, Arial, sans-serif",
    fontSize: "20px",
    lineHeight: "130%",
  },
  innerImageArea: {
  width: "100%",
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 0,
},
  innerImage: {
  width: "460px",
  height: "300px",
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
  fontSize: "20px",
  lineHeight: "130%",
  cursor: "pointer",
  alignSelf: "center",
  marginTop: "auto",
},
};

export default OhNoPage;