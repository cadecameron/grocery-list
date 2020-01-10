import React from 'react';

const GroceryListItem = ({ grocery, deleteGrocery, updateGrocery }) => (
  <div className="grocery" data-key={grocery.key}>
    <div className="grocery-item">
      <span className="grocery-name"> {grocery.item} (id: {grocery.id}) </span>
    </div>
    <div className="grocery-item">
      <span className="grocery-qty"> {grocery.quantity} </span>
    </div>
    <div>
      <a href="#" className="material-icons md-18" onClick={() => updateGrocery(grocery)}>edit </a>
      <a href="#" className="material-icons md-18" onClick={() => deleteGrocery(grocery)}>delete</a>
    </div>
  </div>
)

export default GroceryListItem;