import React, { Component } from 'react';
import AddGrocery from './AddGrocery.jsx';
import GroceryList from './GroceryList.jsx';

const groceries = [
  {
    item: 'Pepperoni Pizza',
    quantity: 10
  },
  {
    item: 'Teriyaki Chicken',
    quantity: 5
  },
  {
    item: 'Lasagna',
    quantity: 1000
  }
]

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groceries: [],
    }

    this.addGrocery = this.addGrocery.bind(this);
  }

  componentDidMount() {
    // this emulates an AJAX request
    setTimeout(() => {
      this.setState({
        groceries: groceries,
      });
    }, 2000);
  }

  addGrocery(grocery) {
    const { groceries } = this.state;
    const newGroceries = [...groceries];
    newGroceries.push(grocery);
    this.setState({
      groceries: newGroceries,
    })
  }

  render() {
    const { groceries } = this.state;

    return (
      <div>
        <img src="grocery-bags.png"/>
        <h1>Grocery List</h1>
        <AddGrocery addGrocery={this.addGrocery} />
        <GroceryList groceries={groceries}/>
      </div>
    )
  }
}

export default App;