
var React = require('react-native');
var {
  DatePickerIOS,
  TouchableHighlight,
  ScrollView,
  TextInput,
  Image,
  Text,
  View,
} = React;

class Button {
  render() {
    var style = [styles.button];
    if (this.props.disabled) {
      style.push(styles.disabled);
    }
    if (this.props.stretch) {
      style.push(styles.stretch);
    }
    if (this.props.style) {
      style.push(this.props.style);
    }
    if (this.props.disabled) {
      return (
        <View style={style}>
          {this.props.children}
        </View>
      );
    }
    return (
      <TouchableHighlight
        underlayColor="#ddd"
        onPress={this.props.onPress}
        style={style}
      >
        {this.props.children}
      </TouchableHighlight>
    );
  }
}

var styles = {
  button: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: {
    backgroundColor: '#ccc',
  },
  stretch: {
    flex: 1,
  },
};

module.exports = Button;
