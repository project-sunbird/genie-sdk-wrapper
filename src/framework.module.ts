import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { ContainerService } from "./container/container.services";
import { ContentService } from "./services/content/content.service";
import { EventService } from "./services/event/event.service";
import { TelemetryService } from "./services/telemetry/telemetry.service";
import { ServiceProvider } from "./services/factory";
import { GenieSDKServiceProvider } from "./services/geniesdk.service";
import { OAuthService } from "./services/auth/oauth.service";
import { AuthService } from "./services/auth/auth.service";
import { ProfileService } from "./services/profile/profile.service";
import { CourseService } from "./services/course/course.service"
import { UserProfileService } from "./services/userprofile/userprofile.service";
import { PageAssembleService } from "./services/page/page.service";
import { PermissionService } from "./services/permission.sevice";
import { AttachmentService } from "./services/attachment.service";
import { QRScanner } from "./services/qrscanner.service";
import { FrameworkService } from "./services/framework/framework.service";
import { FileUtil } from "./services/utils/file.service";
import { SharedPreferences } from "./services/utils/preferences.service";
import { ConnectionInfoService } from "./services/utils/connection.service";
import { DeviceInfoService } from "./services/utils/device.service";
import { LocationInfoService } from "./services/utils/location.service";
import { ShareUtil } from "./services/utils/share.service";
import { BuildParamService } from "./services/utils/buildparam.service";
import { FormService } from "./services/form/form.service";
import { GroupService } from "./services/group/group.service";
import { SQLite } from "@ionic-native/sqlite";
import { UserGroupMapService } from "./services/group/user-group-map.service";
import { DialCodeService } from "./services/dialcode/dialcode.service";

@NgModule({
    declarations: [
    ],
    imports: [
        HttpModule
    ],
    providers: [
        ContainerService,
        ContentService,
        EventService,
        OAuthService,
        AuthService,
        ProfileService,
        CourseService,
        UserProfileService,
        FrameworkService,
        { provide: ServiceProvider, useClass: GenieSDKServiceProvider },
        TelemetryService,
        PageAssembleService,
        PermissionService,
        AttachmentService,
        FileUtil,
        SharedPreferences,
        ConnectionInfoService,
        DeviceInfoService,
        LocationInfoService,
        BuildParamService,
        FormService,
        DialCodeService,
        QRScanner,
        ShareUtil,
        GroupService,
        UserGroupMapService,
        SQLite
    ],
    exports: [
    ]
})
export class FrameworkModule {

}
