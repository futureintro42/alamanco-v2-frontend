import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useLazyQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";

import Loader from "../../atoms/Loader";
import CardForm from "../../molecules/CardForm";
import { cardSchema } from "../../../utils/schema";
import { UPDATE_CARD } from "../../../constants/Mutation";
import { isValidated, uploadManager } from "../../../utils/utils";
import { FIND_CARD_BY_ID } from "../../../constants/Query";

const EditCard = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loader, setLoader] = React.useState(true);
  const [severity, setSeverity] = React.useState("error");
  const [message, setMessage] = React.useState("");
  const [imageSrc, setImageSrc] = React.useState("");
  const [imageValue, setImageValue] = React.useState("");
  const [isSubmitted, setSubmitted] = React.useState(false);
  const [issueDate, setIssueDate] = React.useState("");
  const [expiryDate, setExpiryDate] = React.useState("");
  const [findCardById, { loading: f_loading, error: f_error, data: f_data }] =
    useLazyQuery(FIND_CARD_BY_ID);
  const [updateCard, { loading, error, data }] = useMutation(UPDATE_CARD);
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(cardSchema),
  });

  // Loads default data
  React.useEffect(() => {
    findCardById({ variables: { input: { _id: id } } });
  }, [id, findCardById]);

  // Response: Loads data
  React.useEffect(() => {
    if (!f_loading && !f_error && f_data) {
      const response = f_data.findCardById;
      if (!response.response) {
        navigate("/cards");
      } else {
        const {
          name,
          iqama_number,
          issue_date,
          expiry_date,
          certified_as,
          profile_pic,
          company,
          examiner,
        } = response.response;
        setValue("name", name);
        setValue("iqama_number", iqama_number);
        setValue("certified_as", certified_as);
        setValue("company", company);
        setValue("examiner", examiner);
        setIssueDate(issue_date);
        setExpiryDate(expiry_date);

        setImageValue(profile_pic);
        if (profile_pic) {
          const basePath =
            process.env.REACT_APP_ENV === "local"
              ? process.env.REACT_APP_GATEWAY_LOCAL
              : process.env.REACT_APP_GATEWAY_LIVE;
          setImageSrc(`${basePath}/images/profile/${profile_pic}`);
        }
        setLoader(false);
      }
    }
  }, [f_loading, f_error, f_data, navigate, setLoader, setValue]);

  const onSubmitHandler = (data, e) => {
    e.preventDefault();
    const { name, iqama_number, certified_as, company, examiner } =
      data;
    let issue_date = data.issue_date.split("/");
    issue_date = `${issue_date[2]}-${issue_date[1]}-${issue_date[0]}`;
    let expiry_date = data.expiry_date.split("/");
    expiry_date = `${expiry_date[2]}-${expiry_date[1]}-${expiry_date[0]}`;

    updateCard({
      variables: {
        input: {
          name,
          iqama_number,
          certified_as,
          issue_date,
          expiry_date,
          company,
          examiner,
          _id: id,
          profile_pic: imageValue || "",
        },
      },
    });
  };

  // Response: Submit Handler
  React.useEffect(() => {
    if (!loading && !error && data) {
      const response = data.updateCard;
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

  if (loader) return <Loader />;

  return (
    <CardForm
      handleSubmit={handleSubmit}
      onSubmitHandler={onSubmitHandler}
      register={register}
      errors={errors}
      severity={severity}
      message={message}
      isSubmitted={isSubmitted}
      title="Edit Card"
      submitBtnTxt="Submit"
      issue_date={issueDate}
      expiry_date={expiryDate}
      onChangeFileHandler={onChangeFileHandler}
      imageSrc={imageSrc}
    />
  );
};

export default EditCard;
