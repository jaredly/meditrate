
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
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

var Camera = require('./Camera');

var NewTranslation = React.createClass({
  getInitialState() {
    return {
      shooting: false,
      imgZoom: false,
      due: new Date(),
      img: null,
    };
  },

  onSubmit() {
  },

  tookPhoto(img) {
    this.setState({
      shooting: false,
      img: img || this.state.img,
    });
  },

  render() {
    if (this.state.shooting) {
      return <Camera onDone={this.tookPhoto} />;
    }
    var img = null;
    if (this.state.img) {
      if (this.state.imgZoom) {
        img = (
          <ScrollView style={styles.scrollView} maximumZoomScale={3}>
            <Image style={styles.bigImage} source={{uri: this.state.img}} />;
            <TouchableHighlight onPress={() => this.setState({imgZoom: false})} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>&times;</Text>
            </TouchableHighlight>
          </ScrollView>
        );
      } else {
        img = (
          <TouchableHighlight onPress={() => this.setState({imgZoom: true})}>
            <Image style={styles.image} source={{uri: this.state.img}} />
          </TouchableHighlight>
        );
      }
    }
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>New Translation Request</Text>
        </View>
        <Text style={styles.label}>Request Title</Text>
        <TextInput
          onChangeText={title => this.setState({title})}
          placeholder="e.g. New Health Report"
          style={{height: 40}}
        />
        <Text style={styles.label}>Due Date</Text>
        <DatePickerIOS
          mode="date"
          minimumDate={new Date()}
          date={this.state.due}
          onDateChange={due => this.setState({due})}
        />
        <TouchableHighlight style={styles.button} onPress={() => this.setState({shooting: true})}>
          <Text>{this.state.img ? 'Retake Photo' : 'Take Photo'}</Text>
        </TouchableHighlight>
        {img}
        <TouchableHighlight style={styles.button} onPress={() => this.onSubmit()}>
          <Text>Submit Request</Text>
        </TouchableHighlight>
      </View>
    );
  },
});

var styles = {
  container: {
    padding: 20,
    paddingTop: 30,
  },
  image: {
    height: 100,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  closeButtonText: {
    fontSize: 30,
    color: 'white',
  },
  scrollView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  title: {
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
  },
  titleText: {
    fontSize: 20,
  },
  label: {
    color: '#66f',
  },
};

module.exports = NewTranslation;
