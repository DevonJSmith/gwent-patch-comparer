import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';

export default class VersionSelector extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);

         // populate the version options list
         var versionOptions = [
             {
                 key: '6.1.3',
                 value: '6.1.3',
                 text: 'v6.1.3'
             },
             {
                 key: '7.0.1',
                 value: '7.0.1',
                 text: 'v7.0.1'
             }
         ];

        this.state = {options: versionOptions, selectedValue: ''};
    }
    

    handleChange(event, data) {
        this.props.onVersionChange(data.value);
    }

    render() {
        return (
            <Dropdown
                options= {this.state.options}
                defaultValue={this.state.options[0].value}
                selection
                onChange={this.handleChange}
            />
        );
    }
}