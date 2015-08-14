
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

class ImageZoom extends React.Component {
  render() {
    var dims = Dimensions.get('window');
    return (
      <View>
        <ScrollView style={styles.scrollView} maximumZoomScale={10}>
          <Image style={{width: dims.width, height: dims.height}} source={{uri: this.props.uri}} />
        </ScrollView>
        <TouchableHighlight underlayColor="rgba(0,0,0,.4)" onPress={this.props.onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>&times;</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

var styles = {
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
  closeButton: {
    position: 'absolute',
    top: 30,
    right: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,.5)',
    padding: 10,
  },
  closeButtonText: {
    fontSize: 50,
    lineHeight: 38,
    height: 30,
    color: 'black',
  },
};

module.exports = ImageZoom;
