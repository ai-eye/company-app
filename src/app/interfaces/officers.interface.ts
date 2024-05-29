export interface IOfficer {
    address: {
        premises: string;
        postal_code: string;
        country: string;
        locality: string;
        address_line_1: string;
    };
    name: string;
    appointed_on: string;
    officer_role: string;
    links: {
        officer: {
            appointments: string;
        };
    };
    date_of_birth: {
        month: number;
        year: number;
    };
    occupation: string;
    country_of_residence: string;
    nationality: string;
}

export interface IOfficersResponse {
    etag: string;
    items_per_page: number;
    total_results: number;
    start_index: number;
    items: IOfficer[];
}