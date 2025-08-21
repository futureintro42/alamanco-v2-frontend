import * as Yup from "yup";

export const signupSchema = Yup.object().shape({
  first_name: Yup.string().min(3).max(150).required("Please enter first name"),
  last_name: Yup.string().min(3).max(150).required("Please enter last name"),
  email: Yup.string()
    .max(150)
    .email("Please indicate a valid email address.")
    .required("Please enter email address."),
  password: Yup.string()
    .required("Please Enter your password")
    .min(6, "Your password must be longer than 6 characters.")
    .max(18)
    .matches(/^(?=.{6,})/, "Must Contain 6 Characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])/,
      "Must Contain One Uppercase, One Lowercase"
    ) // eslint-disable-next-line
    .matches(/^(?=.*[!@#\$%\^&\*])/, "Must Contain One Special Case Character")
    .matches(/^(?=.{6,20}$)\D*\d/, "Must Contain One Number"),
  confirmPassword: Yup.string()
    .required("Please Enter your password")
    .min(6, "Your password must be longer than 6 characters.")
    .max(18)
    .matches(/^(?=.{6,})/, "Must Contain 6 Characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])/,
      "Must Contain One Uppercase, One Lowercase"
    ) // eslint-disable-next-line
    .matches(/^(?=.*[!@#\$%\^&\*])/, "Must Contain One Special Case Character")
    .matches(/^(?=.{6,20}$)\D*\d/, "Must Contain One Number")
    .oneOf([Yup.ref("password"), null], "Passwords don't match!")
    .required("Please enter confirm password"),
});
export const loginSchema = Yup.object()
  .shape({
    email: Yup.string()
      .email("Must be a valid email")
      .max(150)
      .required("Email is required"),
    password: Yup.string().required("Please enter password"),
  })
  .required();

export const forgotPasswordSchema = Yup.object()
  .shape({
    email: Yup.string()
      .email("Must be a valid email")
      .max(150)
      .required("Email is required"),
  })
  .required();
export const setPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Please Enter your password")
    .min(6, "Your password must be longer than 6 characters.")
    .max(18)
    .matches(/^(?=.{6,})/, "Must Contain 6 Characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])/,
      "Must Contain One Uppercase, One Lowercase"
    ) // eslint-disable-next-line
    .matches(/^(?=.*[!@#\$%\^&\*])/, "Must Contain One Special Case Character")
    .matches(/^(?=.{6,20}$)\D*\d/, "Must Contain One Number"),
  confirmPassword: Yup.string()
    .required("Please Enter your password")
    .min(6, "Your password must be longer than 6 characters.")
    .max(18)
    .matches(/^(?=.{6,})/, "Must Contain 6 Characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])/,
      "Must Contain One Uppercase, One Lowercase"
    ) // eslint-disable-next-line
    .matches(/^(?=.*[!@#\$%\^&\*])/, "Must Contain One Special Case Character")
    .matches(/^(?=.{6,20}$)\D*\d/, "Must Contain One Number")
    .oneOf([Yup.ref("password"), null], "Passwords don't match!")
    .required("Please enter confirm password"),
});
export const invoiceSchema = Yup.object().shape({
  sticker_number: Yup.string().max(30).required("Strike number is required"),
  reference_number: Yup.string()
    .max(30)
    .required("Reference Number is required"),
  equipment_type: Yup.string().max(30).required("Equipment type is required"),
  equipment_description: Yup.string()
    .max(200)
    .required("Equipment description is required"),
  make: Yup.string().max(150).required("Make is required"),
  serial_number: Yup.string().max(100).required("Serial number is required"),
  year_of_manufacturing: Yup.string()
    .max(30)
    .required("Year of manufacturing is required"),
  plant_number: Yup.string().max(100).required("Plant number is required"),
  location_of_equipment: Yup.string()
    .max(30)
    .required("Location of the equipment is required"),
  owner_business_name: Yup.string()
    .max(150)
    .required("Owner's Business name is required"),
  owner_business_address: Yup.string()
    .max(200)
    .required("Owner's Business address is required"),
  details: Yup.string().max(200).required("details is required"),
  standard_specification: Yup.string()
    .max(200)
    .required("Standard Specification is required"),
  business_name: Yup.string().max(100).required("Business name is required"),
  business_address: Yup.string()
    .max(200)
    .required("Business address is required"),
  inspection_date: Yup.string().max(30).required("Inspection date is required"),
  inspection_next_date: Yup.string()
    .max(30)
    .required("Inspection next date is required"),
  inspector_name: Yup.string()
    .max(100)
    .required("Inspector's name is required"),
    resultStatus: Yup.string().required("resultStatus is required"),
});

export const cardSchema = Yup.object().shape({
  name: Yup.string().max(150).required("Card holder name is required"),
  iqama_number: Yup.string().max(100).required("Iqama Number is required"),
  issue_date: Yup.string().max(30).required("Issue date is required"),
  expiry_date: Yup.string().max(30).required("Expiry date is required"),
  certified_as: Yup.string().max(100).required("Certified as is required"),
  company: Yup.string().max(100).required("Company as is required"),
  examiner: Yup.string().max(100).required("Examiner as is required"),
  profile_pic: Yup.string().nullable().notRequired(),
});

export const updateProfileSchema = Yup.object().shape({
  first_name: Yup.string().min(3).max(150).required("Please enter first name"),
  last_name: Yup.string().min(3).max(150).required("Please enter last name"),
  role: Yup.boolean().nullable().notRequired(),
});

export const changePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .required("Please Enter your old password")
    .min(6, "Your password must be longer than 6 characters.")
    .max(18)
    .matches(/^(?=.{6,})/, "Must Contain 6 Characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])/,
      "Must Contain One Uppercase, One Lowercase"
    ) // eslint-disable-next-line
    .matches(/^(?=.*[!@#\$%\^&\*])/, "Must Contain One Special Case Character")
    .matches(/^(?=.{6,20}$)\D*\d/, "Must Contain One Number"),
  password: Yup.string()
    .required("Please Enter your password")
    .min(6, "Your password must be longer than 6 characters.")
    .max(18)
    .matches(/^(?=.{6,})/, "Must Contain 6 Characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])/,
      "Must Contain One Uppercase, One Lowercase"
    ) // eslint-disable-next-line
    .matches(/^(?=.*[!@#\$%\^&\*])/, "Must Contain One Special Case Character")
    .matches(/^(?=.{6,20}$)\D*\d/, "Must Contain One Number"),
  confirmPassword: Yup.string()
    .required("Please Enter your password")
    .min(6, "Your password must be longer than 6 characters.")
    .max(18)
    .matches(/^(?=.{6,})/, "Must Contain 6 Characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])/,
      "Must Contain One Uppercase, One Lowercase"
    ) // eslint-disable-next-line
    .matches(/^(?=.*[!@#\$%\^&\*])/, "Must Contain One Special Case Character")
    .matches(/^(?=.{6,20}$)\D*\d/, "Must Contain One Number")
    .oneOf([Yup.ref("password"), null], "Passwords don't match!")
    .required("Please enter confirm password"),
});


