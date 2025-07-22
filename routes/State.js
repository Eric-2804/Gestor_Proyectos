import { Router } from "express";
import { createState, getStates,deactivateState } from "../controllers/State.js";

const router = Router()


router.post('/create',createState)
router.get('/',getStates)
router.patch('deactivate/:id', deactivateState)

export default router