import React, { Component } from 'react';
import { Search } from 'semantic-ui-react'
import CardService from '../../services/card-service';
import VersionSelector from './VersionSelector';
import './CardSearch.css'
var _ = require('lodash');

const intialState = {isLoading: false, results: [], value: '', version: '6.1.3'};

export default class CardSearch extends Component {
    constructor(props) {
        super(props);
        this.state = intialState;
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleVersionChange = this.handleVersionChange.bind(this);
        this.handleResultSelect = this.handleResultSelect.bind(this);
    }

    handleVersionChange (version) {
        this.setState({version: version});
    }

    handleSearchChange (e, { value }) {
        this.setState({ isLoading: true, value });
        

        if (value.length < 1) {
            this.setState(intialState);
        }

        var searchResults = CardService.findCardsByName(value, this.state.version);
        
        this.setState({isLoading: false, value: value, results: searchResults});
    }

    handleResultSelect (e, { result }) {
        // update the current value
        this.setState({value: result.title, results: [result]});

        var cardMetaData = CardService.retrieveCardData(result.id, this.state.version);
        this.props.onCardSelect(cardMetaData);
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
                    onVersionChange={this.handleVersionChange}
                />
            </div>
        );
    }
}