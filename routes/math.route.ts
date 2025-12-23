import { Router } from "express";
import {mathController} from "../controllers/math.controller"
const route = Router()

 route.post("/", mathController)

export default route