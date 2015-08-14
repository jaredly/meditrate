
var React = require('react-native');
var {
  DatePickerIOS,
  TouchableHighlight,
  LayoutAnimation,
  ScrollView,
  TextInput,
  Image,
  Text,
  View,
} = React;

var Button = require('./Button');

var anim = {
  duration: 200,
  create: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 0.8,
  },
};

var DateExpander = React.createClass({
  getInitialState() {
    return {
      expanded: false,
    };
  },
  onChange(date) {
    this.props.onChange(date);
  },
  onExpand(expanded) {
    LayoutAnimation.configureNext(anim);
    //LayoutAnimation.spring();
    this.setState({expanded});
  },
  render() {
    if (this.state.expanded) {
      return (
        <View>
          <DatePickerIOS
            mode="date"
            minimumDate={new Date()}
            date={this.props.date || new Date()}
            onDateChange={this.onChange}
          />
          <Button onPress={() => this.onExpand(false)}>
            <Text>Set Date</Text>
          </Button>
        </View>
      );
    }
    if (!this.props.date) {
      return (
        <Button onPress={() => this.onExpand(true)}>
          <Text>Pick a Date</Text>
        </Button>
      );
    }
    var dateText = this.props.date.toDateString();
    return (
      <Button onPress={() => this.onExpand(true)}>
        <Text>{dateText}</Text>
      </Button>
    );
  }
});

module.exports = DateExpander;
