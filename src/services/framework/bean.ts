export class CategoryRequest {
    frameworkId?: string;
    currentCategory?: string;
    prevCategory?: string;
    selectedCode?: Array<string>;
}
export class FrameworkDetailsRequest {
    frameworkId?: string;
    refreshFrameworkDetails?: boolean = false;
    defaultFrameworkDetails: boolean = false;
}