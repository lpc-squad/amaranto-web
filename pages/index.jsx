import { useEffect, useState } from "react";
import { getUser } from "../src/index";

function Index() {
  const [user, setUser] = useState({});

  useEffect(() => {
    getUser().then(response => setUser(user));
  });

  return (
    <div>
      <h1>Clinical Record</h1>
      <main>
        <section>
          <h1>MUY BUENA PAGINA</h1>
        </section>
        <section>
          <h1>LA RECOMIENDO</h1>
        </section>
        <section>
          <h2>Contacto :v</h2>
          <address>
            <p>0800-chupala-:v</p>
          </address>
        </section>
      </main>
      <style jsx>
        {`
          section * {
            padding: 1rem;
            margin: 0;
          }
          section:nth-child(odd) {
            background-color: #bfd2ff;
          }
          section:nth-child(even) {
            background-color: #739dff;
          }
        `}
      </style>
    </div>
  );
}

export default Index;
