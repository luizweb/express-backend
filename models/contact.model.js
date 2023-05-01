import { Schema, model } from 'mongoose';

//Schema
const contactSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "User"}, // os cantatos pertencem a um usuário
    tipo: {
      type: String,
      enum: ['email', 'phone', 'link'], // valores permitidos para o campo "tipo"
      required: true
    },
    valor: {
      type: String,
      required: true
    }
});

// Model
// letra maiúscula e sem "s" no final (Ex: Contact).
// O MongoDB vai criar uma collection e deixar minúsculo e adicionar um "s" (Ex: contacts)
const contactModel = model("Contact", contactSchema);

export default contactModel;