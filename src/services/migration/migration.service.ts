import { Injectable } from "@angular/core";
import { ServiceProvider } from "../factory";
import { OldProfile } from "./bean";
import { Profile, ProfileType } from "../..";
import { Storage } from '@ionic/storage';


@Injectable()
export class MigrationService {
    constructor(private storage: Storage, private factory: ServiceProvider) {
    }

    migrateFromSQLToNoSQL() {

        this.factory.getProfileService().getAllUserProfile((onSuccess) => {

            let response = JSON.parse(onSuccess);

            let oldProfiles: OldProfile[] = [];

            //check if the profiles list is empty
            if (response.profiles && response.profiles.length > 0) {
                oldProfiles = response.profiles

                if (oldProfiles) {
                    let convertedProfilesCount: number = 0;

                    //convert profile model to JSON String
                    oldProfiles.forEach(oldProfile => {

                        let newProfile: Profile = new Profile();

                        //uid
                        newProfile.uid = oldProfile.uid;

                        //profile type
                        if (oldProfile.profileType !== undefined) {
                            newProfile.profileType = oldProfile.profileType;
                        } else {
                            newProfile.profileType = ProfileType.TEACHER;
                        }

                        //name
                        if (oldProfile.handle !== undefined) {
                            newProfile.name = oldProfile.handle;
                        }

                        //syllabus
                        if (oldProfile.syllabus !== undefined && oldProfile.syllabus.length > 0) {
                            newProfile.syllabus = oldProfile.syllabus;
                        }

                        //board
                        if (oldProfile.board !== undefined && oldProfile.board.length > 0) {
                            newProfile.board = oldProfile.board
                        }

                        //medium
                        if (oldProfile.medium !== undefined && oldProfile.medium.length > 0) {
                            newProfile.medium = oldProfile.medium
                        }

                        //class
                        if (oldProfile.grade !== undefined && oldProfile.grade.length > 0) {
                            newProfile.class = oldProfile.grade
                        }

                        //Subject
                        if (oldProfile.subject !== undefined && oldProfile.subject.length > 0) {
                            newProfile.subject = oldProfile.subject
                        }

                        //createdAt
                        if (oldProfile.createdAt !== undefined) {
                            newProfile.createdAt = oldProfile.createdAt
                        }

                        //updatedAt
                        newProfile.updatedAt = "";//should have new updated timestamp

                        //gids
                        newProfile.gids = [];

                        //Store this converted JSON String in Ionic Storage
                        let key = 'profile_' + newProfile.uid;
                        let profileString = JSON.stringify(newProfile);

                        this.storage.set(key, profileString);

                        //increment the counter
                        convertedProfilesCount++;

                    });

                    //finally delete all the profiles stored in the SDK
                    if (oldProfiles.length === convertedProfilesCount) {
                        //delete all the profiles from sdk here
                    }

                }
            }
        }, (onError) => {

        });
    }
}