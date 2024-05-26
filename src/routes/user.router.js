import { Router } from "express";
import upload from "../middlewares/multer.middlware.js";
import { authMiddleware } from '../middlewares/auth.middleware.js';
import passport from "passport";
import { findAllUsers, findUserById, updateUserNow, updatePerfil, deleteUsers, updateFoto } from "../controllers/users.controller.js";

const router = Router();

router.get(
  "/", passport.authenticate("current", {session:false}), authMiddleware(["admin"]), findAllUsers
);

router.delete(
  "/", deleteUsers
);

router.get(
  "/:uid", findUserById
);
router.post(
  "/:uid/documents",
  upload.fields([
    { name: "dni", maxCount: 1 },
    { name: "address", maxCount: 1 },
    { name: "bank", maxCount: 1 },
  ]), 
  updatePerfil
);

router.post(
  "/:uid/fotoDePerfil",
  upload.fields([
    { name: "profiles", maxCount: 1 },
  ]), 
  updateFoto
);

router.put(
  "/premium/:uid", updateUserNow
);


export default router;