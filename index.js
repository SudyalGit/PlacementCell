const express = require('express');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const flashMiddleware = require('./config/flash-middleware');
const MongoStore = require('connect-mongo');

const app = express();
const port = 8000;

app.use(expressLayouts);
app.use(express.static('./assets'));

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'Employee-cookie',
    secret: 'ABC123',
    saveUninitialized: false,
    resave: false,

    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://placement:1UbhMXi13RXuCwSn@cluster0.p5gbb.mongodb.net/myDBplacementcell?retryWrites=true&w=majority',
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(flashMiddleware.setFlash);

app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes'));

app.listen(port, (err) => {
    if (err) {
        console.log(`Error in starting the server: ${err}`);
        return;
    }
    console.log(`Server is running on port: ${port}`);
});