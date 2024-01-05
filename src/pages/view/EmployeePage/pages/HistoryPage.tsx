import {
  Breadcrumbs2,
  Breadcrumbs2Type,
  IBreadcrumbs2Option,
  IOutletProps,
  VirtualView,
  useAsyncAction,
} from "react-declarative";
import { List, ListItemButton, ListItemText } from "@mui/material";

import { IHistoryRow } from "../../../../lib/services/db/HistoryDbService";
import dayjs from "dayjs";
import ioc from "../../../../lib/ioc";
import { useState } from "react";

const options: IBreadcrumbs2Option[] = [
  {
    type: Breadcrumbs2Type.Link,
    action: "list-action",
    label: "Employees",
  },
  {
    type: Breadcrumbs2Type.Link,
    action: "list-action",
    label: "History",
  },
  {
    type: Breadcrumbs2Type.Button,
    isDisabled: ({ hasChanged }) => !hasChanged,
    action: "save-action",
    label: "Save",
  },
];

export const HistoryPage = ({
  formState,
  beginSave,
  params: { id },
}: IOutletProps) => {
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

  const handleAction = (action: string) => {
    if (action === "list-action") {
      ioc.routerService.back();
    }
    if (action === "save-action") {
      beginSave();
    }
  };

  return (
    <>
      <Breadcrumbs2
        payload={formState}
        items={options}
        onAction={handleAction}
      />
      <VirtualView
        component={List}
        sx={{ height: "80vh" }}
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
    </>
  );
};

export default HistoryPage;
