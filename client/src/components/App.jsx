import React, { Component } from 'react';
import AddGrocery from './AddGrocery.jsx';
import GroceryList from './GroceryList.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groceries: [],
    }

    this.addGrocery = this.addGrocery.bind(this);
    this.getGroceries = this.getGroceries.bind(this);
  }

  componentDidMount() {
    this.getGroceries();
  }

  getGroceries() {
    fetch('/api/groceries')
      .then(res => res.json())
      .then((groceries) => {
        this.setState({
          groceries
        });
      })
      .catch(console.log)
  }

  addGrocery(grocery) {
    fetch('/api/groceries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // the server needs to know its a JSON object, otherwise the server's parser won't parse it!
      },
      body: JSON.stringify(grocery) // have to strigify objects before you send them over the internet
    })
    .then(() => {
      this.getGroceries();
    })
    .catch(console.log)
  }

  render() {
    const { groceries } = this.state;

    return (
      <div>
        <img src="grocery-bags.png" />
        <h1>Grocery List</h1>
        <AddGrocery addGrocery={this.addGrocery} />
        <GroceryList groceries={groceries} />
      </div>
    )
  }
}

export default App;