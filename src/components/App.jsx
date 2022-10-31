import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from 'components/ContactForm';
import { Filter } from 'components/Filter';
import { ContactList } from 'components/ContactList';
import { localStorageAPI } from 'services';

const CONTACTS_KEY = 'contacts';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorageAPI.load(CONTACTS_KEY);

    if (contacts) {
      this.setState({
        contacts: [...contacts],
      });
    }
  }

  componentDidUpdate(_, prevState) {
    const currentContacts = this.state.contacts;
    const previousContacts = prevState.contacts;

    if (previousContacts !== currentContacts) {
      localStorageAPI.save(CONTACTS_KEY, currentContacts);
    }
  }

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
