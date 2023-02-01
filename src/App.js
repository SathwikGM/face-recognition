import { Component } from 'react';
import ParticlesBg from 'particles-bg'

import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Navigation from './components/Navigation/Navigation';
import Rank from './components/Rank/Rank';
import Logo from './components/Logo/Logo';
import './App.css';


class App extends Component {
  constructor() {
    super()
    this.state = {
      input: '',
    }
  }

  onInputChange = (event) => {
    console.log(event)
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
        <ImageLinkForm onInputChange={this.onInputChange} />
        {/* <FaceRecognition /> */}
      </div>
    );
  }
}

export default App;
