const Role = require ('../MODELS/Role')



// CREAR ROL
const createRole = async (req,res) => {

try {

const {name,description} = req.body;

const exists = await Role.findOne ({name});
if (exists) return res.status(400).json({message : 'el rol ya existe '})

const newRole = new Role({name,description});
await newRole.save()

res.status(201).json({message:'Rola creado con exito',role: newRole})
}catch(error){
    res.status(500).json({message:'error al crear el rol', error: error.message})
}
}

//OBTENER ROL

const getRoles = async (req,res) => {

try {
    const roles = await Role.find ({isActive: true})
    res.status(200).json(roles)
}catch (error){

    res.status(500).json({message:'error al obtener rol',error : error.message})
}

}

const deactivatreRole = async (req, res ) => {

try {

const {id}=req.params;
await Role.finByIdAndUpdate(id,{isActive:false})
res.status(200).json({message:'rol desactivado correctamente '})
}catch (error){
    res.status(500).json({message:'error al desactivar el rol', error: error.message})
}
}


module.exports = {
    createRole,
    getRoles,
    deactivatreRole
}