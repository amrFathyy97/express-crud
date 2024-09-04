import { HttpCode, HttpStatus } from "./../types/http.type";
import { HttpException } from "./../utils/custom.error";
import { UserModel } from "../models/user.model";
import { NextFunction } from "express";

export class UserService {
  async findAll() {
    return UserModel.find();
  }

  async findOne(id: string, next: NextFunction) {
    const user = await UserModel.findOne({ _id: id });

    return user;
  }
  async createUser(userDto: any, next: NextFunction) {

      const user = new UserModel(userDto);
      await user.save();
      return user;
    
  }



  async updateUser(id: string, userDto: any, next: NextFunction) {
    try {
      const user = await UserModel.findOneAndUpdate({ _id: id }, userDto, {
        new: true,
      });
      return user;
    } catch (err: any) {
      const customError = new HttpException(
        err.message,
        HttpStatus.BAD_REQUEST,
        HttpCode.BAD_REQUEST
      );
      return next(customError);
    }
  }
  async deleteUser(id: string, next: NextFunction) {
    try {
      const user = await UserModel.find({ _id: id });
      if (!user) {
        const err = new HttpException(
          "User not found",
          HttpStatus.NOT_FOUND,
          HttpCode.NOT_FOUND
        );
        return next(err);
      }
      return null;
    } catch (err: any) {
      const customError = new HttpException(
        err.message,
        HttpStatus.BAD_REQUEST,
        HttpCode.BAD_REQUEST
      );
      return next(customError);
    }
  }
}
