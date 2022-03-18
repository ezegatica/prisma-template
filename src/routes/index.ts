import { Router } from "express";
import { insertPost, insertUser, getUsers, getPosts, updateUser, getUserByID, deleteUser } from "../controllers/prisma.controller";

const router = Router();

router.post("/user", insertUser);
router.get("/user", getUsers);
router.get("/user/:id", getUserByID);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

// No tengo muchas ganas de hacer el CRUD de posts pero se entiende con lo de Users
router.post("/post", insertPost);
router.get("/post", getPosts);

export default router;
