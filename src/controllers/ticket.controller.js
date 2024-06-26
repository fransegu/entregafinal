import { findByEmail, findById, createOne } from "../service/ticket.service.js";
import { generateUniqueCode } from "../utils/utils.js";
import { findCartById } from "../controllers/cart.controller.js";
import { findAllProduct } from "../controllers/products.controller.js";


export const findticketById = async (req, res) => {
    const { tid } = req.params;
    try {
        const ticket = await findById(tid);
        if (!ticket) {
            return res.status(404).json({ message: "Ticket no encontrado" });
        }
        res.status(200).json({ message: "Ticket encontrado", ticket });
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const findticketByEmail = async (req, res) => {
    const { email } = req.user;
    try {
        const ticket = await findByEmail(email);
        if (!ticket) {
            return res.status(404).json({ message: "Ticket no encontrado" });
        }
        res.status(200).json({ message: "Ticket encontrado", ticket });
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
export const createOneTicket = async ( req, res) => {
    try {
        const {obj} = req.cookie.ticket;
        const ticket = await createOne(obj)
        res.status(201).json({ message: "Ticket creado", ticket });
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor" });
    }
}