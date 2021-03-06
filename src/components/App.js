import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      fishes: {},
      order: {}
    }
    this.addFish = this.addFish.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
  }

  componentWillMount(){
    // runs right before <App> is rendered
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`,
    {
      context: this,
      state: 'fishes'
    });

    // check if there is any order in localstorage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

    if(localStorageRef) {
      // update our App components order state
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
  }

  componentWillUnmount(){
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.params.storeId}`,
      JSON.stringify(nextState.order));
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

  updateFish(key, updatedFish){
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({ fishes })
  }

  addToOrder(key){
    const order = {...this.state.order}
    order[key] = order[key] + 1 || 1;
    this.setState({ order })
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
                  index={key}
                  details={this.state.fishes[key]}
                  addToOrder={this.addToOrder}
                />
              )
            }
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} params={this.props.params} />
        <Inventory
          addFish={this.addFish}
          loadSamples={this.loadSamples}
          fishes={this.state.fishes}
          updateFish={this.updateFish}
        />
      </div>
    )
  }
}

export default App;
