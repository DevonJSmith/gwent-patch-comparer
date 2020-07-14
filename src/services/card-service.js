var _ = require('lodash');
//const cardData_6_1_3 = require('../data/6.1.3/cards.json');


export default class CardService {
    static findCardsByName(searchVal, versionNum) {
        var cardData = require(`../data/${versionNum}/cards.json`);

        if (cardData) {
            return _.toPairs(cardData)
            .filter(([key, val]) => val.name['en-US'].toLowerCase().includes(searchVal.toLowerCase()))
            .map(([key,val]) =>({id: key, title: val.name['en-US']}));
        }
    }

    static retrieveCardData(id, versionNum) {
        var cardData = require(`../data/${versionNum}/cards.json`);

        if (cardData) {
            return _.toPairs(cardData)
            .filter(([key, val]) => key === id)
            .map(([key,val]) => (
                {
                    id: key,
                    name: val.name['en-US'],
                    cardType: val.cardType,
                    categories: val.categories,
                    faction: val.faction,
                    flavorText: val.flavor['en-US'],
                    infoText: val.info['en-US'],
                    infoRawText: val.infoRaw['en-US'],
                    keywords: val.keywords,
                    loyalties: val.loyalties,
                    positions: val.positions,
                    provision: val.provision,
                    strength: val.strength,
                    armor: val.armor,
                    type: val.type,
                    artist: val.artist,
                    artId: val.variations[key +'00'].art.ingameArtId,
                    rarity: val.variations[key + '00'].rarity
                }
            ))
            .values().next().value;
        }
    }
}