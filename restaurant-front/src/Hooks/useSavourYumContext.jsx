import { useContext } from "react";
import { RestaurantContext } from "../ContextProvider/ContextProvider"

const useSavourYumContext = () => {
    const savourYumContext = useContext(RestaurantContext)
    return savourYumContext;
}
export default useSavourYumContext;