import Banner from "../Component/Shared/Banner/Banner";
import { Helmet } from 'react-helmet-async';

const Menu = () => {
    return (
        <div>
            <Helmet>
                <title>Menu</title>
            </Helmet>
            <Banner></Banner>
        </div>
    );
};

export default Menu;