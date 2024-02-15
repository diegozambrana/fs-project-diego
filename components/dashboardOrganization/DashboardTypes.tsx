export interface DashboardOrganizationType {
    login: string,
    name: string,
    avatar_url: string,
    html_url: string,
    description: string,
    created_at: string,
    public_repos: number
    visible: boolean;
}

export interface DashboardRepoContextType {
    hash: string | null;
    loading: boolean;
    organizations: DashboardOrganizationType[];
    dataFromHash: string[];
    series: SerieType[];
    filteredSeries: SerieType[];
    predictions: SerieType[];
    filteredPredictions: SerieType[];
    loadingSeries: boolean;
    segmentFilter: string;
    setSegmentFilter: (s: string) => void;
  
    setLoading: (loading: boolean) => void;
    addOrganization: (organization: DashboardOrganizationType) => void;
    removeOrganization: (organization: DashboardOrganizationType) => void;
    clean: () => void;
    toggleVisibility: (organization: DashboardOrganizationType) => void;
}

export interface DashboardOrganizationProviderProps {
    children: React.ReactNode;
}

export interface SerieType {
    name: string;
    data: {count: number, date: string}[];
}