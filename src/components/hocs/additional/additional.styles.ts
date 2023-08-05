import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  btnAdd: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  btnCanc: {
    backgroundColor: "red",
    color: "white",
    "&:hover": {
      backgroundColor: "red",
    },
  },
}));
