
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

var TranslationRow = React.createClass({
  render() {
    var data = this.props.translation;
    return (
      <View style={styles.container}>
        <Text>{data.title}</Text>
      </View>
    );
  },
});

var styles = {
  container: {
    padding: 20,
  },
};

module.exports = TranslationRow;
