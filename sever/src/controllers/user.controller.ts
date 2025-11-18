import { handleCreateUser, handleGetAllUsers, handleGetUserById, handleUpdateUser } from "../repositories/user.repository.js";
import { ErrorCustom, RequestHandlerCustom } from "../utils/configs/custom.js";
import { parseRequestData } from "../utils/configs/helper.js";

export const getAllUsers = RequestHandlerCustom(
  async (req, res) => {
    const users = await handleGetAllUsers();

    res.status(200).json({
      success: true,
      message: "Get users successfully",
      users: users
    });
  }
);

export interface ICreateUserData {
  email: string,
  password: string,
  name?: string,
  phone?: string,
  status?: string,
}

export interface IUpdateUserData {
  email?: string,
  password?: string,
  name?: string,
  phone?: string,
  status?: string,
}

export const createUser = RequestHandlerCustom(
  async (req, res) => {
    const data: ICreateUserData = parseRequestData(req);

    const user = await handleCreateUser(data);

    res.status(201).json({
      success: true,
      message: "New user created",
      user: user
    });
  }
);

export const updateUser = RequestHandlerCustom(
  async (req, res, next) => {
    const id = req.params.id;

    if (!id) {
      return next(new ErrorCustom(400, "User ID is required"));
    }

    const data: IUpdateUserData = parseRequestData(req);

    // Kiểm tra xem có dữ liệu để cập nhật không
    if (Object.keys(data).length === 0) {
      return next(new ErrorCustom(400, "No data provided for update"));
    }

    const updatedUser = await handleUpdateUser({ id, ...data });

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser
    });
  }
);

export const getUserById = RequestHandlerCustom(
  async (req, res, next) => {
    const id = req.params.id;

    if (!id) {
      return next(new ErrorCustom(400, "User ID is required"));
    }

    const user = await handleGetUserById({ id });

    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      user: user
    });
  }
);