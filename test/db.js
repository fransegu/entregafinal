import mongoose from "mongoose";

const URI = "mongodb+srv://franciscosegu:Riverplate92@cluster0.mlerugj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose
    .connect(URI)
    .then(() => console.log("Conectado a la DB Test"))
    .catch((error) => console.log(error));git 