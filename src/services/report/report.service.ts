import { Injectable } from "@angular/core";
import { ServiceProvider } from "../factory";
import { ReportSummary, ReportDetail, ReportDetailPerUser, SummaryRequest } from "./bean";
import { ContentService } from "../content/content.service";

@Injectable()
export class ReportService {

    constructor(private factory: ServiceProvider, private contentService: ContentService) {

    }

    getListOfReports(uids: Array<string>): Promise<Array<ReportSummary>> {
        let that = this;
        return new Promise((resolve, reject) => {
            that.factory.getReportService()
                .getListOfReports(JSON.stringify(uids),
                    list => {
                        let reportList = JSON.parse(list);
                        reportList = reportList.map(element => {
                            let cache = that.contentService.contentMap.get(element.contentId)!;
                            let newElement = {};
                            if (cache) {
                                Object.assign(newElement, element);
                                newElement["name"] = cache.name;
                                newElement["lastUsedTime"] = cache.lastUsedTime;
                                return newElement;
                            }
                        });
                        reportList =  reportList.filter(report => {
                            if (report) return report
                        });
                       
                        resolve(reportList);
                    },
                    error => {
                        reject(error);
                    });
        });
    }

    getDetailReport(uids: Array<string>, contentId: string): Promise<Map<string, ReportDetailPerUser>> {
        let that = this;
        return new Promise((resolve, reject) => {
            that.factory.getReportService()
                .getDetailReport(JSON.stringify(uids), contentId,
                    list => {
                        let reportDetails: Array<ReportDetail> = JSON.parse(list);
                        let map = that.mapReportDetailPerUser(reportDetails);
                        resolve(map);
                    },
                    error => {
                        reject(error);
                    });
        });
    }

    mapReportDetailPerUser(reportDetails: Array<ReportDetail>): Map<string, ReportDetailPerUser> {
        let map = new Map<string, ReportDetailPerUser>();
        reportDetails.forEach(detail => {
            let reportPerUser: ReportDetailPerUser = map.get(detail.uid)!;
            if (reportPerUser === undefined) {
                reportPerUser = new ReportDetailPerUser();
                reportPerUser.uid = detail.uid;
            }
            reportPerUser.reportDetailsList.push(detail);
            reportPerUser.totalScore += detail.score;
            reportPerUser.totalTime = detail.total_ts;
            reportPerUser.maxTotalScore += detail.maxScore;
            map.set(detail.uid, reportPerUser);
        })
        return map;
    }

    getReportsByUser(requestObject: SummaryRequest,
        successCallback: (response: String) => void,
        errorCallback: (error: String) => void) {
        try {
            this.factory.getReportService().getReportsByUser(JSON.stringify(requestObject), successCallback, errorCallback);
        } catch (error) {
            console.log(error);
        }
    }

    getReportsByQuestion(requestObject: SummaryRequest,
        successCallback: (response: String) => void,
        errorCallback: (error: String) => void) {
        try {
            this.factory.getReportService().getReportsByQuestion(JSON.stringify(requestObject), successCallback, errorCallback);
        } catch (error) {
            console.log(error);
        }
    }

    getDetailsPerQuestion(requestObject: SummaryRequest,
        successCallback: (response: String) => void,
        errorCallback: (error: String) => void) {
        try {
            this.factory.getReportService().getDetailsPerQuestion(JSON.stringify(requestObject), successCallback, errorCallback);
        } catch (error) {
            console.log(error);
        }
    }
}