import { CC_APP_NAME } from "../../config/params";
import Logo from "./Logo";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export const AppHeader = () => (
  <Stack
    width="100%"
    minHeight="48px"
    gap={2}
    ml={1}
    direction="row"
    alignItems="center"
    justifyContent="stretch"
  >
    <Logo />
    <Typography
      sx={{
        height: 42,
        display: "flex",
        alignItems: "center",
        fontWeight: "bold",
        color: "white",
        flex: 1,
      }}
      variant="h6"
    >
      {CC_APP_NAME}
    </Typography>
  </Stack>
);

export default AppHeader;
