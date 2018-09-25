export class Profile {
    uid?: string;
    handle: string;
    avatar?: string;
    gender?: string;
    age?: number;
    day?: number;
    month?: number;
    standard?: number;
    language?: string;
    syllabus?: string[];
    board?: string[];
    medium?: string[];
    grade?: string[];
    gradeValueMap?: { [index: string]: any };
    subject?: string[];
    isGroupUser?: boolean;
    createdAt?: string;
    profileType: ProfileType;
    source: UserSource;

    constructor() {
        this.avatar = "avatar";
        this.gender = "";
        this.age = -1;
        this.day = -1;
        this.month = -1;
        this.standard = -1;
        this.language = "en";
        this.isGroupUser = false;
    }
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

export enum UserSource {
    LOCAL = "LOCAL",
    SERVER = "SERVER"
}

export class ProfileRequest {
    local?: boolean;
    server?: boolean;
    groupId?: string;
}

export class GetProfileRequest {
    local?: boolean;
    server?: boolean;
    latestCreatedProfile?: boolean;
    uid?: string;
}

export class ProfileImportRequest {
    sourceFilePath: string;
}

export class ProfileExportRequest {
    userIds?: Array<string>
    groupIds?: Array<string>
    destinationFolder: string;
}