import { CC_APP_NAME } from "../../../config/params";
import { ErrorView } from "react-declarative";

export const ErrorPage = () => (
    <ErrorView appName={CC_APP_NAME} />
);

export default ErrorPage;
