import { findAll, findByEmail, findById, createOne, updateUser, updatePerfilDoc, deleteOneUser, updatePerfilFoto } from "../service/user.service.js";
import { jwtValidation } from "../middlewares/jwt.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { transporter } from "../utils/nodemailer.js"
import passport from "passport";
import CustomError from "../errors/error.generate.js";
import { ErrorMessages, ErrorName } from "../errors/errors.enum.js";
import mongoose from "mongoose";


export const findUserById = (req, res) => {
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        const { idUser } = req.params;
        const user = await findById(idUser);
        if (!user) {
                return CustomError.generateError(ErrorMessages.USER_NOT_EXIST,404,ErrorName.USER_NOT_EXIST);
            }
        res.json({ message: "Usuario", user });
}};

export const findUserByEmail = async (req, res) => {
    const { UserEmail } = req.body;
    const user = await findByEmail(UserEmail);
    if (!user) {
        return CustomError.generateError(ErrorMessages.USER_NOT_EXIST,404,ErrorName.USER_NOT_EXIST);

    }
    res.status(200).json({ message: "Usuario encontrado", user });
};

export const findAllUsers = async (req, res) => {
    const users = await findAll();
    return users
}

export const oldUsers = async (req, res) => {
    try {
        const users = await findAll();
        const now = new Date();
        const oldUsersList = [];
        for (let index = 0; index < users.length; index++) {
            const element = users[index];
            const diferenciaEnDias = (now - element.last_connection) / (1000 * 60 * 60 * 24);
            if (diferenciaEnDias >= 2) {
                oldUsersList.push(element)
            }
        }
        return oldUsersList;
    } catch (error) {
        console.error("Usuario antiguo listado error:", error);
        res.status(500).send("Error interno del servidor");
    }
};

export const deleteUsers = async (req, res) => {
    const {users} = req.body;
    for (let index = 0; index < users.length; index++) {
        const element = users[index];
        const result = deleteOneUser(element._id);
        await transporter.sendMail({
            from: "franciscosegu@gmail.com",
            to: element.email,
            subject: "Perfil",
            html: `<bSe ha eliminado su usuario por falta de actividad, por favor registrese nuevamente.</b>`,
        });
    }
};

export const createUser =  async (req, res) => {
    const { name, lastName, email, password } = req.body;
    if (!name || !lastName || !email || !password || !role) {
        return CustomError.generateError(ErrorMessages.ALL_FIELDS_REQUIRED,400,ErrorName.ALL_FIELDS_REQUIRED);

    }
    const createdUser = await createOne(req.body);
    res.status(200).json({ message: "Usuario creado", user: createdUser });
};



export const updateUserNow = async (req, res) => {
    const { uid } = req.params;
    const { role, email } = req.body;
    try {        
    const userToUpdate = await findById(uid);
 
    if (!userToUpdate) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if ( userToUpdate.role === role) {
        return res.status(400).json({ message: "No puedes actualizar a un mismo rol" });
    }
    if (role === "premium") {
        if (!userToUpdate.documents[0] || !userToUpdate.documents[1] || !userToUpdate.documents[2]) {
            return res.status(400).json({ message: "Debes actualizar tu perfil" });
        }
    }
    if (userToUpdate._doc.email !== email ){
        return res.status(400).json({ message: "Los datos son incorrectos" });
    }
    if (userToUpdate.role !== role) {
        const newUser = { ...userToUpdate._doc, role: role };
        console.log(newUser, "Usuario nuevo");
        const updatedUser = await updateUser(uid, newUser);
        res.status(200).json({ message: "Usuario actualizado", user: updatedUser });
        } else {
            res.status(400).json({ message: "Sin cambios" });
        }
    }
    catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

export const updatePerfil = async (req,res) => {
    const { uid } = req.params;
    try {
        const user = await findById(uid);
        const dni = req.files.dni;
        const address = req.files.address;
        const bank = req.files.bank;
        const response = await updatePerfilDoc(uid, { dni, address, bank });
        res.status(201).json({ message: "Documentos agregados" });
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor" });
    }
}    

export const updateFoto = async (req, res) => {
    const { uid } = req.params;
    try {
        const user = await findById(uid);
        const foto = req.files.profiles;
        const response = await updatePerfilFoto(uid, {foto})
        res.status(201).json({ message: "Imagen agregada" });
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor" });
    }
}