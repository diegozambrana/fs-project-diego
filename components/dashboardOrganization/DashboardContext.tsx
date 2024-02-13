'use client';
import { useRepository } from "@/hooks/api/useRepository";
import { dataToHashOrg, decodeHashOrg } from "@/utils/decoder";
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
  DashboardOrganizationType,
  DashboardOrganizationProviderProps,
  SerieType
} from "./DashboardTypes";
import { useRepositoryStarHistory } from "@/hooks/api/useStarData";
import { useOrganization } from "@/hooks/api/useOrganization";

export const DashboardOrganizationContext = createContext<DashboardRepoContextType>({
  hash: null,
  loading: true,
  organizations: [],
  dataFromHash: [],
  series: [],
  filteredSeries: [],
  loadingSeries: true,
  setLoading: () => {},
  addOrganization: () => {},
  removeOrganization: () => {},
  reviewHash: () => {},
  clean: () => {},
  toggleVisibility: () => {},
});

export const DashboardOrganizationProvider: FC<DashboardOrganizationProviderProps> = ({children}) => {
  const [hash, setHash] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [organizations, setOrganizations] = useState<DashboardOrganizationType[]>([]);
  const dataFromHash = useMemo(() => {
    return decodeHashOrg(hash);
  }, [hash]);
  const [loadingSeries, setLoadingSeries] = useState<boolean>(false);
  const [series, setSeries] = useState<SerieType[]>([]);
  const filteredSeries = useMemo(() => {
    const full_name_repositories = organizations.filter((org) => org.visible).map((org) => org.name);
    return series.filter((serie) => full_name_repositories.includes(serie.name));
  }, [series, organizations]);
  // const { getRepositories } = useRepository();
  const { getOrganizations } = useOrganization();
  const { getRepositoryStarHistory } = useRepositoryStarHistory();
  const count = useRef(0);

  useEffect(() => {
    setHash(window.location.hash);
    setLoading(false);
  }, []);

  const updateHasByNewRepo = (organization: DashboardOrganizationType) => {
    if(!hash){
      const new_hash = `#${organization}`;
      window.location.href = new_hash;
      setHash(new_hash);
    }else{
      const new_hash = `${hash}&${organization.name}`;
      window.location.href = new_hash;
      setHash(new_hash);
    }
  }

  const addOrganization = (organization: DashboardOrganizationType) => {
    updateHasByNewRepo(organization);
    if(organizations.filter((org) => org.name === organization.name).length == 0){
      const new_org = {...organization, visible: true};
      // getRepositoryHistory(new_org);
      setOrganizations([...organizations, new_org]);
    }
  };

  const removeOrganization = (organization: DashboardOrganizationType) => {
    const data = dataFromHash.filter((orgName) => (
      orgName.toLowerCase() !== organization.name.toLowerCase()
    ));
    if(data.length === 0){
      clean();
      return
    }
    const new_hash = dataToHashOrg(data);
    window.location.hash = new_hash;
    setHash(new_hash);
    setOrganizations(organizations.filter((org) => org.name !== organization.name));
  };

  const reviewHash = () => {
    setHash(window.location.hash);
  }

  // const getRepositoryHistory = async (repository: DashboardOrganizationType) => {
  //   setLoadingSeries(true);
  //   const response = await getRepositoryStarHistory(repository.owner, repository.name);
  //   if(response.length !== 0){
  //     setSeries((prev) => {
  //       const new_series = prev.filter((serie) => serie.name !== repository.full_name);
  //       return [...new_series, {name: repository.full_name, data: response}];
  //     });
  //     setLoadingSeries(false);
  //   }
  // }

  useEffect(() => {
    // run to get organizations from hash when the page is loaded
    if(dataFromHash.length > 0 && organizations.length === 0){
      getOrganizations(dataFromHash).then((response: any) => {
        setOrganizations(
          response['success'].map((d: any) => ({...d, visible: true}))
        );
      });
    }
  }, [dataFromHash, getOrganizations, organizations]);

  // const getFirstCallRepositoryStarHistory = async () => {
  //   organizations.forEach( async (repo) => {
  //     const response = await getRepositoryStarHistory(repo.owner, repo.name);
  //     if(response.length !== 0){
  //       setSeries((prev) => {
  //         const new_series = prev.filter((serie) => serie.name !== repo.full_name);
  //         return [...new_series, {name: repo.full_name, data: response}];
  //       });
  //     }
  //     count.current += 1;
  //     if(count.current >= organizations.length){
  //       setLoadingSeries(false);
  //     }
  //   });
  // };

  useEffect(() => {
    if(
      organizations.length > 0
      && !loadingSeries
      && series.length === 0
      && organizations.length !== series.length
    ){
      // getFirstCallRepositoryStarHistory();
    }
  }, [organizations, getRepositoryStarHistory, loadingSeries, series])

  const clean = useCallback(() => {
    // Clean all organizations and remove hash
    setHash("");
    setOrganizations([]);
    setSeries([]);
    window.location.hash = "";
  }, []);

  const toggleVisibility = (organization: DashboardOrganizationType) => {
    const new_repositories = organizations.map((org) => {
      if(org.name === organization.name){
        return {...org, visible: !org.visible}
      }
      return org;
    });
    setOrganizations(new_repositories);
  };

  return (
    <DashboardOrganizationContext.Provider
      value={{
        hash,
        loading,
        organizations,
        dataFromHash,
        series,
        loadingSeries,
        filteredSeries,
        setLoading,
        reviewHash,
        addOrganization,
        removeOrganization,
        clean,
        toggleVisibility
      }}
    >
      {children}
    </DashboardOrganizationContext.Provider>
  );
}