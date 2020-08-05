
const ADD_CONTACT = 'ADD';
const CONTACTS_REQUEST = 'CONTACTS_REQUEST';
const CONTACTS_SUCCESS = 'CONTACTS_SUCCESS';
const CONTACTS_FAILURE = 'CONTACTS_FAILURE';

function addContact({firstName, lastName, email, phone, address, description}, dataSet){
    return {
        type: ADD_CONTACT,
        contact: {firstName, lastName, email, phone, address, description, dataSet}
    }
}

export function contactsReducer(contacts=[],action){
    switch (action.type) {
        case ADD_CONTACT:
            return [
                ...contacts,
                action.contact
            ];
    }
    return contacts;
}