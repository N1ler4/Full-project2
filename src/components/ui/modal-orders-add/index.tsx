import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import * as Yup from "yup";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { Button, Select, TextField } from "@mui/material";
import { useState , useEffect } from "react";
import { order } from "../../../service/orders";
import { services } from "../../../service/services";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface GetOrders {
  getOrders: () => any;
}

export default function Modal1({ getOrders }: GetOrders) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  console.log(data)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /// my code ----------------------------------------------------

  interface initialValues {
    amount: number | null;
    client_phonenumber: string;
    cliet_full_name: string;
    service_id: string;
  }
  interface postData extends initialValues {}

  const validationSchema = Yup.object().shape({
    amount: Yup.string().required("Amount is required"),
    client_phonenumber: Yup.string().required("Number is required"),
    cliet_full_name: Yup.string().required("Full name is required"),
    service_id: Yup.string().required("It should not be empty"),
  });

  const initialValues: initialValues = {
    amount: null,
    client_phonenumber: "",
    cliet_full_name: "",
    service_id: "",
  };

  const handelSubmit = async (value: initialValues) => {
    const data: postData = { ...value };
    try {
      const res = await order.orderPost(data);
      console.log(res);

      if (res.status === 201) {
        handleClose();
        getOrders();
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const getServese = async () => {
    const res = await services.servicesGet({
      page: 1,
      limit: 10,
    });
    console.log(res);
    setData(res.data.services);

  };

  useEffect(() => {
    getServese();
  }, []);

  //----------------------------------------------------------------

  return (
    <div>
      <button
        onClick={handleOpen}
        className="py-2 px-6 text-white font-semibold bg-[#2389DA] hover:bg-blue-800 active:bg-[#2389DA] duration-200 rounded-lg"
      >
        Qo'shish
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handelSubmit}
          >
            <Form className=" max-w-[600px]  w-full flex flex-col gap-[12px]">
              <h1 className="text-center mb-2 text-[26px] font-bold">
                Buyurtma qo'shish
              </h1>
              <Field
                as={TextField}
                label="Full Name"
                sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
                type="text"
                name="cliet_full_name"
                className=" w-[100%]  mb-3 outline-none py-0"
              />
              <ErrorMessage
                name="cliet_full_name"
                component="p"
                className="mb-3 text-red-500 text-center"
              />
              <Field
                as={TextField}
                label="Phone Number"
                sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
                type="text"
                name="client_phonenumber"
                className=" w-[100%]  mb-3 outline-none py-0"
              />
              <ErrorMessage
                name="client_phonenumber"
                component="p"
                className="mb-3 text-red-500 text-center"
              />
              <Field
                as={Select}
                label="Hizmat turi"
                sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
                type="text"
                name="service_id"
                className=" w-[100%]  mb-3 outline-none py-0"
              >
                {data.map((e:any , i:number)=>(
                  <option key={i} value={e.id}>{e.name}</option>
                ))}
              </Field>
              <ErrorMessage
                name="service_id"
                component="p"
                className="mb-3 text-red-500 text-center"
              />

              <Field
                as={TextField}
                label="Amount"
                sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
                type="number"
                name="amount"
                className=" w-[100%]  mb-3 outline-none py-0"
              />
              <ErrorMessage
                name="amount"
                component="p"
                className="mb-3 text-red-500 text-center"
              />
              <Button
                sx={{ fontSize: "16px", fontWeight: "600" }}
                variant="contained"
                type="submit"
                className="w-[100%] py-3"
              >
                qo'shish
              </Button>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}
