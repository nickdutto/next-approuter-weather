'use client';

import { MantineProvider as BaseMantineProvider } from '@mantine/core';

import { type ReactNode } from 'react';

type Props = {
  sansFont?: string;
  monoFont?: string;
  children: ReactNode;
};

const MantineProvider = ({ sansFont, monoFont, children }: Props) => {
  return (
    <BaseMantineProvider
      forceColorScheme="dark"
      theme={{
        colors: {
          dark: [
            '#C1C2C5',
            '#A6A7AB',
            '#909296',
            '#5c5f66',
            '#373A40',
            '#2C2E33',
            '#25262b',
            '#1A1B1E',
            '#141517',
            '#101113',
          ],
          night: [
            '#26262B',
            '#242429',
            '#222226',
            '#1F1F23',
            '#1D1D20',
            '#1A1A1E',
            '#18181B',
            '#161618',
            '#131316',
            '#111113',
            '#101012',
          ],
        },
        fontFamily: `${sansFont}, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji`,
        fontFamilyMonospace: `${monoFont}, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace`,
        headings: {
          fontFamily: `${sansFont}, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji`,
        },
      }}
    >
      {children}
    </BaseMantineProvider>
  );
};

export default MantineProvider;
