const express = require('express');
const app = express();
const routes = require('./routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql/bookSchemas');
const cors = require('cors');

async function launchApplication() {
    app.use(bodyParser.json({ limit: '50mb' }));

    app.use(routes);

    app.use('*', cors());
    app.use(
        '/graphql',
        cors(),
        graphqlHTTP({
            schema: schema,
            rootValue: global,
            graphiql: true
        })
    );

    app.listen(3000, function() {
        console.log('Example app listening on port 3000!');
    });
    try {
        await mongoose.connect('mongodb://localhost:27017/animals', {
            useNewUrlParser: true
        });

        console.log('connection successful');
    } catch (e) {
        console.error(e);
    }
}

launchApplication();
