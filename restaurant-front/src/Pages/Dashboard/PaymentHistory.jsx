import SectionTitle from "../../Component/Shared/SectionTitle/SectionTitle";
import CustomLoading from "../../Component/Shared/CustomLoading/CustomLoading";
import { useState } from "react";
import useSavourYumContext from "../../Hooks/useSavourYumContext";
import useAxiosHookProtected from "../../Hooks/useAxiosHookProtected";
import { useQuery } from "@tanstack/react-query";
import usePaymentHistory from "../../Hooks/usePaymentHistory";

const PaymentHistory = () => {
  const { user } = useSavourYumContext();
  const { isPaymentHistoryPending, isPaymentHistoryError, paymentHistoryData } =
    usePaymentHistory();
  return (
    <div className="px-4 py-12">
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
          <div className="flex flex-col gap-4 lg:flex-row lg:justify-between items-start lg:items-center">
            <div className="">
              <h4>{user?.displayName}</h4>
              <h4 className="text-sm">{user?.email}</h4>
            </div>
            <h4 className="text-lg lg:text-2xl cinzel-semibold">
              Total Payments: {paymentHistoryData?.length}
            </h4>
          </div>
          <div className="max-h-[360px] md:max-h-[400px] max-w-[270px] md:max-w-full overflow-auto">
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
                    <td>${item.price.toFixed(2)}</td>
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
