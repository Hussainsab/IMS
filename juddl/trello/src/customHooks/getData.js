const API_LINK = "/taskData.json";

const getData = async () => {
  try {
    let response = await fetch(API_LINK, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    let data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }

  // console.log("data = ", data);
  // .then(function (response) {
  //   console.log(response);
  //   return response.json();
  // })
  // .then(function (myJson) {
  //   console.log(myJson);
  // });
};

export { getData };
