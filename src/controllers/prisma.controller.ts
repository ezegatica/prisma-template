import { PrismaClient } from "@prisma/client";
import { User, Post } from "../models";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export async function insertUser(req: Request, res: Response) {
  const user: User = req.body;
  try {
    const insert = await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
      },
    });
    res.status(200).json({ message: "User created", data: insert });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
}

export async function insertPost(req: Request, res: Response) {
  const post: Post = req.body;
  try {
    const insert = await prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        published: post.published,
        Author: {
          connect: {
            id: post.authorId || 0, // sino habia problemas,
          },
        },
      },
    });
    res.status(200).json({ message: "Post created", data: insert });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
}

export async function getUsers(req: Request, res: Response) {
  try {
    const users: User[] = await prisma.user.findMany({
      include: { Post: true },
    });
    res.status(200).json({ message: "Users fetched", data: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
}

export async function getPosts(req: Request, res: Response) {
  try {
    const posts: Post[] = await prisma.post.findMany({
      include: { 
        Author: true 
      },
    });
    res.status(200).json({ message: "Posts fetched", data: posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
}

export async function updateUser(req: Request, res: Response) {
  const id: string = req.params.id;
  const user: User = req.body;
  try {
    const update: User = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        email: user.email,
        name: user.name,
      },
    });
    res.status(200).json({ message: "User updated", data: update });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
}

export async function getUserByID(req: Request, res: Response) {
  const id: string = req.params.id;
  try {
    const user: User | null = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      include: { 
        Post: true 
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User fetched", data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
}

export async function deleteUser(req: Request, res: Response) {
  const id: string = req.params.id;
  try {
    const deleteUser: User | null = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    if (!deleteUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted", data: deleteUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
}
