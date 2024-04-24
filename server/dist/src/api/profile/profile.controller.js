import { profileService } from './profile.service.js';
export async function createProfile(req, res, next) {
    const profile = req.body;
    const newProfile = await profileService.createProfile(profile);
    res.status(200).json({ newProfile });
}
export async function getProfileByID(req, res, next) {
    const { ID } = req.body;
    const profile = await profileService.getProfileByID(ID);
    res.status(200).json({ profile });
}
