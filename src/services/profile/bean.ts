export class Profile {
    uid?: string;
    profileType: ProfileType;
    name: string;
    syllabus?: string[];
    board?: string[];
    medium?: string[];
    class?: string[];
    subject?: string[];
    createdAt?: string;
    updatedAt?: string;
    gids?: string[];
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