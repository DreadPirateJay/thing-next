import { Schema, models, model } from "mongoose";

const ThingSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = models.Thing || model('Thing', ThingSchema);
