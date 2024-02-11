'use client';
import { useRepository } from "@/hooks/api/useRepository";
import { dataToHash, decodeHash } from "@/utils/decoder";
import React, {
  FC,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";
import {
  DashboardRepoContextType,
  DashboardRepositoryType,
  DashboardRepositoryProviderProps
} from "./DashboardTypes";

export const DashboardRepositoryContext = createContext<DashboardRepoContextType>({
  hash: null,
  loading: true,
  repositories: [],
  dataFromHash: [],
  setLoading: () => {},
  addRepository: () => {},
  removeRepository: () => {},
  reviewHash: () => {},
  clean: () => {},
  toggleVisibility: () => {}
});

export const DashboardRepositoryProvider: FC<DashboardRepositoryProviderProps> = ({children}) => {
  const [hash, setHash] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [repositories, setRepositories] = useState<DashboardRepositoryType[]>([]);
  const dataFromHash = useMemo(() => {
    console.log('--.', hash)
    return decodeHash(hash);
  }, [hash]);
  const { getRepositories } = useRepository();

  useEffect(() => {
    setHash(window.location.hash);
    setLoading(false);
  }, []);

  const updateHasByNewRepo = (repository: DashboardRepositoryType) => {
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

  const addRepository = (repository: DashboardRepositoryType) => {
    updateHasByNewRepo(repository);
    if(repositories.filter((repo) => repo.full_name === repository.full_name).length == 0){
      setRepositories([...repositories, repository]);
    }
  };

  const removeRepository = (repository: DashboardRepositoryType) => {
    const data = dataFromHash.filter((repo) => (
      repo.name.toLowerCase() !== repository.name.toLowerCase()
      && repo.owner.toLowerCase() !== repository.owner.toLowerCase()
    ));
    if(data.length === 0){
      clean();
      return
    }
    const new_hash = dataToHash(data);
    window.location.hash = new_hash;
    setHash(new_hash);
    setRepositories(repositories.filter((repo) => repo.full_name !== repository.full_name));
  };

  const reviewHash = () => {
    setHash(window.location.hash);
  }

  useEffect(() => {
    if(dataFromHash.length > 0 && repositories.length === 0){
      getRepositories(dataFromHash).then((response: any) => {
        setRepositories(
          response['success'].map((d: any) => ({...d, visible: true}))
        );
      });
    }
  }, [dataFromHash, getRepositories, repositories]);

  const clean = useCallback(() => {
    // Clean all repositories and remove hash
    setHash("");
    setRepositories([]);
    window.location.hash = "";
  }, []);

  const toggleVisibility = (repository: DashboardRepositoryType) => {
    const new_repositories = repositories.map((repo) => {
      if(repo.full_name === repository.full_name){
        return {...repo, visible: !repo.visible}
      }
      return repo;
    });
    setRepositories(new_repositories);
  };

  return (
    <DashboardRepositoryContext.Provider
      value={{
        hash,
        loading,
        repositories,
        dataFromHash,
        setLoading,
        reviewHash,
        addRepository,
        removeRepository,
        clean,
        toggleVisibility
      }}
    >
      <div>{hash}</div>
      {children}
    </DashboardRepositoryContext.Provider>
  );
}