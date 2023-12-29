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
import EngineeringIcon from "@mui/icons-material/Engineering";
import EventNote from "@mui/icons-material/EventNoteOutlined";
import FaceIcon from "@mui/icons-material/Face";
import FolderDelete from "@mui/icons-material/FolderDeleteOutlined";
import GradeIcon from "@mui/icons-material/Grade";
import GroupsIcon from "@mui/icons-material/Groups";
import Home from "@mui/icons-material/Home";
import HomeIcon from "@mui/icons-material/Home";
import { IScaffold2Group } from "react-declarative";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import PointOfSale from "@mui/icons-material/PointOfSaleOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import hasRouteMatch from "../utils/hasRouteMatch";
import ioc from "../lib/ioc";

export const sidemenu: IScaffold2Group[] = [
  {
    id: "global",
    noHeader: true,
    children: [
      {
        id: "dashboard",
        label: "Главная",
        icon: DashboardIcon,
      },
      {
        id: "apartment",
        label: "База объектов",
        icon: Home,
        options: [
          {
            id: "rent",
            icon: EventNote,
            label: "Аренда",
          },
          {
            id: "sell",
            icon: PointOfSale,
            label: "Продажа",
          },
          {
            id: "archive",
            icon: FolderDelete,
            label: "Архив",
            options: [
              {
                id: "archive",
                icon: FaceRetouchingOff,
                label: "Неактивно",
              },
              {
                id: "remove",
                icon: DoDisturbOnOutlined,
                label: "Удалено",
              },
            ],
          },
        ],
      },
      {
        id: "bid",
        label: "Заявки",
        icon: ConnectWithoutContact,
        options: [
          {
            id: "rent",
            icon: AvTimerOutlined,
            label: "Аренда",
          },
          {
            id: "sell",
            icon: AddBusinessOutlined,
            label: "Продажа",
          },
          {
            id: "archive",
            icon: DeleteOutline,
            label: "Архив",
          },
        ],
      },
      {
        id: "deal",
        label: "Сделки",
        icon: AssignmentIcon,
      },
      {
        id: "task",
        label: "Задачи",
        icon: PermContactCalendar,
      },
      {
        id: "contact",
        label: "Контакты",
        icon: PermPhoneMsgIcon,
      },
      {
        id: "user",
        label: "Сотрудники",
        icon: GroupsIcon,
        options: [
          {
            id: "common",
            icon: FaceRetouchingNatural,
            label: "Все сотрудники",
          },
          {
            id: "archive",
            icon: DoDisturbOnOutlined,
            label: "Архив",
          },
        ],
      },
      {
        id: "settings",
        label: "Настройки",
        icon: SettingsIcon,
        tabs: [
          {
            id: "common",
            isActive: () => hasRouteMatch(["/settings", "/settings/common"]),
            label: "Общая информация",
          },
          {
            id: "roles",
            isActive: () => hasRouteMatch(["/settings/roles"]),
            label: "Роли сотрудников",
          },
          {
            id: "integration",
            isActive: () => hasRouteMatch(["/settings/integration"]),
            label: "Интеграция в Telegram",
          },
          {
            id: "field_visibility",
            isActive: () => hasRouteMatch(["/settings/field_visibility"]),
            label: "Поля",
          },
          {
            id: "autofind_config",
            isActive: () => hasRouteMatch(["/settings/autofind_config"]),
            label: "Автоподбор",
          },
          {
            id: "export_data",
            isActive: () => hasRouteMatch(["/settings/export_data"]),
            label: "Экспорт данных",
          },
        ],
      },
    ],
  },
];

export default sidemenu;
