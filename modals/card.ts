import mongoose, { Schema } from "mongoose";

const cardSchema = new Schema(
    {
        level: { type: Number, unique: true },
        setUp: Array<Array<String>>,
        solution: Array<Array<String>>
    },
    {
        timestamps: true
    }
)

const Card = mongoose.models.Card || mongoose.model("Card", cardSchema);

export default Card;