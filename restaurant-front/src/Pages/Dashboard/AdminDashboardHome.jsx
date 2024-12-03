import { useQuery } from "@tanstack/react-query";
import useAxiosHookProtected from "../../Hooks/useAxiosHookProtected";
import useSavourYumContext from "../../Hooks/useSavourYumContext";
import useUserRoll from "../../Hooks/useUserRoll";
import { MdMenuBook, MdMenuOpen, MdOutlineSecurity } from "react-icons/md";
import CustomLoading from "../../Component/Shared/CustomLoading/CustomLoading";
import { FaDollarSign, FaPenSquare, FaShoppingCart, FaUsers } from "react-icons/fa";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { PieChart, Pie, ResponsiveContainer } from "recharts";

const AdminDashboardHome = () => {
  const { user } = useSavourYumContext();
  const axiosProtected = useAxiosHookProtected();
  const { userRollData } = useUserRoll();
  const {
    isPending: isAdminStatsPending,
    isError: adminStatsError,
    data: adminStatsData,
  } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const result = await axiosProtected.get("/admin-stats");
      return result.data;
    },
  });
  // Order-Stat
  const {
    isPending: isOrderDataPending,
    isError: orderDataError,
    data: orderData,
  } = useQuery({
    queryKey: ["order-stats"],
    queryFn: async () => {
      const result = await axiosProtected.get("/order-stats");
      return result.data;
    },
  });

  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };
  // PIE-CHART
  const pieChartData = orderData?.map((item) => {
    return { name: item.category, value: item.totalRevenue };
  });
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <div className="px-4 py-12 space-y-6">
      <div className="flex items-end justify-between">
        <h2 className="text-2xl text-gray-800">
          Welcome {user?.displayName && user?.displayName} !
        </h2>
        <div
          className={`${
            userRollData
              ? " text-green-800 text-sm lora-semibold"
              : "hidden"
          } text-center`}
        >
          <div className="flex items-center gap-2 mx-auto">
            <p>
              <MdOutlineSecurity />
            </p>
            <p>{userRollData}</p>
          </div>
        </div>
      </div>
      <div>
        {isAdminStatsPending ? (
          <div className="w-fit mx-auto">
            <CustomLoading size={32}></CustomLoading>
          </div>
        ) : (
          <div className="flex justify-start items-center gap-6 lg:gap-0 lg:rounded-md flex-wrap w-full mx-auto">
            <div className="w-52 lg:w-fit flex items-center justify-between gap-4 px-4 py-4 lg:px-6 lg:py-6 text-gray-800 rounded-md lg:rounded-none shadow lg:shadow-none lg:flex-grow lg:border-r lg:border-gray-400 bg-purple-300">
              <div>
                <p className="text-3xl md:text-4xl">
                  <MdMenuBook />
                </p>
              </div>
              <div className="text-right">
                <p className="text-xl md:text-3xl cinzel-bold leading-none">
                  {adminStatsData?.totalMenuItems}
                </p>
                <p className="lora-regular leading-none">Menu Items</p>
              </div>
            </div>
            <div className="w-52 lg:w-fit flex items-center justify-between gap-4 px-4 py-4 lg:px-6 lg:py-6 text-gray-800 rounded-md lg:rounded-none shadow lg:shadow-none lg:flex-grow lg:border-r lg:border-gray-400 bg-green-300">
              <div>
                <p className="text-3xl md:text-4xl leading-none">
                  <FaUsers />
                </p>
              </div>
              <div className="text-right">
                <div className="text-xl md:text-3xl cinzel-bold leading-none">
                  {adminStatsData?.totalUsers}
                </div>
                <p className="lora-regular leading-none">Consumers</p>
              </div>
            </div>
            <div className="w-52 lg:w-fit flex items-center justify-between gap-4 px-4 py-4 lg:px-6 lg:py-6 text-gray-800 rounded-md lg:rounded-none shadow lg:shadow-none lg:flex-grow lg:border-r lg:border-gray-400 bg-orange-300">
              <div>
                <p className="text-3xl md:text-4xl leading-none">
                  <FaShoppingCart />
                </p>
              </div>
              <div className="text-right">
                <div className="text-xl md:text-3xl cinzel-bold leading-none">
                  {adminStatsData?.totalOrders}
                </div>
                <p className="lora-regular leading-none">Orders</p>
              </div>
            </div>
            <div className="w-52 lg:w-fit flex items-center justify-between gap-4 px-4 py-4 lg:px-6 lg:py-6 text-gray-800 rounded-md lg:rounded-none shadow lg:shadow-none lg:flex-grow lg:border-r lg:border-gray-400 bg-cyan-300">
              <div>
                <p className="text-3xl md:text-4xl leading-none">
                  <FaDollarSign />
                </p>
              </div>
              <div className="text-right">
                <div className="text-xl md:text-3xl cinzel-bold leading-none">
                  {Math.ceil(adminStatsData?.totalRevenue)}
                </div>
                <p className="lora-regular leading-none">Revenue</p>
              </div>
            </div>
            <div className="w-52 lg:w-fit flex items-center justify-between gap-4 px-4 py-4 lg:px-6 lg:py-6 text-gray-800 rounded-md lg:rounded-none shadow lg:shadow-none lg:flex-grow bg-red-300">
              <div>
                <p className="text-3xl md:text-4xl leading-none">
                  <FaPenSquare />
                </p>
              </div>
              <div className="text-right">
                <div className="text-xl md:text-3xl cinzel-bold leading-none">
                  {adminStatsData?.totalReviews}
                </div>
                <p className="lora-regular leading-none">Reviews</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
        {isOrderDataPending ? (
          <div className="w-fit mx-auto">
            <CustomLoading size={32}></CustomLoading>
          </div>
        ) : (
          <div className="flex flex-col items-center lg:flex-row gap-6 bg-[rgb(250,250,250)] rounded-sm">
            <div className="lg:w-7/12 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={orderData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid stroke="gray" strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Bar
                    dataKey="totalQuantity"
                    fill="#8884d8"
                    shape={<TriangleBar />}
                    label={{ position: "top" }}
                  >
                    {orderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % 6]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="lg:w-5/12 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieChartData?.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colors[index % colors.length]}
                      />
                    ))}
                  </Pie>
                  <Legend></Legend>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardHome;
