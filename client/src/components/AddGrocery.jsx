import React, { Component } from 'react';

class AddGrocery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: '',
      quantity: ''
    }

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmithandler = this.onSubmithandler.bind(this);
  }

  onChangeHandler({target}) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  onSubmithandler(event) {
    event.preventDefault();
    const { addGrocery } = this.props;
    addGrocery(this.state);
    this.initializeState();
  }

  initializeState() {
    this.setState({
      item: '',
      quantity: ''
    });
  }

  render() {
    const { item, quantity } = this.state;
    return (
      <form onSubmit={this.onSubmithandler}>
          <label> Item
            <input
              name="item"
              value={item}
              onChange={this.onChangeHandler}
            />
          </label>
          <label> Quantity
            <input
              name="quantity"
              value={quantity}
              onChange={this.onChangeHandler}
            />
          </label>
          <button>Add Grocery</button>
        </form>
    )
  }
}

export default AddGrocery;