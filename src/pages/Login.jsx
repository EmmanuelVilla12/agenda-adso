import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {

    e.preventDefault()

    if(email === "admin@sena.com" && password === "1234"){

      login()
      navigate("/")

    }else{

      alert("Credenciales incorrectas")

    }

  }

  return (

    <div>

      <h1>Login Agenda ADSO</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button type="submit">
          Iniciar sesión
        </button>

      </form>

    </div>

  )
}
