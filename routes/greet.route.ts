import { Router } from "express";
import {greetController} from "../controllers/greet.controller"
const route = Router()

 route.post("/", greetController)

export default route