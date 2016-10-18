import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      fishes: {},
      order: {}
    }
    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
  }

  addFish(fish) {
    //  update our state
    // for performance and to avoid race conditions better to make a copy of state first
    const fishes = {...this.state.fishes};
    const timestamp = Date.now();
    fishes[`fishes-${timestamp}`] = fish;
    // add in our new fish
    // set state

    this.setState({ fishes: fishes });
    // same as this.setState({ fishes });
  }

  loadSamples(){
    this.setState({ fishes: sampleFishes })
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
          <ul className="list-of-fishes">
            {
              Object.keys(this.state.fishes)
              .map(key =>
                <Fish
                  key={key}
                  details={this.state.fishes[key]}
                />
              )
            }
          </ul>
        </div>
        <Order />
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples}/>
      </div>
    )
  }
}

export default App;
