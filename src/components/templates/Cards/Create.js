import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import CardForm from "../../molecules/CardForm";
import { cardSchema } from "../../../utils/schema";
import { CREATE_CARD } from "../../../constants/Mutation";
import { isValidated, uploadManager } from "../../../utils/utils";

const CreateCard = () => {
  const navigate = useNavigate();
  const [severity, setSeverity] = React.useState("error");
  const [message, setMessage] = React.useState("");
  const [imageSrc, setImageSrc] = React.useState("");
  const [imageValue, setImageValue] = React.useState("");
  const [isSubmitted, setSubmitted] = React.useState(false);
  const [createCard, { loading, error, data }] = useMutation(CREATE_CARD);
  const {
    register,
    handleSubmit,
    setError,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(cardSchema),
  });

  const onSubmitHandler = (data, e) => {
    e.preventDefault();
    const {name, iqama_number, certified_as, company, examiner } =
      data;
    let issue_date = data.issue_date.split("/");
    issue_date = `${issue_date[2]}-${issue_date[1]}-${issue_date[0]}`;
    let expiry_date = data.expiry_date.split("/");
    expiry_date = `${expiry_date[2]}-${expiry_date[1]}-${expiry_date[0]}`;

    createCard({
      variables: {
        input: {
          _id: "",
          name,
          iqama_number,
          certified_as,
          issue_date,
          expiry_date,
          company,
          examiner,
          profile_pic: imageValue,
        },
      },
    });
  };

  // Response: Submit Handler
  React.useEffect(() => {
    if (!loading && !error && data) {
      const response = data.createCard;
      setSeverity(response.severity);
      setMessage(response.message);
      isValidated(response.error, setError);
      setSubmitted(false);
      if (!response.error && response.severity.includes("success")) {
        navigate("/cards");
      }
    }
  }, [loading, error, data, setSeverity, setMessage, setError, navigate]);

  // File upload handler
  const onChangeFileHandler = (event) => {
    const { files } = event.target;
    if (files && files[0]) {
      const { name, size } = files[0];
      const fileSize = size / 1024 / 1024; // in MiB
      const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
      if (!allowedExtensions.exec(name)) {
        setError("profile_pic", {
          type: "manual",
          message:
            "Please you can upload file having extensions .jpeg/.jpg/.png/.gif only.",
        });
      } else if (fileSize > 5) {
        setError("profile_pic", {
          type: "manual",
          message: "File size exceeds 5 MiB",
        });
      } else {
        uploadManager(event.target)
          .then((src) => {
            setImageSrc(src);
            setImageValue(src);
            resetField("profile_pic");
          })
          .catch((err) => console.error(err));
      }
    }
  };

  return (
    <CardForm
      handleSubmit={handleSubmit}
      onSubmitHandler={onSubmitHandler}
      register={register}
      errors={errors}
      severity={severity}
      message={message}
      isSubmitted={isSubmitted}
      title="Create Card"
      submitBtnTxt="Create"
      issue_date=""
      expiry_date=""
      onChangeFileHandler={onChangeFileHandler}
      imageSrc={imageSrc}
    />
  );
};

export default CreateCard;
