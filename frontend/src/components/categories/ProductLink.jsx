import { Link } from "react-router-dom";

function ProductLink({ link, name }) {
  return (
    <Link
      to={link}
      className="block font-roboto text-oscuro text-base p-2.5 no-underline font-bold text-left hover:bg-gris-claro"
    >
      {name}
    </Link>
  );
}

export default ProductLink;