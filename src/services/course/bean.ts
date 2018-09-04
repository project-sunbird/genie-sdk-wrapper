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
    courseId: string;
    status?: string;
    enrollmentType?: string;
    sortBy?: string;
}

export enum CourseBatchStatus {
    NOT_STARTED = "0",
    IN_PROGRESS = "1",
    COMPLETED = "2"
}

export enum CourseEnrollmentType {
    OPEN = "open",
    INVITE_ONLY = "invite-only"
}

export class BatchDetailsRequest {
    batchId: string;
}