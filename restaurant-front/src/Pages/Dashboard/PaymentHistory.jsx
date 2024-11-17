import SectionTitle from "../../Component/Shared/SectionTitle/SectionTitle";
import CustomLoading from "../../Component/Shared/CustomLoading/CustomLoading";
import { useState } from "react";
import useSavourYumContext from "../../Hooks/useSavourYumContext";
import useAxiosHookProtected from "../../Hooks/useAxiosHookProtected";
import { useQuery } from "@tanstack/react-query";

const PaymentHistory = () => {
  const { user } = useSavourYumContext();
  const axiosProtected = useAxiosHookProtected();
  const {
    isPending: isPaymentHistoryPending,
    isError: isPaymentHistoryError,
    data: paymentHistoryData,
    refetch: paymentHistoryRefetch,
  } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    queryFn: async () => {
      const result = await axiosProtected.get(
        `/userPaymentHistory/${user?.email}`
      );
      return result.data;
    },
  });
  return (
    <div className="px-4 pt-8">
      <div className="mb-12">
        <SectionTitle
          heading={"Payment History"}
          subHeading={"Invest on Health"}
        ></SectionTitle>
      </div>
      {isPaymentHistoryPending ? (
        <div className="flex justify-center items-center inset-0">
          <CustomLoading size={32}></CustomLoading>
        </div>
      ) : isPaymentHistoryError ? (
        <p className="text-red-700 text-2xl text-center">
          Error Loading payment history! Try again
        </p>
      ) : (
        <div className="bg-[rgb(250,250,250)] text-gray-800 p-4 rounded-md space-y-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:justify-between items-end lg:items-center">
            <div className="text-right lg:text-left">
              <h4>{user?.displayName}</h4>
              <h4 className="text-sm">{user?.email}</h4>
            </div>
            <h4 className="text-2xl cinzel-semibold">
              Total Payments: {paymentHistoryData?.length}
            </h4>
          </div>
          <div className="max-h-[400px] overflow-auto">
            <table className="table text-center">
              {/* head */}
              <thead className="sticky top-0 bg-gray-800 text-gray-100 z-10">
                <tr>
                  <th>#</th>
                  <th>Total Items</th>
                  <th>Total Price</th>
                  <th>Payment Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              {paymentHistoryData?.map((item, index) => (
                <tbody key={index}>
                  {/* row 1 */}
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      <p className="">{item.cartItemsIds.length}</p>
                    </td>
                    <td>${item.price}</td>
                    <td>
                      {new Date(item.date).toLocaleDateString("en-us", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                    <td>{item.status}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
