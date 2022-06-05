import { Link,useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { signup } from "../../axios/utils";

const Input = (props) => (
    <input
        {...props}
        className=" bg-transparent p-4 border rounded-xl border-onix outline-none text-lg focus:border-platinum disabled:opacity-50"
    />
)

const validationSchema = yup.object({
    name: yup.string().required("Digite o seu nome"),
    username: yup.string().required("Digite o seu nome de usuário"),
    email: yup.string().required("Digite o seu email").email("E-mail inválido"),
    senha: yup.string().required("Digite a sua senha")
})

export function Signup({setSigninUser}) {
    const navigate = useNavigate();
    const formik = useFormik({
        onSubmit:async (values) => {
            try {
                const res = await signup(values.email,values.senha,values.name,values.username);
                setSigninUser(res.data);
                navigate("/");
            } catch (error) {
                if(error.response?.status === 500){
                    formik.errors.warning="Erro ao efetuar o cadastro";
                    return;
                }

                if(error.response?.data === "P2002"){
                    formik.errors.warning="Dados já existentes!";
                    return;
                }

                formik.errors.warning = error.message;
            }
        },
        validationSchema,
        validateOnMount: true,
        initialValues: {
            email: '',
            senha: '',
            name:'',
            username:'',
            warning:''
        }
    })
    return (
        <div className="flex h-full flex-col justify-center items-center space-y-6">
            <h1 className="text-3xl">Crie a sua conta</h1>
            {formik.errors.warning && <span className="text-red-500">{formik.errors.warning}</span>}
            <form className="flex flex-col space-y-6 w-1/2" onSubmit={formik.handleSubmit}>
                <div className="flex flex-col space-y-3">
                    <Input
                        name={"name"}
                        placeholder={"Nome"}
                        value={formik.values.name}
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={formik.isSubmitting}
                    />
                    {(formik.errors.name && formik.touched.name) && <span className="self-center text-sm text-red-500">{formik.errors.name}</span>}
                </div>
                <div className="flex flex-col space-y-3">
                    <Input
                        name={"username"}
                        placeholder={"Nome de usuário"}
                        value={formik.values.username}
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={formik.isSubmitting}
                    />
                    {(formik.errors.username && formik.touched.username) && <span className="self-center text-sm text-red-500">{formik.errors.username}</span>}
                </div>
                <div className="flex flex-col space-y-3">
                    <Input
                        name={"email"}
                        placeholder={"E-mail"}
                        value={formik.values.email}
                        type="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={formik.isSubmitting}
                    />
                    {(formik.errors.email && formik.touched.email) && <span className="self-center text-sm text-red-500">{formik.errors.email}</span>}

                </div>

                <div className="flex flex-col space-y-3">
                    <Input
                        name={"senha"}
                        placeholder={"Senha"}
                        value={formik.values.senha}
                        type="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={formik.isSubmitting}
                    />
                    {(formik.errors.senha && formik.touched.senha) && <span className="self-center text-sm text-red-500">{formik.errors.senha}</span>}

                </div>
                <input type="submit" className='bg-birdBlue px-4 py-2 rounded-full w-6/12 self-center text-lg disabled:opacity-50' disabled={formik.isSubmitting || !formik.isValid} value={formik.isSubmitting ? "Enviando..." : "Cadastrar"} />
            </form>
            <span className="text-sm text-silver">
                Se já possui uma conta, acesse <Link to="/login" className="text-birdBlue">Login</Link>
            </span>
        </div>
    )
}