import Snackbar from "@mui/material/Snackbar";
import ioc from '../../lib/ioc';
import { observer } from "mobx-react";

const AUTO_HIDE_DURATION = 5000;

interface IAlertProviderProps {
    children: React.ReactNode;
}

export const AlertProvider = observer(({
    children,
}: IAlertProviderProps) => {
    const { current } = ioc.alertService;
    return (
        <>
            {!!current && (
                <Snackbar
                    open
                    key={current.key}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    autoHideDuration={AUTO_HIDE_DURATION}
                    onClose={ioc.alertService.hideCurrent}
                    sx={{ zIndex: 9999999 }}
                    message={current.message}
                />
            )}
            {children}
        </>
    );
});

export default AlertProvider;
