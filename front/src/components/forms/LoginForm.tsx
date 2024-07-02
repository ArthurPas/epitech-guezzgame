import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RegisterSchemaType, registerSchema } from '@/interfaces/auth';

export type LoginFormProps = {};

export const LoginForm = (props: LoginFormProps) => {
    return (
        <Card className="w-[90%] xl:w-1/2 rounded-3xl xl:h-[371px] flex justify-center bg-opacity-80 mb-[6rem]">
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
                    <form>
                        <div className="grid w-full items-center gap-2">
                            <div className="flex flex-col items-center">
                                <Label htmlFor="name">Pseudo</Label>
                                <Input id="name" placeholder="Ton pseudo" />
                            </div>
                            <div className="flex flex-col items-center">
                                <Label htmlFor="password">Mot de passe</Label>
                                <Input id="password" placeholder="Ton mot de passe" />
                            </div>
                            <Button className="bg-amber-300 mt-3">Connexion</Button>
                        </div>
                    </form>
                </div>
            </CardContent>
        </Card>
    );
};
