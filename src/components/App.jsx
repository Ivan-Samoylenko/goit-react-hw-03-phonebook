import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from 'components/ContactForm';
import { Filter } from 'components/Filter';
import { ContactList } from 'components/ContactList';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleSubmit = value => {
    this.setState(state => ({
      contacts: [...state.contacts, { ...value, id: nanoid(10) }],
    }));
  };

  onFilterChange = event => {
    this.setState({ filter: event.target.value });
  };

  handleDeleteBtn = id => {
    this.setState(state => ({
      contacts: state.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { filter, contacts } = this.state;
    const lowerCaseFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(lowerCaseFilter)
    );

    return (
      <>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.handleSubmit} contacts={contacts} />

        <h2>Contacts</h2>
        <Filter onChange={this.onFilterChange} value={filter} />
        <ContactList
          contacts={filteredContacts}
          onClick={this.handleDeleteBtn}
        />
      </>
    );
  }
}
