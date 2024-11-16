import { useQuery } from "@tanstack/react-query";
import useAxiosHookProtected from "../../Hooks/useAxiosHookProtected";
import useSavourYumContext from "../../Hooks/useSavourYumContext";
import useUserRoll from "../../Hooks/useUserRoll";
import { MdMenuBook, MdOutlineSecurity } from "react-icons/md";
import CustomLoading from "../../Component/Shared/CustomLoading/CustomLoading";
import { FaDollarSign, FaPenSquare, FaUsers } from "react-icons/fa";
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
    <div className="px-4 pt-8 space-y-6">
      <div className="flex items-end justify-between">
        <h2 className="text-2xl text-gray-800">
          Welcome {user?.displayName && user?.displayName}!
        </h2>
        <div
          className={`${
            userRollData ? "bg-green-700 text-gray-100 text-sm px-2 py-[2px] rounded-md" : "hidden"
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
          <div className="stats shadow w-full mx-auto bg-[rgb(201,201,201)]">
            <div className="stat place-items-center flex items-center justify-center text-gray-800 border-r border-black">
              <div>
                <p className="text-3xl">
                  <MdMenuBook />
                </p>
              </div>
              <div>
                <div className="stat-value">
                  {adminStatsData?.totalMenuItems}
                </div>
                <p className="lora-regular">Menu Items</p>
              </div>
            </div>
            <div className="stat place-items-center flex items-center justify-center text-gray-800">
              <div>
                <p className="text-3xl">
                  <FaUsers />
                </p>
              </div>
              <div>
                <div className="stat-value">{adminStatsData?.totalUsers}</div>
                <p className="lora-regular">Consumers</p>
              </div>
            </div>
            <div className="stat place-items-center flex items-center justify-center text-gray-800 border-r border-black">
              <div>
                <p className="text-3xl">
                  <MdMenuBook />
                </p>
              </div>
              <div>
                <div className="stat-value">{adminStatsData?.totalOrders}</div>
                <p className="lora-regular">Orders</p>
              </div>
            </div>
            <div className="stat place-items-center flex items-center justify-center text-gray-800 border-r border-black">
              <div>
                <p className="text-3xl">
                  <FaDollarSign />
                </p>
              </div>
              <div>
                <div className="stat-value">
                  {(adminStatsData?.totalRevenue).toFixed(2)}
                </div>
                <p className="lora-regular">Revenue</p>
              </div>
            </div>
            <div className="stat place-items-center flex items-center justify-center text-gray-800 border-r border-black">
              <div>
                <p className="text-3xl">
                  <FaPenSquare />
                </p>
              </div>
              <div>
                <div className="stat-value">{adminStatsData?.totalReviews}</div>
                <p className="lora-regular">Reviews</p>
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
            <div className="w-7/12">
              <BarChart
                width={500}
                height={300}
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
            </div>
            <div className="w-5/12 h-72">
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
