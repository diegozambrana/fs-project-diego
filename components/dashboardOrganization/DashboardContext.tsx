'use client';
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
import { useStarDataOrg } from "@/hooks/api/useStarDataOrg";
import { useOrganization } from "@/hooks/api/useOrganization";

export const DashboardOrganizationContext = createContext<DashboardRepoContextType>({
  hash: null,
  loading: true,
  organizations: [],
  dataFromHash: [],
  series: [],
  filteredSeries: [],
  predictions: [],
  filteredPredictions: [],
  loadingSeries: true,
  segmentFilter: 'all',
  setSegmentFilter: () => {},
  setLoading: () => {},
  addOrganization: () => {},
  removeOrganization: () => {},
  clean: () => {},
  toggleVisibility: () => {},
});

export const DashboardOrganizationProvider: FC<DashboardOrganizationProviderProps> = ({children}) => {
  const [hash, setHash] = useState<string | null>(null);
  const [segmentFilter, setSegmentFilter] = useState<string>('all')
  const [loading, setLoading] = useState<boolean>(true);
  const [organizations, setOrganizations] = useState<DashboardOrganizationType[]>([]);
  const dataFromHash = useMemo(() => {
    return decodeHashOrg(hash);
  }, [hash]);
  const [loadingSeries, setLoadingSeries] = useState<boolean>(false);
  const [series, setSeries] = useState<SerieType[]>([]);
  const [predictions, setPredictions] = useState<SerieType[]>([]);
  const filteredPredictions = useMemo(() => {
    const full_name_repositories = organizations.filter((org) => org.visible).map((org) => org.login);
    return predictions.filter((prediction) => full_name_repositories.includes(prediction.name));
  }, [predictions, organizations]);
  const filteredSeries = useMemo(() => {
    const full_name_repositories = organizations.filter((org) => org.visible).map((org) => org.login);
    let filtered_data = series.filter((serie) => full_name_repositories.includes(serie.name))
    if(segmentFilter !== 'all'){
      filtered_data = filtered_data.map((serie) => ({...serie, data: serie.data.slice(-parseInt(segmentFilter))}))
    }
    return filtered_data;
  }, [series, organizations, segmentFilter]);

  const { getOrganizations } = useOrganization();
  const { getOrganizationStarHistory } = useStarDataOrg();
  const count = useRef(0);

  useEffect(() => {
    setHash(window.location.hash);
    if(!window.location.hash){
      setLoading(false);
    }
  }, []);

  const updateHasByNewOrg = (organization: DashboardOrganizationType) => {
    if(!hash){
      const new_hash = `#${organization.login}`;
      window.location.href = new_hash;
      setHash(new_hash);
    }else{
      const new_hash = `${hash}&${organization.login}`;
      window.location.href = new_hash;
      setHash(new_hash);
    }
  }

  const addOrganization = (organization: DashboardOrganizationType) => {
    updateHasByNewOrg(organization);
    if(organizations.filter((org) => org.login === organization.login).length == 0){
      const new_org = {...organization, visible: true};
      getOrganizationHistory(new_org);
      setOrganizations([...organizations, new_org]);
    }
  };

  const removeOrganization = (organization: DashboardOrganizationType) => {
    const data = dataFromHash.filter((orgName) => (
      orgName.toLowerCase() !== organization.login.toLowerCase()
    ));

    if(data.length === 0){
      clean();
      return
    }
    const new_hash = dataToHashOrg(data);
    window.location.hash = new_hash;
    setHash(new_hash);
    setOrganizations(organizations.filter((org) => org.login !== organization.login));
  };

  const getOrganizationHistory = async (organization: DashboardOrganizationType) => {
    setLoadingSeries(true);
    const response = await getOrganizationStarHistory(organization.login);
    if(response.data.length !== 0){
      setSeries((prev) => {
        const new_series: SerieType[] = prev.filter((serie) => serie.name !== organization.login);
        return [...new_series, {name: organization.login, data: response.data}];
      });
      setPredictions((prev) => {
        const new_predictions = prev.filter((serie) => serie.name !== organization.login);
        return [...new_predictions, {name: organization.login, data: response.forecast}];
      });
      setLoadingSeries(false);
    }
  }

  useEffect(() => {
    // run to get organizations from hash when the page is loaded
    if(dataFromHash.length > 0 && organizations.length === 0){
      getOrganizations(dataFromHash).then((response: any) => {
        setOrganizations(
          response['success'].map((d: any) => ({...d, visible: true}))
        );
        if(loading){
          setLoading(false);
        }
      });
    }
  }, [dataFromHash, getOrganizations, organizations]);

  const getFirstCallOrganizationStarHistory = async () => {
    organizations.forEach( async (org) => {
      const response = await getOrganizationStarHistory(org.login);
      if(response.data.length !== 0){
        setSeries((prev) => {
          const new_series = prev.filter((serie) => serie.name !== org.login);
          return [...new_series, {name: org.login, data: response.data}];
        });
        setPredictions((prev) => {
          const new_series = prev.filter((serie) => serie.name !== org.login);
          return [...new_series, {name: org.login, data: response.forecast}];
        });
      }
      count.current += 1;
      if(count.current >= organizations.length){
        setLoadingSeries(false);
      }
    });
  };

  useEffect(() => {
    // call the first time to get the list of organizations data
    if(
      organizations.length > 0
      && !loadingSeries
      && series.length === 0
      && organizations.length !== series.length
    ){
      getFirstCallOrganizationStarHistory();
    }
  }, [organizations, getFirstCallOrganizationStarHistory, loadingSeries, series])

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
        loadingSeries,
        series,
        filteredSeries,
        predictions,
        filteredPredictions,
        segmentFilter,
        setSegmentFilter,
        setLoading,
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