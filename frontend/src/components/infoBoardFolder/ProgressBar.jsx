/* eslint-disable react/prop-types */
export function ProgressBar(props) {
  const { completed } = props;

  const containerStyles = {
    height: "30px",
    width: "100%",
    borderRadius: 4,
    margin: "3px",
    border: "3px solid #cbcbcb",
  };

  const fillerStyles = {
    margin: "3px",
    height: "24px",
    width: `${completed}%`,
    backgroundColor: "#d7d7d7",
    borderRadius: 3,
    textAlign: "right",
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}></div>
    </div>
  );
}
