import Comment from "../models/Comment.js";

export const creatComment = async (req, res) => {

try {
    const { content, author, projectid} = req.body

    const newComment = new Comment ({ content, author, projectId})
    await newComment.save()

    res.status(201).json({message:'Comentario creado ', Comment: newComment})
}catch(error){
    res.status(500).json({message:' Error al crear comentario', error: error.message})
}
}


export const getcommentsByproject = async (req,res) => {

try {

const {projectId} = req.params
const Comments = await Comment.find ({ projectId}).populate("author", "name email")


res.status(200).json(Comments)

}catch(error){

res.status(500).json({message:'Error al obtener el comentarios', error: error.message})

}

}


export const editcomment = async (req,res) =>{

try {

    const {id} = req.params
    const {content}= req.body




    const updated = await Comment.findByIdAndUpdate(
        id,
        {content,editedAt : new Date ()},
        {new : true}

    )

    res.status(200).json({message : 'Comentario editado',Comment: updated})
}catch (error){

    res.status(400).json({message:'Error al editar el comentario', error: error.messsage})
}
}






