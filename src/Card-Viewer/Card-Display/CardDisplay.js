import React, { Component } from 'react';
import './CardDisplay.css';

export default class CardDisplay extends Component {
    render() {
        let card = this.generateCard();
        let description = this.generateDescription();
        return (
            <div class='displayContainer'>
                {card}
                {description}
            </div>
        );
    }

    generateCard() {
        let cardElement;
        if (this.props && this.props.cardData) {
            let cardArt = require(`../../data/Card_Art/${this.props.cardData.artId}.png`);
            let cardFrame = require(`../../data/Card_Art/ui/${this.props.cardData.type}_frame.png`);
            let cardBanner = require(`../../data/Card_Art/ui/${this.props.cardData.faction}_banner.png`);
            
            let provisionElement;
            if (this.props.cardData.provision) {
                let provisionIcon = require(`../../data/Card_Art/ui/provision_icon.png`);
                let cardProvision = require(`../../data/Card_Art/ui/${this.props.cardData.faction}_provisions.png`);
                
                provisionElement = 
                    <>
                    <div class='cardElement cardProvisions' style={{backgroundImage: `url(${cardProvision})`}}>
                        {this.props.cardData.provision}
                    </div>
                    <div class='cardElement provisionIcon' style={{backgroundImage: `url(${provisionIcon})`}}></div>
                    </>;
            }

            // If special card, find the correct icon
            let specialIcon;
            if (!this.props.cardData.strength && this.props.cardData.cardType !== 'Unit') {
                // stratagem
                if (this.props.cardData.cardType === 'Strategem') {
                    specialIcon = <div class='cardElement strategemIcon' style={{backgroundImage: `url(${require('../../data/Card_Art/ui/stratagem_icon.png')})`}}></div>;
                }
                // artifact
                else if(this.props.cardData.cardType === 'Artifact') {
                    specialIcon = <div class='cardElement artifactIcon' style={{backgroundImage: `url(${require('../../data/Card_Art/ui/artifact_icon.png')})`}}></div>;
                }
                // all others - special icon
                else {
                    specialIcon = <div class='cardElement specialIcon' style={{backgroundImage: `url(${require('../../data/Card_Art/ui/special_icon.png')})`}}></div>;
                }
            }

            // Armor element
            let armorElement;
            if (this.props.cardData.armor) {
                armorElement = 
                    <div class='cardElement armorIcon' style={{backgroundImage: `url(${require('../../data/Card_Art/ui/armor_icon.png')})`}}>
                        {this.props.cardData.armor}
                    </div>;
            }

            let rarityImage = require(`../../data/Card_Art/ui/${this.props.cardData.rarity}_rarity.png`);
            cardElement = 
                <div class='cardContainer'>
                    {/* Card Art */}
                    <div class='cardElement cardArt' style={{backgroundImage: `url(${cardArt})`}}></div>
                    {/* Card Frame */}
                    <div class='cardElement cardArt' style={{backgroundImage:`url(${cardFrame})`}}></div>
                    {/* Banner */}
                    <div class='cardElement cardBanner' style={{backgroundImage: `url(${cardBanner})`}}>
                        {this.props.cardData.strength ? this.props.cardData.strength : ''}
                    </div>
                    {/* Special Icon (optional) */}
                    {specialIcon}
                    {/* Provisions (Units)*/}
                    {provisionElement}
                    {/* Armor (optional)*/}
                    {armorElement}
                    {/* Rarity Gem */}
                    <div class='cardElement rarityIcon' style={{backgroundImage: `url(${rarityImage})`}}></div>
                </div>;
        }

        return cardElement;
    }

    generateDescription() {
        // TODO: implement;
        let descriptionElement;

        if (this.props && this.props.cardData) {
            // description background image
            let descriptionBackground = require(`../../data/Card_Art/ui/description_background.png`);
            // header background image
            let headerImage = require(`../../data/Card_Art/ui/${this.props.cardData.faction}_header.png`);
            // divider
            let dividerImage = require(`../../data/Card_Art/ui/divider.png`);

            // category string
            let categoryString = '';
            if (this.props.cardData.categories) {
                for(let i = 0; i < this.props.cardData.categories.length; i ++) {
                    categoryString += this.props.cardData.categories[i];
                    if (i + 1 < this.props.cardData.categories.length) {
                        categoryString += ', ';
                    }
                }
            }
            // description text
            let descriptionText = this.props.cardData.infoText;
            if (this.props.cardData.keywords) {
                for(let i = 0; i < this.props.cardData.keywords.length; i++) {
                    // replace keyword regex matches with wrap divs
                    let regExp = new RegExp('(' + this.props.cardData.keywords[i] + ')', 'gi');
                    descriptionText = descriptionText.replace(regExp, '<span class="keywordText">$1</span>');
                }
            }

            descriptionElement = 
            <div class='descriptionContainer' style={{backgroundImage: `url(${descriptionBackground})`}}>
                <div class='descriptionInnerContainer'>
                    <div class='headerTextContainer' style={{backgroundImage: `url(${headerImage})`}}>
                        {/* Name */}
                        <div class='titleText'>{this.props.cardData.name}</div>
                        {/* Categories */}
                        <div class='categoryText' >{categoryString}</div>
                    </div>
                    <div class='descriptionBodyContainer'>
                        {/* Description */}
                        <div dangerouslySetInnerHTML={{__html: descriptionText}}></div>
                        {/* Divider */}
                        <div class='dividerContainer'>
                            <div class='divider' style={{backgroundImage: `url(${dividerImage})`}}></div>
                        </div>
                        {/* Flavor */}
                        <div class='flavorText'>{this.props.cardData.flavorText}</div>
                    </div>
                </div>
            </div>
        }

        return descriptionElement;
    }
}