export const setCookie = (cname, cvalue) => {
  const d = new Date();
  d.setTime(
    d.getTime() +
      parseInt(process.env.REACT_APP_TOKEN_EXPIRY_DAY, 10) * 24 * 60 * 60 * 1000
  );
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
};

export const getCookie = (cname) => {
  const name = `${cname}=`;
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

export const deleteCookie = (cname, cvalue, exdays) => {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
};

export const isValidated = (errors, setError) => {
  if (errors) {
    errors
      .filter((x) => x.value && x)
      .map((x) =>
        setError(x.key, {
          type: "manual",
          message: x.value,
        })
      );
    return false;
  }
  return true;
};

export const uploadManager = (inputField, getSize = false) =>
  new Promise((resolve, reject) => {
    if (inputField.files.length <= 0) {
      reject(new Error("No files provided"));
    }
    const reader = new FileReader(); // create new file reader
    reader.addEventListener("loadend", (r) => {
      // when image ready
      if (getSize) {
        const image = new Image();
        image.onload = () =>
          resolve({
            photo: r.target.result,
            height: image.height,
            width: image.width,
          });
        image.src = r.target.result;
      } else {
        resolve(r.target.result);
      }
    });
    reader.addEventListener("onerror", (err) => {
      reject(new Error(err.message));
    });
    reader.readAsDataURL(inputField.files[0]); // read uploaded file
  });

export const padTo2Digits = (num) => {
  return num.toString().padStart(2, "0");
};

export const formatDate = (date) => {
  return [
    padTo2Digits(new Date(date).getDate()),
    new Date(date).toLocaleString("default", {
      month: "long",
    }),
    new Date(date).getFullYear(),
  ].join("-");
};
