import React, { Component } from 'react';
import CardSearch from './Card-Search/CardSearch';
import CardDisplay from './Card-Display/CardDisplay';
import './CardViewer.css';

const intialState = {cardDataBase: null, cardDataOther: null};

export default class CardViewer extends Component {
    constructor(props) {
        super(props);
        this.handleCardChange = this.handleCardChange.bind(this);

        this.state = intialState;
    }

    handleCardChange(newCardDataA, newCardDataB) {
        this.setState({cardDataBase: newCardDataA, cardDataOther: newCardDataB});
    }

    render() {
        return (
            <div>
                <CardSearch
                    onCardSelect={this.handleCardChange}
                />
                <div class="cardCompareContainer">
                    <CardDisplay
                        cardData={this.state.cardDataBase}
                    />
                    <CardDisplay
                        cardData={this.state.cardDataOther}/>
                </div>
           </div>
        );
    }
}