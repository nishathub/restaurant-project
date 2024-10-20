
const MenuItem = ({item}) => {
    const {name, price, image, recipe} = item;
    return (
        <div className="flex gap-4 items-center justify-center max-w-[500px] text-gray-200">
            <div>
                <img className="w-32 rounded-md" src={image} alt="menu-image" />
            </div>
            <div className="flex items-start justify-between">
                <div>
                    <h4 className="text-xl font-semibold mb-2">{name}</h4>
                    <p className="text-sm max-w-80">{recipe}</p>
                </div>
                <div>
                    <p className="text-lg">${price}</p>
                </div>
            </div>
        </div>
    );
};

export default MenuItem;