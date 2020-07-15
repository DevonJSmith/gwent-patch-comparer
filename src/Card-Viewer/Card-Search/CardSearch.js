import React, { Component } from 'react';
import { Search } from 'semantic-ui-react'
import CardService from '../../services/card-service';
import VersionSelector from './VersionSelector';
import './CardSearch.css'
var _ = require('lodash');

const intialState = {isLoading: false, results: [], value: '', versionA: '6.1.3', versionB: '6.1.3', cardId: null};

export default class CardSearch extends Component {
    constructor(props) {
        super(props);
        this.state = intialState;
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleVersionAChange = this.handleVersionAChange.bind(this);
        this.handleVersionBChange = this.handleVersionBChange.bind(this);
        this.handleResultSelect = this.handleResultSelect.bind(this);
    }

    handleVersionAChange (version) {
        this.setState({versionA: version});

        // if cardMetadataA is set, reload with the selected version
        if(this.state.cardId) {
            let cardMetaDataA = CardService.retrieveCardData(this.state.cardId, version);
            let cardMetaDataB = CardService.retrieveCardData(this.state.cardId, this.state.versionB);
            this.props.onCardSelect(cardMetaDataA, cardMetaDataB);
        }
    }

    handleVersionBChange(version){
        this.setState({versionB: version});

        // if cardMetadataA is set, reload with the selected version
        if(this.state.cardId) {
            let cardMetaDataA = CardService.retrieveCardData(this.state.cardId, this.state.versionA);
            let cardMetaDataB = CardService.retrieveCardData(this.state.cardId, version);
            this.props.onCardSelect(cardMetaDataA, cardMetaDataB);
        }
    }

    handleSearchChange (e, { value }) {
        this.setState({ isLoading: true, value });
        

        if (value.length < 1) {
            // get the current values of the version dropdowns

            this.setState({isLoading: false, result:[], value: '', cardId: null});
        }

        // use the higher version when searching for cards
        let version = this.state.versionA;
        if(parseInt(this.state.versionB.replace('.','')) > parseInt(this.state.versionA.replace('.',''))){
            version = this.state.versionB;
        }

        var searchResults = CardService.findCardsByName(value, version);
        
        this.setState({isLoading: false, value: value, results: searchResults});
    }

    handleResultSelect (e, { result }) {
        // update the current value
        this.setState({value: result.title, results: [result], cardId: result.id});

        var cardMetaDataA = CardService.retrieveCardData(result.id, this.state.versionA);
        var cardMetaDataB = CardService.retrieveCardData(result.id, this.state.versionB);
        this.props.onCardSelect(cardMetaDataA, cardMetaDataB);
    }

    render() {
        const {isLoading, results, value} = this.state;
        return (
            <div class='SearchContainer'>
                <Search 
                    loading= {isLoading}
                    onSearchChange={_.debounce(this.handleSearchChange, 500, {
                    leading: true
                    })}
                    onResultSelect={this.handleResultSelect}
                    results= {results}
                    value={value}
                    size={"big"}
                />
                <div class='VersionSelectorContainer'>
                    <VersionSelector
                        onVersionChange={this.handleVersionAChange}
                    />
                    <VersionSelector
                        onVersionChange={this.handleVersionBChange}
                    />
                </div>
            </div>
        );
    }
}