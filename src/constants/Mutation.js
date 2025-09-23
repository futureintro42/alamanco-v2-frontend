import { gql } from "@apollo/client";

export const SIGNUP = gql`
  mutation signup($input: signupInput!) {
    signup(input: $input) {
      error {
        key
        value
      }
      message
      severity
    }
  }
`;
export const CHANGE_STATUS = gql`
  mutation changeStatus($input: idInput!) {
    changeStatus(input: $input) {
      hasError
      message
      severity
    }
  }
`;
export const DELETE_USER = gql`
  mutation removeUser($input: idInput!) {
    removeUser(input: $input) {
      hasError
      message
      severity
    }
  }
`;
export const CREATE_INVOICE = gql`
  mutation createInvoice($input: invoiceInput!) {
    createInvoice(input: $input) {
      error {
        key
        value
      }
      message
      severity
    }
  }
`;
export const UPDATE_INVOICE = gql`
  mutation updateInvoice($input: invoiceInput!) {
    updateInvoice(input: $input) {
      error {
        key
        value
      }
      message
      severity
    }
  }
`;
export const SET_PASSWORD = gql`
  mutation setPassword($input: setPasswordInput!) {
    setPassword(input: $input) {
      error {
        key
        value
      }
      message
      severity
    }
  }
`;

export const CREATE_CARD = gql`
  mutation createCard($input: cardInput!) {
    createCard(input: $input) {
      error {
        key
        value
      }
      message
      severity
    }
  }
`;
export const UPDATE_CARD = gql`
  mutation updateCard($input: cardInput!) {
    updateCard(input: $input) {
      error {
        key
        value
      }
      message
      severity
    }
  }
`;
export const CHANGE_CARD_STATUS = gql`
  mutation changeCardStatus($input: idInput!) {
    changeCardStatus(input: $input) {
      hasError
      message
      severity
    }
  }
`;
export const CHANGE_INVOICE_STATUS = gql`
  mutation changeInvoiceStatus($input: idInput!) {
    changeInvoiceStatus(input: $input) {
      hasError
      message
      severity
    }
  }
`;
export const CHANGE_PASSWORD = gql`
  mutation changePassword($input: changePasswordInput!) {
    changePassword(input: $input) {
      error {
        key
        value
      }
      message
      severity
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation updateProfile($input: updateProfileInput!) {
    updateProfile(input: $input) {
      error {
        key
        value
      }
      message
      severity
    }
  }
`;
export const DELETE_CARD = gql`
  mutation removeCard($input: objIdInput!) {
    removeCard(input: $input) {
      hasError
      message
      severity
    }
  }
`;
export const DELETE_INVOICE = gql`
  mutation removeInvoice($input: objIdInput!) {
    removeInvoice(input: $input) {
      hasError
      message
      severity
    }
  }
`;

export const CONTACT_US = gql`
  mutation createContact($input: contactInput!) {
    createContact(input: $input) {
      hasError
      message
      severity
    }
  }
`;
