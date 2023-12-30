import {
  Accessibility,
  AddBusinessOutlined,
  Apps,
  AvTimerOutlined,
  CalendarMonth,
  ConnectWithoutContact,
  DeleteOutline,
  DoDisturbOn,
  DoDisturbOnOutlined,
  FaceRetouchingNatural,
  FaceRetouchingOff,
  PermContactCalendar,
  PunchClockOutlined,
  SettingsAccessibility,
} from "@mui/icons-material";

import AssignmentIcon from "@mui/icons-material/Assignment";
import BusinessIcon from "@mui/icons-material/Business";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
import EngineeringIcon from "@mui/icons-material/Engineering";
import EventNote from "@mui/icons-material/EventNoteOutlined";
import FaceIcon from "@mui/icons-material/Face";
import FolderDelete from "@mui/icons-material/FolderDeleteOutlined";
import GradeIcon from "@mui/icons-material/Grade";
import GroupsIcon from "@mui/icons-material/Groups";
import Home from "@mui/icons-material/Home";
import HomeIcon from "@mui/icons-material/Home";
import { IScaffold2Group } from "react-declarative";
import PeopleIcon from "@mui/icons-material/People";
import PermMediaOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActual";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import PhonelinkSetupIcon from "@mui/icons-material/PhonelinkSetup";
import PointOfSale from "@mui/icons-material/PointOfSaleOutlined";
import PublicIcon from "@mui/icons-material/Public";
import SettingsEthernetIcon from "@mui/icons-material/SettingsEthernet";
import SettingsIcon from "@mui/icons-material/Settings";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
import TimerIcon from "@mui/icons-material/Timer";
import hasRouteMatch from "../utils/hasRouteMatch";
import ioc from "../lib/ioc";

export const sidemenu: IScaffold2Group[] = [
  {
    id: "build",
    children: [
      {
        id: "authentication",
        icon: PeopleIcon,
        tabs: [
          {
            id: "tab1",
            label: "Tab1",
          },
          {
            id: "tab2",
            label: "Tab2",
          },
        ],
        options: [
          {
            id: "tab1",
          },
          {
            id: "tab2",
          },
        ],
      },
      { id: "lorem ipsum", icon: DnsRoundedIcon },
      { id: "lorem ipsum", icon: PermMediaOutlinedIcon },
      { id: "lorem ipsum", icon: PublicIcon },
      { id: "lorem ipsum", icon: SettingsEthernetIcon },
      {
        id: "lorem ipsum",
        icon: SettingsInputComponentIcon,
      },
    ],
  },
  {
    id: "Application",
    children: [
      { id: "Settings", icon: SettingsIcon },
      { id: "lorem ipsum", icon: TimerIcon },
      { id: "lorem ipsum", icon: PhonelinkSetupIcon },
    ],
  },
];

export default sidemenu;
