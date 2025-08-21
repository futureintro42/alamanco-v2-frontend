import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import InvoiceForm from "../../molecules/CertificateForm";
import { invoiceSchema } from "../../../utils/schema";
import { CREATE_INVOICE } from "../../../constants/Mutation";
import { isValidated } from "../../../utils/utils";

const CreateInvoice = () => {
  const navigate = useNavigate();
  const [severity, setSeverity] = React.useState("error");
  const [message, setMessage] = React.useState("");
  const [isSubmitted, setSubmitted] = React.useState(false);
  const [createInvoice, { loading, error, data }] = useMutation(CREATE_INVOICE);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(invoiceSchema),
  });

  const onSubmitHandler = (data, e) => {
    e.preventDefault();
    let inspection_date = data.inspection_date.split("/");
    inspection_date = `${inspection_date[2]}-${inspection_date[1]}-${inspection_date[0]}`;
    let inspection_next_date = data.inspection_next_date.split("/");
    inspection_next_date = `${inspection_next_date[2]}-${inspection_next_date[1]}-${inspection_next_date[0]}`;

    createInvoice({
      variables: {
        input: { ...data, inspection_date, inspection_next_date},
      },
    });
  };

  // Response: Submit Handler
  React.useEffect(() => {
    if (!loading && !error && data) {
      const response = data.createInvoice;
      setSeverity(response.severity);
      setMessage(response.message);
      isValidated(response.error, setError);
      setSubmitted(false);
      if (!response.error && response.severity.includes("success")) {
        navigate('/certificate');
      }
    }
  }, [loading, error, data, setSeverity, setMessage, setError, navigate]);

  return (
    <InvoiceForm
      handleSubmit={handleSubmit}
      onSubmitHandler={onSubmitHandler}
      register={register}
      errors={errors}
      severity={severity}
      message={message}
      isSubmitted={isSubmitted}
      title="Create Certificate"
      submitBtnTxt="Create"
      insDate=""
      insNextDate=""
      resultStatusDefaultValue=""
    />
  );
};

export default CreateInvoice;
