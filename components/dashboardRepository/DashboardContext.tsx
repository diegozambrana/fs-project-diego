'use client';
import { useRepository } from "@/hooks/api/useRepository";
import { decodeHash } from "@/utils/decoder";
import React, { FC, createContext, useCallback, useEffect, useMemo, useState } from "react";

interface DashboardRepoContextType {
  hash: string | null;
  hasHash: boolean;
  loading: boolean;
  repositories: DashboardRepositories[];
  dataFromHash: {
    owner: string;
    name: string;
  }[];

  setLoading: (loading: boolean) => void;
  addRepository: (repository: DashboardRepositories) => void;
  removeRepository: (repository: DashboardRepositories) => void;
  reviewHash: () => void;
}

interface DashboardRepositoryProviderProps {
  children: React.ReactNode;
}

interface DashboardRepositories {
  avatar_url: string;
  description: string;
  full_name: string;
  html_url: string;
  language: string;
  name: string;
  owner: string;
  stargazers_count: number;
}

export const DashboardRepositoryContext = createContext<DashboardRepoContextType>({
  hash: null,
  hasHash: false,
  loading: true,
  repositories: [],
  dataFromHash: [],
  setLoading: () => {},
  addRepository: () => {},
  removeRepository: () => {},
  reviewHash: () => {},
});

export const DashboardRepositoryProvider: FC<DashboardRepositoryProviderProps> = ({children}) => {
  const [hash, setHash] = useState<string | null>(null);
  const [hasHash, setHasHash] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [repositories, setRepositories] = useState<DashboardRepositories[]>([]);
  const dataFromHash = useMemo(() => {
    return decodeHash(hash);
  }, [hash]);
  const { getRepositories } = useRepository();

  useEffect(() => {
    setHasHash(!!window.location.hash);
    setHash(window.location.hash);
    setLoading(false);
  }, []);

  const updateHasByNewRepo = (repository: DashboardRepositories) => {
    if(!hash){
      const new_hash = `#${repository.owner}/${repository.name}`;
      window.location.href = new_hash;
      setHash(new_hash);
    }else{
      const new_hash = `${hash}&${repository.owner}/${repository.name}`;
      window.location.href = new_hash;
      setHash(new_hash);
    }
  }

  const addRepository = (repository: DashboardRepositories) => {
    updateHasByNewRepo(repository);
    if(repositories.filter((repo) => repo.full_name === repository.full_name).length == 0){
      setRepositories([...repositories, repository]);
    }
  };

  const removeRepository = (repository: DashboardRepositories) => {
    setRepositories(repositories.filter((repo) => repo.full_name !== repository.full_name));
  };

  const reviewHash = () => {
    setHasHash(!!window.location.hash);
    setHash(window.location.hash);
  }

  const updateRepositoriesByCurrentHash = useCallback(() => {
    
  }, [])

  useEffect(() => {
    if(dataFromHash.length > 0){
      getRepositories(dataFromHash).then((response: any) => {
        setRepositories(response['success']);
      });
    }
  }, [dataFromHash, getRepositories])

  return (
    <DashboardRepositoryContext.Provider
      value={{
        hash,
        loading,
        hasHash,
        repositories,
        dataFromHash,

        setLoading,
        reviewHash,
        addRepository,
        removeRepository,
      }}
    >
      <div>{hash}</div>
      {children}
    </DashboardRepositoryContext.Provider>
  );
}