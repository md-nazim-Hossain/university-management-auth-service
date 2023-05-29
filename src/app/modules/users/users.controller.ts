import { Request, Response } from 'express';
import usersService from './users.service';

const createdUsers = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const result = await usersService.createUser(user);
    res.status(201).json({
      success: true,
      message: 'User created Successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed To create user' });
  }
};

export default {
  createdUsers,
};
