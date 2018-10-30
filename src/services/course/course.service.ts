import { Injectable } from "@angular/core";

import { EnrolledCoursesRequest, EnrollCourseRequest, UpdateContentStateRequest, CourseBatchesRequest, BatchDetailsRequest } from "./bean"
import { ServiceProvider } from "../factory";
import { GenieResponse } from "../service.bean";

@Injectable()
export class CourseService {

    constructor(private factory: ServiceProvider) {

    }

    getEnrolledCourses(requestObject: EnrolledCoursesRequest) {
        return new Promise((resolve, reject) => {
            this.factory.getCourseService().getEnrolledCourses(JSON.stringify(requestObject), (success) => {
                resolve(success);
            }, (error) => {
                reject(error);
            });
        });
    }

    enrollCourse(requestObject: EnrollCourseRequest) {
        return new Promise((resolve, reject) => {
            this.factory.getCourseService().enrollCourse(JSON.stringify(requestObject), (success) => {
               resolve(success);
         }, (error) => {
               reject(error);
         });
      });
    }

    updateContentState(requestObject: UpdateContentStateRequest,
        successCallback: (response: String) => void,
        errorCallback: (error: String) => void) {
        try {
            this.factory.getCourseService().updateContentState(JSON.stringify(requestObject), successCallback, errorCallback);
        } catch (error) {
            console.log(error);
        }
    }

    getCourseBatches(requestObject: CourseBatchesRequest,
        successCallback: (response: String) => void,
        errorCallback: (error: String) => void) {
        try {
            this.factory.getCourseService().getCourseBatches(JSON.stringify(requestObject), successCallback, errorCallback);
        } catch (error) {
            console.log(error);
        }
    }

    getBatchDetails(requestObject: BatchDetailsRequest,
        successCallback: (response: String) => void,
        errorCallback: (error: String) => void) {
        try {
            this.factory.getCourseService().getBatchDetails(JSON.stringify(requestObject), successCallback, errorCallback);
        } catch (error) {
            console.log(error);
        }
    }

}