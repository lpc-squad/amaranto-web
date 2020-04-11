import useScrollTrigger from "@material-ui/core/useScrollTrigger";

function Index(props) {
  // TODO: Para hacer el efecto Slack https://slack.com/intl/en-ar/
  // Fuente: https://material-ui.com/components/app-bar/#scrolling
  // const trigger = useScrollTrigger({ target: window ? window() : undefined });
  return (
    <>
      <header style={{ position: "fixed", zIndex: 9 }}>
        <a href="">Inicio</a>
      </header>
      <main>
        <section style={{ height: "100vh" }}>
          <video
            autoPlay
            muted
            loop
            src="/index_video.mp4"
            style={{
              objectFit: "cover",
              right: "0",
              bottom: "0",
              minWidth: "100%",
              maxHeight: "100%",
            }}
          ></video>
          <div
            style={{
              position: "absolute",
              width: "40%",
              height: "50%",
              top: "calc(100% / 4)",
              backgroundColor: "white",
              clipPath: "polygon(0% 0%, 50% 0%, 100% 50%, 50% 100%, 0% 100%)",
            }}
          >
            <h1>Clinical Record</h1>
          </div>
        </section>
        <section style={{ display: "flex", height: "75vh" }}>
          <h1 style={{ flex: 1 }}>Otro titulo</h1>
          <h1 style={{ flex: 1 }}>Otro titulo</h1>
        </section>
        <section style={{ display: "flex", height: "75vh" }}>
          <h1 style={{ flex: 1 }}>Otro titulo</h1>
          <h1 style={{ flex: 1 }}>Otro titulo</h1>
        </section>
        <section style={{ display: "flex", height: "100vh" }}>
          <h1 style={{ flex: 1 }}>Otro titulo</h1>
          <h1 style={{ flex: 1 }}>Otro titulo</h1>
        </section>
      </main>
    </>
  );
}

export default Index;
