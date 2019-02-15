import { Injectable } from "@angular/core";
import {
    EnrolledCoursesRequest,
    EnrollCourseRequest,
    UpdateContentStateRequest,
    CourseBatchesRequest,
    BatchDetailsRequest,
    GetContentStateRequest,
    UnenrolCourseRequest
} from "./bean"
import { ServiceProvider } from "../factory";

@Injectable()
export class CourseService {

    constructor(private factory: ServiceProvider) {

    }

    getEnrolledCourses(requestObject: EnrolledCoursesRequest) {
        return new Promise((resolve, reject) => {
            this.factory.getCourseService().getEnrolledCourses(JSON.stringify(requestObject),
                (success) => {
                    resolve(success);
                },
                (error) => {
                    reject(error);
                });
        });
    }

    enrollCourse(requestObject: EnrollCourseRequest) {
        return new Promise((resolve, reject) => {
            this.factory.getCourseService().enrollCourse(JSON.stringify(requestObject),
                (success) => {
                    resolve(success);
                },
                (error) => {
                    reject(error);
                });
        });
    }

    unenrolCourse(requestObject: UnenrolCourseRequest) {
        return new Promise((resolve, reject) => {
            this.factory.getCourseService().unenrolCourse(JSON.stringify(requestObject),
                (success) => {
                    resolve(success);
                },
                (error) => {
                    reject(error);
                });
        });
    }

    updateContentState(requestObject: UpdateContentStateRequest) {
        return new Promise((resolve, reject) => {
            this.factory.getCourseService().updateContentState(JSON.stringify(requestObject),
                (success) => {
                    resolve(success);
                },
                (error) => {
                    reject(error);
                });
        });
    }

    getCourseBatches(requestObject: CourseBatchesRequest) {
        return new Promise((resolve, reject) => {
            this.factory.getCourseService().getCourseBatches(JSON.stringify(requestObject),
                (success) => {
                    resolve(success);
                },
                (error) => {
                    reject(error);
                });
        });
    }

    getBatchDetails(requestObject: BatchDetailsRequest) {
        return new Promise((resolve, reject) => {
            this.factory.getCourseService().getBatchDetails(JSON.stringify(requestObject),
                (success) => {
                    resolve(success);
                },
                (error) => {
                    reject(error);
                });
        });
    }

    getContentState(requestObject: GetContentStateRequest) {
        return new Promise((resolve, reject) => {
            this.factory.getCourseService().getContentState(JSON.stringify(requestObject),
                (success) => {
                    resolve(success);
                },
                (error) => {
                    reject(error);
                });
        });
    }

}
