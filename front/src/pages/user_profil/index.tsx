import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Avatar, AvatarImage } from '../../components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '../../components/ui/card';
import {
    Dialog,
    DialogTrigger,
    DialogPortal,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogClose
} from '../../components/ui/dialog';
import { useGetMe } from '@/hooks/getMe';
import { useGetFriends } from '@/hooks/friends';
import { useGetUserStat } from '@/hooks/userStats';

const UserProfile: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [tempSelectedAsset, setTempSelectedAsset] = useState(null);
    const [authToken, setAuthToken] = useState<string | null>(null);

    const assets = [
        { url: 'https://example.com/asset1.png' },
        { url: 'https://example.com/asset2.png' },
        { url: 'https://example.com/asset3.png' },
        { url: 'https://example.com/asset4.png' },
        { url: 'https://example.com/asset5.png' }
    ];

    useEffect(() => {
        let token = undefined;
        if (typeof window !== 'undefined') {
            token = localStorage.getItem('authToken');
        }
        if (token) {
            setAuthToken(token);
        } else {
            console.error('No token found in localStorage');
        }
    }, []);

    const handleModalOpen = () => {
        setIsModalOpen(true);
        setTempSelectedAsset(selectedAsset);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleSave = () => {
        setSelectedAsset(tempSelectedAsset);
        setIsModalOpen(false);
    };

    const changePP = (asset) => {
        setTempSelectedAsset(asset);
    };

    const { data: user, isLoading: userLoading, isError: userError, error: userErrorDetails } = useGetMe(authToken);

    const userId = user?.id ?? 0;
    const { data: friendsData, isLoading: friendsLoading, isError: friendsError } = useGetFriends(userId);
    const { data: userStats, isLoading: statsLoading, isError: statsError } = useGetUserStat(userId);

    if (userLoading || friendsLoading || statsLoading) {
        return <div>Loading...</div>;
    }

    if (userError) {
        return <div>Error loading user data: {userErrorDetails.message}</div>;
    }

    if (friendsError) {
        return <div>Error loading friends data: {friendsError.message}</div>;
    }

    if (statsError) {
        return <div>Error loading user stats: {statsError.message}</div>;
    }

    return (
        <>
            <div className="flex justify-center mt-12">
                <div className="text-center relative">
                    <Dialog
                        onClose={handleModalClose}
                        setTempSelectedAsset={setTempSelectedAsset}
                        onSave={handleSave}
                        tempSelectedAsset={tempSelectedAsset}
                    >
                        <DialogTrigger asChild>
                            <Avatar className="w-32 h-32 md:w-48 md:h-48 mx-auto cursor-pointer hover:ring-4 ring-[#eec17e] ring-opacity-50 transition duration-300">
                                <AvatarImage src={selectedAsset?.url ?? user?.picture} />
                            </Avatar>
                        </DialogTrigger>
                        <DialogPortal>
                            <DialogContent className="p-7">
                                <DialogHeader>
                                    <DialogTitle>Edit Photo</DialogTitle>
                                </DialogHeader>
                                <div className="flex justify-center flex-wrap">
                                    {assets.map((asset, index) => (
                                        <div
                                            key={index}
                                            onClick={() => changePP(asset)}
                                            className={`flex items-center bg-purple-100 m-3 rounded-full w-20 h-20 cursor-pointer ${
                                                tempSelectedAsset?.url === asset.url ? 'ring-4 ring-[#eec17e]' : ''
                                            }`}
                                        >
                                            <div className="text-[#37034e] w-full">
                                                <img
                                                    src={asset.url}
                                                    alt={`Asset ${index}`}
                                                    className="w-full h-full rounded-full object-cover"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <DialogFooter>
                                    <DialogClose onClick={handleModalClose}>
                                        <Button className="bg-[#eec17e]">Cancel</Button>
                                    </DialogClose>
                                    <DialogClose onClick={handleSave}>
                                        <Button className="bg-[#eec17e]">Save</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </DialogPortal>
                    </Dialog>
                    <h1 className="mt-4 text-amber-400">{user?.login ?? 'Loading...'}</h1>
                    <h3 className="text-[#eec17e] text-md md:text-lg">
                        Coins: {user?.nbCoin ?? 'Loading...'} - XP: {user?.xpPoint ?? 'Loading...'}
                    </h3>
                </div>
            </div>
            <div className="flex flex-col md:flex-row p-5 pb-0 md:m-40 md:mt-0">
                <Card className="bg-purple-300 bg-opacity-75 rounded-3xl p-5 w-full md:w-1/2 mx-auto text-white mb-5 md:mr-5 md:mb-0">
                    <div className="flex flex-wrap justify-around">
                        <div className="mb-5 w-48">
                            <div className="text-2xl md:text-3xl text-center text-[#37034e] font-semibold">Niveau</div>
                            <div className="bg-purple-200 text-[#37034e] p-2 rounded text-3xl md:text-4xl mt-2 text-center">
                                {user?.level.level ?? 'Loading...'}
                            </div>
                        </div>
                        <div className="mb-5 w-48">
                            <div className="text-2xl md:text-3xl text-center text-[#37034e] font-semibold">Badge</div>
                            <img src={user?.level.badgePictureUrl ?? '/default-badge.png'} alt="Badge" className="mx-auto h-44" />
                        </div>
                        <div className="mb-5 w-48">
                            <div className="text-2xl md:text-3xl text-center text-[#37034e] font-semibold">Victoires</div>
                            <div className="bg-purple-200 text-[#37034e] p-2 rounded text-3xl md:text-4xl mt-2 text-center">
                                {userStats?.nbWin}
                            </div>
                        </div>
                        <div className="mb-5 w-48">
                            <div className="text-2xl md:text-3xl text-center text-[#37034e] font-semibold">Parties</div>
                            <div className="bg-purple-200 text-[#37034e] p-2 rounded text-3xl md:text-4xl mt-2 text-center">
                                {userStats?.nbParties}
                            </div>
                        </div>
                    </div>
                    <div className="text-lg flex justify-center">
                        <h3 className="text-[#37034e]">
                            <strong>
                                Vip depuis : <span className="text-pink-400 font-bold">{user?.isVip}</span> jours !
                            </strong>
                        </h3>
                    </div>
                </Card>

                <Card className="bg-purple-300 bg-opacity-75 rounded-3xl p-5 w-full md:w-1/2 mx-auto md:ml-5">
                    <div className="text-2xl md:text-3xl text-center mb-2 text-[#37034e] font-semibold">Mes amis</div>
                    <ScrollArea className="h-72 w-full rounded-md">
                        <div className="flex flex-col gap-4">
                            {friendsData?.map((friend, index) => (
                                <div key={index} className="flex items-center bg-purple-100 p-3 rounded-lg">
                                    <Avatar className="mr-4">
                                        <AvatarImage src={friend.picture} />
                                    </Avatar>
                                    <div className="text-[#37034e]">{friend.login}</div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </Card>
            </div>
        </>
    );
};

export default UserProfile;
