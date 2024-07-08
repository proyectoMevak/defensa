import { MdOutlineMarkEmailRead } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function App() {
  const {register, handleSubmit} = useForm()
  const [error ,setError] = useState(false);
  const navigate =useNavigate();


  const onSubmit = async (datos)=>{
    setError(false)
    try {
      const resultado = await axios.post("http://localhost:4000/login", datos);
      localStorage.setItem("login", JSON.stringify(resultado.data))
      navigate("/home")
    } catch (error) {
      setError(true)
    }
  }

  useEffect(()=>{
    const logged = localStorage.getItem("login")

    if(logged){
      navigate("/home")
    }
  })

  return (
    <main className="min-h-screen flex justify-center items-center bg-[url(/fondo.avif)] text-white bg-no-repeat bg-cover">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-8 max-w-md w-full backdrop-blur-lg backdrop-brightness-90 border-2 border-white rounded-md">
        <h1 className="text-4xl font-bold text-center">Login</h1>
        {error && <p className="font-bold text-center bg-white p-2 text-red-500">Usuario o Contraseña Invalidos</p>}
        <div className="relative">
          <input {...register("email")} type="text" placeholder="Email ID" className="bg-transparent w-full placeholder:text-white placeholder:font-bold border-2 border-white p-4 outline-none rounded-full" />
          <MdOutlineMarkEmailRead size={28} className="absolute top-1/2 -translate-y-1/2 right-4 " />
        </div>
        <div className="relative">
          <input {...register("password")} type="password" placeholder="Password" className="bg-transparent w-full placeholder:text-white placeholder:font-bold border-2 border-white p-4 outline-none rounded-full" />
          <FaLock size={28} className="absolute top-1/2 -translate-y-1/2 right-4 " />
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <input id="remember" type="checkbox" />

            <label htmlFor="remember">
              Remember Me
            </label>
          </div>
          <p>Forgot Password ?</p>

        </div>
        <button className="p-4 w-full bg-white rounded-full text-black font-bold">Login</button>
        <p className="text-center">Dont have an Account? <Link to={"/registro"} className="font-bold">Register</Link></p>
      </form>
    </main>
  )
}

export default App
