import { NextFunction, Request, Response } from "express";
import { UserService } from "./../services/user.service";
import { HttpCode, HttpStatus } from "../types/http.type";
import { HttpException } from "../utils/custom.error";
import userValidationPipe from "../utils/user.pipe";

class UserController {
  private userService: UserService = new UserService();

  async findAll(req: Request, res: Response, next: NextFunction) {
    const users = await this.userService.findAll();
    return res.status(HttpCode.OK).json({
      status: HttpStatus.OK,
      data: users,
    });
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await this.userService.findOne(id, next);
      if (!user) {
        const err = new HttpException(
          "User not found",
          HttpStatus.NOT_FOUND,
          HttpCode.NOT_FOUND
        );
        return next(err);
      }
      return res.status(HttpCode.OK).json({
        status: HttpStatus.OK,
        data: user,
      });
    } catch (err: any) {
      const customError = new HttpException(
        err.message,
        HttpStatus.BAD_REQUEST,
        HttpCode.BAD_REQUEST
      );
      return next(customError);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    const { first_name, last_name, email, gender, SSN } = req.body;
    try {
      await userValidationPipe.validateAsync({
        first_name,
        last_name,
        email,
        gender,
        SSN,
      });

      const user = await this.userService.createUser(
        { first_name, last_name, email, gender, SSN },
        next
      );
      return res.status(HttpCode.CREATED).json({
        status: HttpStatus.CREATED,
        data: user,
      });
    } catch (err: any) {
      const customError = new HttpException(
        err.message,
        HttpStatus.BAD_REQUEST,
        HttpCode.BAD_REQUEST
      );
      return next(customError);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    const { first_name, last_name, email, gender, SSN } = req.body;
    const { id } = req.params;
    const user = await this.userService.updateUser(
      id,
      { first_name, last_name, email, gender, SSN },
      next
    );
    return res.status(HttpCode.OK).json({
      status: HttpStatus.OK,
      data: user,
    });
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    await this.userService.deleteUser(id, next);
    return res.status(HttpCode.OK).json({
      status: HttpStatus.OK,
      data: null,
    });
  }
}

export const userController = new UserController();
