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
    batchStatus: Number;
}

export class UnenrolCourseRequest {
    userId: string;
    courseId: string;
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
    status?: string[];
    enrollmentType?: string;
    sortBy?: string;
}

export enum CourseBatchStatus {
    NOT_STARTED = "NOT_STARTED",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED"
}

export enum CourseEnrollmentType {
    OPEN = "open",
    INVITE_ONLY = "invite-only"
}

export class BatchDetailsRequest {
    batchId: string;
}

export class GetContentStateRequest {
    userId: string;
    courseIds: string[];
    contentIds?: string[];
    batchId?: string;
    returnRefreshedContentStates?: boolean
}
