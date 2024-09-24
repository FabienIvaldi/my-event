export interface Event {
    title_fr: string;
    firstdate_begin: string;
    location_region: string | null;
    location_department: string | null;
    image: string | null;
    slug: string;
    longdescription_fr: string;
    location_name: string;
    location_address: string;
    location_city: string;
    location_postalcode: string;
    location_countrycode: string;
}

export interface EventsResponse {
    total_count: number;
    results: Event[];
}
