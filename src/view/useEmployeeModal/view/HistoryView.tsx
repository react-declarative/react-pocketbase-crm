import {
  FilesView,
  IOutletProps,
  PaperView,
  VirtualView,
  downloadBlank,
  useAsyncAction,
} from "react-declarative";

import { IHistoryRow } from "../../../lib/services/db/HistoryDbService";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import { SideBar } from "../components/SideBar";
import dayjs from "dayjs";
import ioc from "../../../lib/ioc";
import { useState } from "react";

export const HistoryView = ({ history, payload, params: { id } }: IOutletProps) => {
  const [items, setItems] = useState<IHistoryRow[]>([]);

  const { loading, execute } = useAsyncAction(
    async (initial: boolean) => {
      if (initial) {
        const items = await ioc.historyViewService.findAllByEmployeeId(id);
        items.sort(({ created: a }, { created: b }) =>
          dayjs(a).isBefore(b) ? 1 : -1
        );
        setItems(items);
      }
    },
    {
      fallback: ioc.errorService.handleGlobalError,
      onLoadStart: () => ioc.layoutService.setAppbarLoader(true),
      onLoadEnd: () => ioc.layoutService.setAppbarLoader(false),
    }
  );
  return (
    <SideBar history={history} payload={payload}>
      <VirtualView
        component={List}
        sx={{ height: "calc(100vh - 300px)" }}
        minHeight={72}
        loading={loading}
        onDataRequest={(initial) => void execute(initial)}
      >
        {items.map((item) => (
          <ListItemButton>
            <ListItemText
              primary={item.comment}
              secondary={dayjs(item.created).format("HH:mm DD/MM/YYYY")}
            />
          </ListItemButton>
        ))}
      </VirtualView>
    </SideBar>
  );
};

export default HistoryView;
