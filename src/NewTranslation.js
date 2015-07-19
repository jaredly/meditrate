
var React = require('react-native');
var {
  DatePickerIOS,
  Dimensions,
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
      img: 'http://elonka.com/kryptos/sanborn/KGBCyrillic.jpg',
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
    var dims = Dimensions.get('window');
    if (this.state.img) {
      if (this.state.imgZoom) {
        return (
          <View style={styles.imgZoom}>
            <ScrollView style={styles.scrollView} maximumZoomScale={10}>
              <Image style={[styles.bigImage2, {width: dims.width, height: dims.height}]} source={{uri: this.state.img}} />
            </ScrollView>
            <TouchableHighlight onPress={() => this.setState({imgZoom: false})} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>&times;</Text>
            </TouchableHighlight>
          </View>
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
  bigImage: {
    flex: .5,
  },
  bigImage2: {
    height: 100,
    //alignSelf: 'stretch',
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    right: 10,
  },
  closeButtonText: {
    fontSize: 50,
    lineHeight: 38,
    height: 30,
    color: 'white',
    borderRadius: 3,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  button: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, .5)',
    borderRadius: 5,
    margin: 5,
  },
  imgZoom: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'red',
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'white',
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
