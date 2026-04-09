function SkeletonProgress() {
  return (
    <div style={styles.wrapper}>
      <div style={styles.row}>
        <div className="shimmer" style={{ ...styles.shimmerBase, ...styles.left }} />
        <div className="shimmer" style={{ ...styles.shimmerBase, ...styles.right }} />
      </div>

      <div style={styles.bar}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="shimmer"
            style={{ ...styles.shimmerBase, ...styles.segment }}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    backgroundColor: "#EAEAEA",
    borderRadius: "20px",
    padding: "18px",
    marginBottom: "24px",
    border: "2px solid #8D2CFF",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    marginBottom: "12px",
  },
  shimmerBase: {
    position: "relative",
    overflow: "hidden",
    backgroundColor: "rgba(92, 92, 92, 0.18)",
    borderRadius: "999px",
  },
  left: {
    width: "160px",
    height: "20px",
  },
  right: {
    width: "60px",
    height: "20px",
  },
  bar: {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: "8px",
  },
  segment: {
    height: "14px",
  },
};

export default SkeletonProgress;