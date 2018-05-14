// require('newrelic');


const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8888;

app.use(morgan('dev'));

app.use(bodyParser.json());
// serve client files
app.use(express.static(path.join(__dirname, './public')));


const clientBundles = './public/services';
const serverBundles = './templates/services';
const serviceConfig = require('./service-config.json');
const services = require('./loader.js')(clientBundles, serverBundles, serviceConfig);


const React = require('react');
const ReactDom = require('react-dom/server');
const Layout = require('./templates/layout');
const App = require('./templates/app');
const Scripts = require('./templates/scripts');

const renderComponents = (components, props = {}) => {
  return Object.keys(components).map(item => {
    component = React.createElement(components[item], props);
    console.log('here is component', ReactDom.renderToString(component));
    return ReactDom.renderToString(component);
  });
};

app.get('/rooms/:roomId', function (req, res) {
  let components = renderComponents(services, { room: req.params.roomId });
  console.log('here is parasm', req.params.roomId);
  res.end(Layout(
    'Dreambnb',
    App(...components),
    Scripts(Object.keys(services), req.params.roomId)
  ));
});



app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});