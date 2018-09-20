import React from "react";
import { connect } from "react-redux";
import * as Table from "reactabular-table";

import { OrderByColumn } from "Global/Helper.js";
import { SortIcon, SortHeader } from "Global/Fixture.js";

import SortTableHeader from "SortTableHeader/SortTableHeader.js";
import st from "./SortTable.css";

class SortTable extends React.Component {
  constructor(props) {
    super(props);
    // init state on load
    this.state = this.GetSortState(this.props.isSorted, this.handleSort);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isSorted) {
      // update state from redux action
      this.setState({
        ...this.GetSortState(nextProps.isSorted, this.handleSort)
      });
    }
  }

  GetSortState(isSorted, sortColumn) {
    // create basic structure
    let result = {
      columns: [
        {
          property: "id",
          header: {
            label: "id"
          }
        }
      ]
    };
    // append sortable headers
    SortHeader.map(name => {
      result.columns.push(this.ColGenerator(name, isSorted, this.handleSort));
    });
    return result;
  }
  ColGenerator(name, status) {
    return {
      property: name,
      header: {
        label: name,
        transforms: [
          () => ({
            onClick: event => {
              this.handleSort(event, name);
            }
          })
        ],
        formatters: [
          () => {
            const isSorted = status.findIndex(function(element) {
              return element.name === name;
            });

            // set icon for header, sort | sort-up | sort-down
            // set icon state, text-muted | text-body
            let icon = "sort";
            let iconClass = "text-muted";
            if (isSorted > -1) {
              icon = SortIcon[status[isSorted].orderBy];
              iconClass = "text-body";
            }

            return (
              <SortTableHeader
                name={name}
                iconClass={iconClass}
                icon={icon}
                headerCount={status.length}
                headerIndex={isSorted + 1}
              />
            );
          }
        ]
      }
    };
  }

  handleSort(event, data) {
    // add shift key for mac users
    if (event.ctrlKey || event.shiftKey) {
      this.props.sortMultiColumn(data);
    } else {
      this.props.sortSingleColumn(data);
    }
  }

  render() {
    return (
      <div className={st.sortTable}>
        <Table.Provider
          className="table table-striped table-bordered"
          columns={this.state.columns}
        >
          <Table.Header />
          <Table.Body
            rows={OrderByColumn(this.props.rows, this.props.isSorted)}
            rowKey="id"
          />
        </Table.Provider>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sortSingleColumn: function(data) {
      return dispatch({
        type: "EVT_SORT_SINGLE",
        name: data
      });
    },
    sortMultiColumn: function(data) {
      return dispatch({
        type: "EVT_SORT_MULTI",
        name: data
      });
    }
  };
}

export default connect(
  function(storeState) {
    return {
      isSorted: storeState.app.isSorted || []
    };
  },
  mapDispatchToProps
)(SortTable);
