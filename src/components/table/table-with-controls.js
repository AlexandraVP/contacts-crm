import React, {Fragment} from 'react';
import FilterableTable from "./filterable-table";

export default class TableWithControls extends React.Component {

    state = {
        opened: false
    };

    firstNameRef = React.createRef();
    lastNameRef = React.createRef();
    emailRef = React.createRef();
    phoneRef = React.createRef();
    descriptionRef = React.createRef();
    addressRef = React.createRef();
    townRef = React.createRef();
    stateRef = React.createRef();
    zipRef = React.createRef();

    open = () => {
        this.setState({opened: true});
    };

    close = () => {
        this.setState({opened: false});
    };

    add = () => {
        const firstName = this.firstNameRef.current.value;
        const lastName = this.lastNameRef.current.value;
        const email = this.emailRef.current.value;
        const phone = this.phoneRef.current.value;
        const address = {
            streetAddress: this.addressRef.current.value,
            city: this.townRef.current.value,
            state: this.stateRef.current.value,
            zip: this.zipRef.current.value
        };
        const description = this.descriptionRef.current.value;
        this.props.addContact({firstName, lastName, email, phone, description, address});
        this.close();
    };

    controls = (<div>
        <div className="input-group input-group-sm mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">Имя</span>
            </div>
            <input type="text" ref={this.firstNameRef} className="form-control" aria-label="Small"
                   aria-describedby="inputGroup-sizing-sm"/>
        </div>
        <div className="input-group input-group-sm mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">Фамилия</span>
            </div>
            <input type="text" ref={this.lastNameRef} className="form-control" aria-label="Small"
                   aria-describedby="inputGroup-sizing-sm"/>
        </div>
        <div className="input-group input-group-sm mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">Email</span>
            </div>
            <input type="text" ref={this.emailRef} className="form-control" aria-label="Small"
                   aria-describedby="inputGroup-sizing-sm"/>
        </div>
        <div className="input-group input-group-sm mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">Телефон</span>
            </div>
            <input type="text" ref={this.phoneRef} className="form-control" aria-label="Small"
                   aria-describedby="inputGroup-sizing-sm"/>
        </div>
        <div className="input-group input-group-sm mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">Описание</span>
            </div>
            <input type="text" ref={this.descriptionRef} className="form-control" aria-label="Small"
                   aria-describedby="inputGroup-sizing-sm"/>
        </div>
        <div className="input-group input-group-sm mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">Адрес</span>
            </div>
            <input type="text" ref={this.addressRef} className="form-control" aria-label="Small"
                   aria-describedby="inputGroup-sizing-sm"/>
        </div>
        <div className="input-group input-group-sm mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">Город</span>
            </div>
            <input type="text" ref={this.townRef} className="form-control" aria-label="Small"
                   aria-describedby="inputGroup-sizing-sm"/>
        </div>
        <div className="input-group input-group-sm mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">Провинция/Штат</span>
            </div>
            <input type="text" ref={this.stateRef} className="form-control" aria-label="Small"
                   aria-describedby="inputGroup-sizing-sm"/>
        </div>
        <div className="input-group input-group-sm mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">Индекс</span>
            </div>
            <input type="text" ref={this.zipRef} className="form-control" aria-label="Small"
                   aria-describedby="inputGroup-sizing-sm"/>
        </div>
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
            <button className="btn btn-secondary active" onClick={this.close}>
                Отмена
            </button>
            <button className="btn btn-secondary" onClick={this.add}>
                Добавить
            </button>
        </div>
    </div>);

    render() {
        return (
            <Fragment>
                <FilterableTable controls={this.state.opened ? this.controls : null} contacts={this.props.contacts}
                                 openControls={this.state.opened ? this.add :this.open}/>
            </Fragment>
        )
    }
}



