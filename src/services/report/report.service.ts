import { Injectable } from "@angular/core";
import { ServiceProvider } from "../factory";
import { ReportSummary, ReportDetail, ReportDetailPerUser } from "./bean";

@Injectable()
export class ReportService {
    
    constructor(private factory: ServiceProvider) {
        
    }

    getListOfReports(uids: Array<string>): Promise<Array<ReportSummary>> {
        let that = this;
        return new Promise((resolve, reject) => {
            that.factory.getReportService()
            .getListOfReports(JSON.stringify(uids), 
            list => {
                resolve(JSON.parse(list));
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
            reportPerUser.totalTime += detail.timespent;
            reportPerUser.maxTotalScore += detail.maxScore;
            map.set(detail.uid, reportPerUser);
        })
        return map;
    }
}