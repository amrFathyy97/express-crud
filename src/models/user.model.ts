import { Schema, SchemaDefinition, model } from "mongoose";

const userSchema = new Schema<SchemaDefinition>({
  first_name: {
    type: "String",
    required: true,
  },

  last_name: {
    type: "String",
    required: true,
  },

  email: {
    type: "String",
    required: true,
    unique: true,
  },

  gender: {
    type: "String",
    enum: ["Male", "Female"],
    required: true,
  },

  SSN: {
    type: "String",
  },
});


export const UserModel = model('user', userSchema);