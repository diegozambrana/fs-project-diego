'use client';
import { FC } from "react";
import { DashboardRepositoryProvider } from "./DashboardContext";
import { DashboardRepositoryWrapper } from "./DashboardRepositoryWrapper";

export const DashboardRepository: FC = () => {
  return (
    <DashboardRepositoryProvider>
      <DashboardRepositoryWrapper />
    </DashboardRepositoryProvider>
  )
}