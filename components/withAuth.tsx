/**
 * TODO: Crear un HOC para chequear
 * si está logueado (mientras, enviar un prop
 * de "está cargando" para renderizar algo
 * en las páginas)
 */

function withAuth(Component) {
  console.log(Component);
  return <Component />;
}

export default withAuth;
