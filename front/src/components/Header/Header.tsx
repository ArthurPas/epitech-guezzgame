import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { UserRound } from 'lucide-react';
import { ShoppingBag } from 'lucide-react';
import { CircleHelp } from 'lucide-react';
import { Backpack } from 'lucide-react';
import { Play } from 'lucide-react';

export const Header = () => {
    return (
        <nav className="backdrop-blur-sm  shadow-lg h-[85px] flex justify-between items-center pl-6 pr-12">
            <div>
                <Link href={'/'}>
                    <Image src="/guezgame-logo-horizontal.png" alt="GuezGame logo" width={250} height={100} className="mt-[96px]" />
                </Link>
            </div>
            <div className="flex gap-2">
                <Link href={'/helpcenter'}>
                    <Button variant="reverse" className="rounded-lg shadow">
                        <CircleHelp />
                    </Button>
                </Link>
                {/* A n'afficher que lorsque connecté */}
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
                    <Button variant="reverse" className="rounded-lg shadow ">
                        <ShoppingBag />
                    </Button>
                </Link>
                <Link href={'/room'}>
                    <Button variant="reverse" className="rounded-lg shadow bg-gradient-to-b from-amber-300 to-amber-500">
                        <Play />
                    </Button>
                </Link>
                {/* A n'affiche que lorsque non connecté */}
                <Link href={'/'}>
                    <Button variant="reverse" className="rounded-lg shadow">
                        Se connecter
                    </Button>
                </Link>
                <Link href={'/register'}>
                    <Button variant="reverse" className="rounded-lg shadow bg-gradient-to-b from-amber-300 to-amber-500">
                        Créer son compte
                    </Button>
                </Link>
            </div>
        </nav>
    );
};
