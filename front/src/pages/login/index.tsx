import { LoginForm } from '@/components/forms/LoginForm';

const LoginPage = () => {
    return (
        <>
            <div className="w-full flex justify-center flex-col items-center gap-11 mt-[85px] mb-[50px]">
                <h1 className="text-amber-400 text-[64px] font-Bangers">SE CONNECTER</h1>
                <LoginForm />
            </div>
        </>
    );
};

export default LoginPage;
