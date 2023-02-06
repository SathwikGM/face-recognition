import { Component } from 'react';
import ParticlesBg from 'particles-bg';
import Clarifai from 'clarifai';


import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Register from './components/Register/Register';
import Rank from './components/Rank/Rank';
import Logo from './components/Logo/Logo';
import './App.css';
import Signin from './components/Signin/Signin';

const app = new Clarifai.App({
  apiKey: '1a82fe4b414d45c8aec5cb2ed29a74f5'
});


class App extends Component {
  constructor() {
    super()
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joinedOn: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joinedOn: data.joinedOn
      }
    })
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.output[0].data.regions[1].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottomRow * height)
    }
  };

  displayFaceBox = (box) => {
    this.setState({ box: box })
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: { 'content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          }).then(response => response.json())
            .then(count => {
              this.setState(
                Object.assign(this.state.user, { entries: count })

              )
            })
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));

  };

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false })
    }
    else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route })
  };

  render() {
    return (
      <div className="App">
        <ParticlesBg type="cobweb" bg={true} />
        {/* "color"
      "ball"
      "lines"
      "thick"
      "circle"
      "cobweb"
      "polygon"
      "square"
      "tadpole"
      "fountain"
      "random"
      "custom" */}
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
        {this.state.route === 'home' ? <div><Logo />
          <Rank name={this.state.user.name} entries={this.state.user.entries} />
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
          <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} /></div>
          : (
            this.state.route === 'signin'
              ? < Signin onRouteChange={this.onRouteChange} /> :
              < Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />

          )



        }
      </div>
    );
  }
}


export default App;
