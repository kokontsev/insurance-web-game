import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toPng } from "html-to-image";
import CornerActionButton from "../components/CornerActionButton";
import { resetGame } from "../utils/resetGame";

import exitIcon from "../assets/images/exit-icon.png";
import exitIconHover from "../assets/images/exit-icon-hover.png";
import closeIcon from "../assets/certificate/close-icon.png";
import certificateCat from "../assets/certificate/certificate-cat.png";
import certificateStars from "../assets/certificate/certificate-stars.png";

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;
const SAVED_MONEY = 122500;

function CertificatePage() {
  const navigate = useNavigate();
  const [scale, setScale] = useState(1);
  const certificateRef = useRef(null);
  const [isDownloadHovered, setIsDownloadHovered] = useState(false);

  const userName = useMemo(() => {
    return localStorage.getItem("userName") || "Имя";
  }, []);

  useEffect(() => {
    const updateScale = () => {
      setScale(window.innerWidth / DESIGN_WIDTH);
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

//   const handleClose = () => {
//   console.log("close clicked");
//   navigate("/stories");
// };

  const handleExit = () => {
    resetGame();
    navigate("/");
  };

  const handleDownload = async () => {
    if (!certificateRef.current) return;

    try {
      const dataUrl = await toPng(certificateRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      });

      const link = document.createElement("a");
      link.download = `certificate-${userName}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Ошибка при скачивании сертификата:", error);
    }
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
          <CornerActionButton
            onClick={handleExit}
            icon={exitIcon}
            hoverIcon={exitIconHover}
            style={{
              top: "16px",
              left: "1680px",
              width: "40px",
              height: "40px",
            }}
          />

          <div style={styles.outerCard}>
            {/* <button onClick={handleClose} style={styles.closeButton}>
              <img src={closeIcon} alt="" style={styles.closeIcon} />
            </button> */}

            <div style={styles.topTextBlock}>
              <h1 style={styles.title}>Поздравляем!</h1>
              <h2 style={styles.subtitle}>Ты сэкономил {SAVED_MONEY} рублей!</h2>
              <p style={styles.description}>
                Ты успешно решил все задачи! Имеешь полное право гордиться собой)
                Вот она — сила страховки. И самое классное — ты можешь применить
                новые знания в жизни и сохранить не только кошачьи монеты, но и
                свои реальные деньги) Удачи!
              </p>
            </div>

            <div ref={certificateRef} style={styles.certificateBlock}>
              <img src={certificateStars} alt="" style={styles.stars} />

              <div style={styles.certificateTextArea}>
                <div style={styles.certificateTitle}>Сертификат</div>

                <div style={styles.certificateTextSmall}>Подтверждает, что</div>

                <div style={styles.certificateName}>{userName}</div>

                <div style={styles.certificateTextMain}>
                  Прошёл все уровни игры «Страх и риск»
                  <br />
                  и стал подтверждённым «Знатоком
                  <br />
                  страховки»!
                </div>
              </div>

              <img src={certificateCat} alt="" style={styles.catImage} />
            </div>

            <button
                onMouseEnter={() => setIsDownloadHovered(true)}
                onMouseLeave={() => setIsDownloadHovered(false)}
                style={{
                    ...styles.downloadButton,
                    boxShadow: isDownloadHovered
                    ? "0 0 35px rgba(141, 44, 255, 1)"
                    : "none",
                    transform: isDownloadHovered ? "translateY(-1px)" : "translateY(0)",
                    transition: "box-shadow 0.2s ease, transform 0.2s ease",
                }}
                onClick={handleDownload}
                >
                Скачать сертификат
                </button>
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

  outerCard: {
    position: "absolute",
    top: "95px",
    left: "328px",
    width: "1264px",
    height: "889px",
    backgroundColor: "#D4AFFF",
    borderRadius: "72px",
    padding: "40px",
    boxSizing: "border-box",
    border: "10px solid #8D2CFF",
  },

  closeButton: {
    position: "absolute",
    top: "40px",
    right: "40px",
    width: "40px",
    height: "40px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  closeIcon: {
    width: "40px",
    height: "40px",
    objectFit: "contain",
    display: "block",
  },

  topTextBlock: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "20px",
  },

  title: {
    margin: "0 0 10px 0",
    color: "#141414",
    fontFamily: '"Epilepsy Sans", "Arial Black", sans-serif',
    fontWeight: "700",
    fontSize: "60px",
    lineHeight: "100%",
    textAlign: "center",
  },

  subtitle: {
    margin: "0 0 16px 0",
    color: "#6A5B6F",
    fontFamily: '"Epilepsy Sans", "Arial Black", sans-serif',
    fontWeight: "500",
    fontSize: "48px",
    lineHeight: "100%",
    textAlign: "center",
  },

  description: {
    margin: 0,
    maxWidth: "940px",
    color: "#141414",
    fontFamily: "Roboto, Arial, sans-serif",
    fontWeight: "400",
    fontSize: "20px",
    lineHeight: "130%",
    textAlign: "left",
  },

  certificateBlock: {
    position: "relative",
    width: "1184px",
    height: "511px",
    backgroundColor: "#D6FF32",
    borderRadius: "72px",
    padding: "100px",
    boxSizing: "border-box",
    overflow: "hidden",
  },

  stars: {
    position: "absolute",
    top: "30px",
    left: "77px",
    width: "1030px",
    height: "441px",
    objectFit: "contain",
    pointerEvents: "none",
  },

  certificateTextArea: {
    position: "relative",
    zIndex: 2,
    width: "640px",
  },

  certificateTitle: {
    marginBottom: "26px",
    color: "#8D2CFF",
    fontFamily: '"Epilepsy Sans Bold", "Arial Black", sans-serif',
    fontWeight: "700",
    fontSize: "60px",
    lineHeight: "100%",
  },

  certificateTextSmall: {
    marginBottom: "14px",
    color: "#141414",
    fontFamily: "Roboto, Arial, sans-serif",
    fontWeight: "400",
    fontSize: "28px",
    lineHeight: "130%",
  },

  certificateName: {
    marginBottom: "14px",
    color: "#141414",
    fontFamily: "Roboto, Arial, sans-serif",
    fontWeight: "400",
    fontSize: "36px",
    lineHeight: "130%",
  },

  certificateTextMain: {
    color: "#141414",
    fontFamily: "Roboto, Arial, sans-serif",
    fontWeight: "400",
    fontSize: "28px",
    lineHeight: "130%",
  },

  catImage: {
    position: "absolute",
    right: "80px",
    top: "120px",
    width: "391px",
    height: "309px",
    objectFit: "contain",
    zIndex: 2,
  },

  downloadButton: {
    width: "480px",
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
    display: "block",
    margin: "16px auto 0 auto",
  },
};

export default CertificatePage;