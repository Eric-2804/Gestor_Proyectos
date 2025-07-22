import State from '../models/State.js';

export const createState = async (req,res) => {


try {
    
    const newState = new State ( req.body)
    await newState.save()
    res.status(201).json({message:'Estado creado correctamente', State: newState})
}catch (error){
 res.status(400).json({message:'Error al crear el estado ', error: error.message})
}
}


export const getStates = async (req,res) => {

try {

const states = await State.find ()
res.status(200).json(states)


}catch (error){
res.status(400).json({message:'Error al obtener los estados',error: error.message})
}
}


export const deactivateState = async (req,res) => {
    try{
        const {id}= req.params
        const state = await State.findByIdAndUpdate(id,{isActive : false},{new:true})
        res.status(200).json
    }
}









