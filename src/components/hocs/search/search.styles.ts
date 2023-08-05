import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  btn: {
    backgroundColor: "#FF8B00",
    color: "white",
  },
}));
