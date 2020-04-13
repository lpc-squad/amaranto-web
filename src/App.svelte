<script>
  export let release_date;
</script>

<style>
  main {
    display: flex;
    height: 100vh;
    flex-direction: column;
    text-align: center;

    justify-content: center;
  }

  h1 {
    font-family: "Rubik";
    font-size: 4rem;
  }

  button {
    vertical-align: center;
    align-items: center;
    height: 36px;
    padding: 0 16px 0 16px;
    border-radius: 4px;
    user-select: none;
    overflow: visible;
    outline: none;
    border: none;
    box-sizing: border-box;
    display: inline-flex;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: 500;
    letter-spacing: 0.0892857143em;
    font-family: "Roboto", sans-serif;
    font-size: 0.875rem;
    justify-content: center;
    background-color: #35bac3;
    align-self: center;
    min-width: 64px;
    max-width: 400px;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  }

  a {
    cursor: inherit;
    text-decoration: none;
    color: inherit;
  }

  button:active {
    background-color: rgb(114, 227, 235);
  }

  svg {
    position: absolute;
    top: 0;
    z-index: -1;
    overflow: hidden;
    height: 100vh;
    width: 100vh;
  }

  svg.left {
    left: 0;
    clip-path: polygon(92% 0, 46% 50%, 0 100%, 0 0);
    background: linear-gradient(140deg, #35bac3 0%, transparent 100%);
  }

  svg.right {
    right: 0;
    clip-path: polygon(92% 0, 100% 0, 100% 100%, 11% 100%);
    background: linear-gradient(
      120deg,
      transparent 0%,
      rgb(114, 227, 235) 100%
    );
  }
</style>

<main>

  <h1>Amaranto</h1>
  <p>
    ¡Hola! Estamos todavía construyendo la aplicación, estimamos que dentro de
    <b>
      <code>{release_date}</code>
    </b>
    estará lista.
  </p>
  <a href="https://forms.gle/D38Pdm2EPHBXeRjy5" target="_blank">
    <button>FORMÁ PARTE DE LA BETA CERRADA</button>
  </a>
  <svg class="left" />
  <svg class="right" />
</main>
