import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  pad: {
    marginBottom: "3rem",
    marginTop: "3rem",
  },
  bienv: {
    textAlign: "center",
    fontFamily: "Staatliches",
    letterSpacing: "0.3em",
  },
  photo: {
    height: "4rem",
    float: "right",
    [theme.breakpoints.only("md")]: {
      height: "4rem",
    },
    [theme.breakpoints.down("xs")]: {
      height: "3rem",
    },
  },
  letters: {
    textAlign: "end",
    color: "white",
    letterSpacing: "0.3em",
    fontSize: "2rem",
    margin: "0",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5rem",
    },
  },
  letters2: {
    fontFamily: "Fredoka One",
    textAlign: "end",
    color: "rgba(255, 255, 255, 0.7)",
    letterSpacing: "0.3em",
    fontSize: "3rem",
    margin: "0",
    fontStyle: "normal",
    fontWeight: 400,
    [theme.breakpoints.only("md")]: {
      fontSize: "2.5rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.7rem",
    },
  },
  letters3: {
    textAlign: "center",
    color: "white",
    letterSpacing: "0.2em",
    fontWeight: 300,
    fontSize: "1.4rem",
    margin: "0",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
    },
  },
}));
