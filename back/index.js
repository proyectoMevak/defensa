import express from "express"
import cors from "cors"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
const app = express();

app.use(express.json())
app.use(cors())


const loginController = async (req,res)=>{
    try {
        const usuario = await prisma.usuario.findFirst({
            where: {
                email: req.body.email,
                password: req.body.password
            }
        })

        if(!usuario) return res.status(400).json({message: "No esta validado"})

        return res.json(usuario)
    } catch (error) {
        console.log(error)
        return res.json(error)
    }
}

const registroController = async(req,res)=>{
    try {

        delete req.body.verify_password

        const usuario = await prisma.usuario.findFirst({
            where: {
                OR: [
                    {
                        usuario: req.body.usuario,
                    },
                    {
                        email: req.body.email,
                    }
                ]
            }
        })

        if(usuario) return res.status(400).json({message: "Ya existe ese usuario con ese email o nombre de usuario"})

        
        await prisma.usuario.create({
            data: {
                ...req.body
            }
        })

        return res.json({message: "OK"})
    } catch (error) {
        console.log(error)
        return res.json(error)
    }
}

app.post("/login", loginController)
app.post("/register", registroController)

app.listen(4000, ()=>{
    console.log("Server Running on PORT 4000 !")
})
