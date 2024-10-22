const FoodItemCard = ({ item }) => {
  const { price, image, name, recipe } = item;
  return (
    <div className="w-96 rounded-md overflow-hidden hover:shadow-xl duration-300">
      <div className="relative w-full h-60">
        <p className="absolute top-0 right-0 lora-regular text-lg bg-gray-800 text-gray-200 py-2 px-4 rounded-bl-md rounded-tr-md">${price}</p>
        <img
          className="w-full h-full object-cover"
          src={image}
          alt="food-image"
        />
      </div>
      <div className="h-60 p-8 flex flex-col gap-2 items-center justify-center lg:gap-4 text-center bg-gray-300 text-gray-800">
        <h4 className="text-xl lg:text-2xl">{name}</h4>
        <p className="text-sm lora-regular">{recipe.length > 80 ? recipe.slice(0, 80) : recipe}...</p>
        <button className="p-4 hover:bg-red-700 border-b-4 border-red-700 rounded-md duration-300 cinzel-regular text-gray-800 hover:text-gray-100">
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default FoodItemCard;
