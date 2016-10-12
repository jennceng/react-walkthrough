import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  // constructor() {
  //   super();
    // this.goToStore = this.goToStore.bind(this);
  // }
  goToStore(event) {
    event.preventDefault();
    console.log('you changed the url');
    const storeId = this.storeInput.value;
    console.log(`going to ${storeId}`);
    // first grab text from box, avoid touching the actual dom
    // second going to transition from / to /store/:storeId
    this.context.router.transitionTo(`/store/${storeId}`);
  }
  // es6 classes don't need commas between functions

  // render is already bound to the component

  // the below (e) is less efficient if you have many of these components because a function will be created for each component rather than in the constructor that will be created once
  render() {
    return(
      <form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
        <h2> Please Enter a Store </h2>
        <input type="test" required placeholder="Store Name"
        defaultValue={getFunName()} ref={(input) =>{ this.storeInput = input }}/>
        <button type="submit">Visit Store</button>
      </form>
    )
  }
}

// tells react storepicker expects access to router
StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker;
