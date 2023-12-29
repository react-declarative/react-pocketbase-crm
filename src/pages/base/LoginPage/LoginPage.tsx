import { CssBaseline, IconButton, InputAdornment, Link, Paper, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { ActionButton } from "react-declarative";
import Box from "@mui/material/Box";
import { CC_APP_NAME } from "../../../config/params";
import TextField from "@mui/material/TextField";
import ioc from "../../../lib/ioc";
import { useState } from "react";

const handleSubmit = async (form: HTMLFormElement) => {
  const formData = new FormData(form);

  const email = formData.get("email");
  const password = formData.get("password");

  if (!email) {
    ioc.alertService.notify("Please enter email");
    return;
  }

  if (!password) {
    ioc.alertService.notify("Please enter password");
    return;
  }

  const isOk = await ioc.pocketbaseService.login({
    email: email.toString().trim(),
    password: password.toString().trim(),
  });

  if (isOk) {
    ioc.routerService.push("/dashboard");
  }
};

export const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        background: (theme) => theme.palette.background.default,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 99999,
      }}
    >
      <CssBaseline />
      <Paper
        component="form"
        sx={{
          p: 2,
          marginTop: "-5vh",
          maxWidth: "325px",
          minWidth: "325px",
        }}
        onSubmit={(e: any) => {
          e.preventDefault();
          return false;
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: (theme) => theme.palette.primary.main,
            mb: 3,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {CC_APP_NAME}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginBottom: 3,
            gap: "15px",
          }}
        >
          <TextField
            required
            name="email"
            fullWidth
            label="Email"
            placeholder="Email"
            helperText="Email"
            type="email"
          />

          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            placeholder="Password"
            helperText="Password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((v) => !v)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <ActionButton
          onClick={async ({ currentTarget }) => {
            await handleSubmit(currentTarget.closest("form")!);
          }}
          variant="contained"
          type="submit"
          fullWidth
        >
          Sign in
        </ActionButton>
      </Paper>
    </Box>
  );
};

export default RegisterPage;
