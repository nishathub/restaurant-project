import { Helmet } from "react-helmet-async";
import PageCover from "../Component/Shared/Cover/PageCover";
import dessertImage from "../../src/assets/menuCategory-images/menu-dessert.jpg";
import CustomTab from "../Component/Shared/CustomTab/CustomTab";
import { useEffect, useState } from "react";
import useMenu from "../Hooks/useMenu";
import FoodItemCard from "../Component/Shared/FoodItemCard/FoodItemCard";
import CustomLoading from "../Component/Shared/CustomLoading/CustomLoading";

const Shop = () => {
  const {
    allMenuItems,
    soupItems,
    pizzaItems,
    saladItems,
    dessertItems,
    drinksItems,
    isFetchMenuLoading,
    errorMenuFetchMessage,
  } = useMenu();

  const [displayMenuItems, setDisplayMenuItems] = useState(allMenuItems);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Update displayMenuItems whenever allMenuItems changes
  useEffect(() => {
    setDisplayMenuItems(allMenuItems);
    setCurrentPage(1); // reset to first page when menu changes
  }, [allMenuItems]);

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = displayMenuItems.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Calculate total pages
  const totalPages = Math.ceil(displayMenuItems.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Helmet>
        <title>Shop</title>
      </Helmet>
      <PageCover pageName="our shop" image={dessertImage}></PageCover>
      <div className="max-w-7xl mx-auto px-6 my-20 cinzel-regular">
        <div className="mb-20 w-fit mx-auto">
          <CustomTab setDisplayMenuItems={setDisplayMenuItems}>
            <button item={allMenuItems}>All</button>
            <button item={saladItems}>Salad</button>
            <button item={pizzaItems}>Pizza</button>
            <button item={soupItems}>Soup</button>
            <button item={dessertItems}>Dessert</button>
            <button item={drinksItems}>Drinks</button>
          </CustomTab>
        </div>
        {isFetchMenuLoading ? (
          <div className="flex items-center justify-center">
            <CustomLoading size={32}></CustomLoading>
          </div>
        ) : (
          <div>
            {errorMenuFetchMessage ? (
              <div>
                <p className="text-red-700 text-center p-4">
                  {errorMenuFetchMessage}!
                </p>
              </div>
            ) : (
              <div>
                <div className="flex flex-wrap gap-8 items-center justify-center">
                  {currentItems.map((item) => (
                    <FoodItemCard key={item._id} item={item}></FoodItemCard>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 ${
                        page === currentPage
                          ? "bg-red-700 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
