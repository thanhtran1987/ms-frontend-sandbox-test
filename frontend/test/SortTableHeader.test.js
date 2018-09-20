import React from "react";
import { expect } from "chai";
import { shallow } from "enzyme";

import SortTableHeader from "SortTableHeader/SortTableHeader.js";

const data = {
  name: "test",
  iconClass: "text-muted",
  icon: "sort",
  headerCount: 2,
  headerIndex: 1
};

describe("Test SortTableHeader", function() {
  it("SortTableHeader is rendered properly", function() {
    const button = shallow(
      <SortTableHeader
        name={data.name}
        iconClass={data.iconClass}
        icon={data.icon}
        headerCount={data.headerCount}
        headerIndex={data.headerIndex}
      />
    );
    expect(button.find("button")).to.have.length(1);
  });
});
