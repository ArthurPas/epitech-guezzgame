import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';

interface QuestionFaq {
    id: number;
    type: string;
    questionFaq: string;
    reponse: string;
}

const questionsData: QuestionFaq[] = [
    {
        id: 1,
        type: 'general',
        questionFaq: "Qu'est-ce que c'est GuezzGame ?",
        reponse: 'Une application pour jouer partout et tout le temps avec tes potes !'
    },
    {
        id: 5,
        type: 'general',
        questionFaq: 'Que faire si je rencontre un problème technique ?',
        reponse: 'Si tu tombes sur un problème technique, contacte-nous à cette adresse : support@guezzgame.com.'
    },
    {
        id: 2,
        type: 'compte',
        questionFaq: 'Est-ce que je suis obligé(e) de créer un compte pour jouer ?',
        reponse: "Non ! Tu peux t'identifier en tant qu'anonyme et commencer à jouer."
    },
    {
        id: 4,
        type: 'compte',
        questionFaq: 'Comment je peux créer un compte ?',
        reponse: 'Rends-toi sur la page de connexion et clique sur Créer mon compte.'
    },
    {
        id: 7,
        type: 'compte',
        questionFaq: 'Comment réinitialiser mon mot de passe ?',
        reponse: 'Rends-toi sur la page de connexion et clique sur Réinitialiser mon mot de passe.'
    },
    {
        id: 3,
        type: 'jeux',
        questionFaq: 'Comment je peux rejoindre une partie multijoueur ?',
        reponse:
            "Rends-toi sur la page de création de room en étant connecté(e) ou non, puis entre l'id de la room que tu veux rejoindre ou crée la tienne !"
    },
    {
        id: 6,
        type: 'securite',
        questionFaq: 'Mes informations personnelles sont-elles sécurisées ?',
        reponse: 'Oui ! Nous prenons cela très au sérieux et utilisons des protocoles de cryptage pour protéger tes données.'
    }
];

const sections = [
    { title: 'Général', type: 'general' },
    { title: 'Compte', type: 'compte' },
    { title: 'Jeux', type: 'jeux' },
    { title: 'Sécurité et confidentialité', type: 'securite' }
];

const renderQuestions = (questions: QuestionFaq[]) => {
    return questions.map((question) => (
        <div key={question.id} className="flex items-start mb-3">
            <div className="flex flex-col text-center w-full h-22 justify-between items-center px-4 py-4 shadow rounded-full bg-white">
                <p className="text-center text-[#37034E] text-medium font-bold pb-[0px]">{question.questionFaq}</p>
                <p className="text-center text-sm font-bold">{question.reponse}</p>
            </div>
        </div>
    ));
};

const Index = () => {
    return (
        <div className="grid gap min-h-screen w-full">
            <div className="grid place-items-center mb-8 mt-[4rem]">
                <h1 className="text-amber-400 text-[64px]">Helpcenter</h1>
            </div>

            <div className="mb-[8rem]">
                <Card className="w-[60%] h-[90%] mx-auto rounded-3xl mb-5 flex flex-col justify-center bg-purple-300 bg-opacity-75">
                    <CardContent className="p-8 max-h-[600px] overflow-y-auto flex flex-col justify-center items-center mx-1">
                        <ScrollArea className="h-[600px] px-4 w-full rounded-md">
                            {sections.map((section) => (
                                <div key={section.type}>
                                    <h2 className="text-center text-[25px] font-bold pt-4 pb-[6px] text-purple-950">{section.title}</h2>
                                    {renderQuestions(questionsData.filter((q) => q.type === section.type))}
                                </div>
                            ))}
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Index;
