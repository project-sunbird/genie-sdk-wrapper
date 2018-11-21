import { Injectable } from "@angular/core";
import { ServiceProvider } from "../factory";
import {
  FrameworkDetailsRequest,
  CategoryRequest,
  ChannelDetailsRequest,
  Channel
} from "./bean";
import { GenieResponse } from "../service.bean";
import { SharedPreferences } from "../utils/preferences.service";
import { BuildParamService } from "../utils/buildparam.service";

@Injectable()
export class FrameworkService {

  updatedFrameworkResponseBody: any = {};
  currentFrameworkCategories: Array<any> = [];
  currentFrameworkId: string = '';

  constructor(
    private factory: ServiceProvider,
    private preference: SharedPreferences,
    private buildParamService: BuildParamService,
  ) {

  }

  getChannelDetails(request: ChannelDetailsRequest) {
    // Bundled channel path
    request.filePath = 'data/channel/channel-' + request.channelId + '.json';

    return new Promise<GenieResponse<Channel>>((resolve, reject) => {
      this.factory.getFrameworkService().getChannelDetails(JSON.stringify(request), (success) => {
        console.log('getChannelDetails:success ' + success);
        resolve(JSON.parse(success));
      }, (error) => {
        console.log('getChannelDetails:error ' + error);
        reject(JSON.parse(error));
      });
    });
  }

  private async getChannelId() {
    let channelId = await this.preference.getStringWithoutPrefix('channelId');

    if (channelId === undefined || channelId === null || channelId === '') {
      channelId = await this.buildParamService.getBuildConfigParam('CHANNEL_ID');
    }

    return channelId;
  }

  async getFrameworkDetails(request: FrameworkDetailsRequest) {
    if (this.updatedFrameworkResponseBody.result !== undefined &&
      this.updatedFrameworkResponseBody.result.framework.identifier === request.frameworkId) {
      return Promise.resolve(this.currentFrameworkCategories);
    } else {
      if (request.defaultFrameworkDetails) {//for default framework details
        let channelDetailsRequest = new ChannelDetailsRequest();
        channelDetailsRequest.channelId = await this.getChannelId();

        let channelDetailsResponse = await this.getChannelDetails(channelDetailsRequest);

        if (channelDetailsResponse.status && channelDetailsResponse.result
          && channelDetailsResponse.result.defaultFramework) {
          request.frameworkId = channelDetailsResponse.result.defaultFramework;
        }
      }
      request.filePath = 'data/framework/framework-' + request.frameworkId + '.json';

      return new Promise((resolve, reject) => {
        this.factory.getFrameworkService().getFrameworkDetails(JSON.stringify(request),
          frameworkResponse => {
            this.prepareFrameworkData(frameworkResponse);
            this.factory.getFrameworkService().persistFrameworkDetails(
              JSON.stringify(this.updatedFrameworkResponseBody)
            );
            resolve(this.currentFrameworkCategories);
          },
          error => {
            reject(error);
          }
        );
      });
    }
  }

  getCurrentFrameworkId() {
    this.preference.getString("current_framework_id")
    .then(value => {
       return value;
    });
  }

  private prepareFrameworkData(frameworkResponse: string) {
    let responseBody = JSON.parse(frameworkResponse);
    let allCategories: Array<any> = responseBody.result.framework.categories;

    allCategories = allCategories.map((c, index) => {
      return {
        identifier: c.identifier,
        code: c.code,
        name: c.name,
        description: c.description,
        index: c.index,
        status: c.status,
        translations: c.translations,
        terms: c.terms ? c.terms.map(t => {
          return {
            identifier: t.identifier,
            code: t.code,
            name: t.name,
            description: t.description,
            index: t.index,
            category: t.category,
            status: t.status,
            translations: t.translations,
            associations: t.associations ? t.associations.filter(a => {
              return (index >= allCategories.length - 1)
                || (a.category === allCategories[index + 1].code);
            }) : undefined
          }
        }) : undefined
      }
    });

    this.currentFrameworkCategories = allCategories;
    this.updatedFrameworkResponseBody = responseBody;
    this.updatedFrameworkResponseBody.result.framework.categories = allCategories;
    this.currentFrameworkId = this.updatedFrameworkResponseBody.result.framework.identifier;
    this.preference.putString('current_framework_id' ,this.currentFrameworkId);
  }

  async getCategoryData(request: CategoryRequest): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (this.updatedFrameworkResponseBody.result == undefined
        || request.frameworkId !== this.updatedFrameworkResponseBody.result.framework.identifier) {

        let frameworkDetailRequest = new FrameworkDetailsRequest();
        if (request.frameworkId !== undefined && request.frameworkId !== "") {
          frameworkDetailRequest.frameworkId = request.frameworkId;
        } else {
          frameworkDetailRequest.defaultFrameworkDetails = true;
        }

        this.getFrameworkDetails(frameworkDetailRequest)
          .then(res => {
            return this.getCategory(request);
          })
          .then(category => {
            resolve(category);
          })
          .catch(error => {
            console.log('getCategoryData:error ' + error);
            reject(error);
          });
      } else {
        this.getCategory(request)
          .then(category => {
            resolve(category);
          })
          .catch(error => {
            console.log('getCategoryData:error ' + error);
            reject(error);
          });
      }
    });
  }

  private getCategory(request: CategoryRequest): Promise<string> {
    return new Promise((resolve, reject) => {
      let isAssociationsAvailable: boolean = false;

      let currentCategory = this.copy(this.currentFrameworkCategories.filter(c => {
        return request.currentCategory === c.code;
      }));

      // If any previous category is selected then retun the associations else return the terms.
      if (request.prevCategory && request.selectedCode) {

        // Find out the previous category from current framework categories.
        let filteredCategory = this.currentFrameworkCategories.filter(c => {
          return c.code === request.prevCategory;
        });

        // Find out all the selected terms in previous category.
        let selectedTerm = (<any>filteredCategory[0]).terms.filter(term => {
          let check = function (element) {
            return element === term.code;
          }
          return request.selectedCode!.some(check);
        });

        let check2 = function (element) {
          return element.associations !== undefined;
        }
        let associationsPresentForEach = selectedTerm.some(check2);
        if (associationsPresentForEach) {
          isAssociationsAvailable = true;
          let map = new Map();
          selectedTerm.forEach(term => {
            term.associations.forEach(a => {
              map.set(a.code, a);
            });
          });

          if (currentCategory !== undefined && currentCategory.length > 0) {
            // List of terms
            console.log('values', Array.from(map.values()));
            currentCategory[0].terms = Array.from(map.values());
            console.log('current categories', currentCategory);
            resolve(this.getTranslatedCategory(currentCategory[0], request.selectedLanguage));
          } else {
            isAssociationsAvailable = false;
          }
        }
      }

      // If no associations are available.
      if (!isAssociationsAvailable) {
        if (currentCategory !== undefined && currentCategory.length > 0) {
          console.log('current categories', currentCategory);
          resolve(this.getTranslatedCategory(currentCategory[0], request.selectedLanguage));
        } else {
          reject('No category found for ' + request.currentCategory);
        }
      }
    });
  }

  private getTranslatedCategory(category, selectedLanguage: string) {
    if (Boolean(category.translations)) {
      category.name = this.getTranslatedValue(category.translations, selectedLanguage, category.name);
    }

    category.terms.forEach((element, index) => {
      if (Boolean(category.terms[index].translations)) {
        category.terms[index].name = this.getTranslatedValue(category.terms[index].translations, selectedLanguage, category.terms[index].name);
      }
    });

    category.terms.sort((c1, c2) => {
      if (c1.index < c2.index) {
        return -1;
      } else if (c1.index > c2.index) {
        return 1;
      } else {
        return 0;
      }
    });

    return JSON.stringify(category);
  }

  private getTranslatedValue(translations, selectedLanguage: string, defaultVaue: string) {
    let availableTranslation = JSON.parse(translations);
    if (availableTranslation.hasOwnProperty(selectedLanguage)) {
      return availableTranslation[selectedLanguage];
    } else {
      return defaultVaue;
    }
  }

  // Deep copy
  private copy(aObject) {
    if (!aObject) {
      return aObject;
    }

    var bObject, v, k;
    bObject = Array.isArray(aObject) ? [] : {};
    for (k in aObject) {
      v = aObject[k];
      bObject[k] = (typeof v === "object") ? this.copy(v) : v;
    }
    return bObject;
  }

}