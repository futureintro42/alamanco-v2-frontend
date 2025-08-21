import React from "react";
import { useLazyQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";

import Loader from "../../atoms/Loader";
import CertificateDetails from "../../molecules/CertificateForm/CertificateDetails";
import { FIND_INVOICE_BY_ID } from "../../../constants/Query";

const CertificateInfo = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loader, setLoader] = React.useState(true);
  const [dataRow, setDataRow] = React.useState({});
  const [
    findInvoiceByID,
    { loading: f_loading, error: f_error, data: f_data },
  ] = useLazyQuery(FIND_INVOICE_BY_ID);

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
          _id,
          id,
          user,
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
          createdAt,
          updatedAt,
        } = response.response;
        setDataRow({
          _id,
          id,
          user,
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
          createdAt,
          updatedAt,
        });
        setLoader(false);
      }
    }
  }, [f_loading, f_error, f_data, navigate, setLoader]);

  if (loader) return <Loader />;

  return (
    <CertificateDetails title="Certificate details (Check console)" dataRow={dataRow} />
  );
};

export default CertificateInfo;
