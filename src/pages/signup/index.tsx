import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormData, FormDataModal } from "@interface";
import { TextField, Button, Modal, Box } from "@mui/material";
import * as Yup from "yup";
import useAuthStore from "../../store/auth";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import React, { useState } from "react";
import { getDataFromCookie } from "../../utils/tokenService";

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

const Index = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { register, verify } = useAuthStore();
  const navigate = useNavigate();

  const emailValueFromCookie = getDataFromCookie("email") || "";
  console.log(emailValueFromCookie);

  const [emailValue, ] = useState<string>(emailValueFromCookie);

  const initialValues: FormData = {
    email: "",
    password: "",
    full_name: "",
    phone_number: "",
  };

  const initialValuesModal: FormDataModal = {
    code: "",
    email: emailValue || "",
    //...
  };

  const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Too Short!").required("Required"),
    full_name: Yup.string().min(6, "Too Short!").required("Required"),
    phone_number: Yup.string().min(13, "Too Short!").required("Required"),
  });

  const schemaModal = Yup.object().shape({
    code: Yup.string()
      .min(6, "Too Short!")
      .max(6, "Too Long")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });

  const handleSubmit = async (values: FormData) => {
    try {
      await schema.validate(values, { abortEarly: false });
      const res: any = await register(values, values.email);
      if (res.status === 200) {
        handleOpen();
      }
    } catch (err) {}
  };

  const handleSubmitModal = async (values: FormDataModal) => {
    try {
      await schemaModal.validate(values, { abortEarly: false });
      const res: any = await verify(values);
      if (res.status === 201) {
        navigate("/");
      }
    } catch (err) {}
  };

  const moveBack = () => {
    navigate("/");
  };
  return (
    <div className="flex flex-col h-[100vh] items-center justify-center">
      <h2
        onClick={moveBack}
        className="absolute top-4 left-4 text-[32px] cursor-pointer"
      >
        Back
      </h2>
      <h1 className="text-center text-[32px] mb-9 mt-5">Tizimga Kirish</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form
            id="form"
            className="flex flex-col items-center justify-center gap-5"
          >
            <Field
              name="full_name"
              as={TextField}
              label="Name"
              type="text"
              size="small"
            />
            <ErrorMessage name="full_name" component="p" />
            <Field
              name="phone_number"
              as={TextField}
              label="Phone Number"
              type="text"
              size="small"
            />
            <ErrorMessage name="phone_number" component="p" />
            <Field
              name="email"
              as={TextField}
              label="Email"
              type="text"
              size="small"
            />
            <ErrorMessage name="email" component="p" />
            <Field
              name="password"
              as={TextField}
              label="Password"
              type="password"
              size="small"
            />
            <ErrorMessage name="password" component="p" />
            <Button variant="contained" type="submit">
              {" "}
              Confirm
            </Button>
          </Form>
        )}
      </Formik>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={initialValuesModal}
            validationSchema={schemaModal}
            onSubmit={handleSubmitModal}
          >
            <Form className="flex flex-col gap-3">
              <Field
                name="code"
                as={TextField}
                label="Code"
                type="code"
                size="small"
              />
              <Button variant="contained" type="submit">
                {" "}
                Confirm
              </Button>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

export default Index;
