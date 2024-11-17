import useSavourYumContext from "../../Hooks/useSavourYumContext";

const UserDashboardHome = () => {
    const {user} = useSavourYumContext();
    return (
        <div className="px-4 pt-8">
            <div><h2 className="text-2xl text-gray-800">Welcome {user?.displayName && user?.displayName} !</h2></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default UserDashboardHome;