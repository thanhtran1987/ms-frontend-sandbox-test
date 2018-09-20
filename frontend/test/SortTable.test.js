import React from "react";
import { expect } from "chai";
import { mount } from "enzyme";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { routerReducer } from "react-router-redux";
import rootReducer from "Global/RootReducer.js";
import { SortTableData } from "Global/Fixture.js";
import SortTable from "SortTable/SortTable.js";

const store = createStore(
  combineReducers({
    app: rootReducer,
    routing: routerReducer
  }),
  {}, // initial state
  applyMiddleware(thunk)
);

describe("Test SortTable", function() {
  let wrapper;
  before(function() {
    wrapper = mount(
      <Provider store={store}>
        <SortTable rows={SortTableData} />
      </Provider>
    );
  });

  it("SortTable is rendered properly", function() {
    expect(wrapper.find("button")).to.have.length(4);
  });

  it("SortTable sorted by family", function() {
    const submitButton = wrapper.find("[name='family'] button");
    submitButton.simulate("click");
    expect(store.getState().app.isSorted[0].name).to.equal("family");
    expect(store.getState().app.isSorted[0].orderBy).to.equal("asc");
    submitButton.simulate("click");
    expect(store.getState().app.isSorted[0].orderBy).to.equal("dsc");
    submitButton.simulate("click");
    expect(store.getState().app.isSorted).to.have.lengthOf(0);
  });
});
