import { CircularProgress, Grid } from "@material-ui/core";

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

export default LoadingComponent;
