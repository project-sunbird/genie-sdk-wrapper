import { CorrelationData } from '../telemetry/bean';

export class ContentDetailRequest {
  contentId: string;
  attachFeedback?: boolean = false;
  attachContentAccess?: boolean = false;
  refreshContentDetails?: boolean = false;
}

export class ContentListingCriteria {
  contentListingId: string;
  uid: string;
  language: string;
  subject: string;
  age: number;
  grade: number;
  medium: string;
  board: string;
  did: string;
  audience: Array<string>;
  channel: Array<string>;
  facets: Array<string>;
}

export class FilterValue {
  name: string;
  count: number;
  apply: boolean;
  translations: string;
}

export class ContentSearchFilter {
  name: string;
  values: Array<FilterValue>;
}

export enum SearchType {
  SEARCH = 'search',
  FILTER = 'filter',
}

export class ContentSearchCriteria {
  query?: string;
  exists?: Array<string>;
  offset?: number;
  limit?: number;
  mode?: string;
  age?: number;
  grade?: Array<string>;
  medium?: Array<string>;
  board?: Array<string>;
  createdBy?: Array<string>;
  audience?: Array<string>;
  channel?: Array<string>;
  pragma?: Array<string>;
  exclPragma?: Array<string>;
  contentStatusArray?: Array<string>;
  facets?: Array<string>;
  contentTypes?: Array<string>;
  keywords?: Array<string>;
  dialCodes?: Array<string>;
  language?: Array<string>;
  facetFilters?: Array<ContentSearchFilter>;
  impliedFilters?: Array<ContentSearchFilter>;
  sortCriteria?: Array<ContentSortCriteria>;
  // 1 - indicates search, 2 - filter
  searchType?: SearchType;
  offlineSearch?: boolean;
  framework?: string;
  languageCode?: string;
}

export class ContentImport {
  isChildContent: boolean;
  destinationFolder: string;
  contentId: string;
  correlationData: Array<CorrelationData>;
}

export class ContentImportRequest {
  contentImportMap: { [index: string]: ContentImport };
  contentStatusArray?: Array<string>;
}

export class ContentSortCriteria {
  sortAttribute: string;
  sortOrder: SortOrder;
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class ContentFilterCriteria {
  uid?: string;
  contentTypes?: string[];
  audience?: string[];
  pragma?: string[];
  attachFeedback?: boolean;
  attachContentAccess?: boolean;
  sortCriteria?: Array<ContentSortCriteria>;
  recentlyViewed?: boolean;
  downloadedOnly?: boolean;
}

export class HierarchyInfo {
  identifier: string;
  contentType: string;
}

export class ChildContentRequest {
  contentId: string;
  hierarchyInfo?: Array<HierarchyInfo>;
  level?: number;
}

export class ContentDeleteRequest {
  contentDeleteList: Array<ContentDelete>;
}

export class ContentDelete {
  contentId: string;
  isChildContent: boolean
}

export class FlagContentRequest {
  contentId: string;
  flagReasons: Array<string>;
  flaggedBy: string;
  versionKey: string;
  flags: Array<string>;
}

export class ContentFeedback {
  contentId: string;
  rating: number;
  comments?: string;
  contentVersion: string;
}

export class ContentExportRequest {
  contentIds?: Array<string>;
  destinationFolder: string;
}

export enum DownloadAction {
  RESUME = 0,
  PAUSE = 1,
}

export class ContentCache {
  lastUsedTime: number;
  name: string;
  identifier: string;
}

export class SummarizerContentFilterCriteria {
  uids?: string[];
  contentTypes?: string[]
  attachFeedback?: boolean;
  attachContentAccess?: boolean;
  sortCriteria?: Array<ContentSortCriteria>;
}

export class ContentMarkerRequest {
  contentId: string;
  uid: string;
  data: string;
  extraInfoMap?: { [index: string]: any };
  marker: number;
  isMarked?: boolean;
}

export enum MarkerType {
  NOTHING = 0,
  PREVIEWED = 1,
  BOOKMARKED = 2
}
