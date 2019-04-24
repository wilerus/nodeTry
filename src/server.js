import express from 'express';
import routes from './routes/index.js';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import graphqlHTTP from 'express-graphql';
import schema from './graphql/bookSchemas.js';
import cors from 'cors';

const app = express();

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

    app.listen(3221, function() {
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
