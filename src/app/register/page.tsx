import RegisterForm from "@/components/forms/RegisterForm";

export default function RegisterPage(){
    return(
        <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-6 text-center">Registrarse</h1>
            <RegisterForm />
        </div>
    )
}

