import { BaseRepository } from "../base";
import { UserModel, IUser } from "@/database/models/User.model";
import { AccountStatus } from "@/core/constants/enums";
import { Types } from "mongoose";

export class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(UserModel, "User");
  }

  async findByEmail(email: string, includePassword = false): Promise<IUser | null> {
    const query = this.model.findOne({ email: email.toLowerCase().trim() });
    if (includePassword) {
      query.select("+passwordHash");
    }
    return await query.exec();
  }

  async existsByEmail(email: string): Promise<boolean> {
    return await this.exists({ email: email.toLowerCase().trim() });
  }

  async findActiveUser(id: string | Types.ObjectId): Promise<IUser | null> {
    return await this.findOne({ _id: id, accountStatus: AccountStatus.ACTIVE });
  }

  async updatePassword(id: string | Types.ObjectId, passwordHash: string): Promise<IUser | null> {
    return await this.updateById(id, { passwordHash });
  }

  async verifyEmail(id: string | Types.ObjectId): Promise<IUser | null> {
    return await this.updateById(id, { emailVerified: true });
  }

  async updateLastLogin(id: string | Types.ObjectId): Promise<IUser | null> {
    return await this.updateById(id, { lastLoginAt: new Date() });
  }

  async changeAccountStatus(id: string | Types.ObjectId, accountStatus: AccountStatus): Promise<IUser | null> {
    return await this.updateById(id, { accountStatus });
  }
}
