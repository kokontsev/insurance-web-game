import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.code}>404</div>
        <h1 style={styles.title}>Упс...</h1>
        <p style={styles.text}>Кажется, что-то пошло не так</p>

        <button style={styles.button} onClick={() => navigate("/")}>
          Вернуться домой
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#141414",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "24px",
  },
  card: {
    width: "100%",
    maxWidth: "520px",
    backgroundColor: "#D6FF32",
    borderRadius: "32px",
    padding: "40px 28px",
    textAlign: "center",
    border: "2px solid #8D2CFF",
  },
  code: {
    fontSize: "72px",
    fontWeight: "900",
    color: "#141414",
    marginBottom: "12px",
  },
  title: {
    margin: "0 0 10px 0",
    fontSize: "36px",
    color: "#141414",
  },
  text: {
    margin: "0 0 24px 0",
    fontSize: "20px",
    color: "#141414",
  },
  button: {
    minHeight: "48px",
    border: "none",
    borderRadius: "999px",
    backgroundColor: "#8D2CFF",
    color: "#FFFFFF",
    fontSize: "16px",
    fontWeight: "700",
    padding: "12px 24px",
  },
};

export default NotFoundPage;