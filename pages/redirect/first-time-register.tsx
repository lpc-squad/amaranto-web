/**
 * AVISO IMPORTANTE:
 *
 * Esta página está pensada para ser accedida
 * en consecuencia del primer ingreso por Auth0.
 *
 * Se debe EVITAR que un usuario entre por su
 * cuenta (quizá validar que ya ingresó)
 */

function FirstTimeRegister() {
  return (
    <>
      <h1>Completá tu registro</h1>

      <form>
        <input type="text" placeholder="Nombre(s)" />
        <input type="text" placeholder="Apellido(s)" />
        <input type="text" placeholder="Fecha de nacimiento" />
      </form>
    </>
  );
}

export default FirstTimeRegister;
