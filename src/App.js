import { Component } from 'react';
import ParticlesBg from 'particles-bg';
import Clarifai from 'clarifai';


import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Rank from './components/Rank/Rank';
import Logo from './components/Logo/Logo';
import './App.css';

const app = new Clarifai.App({
  apiKey: '1a82fe4b414d45c8aec5cb2ed29a74f5'
});


class App extends Component {
  constructor() {
    super()
    this.state = {
      input: '',
      imageUrl: '',
    }
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input })

    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
      function (response) {
        console.log(response.output[0].data.regions[1].region_info.bounding_box)
      },
      function (err) {

      }
    );

  }
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
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
