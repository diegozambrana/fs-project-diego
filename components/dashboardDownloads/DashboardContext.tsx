'use client';
import { dataToHashOrg, decodeHashOrg } from "@/utils/decoder";
import React, {
  FC,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";
import {
  DashboardPackageContextType,
  DashboardPackageResponseType,
  DashboardPackageType,
  DashboardPackagesProviderProps,
  SerieType
} from "./DashboardTypes";
import { usePackage } from "@/hooks/api/usePackage";

export const DashboardPackagesContext = createContext<DashboardPackageContextType>({
  hash: null,
  loading: true,
  packages: [],
  dataFromHash: [],
  series: [],
  filteredSeries: [],
  predictions: [],
  filteredPredictions: [],
  loadingSeries: true,
  setLoading: () => {},
  addPackage: () => {},
  removePackage: () => {},
  clean: () => {},
  toggleVisibility: () => {},
});

export const DashboardPackagesProvider: FC<DashboardPackagesProviderProps> = ({children}) => {
  const [hash, setHash] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [packages, setPackages] = useState<DashboardPackageType[]>([]);
  const dataFromHash = useMemo(() => {
    return decodeHashOrg(hash);
  }, [hash]);
  const [loadingSeries, setLoadingSeries] = useState<boolean>(false);
  const [series, setSeries] = useState<SerieType[]>([]);
  const [predictions, setPredictions] = useState<SerieType[]>([]);

  const filteredPredictions = useMemo(() => {
    const full_name_packages = packages.filter((pack) => pack.visible).map((pack) => pack.name);
    return predictions.filter((prediction) => full_name_packages.includes(prediction.name));
  }, [predictions, packages]);
  const filteredSeries = useMemo(() => {
    const full_name_packages = packages.filter((pack) => pack.visible).map((pack) => pack.name);
    return series.filter((serie) => full_name_packages.includes(serie.name));
  }, [series, packages]);
  
  const { getPackages } = usePackage();

  useEffect(() => {
    setHash(window.location.hash);
    if(!window.location.hash){
      setLoading(false);
    }
  }, []);

  const updateHasByNewRepo = (package_item: DashboardPackageType) => {
    if(!hash){
      const new_hash = `#${package_item.name}`;
      window.location.href = new_hash;
      setHash(new_hash);
    }else{
      if(hash.toLocaleLowerCase().includes(package_item.name.toLocaleLowerCase())){
        return
      }
      const new_hash = `${hash}&${package_item.name}`;
      window.location.href = new_hash;
      setHash(new_hash);
    }
  };

  const updateANewPackage = (packageItem: DashboardPackageResponseType) => {
    const new_package = {
      name: packageItem.name,
      html_url: `https://pypi.org/project/${packageItem.name}/`,
      visible: true,
    };
    const new_serie: SerieType = {name: new_package.name, data: packageItem.data};
    const new_prediction: SerieType = {name: new_package.name, data: packageItem.forecast};
    setSeries((s) => [...s, new_serie]);
    setPredictions((p) => [...p, new_prediction]);
    setPackages([...packages, new_package]);
  }

  const addPackage = (packageItem: DashboardPackageResponseType) => {
    updateHasByNewRepo(packageItem);
    if(packages.filter((pack) => pack.name === packageItem.name).length == 0){
      updateANewPackage(packageItem);
    }
  };

  const removePackage = (packageItem: DashboardPackageType) => {
    const data = dataFromHash.filter((pack) => (
      pack.toLowerCase() !== packageItem.name.toLowerCase()
    ));

    if(data.length === 0){
      clean();
      return
    }

    const new_hash = dataToHashOrg(data);
    window.location.hash = new_hash;
    setHash(new_hash);
    setPackages(packages.filter((pack) => pack.name !== packageItem.name));

    const new_series = series.filter((serie) => serie.name !== packageItem.name);
    const new_predictions = predictions.filter((serie) => serie.name !== packageItem.name);

    setSeries(new_series);
    setPredictions(new_predictions);
  };

  useEffect(() => {
    if (dataFromHash.length > 0 && packages.length === 0) {
      getPackages(dataFromHash).then((response: any) => {
          const new_packages = response['success'].map((packageItem: DashboardPackageResponseType) => ({
            name: packageItem.name,
            html_url: `https://pypi.org/project/${packageItem.name}/`,
            visible: true,
          }));
          const new_series: SerieType[] = response['success'].map((packageItem: DashboardPackageResponseType) => ({name: packageItem.name, data: packageItem.data}));
          const new_predictions: SerieType[] = response['success'].map((packageItem: DashboardPackageResponseType) => ({name: packageItem.name, data: packageItem.forecast}));
          setSeries(new_series);
          setPredictions(new_predictions);
          setPackages(new_packages);
          if(loading){
            setLoading(false);
          }
      });
    }
  }, [dataFromHash, packages, getPackages])

  const clean = useCallback(() => {
    setHash("");
    setPackages([]);
    setSeries([]);
    setPredictions([]);
    window.location.hash = "";
  }, []);

  const toggleVisibility = (packageItem: DashboardPackageType) => {
    const new_package = packages.map((pack) => {
      if(pack.name === packageItem.name){
        return {...pack, visible: !pack.visible}
      }
      return pack;
    });
    setPackages(new_package);
  };

  return (
    <DashboardPackagesContext.Provider
      value={{
        hash,
        loading,
        packages,
        dataFromHash,
        loadingSeries,
        series,
        filteredSeries,
        predictions,
        filteredPredictions,
        setLoading,
        addPackage,
        removePackage,
        clean,
        toggleVisibility
      }}
    >
      {children}
    </DashboardPackagesContext.Provider>
  );
}