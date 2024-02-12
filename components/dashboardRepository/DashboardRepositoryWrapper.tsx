'use client'
import { FC, useContext } from "react";
import Dashboard from "./Dashboard";
import { DashboardRepositoryContext } from "./DashboardContext";
import { Box, Text } from "@mantine/core";
import SearchModal from "../modal/SearchModal";

export const DashboardRepositoryWrapper: FC = () => {
  const {hash, loading} = useContext(DashboardRepositoryContext);

  if(loading){
    return <p>Loading...</p>
  }

  if(!hash){
    return (
      <>
        <Text my="1rem" ta="center">
          You must to search a repository or library to compare.
        </Text>
        <Box ta="center" my="1rem">
          <SearchModal typeData="repo" />
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