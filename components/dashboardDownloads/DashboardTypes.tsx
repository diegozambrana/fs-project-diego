export interface DashboardPackageResponseType {
    name: string;
    html_url: string;
    visible: boolean;
    data: {count: number, date: string}[];
    forecast: {count: number, date: string}[];
}

export interface DashboardPackageType {
    name: string;
    html_url: string;
    visible: boolean;
}

export interface DashboardPackageContextType {
    hash: string | null;
    loading: boolean;
    packages: DashboardPackageType[];
    dataFromHash: string[];
    series: SerieType[];
    filteredSeries: SerieType[];
    predictions: SerieType[];
    filteredPredictions: SerieType[];
    loadingSeries: boolean;
  
    setLoading: (loading: boolean) => void;
    addPackage: (packageItem: DashboardPackageResponseType) => void;
    removePackage: (packageItem: DashboardPackageType) => void;
    clean: () => void;
    toggleVisibility: (packageItem: DashboardPackageType) => void;
}

export interface DashboardPackagesProviderProps {
    children: React.ReactNode;
}

export interface SerieType {
    name: string;
    data: {count: number, date: string}[];
}