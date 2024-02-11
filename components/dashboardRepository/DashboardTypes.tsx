export interface DashboardRepositoryType {
    avatar_url: string;
    description: string;
    full_name: string;
    html_url: string;
    language: string;
    name: string;
    owner: string;
    stargazers_count: number;
    visible: boolean;
}

export interface DashboardRepoContextType {
    hash: string | null;
    loading: boolean;
    repositories: DashboardRepositoryType[];
    dataFromHash: {
      owner: string;
      name: string;
    }[];
  
    setLoading: (loading: boolean) => void;
    addRepository: (repository: DashboardRepositoryType) => void;
    removeRepository: (repository: DashboardRepositoryType) => void;
    reviewHash: () => void;
    clean: () => void;
    toggleVisibility: (repository: DashboardRepositoryType) => void;
}

export interface DashboardRepositoryProviderProps {
    children: React.ReactNode;
}