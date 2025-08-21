import React from "react";
import { useQuery } from "@apollo/client";

import { AUTHENTICATION } from "../constants/Query";

const useAuthentication = () => {
  const [response, setResponse] = React.useState(null);
  const [queryStatus, setQueryStatus] = React.useState(false);
  const [message, setMessage] = React.useState("User authenticating!");
  const { loading, error, data } = useQuery(AUTHENTICATION);

  React.useEffect(() => {
    if (!loading && !error && data) {
      const { status: userStatus, response } = data.auth;
      if (userStatus && response) {
        const { name = "", role = "", status = "inactive" } = response;
        if (status === "active") {
          const payload = {
            isLoggedIn: true,
            name,
            role,
            status,
          };
          setResponse(payload);
        } else {
          setMessage(
            "Your profile is not activeted yet. Please contact to administrator."
          );
        }
      } else {
        setMessage("");
      }
      setQueryStatus(true);
    }
  }, [loading, error, data]);

  return [loading, error, queryStatus, response, message];
};

export default useAuthentication;
