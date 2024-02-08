import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@mantine/core/styles.css';

import { ColorSchemeScript, Container, MantineProvider, createTheme } from '@mantine/core';
import { Grid, GridCol } from '@mantine/core';
import { HeaderTabs } from "@/components/layouts/HeaderTabs";
import Sidebar from "@/components/layouts/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nixtla Tracker",
  description: "dashboard for compare repositories and libraries",
};

const theme = createTheme({
  cursorType: 'pointer',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <MantineProvider theme={theme}>
          <HeaderTabs />
          <Container size="md">
            <Grid>
              <GridCol span={12}>
                {children}
              </GridCol>
              <GridCol span={12}>
                <Sidebar />
              </GridCol>
            </Grid>
          </Container>
        </MantineProvider>
      </body>
    </html>
  );
}
