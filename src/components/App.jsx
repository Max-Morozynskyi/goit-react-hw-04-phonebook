import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(localStorage.getItem('contacts')) ?? [
        { id: 'id-1', name: 'Bart Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Weasley', number: '443-89-12' },
        { id: 'id-3', name: 'Eric Cartman', number: '645-17-79' },
        { id: 'id-4', name: 'Porkey Pig', number: '227-91-26' },
      ]
    );
  });

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const createContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    const existNames = contacts.map(a => a.name.toLowerCase());
    if (existNames.includes(name.toLowerCase())) {
      alert(`${name} is already in your contacts!`);
      return;
    }

    setContacts([contact, ...contacts]);
  };

  const handleFilter = evt => {
    setFilter(evt.currentTarget.value);
  };

  const filterContacts = () => {
    const searchValue = filter.toLowerCase();
    return contacts.filter(item =>
      item.name.toLowerCase().includes(searchValue)
    );
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  // componentDidMount() {
  //   const storageContacts = JSON.parse(localStorage.getItem('contacts'));
  //   if (storageContacts === null) {
  //     this.setState({
  //       contacts: [
  //         { id: 'id-1', name: 'Bart Simpson', number: '459-12-56' },
  //         { id: 'id-2', name: 'Hermione Weasley', number: '443-89-12' },
  //         { id: 'id-3', name: 'Eric Cartman', number: '645-17-79' },
  //         { id: 'id-4', name: 'Porkey Pig', number: '227-91-26' },
  //       ],
  //     });
  //   } else {
  //     this.setState({ contacts: storageContacts });
  //   }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   const { contacts } = this.state;
  //   if (contacts !== prevState.contacts) {
  //     localStorage.setItem('contacts', JSON.stringify(contacts));
  //   }
  // }

  // createContact = ({ name, number }) => {
  //   const contact = {
  //     id: nanoid(),
  //     name,
  //     number,
  //   };
  //   const existNames = this.state.contacts.map(a => a.name.toLowerCase());
  //   if (existNames.includes(name.toLowerCase())) {
  //     alert(`${name} is already in your contacts!`);
  //     return;
  //   }
  //   this.setState(prevState => ({
  //     contacts: [contact, ...prevState.contacts],
  //   }));
  // };

  // handleFilter = evt => {
  //   this.setState({
  //     filter: evt.currentTarget.value,
  //   });
  // };

  // filterContacts = () => {
  //   const { contacts, filter } = this.state;
  //   const searchValue = filter.toLowerCase();
  //   return contacts.filter(item =>
  //     item.name.toLowerCase().includes(searchValue)
  //   );
  // };

  // deleteContact = id => {
  //   this.setState(prevState => ({
  //     contacts: prevState.contacts.filter(contact => contact.id !== id),
  //   }));
  // };

  // render() {
  //   const existContacts = this.filterContacts();
  //   const searchValue = this.state.filter;
  //   this.filterContacts();

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={createContact} />

      <h2>Contacts</h2>
      <Filter value={filter} onFilter={handleFilter} />
      <ContactList contacts={filterContacts()} onDelete={deleteContact} />
    </div>
  );
};
