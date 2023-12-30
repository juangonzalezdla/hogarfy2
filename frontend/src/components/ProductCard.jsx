import { Button, Tooltip } from "flowbite-react";

function formatPrice(price) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price);
}

function ProductCard({ _id, name, brand, images, price }) {
  const formattedPrice = formatPrice(price);

  return (
    <div className="max-w-[250px] bg-white p-3 font-poppins rounded-md shadow-lg max-lg:px-4">
      <figure className="w-full flex justify-center">
        <img className="w-40 h-40" src={images[0]} alt="" />
      </figure>
      <div className="w-full">
        <span className="text-sm tracking-widest text-gris-oscuro my-2 uppercase">
          {brand}
        </span>
        <Tooltip content={name} animation="duration-300" className="text-xs">
          <h2 className="text-negro font-medium text-sm mb-2 tracking-tight line-clamp-2">
            {name}
          </h2>
        </Tooltip>

        <div className="flex justify-between items-center gap-2 mt-5">
          <p className="text-negro text-md font-semibold">{formattedPrice}</p>
          <Button size="sm" className="flex items-center justify-center">
            Agregar
            <i className="bx bx-cart-add bx-sm"></i>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;