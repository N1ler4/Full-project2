import Img from "@images/login-bg.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormData2 } from "@interface";
import { TextField, Button } from "@mui/material";
import * as Yup from "yup";
import useAuthStore from "../../store/auth";
import { useNavigate } from "react-router-dom";

import "./style.scss";
import { saveDataFromCookie } from "../../utils/tokenService";
const index = () => {
  const { signin } = useAuthStore();
  const navigate = useNavigate();
  const initialValues: FormData2 = {
    email: "",
    password: "",
  };

  const schema = Yup.object().shape({
    email: Yup.string().min(4, "Too Short!").required("Required"),
    password: Yup.string().min(6, "Too Short!").required("Required"),
  });
  const handleSubmit = async (values: FormData2) => {
    try {
      await schema.validate(values, { abortEarly: false });
      const res: any = await signin(values);
      if (res.status === 200) {
        saveDataFromCookie("id", res.data.id);
        saveDataFromCookie("email", values.email);
        saveDataFromCookie("refresh_token" , res.data.refresh_token);
        navigate("/main");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const moveToSignUp = () => {
    navigate("/signup");
  };
  const restorePassword = () => {
    navigate("/restore");
  };
  return (
    <div className="flex flex-col">
      <img src={Img} alt="" className="lg:h-[250px] w-full sm:h-[150px]" />
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
              type="text"
              size="small"
            />
            <ErrorMessage name="password" component="p" />

            <Button variant="contained" type="submit">
              Contained
            </Button>
          </Form>
        )}
      </Formik>
      <div className="mt-5">
        <p className="text-center text-[14px]">
          Hisobingiz yo‘qmi??{" "}
          <span onClick={moveToSignUp} className="text-blue-400 cursor-pointer">
            Ro'yxatdan o'tish
          </span>
        </p>
      </div>
      <div>
        <p className="text-center text-[14px]">
          Parolni unutdingiz?{" "}
          <span
            onClick={restorePassword}
            className="text-blue-400 cursor-pointer"
          >
            Parolni tiklash
          </span>
        </p>
      </div>
    </div>
  );
};

export default index;
