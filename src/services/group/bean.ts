export class Group {
    gid?: string;
    name: string;
    syllabus?: string[];
    grade?: string[];
    gradeValueMap?: { [index: string]: any };
    profilesCount?: number;
    createdAt?: string;
    updatedAt?: string;
}

export class AddUpdateProfilesRequest {
    groupId: string;
    uidList: string[];
}

export class GroupRequest {
    uid?: string;
}
