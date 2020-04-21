import React, { Component } from 'react';
import CardSearch from './Card-Search/CardSearch';
import CardDisplay from './Card-Display/CardDisplay';

const intialState = {cardData: null};

export default class CardViewer extends Component {
    constructor(props) {
        super(props);
        this.handleCardChange = this.handleCardChange.bind(this);

        this.state = intialState;
    }

    handleCardChange(newCardData) {
        this.setState({cardData: newCardData});
    }

    render() {
        return (
            <div>
                <CardSearch
                    onCardSelect={this.handleCardChange}
                />
                <CardDisplay
                    cardData={this.state.cardData}
                />
           </div>
        );
    }
}