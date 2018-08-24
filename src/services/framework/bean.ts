export class ChannelDetailsRequest {
    channelId: string;
    refreshChannelDetails?: boolean = false;
}

export class Channel {
    identifier: string;
    code: string;
    appId: string;
    channel: string;
    name: string;
    defaultFramework: string;
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
    defaultFrameworkPath?: string;
}