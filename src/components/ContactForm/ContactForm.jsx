import { Component } from 'react';
import { Formik } from 'formik';
import { TiDocumentAdd } from 'react-icons/ti';
import {
  Form,
  FieldWraper,
  Field,
  ErrorMessage,
  SubmitBtn,
} from './ContactForm.styled';
import PropTypes from 'prop-types';
import { contactsFormValidate } from 'constants';

const initialValues = {
  name: '',
  number: '',
};

export class ContactForm extends Component {
  static propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.exact({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ).isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  handleSubmit = (values, { resetForm }) => {
    const lowerCaseName = values.name.toLowerCase();

    if (
      this.props.contacts.some(
        contact => contact.name.toLowerCase() === lowerCaseName
      )
    ) {
      alert(`${values.name} is already in contacts`);
      return;
    }

    this.props.onSubmit(values);
    resetForm(initialValues);
  };

  render() {
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={contactsFormValidate}
        onSubmit={this.handleSubmit}
      >
        <Form>
          <FieldWraper>
            Name
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="span" />
          </FieldWraper>
          <FieldWraper>
            Phone
            <Field type="tel" name="number" />
            <ErrorMessage name="number" component="span" />
          </FieldWraper>
          <SubmitBtn type="submit">
            <TiDocumentAdd size="30" />
            Add contact
          </SubmitBtn>
        </Form>
      </Formik>
    );
  }
}
