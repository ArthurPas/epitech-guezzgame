import { RegisterForm } from '@/components/forms/RegisterForm';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const RegisterPage = () => {
    return (
        <>
            <div className="flex justify-end items-end h-full py-[39px] px-[47px]">
                <Link href={'/login'}>
                    <Button variant="default" className="bg-amber-300">
                        Se connecter
                    </Button>
                </Link>
            </div>
            <div className="w-full flex justify-center flex-col items-center gap-11 my-[50px]">
                <h1 className="text-amber-300 text-[64px] font-Bangers">S'INSCRIRE</h1>
                <RegisterForm />
            </div>
        </>
    );
};

export default RegisterPage;
