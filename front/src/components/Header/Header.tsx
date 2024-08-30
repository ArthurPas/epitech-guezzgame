import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { UserRound, ShoppingBag, CircleHelp, Backpack, Play } from 'lucide-react';
import { useIsLoggedIn } from '@/hooks/auth';

export const Header = () => {
    const [isMounted, setIsMounted] = useState(false);
    const isLoggedIn = useIsLoggedIn();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <nav className="backdrop-blur-sm shadow-lg h-[85px] flex justify-between items-center pl-6 pr-12">
            <div>
                <Link href={'/'}>
                    <Image src="/guezgame-logo-horizontal.png" alt="GuezGame logo" width={250} height={100} className="mt-[96px]" />
                </Link>
            </div>
            <div className="flex gap-2">
                {isLoggedIn ? (
                    <div className="flex gap-2">
                        <Link href={'/helpcenter'}>
                            <Button variant="reverse" className="rounded-lg shadow">
                                <CircleHelp />
                            </Button>
                        </Link>
                        <Link href={'/user_profil'}>
                            <Button variant="reverse" className="rounded-lg shadow">
                                <UserRound />
                            </Button>
                        </Link>
                        <Link href={'/rewards'}>
                            <Button variant="reverse" className="rounded-lg shadow">
                                <Backpack />
                            </Button>
                        </Link>
                        <Link href={'/marketplace'}>
                            <Button variant="reverse" className="rounded-lg shadow">
                                <ShoppingBag />
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
