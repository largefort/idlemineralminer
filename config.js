// Configuration settings for the game
const config = {
    minerals: {
        types: ['Iron', 'Gold', 'Diamond'],
        initialRates: {
            Iron: 1,
            Gold: 0,
            Diamond: 0,
        },
    },
    upgrades: [
        { id: 'upgrade1', name: 'Efficiency Upgrade', cost: 10, multiplier: 2 },
        { id: 'upgrade2', name: 'Auto Mining Upgrade', cost: 20, multiplier: 2 },
    ],
    prestige: {
        cost: 100,
        multiplier: 2,
    },
};
