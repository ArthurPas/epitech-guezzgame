import { Accordion } from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import React from 'react';

export type LoginFormProps = {};

const avatarSelection = [
    'https://cdn.discordapp.com/attachments/1156577116889034857/1255167012599238768/Avatar.png?ex=667c24df&is=667ad35f&hm=2e9daf70a4d320625ac2025dee634372461551b82c7bd15066175560246dcb5c&',
    'https://cdn.discordapp.com/attachments/1156577116889034857/1255167011605184582/Avatar2.png?ex=667c24df&is=667ad35f&hm=821efac8184476e25344ea1ccdd90bd0cff5e2dc4f407908cbc44a986e02be29&',
    'https://media.discordapp.net/attachments/1156577116889034857/1255170995694862416/724076222ef42c028ce2188e36328ff2.png?ex=667c2895&is=667ad715&hm=b91e6da7f8422c1304e7b087c257c78cf500f18fd7240436845126df797f4ece&=&format=webp&quality=lossless&width=430&height=612',
    'https://media.discordapp.net/attachments/1156577116889034857/1255170995694862416/724076222ef42c028ce2188e36328ff2.png?ex=667c2895&is=667ad715&hm=b91e6da7f8422c1304e7b087c257c78cf500f18fd7240436845126df797f4ece&=&format=webp&quality=lossless&width=430&height=612',
    'https://media.discordapp.net/attachments/1156577116889034857/1255170995694862416/724076222ef42c028ce2188e36328ff2.png?ex=667c2895&is=667ad715&hm=b91e6da7f8422c1304e7b087c257c78cf500f18fd7240436845126df797f4ece&=&format=webp&quality=lossless&width=430&height=612',
    'https://media.discordapp.net/attachments/1156577116889034857/1255170995694862416/724076222ef42c028ce2188e36328ff2.png?ex=667c2895&is=667ad715&hm=b91e6da7f8422c1304e7b087c257c78cf500f18fd7240436845126df797f4ece&=&format=webp&quality=lossless&width=430&height=612'
];

export const RegisterForm = (props: LoginFormProps) => {
    return (
        <Card className="w-[90%] xl:w-[1182px] rounded-3xl xl:h-[479px] flex justify-center flex-col bg-opacity-80">
            <CardContent className="flex flex-col gap-4 mx-3 justify-evenly my-6 w-full items-center">
                <form className="w-[100%]">
                    <div className="flex flex-col xl:flex-row justify-center items-center gap-[48px] space-y-1.5">
                        <div className="flex justify-end items-end gap-[16px]">
                            <div className="grid grid-cols-2 gap-2 mb-2">
                                {avatarSelection.map((avatar, index) => (
                                    <Avatar
                                        key={avatar}
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
                            <div className="flex flex-col items-center w-[220px]">
                                <Label htmlFor="pseudo">Pseudo</Label>
                                <Input id="pseudo" placeholder="Ton pseudo" />
                            </div>

                            <div className="flex flex-col items-center">
                                <Label htmlFor="mail">Mail</Label>
                                <Input id="mail" placeholder="Ton mail" />
                            </div>
                            <div className="flex flex-col items-center">
                                <Label htmlFor="password">Mot de passe</Label>
                                <Input id="password" placeholder="Ton mot de passe" />
                            </div>
                            <div className="flex flex-col items-center">
                                <Label htmlFor="confirm-password">Confirmation</Label>
                                <Input id="confirm-password" placeholder="Confirmation du mot de passe" />
                            </div>
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="items-center justify-center justify-self-center">
                <Button className="bg-amber-300 flex " variant={'default'}>
                    S'inscrire
                </Button>
            </CardFooter>
        </Card>
    );
};
