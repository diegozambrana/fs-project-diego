'use client'
import { FC, useContext } from "react";
import Dashboard from "./Dashboard";
import { DashboardPackagesContext } from "./DashboardContext";
import { Box, Text } from "@mantine/core";
import SearchModal from "../modal/SearchModal";
import { Loading } from "../ui/Loading";

export const DashboardPackagesWrapper: FC = () => {
  const {hash, loading} = useContext(DashboardPackagesContext);

  if(loading){
    return <Loading height="18rem"/>
  }

  if(!hash){
    return (
      <>
        <Text my="1rem" ta="center">
          You must to search a Python Package.
        </Text>
        <Box ta="center" my="1rem">
          <SearchModal typeData="package" title="Enter the python package name" />
        </Box>
      </>
    )
  }

  return (
    <div>
      <Dashboard />
    </div>
  );
}