export class EnrolledCoursesRequest {
    userId: string;
    refreshEnrolledCourses?: boolean;
    returnRefreshedEnrolledCourses?: boolean
}

export class EnrollCourseRequest {
    userId: string;
    courseId: string;
    contentId: string;
    batchId: string;
}

export class UpdateContentStateRequest {
    userId: string;
    courseId: string;
    contentId: string;
    batchId: String;
    status?: Number;
    progress?: Number;
    result?: string;
    grade?: string;
    score?: string;
}

export class CourseBatchesRequest {
    courseIds: string[];
}

export class BatchDetailsRequest {
    batchId: string;
}