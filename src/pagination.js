import React, {Fragment} from "react";
import {Table} from "./table";
import styles from './pagination.module.css';

export class Pagination extends React.Component {

    static getDerivedStateFromProps(props, state) {
        if (state.length !== props.contacts.length) {
            return {
                page: 1,
                length: props.contacts.length
            };
        }
        return null;
    }

    state = {
        page: 1,
        length: 0,
        currentContact: null
    };

    select = (contact) => {
        this.setState({currentContact: contact});
    };

    setPage = (page) => {
        this.setState({page})
    };

    render() {
        const {page, currentContact} = this.state;
        return (
            <Fragment>
                <Table contacts={this.props.contacts.slice(page * 50 - 50, page * 50)}
                       setSort={this.props.setSort}
                       column={this.props.column}
                       asc={this.props.asc} select={this.select}
                       currentContact={currentContact}/>
                {this.state.length > 50 && new Array(Math.ceil(this.props.contacts.length / 50))
                    .fill(0)
                    .map((d, i) => (
                        <button key={i} onClick={() => this.setPage(i + 1)} type="button"
                                className={i + 1 === page ? "btn btn-dark" : "btn btn-light"}>{i + 1}</button>
                    ))}
                {currentContact && (
                    <div className={styles.info + " card" } >
                        <ul className="list-group list-group-flush">
                        <li className="list-group-item"> Выбран пользователь: <b>{currentContact.firstName}</b> </li>
                        <li className={"list-group-item"} > Описание: <b>{currentContact.description}</b> </li>
                        <li className="list-group-item">Адрес проживания: <b>{currentContact.address.streetAddress}</b></li>
                        <li className="list-group-item"> Город: <b>{currentContact.address.streetAddress}</b> </li>
                        <li className="list-group-item">Провинция/штат: <b>{currentContact.address.state}</b></li>
                        <li className="list-group-item">Индекс: <b>{currentContact.address.zip}</b></li>
                        </ul>
                    </div>
                    )}
            </Fragment>
        );
    }
}