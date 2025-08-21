import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useLazyQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";

import Loader from "../../atoms/Loader";
import InvoiceForm from "../../molecules/CertificateForm";
import { invoiceSchema } from "../../../utils/schema";
import { UPDATE_INVOICE } from "../../../constants/Mutation";
import { isValidated } from "../../../utils/utils";
import { FIND_INVOICE_BY_ID } from "../../../constants/Query";

const EditInvoice = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loader, setLoader] = React.useState(true);
  const [severity, setSeverity] = React.useState("error");
  const [message, setMessage] = React.useState("");
  const [isSubmitted, setSubmitted] = React.useState(false);
  const [insDate, setInsDate] = React.useState("");
  const [insNextDate, setInsNextDate] = React.useState("");
  const [resultStatusDefaultValue, setResultStatusDefaultValue] = useState("");
  const [
    findInvoiceByID,
    { loading: f_loading, error: f_error, data: f_data },
  ] = useLazyQuery(FIND_INVOICE_BY_ID);
  const [updateInvoice, { loading, error, data }] = useMutation(UPDATE_INVOICE);
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(invoiceSchema),
  });

  // Loads default data
  React.useEffect(() => {
    findInvoiceByID({ variables: { input: { _id: id } } });
  }, [id, findInvoiceByID]);

  // Response: Loads data
  React.useEffect(() => {
    if (!f_loading && !f_error && f_data) {
      const response = f_data.findInvoiceByID;
      if (!response.response) {
        navigate("/certificate");
      } else {
        const {
          sticker_number,
          reference_number,
          equipment_type,
          equipment_description,
          make,
          serial_number,
          year_of_manufacturing,
          plant_number,
          location_of_equipment,
          owner_business_name,
          owner_business_address,
          details,
          standard_specification,
          business_name,
          business_address,
          inspection_date,
          inspection_next_date,
          inspector_name,
          resultStatus,
        } = response.response;
        setValue("sticker_number", sticker_number);
        setValue("reference_number", reference_number);
        setValue("equipment_type", equipment_type);
        setValue("equipment_description", equipment_description);
        setValue("make", make);
        setValue("serial_number", serial_number);
        setValue("year_of_manufacturing", year_of_manufacturing);
        setValue("plant_number", plant_number);
        setValue("location_of_equipment", location_of_equipment);
        setValue("owner_business_name", owner_business_name);
        setValue("owner_business_address", owner_business_address);
        setValue("details", details);
        setValue("standard_specification", standard_specification);
        setValue("business_name", business_name);
        setValue("business_address", business_address);
        setValue("inspector_name", inspector_name);
        setValue("resultStatus", resultStatus);
        setResultStatusDefaultValue(resultStatus);
        setInsDate(inspection_date)
        setInsNextDate(inspection_next_date)
        setLoader(false);
      }
    }
  }, [f_loading, f_error, f_data, navigate, setLoader, setValue]);

  const onSubmitHandler = (data, e) => {
    e.preventDefault();
    let inspection_date = data.inspection_date.split("/");
    inspection_date = `${inspection_date[2]}-${inspection_date[1]}-${inspection_date[0]}`;
    let inspection_next_date = data.inspection_next_date.split("/");
    inspection_next_date = `${inspection_next_date[2]}-${inspection_next_date[1]}-${inspection_next_date[0]}`;

    updateInvoice({
      variables: {
        input: {
          ...data,
          inspection_date,
          inspection_next_date,
          _id: id,
        },
      },
    });
  };

  // Response: Submit Handler
  React.useEffect(() => {
    if (!loading && !error && data) {
      const response = data.updateInvoice;
      setSeverity(response.severity);
      setMessage(response.message);
      isValidated(response.error, setError);
      setSubmitted(false);
      if (!response.error && response.severity.includes("success")) {
        navigate("/certificate");
      }
    }
  }, [loading, error, data, setSeverity, setMessage, setError, navigate]);

  if (loader) return <Loader />;

  return (
    <InvoiceForm
      handleSubmit={handleSubmit}
      onSubmitHandler={onSubmitHandler}
      register={register}
      errors={errors}
      severity={severity}
      message={message}
      isSubmitted={isSubmitted}
      title="Edit Certificate"
      submitBtnTxt="Submit"
      insDate={insDate}
      insNextDate={insNextDate}
      resultStatusDefaultValue={resultStatusDefaultValue}
    />
  );
};

export default EditInvoice;
