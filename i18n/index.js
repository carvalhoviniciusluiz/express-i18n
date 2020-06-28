const i18n = require('i18next');
const resources = require('./locales');
const acceptLanguage = require('accept-language');

const languages = ['en-US', 'pt-BR'];

i18n.init({
  lng: 'en-US',
  fallbackLng: languages,
  resources
});

i18n.handler = function () {
  return function (request, response, next) {
    request.i18n = i18n;
    request.t = i18n.t.bind(i18n);

    return next();
  }
}

const changeLangRequest = function (request) {
  const { i18n } = request;

  const language = request.headers['accept-language'];
  i18n.changeLanguage(acceptLanguage.get(language));

  return i18n;
}

module.exports = {
  i18n,
  languages,
  changeLangRequest
};
