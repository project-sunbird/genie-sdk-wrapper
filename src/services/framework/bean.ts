export class SystemSettingRequest {
    id: string;
    filePath?: string;
}

export class SystemSetting {
    id: string;
    field: string;
    value: string;
}

export class SuggestedFrameworkRequest {
    isGuestUser?: boolean = false;
}

export class ChannelDetailsRequest {
    channelId: string;
    filePath?: string;
}

export class FrameworkDetail {
    identifier: string;
    index: number;
    name: string;
}

export class Channel {
    identifier: string;
    code: string;
    appId: string;
    channel: string;
    name: string;
    defaultFramework: string;
    frameworks: Array<FrameworkDetail>;
}

export class CategoryRequest {
    frameworkId?: string;
    currentCategory?: string;
    prevCategory?: string;
    selectedCode?: Array<string>;
    selectedLanguage: string;
}

export class FrameworkDetailsRequest {
    frameworkId?: string;
    refreshFrameworkDetails?: boolean = false;
    defaultFrameworkDetails: boolean = false;
    filePath?: string;
}
