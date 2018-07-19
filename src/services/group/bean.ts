export class Group {
    gid?: string;
    name: string;
    syllabus?: string[];
    grade?: string[];
    createdAt?: string;
    updatedAt?: string;
    uids?: string[];
}

export class AddUpdateProfilesRequest{
    groupId: string;
    uidList: string[];
}