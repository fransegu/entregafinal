import { existsSync, promises } from "fs";
import {logger} from "../src/utils/logger.js"

const path = "CartsFile.json";

class Carts {
    async getCartsList() {
        try {
        if (existsSync(path)) {
            const cartsFile = await promises.readFile(path, "utf-8");
            const cartsData = JSON.parse(cartsFile);
            return cartsData;
        } else {
            logger.info("El archivo no existe");
            return [];
        }
        } catch (error) {
        logger.error("error", error);
        return error;
        }
    }

    async createCart() {
        try {
        const carts = await this.getCartsList();
        let id;
        if (!carts.length) {
            id = 1;
        } else {
            id = carts[carts.length - 1].id + 1;
        }
        const newCart = { id, products: [] };
        carts.push(newCart);
        await promises.writeFile(path, JSON.stringify(carts));
        return newCart;
        } catch (error) {
        return error;
        }
    }

    async getCartById(id) {
        try {
        const carts = await this.getCartsList();
        const cart = carts.find((u) => u.id === id);
        return cart;
        } catch (error) {
        console.log("error catch");
        throw new Error(error.message);
        }
    }

    async addProductCart(cid, pid) {
        try {
            const carts = await this.getCartsList();
            const cart = carts.find((c) => c.id === cid);
            console.log(cart);
        
            if (!cart) {
                throw new Error("Carrito no encontrado");
            }

            const productIndex = cart.products.findIndex((p) => p.product === pid);

            if (productIndex === -1) {
                const newProduct = { product: pid, quantity: 1 };
                cart.products.push(newProduct);
            } else {
                cart.products[productIndex].quantity++;
            }

            await promises.writeFile(path, JSON.stringify(carts));
            return cart
        } 
        catch (error) {
            console.error(`Error al añadir al carrito ${error.message}`);
            throw error;
        }
    }

}

export const Cart = new Carts();