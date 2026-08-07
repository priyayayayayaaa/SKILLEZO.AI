import { BaseRepository } from "../base";
import { ProfileModel, IProfile, IProfileSkill, IProfileEducation, IProfileExperience, IProfileLinks } from "@/database/models/Profile.model";
import { Types } from "mongoose";

export class ProfileRepository extends BaseRepository<IProfile> {
  constructor() {
    super(ProfileModel, "Profile");
  }

  async findByUserId(userId: string | Types.ObjectId): Promise<IProfile | null> {
    return await this.findOne({ userId });
  }

  async updateSkills(userId: string | Types.ObjectId, skills: IProfileSkill[]): Promise<IProfile | null> {
    return await this.model.findOneAndUpdate({ userId }, { $set: { skills } }, { new: true, runValidators: true }).exec();
  }

  async updateEducation(userId: string | Types.ObjectId, education: IProfileEducation[]): Promise<IProfile | null> {
    return await this.model.findOneAndUpdate({ userId }, { $set: { education } }, { new: true, runValidators: true }).exec();
  }

  async updateExperience(userId: string | Types.ObjectId, experience: IProfileExperience[]): Promise<IProfile | null> {
    return await this.model.findOneAndUpdate({ userId }, { $set: { experience } }, { new: true, runValidators: true }).exec();
  }

  async updateTargetRole(userId: string | Types.ObjectId, targetRoleId: Types.ObjectId | null): Promise<IProfile | null> {
    return await this.model.findOneAndUpdate({ userId }, { $set: { targetRoleId } }, { new: true, runValidators: true }).exec();
  }

  async updateLinks(userId: string | Types.ObjectId, links: IProfileLinks): Promise<IProfile | null> {
    return await this.model.findOneAndUpdate({ userId }, { $set: { links } }, { new: true, runValidators: true }).exec();
  }

  async findProfilesByRole(targetRoleId: string | Types.ObjectId): Promise<IProfile[]> {
    return await this.findMany({ targetRoleId });
  }
}
