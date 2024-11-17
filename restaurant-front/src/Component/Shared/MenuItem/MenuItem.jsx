
const MenuItem = ({item}) => {
    const {name, price, image, recipe} = item;
    return (
        <div className="flex gap-4 items-center w-[380px] md:w-[480px] text-gray-800 border-b border-dashed py-6 border-gray-400">
            <div className=" border border-black">
                <img className="w-20 h-16 lg:w-28 lg:h-20 object-cover rounded-md" src={image} alt="menu-image" />
            </div>
            <div className="flex flex-grow items-start justify-between">
                <div>
                    <h4 className="text-xl cinzel-semibold mb-2">{name}</h4>
                    <p className="text-sm text-justify w-56 lg:w-72">{recipe}</p>
                </div>
                <div>
                    <p className="text-lg cinzel-semibold">${price}</p>
                </div>
            </div>
        </div>
    );
};

export default MenuItem;