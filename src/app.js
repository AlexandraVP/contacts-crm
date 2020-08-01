import React, {Component} from "react";
import TableWithControls from "./table-with-controls";

const dataCache = {
    small: null,
    large: null
};

const dataUrls = {
    small: 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}',
    large: 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'
};

function loadData(name) {
    return new Promise((resolve, reject) => {
        if (dataCache[name]) {
            resolve(dataCache[name]);
        } else {
            fetch(dataUrls[name])
                .then(d => d.json())
                .then((contacts) => {
                    dataCache[name] = contacts.filter((c, i) => contacts.findIndex(d => d.id === c.id) === i);
                    resolve(dataCache[name]);
                })
                .catch(reject);
        }
    })
}

function getMaxId(contacts) {
    return contacts.reduce((maxId, contact) => maxId > contact.id ? maxId : contact.id, 0)
}

export class App extends Component {

    state = {
        contacts: null,
        page: null,
        processing: false,
        nextId: 0
    };

    addContact = ({firstName, lastName, email, phone, address, description}) => {
        this.setState({
            contacts: [...this.state.contacts, {
                id: this.state.nextId,
                firstName,
                lastName,
                email,
                phone,
                address,
                description
            }],
            nextId: this.state.nextId + 1
        });
    };

    load = (page) => {
        if (this.state.processing) {
            return;
        }
        loadData(page)
            .then(contacts => {
                const nextId = getMaxId(contacts) + 1;
                this.setState({contacts, nextId, processing: false});
            })
            .catch(e => {
                this.setState({processing: false, error: true});
            });
        this.setState({page, processing: true, error: false});
    };

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <ul className="nav nav-tabs card-header-tabs">
                        <li className="nav-item">
                            <div className={this.state.page === 'small' ? 'nav-link active' : 'nav-link'}
                                 onClick={() => this.load('small')}>
                                Маленький объем
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className={this.state.page === 'large' ? 'nav-link active' : 'nav-link'}
                                 onClick={() => this.load('large')}>
                                Большой объем
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="card-body">
                    {!this.state.page && (
                        <div className="alert alert-primary" role="alert">
                            Выберите набор данных для отображения таблицы.
                        </div>)}
                    {this.state.processing && (
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    )}
                    {this.state.error && (
                        <div className="alert alert-danger" role="alert">
                            Произошла ошибка загрузки данных. Возможно сервис недоступен.
                            Попробуйте еще раз выбрать набор данных позже.
                        </div>)}
                    {!this.state.error && this.state.page && !this.state.processing &&
                    <TableWithControls contacts={this.state.contacts} addContact={this.addContact}/>
                    }
                </div>
            </div>
        );
    }
}