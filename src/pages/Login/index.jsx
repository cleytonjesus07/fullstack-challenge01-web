import { Link, useNavigate } from "react-router-dom"
import { useFormik } from "formik";
import * as yup from "yup";
import { login } from "../../axios/utils";


const Input = (props) => (
    <input
        {...props}
        className=" bg-transparent p-4 border rounded-xl border-onix outline-none text-lg focus:border-platinum disabled:opacity-50"
    />
)

const validationSchema = yup.object({
    email: yup.string().required("Digite o seu email").email("E-mail inválido"),
    senha: yup.string().required("Digite a sua senha")
})

export function Login({ setSigninUser }) {
    const navigate = useNavigate();
    const formik = useFormik({
        onSubmit: async (values) => {
            try {

                const res = await login(values.email, values.senha);
                setSigninUser(res.data);
                navigate("/");
            } catch (error) {
                if (error.response?.status === 404) {
                    formik.errors.warning = "Usuário não encontrado";
                }
            }
        },
        validationSchema,
        validateOnMount: true,
        initialValues: {
            email: '',
            senha: '',
            warning: ''
        }
    })
    return (
        <div className="flex  justify-center h-full">
            <div className="flex-1 hidden lg:flex justify-center items-center bg-birdBlue">
                <span className="text-9xl font-bold select-none">{"</>"}</span>
            </div>
            <div className="flex flex-col flex-1 justify-center items-center space-y-6">
                <h1 className="text-3xl">Acesse a sua conta</h1>
                {formik.errors.warning && <span className="self-center text-sm text-red-500">{formik.errors.warning}</span>}
                <form className="flex flex-col space-y-6 w-1/2" onSubmit={formik.handleSubmit}>
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
                    <input type="submit" className='bg-birdBlue px-4 py-2 rounded-full w-6/12 self-center text-lg disabled:opacity-50' disabled={formik.isSubmitting || !formik.isValid} value={formik.isSubmitting ? "Enviando..." : "Log in"} />
                </form>
                <span className="text-sm text-silver">
                    Não tem conta? <Link to="/signup" className="text-birdBlue">Cadastre-se</Link>
                </span>
            </div>
        </div>
    )
}