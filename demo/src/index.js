import React, { Component } from 'react'
import { render } from 'react-dom'

import GraphiQLAuthToken from '../../src'

class Demo extends Component {
    constructor() {
        super();
        this.token = null;
    }

    onTokenUpdate = (token) => {
        this.token = token;
    }

    render() {

        const graphQLFetcher = (graphQLParams) => {
            const headers = { 'Content-Type': 'application/json' }
            if (this.token){
                headers['Authentication'] = 'Bearer ' + this.token;
            }
            return fetch('http://localhost:43500/graphql', {
                method: 'post',
                headers,
                body: JSON.stringify(graphQLParams),
            }).then(response => response.json());
        }

        const onTokenUpdate = (token) => {
            this.token = token;
        }

        const style = {
            position: 'fixed',
            height: '100%',
            width: '100%',
            left: '0px',
            top: '0px',
        }

        return (
            <div style={style}>
                <GraphiQLAuthToken fetcher={graphQLFetcher} onTokenUpdate={this.onTokenUpdate} />
            </div>
        )
    }
}

render(<Demo />, document.querySelector('#demo'))
