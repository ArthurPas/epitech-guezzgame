import { RegisterForm } from '@/components/forms/RegisterForm';
import { Button } from '@/components/ui/button';

const RegisterPage = () => {
    return (
        <>
            <div className="flex justify-end items-end h-full py-[15px] px-[47px]">
                <Button variant="default" className="bg-amber-300">
                    Se connecter
                </Button>
            </div>
            <div className="w-full flex justify-center flex-col items-center gap-11 my-[50px]">
                <h1 className="text-amber-300 text-[64px] font-Bangers">S'INSCRIRE</h1>
                <RegisterForm />
            </div>
        </>
    );
};

export default RegisterPage;
