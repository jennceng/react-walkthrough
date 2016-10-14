import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      fishes: {},
      order: {}
    }
    // this.addFish = this.addFish.bind(this);
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
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
        </div>
        <Order />
        <Inventory addFish={this.addFish}/>
      </div>
    )
  }
}

export default App;
