import {Link} from "react-router-dom"
export function NotFound(){
    return(
        <div className="flex flex-col space-y-10 justify-center items-center h-screen">
           <div className="flex h-fit space-x-5 items-center">
           <img className="w-40" src="/gif/no.gif" title="Giphy: @originals"/>
           <h2 className="text-2xl ">Página não encontrada</h2>
           </div>
           <div>Retornar para <Link to={"/login"} className="text-birdBlue">Login</Link></div>
        </div>
    )
}