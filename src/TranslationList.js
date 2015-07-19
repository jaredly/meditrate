
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

var TranslationRow = require('./TranslationRow');

var TranslationList = React.createClass({
  mixins: [ParseReact.Mixin],
  observe() {
    return {
      translations: new Parse.Query('Translation'),
    }
  },
  render() {
    return (
      <View style={styles.container}>
        {this.data.translations.map(translation => (
          <TranslationRow translation={translation} />
        ))}
      </View>
    );
  },
});

var styles = {
};

module.exports = TranslationList;
