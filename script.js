const gen = document.getElementById("generator")
const amount = document.getElementById("amount")
const upgrMessage = document.getElementById("upgradeMessage")
const bonMessage = document.getElementById("bonusMessage")
const RalMessage = document.getElementById("RalMessage")
const RalBonusMessage = document.getElementById("RalBonusMessage")
const div = document.getElementById("buttons")
const body = document.getElementsByTagName("BODY")[0]
let upgrade
let Ralsei
let DarkFountain
let TheFountain
let FountainImage
let ui
let UIButtons
let information
let button1
let button2
let button3
let button4
let fountainInfo
let allButtons
let inventory
let candiesText
let swordText
let shieldText
let battle
let battleUI
let hpText
let EnemyhpText
let LocationInFountain = 1
let chestOpened = 0
let DarkCandyOwned = 0
let SwordOwned = 5
let ShieldOwned = 5
let HP = 100
let CoolerWon = 0
let CoolerReward = 0
let CodeFound = 0
let CodeInput = [0, 0, 0, 0]
let CodeCorrect = [1, 2, 2, 1]
let CodeSolved = 0
let CodeBeingSolved = 0

let EnemyHP = 1
let cooldown = 0

let money = 3000
let bonus = 2
let upgradeUnlocked = 0
let upgradeCost = 50
let RalUnlocked = 0
let RalBonus = 0
let RalTime = 1000
let RalCost = 200
let RalTimeScreen = RalTime / 1000
let FountainUnlocked = 0

const WaterCoolerAttack = (defend, time) => {
    setTimeout(() => {
        if (EnemyHP > 0) {
            if (defend === 1) {
                let WatercoolerDamage = Math.round((22 - ShieldOwned/5*2)/2)
                if (WatercoolerDamage <= 0) {
                    WatercoolerDamage = 0
                }
                fountainInfo.innerHTML = "* The watercooler attacks you and deals " + WatercoolerDamage + " damage."
                HP -= WatercoolerDamage
                hpText.innerHTML = "Your HP: " + HP
                cooldown = 0
            } else {
                let WatercoolerDamage = 22 - ShieldOwned/5*2
                if (WatercoolerDamage <= 0) {
                    WatercoolerDamage = 2
                }
                fountainInfo.innerHTML = "* The watercooler attacks you and deals " + WatercoolerDamage + " damage."
                HP -= WatercoolerDamage
                hpText.innerHTML = "Your HP: " + HP
                cooldown = 0
            }
        }
        if (HP <= 0) {
            cooldown = 1
            HP = 0
            hpText.innerHTML = "Your HP: " + HP
            fountainInfo.innerHTML = "* You were defeated by the watercooler."
            FountainImage.src = "GameOver.png"
            setTimeout(() => {
                FountainImage.src = "Field_Location_1.jpg"
                fountainInfo.innerHTML = "* Suddenly, you are in a strange field. This place doesn't feel real."
                button1.innerHTML = "Go through door?"
                button2.innerHTML = "Go right?"
                button3.remove()
                button4.remove()
                HP = 100
                hpText.innerHTML = "Your HP: " + HP
                EnemyhpText.remove()
                EnemyHP = 1000
                LocationInFountain = 1
                cooldown = 0
            }, 3000)
        } else if (EnemyHP <= 0) {
            cooldown = 1
            EnemyHP = 0
            EnemyhpText.remove()
            HP = 100
            hpText.innerHTML = "Your HP: " + HP
            EnemyhpText.innerHTML = "Watercooler HP: " + EnemyHP
            fountainInfo.innerHTML = "* You defeated the watercooler! You win!"
            FountainImage.src = "Victory.jpg"
            button1.innerHTML = "Leave?"
            CoolerWon = 1
            button2.style.display = "none"
            button3.style.display = "none"
            button4.style.display = "none"
            setTimeout(() => {
                cooldown = 0
            }, 1)
        }
    }, time)
}

amount.innerHTML = money + " D$"

gen.addEventListener("click", () => {
    if (upgradeUnlocked !== 1) {
        if (money >= 49) {
            const upgradeButton = document.createElement("button")
            const upgrText = document.createTextNode("Upgrade generetor?")
            upgradeButton.appendChild(upgrText)
            div.appendChild(upgradeButton)
            upgradeButton.id = "upgrade"
            upgradeButton.classList.add("button")
            upgrade = document.getElementById("upgrade")
            upgradeUnlocked = 1
            upgrMessage.innerHTML = upgradeCost + " D$ needed for next upgrade"
            bonMessage.innerHTML = "Generator power: " + bonus + " D$ per click"
            upgrade.addEventListener("click", () => {
                if (upgradeUnlocked === 1) {
                    if (money >= upgradeCost) {
                        if (bonus === 2) {
                            RalMessage.innerHTML = "Congrats, you just unlocked a new purchisable item. Buy for 200 D$"
                            const RalseiButton = document.createElement("button")
                            const RalseiText = document.createTextNode("Unlock Ralsei?")
                            RalseiButton.appendChild(RalseiText)
                            div.appendChild(RalseiButton)
                            RalseiButton.id = "Ralsei"
                            RalseiButton.classList.add("button")
                            Ralsei = document.getElementById("Ralsei")
                            RalUnlocked = 1
                            Ralsei.addEventListener("click", () => {
                                if (RalUnlocked === 1) {
                                    if (RalCost <= money) {
                                        if (RalBonus === 0) {
                                            money -= RalCost
                                            amount.innerHTML = money + " D$"
                                            RalBonus = 1
                                            RalCost *= 1.5
                                            Ralsei.innerHTML = "Upgrade Ralsei?"
                                            RalMessage.innerHTML = "Upgrading Ralsei makes him generate more money. Upgrade for " + RalCost + " D$?"
                                            RalBonusMessage.innerHTML = "Ralsei is producing " + RalBonus + " D$ every second."
                                        } else {
                                            money -= RalCost
                                            amount.innerHTML = money + " D$"
                                            RalBonus += 1
                                            RalBonusMessage.innerHTML = "Ralsei is producing " + RalBonus + " D$ every second."
                                            RalCost *= 1.5
                                            RalCost = Math.round(RalCost)
                                            RalMessage.innerHTML = "Upgrade Ralsei for " + RalCost + " D$?"
                                        }
                                    }
                                    else {
                                        RalMessage.innerHTML = "Ralsei: 'I'm not a slave. Please pay me enough money.'"
                                    }
                                }
                            })
                        }
                        if (bonus >= 4 && RalUnlocked === 1 && FountainUnlocked === 0) {
                            const DarkButton = document.createElement("button")
                            const DarkText = document.createTextNode("Create a dark fountain?")
                            DarkButton.appendChild(DarkText)
                            div.appendChild(DarkButton)
                            DarkButton.id = "DarkFountain"
                            DarkButton.classList.add("button")
                            DarkFountain = document.getElementById("DarkFountain")
                            FountainUnlocked = 1
                            DarkFountain.addEventListener("click", () => {
                                if (FountainUnlocked === 1) {
                                    const Fountain = document.createElement("div")
                                    body.appendChild(Fountain)
                                    Fountain.id = "Fountain"
                                    TheFountain = document.getElementById("Fountain")
                                    const TextDark = document.createElement("h2")
                                    const FountainText = document.createTextNode("Dark Fountain")
                                    TextDark.appendChild(FountainText)
                                    TheFountain.appendChild(TextDark)
                                    const UI = document.createElement("div")
                                    Fountain.appendChild(UI)
                                    UI.id = "ui"
                                    ui = document.getElementById("ui")
                                    const Battle = document.createElement("div")
                                    UI.appendChild(Battle)
                                    Battle.id = "BattleBox"
                                    battle = document.getElementById("BattleBox")
                                    const Image = document.createElement("img")
                                    Image.src = "Field_Location_1.jpg"
                                    Battle.appendChild(Image)
                                    Image.id = "FountainImage"
                                    FountainImage = document.getElementById("FountainImage")
                                    const BattleUI = document.createElement("div")
                                    Battle.appendChild(BattleUI)
                                    BattleUI.id = "BattleBoxUI"
                                    battleUI = document.getElementById("BattleBoxUI")
                                    const HPElement = document.createElement("p")
                                    const HPElementText = document.createTextNode("Your HP: 100")
                                    HPElement.appendChild(HPElementText)
                                    BattleUI.appendChild(HPElement)
                                    HPElement.id = "HPelement"
                                    HPElement.classList.add("BattleUIText")
                                    hpText = document.getElementById("HPelement")
                                    const UIbuttons = document.createElement("div")
                                    ui.appendChild(UIbuttons)
                                    UIbuttons.id = "UIButtons"
                                    UIButtons = document.getElementById("UIButtons")
                                    const AllButtons = document.createElement("div")
                                    UIButtons.appendChild(AllButtons)
                                    AllButtons.id = "EveryButton"
                                    allButtons = document.getElementById("EveryButton")
                                    let Button1 = document.createElement("button")
                                    let ForwardText = document.createTextNode("Go through door?")
                                    Button1.appendChild(ForwardText)
                                    allButtons.appendChild(Button1)
                                    Button1.id = "forward"
                                    Button1.classList.add("FountainButton")
                                    button1 = document.getElementById("forward")
                                    let Button2 = document.createElement("button")
                                    let RightText = document.createTextNode("Go right?")
                                    Button2.appendChild(RightText)
                                    allButtons.appendChild(Button2)
                                    Button2.id = "right"
                                    Button2.classList.add("FountainButton")
                                    button2 = document.getElementById("right")
                                    const InfoDiv = document.createElement("div")
                                    UIButtons.appendChild(InfoDiv)
                                    InfoDiv.id = "infoDiv"
                                    Information = document.getElementById("infoDiv")
                                    const FountainInfo = document.createElement("p")
                                    const FountainInfoText = document.createTextNode("* Suddenly, you are in a strange field. This place doesn't feel real.")
                                    FountainInfo.appendChild(FountainInfoText)
                                    InfoDiv.appendChild(FountainInfo)
                                    FountainInfo.id = "fountainInfo"
                                    fountainInfo = document.getElementById("fountainInfo")
                                    const Inventory = document.createElement("div")
                                    UIButtons.appendChild(Inventory)
                                    Inventory.id = "TheInventory"
                                    inventory = document.getElementById("TheInventory")
                                    const CandyAmount = document.createElement("p")
                                    const CandyAmountText = document.createTextNode("Dark candies: 0")
                                    CandyAmount.appendChild(CandyAmountText)
                                    Inventory.appendChild(CandyAmount)
                                    CandyAmount.id = "candiesOwned"
                                    CandyAmount.classList.add("InventoryText")
                                    candiesText = document.getElementById("candiesOwned")
                                    const SwordLevel = document.createElement("p")
                                    const SwordLevelText = document.createTextNode("Sword power: 5")
                                    SwordLevel.appendChild(SwordLevelText)
                                    Inventory.appendChild(SwordLevel)
                                    SwordLevel.id = "swordPower"
                                    SwordLevel.classList.add("InventoryText")
                                    swordText = document.getElementById("swordPower")
                                    const ShieldLevel = document.createElement("p")
                                    const ShieldLevelText = document.createTextNode("Shield defense: 5")
                                    ShieldLevel.appendChild(ShieldLevelText)
                                    Inventory.appendChild(ShieldLevel)
                                    ShieldLevel.id = "shieldPower"
                                    ShieldLevel.classList.add("InventoryText")
                                    shieldText = document.getElementById("shieldPower")
                                    button1.addEventListener("click", () => {
                                        if (LocationInFountain === 1) {
                                            FountainImage.src = "Field_Location_2.png"
                                            fountainInfo.innerHTML = "* Behind the door you see a chest."
                                            button1.innerHTML = "Open the chest?"
                                            button2.innerHTML = "Go back?"
                                            LocationInFountain = 2
                                        } else if (LocationInFountain === 2 && chestOpened === 0) {
                                            fountainInfo.innerHTML = "* You open the chest and find 300 D$!"
                                            money += 300
                                            amount.innerHTML = money + " D$"
                                            chestOpened = 1
                                        } else if (LocationInFountain === 2 && chestOpened === 1) {
                                            fountainInfo.innerHTML = "* The chest is empty."
                                        } else if (LocationInFountain === 3 && CodeFound === 0) {
                                            FountainImage.src = "Shop.jpg"
                                            fountainInfo.innerHTML = "* You enter the shop and the shopkeeper offers you some items."
                                            button1.innerHTML = "Buy Dark Candy for 300 D$?"
                                            button2.innerHTML = "Upgrade Sword for 500 D$?"
                                            button3.innerHTML = "Upgrade Shield for 400 D$?"
                                            button4.innerHTML = "Leave shop?"
                                            LocationInFountain = 4
                                        } else if (LocationInFountain === 4) {
                                            if (money >= 300) {
                                                money -= 300
                                                amount.innerHTML = money + " D$"
                                                DarkCandyOwned += 1
                                                fountainInfo.innerHTML = "* You bought the Dark Candy. It will restore 100 HP in battles."
                                                candiesText.innerHTML = "Dark candies: " + DarkCandyOwned
                                            } else {
                                                fountainInfo.innerHTML = "* You don't have enough money to buy the Dark Candy."
                                            }
                                        } else if (LocationInFountain === 5 && cooldown === 0) {
                                            fountainInfo.innerHTML = "* The sign says: Please do not look in the hole :)"
                                        } else if (LocationInFountain === 6 && cooldown === 0 && EnemyHP > 0) {
                                            cooldown = 1
                                            fountainInfo.innerHTML = "* You attack with your sword and deal " + SwordOwned + " damage."
                                            EnemyHP -= SwordOwned
                                            if (EnemyHP < 0) {
                                                EnemyHP = 0
                                            }
                                            EnemyhpText.innerHTML = "Watercooler HP: " + EnemyHP
                                            WaterCoolerAttack(0, 1000)
                                        } else if (LocationInFountain === 6 && cooldown === 0 && EnemyHP <= 0) {
                                            FountainImage.src = "Field_Location_4.png"
                                            fountainInfo.innerHTML = "* You go left and see a hole in the ground, a sign next to it and some strange looking creatures."
                                            button1.innerHTML = "Read sign?"
                                            button2.style.display = "inline-block"
                                            button2.innerHTML = "Talk to them?"
                                            button3.style.display = "inline-block"
                                            button3.innerHTML = "Go in the hole?"
                                            button4.style.display = "inline-block"
                                            button4.innerHTML = "Go back?"
                                            LocationInFountain = 5
                                        } else if (LocationInFountain === 7 && CodeBeingSolved === 0 && CodeSolved === 0) {
                                            fountainInfo.innerHTML = "* The sign says: 'Enter the correct code. Not sure? Ask around.'"
                                            CodeFound = 1
                                        } else if (LocationInFountain === 3 && CodeFound === 1) {
                                            FountainImage.src = "Shop.jpg"
                                            fountainInfo.innerHTML = "* You enter the shop and the shopkeeper offers you some items."
                                            button1.innerHTML = "Buy Dark Candy for 300 D$?"
                                            button2.innerHTML = "Upgrade Sword for 500 D$?"
                                            button3.innerHTML = "Upgrade Shield for 400 D$?"
                                            button4.innerHTML = "Ask about code?"
                                            LocationInFountain = 4
                                        }
                                    })
                                    button1.addEventListener("mouseenter", () => {
                                        if (LocationInFountain === 4) {
                                            fountainInfo.innerHTML = "* Dark Candy restores 100 HP in battles."
                                        }
                                    })
                                    button1.addEventListener("mouseleave", () => {
                                        if (LocationInFountain === 4) {
                                            fountainInfo.innerHTML = "* You enter the shop and the shopkeeper offers you some items."
                                        }
                                    })
                                    button2.addEventListener("mouseenter", () => {
                                        if (LocationInFountain === 4) {
                                            fountainInfo.innerHTML = "* The sword increases your attack power."
                                        }
                                    })
                                    button2.addEventListener("mouseleave", () => {
                                        if (LocationInFountain === 4) {
                                            fountainInfo.innerHTML = "* You enter the shop and the shopkeeper offers you some items."
                                        }
                                    })
                                    button2.addEventListener("click", () => {
                                        if (LocationInFountain === 2) {
                                            FountainImage.src = "Field_Location_1.jpg"
                                            fountainInfo.innerHTML = "* Suddenly, you are in a strange field. This place doesn't feel real."
                                            button1.innerHTML = "Go through door?"
                                            button2.innerHTML = "Go right?"
                                            LocationInFountain = 1
                                        } else if (LocationInFountain === 1) {
                                            FountainImage.src = "Field_Location_3.png"
                                            fountainInfo.innerHTML = "* You turn right and see a strange shop, as well as two other paths."
                                            button1.innerHTML = "Enter shop?"
                                            button2.innerHTML = "Go left?"
                                            let Button3 = document.createElement("button")
                                            let button3text = document.createTextNode("Go right?")
                                            Button3.appendChild(button3text)
                                            allButtons.appendChild(Button3)
                                            Button3.id = "ThirdButton"
                                            Button3.classList.add("FountainButton")
                                            button3 = document.getElementById("ThirdButton")
                                            let Button4 = document.createElement("button")
                                            let Button4Text = document.createTextNode("Go back?")
                                            Button4.appendChild(Button4Text)
                                            allButtons.appendChild(Button4)
                                            Button4.id = "fourthButton"
                                            Button4.classList.add("FountainButton")
                                            button4 = document.getElementById("fourthButton")
                                            LocationInFountain = 3
                                            button3.addEventListener("click", () => {
                                                if (LocationInFountain === 4) {
                                                    if (money >= 400) {
                                                        money -= 400
                                                        amount.innerHTML = money + " D$"
                                                        ShieldOwned += 5
                                                        fountainInfo.innerHTML = "* You upgraded the Shield. It increases your defense power."
                                                        shieldText.innerHTML = "Shield power: " + ShieldOwned
                                                    } else {
                                                        fountainInfo.innerHTML = "* You don't have enough money to upgrade the Shield."
                                                    }
                                                } else if (LocationInFountain === 5 && CoolerWon === 0) {
                                                    FountainImage.src = "watercooler.jpg"
                                                    fountainInfo.innerHTML = "* You enter the hole and find the thing that was living there, THE WATERCOOLER."
                                                    let EnemyHPElement = document.createElement("p")
                                                    let EnemyHPElementText = document.createTextNode("Watercooler HP: 1000")
                                                    EnemyHPElement.appendChild(EnemyHPElementText)
                                                    BattleUI.appendChild(EnemyHPElement)
                                                    EnemyHPElement.id = "enemyHPelement"
                                                    EnemyHPElement.classList.add("BattleUIText")
                                                    EnemyhpText = document.getElementById("enemyHPelement")
                                                    button1.innerHTML = "Fight?"
                                                    button2.innerHTML = "Beg for mercy?"
                                                    button3.innerHTML = "Use item?"
                                                    button4.innerHTML = "Defend?"
                                                    LocationInFountain = 6
                                                } else if (LocationInFountain === 6 && cooldown === 0) {
                                                    cooldown = 1
                                                    if (DarkCandyOwned > 0) {
                                                        fountainInfo.innerHTML = "* You ate a dark candy and restored 100 HP."
                                                        DarkCandyOwned -= 1
                                                        candiesText.innerHTML = "Dark candies: " + DarkCandyOwned
                                                        HP = 100
                                                        hpText.innerHTML = "Your HP: " + HP
                                                    } else {
                                                        fountainInfo.innerHTML = "* You don't have any Dark Candies left."}
                                                    WaterCoolerAttack(0, 1000)
                                                } else if (LocationInFountain === 5 && CoolerWon === 1 && cooldown === 0) {
                                                    fountainInfo.innerHTML = "* The creatures home is now safe."
                                                } else if (LocationInFountain === 3 && CodeSolved === 0) {
                                                    FountainImage.src = "Field_location_5.png"
                                                    fountainInfo.innerHTML = "* The path is blocked. There seems to be some kind of puzzle."
                                                    button1.innerHTML = "Read sign?"
                                                    button2.innerHTML = "Add spade?"
                                                    button3.innerHTML = "Add diamond?"
                                                    button4.innerHTML = "Go back?"
                                                    LocationInFountain = 7
                                                } else if (LocationInFountain === 7) {
                                                    if (CodeInput[0] === 0) {
                                                        CodeInput[0] = 2
                                                        fountainInfo.innerHTML = "* Diamond"
                                                        CodeBeingSolved = 1
                                                    } else if (CodeInput[1] === 0) {
                                                        CodeInput[1] = 2
                                                        fountainInfo.innerHTML += " diamond"
                                                    } else if (CodeInput[2] === 0) {
                                                        CodeInput[2] = 2
                                                        fountainInfo.innerHTML += " diamond"
                                                    } else if (CodeInput[3] === 0) {
                                                        CodeInput[3] = 2
                                                        fountainInfo.innerHTML += " diamond"
                                                        let equal = () => {
                                                            return JSON.stringify(CodeInput) === JSON.stringify(CodeCorrect);
                                                        }
                                                        setTimeout(() => {
                                                            if (equal()) {
                                                                fountainInfo.innerHTML = "* Congrats, that was the right code! The path opens."
                                                                CodeSolved = 1
                                                                CodeBeingSolved = 0
                                                                CodeFound = 0
                                                                button2.style.display = "none"
                                                                button3.style.display = "none"
                                                                button1.innerHTML = "Go forward?"
                                                            } else {
                                                                fountainInfo.innerHTML = "* Wrong code!"
                                                                CodeInput = [0, 0, 0, 0]
                                                                CodeBeingSolved = 0
                                                            }
                                                        }, 1000)
                                                    }
                                                } else if (LocationInFountain === 3 && CodeSolved === 1) {
                                                    FountainImage.src = "Field_location_5.png"
                                                    fountainInfo.innerHTML = "* The path is no longer blocked."
                                                    button1.innerHTML = "Go forward?"
                                                    button2.style.display = "none"
                                                    button3.style.display = "none"
                                                    button4.innerHTML = "Go back?"
                                                    LocationInFountain = 7
                                                }
                                            })
                                            button4.addEventListener("click", () => {
                                                if (LocationInFountain === 3) {
                                                    FountainImage.src = "Field_Location_1.jpg"
                                                    fountainInfo.innerHTML = "* Suddenly, you are in a strange field. This place doesn't feel real."
                                                    button1.innerHTML = "Go through door?"
                                                    button2.innerHTML = "Go right?"
                                                    button3.remove()
                                                    button4.remove()
                                                    LocationInFountain = 1
                                                } else if (LocationInFountain === 4 && CodeFound === 0) {
                                                    FountainImage.src = "Field_Location_3.png"
                                                    fountainInfo.innerHTML = "* You turn right and see a strange shop, as well as two other paths."
                                                    button1.innerHTML = "Enter shop?"
                                                    button2.innerHTML = "Go left?"
                                                    button3.innerHTML = "Go right?"
                                                    button4.innerHTML = "Go back?"
                                                    LocationInFountain = 3
                                                } else if (LocationInFountain === 5 && cooldown === 0) {
                                                    FountainImage.src = "Field_Location_3.png"
                                                    fountainInfo.innerHTML = "* You turn right and see a strange shop, as well as two other paths."
                                                    button1.innerHTML = "Enter shop?"
                                                    button2.innerHTML = "Go left?"
                                                    button3.innerHTML = "Go right?"
                                                    button4.innerHTML = "Go back?"
                                                    LocationInFountain = 3
                                                } else if (LocationInFountain === 6 && cooldown === 0) {
                                                    cooldown = 1
                                                    fountainInfo.innerHTML = "* You defend. Reduced damage taken."
                                                    WaterCoolerAttack(1, 1000)
                                                } else if (LocationInFountain === 7 && CodeBeingSolved === 0 && CodeSolved === 0) {
                                                    FountainImage.src = "Field_Location_3.png"
                                                    fountainInfo.innerHTML = "* You turn right and see a strange shop, as well as two other paths."
                                                    button1.innerHTML = "Enter shop?"
                                                    button2.innerHTML = "Go left?"
                                                    button3.innerHTML = "Go right?"
                                                    button4.innerHTML = "Go back?"
                                                    LocationInFountain = 3
                                                } else if (LocationInFountain === 4 && CodeFound === 1) {
                                                    fountainInfo.innerHTML = "* The shopkeeper says: 'A code you say? I remember the diamonds in the middle'"
                                                    setTimeout(() => {
                                                        FountainImage.src = "Field_Location_3.png"
                                                        fountainInfo.innerHTML = "* You turn right and see a strange shop, as well as two other paths."
                                                        button1.innerHTML = "Enter shop?"
                                                        button2.innerHTML = "Go left?"
                                                        button3.innerHTML = "Go right?"
                                                        button4.innerHTML = "Go back?"
                                                        LocationInFountain = 3
                                                    }, 5000)
                                                } else if (LocationInFountain === 7 && CodeBeingSolved === 0 && CodeSolved === 1) {
                                                    FountainImage.src = "Field_Location_3.png"
                                                    fountainInfo.innerHTML = "* You turn right and see a strange shop, as well as two other paths."
                                                    button1.innerHTML = "Enter shop?"
                                                    button2.style.display = "inline-block"
                                                    button2.innerHTML = "Go left?"
                                                    button3.style.display = "inline-block"
                                                    button3.innerHTML = "Go right?"
                                                    button4.innerHTML = "Go back?"
                                                    LocationInFountain = 3
                                                }
                                            })
                                            button3.addEventListener("mouseenter", () => {
                                                if (LocationInFountain === 4) {
                                                    fountainInfo.innerHTML = "* The shield increases your defense power."
                                                }
                                            })
                                            button3.addEventListener("mouseleave", () => {
                                                if (LocationInFountain === 4) {
                                                    fountainInfo.innerHTML = "* You enter the shop and the shopkeeper offers you some items."
                                                }
                                            })
                                        } else if (LocationInFountain === 4) {
                                            if (money >= 500) {
                                                money -= 500
                                                amount.innerHTML = money + " D$"
                                                SwordOwned += 5
                                                fountainInfo.innerHTML = "* You upgraded the Sword. It increases your attack power."
                                                swordText.innerHTML = "Sword power: " + SwordOwned
                                            } else {
                                                fountainInfo.innerHTML = "* You don't have enough money to upgrade the Sword."
                                            }
                                        } else if (LocationInFountain === 3) {
                                            FountainImage.src = "Field_Location_4.png"
                                            fountainInfo.innerHTML = "* You go left and see a hole in the ground, a sign next to it and some strange looking creatures."
                                            button1.innerHTML = "Read sign?"
                                            button2.innerHTML = "Talk to them?"
                                            button3.innerHTML = "Go in the hole?"
                                            button4.innerHTML = "Go back?"
                                            LocationInFountain = 5
                                        } else if (LocationInFountain === 5 && CoolerWon === 0 && CodeFound === 0) {
                                            fountainInfo.innerHTML = "* The creatures say: 'The hole was once our home, but now something scary lives there.'"
                                        } else if (LocationInFountain === 6 && cooldown === 0) {
                                            cooldown = 1
                                            fountainInfo.innerHTML = "* You begged for mercy, but the watercooler shows none."
                                            WaterCoolerAttack(0, 3000)
                                        } else if (LocationInFountain === 5 && CoolerWon === 1 && CoolerReward === 0 && CodeFound === 0) {
                                            CoolerReward = 1
                                            fountainInfo.innerHTML = "* The creatures say: 'Thank you for defeating the watercooler, our home is now safe.'"
                                            cooldown = 1
                                            setTimeout(() => {
                                                fountainInfo.innerHTML = "* The creatures are so happy that they give you 5000 D$."
                                                money += 5000
                                                amount.innerHTML = money + " D$"
                                                setTimeout(() => {
                                                    cooldown = 0
                                                }, 1)
                                            }, 5000)
                                        } else if (LocationInFountain === 5 && CoolerWon === 1 && CoolerReward === 1 && cooldown === 0 && CodeFound === 0) {
                                            fountainInfo.innerHTML = "* The creatures are happy."
                                        } else if (LocationInFountain === 5 && cooldown === 0 && CodeFound === 1) {
                                            fountainInfo.innerHTML = "* The creatures say: 'A code? We don't really know, but we think it starts and ends with spades.'"
                                        } else if (LocationInFountain === 7) {
                                            if (CodeInput[0] === 0) {
                                                CodeInput[0] = 1
                                                fountainInfo.innerHTML = "* Spade"
                                                CodeBeingSolved = 1
                                            } else if (CodeInput[1] === 0) {
                                                CodeInput[1] = 1
                                                fountainInfo.innerHTML += " spade"
                                            } else if (CodeInput[2] === 0) {
                                                CodeInput[2] = 1
                                                fountainInfo.innerHTML += " spade"
                                            } else if (CodeInput[3] === 0) {
                                                CodeInput[3] = 1
                                                fountainInfo.innerHTML += " spade"
                                                let equal = () => {
                                                    return JSON.stringify(CodeInput) === JSON.stringify(CodeCorrect);
                                                }
                                                setTimeout(() => {
                                                    if (equal()) {
                                                        fountainInfo.innerHTML = "* Congrats, that was the right code! The path opens."
                                                        CodeSolved = 1
                                                        CodeBeingSolved = 0
                                                        CodeFound = 0
                                                        button2.style.display = "none"
                                                        button3.style.display = "none"
                                                        button1.innerHTML = "Go forward?"
                                                    } else {
                                                        fountainInfo.innerHTML = "* Wrong code!"
                                                        CodeInput = [0, 0, 0, 0]
                                                        CodeBeingSolved = 0
                                                    }
                                                }, 1000)
                                            }
                                        }
                                    })
                                    DarkFountain.remove()
                                }
                            })
                        }
                        money -= upgradeCost
                        amount.innerHTML = money + " D$"
                        bonus += 1
                        bonMessage.innerHTML = "Generator power: " + bonus + " D$ per click"
                        upgradeCost *= 2
                        upgrMessage.innerHTML = upgradeCost + " D$ needed for next upgrade"
                    }
                    else {
                        upgrMessage.innerHTML = "NOT ENOUGH DARK DOLLARS! GET BACK TO WORK!"
                    }
                }
            })
        }
    }
    if (upgrMessage.innerHTML === "NOT ENOUGH DARK DOLLARS! GET BACK TO WORK!") {
        upgrMessage.innerHTML = upgradeCost + " D$ needed for next upgrade"
    }
    if (RalMessage.innerHTML === "Ralsei: 'I'm not a slave. Please pay me enough money.'" && RalBonus === 0) {
        RalMessage.innerHTML = "Congrats, you just unlocked a new purchisable item. Buy for 200 D$"
    }
    if (RalMessage.innerHTML === "Ralsei: 'I'm not a slave. Please pay me enough money.'" && RalBonus !== 0) {
        RalMessage.innerHTML = "Upgrade Ralsei for " + RalCost + " D$?"
    }
    money += bonus
    amount.innerHTML = money + " D$"
})

function RalseiMoney() {
    money += RalBonus
    amount.innerHTML = money + " D$"
}

setInterval(RalseiMoney, RalTime)