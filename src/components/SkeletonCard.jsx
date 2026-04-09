function SkeletonCard() {
  return (
    <div style={styles.card}>
      <div className="shimmer" style={{ ...styles.shimmerBase, ...styles.title }} />
      <div className="shimmer" style={{ ...styles.shimmerBase, ...styles.subtitle }} />
      <div className="shimmer" style={{ ...styles.shimmerBase, ...styles.image }} />
      <div className="shimmer" style={{ ...styles.shimmerBase, ...styles.button }} />
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "#D4AFFF",
    borderRadius: "24px",
    padding: "20px",
    minHeight: "180px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    border: "2px solid #8D2CFF",
  },
  shimmerBase: {
    position: "relative",
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.22)",
    borderRadius: "14px",
  },
  title: {
    width: "70%",
    height: "28px",
    marginBottom: "12px",
  },
  subtitle: {
    width: "85%",
    height: "16px",
    marginBottom: "16px",
  },
  image: {
    width: "100%",
    height: "72px",
    borderRadius: "18px",
    marginBottom: "18px",
  },
  button: {
    width: "100%",
    height: "44px",
    borderRadius: "999px",
  },
};

export default SkeletonCard;