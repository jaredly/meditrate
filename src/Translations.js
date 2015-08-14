
var React = require('react-native');
var {
  NavigatorIOS,
  TouchableHighlight,
  ScrollView,
  Text,
  View,
} = React;
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

var TranslationList = require('./TranslationList');
var UserBar = require('./UserBar');
var NewTranslation = require('./NewTranslation');

var Translations = React.createClass({
  getInitialState() {
    return {creating: false};
  },
  render() {
    if (this.state.creating) {
      return (
        <NewTranslation
          user={this.props.user}
          onClose={() => this.setState({creating: false})}
        />
      );
    }
    return (
      <View style={styles.container}>
        <UserBar/>
        <ScrollView
          style={styles.scrollView}
        >
          <TranslationList username={this.props.user.username} />
        </ScrollView>
        <TouchableHighlight onPress={() => this.setState({creating: true})} style={styles.button}>
          <Text>New Translation Request</Text>
        </TouchableHighlight>
      </View>
    );
  },
});

var styles = {
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  button: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }
};

module.exports = Translations;
