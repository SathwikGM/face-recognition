import { Component } from 'react';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Navigation from './components/Navigation/Navigation';
import Rank from './components/Rank/Rank';
import Logo from './components/Logo/Logo';
import './App.css';


function App() {
  return (
    <div className="App">
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      {/* <FaceRecognition /> */}
    </div>
  );
}

export default App;
