import { Dashboard } from "@mui/icons-material";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
import { IScaffold2Group } from "react-declarative";
import PeopleIcon from "@mui/icons-material/People";
import PermMediaOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActual";
import PhonelinkSetupIcon from "@mui/icons-material/PhonelinkSetup";
import PublicIcon from "@mui/icons-material/Public";
import SettingsEthernetIcon from "@mui/icons-material/SettingsEthernet";
import SettingsIcon from "@mui/icons-material/Settings";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
import TimerIcon from "@mui/icons-material/Timer";
import hasRouteMatch from "../utils/hasRouteMatch";

export const sidemenu: IScaffold2Group[] = [
  {
    id: "data",
    children: [
      {
        id: "kanban",
        icon: Dashboard,
      },
      {
        id: "employee",
        icon: PeopleIcon,
        lifted: true,
        options: [
          {
            id: "active",
          },
          {
            id: "inactive",
          },
        ],
        tabs: [
          {
            id: "data",
            isVisible: () =>
              hasRouteMatch([
                "/employee/:id",
                "/employee/:id/employee",
                "/employee/:id/history",
              ]),
            isActive: () =>
              hasRouteMatch(["/employee/:id", "/employee/:id/employee"]),
          },
          {
            id: "history",
            isVisible: () =>
              hasRouteMatch([
                "/employee/:id",
                "/employee/:id/employee",
                "/employee/:id/history",
              ]),
            isActive: () => hasRouteMatch(["/employee/:id/history"]),
          },
        ],
      },
      { id: "never", label: "lorem ipsum", icon: DnsRoundedIcon },
      { id: "never", label: "lorem ipsum", icon: PermMediaOutlinedIcon },
      { id: "never", label: "lorem ipsum", icon: PublicIcon },
      { id: "never", label: "lorem ipsum", icon: SettingsEthernetIcon },
      {
        id: "never",
        label: "lorem ipsum",
        icon: SettingsInputComponentIcon,
      },
    ],
  },
  {
    id: "application",
    children: [
      {
        id: "settings",
        icon: SettingsIcon,
        tabs: [
          {
            id: "features",
            isVisible: () =>
              hasRouteMatch([
                "/settings",
                "/settings/features",
                "/settings/visibility",
              ]),
            isActive: () =>
              hasRouteMatch([
                "/settings",
                "/settings/features",
              ]),
          },
          {
            id: "visibility",
            isVisible: () =>
              hasRouteMatch([
                "/settings",
                "/settings/features",
                "/settings/visibility",
              ]),
            isActive: () => hasRouteMatch(["/settings/visibility"]),
          },
        ],
      },
      { id: "never", label: "lorem ipsum", icon: TimerIcon },
      { id: "never", label: "lorem ipsum", icon: PhonelinkSetupIcon },
    ],
  },
];

export default sidemenu;
