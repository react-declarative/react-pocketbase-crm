import {
  IOutletProps,
  One,
} from "react-declarative";

import { SideBar } from "../components/SideBar";
import employee_fields from "../../../assets/employee_fields";

export const DataView = ({ history, payload, data }: IOutletProps) => (
  <SideBar history={history} payload={payload}>
    <One
      fields={employee_fields}
      handler={() => data}
      payload={payload}
      outlinePaper
      readonly
    />
  </SideBar>
);

export default DataView;
