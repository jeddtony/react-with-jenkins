import axios from "axios";

const apiUrl = "https://api.github.com/search";

const defaultPageLength = 9;
function init() {
  const headers = {};

  const instance = axios.create({
    baseURL: apiUrl,
    timeout: 50000,
    headers,
  });

  instance.interceptors.response.use(
    function (response) {
      let finalResponse = { ...response, status: 200 };
      return finalResponse;
    },
    function (error) {
      console.log(error);

      if (error.response) {
        let finalResponse = {
          ...error,
          success: false,
          status: error.response.status,
          statusCode: error.response.status,
        };
        return finalResponse;
      } else {
        return {
          success: false,
          message: "Cannot connect to the internet",
        };
      }
    }
  );

  return instance;
}

function processResult(response) {
  let { status } = response;

  if (!status) {
    return {
      success: false,
      message: "Cannot connect to the internet",
    };
  }

  try {
    if (status === 200) {
      return {
        success: true,
        data: response.data,
      };
    } else if (status === 500) {
      return { success: false, message: "Something went wrong", data: [] };
    }
    return {
      success: response.response.data.status,
      message: response.response.data.message,
    };
  } catch (error) {
    return {
      success: error.success,
      message: error.message,
    };
  }
}

async function getUsers(queryString, page) {
  let results = await init().get(
    `users?q=${queryString}&per_page=${defaultPageLength}&page=${page} in:login`
  );
  console.log(results);
  return processResult(results);
}

let exportObject = { getUsers };
export default exportObject;
