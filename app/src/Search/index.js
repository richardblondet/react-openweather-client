import React from "react";
import Store from "../contextStore";
import { 
    EuiPanel,
    EuiSpacer, 
    EuiFlexGroup,
    EuiFlexItem, 
    EuiFieldSearch
} from '@elastic/eui';
import fetch from 'isomorphic-unfetch'

const ENDPOINT = "https://api.openweathermap.org/data/2.5/forecast?"

export default class extends React.Component {
    static contextType = Store;
    
    constructor(props) {
        super(props);

        this.state = {
            value: 'Santo Domingo',
            isLoading: false,
            isInvalid: false
        };
    }
    componentDidMount = () => {
        this.search();
    }
    onChange = e => {
        this.setState({
          value: e.target.value,
          isLoading: e.target.value ? true : false
        }, this.search );
    };
    search = () => {
        const { value } = this.state;
        const { appid } = this.context.state;

        if( value.length < 3 ) return;

        fetch( ENDPOINT + this.getQueryString({ q: value, appid, cnt: 44, units: "metric" })).then( res => res.json() ).then( result => {
            if( result ) {
                this.setState({ isLoading: false, isInvalid: result.code !== "200" });
                this.context.dispatch({ type: "WEATHER_RESPONSE", data: result });
            }
        });
    }
    getQueryString = (obj) => {
        return '&' + Object.keys( obj ).map( key => key + '=' + obj[ key ] ).join('&');
    };
    render() {
        return (
            <div>
                <EuiSpacer size="l" />
                <EuiFlexGroup justifyContent="spaceAround">
                    <EuiFlexItem grow={false} style={{ minWidth: 380 }}>
                        <EuiPanel paddingSize="m">
                        <EuiFieldSearch
                            isLoading={this.state.isLoading}
                            isInvalid={this.state.isValid}
                            placeholder="Enter city name"
                            value={this.state.value}
                            onChange={this.onChange}
                            aria-label="Use aria labels when no actual label is in use"
                            />
                        </EuiPanel>
                    </EuiFlexItem>
                </EuiFlexGroup>
                <EuiSpacer size="xxl" />
            </div>
        );
    }
}