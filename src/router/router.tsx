import HomeIcon from '@mui/icons-material/Home';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import GroupIcon from '@mui/icons-material/Group';
import SmsIcon from '@mui/icons-material/Sms';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import SettingsIcon from '@mui/icons-material/Settings';

interface Route  {
  path: string,
  content: string,
  icon: React.ReactElement
}

const router : Route[] = [
  {
    path: "/main",
    content: "Asosiy",
    icon: <HomeIcon/>
  },
  {
    path: "/main/orders",
    content: "Buyurtmalar",
    icon: <LocalOfferIcon/>
  },
  // {
  //   path: "/main/users",
  //   content: "Mijozlar",
  //   icon: <GroupIcon/>
  // },
  // {
  //   path: "/main/sms",
  //   content: "Mijozlar",
  //   icon: <SmsIcon/>
  // },

  {
    path: "/main/services",
    content: "Xizmatlar",
    icon: <ElectricalServicesIcon/>
  },
  // {
  //   path: "/main/settings",
  //   content: "Sozlamalar",
  //   icon: <SettingsIcon/>
  // },
];

export default router;
