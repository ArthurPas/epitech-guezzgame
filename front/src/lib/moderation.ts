export const filterMessage = (message: string): string => {
    let filteredMessage = message;
    bannedWords.forEach((word, index) => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi'); 
        filteredMessage = filteredMessage.replace(regex, loveWords[index % loveWords.length]);
    });
    return filteredMessage;
};

export const loveWords = [
    'beau gosse',
    'belle gosse',
    'choupette',
    'babe',
    'gigachad',
    '🥰',
    '😍',
    'prince',
    'princesse',
    'mon chou',
    'poussin',
    'rayon de soleil'
];

export const bannedWords = [
    'fils de pute',
    'fdp',
    'connard',
    'connasse',
    'salope',
    'pute',
    'enculé',
    'enculer',
    'nique ta mère',
    'ntm',
    'nvm',
    'batard',
    'merdeux',
    'salaud',
    'ordure',
    'pd',
    'ta gueule',
    'branleur',
    'tapette',
    'abruti',
    'crétin',
    'imbécile',
    'clochard',
    'va te faire',
    'salaud',
    'sale chien'
];
