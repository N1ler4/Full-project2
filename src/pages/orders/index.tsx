import { useEffect, useState } from "react";

import { GlobolTeble, OrderAdd } from "@ui";
import { order } from "../../service/orders";
import { services } from "../../service/services";

const index = () => {
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState([]);
  console.log(data);

  const theader = [
    { title: "", name: "id" },
    { title: "Ism Sharifi", name: "service_id" },
    { title: "Xizmat turi", name: "updated_at" },
    { title: "Buyurtirildi", name: "created_at" },
    { title: "Status", name: "status" },
    { title: "Narxi", name: "price" },
    { title: "Action", name: "action" },
  ];

  const getOrder = async () => {
    const res = await order.orderGet({
      page: 1,
      limit: 10,
    });
    console.log(res);
    setData(res.data.orders_list);
    console.log(res.data.orders_list);
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  };

  useEffect(() => {
    getOrder();
  }, []);

  const getServese = async () => {
    const res = await services.servicesGet({
      page: 1,
      limit: 10,
    });
    console.log(res);
    setData(res.data.services);
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  };

  useEffect(() => {
    getServese();
  }, []);

  // // Delete the service name --------------------------------
  const deletIdData = async (id: string) => {
    try {
      const res = await order.orderDelete(id);
      if (res.status === 200) {
        getOrder();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //================================================================

  return (
    <>
      {loader ? (
        <div className=" fixed top-0 left-0 w-full h-[100vh]  flex items-center justify-center z-150">
          <div className="loader"></div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-[24px] font-bold ">Xizmatlar</h1>
            <OrderAdd getOrders={getOrder} />
          </div>
          {data ? (
            <GlobolTeble
              theader={theader}
              tbody={data}
              deletIdData={deletIdData}
              getOrders={getOrder}
            />
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

export default index;
