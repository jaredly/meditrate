
var React = require('react-native');
var {
  TouchableHighlight,
  LayoutAnimation,
  ScrollView,
  TextInput,
  Image,
  Text,
  View,
} = React;
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

var DateExpander = require('./DateExpander');
var ImageZoom = require('./ImageZoom');
var Camera = require('./Camera');
var Button = require('./Button');

function uploadFile(path) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest()
    xhr.open('POST', 'https://api.parse.com/1/files/trans.jpg');
    xhr.setRequestHeader("X-Parse-Application-Id", "h7VcrF5BLOVOhYrafF8nc3YYDjOai9vmLRFdHfwv");
    xhr.setRequestHeader("X-Parse-REST-API-Key", "2lUfIFx5LnEfmAYrg0ucDnybWmMnVC99QJTKxLY6");
    xhr.setRequestHeader("Content-Type", "image/jpeg");
    xhr.responseType = 'json';
    xhr.onload = e => {
      if (!xhr.response) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        resolve(xhr.response);
      }
    };
    xhr.onerror = e => {
      reject(e);
    };
    xhr.send({
      uri: path,
    });
  });
}

var NewTranslation = React.createClass({
  getInitialState() {
    return {
      shooting: false,
      imgZoom: false,
      due: null,
      img: 'http://elonka.com/kryptos/sanborn/KGBCyrillic.jpg',
      uploading: false,
      error: false,
      title: '',
    };
  },

  onSubmit() {
    this.setState({uploading: true});
    uploadFile(this.state.img).then(({url}) => {
      var translation = new Parse.Object('Translation');
      var acl = new Parse.ACL(Parse.User.current());
      acl.setRoleWriteAccess("Admin", true);
      acl.setRoleReadAccess("Admin", true);
      translation.setACL(acl);
      translation.save({
        title: this.state.title,
        due: this.state.due,
        creator: Parse.User.current(),
        status: 'requested',
        image: url,
      }, {
        success: () => {
          this.props.onClose();
        },
        error: (_, error) => {
          console.error('failed', error);
          this.setState({error});
        },
      });
    }, err => {
      console.log(err);
      console.error('Failed to updaload');
      this.setState({uploading: false, error: err});
    });
  },

  tookPhoto(img) {
    this.setState({
      shooting: false,
      img: img || this.state.img,
    });
  },

  onZoom() {
    LayoutAnimation.configureNext({
      duration: 200,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
    });
    this.setState({imgZoom: true});
  },

  isValid() {
    return this.state.img && this.state.due && this.state.title;
  },

  render() {
    if (this.state.uploading) {
      return <View><Text>Uploading...</Text></View>;
    }
    if (this.state.shooting) {
      return <Camera onDone={this.tookPhoto} />;
    }
    var img = null;
    if (this.state.img) {
      if (this.state.imgZoom) {
        return (
          <ImageZoom uri={this.state.img} onClose={() => this.setState({imgZoom: false})} />
        );
      } else {
        img = (
          <TouchableHighlight onPress={() => this.onZoom()}>
            <Image style={styles.image} source={{uri: this.state.img}} />
          </TouchableHighlight>
        );
      }
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>New Translation Request</Text>
        </View>
        {this.state.error && <Text>Failed to upload</Text>}
        <Text style={styles.label}>Request Title</Text>
        <TextInput
          onChangeText={title => this.setState({title})}
          placeholder="e.g. New Health Report"
          value={this.state.title}
          style={styles.input}
        />
        <Text style={styles.label}>Due Date</Text>
        <DateExpander
          date={this.state.due}
          onChange={due => this.setState({due})}
        />
        <Text style={styles.label}>Photo of Document</Text>
        <Button onPress={() => this.setState({shooting: true})}>
          <Text>{this.state.img ? 'Retake Photo' : 'Take Photo'}</Text>
        </Button>
        {img}
        <View style={styles.bottomButtons}>
          <Button stretch disabled={!this.isValid()} onPress={() => this.onSubmit()}>
            <Text>Submit Request</Text>
          </Button>
          <Button stretch onPress={() => this.props.onClose()}>
            <Text>Cancel</Text>
          </Button>
        </View>
      </ScrollView>
    );
  },
});

var styles = {
  container: {
    paddingTop: 20,
    flex: 1,
  },
  image: {
    height: 200,
    flex: 1,
  },
  input: {
    height: 40,
    marginLeft: 10,
  },
  title: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
  },
  titleText: {
    fontSize: 20,
  },
  label: {
    color: '#66f',
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 5,
    marginTop: 10,
  },
  bottomButtons: {
    flexDirection: 'row',
  },
};

module.exports = NewTranslation;
