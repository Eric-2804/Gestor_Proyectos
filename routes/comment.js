import { Router } from "express";
import { creatComment,getcommentsByproject,editcomment } from "../controllers/comment.js";

const router = Router()

router.post("/create",creatComment)
router.get("/project/:projectId",getcommentsByproject)
router.patch("/edit/:id",editcomment)

export default router