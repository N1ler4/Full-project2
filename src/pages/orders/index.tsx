import { useEffect, useState } from "react";

import { GlobolTeble, OrderAdd } from "@ui";
import { order } from "../../service/orders";
import { services } from "../../service/services";

const index = () => {
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState([]);
  const [time, setTime] = useState("");
  console.log(time)
  // console.log(time)
  console.log(data);

  const theader = [
    { title: "", name: "id" },
    { title: "Ism Sharifi", name: "client_name" },
    { title: "Telefon nomer", name: "client_phone_number" },
    { title: "Xizmat turi", name: "service_name" },
    { title: "Buyurtirildi", name: time },
    { title: "Status", name: "status" },
    { title: "Narxi", name: "service_price" },
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
    console.log(res.data.orders_list[0].created_at);
    setTime(res.data.orders_list.map((element: { created_at: any; }) => element.created_at.slice(0,10)));
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
