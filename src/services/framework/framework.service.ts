import { Injectable } from "@angular/core";
import { ServiceProvider } from "../factory";
import { FrameworkDetailsRequest, CategoryRequest } from "./bean";

@Injectable()
export class FrameworkService {

  currentCategories: Array<any> = [];
  updatedFrameworkResponseBody: any = {};

  constructor(private factory: ServiceProvider) {

  }

  getFrameworkDetails(request: FrameworkDetailsRequest,
    successCallback: (response: any) => void,
    errorCallback: (error: string) => void) {

    if (this.updatedFrameworkResponseBody.result !== undefined &&
      this.updatedFrameworkResponseBody.result.framework.code === request.frameworkId) {
      successCallback(this.currentCategories);
    } else {
      try {
        let that = this;
        let success = function (response: string) {
          that.prepareFrameworkData(response);
          successCallback(that.currentCategories);
          that.factory.getFrameworkService().persistFrameworkDetails(
            JSON.stringify(that.updatedFrameworkResponseBody));
        }
        this.factory.getFrameworkService().getFrameworkDetails(
          JSON.stringify(request), success, errorCallback);
      } catch (error) {
        console.log(error);
      }
    }
  }

  prepareFrameworkData(frameworkStr: string): void {
    let responseBody = JSON.parse(frameworkStr);
    let allCategories: Array<any> = responseBody.result.framework.categories;

    allCategories = allCategories.map((c, index) => {
      return {
        identifier: c.identifier,
        code: c.code,
        name: c.name,
        description: c.description,
        index: c.index,
        status: c.status,
        terms: c.terms ? c.terms.map(t => {
          return {
            identifier: t.identifier,
            code: t.code,
            name: t.name,
            description: t.description,
            index: t.index,
            category: t.category,
            status: t.status,
            associations: t.associations ? t.associations.filter(a => {
              return (index >= allCategories.length - 1)
                || (a.category === allCategories[index + 1].code);
            }) : undefined
          }
        }) : undefined
      }
    });

    this.currentCategories = allCategories;
    this.updatedFrameworkResponseBody = responseBody;
    this.updatedFrameworkResponseBody.result.framework.categories = allCategories;

  }

  getCategoryData(request: CategoryRequest,
    successCallback: (response: string) => void,
    errorCallback: (error: string) => void) {

    if (this.updatedFrameworkResponseBody.result == undefined
      || request.frameworkId !== this.updatedFrameworkResponseBody.result.framework.identifier) {
      let fr = new FrameworkDetailsRequest();
      if (request.frameworkId !== undefined
        && request.frameworkId !== "") {
        fr.frameworkId = request.frameworkId;
      } else {
        fr.defaultFrameworkDetails = true;
      }
      this.getFrameworkDetails(fr, r => {
        this.getCategory(request, successCallback, errorCallback);
      }, e => {
        //ignore as of now
        errorCallback(e);
      })
    } else {
      this.getCategory(request, successCallback, errorCallback);
    }
  }

  private getCategory(request: CategoryRequest,
    successCallback: (response: string) => void,
    errorCallback: (error: string) => void) {
    if (request.prevCategory && request.selectedCode) {
      let filteredCategory = this.currentCategories.filter(c => {
        return c.code === request.prevCategory;
      });
      let selectedTerm = (<any>filteredCategory[0]).terms.filter(t => {
        let check = function (element) {
          return element === t.code;
        }
        return request.selectedCode!.some(check);
      });

      let check2 = function (element) {
        return element.associations !== undefined;
      }
      let associationsPresentForEach = selectedTerm.some(check2);
      if (associationsPresentForEach) {
        let map = new Map();
        selectedTerm.forEach(term => {
          term.associations.forEach(a => {
            map.set(a.code, a);
          });
        });

        successCallback(JSON.stringify(Array.from(map.values())));
        return;
      }

    }

    let nextCategories = this.currentCategories.filter(c => {
      return request.currentCategory === c.code;
    });

    if (nextCategories !== undefined && nextCategories.length > 0) {
      successCallback(JSON.stringify(nextCategories[0].terms));
    }
  }
}