import React from 'react';
import GroceryListItem from './GroceryListItem.jsx';

const GroceryList = ({groceries}) => (
  <ul className="groceries">
    {groceries.map((grocery, idx) => <GroceryListItem grocery={grocery} key={idx} />)}
  </ul>
)

export default GroceryList;