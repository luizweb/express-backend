import { Schema, model } from 'mongoose';

//Schema
const userSchema = new Schema({
    nome: {
      type: String,
      required: true
    },
    contatos: [{type: Schema.Types.ObjectId, ref: "Contact"}], // um usuário pode ter mais de um contato
    },
    {
        timestamps: true, // timestamp da criação
    }
);

// Model
// letra maiúscula e sem "s" no final (Ex: User).
// O MongoDB vai criar uma collection e deixar minúsculo e adicionar um "s" (Ex: users)
const userModel = model("User", userSchema);

export default userModel;