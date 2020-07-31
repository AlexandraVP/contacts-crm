import React, {Fragment} from 'react';
import SortableTable from "./sortable-table";


export default class FilterableTable extends React.Component {
    state = {
        query: ''
    };

    inputRef = React.createRef();

    predicate = (contact) => {
        const {query} = this.state;
        return contact.id.toString().includes(query) || contact.firstName.toLowerCase().includes(query)
            || contact.lastName.toLowerCase().includes(query) || contact.email.toLowerCase().includes(query)
            || contact.phone.includes(query)
    };

    handleClick = () => {
        this.setState(
            {
                query: this.inputRef.current.value.trim().toLowerCase()
            });
    };

    render() {
        return (
            <Fragment>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Введите текст" aria-label="Имя получателя"
                           aria-describedby="basic-addon2" ref={this.inputRef}/>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" onClick={this.handleClick}>Найти
                        </button>
                        <button className="btn btn-outline-secondary" type="button"
                                onClick={this.props.openControls}>Добавить
                        </button>
                    </div>
                </div>
                {this.props.controls}
                <SortableTable contacts={this.props.contacts.filter(this.predicate)}/>
            </Fragment>
        )
    }
}