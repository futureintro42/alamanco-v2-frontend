import React from "react";
import { useLazyQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";

import Loader from "../../atoms/Loader";
import CardDetails from "../../molecules/CardForm/CardDetails";
import { FIND_CARD_BY_ID } from "../../../constants/Query";

const View = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [dataRow, setDataRow] = React.useState({});
  const [loader, setLoader] = React.useState(true);
  const [findCardById, { loading: f_loading, error: f_error, data: f_data }] =
    useLazyQuery(FIND_CARD_BY_ID);

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
          _id,
          id,
          name,
          iqama_number,
          issue_date,
          expiry_date,
          certified_as,
          profile_pic,
          company,
          examiner,
        } = response.response;
        const objData = {
          _id,
          id,
          name,
          iqama_number,
          certified_as,
          issue_date,
          expiry_date,
          company,
          examiner,
        };
        if (profile_pic) {
          const basePath =
            process.env.REACT_APP_ENV === "local"
              ? process.env.REACT_APP_GATEWAY_LOCAL
              : process.env.REACT_APP_GATEWAY_LIVE;
          objData.profile_pic = `${basePath}/images/profile/${profile_pic}`;
        }
        setDataRow(objData);
        setLoader(false);
      }
    }
  }, [f_loading, f_error, f_data, navigate, setLoader]);

  if (loader) return <Loader />;

  return <CardDetails title="Card Details (Check in console)" dataRow={dataRow} />;
};

export default View;
