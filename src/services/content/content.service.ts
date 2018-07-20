import { Injectable } from "@angular/core";

import {
  ContentDetailRequest, ContentImportRequest, ContentSearchCriteria, ContentFilterCriteria, ChildContentRequest, ContentDeleteRequest,
  ContentExportRequest, DownloadAction, FlagContentRequest, ContentFeedback, ContentCache
} from "./bean";
import { ServiceProvider } from "../factory";

@Injectable()
export class ContentService {

  contentMap: Map<string, ContentCache> = new Map();

  constructor(private factory: ServiceProvider) {
  }

  getContentDetail(request: ContentDetailRequest,
    successCallback: (response: string) => void,
    errorCallback: (error: string) => void) {
    try {
      this.factory.getContentService().getContentDetail(JSON.stringify(request), successCallback, errorCallback);
    } catch (error) {
      console.log(error);
    }
  }

  importContent(request: ContentImportRequest,
    successCallback: (response: string) => void,
    errorCallback: (error: string) => void) {
    try {
      this.factory.getContentService().importContent(JSON.stringify(request), successCallback, errorCallback);
    } catch (error) {
      console.log(error);
    }
  }

  searchContent(request: ContentSearchCriteria,
    isFilterApplied: boolean,
    isDialCodeSearch: boolean ,
    isGuestUser: boolean,
    successCallback: (response: string) => void,
    errorCallback: (error: string) => void) {
    try {
      this.factory.getContentService().searchContent(JSON.stringify(request), isFilterApplied, isDialCodeSearch , isGuestUser, successCallback, errorCallback);
    } catch (error) {
      console.log(error);
    }
  }

  getContentMap(): Map<string, any> {
    return this.contentMap;
  }

  getAllLocalContents(request: ContentFilterCriteria) {

      return new Promise<any>((resolve, reject) => {
        this.factory.getContentService().getAllLocalContents(
          JSON.stringify(request), 
          res => {
            let data = JSON.parse(res);
            let result = data.result;
            if (result) {
              result.forEach(element => {
                let cacheContent = new ContentCache();
                cacheContent.name = element.contentData.name;
                cacheContent.lastUsedTime = element.lastUsedTime;
                cacheContent.identifier = element.identifier;
                this.contentMap.set(element.identifier, cacheContent);
              });
              resolve(result);
            } else {
              reject();
            }
          }, err => {
            reject(err);
          });
      });
  }

  getChildContents(request: ChildContentRequest,
    successCallback: (response: string) => void,
    errorCallback: (response: string) => void) {
    try {
      this.factory.getContentService().getChildContents(JSON.stringify(request), successCallback, errorCallback);
    } catch (error) {
      console.log(error);
    }
  }

  deleteContent(request: ContentDeleteRequest,
    successCallback: (response: string) => void,
    errorCallback: (response: string) => void) {
    try {
      this.factory.getContentService().deleteContent(JSON.stringify(request), successCallback, errorCallback);
    } catch (error) {
      console.log(error);
    }
  }

  flagContent(request: FlagContentRequest,
    successCallback: (response: string) => void,
    errorCallback: (response: string) => void) {
    try {
      this.factory.getContentService().flagContent(JSON.stringify(request), successCallback, errorCallback);
    } catch (error) {
      console.log(error);
    }
  }

  sendFeedback(request: ContentFeedback,
    successCallback: (response: string) => void,
    errorCallback: (response: string) => void) {
    try {
      this.factory.getContentService().sendFeedback(JSON.stringify(request), successCallback, errorCallback);
    } catch (error) {
      console.log(error);
    }
  }

  getImportStatus(request: Array<string>,
    successCallback: (response: string) => void,
    errorCallback: (response: string) => void) {
    try {
      this.factory.getContentService().getImportStatus(JSON.stringify(request), successCallback, errorCallback);
    } catch (error) {
      console.log(error);
    }
  }

  cancelDownload(request: string,
    successCallback: (response: string) => void,
    errorCallback: (response: string) => void) {
    try {
      this.factory.getContentService().cancelDownload(JSON.stringify(request), successCallback, errorCallback);
    } catch (error) {
      console.log(error);
    }
  }

  exportContent(request: ContentExportRequest,
    successCallback: (response: string) => void,
    errorCallback: (response: string) => void) {
    try {
      this.factory.getContentService().exportContent(JSON.stringify(request), successCallback, errorCallback);
    } catch (error) {
      console.log(error);
    }
  }

  setDownloadAction(request: DownloadAction,
    successCallback: (response: string) => void,
    errorCallback: (response: string) => void) {
    try {
      this.factory.getContentService().setDownloadAction(JSON.stringify(request), successCallback, errorCallback);
    } catch (error) {
      console.log(error);
    }
  }

  getDownloadState(successCallback: (response: string) => void,
    errorCallback: (response: string) => void) {
    try {
      this.factory.getContentService().getDownloadState(successCallback, errorCallback);
    } catch (error) {
      console.log(error);
    }
  }

  getSearchCriteriaFromRequest(request: string,
    successCallback: (response: string) => void,
    errorCallback: (response: string) => void) {
    try {
      this.factory.getContentService().getSearchCriteriaFromRequest(request, successCallback, errorCallback);
    } catch (error) {
      console.log(error);
    }
  }

}
