import { RegisterForm } from '@/components/forms/RegisterForm';

const RegisterPage = () => {
    return (
        <>
            <div className="w-full flex justify-center flex-col items-center gap-11 mt-[85px] mb-[50px]">
                <h1 className="text-amber-300 text-[64px] font-Bangers">S'INSCRIRE</h1>
                <RegisterForm />
            </div>
        </>
    );
};

export default RegisterPage;
