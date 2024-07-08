import { MdOutlineMarkEmailRead } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { registroSchema } from "./registro";
import dayjs from "dayjs";

function Registro() {
    const { register, handleSubmit } = useForm({
        resolver: zodResolver(registroSchema)
    })

    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const onError = (errores)=>{
        const campos = Object.keys(registroSchema.shape)
        const error = campos.find(campo => errores[campo])
        setError(errores[error].message)
    }
    const onSubmit = async (datos) => {
        setError(false)
        try {

            if(datos.password !== datos.verify_password){
                setError("Las contraseñas deben ser iguales")
                return
            }

            const resultado = await axios.post("http://localhost:4000/register", datos);
            navigate("/")
        } catch (error) {
            if(error instanceof AxiosError){
                setError(error.response.data.message)
            }
            // setError(true)
        }
    }

    const fechaValidada = dayjs().subtract('18', "year").format("YYYY-MM-DD")
    console.log(fechaValidada);
    useEffect(() => {
        const logged = localStorage.getItem("login")

        if (logged) {
            navigate("/home")
        }
    })

    return (
        <main className="min-h-screen flex justify-center items-center bg-[url(/fondo.avif)] text-white bg-no-repeat bg-cover">
            <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4 p-8 max-w-md w-full backdrop-blur-lg backdrop-brightness-90 border-2 border-white rounded-md">
                <h1 className="text-4xl font-bold text-center">Registro</h1>
                {error && <p className="font-bold text-center bg-white p-2 text-red-500">{error}</p>}

                <input {...register("nombre")} type="text" placeholder="Nombre" className="bg-transparent w-full placeholder:text-white placeholder:font-bold border-2 border-white p-4 outline-none rounded-full" />
                <input {...register("apellido")} type="text" placeholder="Apellido" className="bg-transparent w-full placeholder:text-white placeholder:font-bold border-2 border-white p-4 outline-none rounded-full" />
                <input {...register("usuario")} type="text" placeholder="Usuario" className="bg-transparent w-full placeholder:text-white placeholder:font-bold border-2 border-white p-4 outline-none rounded-full" />
                <input {...register("fechaNacimiento", {valueAsDate: true})} max={fechaValidada} type="date" className="bg-transparent w-full placeholder:text-white placeholder:font-bold border-2 border-white p-4 outline-none rounded-full" />

                <select {...register("genero")}  className="bg-transparent w-full placeholder:text-white placeholder:font-bold border-2 border-white p-4 outline-none rounded-full">
                    <option selected disabled value="">Selecciona tu genero</option>
                    <option className="text-black" value="M">Masculino</option>
                    <option className="text-black" value="F">Femenino</option>
                </select>

                <input {...register("email")} type="text" placeholder="Email ID" className="bg-transparent w-full placeholder:text-white placeholder:font-bold border-2 border-white p-4 outline-none rounded-full" />
                <input {...register("password")} type="password" placeholder="Password" className="bg-transparent w-full placeholder:text-white placeholder:font-bold border-2 border-white p-4 outline-none rounded-full" />
                <input {...register("verify_password")} type="password" placeholder="Confirmar Password" className="bg-transparent w-full placeholder:text-white placeholder:font-bold border-2 border-white p-4 outline-none rounded-full" />

                <select {...register("rol")}  className="bg-transparent w-full placeholder:text-white placeholder:font-bold border-2 border-white p-4 outline-none rounded-full" >
                    <option selected disabled value="">Selecciona tu rol</option>
                    <option className="text-black" value="admin">Admin</option>
                    <option className="text-black" value="empleado">Empleado</option>
                    <option className="text-black" value="cliente">Cliente</option>
                </select>
   
                <button className="p-4 w-full bg-white rounded-full text-black font-bold">Registro</button>
                <p className="text-center">Dont have an Account? <Link to={"/"} className="font-bold">Login</Link></p>
            </form>
        </main>
    )
}

export default Registro
