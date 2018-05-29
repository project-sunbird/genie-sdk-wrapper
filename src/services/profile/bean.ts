export class Profile {
    uid?: string;
    handle?: string;
    avatar?: string;
    gender?: string;
    age: number = -1;
    day: number = -1;
    month: number = -1;
    standard: number = -1;
    language?: string;
    medium?: string[];
    board?: string[];
    isGroupUser?: boolean;
    profileType?: ProfileType;
    subject?: string[];
    grade?: string[];
    createdAt?: string;
}
export class ContentAccess {
    status?: number;
    contentId: string;
    contentLearnerState: ContentLearnerState;
}
export class ContentLearnerState {
    learnerState: { [index: string]: string };
}

export enum ProfileType {
    STUDENT = "STUDENT",
    TEACHER = "TEACHER"
}