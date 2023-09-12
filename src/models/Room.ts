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

const Room = model<RoomType>("Rooms", schema);

Room.find().then(async (rooms) => {
    // futuro código

});

export default Room;