import { Schema, model } from "mongoose";
import { RoomType } from "../types";

const schema = new Schema<RoomType>({
    nome: {
        type: String,
        required: true,
    },
    bloco: {
        type: String,
        required: true,
    },
    corredor: {
        type: String,
        required: true,
    },
    capacidade: {
        type: Number,
        required: true,

    },
    disponivel: {
        type: Boolean,
        required: true,
    },
});

const Rooms = model<RoomType>("Rooms", schema);

Rooms.find().then(async (rooms) => {
    // futuro código

});

export default Rooms;