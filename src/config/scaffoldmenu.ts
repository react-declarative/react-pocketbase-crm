import { IScaffoldOption } from "react-declarative";
import LogoutIcon from '@mui/icons-material/LogoutOutlined';

export const scaffoldactions: IScaffoldOption[] = [
    {
      action: 'logout-action',
      icon: LogoutIcon,
      label: 'Выйти',
    },
];

export default scaffoldactions;
