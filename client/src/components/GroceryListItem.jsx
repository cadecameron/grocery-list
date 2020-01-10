import React from 'react';

const GroceryListItem = ({grocery}) => (
  <li>
    <span> {grocery.item} </span>
    <span> {grocery.quantity} </span>
  </li>
)

export default GroceryListItem;