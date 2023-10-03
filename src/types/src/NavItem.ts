export type NavItem = {
    label: string;
    url?: string;
    redirect?: string;
    icon?: string;
    schemaApi?: string;
    link?: string;
    schemaId?: string;
    schema?: {
        type: string;
        title: string;
        body: string;
    };
    children?: NavItem[];
};

