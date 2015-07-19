'use strict';

var React = require('react-native');
var Parse = require('parse').Parse;
Parse.initialize("h7VcrF5BLOVOhYrafF8nc3YYDjOai9vmLRFdHfwv", "yv7r2KVkfvw3Bmpsj6dnSwFYVbYkpPedDGTrJhPR");
var {
  AppRegistry,
} = React;
var App = require('./src/App');
AppRegistry.registerComponent('meditrate', () => App);
