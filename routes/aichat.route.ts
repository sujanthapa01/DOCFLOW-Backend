import { Router } from "express";

import {aiChatController} from "../controllers/aiChat.controller"

const route = Router()

route.post("/", aiChatController)

export default route