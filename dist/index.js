"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/es.object.assign.js");

var _axios = _interopRequireDefault(require("axios"));

var _auth = require("@nextcloud/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var client = _axios.default.create({
  headers: {
    requesttoken: (0, _auth.getRequestToken)()
  }
}); // [VWORKSPACE] Change all method such as PUT, DELETE, MOVE ... to POST


client.interceptors.request.use(function (config) {
  if (config.method) {
    var method = config.method.toUpperCase(); // Change all request except POST GET HEAD to POST

    if (method !== 'POST' && method !== 'GET' && method !== 'HEAD') {
      config.headers['Target-Request-Method'] = method;
      config.method = 'post';
      console.log("Axios overide: ", config.headers);
    }
  }

  return config;
}, function (error) {
  return Promise.reject(error);
});
var cancelableClient = Object.assign(client, {
  CancelToken: _axios.default.CancelToken,
  isCancel: _axios.default.isCancel
});
(0, _auth.onRequestTokenUpdate)(function (token) {
  return client.defaults.headers.requesttoken = token;
});
var _default = cancelableClient;
exports.default = _default;
//# sourceMappingURL=index.js.map