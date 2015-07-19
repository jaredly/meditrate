
var React = require('react-native');
var {
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
} = React;
var Camera = require('react-native-camera');

var CameraView = React.createClass({
  _takePicture() {
    this.cam.capture((err, data) => {
      console.log(err, data);
      this.props.onDone(data);
    });
  },

  render() {
    return (
      <Camera
        ref={c => this.cam = c}
        style={styles.container}
        captureTarget={Camera.constants.CaptureTarget.disk}
      >
        <View style={styles.buttons}>
          <TouchableHighlight style={styles.button} onPress={this._takePicture}>
            <Text style={styles.buttonText}>Take Picture</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={() => this.props.onDone()}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableHighlight>
        </View>
      </Camera>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, .5)',
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    color: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
  },
});

module.exports = CameraView;

