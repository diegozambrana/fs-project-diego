'use client';
import { useRepository } from "@/hooks/api/useRepository";
import { dataToHash, decodeHash } from "@/utils/decoder";
import React, {
  FC,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import {
  DashboardRepoContextType,
  DashboardRepositoryType,
  DashboardRepositoryProviderProps,
  SerieType
} from "./DashboardTypes";
import { useRepositoryStarHistory } from "@/hooks/api/useStarData";

export const DashboardRepositoryContext = createContext<DashboardRepoContextType>({
  hash: null,
  loading: true,
  repositories: [],
  dataFromHash: [],
  series: [],
  filteredSeries: [],
  loadingSeries: true,
  setLoading: () => {},
  addRepository: () => {},
  removeRepository: () => {},
  reviewHash: () => {},
  clean: () => {},
  toggleVisibility: () => {},
});

export const DashboardRepositoryProvider: FC<DashboardRepositoryProviderProps> = ({children}) => {
  const [hash, setHash] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [repositories, setRepositories] = useState<DashboardRepositoryType[]>([]);
  const dataFromHash = useMemo(() => {
    return decodeHash(hash);
  }, [hash]);
  const [loadingSeries, setLoadingSeries] = useState<boolean>(false);
  const [series, setSeries] = useState<SerieType[]>([]);
  const filteredSeries = useMemo(() => {
    const full_name_repositories = repositories.filter((repo) => repo.visible).map((repo) => repo.full_name);
    return series.filter((serie) => full_name_repositories.includes(serie.name));
  }, [series, repositories]);
  const { getRepositories } = useRepository();
  const { getRepositoryStarHistory } = useRepositoryStarHistory();
  const count = useRef(0);

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
      setRepositories([...repositories, {...repository, visible: true}]);
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

  const getFirstCallRepositoryStarHistory = async () => {
    repositories.forEach( async (repo) => {
      const response = await getRepositoryStarHistory(repo.owner, repo.name);
      if(response.length !== 0){
        setSeries((prev) => {
          const new_series = prev.filter((serie) => serie.name !== repo.full_name);
          return [...new_series, {name: repo.full_name, data: response}];
        });
      }
      count.current += 1;
      if(count.current >= repositories.length){
        setLoadingSeries(false);
      }
    });
  };

  useEffect(() => {
    if(
      repositories.length > 0
      && !loadingSeries
      && series.length === 0
      && repositories.length !== series.length
    ){
      getFirstCallRepositoryStarHistory();
    }
  }, [repositories, getRepositoryStarHistory, loadingSeries, series])

  const clean = useCallback(() => {
    // Clean all repositories and remove hash
    setHash("");
    setRepositories([]);
    setSeries([]);
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
        series,
        loadingSeries,
        filteredSeries,
        setLoading,
        reviewHash,
        addRepository,
        removeRepository,
        clean,
        toggleVisibility
      }}
    >
      {children}
    </DashboardRepositoryContext.Provider>
  );
}