import express from 'express';

// Models
import userModel from '../models/user.model.js';
import contactModel from '../models/contact.model.js';

// Criação das Rotas - req (Requisição), res (Resposta)
// CRUD (Create, Read, Update, Delete)
// HTTP (GET, POST, PUT, DELETE)
const userRoute = express.Router();


// POST - new-user (CREATE)
userRoute.post('/new-user', async (req,res)=>{
    try {
        const newUser = await userModel.create(req.body);
        return res.status(201).json(newUser);
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: 'Erro ao criar um novo usuário'});
    }
});

// GET - all-users (READ)
userRoute.get('/all-users', async (req,res)=>{
    try {
        const users = await userModel.find({}, {__v:0, updateAt: 0});
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: 'Erro ao consultar todos os usuários'});
    }
});

// GET - one-user (READ)
userRoute.get('/one-user/:id', async (req,res)=>{
    try {
        const {id} = req.params;
        const user = await userModel.findById(id).populate('contatos');
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: 'Usuário não encontrado'});
    }
});


// UPDATE 
userRoute.put('/edit/:id', async (req,res)=>{
    try {
        const {id} = req.params;

        // new: true --> retorna a atualização realizada
        // runValidators: true --> realiza as verificações do Schema
        const updateUser = await userModel.findByIdAndUpdate(id, {...req.body}, {new: true, runValidators: true});
        return res.status(200).json(updateUser);
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: 'Erro ao editar um usuário'});
    }
});

// DELETE
userRoute.delete('/delete/:id', async (req,res)=>{
    try {
        const {id} = req.params;
        const deleteUser = await userModel.findByIdAndDelete(id);

        if (!deleteUser) {
            return res.status(400).json({msg: 'Usuário não encontrado'});
        };

        // deletar todos os contatos do usuário
        await contactModel.deleteMany({user: id});

        return res.status(200).json(deleteUser);

    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: 'Erro ao deletar um usuário'});
    }
});

export default userRoute;