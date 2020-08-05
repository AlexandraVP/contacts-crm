import React from 'react';
import {Pagination} from "./pagination";


class SortableTable extends React.Component {
    state = {
        asc: false,
        column: 'id'
    };

    comparator = (a, b) => {
        if (this.state.column === "id") {
            if (this.state.asc) {
                return a.id - b.id;
            } else {
                return b.id - a.id;
            }
        } else {
            const val1 = a[this.state.column];
            const val2 = b[this.state.column];
            if (val1 > val2 && this.state.asc) {
                return 1;
            } else if (val1 === val2) {
                return 0;
            } else {
                return -1;
            }
        }
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.contacts.length !== this.props.contacts.length ||
            nextState.column !== this.state.column ||
            nextState.asc !== this.state.asc;
    }

    setSort = (column, direction) => {
        this.setState({asc: direction, column})
    };

    render() {
        return (
            <Pagination contacts={this.props.contacts.slice()
                .sort(this.comparator)} setSort={this.setSort}
                        column={this.state.column} asc={this.state.asc} />
        )
    }
}


export default SortableTable;
