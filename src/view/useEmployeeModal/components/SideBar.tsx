import { BrowserHistory, HashHistory, MemoryHistory } from "history";
import { IMasterDetailOption, MasterDetail, MasterDetailMode } from "react-declarative";

import { getCurrentId } from "../routes";
import { makeStyles } from '../../../styles';
import { useState } from "react";

type History = MemoryHistory | BrowserHistory | HashHistory;

const MASTER_DETAIL_HEADER = 'react-declatative__master-detail-header';

interface IViewSideBarProps {
  children: React.ReactNode;
  history: History;
  payload: Record<string, any>;
}

const options: IMasterDetailOption[] = [
  {
    id: "employee",
    label: "Employee",
  },
  {
    id: "history",
    label: "History",
  },
];

const useStyles = makeStyles()((theme) => ({
  root: {
    [`& .${MASTER_DETAIL_HEADER}`]: {
      position: 'sticky',
      top: 0,
      marginBottom: theme.spacing(1),
    },
  },
}));

export const SideBar = ({ children, payload, history }: IViewSideBarProps) => {

  const { classes } = useStyles();

  const [activeOption, setActiveOption] = useState(() => getCurrentId(history));

  const handleOptionChange = (activeOption: string, initial: boolean) => {
    if (initial) {
      return;
    }
    if (activeOption === "employee") {
      history.replace("/employee/employee");
    }
    if (activeOption === "history") {
      history.replace("/employee/history");
    }
    setActiveOption(activeOption);
  };
  return (
    <MasterDetail
      className={classes.root}
      activeOption={activeOption}
      withTransparentTabs
      withMenuCollapse
      payload={payload}
      mode={MasterDetailMode.Tabs}
      options={options}
      onActiveOptionChange={handleOptionChange}
    >
      {children}
    </MasterDetail>
  );
};
