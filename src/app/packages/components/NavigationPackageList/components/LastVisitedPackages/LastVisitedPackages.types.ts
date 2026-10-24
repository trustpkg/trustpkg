export interface LastVisitedPackage {
    name?: string;
    ecosystem?: string;
    url: string;
    date?: string;
};

export interface LastVisitedPackagesProps {
    name?: string;
    ecosystem?: string;
    url: string;
    date?: string;
    fallback?: React.ReactNode;
};
