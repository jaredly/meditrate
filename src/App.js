
var React = require('react-native');
var {
  NavigatorIOS,
  TouchableHighlight,
  AsycStorage,
  Text,
  View,
} = React;
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

var Login = require('./Login');
var Translations = require('./Translations');

var App = React.createClass({
  mixins: [ParseReact.Mixin],
  observe() {
    return {
      user: ParseReact.currentUser,
    };
  },
  render() {
    if (!this.data.user) {
      return <Login onLogin={() => this.setState({loggedIn: true})} />;
    }
    return <Translations user={this.data.user} />;
  }
});

module.exports = App;
