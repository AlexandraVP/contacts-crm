import React from "react";
import {Direction} from "../direction/direction";
import styles from "./table.module.css";

export class Table extends React.Component {
    setSort = (column) => {
        if (column === this.props.column) {
            this.props.setSort(column, !this.props.asc)
        } else {
            this.props.setSort(column, true)
        }
    };

    render() {
        return (
            <table className='table table-striped table-bordered'>
                <thead className='thead-light'>
                <tr className={styles.header}>
                    <th onClick={() => this.setSort('id')}>#{this.props.column === 'id' &&
                    <Direction asc={this.props.asc}/>}</th>
                    <th onClick={() => this.setSort('firstName')}>Имя{this.props.column === 'firstName' &&
                    <Direction asc={this.props.asc}/>}</th>
                    <th onClick={() => this.setSort('lastName')}>Фамилия{this.props.column === 'lastName' &&
                    <Direction asc={this.props.asc}/>}</th>
                    <th onClick={() => this.setSort('email')}>Email{this.props.column === 'email' &&
                    <Direction asc={this.props.asc}/>}</th>
                    <th onClick={() => this.setSort('phone')}>Телефон{this.props.column === 'phone' &&
                    <Direction asc={this.props.asc}/>}</th>
                </tr>
                </thead>
                <tbody>
                {this.props.contacts.map(contact => (
                    <tr key={contact.id} onClick={() => this.props.select(contact)}
                       className={this.props.currentContact === contact && "table-primary"}
                    >
                        <td>{contact.id}</td>
                        <td>{contact.firstName}</td>
                        <td>{contact.lastName}</td>
                        <td>{contact.email}</td>
                        <td>{contact.phone}</td>
                    </tr>
                ))}
                </tbody>
            </table>

        );
    }
}

