import { makeStyles }
from "@material-ui/core";
// import { red, yellow } from "@material-ui/core/colors";
const styles = makeStyles((theme) => {
    return {
        title: {
            backgroundColor: "red",
            fontSize: 40,
            color: "yellow",
            fontWeight: theme.typography.fontWeightBold
        }
    }
});
export default styles;