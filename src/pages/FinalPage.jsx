import { useNavigate } from "react-router-dom";
import stories from "../data/stories";

function FinalPage() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "Игрок";

  const successCount = stories.filter(
    (story) => localStorage.getItem(`story_${story.id}_success`) === "true"
  ).length;

  const isAllPassedCorrectly = successCount === stories.length;

  const handleDownloadCertificate = () => {
    window.print();
  };

  if (!isAllPassedCorrectly) {
    return (
      <div style={styles.page}>
        <div style={styles.wrapper}>
          <div style={styles.warningCard}>
            <h1 style={styles.warningTitle}>Финал пока недоступен</h1>
            <p style={styles.warningText}>
              Чтобы открыть финальный экран, нужно правильно пройти все 6 историй.
            </p>

            <button style={styles.mainButton} onClick={() => navigate("/stories")}>
              Вернуться к историям
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.wrapper}>
        <div style={styles.heroCard}>
          <h1 style={styles.heroTitle}>Поздравляем!</h1>
          <p style={styles.heroText}>
            Ты успешно решил все задачи и правильно прошёл все истории.
            Теперь ты лучше понимаешь, как страховка помогает избежать лишних потерь.
          </p>
        </div>

        <div style={styles.summaryCard}>
          <p style={styles.summaryLabel}>Итог</p>
          <h2 style={styles.summaryValue}>Все 6 историй пройдены правильно</h2>
        </div>

        <div style={styles.certificateCard}>
          <p style={styles.certificateLabel}>Сертификат</p>
          <h2 style={styles.certificateTitle}>Подтверждает, что {userName}</h2>
          <p style={styles.certificateText}>
            прошёл все уровни игры «Страх и риск»
            и стал подтверждённым знатоком страховки.
          </p>

          <div style={styles.buttonRow}>
            <button style={styles.mainButton} onClick={handleDownloadCertificate}>
              Скачать сертификат
            </button>

            <button
              style={styles.secondaryButton}
              onClick={() => navigate("/stories")}
            >
              К историям
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#141414",
    padding: "24px",
  },
  wrapper: {
    maxWidth: "1000px",
    margin: "0 auto",
  },
  warningCard: {
    backgroundColor: "#FF5C5D",
    borderRadius: "28px",
    padding: "32px",
    border: "2px solid #8D2CFF",
  },
  warningTitle: {
    margin: "0 0 16px 0",
    fontSize: "36px",
    color: "#141414",
  },
  warningText: {
    margin: "0 0 24px 0",
    fontSize: "20px",
    lineHeight: "1.5",
    color: "#141414",
  },
  heroCard: {
    backgroundColor: "#D6FF32",
    borderRadius: "28px",
    padding: "32px",
    marginBottom: "20px",
    border: "2px solid #8D2CFF",
  },
  heroTitle: {
    margin: "0 0 16px 0",
    fontSize: "42px",
    color: "#141414",
  },
  heroText: {
    margin: 0,
    fontSize: "20px",
    lineHeight: "1.5",
    color: "#141414",
  },
  summaryCard: {
    backgroundColor: "#EAEAEA",
    borderRadius: "24px",
    padding: "24px",
    marginBottom: "20px",
    border: "2px solid #8D2CFF",
  },
  summaryLabel: {
    margin: "0 0 8px 0",
    fontSize: "14px",
    fontWeight: "700",
    textTransform: "uppercase",
    color: "#5C5C5C",
  },
  summaryValue: {
    margin: 0,
    fontSize: "28px",
    color: "#141414",
  },
  certificateCard: {
    backgroundColor: "#D4AFFF",
    borderRadius: "28px",
    padding: "32px",
    border: "2px solid #8D2CFF",
  },
  certificateLabel: {
    margin: "0 0 8px 0",
    fontSize: "14px",
    fontWeight: "700",
    textTransform: "uppercase",
    color: "#141414",
  },
  certificateTitle: {
    margin: "0 0 16px 0",
    fontSize: "32px",
    color: "#141414",
  },
  certificateText: {
    margin: "0 0 24px 0",
    fontSize: "20px",
    lineHeight: "1.5",
    color: "#141414",
  },
  buttonRow: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  mainButton: {
    minHeight: "48px",
    border: "none",
    borderRadius: "999px",
    backgroundColor: "#8D2CFF",
    color: "#FFFFFF",
    fontSize: "16px",
    fontWeight: "700",
    padding: "12px 24px",
  },
  secondaryButton: {
    minHeight: "48px",
    border: "2px solid #8D2CFF",
    borderRadius: "999px",
    backgroundColor: "transparent",
    color: "#141414",
    fontSize: "16px",
    fontWeight: "700",
    padding: "12px 24px",
  },
};

export default FinalPage;