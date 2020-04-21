import React, { Component } from 'react';

export default class CardDisplay extends Component {
    render() {
        let cardImage;
        if (this.props && this.props.cardData) {
            cardImage = <img src={require(`../../data/Card_Art/${this.props.cardData.artId}.png`)}></img>
        }
        return (
            <div>
                {cardImage}
            </div>
        );
    }
}