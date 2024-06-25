import { Accordion } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export type LoginFormProps = {};

export const LoginForm = (props: LoginFormProps) => {
    return (
        <Card className="w-3/4 rounded-3xl">
            <CardContent className="flex mx-3 justify-evenly my-6 w-full items-center">
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Anonymous</Label>
                            <Input id="email" placeholder="Identifiant" />
                        </div>
                        <Button className="bg-amber-300" variant={'default'}>
                            Jouer
                        </Button>
                    </div>
                </form>
                <Separator className="bg-white w-[1px] h-[130px] rounded-2xl" orientation="vertical" />
                <div>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Pseudo</Label>
                                <Input id="name" placeholder="Ton pseudo" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Mot de passe</Label>
                                <Input id="password" placeholder="Ton mot de passe" />
                            </div>
                            <Button className="bg-amber-300">Connexion</Button>
                        </div>
                    </form>
                </div>
            </CardContent>
        </Card>
    );
};
