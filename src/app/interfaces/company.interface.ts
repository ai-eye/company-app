export interface ICompanySearchResponse {
    page_number?: number;
    kind?: string;
    total_results?: number;
    items: ICompany[];
}

export interface ICompany {
    company_status?: string;
    address_snippet?: string;
    date_of_creation?: string;
    matches?: {
        title?: number[];
    };
    description: string;
    links?: {
        self?: string;
    };
    company_number: string;
    title?: string;
    company_type?: string;
    address?: {
        premises?: string;
        postal_code?: string;
        country?: string;
        locality?: string;
        address_line_1?: string;
    };
    kind?: string;
    description_identifier?: string[];
}