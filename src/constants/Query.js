import { gql } from "@apollo/client";

export const AUTHENTICATION = gql`
  query {
    auth {
      status
      response {
        name
        role
        status
      }
    }
  }
`;
export const LOGIN = gql`
  query login($input: loginInput!) {
    login(input: $input) {
      error {
        key
        value
      }
      message
      severity
      response {
        name
        role
        status
      }
      token
    }
  }
`;
export const GET_TOKEN_TO_SET_PASSWORD = gql`
  query getTokenToSetPassword($input: emailInput!) {
    getTokenToSetPassword(input: $input) {
      error {
        key
        value
      }
      message
      severity
      token
    }
  }
`;
export const USER_LIST = gql`
query userList($input: userListInput!) {
  userList(input: $input) {
      response {
        _id,
        id
        first_name
        last_name
        email
        role
        status
        action {
          view
          changeStatus
          remove
        }
      }
    }
  }
`;

export const INVOICE_LIST = gql`
  query {
    invoiceList {
      response {
        _id
        id
        user
        business_name
        inspection_date
        inspection_next_date
        inspector_name
        status
        action {
          changeStatus
          view
          edit
          remove
        }
      }
    }
  }
`;

export const FIND_INVOICE_BY_ID = gql`
  query findInvoiceByID($input: objIdInput!) {
    findInvoiceByID(input: $input) {
      message
      severity
      response {
        _id
        id
        user
        sticker_number
        reference_number
        equipment_type
        equipment_description
        make
        serial_number
        year_of_manufacturing
        plant_number
        location_of_equipment
        owner_business_name
        owner_business_address
        details
        standard_specification
        business_name
        business_address
        inspection_date
        inspection_next_date
        inspector_name
        resultStatus
        createdAt
        updatedAt
      }
    }
  }
`;
export const CARD_LIST = gql`
  query {
    cardList {
      response {
        _id
        id
        profile_pic
        name
        iqama_number
        issue_date
        expiry_date
        certified_as
        status
        createdAt
        updateddAt
        action {
          changeStatus
          view
          edit
          remove
        }
      }
    }
  }
`;

export const FIND_CARD_BY_ID = gql`
  query findCardById($input: objIdInput!) {
    findCardById(input: $input) {
      message
      severity
      response {
        _id
        id
        name
        iqama_number
        issue_date
        expiry_date
        certified_as
        profile_pic
        company
        examiner
        createdAt
        updateddAt
      }
    }
  }
`;

export const FIND_PROFILE_DETAIL = gql`
  query userDetails($input: objIdInputOp) {
    userDetails(input: $input) {
      response {
        _id
        first_name
        last_name
        email
        role
        profile_pic
        status
      }
    }
  }
`;

export const FIND_CARD_BY_SEARCH = gql`
  query findCardBySearch($input: objSearchInput!) {
    findCardBySearch(input: $input) {
      message
      severity
      response {
        _id
        id
        name
        iqama_number
        issue_date
        expiry_date
        certified_as
        profile_pic
        company
        examiner
        createdAt
        updateddAt
      }
    }
  }
`;

export const FIND_INVOICE_BY_SEARCH = gql`
  query findInvoiceBySearch($input: objSearchInput!) {
    findInvoiceBySearch(input: $input) {
      message
      severity
      response {
        _id
        id
        sticker_number
        reference_number
        equipment_type
        equipment_description
        make
        serial_number
        year_of_manufacturing
        plant_number
        location_of_equipment
        owner_business_name
        owner_business_address
        details
        standard_specification
        business_name
        business_address
        inspection_date
        inspection_next_date
        inspector_name
        resultStatus
        createdAt
        updatedAt
      }
    }
  }
`;
export const CONTACT_US_LIST = gql`
  query {
    contactList {
      response {
        _id
        id
        name
        email
        mobile
        subject
        message
        createdAt
      }
    }
  }
`;
