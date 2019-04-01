import React, { Component } from 'react';
import GaugeGraph from './components/GaugeGraph';
import './App.css';

const params = [
  {
      "Value": "B",
      "ValueStyle": {
          "Margin": 10,
          "TextSize": 20
      },
      "HexStyle": {
          "Margin": 10,
          "TextSize": 20
      },
      "startColor": "red",
      "endColor": "green",
      "fillerColor": "#777722",
      "endAngle": 120,
      "startAngle": 0,
      "width": 500,
      "height": 500
  }
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <GaugeGraph data={params}/>
      </div>
    );
  }
}

export default App;
