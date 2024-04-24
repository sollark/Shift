import BadRequestError from '../../errors/BadRequestError.js';
import ProfileModel from '../../mongo/models/profile.model.js';
import logger from '../../service/logger.service.js';
async function createBlankProfile() {
    const profile = await ProfileModel.create({});
    logger.info(`profileService- createBlankProfile,  profile has been created: ${profile}`);
    return profile;
}
async function createProfile(profile) {
    const { ID } = profile;
    const isExist = await isIDExist(ID);
    if (isExist) {
        logger.warn(`profileService- createProfile, attempt to create new profile with existing ID: ${ID}`);
        throw new BadRequestError('Person with this ID already exists', ID);
    }
    const newProfile = await ProfileModel.create(profile);
    return newProfile;
}
async function updateProfile(profileId, updatedProfileData) {
    const profile = await ProfileModel.findByIdAndUpdate(profileId, updatedProfileData, 
    // returns new version of document, if false returns original version, before updates
    { new: true }).exec();
    logger.info(`profileService- updateProfile, profile updated ${profile}`);
    return profile;
}
async function getProfileByID(ID) {
    const profile = await ProfileModel.findOne({ ID });
    return profile;
}
async function getProfileByIdentifier(identifier) {
    const profile = await ProfileModel.findOne(identifier);
    return profile;
}
async function deleteProfile(profileId) {
    await ProfileModel.findByIdAndDelete(profileId).exec();
}
export const profileService = {
    createBlankProfile,
    createProfile,
    updateProfile,
    getProfileByID,
    getProfileByIdentifier,
    deleteProfile,
};
const isIDExist = async (ID) => {
    try {
        const existingID = await ProfileModel.findOne({ ID });
        return existingID ? true : false;
    }
    catch (error) {
        throw error;
    }
};
