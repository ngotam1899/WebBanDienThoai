import axios from "axios";
import qs from "query-string";
import _ from "lodash";

const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
);

instance.interceptors.response.use(
  r => r,
  error => Promise.reject(error)
);

const _requestResponse = response => {
  const status = _.get(response, "status");
  switch (status) {
    case 403:
      return { message: "Invalid token", kickOut: true };
    case 404:
      return { message: "Cannot connect to server" };
    case 200: {
      const message = _.get(response, "data.message");
      let data = _.get(response, "data");
      if (!_.isEmpty(message)) {
        data = { ...data, message: "" };
        return {
          ...response,
          data,
        };
      }
      return response;
    }
    default:
      return response;
  }
};

const _requestError = err => {
  const message = _.get(err, "response.data.error.message");
  const error = err;
  if (typeof message === "string") {
    error.message = message;
  } else {
    error.message = "Whoops! Something went wrong";
  }
  throw error;
};

const get = (endpoints, params, headers) => {
  if (_.isEmpty(headers)) {
    return instance
      .get(`${endpoints}${params ? `?${qs.stringify(params)}` : ``}`)
      .then(_requestResponse)
      .catch(_requestError);
  }
  return instance
    .get(`${endpoints}${params ? `?${qs.stringify(params)}` : ``}`, headers)
    .then(_requestResponse)
    .catch(_requestError);
};

const getAll = async (endpoints, params, headers) => {
  const { data: res } = await get(endpoints, params, headers);
  const { limit, page, total } = res.metadata;
  const totalPage = Math.round(total/limit);
  const listRequests = [];
  let allData = res.data;
  if (page < totalPage) {
    for (let i = 1; i < totalPage; i += 1) {
      listRequests.push(
        get(endpoints, {...params, page: i}, headers)
      );
    }
    const result = await Promise.all(listRequests);
    const pages = _.orderBy(
      result.map(({ data }) => data),
      'metadata.page'
    );

    pages.forEach(pageInfo => {
      allData = [...allData, ...pageInfo.data];
    });
  }
  return { data: allData };
};

const post = (endpoints, params, headers) => {
  if (_.isEmpty(headers)) {
    return instance
      .post(`${endpoints}`, params)
      .then(_requestResponse)
      .catch(_requestError);
  }
  return instance
    .post(`${endpoints}`, params, headers)
    .then(_requestResponse)
    .catch(_requestError);
};

const put = (endpoints, params, headers) => {
  if (_.isEmpty(headers)) {
    return instance
      .put(`${endpoints}`, params)
      .then(_requestResponse)
      .catch(_requestError);
  }
  return instance
    .put(`${endpoints}`, params, headers)
    .then(_requestResponse)
    .catch(_requestError);
};

const patch = (endpoints, params) => {
  return instance
    .patch(`${endpoints}`, params)
    .then(_requestResponse)
    .catch(_requestError);
};

const del = endpoints => {
  return instance
    .delete(`${endpoints}`)
    .then(_requestResponse)
    .catch(_requestError);
};

const changeHeaders = headers => {
  if (typeof headers === "undefined") {
    return;
  }
  const defaultHeaders = _.get(instance, "defaults.headers");
  const cleanHeaders = _.omitBy(  // xóa đi những header empty
    {
      ...defaultHeaders,
      ...headers
    },
    _.isEmpty
  );
  instance.defaults.headers = cleanHeaders;
};

export default {
  get,
  post,
  patch,
  delete: del,
  changeHeaders,
  getAll,
  put
};
