'use client';

import { MantineColorsTuple, createTheme } from '@mantine/core';

const primary: MantineColorsTuple = [
  '#ebfaff',
  '#d7f3fb',
  '#a9e6f9',
  '#7ad9f8',
  '#5dcef6',
  '#4ec7f6',
  '#45c3f7',
  '#39addc',
  '#2a99c4',
  '#0085ad',
];

export const theme = createTheme({
  primaryColor: 'primary',
  primaryShade: 9,
  colors: {
    primary,
  },
});
