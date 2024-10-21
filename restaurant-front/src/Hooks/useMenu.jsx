import { useEffect, useState } from "react";

const useMenu = () => {
    const [allMenuItems, setAllMenuItems] = useState([]);
    const [isFetchMenuLoading, setFetchMenuLoading] = useState(true);
    const [errorMenuFetchMessage, setErrorMenuFetchMessage] = useState("");
    useEffect(()=> {
        fetch("menu.json")
        .then(res => res.json())
        .then(data => {
            setAllMenuItems(data);
            setFetchMenuLoading(false);
        })
        .catch(err => {
            console.log(err);
            setFetchMenuLoading(false);
            setErrorMenuFetchMessage("error loading data")
        })
    },[])
    return [allMenuItems, isFetchMenuLoading, errorMenuFetchMessage];
};

export default useMenu;