'use client'
import { FC, useContext } from "react";
import Dashboard from "./Dashboard";
import { DashboardPackagesContext } from "./DashboardContext";
import { Box, Text } from "@mantine/core";
import SearchModal from "../modal/SearchModal";
import Help from "../ui/Help";
import { PackageHelp } from "../helps/PackagesHelp";
import { Loading } from "../ui/Loading";

export const DashboardPackagesWrapper: FC = () => {
  const {hash, loading} = useContext(DashboardPackagesContext);

  if(loading){
    return <Loading height="18rem"/>
  }

  if(!hash){
    return (
      <>
        <Box ta="right">
          <Help content={<PackageHelp />}/>
        </Box>
        <Text my="1rem" ta="center">
          You must to search a Python Package.
        </Text>
        <Box ta="center" my="1rem">
          <SearchModal typeData="package" />
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