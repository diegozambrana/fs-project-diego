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
  predictions: [],
  filteredPredictions: [],
  loadingSeries: true,
  segmentFilter: 'all',
  setSegmentFilter: () => {},
  setLoading: () => {},
  addRepository: () => {},
  removeRepository: () => {},
  clean: () => {},
  toggleVisibility: () => {},
});

export const DashboardRepositoryProvider: FC<DashboardRepositoryProviderProps> = ({children}) => {
  const [hash, setHash] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [repositories, setRepositories] = useState<DashboardRepositoryType[]>([]);
  const [segmentFilter, setSegmentFilter] = useState<string>('all')
  const dataFromHash = useMemo(() => {
    return decodeHash(hash);
  }, [hash]);
  const [loadingSeries, setLoadingSeries] = useState<boolean>(false);
  const [series, setSeries] = useState<SerieType[]>([]);
  const [predictions, setPredictions] = useState<SerieType[]>([]);

  const filteredPredictions = useMemo(() => {
    const full_name_repositories = repositories.filter((repo) => repo.visible).map((repo) => repo.full_name);
    return predictions.filter((prediction) => full_name_repositories.includes(prediction.name));
  }, [predictions, repositories]);
  const filteredSeries = useMemo(() => {
    const full_name_repositories = repositories.filter((repo) => repo.visible).map((repo) => repo.full_name);
    let filtered_data = series.filter((serie) => full_name_repositories.includes(serie.name));
    if(segmentFilter !== 'all'){
      filtered_data = filtered_data.map((serie) => ({...serie, data: serie.data.slice(-parseInt(segmentFilter))}))
    }
    return filtered_data;
  }, [series, repositories, segmentFilter]);
  
  const { getRepositories } = useRepository();
  const { getRepositoryStarHistory } = useRepositoryStarHistory();
  const count = useRef(0);

  useEffect(() => {
    setHash(window.location.hash);
    if(!window.location.hash){
      setLoading(false);
    }
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
      const new_repo = {...repository, visible: true};
      getRepositoryHistory(new_repo);
      setRepositories([...repositories, new_repo]);
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

  const getRepositoryHistory = async (repository: DashboardRepositoryType) => {
    setLoadingSeries(true);
    const response = await getRepositoryStarHistory(repository.owner, repository.name);
    if(response.data.length !== 0){
      setSeries((prev) => {
        const new_series = prev.filter((serie) => serie.name !== repository.full_name);
        return [...new_series, {name: repository.full_name, data: response.data}];
      });
      setPredictions((prev) => {
        const new_predictions = prev.filter((serie) => serie.name !== repository.full_name);
        return [...new_predictions, {name: repository.full_name, data: response.forecast}];
      });
      setLoadingSeries(false);
    }
  }

  useEffect(() => {
    // run to get repositories from hash when the page is loaded
    if(dataFromHash.length > 0 && repositories.length === 0){
      getRepositories(dataFromHash).then((response: any) => {
        setRepositories(
          response['success'].map((d: any) => ({...d, visible: true}))
        );
        if(loading){
          setLoading(false);
        }
      });
    }
  }, [dataFromHash, getRepositories, repositories]);

  const getFirstCallRepositoryStarHistory = async () => {
    repositories.forEach( async (repo) => {
      const response = await getRepositoryStarHistory(repo.owner, repo.name);
      if(response.data.length !== 0){
        setSeries((prev) => {
          const new_series = prev.filter((serie) => serie.name !== repo.full_name);
          return [...new_series, {name: repo.full_name, data: response.data}];
        });
        setPredictions((prev) => {
          const new_series = prev.filter((serie) => serie.name !== repo.full_name);
          return [...new_series, {name: repo.full_name, data: response.forecast}];
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
  }, [repositories, getFirstCallRepositoryStarHistory, loadingSeries, series])

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
        loadingSeries,
        series,
        filteredSeries,
        predictions,
        filteredPredictions,
        segmentFilter,
        setSegmentFilter,
        setLoading,
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