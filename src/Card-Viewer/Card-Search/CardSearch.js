import React, { Component } from 'react';
import { Search } from 'semantic-ui-react'
import CardService from '../../services/card-service';
import VersionSelector from './VersionSelector';
import './CardSearch.css'
var _ = require('lodash');

const intialState = {isLoading: false, results: [], value: '', versionA: '6.1.3', versionB: '6.1.3'};

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
    }

    handleVersionBChange(version){
        this.setState({versionB: version});
    }

    handleSearchChange (e, { value }) {
        this.setState({ isLoading: true, value });
        

        if (value.length < 1) {
            // get the current values of the version dropdowns

            this.setState({isLoading: false, result:[], value: ''});
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
        this.setState({value: result.title, results: [result]});

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
                />
                <VersionSelector
                    onVersionChange={this.handleVersionAChange}
                />
                <VersionSelector
                    onVersionChange={this.handleVersionBChange}
                />
            </div>
        );
    }
}