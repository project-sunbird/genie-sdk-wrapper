import { Injectable } from "@angular/core";
import { ServiceProvider } from "../factory";
import { OldProfile } from "./bean";
import { Profile, ProfileType } from "../profile/bean";
import { StorageService } from "../storage/storage.service";
import { SQLite } from "@ionic-native/sqlite";
import { resolve } from "path";

@Injectable()
export class MigrationService extends StorageService<Profile> {

    constructor(sqlite: SQLite, private factory: ServiceProvider) {
        super(sqlite, "users");
    }

    migrateProfiles(): Promise<any> {

        return new Promise((resolve, reject) => {
            this.factory.getProfileService().getAllUserProfile((onSuccess) => {

                let response = JSON.parse(onSuccess);

                console.log("Old Profiles response - " + JSON.stringify(response));

                let oldProfiles: OldProfile[] = [];
                let profileIdList: String[] = [];

                //check if the profiles list is empty
                if (response && response.length > 0) {
                    oldProfiles = response

                    if (oldProfiles) {
                        let convertedProfilesCount: number = 0;

                        console.log("Old Profiles List - " + oldProfiles.length);

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
                                newProfile.handle = oldProfile.handle;
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
                                newProfile.grade = oldProfile.grade
                            }

                            //Subject
                            if (oldProfile.subject !== undefined && oldProfile.subject.length > 0) {
                                newProfile.subject = oldProfile.subject
                            }

                            //createdAt
                            if (oldProfile.createdAt !== undefined) {
                                newProfile.createdAt = oldProfile.createdAt
                            }

                            // //updatedAt
                            // let time = new Date();
                            // newProfile.updatedAt = time.getTime().toString();

                            // //gids
                            // newProfile.gids = [];

                            this.createProfile(newProfile).
                                then((response) => {
                                    console.log("Profile created successfully");
                                }).catch((reason) => {
                                    console.log("Error creating profile - " + reason);
                                });

                            //Add the profile id to profile list
                            profileIdList.push(new String(newProfile.uid));

                            //increment the counter
                            convertedProfilesCount++;

                        });

                        //finally delete all the profiles stored in the SDK
                        if ((oldProfiles.length === convertedProfilesCount) && profileIdList && profileIdList.length > 0) {
                            profileIdList.forEach(profileId => {
                                this.factory.getProfileService().deleteUser(profileId, (success) => {
                                    console.log("Profile deleted successfully");
                                }, (error) => {
                                    console.log("Error deleting profile - " + error);

                                })
                            });
                        }
                    }
                }
                resolve();
            }, (onError) => {
                reject()
            });
        })
    }

    getUniqueKeyFromObject(object: Profile): string {
        if (object.uid) {
            return object.uid
        } else {
            return "";
        }
    }

    /**
    * @param request This api is used to create a new profile with specific {@link Profile}
    */
    async createProfile(request: Profile) {
        try {
            let value = await this.save(request);
            // create succes response
            let genieResponse = { result: request };
            return genieResponse;
        } catch (error) {
            // create genie error response
            return { error: error };
        }

    }

    /**
    * This api returns the list of all profiles.
     */
    async getAllProfiles() {
        let result = await this.getAll();

        let profiles: any = [];

        if (result.rows.length && result.rows.length > 0) {
            for (let i = 0; i < result.rows.length; i++) {
                let data = JSON.parse(result.rows.item(i).value);
                profiles.push(data);
            }
        }
        // create succes response
        let genieResponse = { result: profiles };
        return genieResponse;
    }
}
