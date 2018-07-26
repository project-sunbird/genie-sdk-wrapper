export class ReportSummary {
    uid: string;
    contentId: string;
    name: string;
    lastUsedTime: number;
    noOfQuestions: number;
    correctAnswers: number;
    totalTimespent: number;
    hierarchyData: string;
}

export class ReportDetail {
    uid: string;
    name: string;
    contentId: string;
    qid: string;
    qindex: string;
    correct: string;
    score: number;
    timespent: number;
    res: string;
    timestamp: number;
    qdesc: string;
    qtitle: string;
    maxScore: number;
    hierarchyData: string;
}

export class ReportDetailPerUser {
    uid: string;
    name: string;
    totalTime: number = 0;//in seconds
    totalScore: number = 0;
    maxTotalScore: number = 0;
    reportDetailsList: Array<ReportDetail> = [];
}

export class ReportDetailPerQuestion {
    qid: string;
    qtitle: string;
    totalScore: number;
    accuracy: string;
    reportDetail: ReportDetailPerUser;
}

export class SummaryRequest {
    qId: string;
    uids: Array<string>;
    contentId: string;
    hierarchyData: string;
}