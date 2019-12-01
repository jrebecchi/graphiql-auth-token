# GraphiQL-Auth-Token

[![License](https://img.shields.io/npm/l/graphiql.svg?style=flat-square)](LICENSE)

A React subclass of [GraphiQL](https://github.com/graphql/graphiql/tree/master/packages/graphiql) allowing you to add an authentication token from the user interface.

[![](https://raw.githubusercontent.com/JohannC/img/master/GraphiQL-with-token.png)]()

### Getting started

```
npm install --save graphiql-auth-token
```

Alternatively, if you are using [`yarn`](https://yarnpkg.com/):

```
yarn add graphiql-auth-token
```

GraphiQLAuthToken  offers the same properties as [GraphiQL](https://github.com/graphql/graphiql/tree/master/packages/graphiql) as it is its subclass. It just requires one more (mandatory) property: `onTokenUpdate` - a callback function that will be called whenever the user enter / update the auth token. You can use it to store the token and include it inside the `fetcher`.

```js
import React from 'react';
import ReactDOM from 'react-dom';
import GraphiQL from 'graphiql-auth-token';
import fetch from 'isomorphic-fetch';

let token =  null,

const graphQLFetcher = (graphQLParams) => {
    const headers = { 'Content-Type': 'application/json' }
    if (token){
        headers['Authentication'] = 'Bearer ' + token;
    }
    return fetch(window.location.origin + '/graphql', {
        method: 'post',
        headers,
        body: JSON.stringify(graphQLParams),
    }).then(response => response.json());
}

const onTokenUpdate = (newToken) => token = newToken;

ReactDOM.render(<GraphiQLAuthToken fetcher={graphQLFetcher} onTokenUpdate={onTokenUpdate}/>, document.body);
```

To know the rest of the properties available, please refer to [GraphiQL](https://github.com/graphql/graphiql/tree/master/packages/graphiql) documentation.