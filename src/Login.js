
var React = require('react-native');
var {
  TouchableHighlight,
  TextInput,
  Text,
  View,
} = React;
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

var Login = React.createClass({
  getInitialState() {
    return {
      email: '',
      password: '',
      signup: false,
    }
  },

  onSubmit() {
    if (this.state.signup) {
      var user = new Parse.User();
      user.set('username', this.state.email);
      user.set('password', this.state.password);
      user.set('email', this.state.email);
      user.signUp(null, {
        success: user => this.setState({error: null}),
        error: (user, error) => this.setState({error: error.message}),
      });
    } else {
      Parse.User.logIn(this.state.email, this.state.password).then(
        () => this.setState({error: null}),
        (error) => this.setState({error: error.message})
      );
    }
  },

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>{this.state.signup ? 'Sign Up' : 'Log in'}</Text>
        </View>
        <TextInput
          onChangeText={email => this.setState({email})}
          placeholder="Email Address"
          style={{height: 40}}
        />
        <TextInput
          onChangeText={password => this.setState({password})}
          placeholder="Password"
          secureTextEntry
          style={{height: 40}}
        />
        <Text>{this.state.error}</Text>
        <TouchableHighlight style={styles.button} onPress={this.onSubmit}>
          <Text>{this.state.signup ? 'Sign Up' : 'Log in'}</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.textButton} onPress={() => this.setState({signup: !this.state.signup})}>
          <Text>{this.state.signup ? 'Log in' : 'Sign Up'}</Text>
        </TouchableHighlight>
      </View>
    );
  }
});

var styles = {
  title: {
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 20,
  },
  container: {
    padding: 20,
    paddingTop: 50,
  },
  button: {
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  textButton: {
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

module.exports = Login;
