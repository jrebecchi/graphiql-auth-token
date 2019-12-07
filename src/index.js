import React, { Component } from 'react'
import GraphiQL from 'graphiql';
import PropTypes from 'prop-types';
import { GraphQLSchema } from 'graphql';
import '../node_modules/graphiql/graphiql.css';
import TokenProvider from './components/TokenProvider';

export default class GraphiQLAuthToken extends GraphiQL {
    static propTypes = {
        onTokenUpdate: PropTypes.func.isRequired,
        fetcher: PropTypes.func.isRequired,
        schema: PropTypes.instanceOf(GraphQLSchema),
        query: PropTypes.string,
        variables: PropTypes.string,
        operationName: PropTypes.string,
        response: PropTypes.string,
        storage: PropTypes.shape({
            getItem: PropTypes.func,
            setItem: PropTypes.func,
            removeItem: PropTypes.func,
        }),
        defaultQuery: PropTypes.string,
        defaultVariableEditorOpen: PropTypes.bool,
        onCopyQuery: PropTypes.func,
        onEditQuery: PropTypes.func,
        onEditVariables: PropTypes.func,
        onEditOperationName: PropTypes.func,
        onToggleDocs: PropTypes.func,
        getDefaultFieldNames: PropTypes.func,
        editorTheme: PropTypes.string,
        onToggleHistory: PropTypes.func,
        ResultsTooltip: PropTypes.any,
        readOnly: PropTypes.bool,
        docExplorerOpen: PropTypes.bool,
        token: PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    onTokenUpdate = (newToken) => {
        this.props.onTokenUpdate(newToken)
    }

    render() {
        const style = {
            position: 'fixed',
            height: '100%',
            width: '100%',
            left: '0px',
            top: '0px',
        }

        return (
            <div style={style}>
                <TokenProvider onTokenUpdate={this.onTokenUpdate} />
                {super.render()}
            </div>
        )
    }
}

GraphiQLAuthToken.Logo = GraphiQL.Logo
// Configure the UI by providing this Component as a child of GraphiQL.
GraphiQLAuthToken.Toolbar = GraphiQL.Toolbar
// Export main windows/panes to be used separately if desired.
GraphiQLAuthToken.QueryEditor = GraphiQL.QueryEditor
GraphiQLAuthToken.VariableEditor = GraphiQL.VariableEditor
GraphiQLAuthToken.ResultViewer = GraphiQL.ResultViewer
// Add a button to the Toolbar.
GraphiQLAuthToken.Button = GraphiQL.Button
GraphiQLAuthToken.ToolbarButton = GraphiQL.ToolbarButton
// Add a group of buttons to the Toolbar
GraphiQLAuthToken.Group = GraphiQL.Group
// Add a menu of items to the Toolbar.
GraphiQLAuthToken.Menu = GraphiQL.Menu
GraphiQLAuthToken.MenuItem = GraphiQL.MenuItem
// Add a select-option input to the Toolbar.
GraphiQLAuthToken.Select = GraphiQL.Select
GraphiQLAuthToken.SelectOption = GraphiQL.SelectOption
// Configure the UI by providing this Component as a child of GraphiQL.
GraphiQLAuthToken.Footer = GraphiQL.Footer
GraphiQLAuthToken.formatResult = GraphiQL.formatResult
GraphiQLAuthToken.formatError = GraphiQL.formatError
//Add an input text on the top of the app to include an authentication token
GraphiQLAuthToken.TokenProvider = GraphiQL.TokenProvider