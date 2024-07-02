import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormLabel, FormMessage } from '@/components/ui/form';
import { RegisterSchemaType, registerSchema } from '@/interfaces/auth';
import { useMutation } from '@tanstack/react-query';
import { register, useRegister } from '@/hooks/auth';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/router';

const avatarSelection = [
    'https://cdn.discordapp.com/attachments/1156577116889034857/1255167012599238768/Avatar.png?ex=667c24df&is=667ad35f&hm=2e9daf70a4d320625ac2025dee634372461551b82c7bd15066175560246dcb5c&',
    'https://cdn.discordapp.com/attachments/1156577116889034857/1255167011605184582/Avatar2.png?ex=667c24df&is=667ad35f&hm=821efac8184476e25344ea1ccdd90bd0cff5e2dc4f407908cbc44a986e02be29&',
    'https://media.discordapp.net/attachments/1156577116889034857/1255170995694862416/724076222ef42c028ce2188e36328ff2.png?ex=667c2895&is=667ad715&hm=b91e6da7f8422c1304e7b087c257c78cf500f18fd7240436845126df797f4ece&=&format=webp&quality=lossless&width=430&height=612',
    'https://media.discordapp.net/attachments/1156577116889034857/1255170995694862416/724076222ef42c028ce2188e36328ff2.png?ex=667c2895&is=667ad715&hm=b91e6da7f8422c1304e7b087c257c78cf500f18fd7240436845126df797f4ece&=&format=webp&quality=lossless&width=430&height=612',
    'https://media.discordapp.net/attachments/1156577116889034857/1255170995694862416/724076222ef42c028ce2188e36328ff2.png?ex=667c2895&is=667ad715&hm=b91e6da7f8422c1304e7b087c257c78cf500f18fd7240436845126df797f4ece&=&format=webp&quality=lossless&width=430&height=612',
    'https://media.discordapp.net/attachments/1156577116889034857/1255170995694862416/724076222ef42c028ce2188e36328ff2.png?ex=667c2895&is=667ad715&hm=b91e6da7f8422c1304e7b087c257c78cf500f18fd7240436845126df797f4ece&=&format=webp&quality=lossless&width=430&height=612'
];

export const RegisterForm = () => {
    const { mutate, isError } = useRegister();
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<RegisterSchemaType>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            login: '',
            mail: '',
            password: ''
        }
    });

    const onSubmit = async (data: RegisterSchemaType) => {
        await mutate(data);
        //TODO: handle error request
        // if (isSuccess) {
        toast({ description: 'Inscription réussie' });
        router.push('/login');
        // } else {
        // toast({ description: "Erreur lors de l'inscription" });
        // }
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
                                        <AvatarImage src={avatarSelection[0]} />
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
                                                <Input id="pseudo" placeholder="Ton pseudo" {...field} />
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
                                                <Input id="password" placeholder="Ton mot de passe" {...field} />
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
                                                <Input id="confirm-password" placeholder="Confirmation du mot de passe" {...field} />
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
