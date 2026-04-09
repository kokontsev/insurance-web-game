import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bananaImg from "../assets/images/banana.png";
import catImg from "../assets/images/start-cat.png";
import exitIcon from "../assets/images/exit-icon.png";
import exitIconHover from "../assets/images/exit-icon-hover.png";
import waveImg from "../assets/images/wave.png";
import starsImg from "../assets/images/star.png";
import CornerActionButton from "../components/CornerActionButton";

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;

function HomePage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [scale, setScale] = useState(1);
  const [isStartHovered, setIsStartHovered] = useState(false);

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

  const handleStart = async () => {
    if (!name.trim()) {
        alert("Введите имя");
        return;
    }

    try {
        if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
        }
    } catch (error) {
        console.error("Не удалось включить полноэкранный режим:", error);
    }

    localStorage.setItem("userName", name.trim());
    navigate("/stories");
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
            onClick={() => navigate("/")}
            icon={exitIcon}
            hoverIcon={exitIconHover}
            style={{
              top: "40px",
              left: "1680px",
              width: "40px",
              height: "40px",
            }}
          />

          <div style={styles.stage}>
            <h1 style={styles.title}>Страховка — это не про скуку. Проверим?</h1>

            <img src={waveImg} alt="" style={styles.wave} />
            <img src={starsImg} alt="" style={styles.stars} />

            <img src={bananaImg} alt="" style={styles.leftCharacter} />
            <img src={catImg} alt="" style={styles.rightCharacter} />

            <div style={styles.formCard}>
              <p style={styles.text}>
                Разные ситуации, разные герои, один выбор: подготовиться заранее
                или положиться на удачу? Пройди все 6 уровней “Страх и риск” и
                получи приз!
              </p>

              <input
                type="text"
                placeholder="Твое имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={styles.input}
              />

              <button
                onMouseEnter={() => setIsStartHovered(true)}
                onMouseLeave={() => setIsStartHovered(false)}
                onClick={handleStart}
                style={{
                    ...styles.button,
                    boxShadow: isStartHovered ? "0 0 35px rgba(141, 44, 255, 1)" : "none",
                    transform: isStartHovered ? "translateY(-1px)" : "translateY(0)",
                    transition: "box-shadow 0.2s ease, transform 0.2s ease",
                }}
                >
                Начать
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

  stage: {
    position: "absolute",
    left: "200px",
    top: "203px",
    width: "1520px",
    height: "673px",
    backgroundColor: "#D6FF32",
    border: "15px solid #8D2CFF",
    borderRadius: "72px",
    overflow: "hidden",
  },

  title: {
    position: "absolute",
    left: "181px",
    top: "100px",
    width: "1158px",
    height: "60px",
    margin: 0,
    color: "#141414",
    fontFamily: '"Epilepsy Sans Bold", "Arial Black", sans-serif',
    fontSize: "60px",
    lineHeight: "100%",
    fontWeight: "700",
    textAlign: "center",
    whiteSpace: "nowrap",
  },

  wave: {
    position: "absolute",
    left: "270px",
    top: "167.96px",
    width: "1000px",
    height: "28px",
    objectFit: "contain",
  },

  stars: {
    position: "absolute",
    left: "59px",
    top: "186px",
    width: "1396.54px",
    height: "120.98px",
    objectFit: "contain",
    pointerEvents: "none",
  },

  leftCharacter: {
    position: "absolute",
    left: "36px",
    top: "192px",
    width: "282px",
    height: "429px",
    objectFit: "contain",
    zIndex: 2,
  },

  rightCharacter: {
    position: "absolute",
    left: "1121px",
    top: "224px",
    width: "398px",
    height: "412px",
    objectFit: "contain",
    zIndex: 2,
  },

  formCard: {
    position: "absolute",
    left: "385px",
    top: "240px",
    width: "750px",
    height: "369px",
    backgroundColor: "#D9D9D9",
    border: "2px solid #141414",
    borderRadius: "72px",
    padding: "34px 38px 28px 38px",
    zIndex: 3,
  },

  text: {
    margin: "0 0 34px 0",
    color: "#141414",
    fontSize: "28px",
    lineHeight: "1.30",
    fontFamily: "Roboto, sans-serif",
  },

  input: {
    width: "100%",
    height: "54px",
    borderRadius: "999px",
    border: "2px solid #8D2CFF",
    backgroundColor: "#F3F3F3",
    padding: "0 22px",
    fontSize: "20px",
    marginBottom: "14px",
    outline: "none",
    fontFamily: "Arial, sans-serif",
  },

  button: {
    width: "100%",
    height: "50px",
    border: "none",
    borderRadius: "999px",
    background: "linear-gradient(90deg, #8D2CFF 0%, #A13BFF 100%)",
    color: "#FFFFFF",
    fontSize: "18px",
    fontWeight: "700",
    cursor: "pointer",
    fontFamily: "Arial, sans-serif",
  },
};

export default HomePage;