import MenuItem from "../../Shared/MenuItem/MenuItem";

const MenuCategory = ({categoryItem}) => {
  return (
    <div className="max-w-7xl mx-auto my-12 px-4">
      <div className="grid grid-col-1 lg:grid-cols-2 items-center lg:justify-items-center mt-12 md:mt-20">
        {categoryItem.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
    </div>
  );
};

export default MenuCategory;
