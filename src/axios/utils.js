import axios from "axios";

export const login = async (email, password) => {
    const dataBase64 = `Basic ${window.btoa(`${email}:${password}`)}`;
    console.log({dataBase64})
    return await axios.get("http://localhost:9901/login", {headers:{authorization: dataBase64 }});
}

export const signup = async (email, password,name,username) => {
    return await axios.post("http://localhost:9901/signup", {
        data:{
            name,
            username,
            email,
            password
        }
    });
}

