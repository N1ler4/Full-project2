import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";

import * as Yup from "yup";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { Button, TextField, Select, MenuItem } from "@mui/material";

import { order } from "../../../service/orders";

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

// interface DataProps {
//     id: string,
//     name: string,
//     price: number,
//     created_at: string
// }

export default function ModalOrderEdit({ data, getServese }: any) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /// my code ----------------------------------------------------

  interface initialValues {
    amount: number | null;
    status: string;
  }
  interface postData extends initialValues {
    client_id: string;
    id: string;
    service_id: string;
  }

  const validationSchema = Yup.object().shape({
    amount: Yup.number().required("amount is required"),
    status: Yup.string().required("status is required"),
  });

  const initialValues: initialValues = {
    amount: null,
    status: "",
  };

  const handelSubmit = async (value: initialValues) => {
    const paylod: postData = {
      ...value,
      id: data.id,
      client_id: data.client_id,
      service_id: data.service_id,
    };
    try {
      const res = await order.orderUpdate(paylod);

      if (res.status === 200) {
        getServese();
        handleClose();
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  //----------------------------------------------------------------

  return (
    <div>
      <button
        onClick={handleOpen}
        className="py-1 px-3 rounded-md bg-orange-500 hover:bg-orange-700 active:bg-orange-500 duration-300 text-white flex items-center gap-2"
      >
        <EditIcon />
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
                Change of Order
              </h1>
              <p>Change Amount</p>
              <Field
                as={TextField}
                label="amount"
                sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
                type="number"
                name="amount"
                className=" w-[100%]  mb-3 outline-none py-0"
              />
              <ErrorMessage
                name="name"
                component="p"
                className="mb-3 text-red-500 text-center"
              />
              <p>Change Order Status</p>
              <Field
                as={Select}
                label="status"
                sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
                type="text"
                name="status"
                className=" w-[100%]  mb-3 outline-none py-0"
              >
                <MenuItem value="" disabled>
                  Choose status
                </MenuItem>
                <MenuItem value="taken">taken</MenuItem>
                <MenuItem value="done">Done</MenuItem>
                <MenuItem value="in_process">In process</MenuItem>
              </Field>
              <ErrorMessage
                name="price"
                component="p"
                className="mb-3 text-red-500 text-center"
              />
              <Button
                sx={{ fontSize: "16px", fontWeight: "600" }}
                variant="contained"
                type="submit"
                className="w-[100%] py-3"
              >
                change
              </Button>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}
