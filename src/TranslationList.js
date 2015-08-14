
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

var cachedData = null;
var cachedUser = null;

var TranslationList = React.createClass({
  mixins: [ParseReact.Mixin],
  componentWillMount() {
    if (cachedUser === this.props.username) {
      this.data.translations = cachedData;
    } else {
      cachedUser = null;
      cachedData = null;
    }
  },
  observe() {
    return {
      translations: new Parse.Query('Translation'),
    }
  },
  componentDidUpdate() {
    if (this.data.translations) {
      cachedData = this.data.translations;
      cachedUser = this.props.username;
    }
  },
  render() {
    return (
      <View style={styles.container}>
        {this.pendingQueries().length > 0 && !this.data.translations &&
          <Text style={styles.loading}>Loading...</Text>}
        {this.data.translations.map(translation => (
          <TranslationRow translation={translation} />
        ))}
      </View>
    );
  },
});

var styles = {
  container: {
    top: -20,
  },
  loading: {
    margin: 10,
  },
};

module.exports = TranslationList;
