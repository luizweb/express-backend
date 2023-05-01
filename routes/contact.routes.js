import express from 'express';

// Models
import userModel from '../models/user.model.js';
import contactModel from '../models/contact.model.js';


// Criação das Rotas - req (Requisição), res (Resposta)
// CRUD (Create, Read, Update, Delete)
// HTTP (GET, POST, PUT, DELETE)
const contactRoute = express.Router();


// POST - new-contact (CREATE)
contactRoute.post('/new-contact/:userId', async (req,res)=>{
    try {
        const {userId} = req.params;
        const newContact = await contactModel.create({...req.body, user: userId});
        
        // uptadte no usuario para adicionar um contato
        await userModel.findByIdAndUpdate(userId, {$push: {contatos: newContact._id}}, {new: true, runValidators: true});
        return res.status(201).json(newContact);

    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: 'Erro ao criar um novo contato'});
    }
});


// GET - all-contacts (READ)
contactRoute.get('/all-contacts', async (req,res)=>{
    try {
        const contacts = await contactModel.find({}, {__v:0, updateAt: 0});
        return res.status(200).json(contacts);
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: 'Erro ao consultar todos os contatos'});
    }
});


// GET - one-contact (READ)
contactRoute.get('/one-contact/:id', async (req,res)=>{
    try {
        const {id} = req.params;
        const contact = await contactModel.findById(id).populate('user');
        return res.status(200).json(contact);
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: 'Contato não encontrado'});
    }
});


// UPDATE 
contactRoute.put('/edit/:id', async (req,res)=>{
    try {
        const {id} = req.params;
        const updateContact = await contactModel.findOneAndUpdate({_id: id}, {...req.body}, {new: true, runValidators: true});
        return res.status(200).json(updateContact);
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: 'Erro ao editar um contato'});
    }
});


// DELETE
contactRoute.delete('/delete/:id', async (req,res)=>{
    try {
        const {id} = req.params;
        const deleteContact = await contactModel.findByIdAndDelete(id);

        // deletar contato do usuário
        await userModel.findByIdAndUpdate(deleteContact.user, {$pull: {contatos: id}}, {new: true, runValidators: true});

        return res.status(200).json(deleteContact);

    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: 'Erro ao deletar um contato'});
    }
});


export default contactRoute;