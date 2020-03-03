import React, { Component } from 'react';
import { render } from 'react-dom';
import socketIOClient from "socket.io-client";

import GraphiQLAuthToken from '../../src'

class Demo extends Component {
    constructor() {
        super();
        this.token = null;
        this.state = {
            notification: null
        }
    }

    onTokenUpdate = (token) => {
        this.token = token;
    }

    componentDidMount() {
        this.socket = socketIOClient("http://localhost:43500");
        this.socket.on("notification", data => {
            this.setState({ notification: data })
        });
    }

    componentWillUnmount() {
        this.socket.close();
    }

    render() {

        const graphQLFetcher = (graphQLParams) => {
            const headers = { 'Content-Type': 'application/json' }
            if (this.token) {
                headers['Authentication'] = 'Bearer ' + this.token;
            }
            return fetch('http://localhost:43500/graphql', {
                method: 'post',
                headers,
                body: JSON.stringify(graphQLParams),
            }).then(response => response.json());
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
                <GraphiQLAuthToken fetcher={graphQLFetcher} onTokenUpdate={this.onTokenUpdate} notification={this.state.notification} />
            </div>
        )
    }
}

render(<Demo />, document.querySelector('#demo'))
