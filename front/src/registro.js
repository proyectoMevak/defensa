import dayjs from "dayjs"
import z from "zod"
const fechaValidada = dayjs().subtract('18', "year").toDate()
export const registroSchema = z.object({
    nombre: z.string().regex(/^[a-z ,.'-]+$/i, {message: "Caracteres invalidos"}),
    apellido: z.string().regex(/^[a-z ,.'-]+$/i, {message: "Caracteres invalidos"}),
    usuario: z.string(),
    genero: z.enum(['M','F']),
    password: z.string().min(8, {message: "Minimo 8 caracteres"}),
    verify_password: z.string().min(8, {message: "Minimo 8 caracteres"}),
    fechaNacimiento: z.date().max(fechaValidada),
    email: z.string().email({message: "Email invalido"}),
    rol: z.enum(['admin', 'empleado', 'cliente'])
})