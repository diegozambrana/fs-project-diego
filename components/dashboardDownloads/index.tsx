'use client';
import { FC } from "react";
import { DashboardPackagesProvider } from "./DashboardContext";
import { DashboardPackagesWrapper } from "./DashboardPackagesWrapper";

export const DashboardPackages: FC = () => {
  return (
    <DashboardPackagesProvider>
      <DashboardPackagesWrapper />
    </DashboardPackagesProvider>
  )
}