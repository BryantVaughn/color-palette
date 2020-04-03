import sizes from './sizes';

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
    flexWrap: "wrap",
    [sizes.down("xl")]: {
      width: "70%"
    },
    [sizes.down("lg")]: {
      width: "80%"
    },
    [sizes.down("md")]: {
      width: "65%"
    },
    [sizes.down("xs")]: {
      width: "75%"
    }
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
      fontWeight: "bold",
      fontSize: "16px",
      cursor: "pointer",

    },
  },
  palettes: {
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, 30%)",
    gridGap: "2.5rem",
    [sizes.down("md")]: {
      gridTemplateColumns: "repeat(2, 50%)"
    },
    [sizes.down("xs")]: {
      gridTemplateColumns: "repeat(1, 100%)",
      gridGap: "1.5rem"
    }
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