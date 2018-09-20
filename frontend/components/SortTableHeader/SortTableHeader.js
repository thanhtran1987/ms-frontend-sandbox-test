import React from "react";

import MSGlyphicon from "MSGlyphicon/MSGlyphicon.js";
import st from "./SortTableHeader.css";

const renderCount = (headerCount, headerIndex) => {
  if (headerCount > 1 && headerIndex > 0) {
    return <span className={st.headerIndex}>{headerIndex}</span>;
  }
  return null;
};

const SortTableHeader = props => {
  return (
    <div className={st.tableHeader}>
      {props.name}
      {renderCount(props.headerCount, props.headerIndex)}
      <button type="button" className="btn btn-light btn-outline-light">
        <MSGlyphicon className={props.iconClass} glyph={props.icon} />
      </button>
    </div>
  );
};

export default SortTableHeader;
