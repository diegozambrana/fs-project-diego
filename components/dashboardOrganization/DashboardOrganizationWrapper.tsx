'use client'
import { FC, useContext } from "react";
import Dashboard from "./Dashboard";
import { DashboardOrganizationContext } from "./DashboardContext";
import { Box, Text } from "@mantine/core";
import SearchModal from "../modal/SearchModal";
import { Loading } from "../ui/Loading";

export const DashboardOrganizationWrapper: FC = () => {
  const {hash, loading} = useContext(DashboardOrganizationContext);

  if(loading){
    return <Loading height="18rem"/>
  }

  if(!hash){
    return (
      <>
        <Text my="1rem" ta="center">
          You must to search a Organization to compare.
        </Text>
        <Box ta="center" my="1rem">
          <SearchModal typeData="org" />
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