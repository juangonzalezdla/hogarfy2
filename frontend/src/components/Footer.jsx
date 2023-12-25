import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-oscuro text-blanco px-12 py-12 max-md:px-4">
      <div className="w-full max-w-[1400px] my-0 mx-auto flex justify-between max-md:flex-col max-md:gap-8">
        <div className="flex flex-col justify-center items-center">
          <figure>
            <a
              href="/"
              className="block font-poppins text-2xl font-bold no-underline"
            >
              Hogarfy
            </a>
          </figure>

          <span>© Copyright 2023, Hogarfy colombia SAS</span>
        </div>

        <div className="flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold mb-2">Informacíon</h2>
          <Link
            to="/legal/sobre-nosotros"
            className="mb-1 hover:underline"
            target="_blank"
          >
            ¿Quiénes somos?
          </Link>
          <Link
            to="/legal/preguntas-frecuentes"
            className="mb-1 hover:underline"
            target="_blank"
          >
            Preguntas frecuentes
          </Link>
          <Link
            to="/legal/terminos-condiciones"
            className="mb-1 hover:underline"
            target="_blank"
          >
            Términos y condiciones
          </Link>
          <Link
            to="/legal/privacidad"
            className="mb-1 hover:underline"
            target="_blank"
          >
            Política de privacidad
          </Link>
        </div>

        <div className="flex flex-col items-center gap-2">
          <h2 className="text-2xl font-bold mb-2">Siguenos</h2>

          <div className="flex items-center gap-5">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              className="bg-blanco p-1.5 flex items-center rounded-lg 
              border-2 border-solid border-blanco group hover:bg-oscuro"
            >
              <i
                className="bx bxl-facebook-circle text-negro text-[30px]
              group-hover:text-blanco"
              ></i>
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              className="bg-blanco p-1.5 flex items-center rounded-lg 
              border-2 border-solid border-blanco group hover:bg-oscuro"
            >
              <i
                className="bx bxl-instagram text-negro text-[30px]
              group-hover:text-blanco"
              ></i>
            </a>

            <a
              href="https://www.twitter.com/"
              target="_blank"
              className="bg-blanco p-1.5 flex items-center rounded-lg 
              border-2 border-solid border-blanco group hover:bg-oscuro"
            >
              <i
                className="bx bxl-twitter text-negro text-[30px]
              group-hover:text-blanco"
              ></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;