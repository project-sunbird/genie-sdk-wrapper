import { ReportService } from "./report.service";
import { GenieSDKServiceProvider } from "../geniesdk.service";

describe("ReportService", () => { 
    let service: ReportService;

    let input = '[{"contentId":"do_30013147","correct":1,"hierarchyData":"","id":-1,"maxScore":1,"qdesc":"","qid":"ek.n.ib.s.ssnb.bp2.4","qindex":1,"qtitle":"घटाव","score":1,"timespent":3,"timestamp":1531396935381,"uid":"8059d370-23d7-43ac-8f95-e8872b65eb45"},{"contentId":"do_30013147","correct":1,"hierarchyData":"","id":-1,"maxScore":1,"qdesc":"","qid":"ek.n.ib.s.ssnb.bp2.1","qindex":3,"qtitle":"घटाव","score":1,"timespent":2,"timestamp":1531396926429,"uid":"8059d370-23d7-43ac-8f95-e8872b65eb45"}]';
    let expected = '{"uid":"8059d370-23d7-43ac-8f95-e8872b65eb45","totalTime":120,"totalScore":10,"maxTotalScore":15,"reportDetailsList":[{"contentId":"do_30013147","correct":1,"hierarchyData":"","id":-1,"maxScore":1,"qdesc":"","qid":"ek.n.ib.s.ssnb.bp2.1","qindex":3,"qtitle":"घटाव","score":1,"timespent":2,"timestamp":1531396926429,"uid":"8059d370-23d7-43ac-8f95-e8872b65eb45"},{"contentId":"do_30013147","correct":1,"hierarchyData":"","id":-1,"maxScore":1,"qdesc":"","qid":"ek.n.ib.s.ssnb.bp2.1","qindex":3,"qtitle":"घटाव","score":1,"timespent":2,"timestamp":1531396926429,"uid":"8059d370-23d7-43ac-8f95-e8872b65eb45"}]}';
    
    
    beforeEach(() => {
        service = new ReportService(new GenieSDKServiceProvider());
    });

    it("works", () => {
        let objectInput = JSON.parse(input);
        let report = service.mapReportDetailPerUser(objectInput)
        .get('8059d370-23d7-43ac-8f95-e8872b65eb45');
        expect(report)
        .toEqual(jasmine.objectContaining(JSON.parse(expected)));
    });

});
