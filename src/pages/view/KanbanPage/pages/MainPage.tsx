import {
  IBoardColumn,
  IBoardItem,
  IBoardRow,
  IOutletProps,
  KanbanView,
} from "react-declarative";
import { useCallback, useEffect, useRef, useState } from "react";

import { IEmployeeRow } from "../../../../lib/services/db/EmployeeDbService";
import ioc from "../../../../lib/ioc";
import { useEmployeePreviewModal } from "../../../../view/useEmployeePreviewModal";

const rows: IBoardRow<IEmployeeRow>[] = [
  {
    label: "Display name",
    value: (id, employee) =>
      [employee.first_name, employee.last_name].join(" "),
  },
  {
    label: "Email",
    value: (id, employee) => employee.email,
    click: (id, data, payload) => payload.pickEmployeePreviewModal(id),
  },
  {
    label: "Phone",
    value: (id, employee) => employee.phone,
  },
  {
    label: "Hire date",
    value: (id, employee) => employee.hire_date,
  },
];

const columns: IBoardColumn<IEmployeeRow>[] = [
  {
    color: "#9C27B0",
    column: "New contact",
    rows,
  },
  {
    color: "#00ACC1",
    column: "Signing contract",
    rows,
  },
  {
    color: "#2E7D32",
    column: "Working",
    rows,
  },
  {
    color: "#FFA000",
    column: "Retired",
    rows,
  },
];

export const MainPage = ({ data }: IOutletProps) => {

  const boardRef = useRef<HTMLDivElement>();

  const pickEmployeePreviewModal = useEmployeePreviewModal();

  const getItems = useCallback((): IBoardItem<IEmployeeRow>[] => {
    const employees = data as IEmployeeRow[];
    return employees.map((employee) => {
      return {
        id: employee.id,
        column: employee.status,
        data: employee,
        label: employee.id,
        updatedAt: employee.updated,
      };
    });
  }, []);

  const [items, setItems] = useState(getItems);

  const handleChangeColumn = async (id: string, status: string) => {
    const { updated } = await ioc.employeeViewService.update(id, {
      status,
    } as IEmployeeRow);
    setItems((items) =>
      items.map((item) => {
        if (item.id === id) {
          item.data.status = status;
          item.column = status;
          item.updatedAt = updated;
        }
        return item;
      })
    );
  };

  useEffect(
    () =>
      ioc.employeeViewService.updateSubject.subscribe(
        ([id, { status, updated }]) => {
          setItems((items) =>
            items.map((item) => {
              if (item.id === id) {
                item.data.status = status;
                item.column = status;
                item.updatedAt = updated;
              }
              return item;
            })
          );
        }
      ),
    [items]
  );

  useEffect(KanbanView.enableScrollOnDrag(boardRef), []);

  return (
    <KanbanView
      ref={boardRef}
      withUpdateOrder
      withGoBack
      sx={{
        height: "calc(100vh - 100px)",
      }}
      onChangeColumn={handleChangeColumn}
      onCardLabelClick={pickEmployeePreviewModal}
      payload={() => ({
        pickEmployeePreviewModal,
      })}
      columns={columns}
      items={items}
    />
  );
};

export default MainPage;
