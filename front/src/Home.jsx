import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

export default function Home() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(JSON.parse(localStorage.getItem("login")));
    const logout = () => {
        localStorage.removeItem("login")
        navigate("/")
    }

    useEffect(() => {
        const logged = localStorage.getItem("login")
        if (!logged) {
            navigate("/")
        }
    })

    if(!usuario) return <p>Loading</p>

    return (
        <>
            <p>{usuario.nombre} {usuario.apellido}</p>
            <button className="border bg-red-500 text-white p-4 rounded-md" onClick={logout}>Logout</button>
        </>
    )
}