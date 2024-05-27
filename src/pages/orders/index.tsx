import React, { useEffect, useState } from "react";
import { GlobolTeble, OrderAdd } from "@ui";
import { order } from "../../service/orders";
import Pagination from "@mui/material/Pagination";

const Index: React.FC = () => {
  const [loader, setLoader] = useState<boolean>(true);
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const theader = [
    { title: "", name: "id" },
    { title: "Ism Sharifi", name: "client_name" },
    { title: "Telefon nomer", name: "client_phone_number" },
    { title: "Xizmat turi", name: "service_name" },
    { title: "Buyurtirildi", name: "created_at" },
    { title: "Status", name: "status" },
    { title: "Narxi", name: "service_price" },
    { title: "Action", name: "order action" },
  ];

  const getOrder = async (page: number) => {
    try {
      const res = await order.orderGet({
        page,
        limit: 10,
      });
      setData(res.data.orders_list);
      setTotalPages(Math.ceil(res.data.total / 10));
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setLoader(true);
    getOrder(page);
  };

  useEffect(() => {
    getOrder(currentPage);
  }, [currentPage]);

  const deletIdData = async (id: string) => {
    try {
      const res = await order.orderDelete(id);
      if (res.status === 200) {
        getOrder(currentPage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loader ? (
        <div className="fixed top-0 left-0 w-full h-[100vh] flex items-center justify-center z-150">
          <div className="loader"></div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-[24px] font-bold ">Xizmatlar</h1>
            <OrderAdd getOrders={() => getOrder(currentPage)} />
          </div>
          {data ? (
            <div>
              <GlobolTeble
                theader={theader}
                tbody={data}
                deletIdData={deletIdData}
                getOrders={() => getOrder(currentPage)}
              />
              <div className="flex justify-center mt-4">
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={(event, page) => handlePageChange(page)}
                />
              </div>
            </div>
          ) : (
            <h1 className="text-[24px] text-center text-red-400  ">
              Malimot topilmadi 😓 , iltimos janob malumot qo'shing 😊{" "}
            </h1>
          )}
        </div>
      )}
    </>
  );
};

export default Index;
