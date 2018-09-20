/* eslint-disable */
import update from "immutability-helper";
import { UpdateOrderBy } from "./Helper.js";

function RootReducer(
  storeState = {
    isSorted: [{ name: "name", orderBy: "asc" }]
  },
  action
) {
  let finalStoreState;
  switch (action.type) {
    case "EVT_DO_STH":
      finalStoreState = update(storeState, { foo: { $set: "foo" } });
      break;
    case "EVT_SHOW_NOTIFICATION":
      finalStoreState = update(storeState, {
        showNotification: { $set: action.showNotification },
        notificationMessage: { $set: action.notificationMessage }
      });
      break;
    case "EVT_SHOW_MY_MODAL":
      finalStoreState = update(storeState, {
        showMyModal: { $set: action.showMyModal }
      });
      break;
    case "EVT_SORT_SINGLE":
      finalStoreState = update(storeState, {
        isSorted: {
          $set: [...UpdateOrderBy(action.name, storeState.isSorted)]
        }
      });
      break;
    case "EVT_SORT_MULTI":
      let result = storeState.isSorted;
      const isRemove = result.findIndex(data => data.name == action.name);
      isRemove > -1
        ? result.splice(isRemove, 1)
        : result.push({ name: action.name, orderBy: "asc" });

      finalStoreState = update(storeState, {
        isSorted: { $set: [...result] }
      });
      break;

    default:
      finalStoreState = storeState;
  }
  console.log(
    "RootReducer.js: RootReducer called => ",
    "finalStoreState=",
    finalStoreState,
    "action=",
    action
  );
  return finalStoreState;
}
export default RootReducer;
