import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormLabel, FormMessage } from '@/components/ui/form';
import { RegisterSchemaType, registerSchema } from '@/interfaces/auth';
import { register, useRegister } from '@/hooks/auth';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const avatarSelection = [
    'https://res.cloudinary.com/dxaqv2hww/image/upload/v1720513516/shrek_3_ys5had.webp',
    'https://res.cloudinary.com/dxaqv2hww/image/upload/v1720513515/shrek_2_qhzd28.webp',
    'https://res.cloudinary.com/dxaqv2hww/image/upload/v1720513518/shrek_1_kfksjx.webp',
    'https://res.cloudinary.com/dxaqv2hww/image/upload/v1720513515/shrek_4_vnuik2.webp',
    'https://res.cloudinary.com/dxaqv2hww/image/upload/v1720513515/shrek_6_ulmi7r.webp',
    'https://res.cloudinary.com/dxaqv2hww/image/upload/v1720513515/shrek_5_efoxwz.webp'
];

export const RegisterForm = () => {
    const { mutate } = useRegister();
    const { toast } = useToast();
    const router = useRouter();
    const [selectedProfilePic, setSelectedProfilePic] = useState(
        'https://res.cloudinary.com/dxaqv2hww/image/upload/v1720445553/shrek_3_q2izv4.webp'
    );

    const form = useForm<RegisterSchemaType>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            login: '',
            mail: '',
            password: '',
            picture: selectedProfilePic
        }
    });

    useEffect(() => {
        form.setValue('picture', selectedProfilePic);
    }, [selectedProfilePic, form]);

    const onSubmit = async (data: RegisterSchemaType) => {
        await mutate(data, {
            onSuccess: () => {
                toast({ description: 'Inscription réussie' });
                router.push('/login');
            },
            onError: (error) => {
                toast({ description: error.message });
            }
        });
    };

    return (
        <Card className="w-[90%] xl:w-[1182px] rounded-3xl xl:h-[479px] flex justify-center flex-col bg-opacity-80 mb-[6rem]">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-[100%]">
                    <CardContent className="flex flex-col gap-4 mx-3 justify-evenly my-6 w-full items-center">
                        <div className="flex flex-col xl:flex-row justify-center items-center gap-[48px] space-y-1.5">
                            <div className="flex justify-end items-end gap-[16px]">
                                <div className="grid grid-cols-2 gap-2 mb-2">
                                    {avatarSelection.map((avatar, index) => (
                                        <Avatar
                                            onClick={() => setSelectedProfilePic(avatarSelection[index])}
                                            key={Math.random()}
                                            className="w-[50px] h-[50px] border-[1.7px] hover:cursor-pointer inline-flex items-center text-text justify-center whitespace-nowrap rounded-base text-sm font-base ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-main border-border dark:border-darkBorder shadow-light dark:shadow-dark hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none"
                                        >
                                            <AvatarImage src={avatarSelection[index]} />
                                            <AvatarFallback>SB</AvatarFallback>
                                        </Avatar>
                                    ))}
                                </div>
                                <div className="flex flex-col items-center">
                                    <Label htmlFor="pseudo">Avatar</Label>
                                    <Avatar className="w-[150px] md:w-[200px] h-[200px] border-[2.5px]">
                                        <AvatarImage src={selectedProfilePic} />
                                        <AvatarFallback>SB</AvatarFallback>
                                    </Avatar>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="login"
                                    render={({ field }) => (
                                        <div className="flex flex-col items-center min-w-[220px]">
                                            <FormLabel htmlFor="pseudo">Pseudo</FormLabel>
                                            <FormControl>
                                                <Input id="pseudo" type="text" placeholder="Ton pseudo" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </div>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="mail"
                                    render={({ field }) => (
                                        <div className="flex flex-col items-center">
                                            {' '}
                                            <FormLabel htmlFor="mail">Mail</FormLabel>
                                            <FormControl>
                                                <Input id="mail" placeholder="Ton mail" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </div>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <div className="flex flex-col items-center">
                                            <FormLabel htmlFor="password">Mot de passe</FormLabel>
                                            <FormControl>
                                                <Input id="password" type="password" placeholder="Ton mot de passe" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </div>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <div className="flex flex-col items-center">
                                            <FormLabel htmlFor="confirm-password">Confirmation</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    id="confirm-password"
                                                    placeholder="Confirmation du mot de passe"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </div>
                                    )}
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="items-center justify-center justify-self-center">
                        <Button type="submit" className="bg-amber-300 flex " variant={'default'}>
                            S'inscrire
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
};
