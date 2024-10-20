import { useEffect, useState } from "react";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const PopularMenu = () => {
    const [popularItem, setPopularItem] = useState([]);
    useEffect(()=> {
        try {
            fetch('menu.json')
            .then(res => res.json())
            .then(data => {
                const popularData = data.filter(item => item.category === 'popular');
                setPopularItem(popularData);
            })
            .catch(err => console.log(err, 'error from try block'))
        } catch (error) {
            console.log('error from menu fetch catch block ', error)
        }
    },[])

  return (
    <div className="max-w-7xl mx-auto my-12 px-4">
      <section>
        <SectionTitle
          heading={"Fan Favorite Items"}
          subHeading={"All Prices are Inclusive of VAT & Supplementary Duty"}
        ></SectionTitle>
      </section>
      <div className="grid grid-col-1 xl:grid-cols-2 items-center justify-center gap-8 mt-12 lg:mt-20">
        {
            popularItem.map(item => 
                <MenuItem key={item._id} item ={item}></MenuItem>
            )
        }
      </div>
    </div>
  );
};

export default PopularMenu;
