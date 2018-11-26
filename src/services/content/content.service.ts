import { Injectable } from "@angular/core";

import {
  ContentDetailRequest,
  ContentImportRequest,
  ContentSearchCriteria,
  ContentFilterCriteria,
  ChildContentRequest,
  ContentDeleteRequest,
  ContentExportRequest,
  DownloadAction,
  FlagContentRequest,
  ContentFeedback,
  ContentCache,
  SummarizerContentFilterCriteria,
  ContentMarkerRequest
} from "./bean";
import { ServiceProvider } from "../factory";

@Injectable()
export class ContentService {

  contentMap: Map<string, ContentCache> = new Map();

  constructor(private factory: ServiceProvider) {
  }

  getContentDetail(request: ContentDetailRequest) {
    return new Promise((resolve, reject) => {
      this.factory.getContentService().getContentDetail(JSON.stringify(request), (success) => {
        resolve(success);
      }, (error) => {
        reject(error);
      });
    })
  }

  importContent(request: ContentImportRequest) {
    return new Promise((resolve, reject) => {
      this.factory.getContentService().importContent(JSON.stringify(request), (success) => {
        resolve(success);
      }, (error) => {
        reject(error);
      });
    })
  }

  searchContent(request: ContentSearchCriteria,
    isFilterApplied: boolean,
    isDialCodeSearch: boolean,
    isGuestUser: boolean) {
    return new Promise((resolve, reject) => {
      this.factory.getContentService().searchContent(JSON.stringify(request), isFilterApplied, isDialCodeSearch, isGuestUser, (success) => {
        resolve(success);
      }, (error) => {
        reject(error);
      });
    })
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
            // result.forEach(element => {
            //   let cacheContent = new ContentCache();
            //   cacheContent.name = element.contentData.name;
            //   cacheContent.lastUsedTime = element.lastUsedTime;
            //   cacheContent.identifier = element.identifier;
            //   this.contentMap.set(element.identifier, cacheContent);
            // });
            resolve(result);
          } else {
            reject();
          }
        }, err => {
          reject(err);
        });
    });
  }

  getChildContents(request: ChildContentRequest) {
    return new Promise((resolve, reject) => {
      this.factory.getContentService().getChildContents(JSON.stringify(request), (success) => {
        resolve(success);
      }, (error) => {
        reject(error);
      });
    });
  }

  deleteContent(request: ContentDeleteRequest) {
    return new Promise((resolve, reject) => {
      this.factory.getContentService().deleteContent(JSON.stringify(request), (success) => {
        resolve(success);
      }, (error) => {
        reject(error);
      });
    })
  }

  flagContent(request: FlagContentRequest) {
    return new Promise((resolve, reject) => {
      this.factory.getContentService().flagContent(JSON.stringify(request), (success) => {
        resolve(success);
      }, (error) => {
        reject(error);
      });
    })
  }

  sendFeedback(request: ContentFeedback) {
    return new Promise((resolve, reject) => {
      this.factory.getContentService().sendFeedback(JSON.stringify(request), (success) => {
        resolve(success);
      }, (error) => {
        reject(error);
      });
    })
  }

  getImportStatus(request: Array<string>) {
    return new Promise((resolve, reject) => {
      this.factory.getContentService().getImportStatus(JSON.stringify(request), (success) => {
        resolve(success);
      }, (error) => {
        reject(error);
      });
    })
  }

  cancelDownload(request: string) {
    return new Promise((resolve, reject) => {
      this.factory.getContentService().cancelDownload(JSON.stringify(request), (success) => {
        resolve(success);
      }, (error) => {
        reject(error);
      });
    })
  }

  exportContent(request: ContentExportRequest) {
    return new Promise((resolve, reject) => {
      this.factory.getContentService().exportContent(JSON.stringify(request), (success) => {
        resolve(success);
      }, (error) => {
        reject(error);
      });
    })
  }

  setDownloadAction(request: DownloadAction) {
    return new Promise((resolve, reject) => {
      this.factory.getContentService().setDownloadAction(JSON.stringify(request), (success) => {
        resolve(success);
      }, (error) => {
        reject(error);
      });
    })
  }

  getDownloadState() {
    return new Promise((resolve, reject) => {
      this.factory.getContentService().getDownloadState((success) => {
        resolve(success);
      }, (error) => {
        reject(error);
      });
    })
  }

  getSearchCriteriaFromRequest(request: string) {
    return new Promise((resolve, reject) => {
      this.factory.getContentService().getSearchCriteriaFromRequest(request, (success) => {
        resolve(success);
      }, (error) => {
        reject(error);
      })
    });
  }

  getLocalContents(request: SummarizerContentFilterCriteria) {

    return new Promise<any>((resolve, reject) => {
      this.factory.getContentService().getLocalContents(
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

  setContentMarker(request: ContentMarkerRequest) {
    return new Promise((resolve, reject) => {
      this.factory.getContentService().setContentMarker(JSON.stringify(request),
        (success) => {
          resolve(success);
        }, (error) => {
          reject(error);
        });
    });
  }

}
