import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { LoginSchemaType, RegisterSchemaType, loginSchema, registerSchema } from '@/interfaces/auth';
import { useLogin } from '@/hooks/auth';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/router';

export type LoginFormProps = {};

export const LoginForm = (props: LoginFormProps) => {
    const { mutate } = useLogin();
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            login: '',
            password: ''
        }
    });

    const onSubmit = async (data: LoginSchemaType) => {
        await mutate(data, {
            onSuccess: () => {
                toast({ description: 'Connexion réussie' });
                router.push('/');
            },
            onError: (error) => {
                toast({ description: error.message });
            }
        });
    };

    return (
        <Card className="w-[90%] xl:w-[70%] rounded-3xl xl:h-[371px] flex justify-center bg-purple-300 bg-opacity-75 mb-[6rem]">
            <CardContent className="flex-col xl:flex-row flex mx-3 justify-center gap-[60px] xl:gap-[100px] my-6 w-full items-center">
                <form>
                    <div className="grid w-full items-center gap-2">
                        <div className="flex flex-col items-center">
                            <Label htmlFor="email">Anonymous</Label>
                            <Input id="email" placeholder="Identifiant" />
                        </div>
                        <Button className="bg-amber-300 mt-3" variant={'default'}>
                            Jouer
                        </Button>
                    </div>
                </form>
                <Separator className="hidden xl:block bg-white w-[1px] h-[200px] rounded-2xl" orientation="vertical" />
                <Separator className="xl:hidden bg-white w-[200px] h-[1px] rounded-2xl" orientation="horizontal" />
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="grid w-full items-center gap-2">
                                <div className="flex flex-col items-center">
                                    <FormField
                                        control={form.control}
                                        name="login"
                                        render={({ field }) => (
                                            <div className="flex flex-col items-center min-w-[220px]">
                                                <FormLabel htmlFor="mail">Email</FormLabel>
                                                <FormControl>
                                                    <Input id="mail" placeholder="Ton pseudo" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </div>
                                        )}
                                    />
                                </div>
                                <div className="flex flex-col items-center">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <div className="flex flex-col items-center min-w-[220px]">
                                                <FormLabel htmlFor="password">Mot de passe</FormLabel>
                                                <FormControl>
                                                    <Input id="password" type="password" placeholder="Ton mot de passe" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </div>
                                        )}
                                    />
                                </div>
                                <Button type="submit" className="bg-amber-300 mt-3">
                                    Connexion
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </CardContent>
        </Card>
    );
};
