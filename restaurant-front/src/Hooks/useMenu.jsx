import { useEffect, useState } from "react";

const useMenu = () => {
    const [allMenuItems, setAllMenuItems] = useState([]);
    const [isFetchMenuLoading, setFetchMenuLoading] = useState(true);
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
        })
    },[])
    return [allMenuItems, isFetchMenuLoading];
};

export default useMenu;