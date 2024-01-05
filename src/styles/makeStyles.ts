import { createMakeAndWithStyles, keyframes } from 'tss-react';

import { useTheme } from '@mui/material/styles';

export const { makeStyles } = createMakeAndWithStyles({
  useTheme,
});

export { useTheme, keyframes };

export default makeStyles;
