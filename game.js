// Get elements from the DOM
const mineralsDisplay = document.getElementById('mineralsDisplay');
const mineButton = document.getElementById('mineButton');
const upgradeButton = document.getElementById('upgradeButton');
const shopButton = document.getElementById('shopButton');
const prestigeButton = document.getElementById('prestigeButton');

// Game state
let minerals = 0;
let mineralRates = { ...config.minerals.initialRates };
let upgrades = [...config.upgrades];
let prestige = 1;
let autoMiningInterval;

// Load configuration
const { minerals: mineralsConfig, upgrades: upgradesConfig, prestige: prestigeConfig } = config;

// Update minerals display
function updateMineralsDisplay() {
    mineralsDisplay.textContent = `Minerals: ${minerals} (Prestige ${prestige})`;
}

// Mine minerals function
function mineMinerals() {
    minerals += getTotalMiningRate();
    updateMineralsDisplay();
}

// Calculate total mining rate from all minerals
function getTotalMiningRate() {
    return Object.values(mineralRates).reduce((total, rate) => total + rate, 0);
}

// Upgrade function
function buyUpgrade(upgrade) {
    if (minerals >= upgrade.cost) {
        minerals -= upgrade.cost;
        upgrade.cost *= 2; // Increase cost for the next purchase
        applyUpgradeEffect(upgrade);
        updateMineralsDisplay();
    } else {
        alert('Not enough minerals to buy this upgrade!');
    }
}

// Apply upgrade effect
function applyUpgradeEffect(upgrade) {
    const mineralToUpgrade = getRandomMineral();
    mineralRates[mineralToUpgrade] *= upgrade.multiplier;
}

// Get a random mineral to apply an upgrade effect
function getRandomMineral() {
    const mineralIndex = Math.floor(Math.random() * mineralsConfig.types.length);
    return mineralsConfig.types[mineralIndex];
}

// Open shop function
function openShop() {
    const shopContent = document.getElementById('shopContent');
    shopContent.innerHTML = '';

    upgrades.forEach((upgrade) => {
        const upgradeButton = document.createElement('button');
        upgradeButton.textContent = `${upgrade.name} - Cost: ${upgrade.cost} minerals`;
        upgradeButton.addEventListener('click', () => buyUpgrade(upgrade));
        shopContent.appendChild(upgradeButton);
    });
}

// Prestige function
function prestigeGame() {
    if (minerals >= prestigeConfig.cost) {
        minerals = 0;
        mineralRates = { ...config.minerals.initialRates };
        upgrades = [...config.upgrades];
        prestige *= prestigeConfig.multiplier;
        updateMineralsDisplay();
    } else {
        alert('Not enough minerals to prestige!');
    }
}

// Event listeners
mineButton.addEventListener('click', mineMinerals);
upgradeButton.addEventListener('click', openShop);
prestigeButton.addEventListener('click', prestigeGame);

// Start auto mining when the page loads
window.onload = function () {
    autoMiningInterval = setInterval(mineMinerals, 1000); // Every 1 second
};

// Stop auto mining when the page is closed or unloaded
window.onbeforeunload = function () {
    clearInterval(autoMiningInterval);
};
