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

export const sidemenu: IScaffold2Group[] = [
  {
    id: "data",
    children: [
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
      { id: "settings", icon: SettingsIcon },
      { id: "never", label: "lorem ipsum", icon: TimerIcon },
      { id: "never", label: "lorem ipsum", icon: PhonelinkSetupIcon },
    ],
  },
];

export default sidemenu;
