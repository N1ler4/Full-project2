import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import App from "../App";
import { Restore, SignIn, SignUp, Home, Users, Settings, Orders, Services, SMS , ProtectMain , ProtectAuth} from "@pages";
import { MainLayout } from "@layout";

const Index = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<ProtectMain element={<SignIn />}/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="restore" element={<Restore />} />
        <Route path="/main/*" element={<ProtectAuth element={<MainLayout />}/>}>
          <Route index element={<Home />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
          <Route path="orders" element={<Orders />} />
          <Route path="services" element={<Services />} />
          <Route path="sms" element={<SMS />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default Index;
