'use client';
import { FC } from "react";
import { DashboardOrganizationProvider } from "./DashboardContext";
import { DashboardOrganizationWrapper } from "./DashboardOrganizationWrapper";

export const DashboardOrganization: FC = () => {
  return (
    <DashboardOrganizationProvider>
      <DashboardOrganizationWrapper />
    </DashboardOrganizationProvider>
  )
}