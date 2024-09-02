import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { UserRound, ShoppingBag, CircleHelp, Gift, Play, Dices, LogOut } from 'lucide-react';
import { useIsLoggedIn } from '@/hooks/auth';
import { useRouter } from 'next/router';
import { useToast } from '@/components/ui/use-toast';

export const Header = () => {
    const [isMounted, setIsMounted] = useState(false);
    const isLoggedIn = useIsLoggedIn();
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    const handleLogout = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('authToken');
            localStorage.removeItem('partyCode');
            toast({ description: 'Vous vous êtes déconnecté' });
        }
    };

    return (
        <nav className="backdrop-blur-sm shadow-lg h-[85px] flex justify-between items-center pl-6 pr-12">
            <div>
                {isLoggedIn ? (
                    <Link href={'/room'} className="hidden md:block">
                        <Image src="/guezgame-logo-horizontal.png" alt="GuezGame logo" width={250} height={100} className="mt-[96px]" />
                    </Link>
                ) : (
                    <Link href={'/'} className="hidden md:block">
                        <Image src="/guezgame-logo-horizontal.png" alt="GuezGame logo" width={250} height={100} className="mt-[96px]" />
                    </Link>
                )}
            </div>
            <div className="flex gap-2">
                {isLoggedIn ? (
                    <div className="flex gap-2">
                        <Link href={'/login'} className="hidden md:block">
                            <Button variant="reverse" onClick={handleLogout} className="rounded-lg shadow">
                                <LogOut className="rotate-180" />
                            </Button>
                        </Link>

                        <Link href={'/helpcenter'} className="hidden md:block">
                            <Button variant="reverse" className="rounded-lg shadow">
                                <CircleHelp />
                            </Button>
                        </Link>
                        <Link href={'/gambling'} className="hidden md:block">
                            <Button variant="reverse" className="rounded-lg shadow">
                                <Dices />
                            </Button>
                        </Link>
                        <Link href={'/rewards'} className="hidden sm:block">
                            <Button variant="reverse" className="rounded-lg shadow">
                                <Gift />
                            </Button>
                        </Link>
                        <Link href={'/guezzmarket'} className="hidden xs:block">
                            <Button variant="reverse" className="rounded-lg shadow">
                                <ShoppingBag />
                            </Button>
                        </Link>
                        <Link href={'/user_profil'}>
                            <Button variant="reverse" className="rounded-lg shadow">
                                <UserRound />
                            </Button>
                        </Link>
                        <Link href={'/room'}>
                            <Button variant="reverse" className="rounded-lg shadow bg-gradient-to-b from-amber-300 to-amber-500">
                                <span className="mr-1 font-bold">PLAY</span>
                                <Play />
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <>
                        <Link href={'/'}>
                            <Button variant="reverse" className="rounded-lg shadow font-bold">
                                Se connecter
                            </Button>
                        </Link>
                        <Link href={'/register'}>
                            <Button variant="reverse" className="rounded-lg shadow bg-gradient-to-b from-amber-300 to-amber-500 font-bold">
                                Créer son compte
                            </Button>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};
