import { Grid, CircularProgress } from "@material-ui/core";
import PropTypes from "prop-types";

function LoadingComponent({ loading }) {
  return (
    <Grid
      container
      className="loading-screen"
      style={{
        display: (loading && "flex") || "none",
        zIndex: 9999,
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "black",
        transition: "display 2s",
      }}
      justify="center"
      alignItems="center"
    >
      <Grid item>
        <CircularProgress />
      </Grid>
    </Grid>
  );
}

Loading.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default LoadingComponent;
