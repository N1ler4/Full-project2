import React, { useEffect, useState } from "react";
import { services } from "../../service/services";
import { GlobolTeble, Modal1 } from "@ui";
import Pagination from "@mui/material/Pagination";

const Index: React.FC = () => {
  const [loader, setLoader] = useState<boolean>(true);
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const theader = [
    { title: "", name: "id" },
    { title: "Xizmat nomi", name: "name" },
    { title: "Narxi (so‘m)", name: "price" },
    { title: "Action", name: "action" },
  ];

  const getServices = async (page: number) => {
    try {
      const res = await services.servicesGet({
        page,
        limit: 10,
      });
      setData(res.data.services);
      setTotalPages(Math.ceil(res.data.total / 10));
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  useEffect(() => {
    getServices(currentPage);
  }, [currentPage]);

  const deletIdData = async (id: string) => {
    try {
      const res = await services.servicesDelete(id);
      if (res.status === 200) {
        getServices(currentPage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
    setLoader(true);
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
            <h1 className="text-[24px] font-bold">Xizmatlar</h1>
            <Modal1 getServices={getServices} />
          </div>
          {data ? (
            <div>
              <GlobolTeble
                tbody={data}
                theader={theader}
                deletIdData={deletIdData}
                getServices={getServices}
              />
              <div className="flex justify-center mt-4">
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                />
              </div>
            </div>
          ) : (
            <h1 className="text-[24px] text-center text-red-400">
              Malimot topilmadi 😓 , iltimos janob malumot qo'shing 😊
            </h1>
          )}
        </div>
      )}
    </>
  );
};

export default Index;
