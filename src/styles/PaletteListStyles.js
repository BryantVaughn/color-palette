export default {
  root: {
    backgroundColor: "blue",
    height: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center"
  },
  container: {
    width: "50%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "wrap"
  },
  nav: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    color: "white",
    alignItems: "center",
    "& button": {
      cursor: "pointer",
      backgroundColor: "gray",
      border: "none",
      padding: "8px 30px",
      borderRadius: "6px",
    },
    "& a": {
      color: "white",
      textDecoration: "none",
      fontWeight: "bold",
      fontSize: "20px"
    },
  },
  palettes: {
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, 30%)",
    gridGap: "5%"
  }
};

// "& a": {
//   color: "white",
//   fontWeight: "bold",
//   fontSize: "20px"
// },
// "& a:hover": {
//   transition: "0.2s ease-in-out",
//   color: "rgb(109,113,110)"
// }