/* eslint-disable no-unused-vars */
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  section: {
    maxWidth: "444px",
  },
  sectionTitle: {
    fontWeight: 600,
    fontSize: "20px",
    textAlign: "center",
    color: "#232323",
    marginBottom: "32px",
  },
  subQuestion: {
    fontWeight: 600,
    fontSize: "16px",
    color: "#FE8A02",
    marginBottom: "16px",
    cursor: "pointer",
  },
  image: {
    alignSelf: "center",
    height: "96px",
  },
  questionBox: {
    borderBottom: "1px solid #ECEEEF;",
    padding: "18px 4px 18px 0",
    cursor: "pointer",
    userSelect: "none",
    fontSize: "14px",
    fontWeight: 600,
  },
  questionBoxSub: {
    padding: "4px 8px",
    userSelect: "none",
    fontSize: "12px",
    fontWeight: 400,
    color: "black",
  },
  filterInput: {
    marginRight: "32px",
    height: "40px",
    width: "100%",
    background: "#FBFBFB",
    border: "1px solid #C7CCD1",
    boxSizing: "border-box",
    boxShadow: "2px -4px 8px rgba(34, 38, 42, 0.05)",
    borderRadius: "4px",
    padding: "0 1rem",
    color: "black",
    fontSize: "14px",
    outline: "none",
  },
  filterButton: {
    width: "206px",
    height: "40px",
    background: "#FE8A02",
    color: "white",
    outline: "none",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginBottom: "28px",
  },
}));
