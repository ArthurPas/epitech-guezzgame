import { LoginForm } from '@/components/forms/LoginForm';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const LoginPage = () => {
    console.log(`${process.env.NEXT_PUBLIC_API_URL}/login`);

    return (
        <>
            <div className="flex justify-end items-end h-full py-[39px] px-[47px]">
                <Link href={'/register'}>
                    <Button variant="default" className="bg-amber-300">
                        Créer son compte
                    </Button>
                </Link>
            </div>
            <div className="w-full flex justify-center flex-col items-center gap-11 my-[50px]">
                <h1 className="text-amber-300 text-[64px] font-Bangers">SE CONNECTER</h1>
                <LoginForm />
            </div>
        </>
    );
};

export default LoginPage;
