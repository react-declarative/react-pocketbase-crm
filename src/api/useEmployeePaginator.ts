import ioc from "../lib/ioc";
import { useArrayPaginator } from "react-declarative";

export const useEmployeePaginator = () => {
  return useArrayPaginator(ioc.employeeViewService.paginate, {
    onLoadStart: () => ioc.layoutService.setAppbarLoader(true),
    onLoadEnd: () => ioc.layoutService.setAppbarLoader(false),
  });
};

export default useEmployeePaginator;
