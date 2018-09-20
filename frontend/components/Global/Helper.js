export const OrderByColumn = (rows, order) => {
  let result = [].concat(rows);
  order.map(key => {
    if (key.orderBy === "asc") {
      result.sort((a, b) => a[key.name] > b[key.name]);
    } else {
      result.sort((a, b) => a[key.name] < b[key.name]);
    }
  });
  return result;
};
export const UpdateOrderBy = (name, order) => {
  const isRemove = order.findIndex(function(element) {
    return element.name === name;
  });
  if (isRemove < 0) {
    // just create a new object if not found
    order = { name: name, orderBy: "asc" };
  } else if (order[isRemove].orderBy === "asc") {
    // amend order if found
    order[isRemove].orderBy = "dsc";
  } else {
    // reset if last order
    order.splice(isRemove, 1);
  }
  return order;
};
