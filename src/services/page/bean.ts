export class PageAssembleFilter {
    topic?: Array<string>;
    purpose?: Array<string>;
    channel?: Array<string>;
    subject?: Array<string>;
    board?: Array<string>;
    domain?: Array<string>;
    medium?: Array<string>;
    gradeLevel?: Array<string>;
    language?: Array<string>;
    concepts?: Array<string>;
    contentType?: Array<string>;
    ageGroup?: Array<string>;
    ownership?: Array<string>;
    dialcodes?: string;
}


export class PageAssembleCriteria {
    name: string;
    source?: string;
    mode?: string;
    filters?: PageAssembleFilter;
}