function LoadingScreen() {
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.spinner}></div>
        <h1 style={styles.title}>Загрузка...</h1>
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
    maxWidth: "420px",
    backgroundColor: "#D6FF32",
    borderRadius: "28px",
    padding: "36px 24px",
    textAlign: "center",
    border: "2px solid #8D2CFF",
  },
  spinner: {
    width: "56px",
    height: "56px",
    border: "6px solid #D4AFFF",
    borderTop: "6px solid #8D2CFF",
    borderRadius: "50%",
    margin: "0 auto 20px auto",
    animation: "spin 1s linear infinite",
  },
  title: {
    margin: 0,
    fontSize: "28px",
    color: "#141414",
  },
};

export default LoadingScreen;