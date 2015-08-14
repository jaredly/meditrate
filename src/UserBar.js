
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

var UserBar = React.createClass({
  mixins: [ParseReact.Mixin],
  observe() {
    return {user: ParseReact.currentUser,}
  },
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.welcome}>
          <Text style={styles.username}>{this.data.user && this.data.user.username}</Text>
        </View>
        <View style={styles.stretch}/>
        <TouchableHighlight onPress={() => Parse.User.logOut()} style={styles.button}>
          <Text>Log out</Text>
        </TouchableHighlight>
      </View>
    );
  },
});

var styles = {
  container: {
    flexDirection: 'row',
    padding: 5,
    paddingTop: 20,
  },
  welcome: {
    paddingTop: 10,
    paddingLeft: 5,
  },
  username: {
    color: '#0af',
  },
  stretch: {
    flex: 1,
  },
  button: {
    padding: 5,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
};

module.exports = UserBar;

