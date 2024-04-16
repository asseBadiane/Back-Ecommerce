import { User } from "../models/user";
import { UserService } from "../services/usersServices";
import { Request, Response } from "express";

export class UserController {
  private userService: UserService; // initialize the Service
  constructor() {
    this.userService = new UserService(); // create an instance of the Service
  }

  // GET ALL USERS
  async getAll(req: Request, res: Response) {
    try {
      const list_users = await this.userService.getAll();
      res.json(list_users);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // GET USER BY ID
  async getById(req: Request, res: Response) {
    try {
      const user = await this.userService.getById(req.params.id);
      if (user) {
        res.json(user);
      } else {
        res.sendStatus(404);
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // CREATE USER
  async create(req: Request, res: Response) {
    const { username, email, password, role } = req.body;
    if (
      username === undefined ||
      email === undefined ||
      password === undefined ||
      role === undefined
    ) {
      res.status(400).json({ message: "body not match contract " });
    } else {
      try {
        const UserNotExist = await this.userService.notExist(username);
        if (UserNotExist) {
          const user: User = { username, email, password, role };
          const data = await this.userService.create(user);
          res.status(201).json(data);
        } else {
          res.status(400).json({ message: "user already exist " });
        }
      } catch (error: any) {
        res.status(400).json({ message: error.message });
      }
    }
  }

  // UPDATE USER
  async update(req: Request, res: Response) {
    try {
      let user: User = req.body;
      user.id = req.params.id as string;
      const data = await this.userService.update(user);
      res.status(200).json({ message: "user updated successfully 😃" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // DELETE USER
  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const result = await this.userService.delete(id);
      res.status(200).json({ message: "user deleted successfully 😥" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
