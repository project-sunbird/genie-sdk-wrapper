import { UserProfileService } from "./userprofile.service";

describe("UserProfileService", () => { 
    let service: UserProfileService;

    beforeEach(() => {
        service = new UserProfileService();
    });

    it("works", () => {
        expect(1).toEqual(2);
    });

});
