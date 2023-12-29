import { CC_APP_VERSION } from "../../config/params";
import { Typography } from "@mui/material";

export const Version = () => {
  return (
    <>
      {!!CC_APP_VERSION && (
        <Typography
          variant="caption"
          sx={{
            opacity: 0.5,
            pointerEvents: "none",
            p: 1,
          }}
        >
          v{CC_APP_VERSION}
        </Typography>
      )}
    </>
  );
};

export default Version;
