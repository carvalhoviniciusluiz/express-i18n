const express = require('express');
const acceptLanguage = require('accept-language');
const { i18n, languages } = require('./i18n');
const app = express();

acceptLanguage.languages(languages);

app.use(i18n.handler());

app.use((req, res, next) => {
  const { lang } = req.query;
  const language = req.headers['accept-language'];
  if (lang || language) {
    i18n.changeLanguage(acceptLanguage.get(lang || language));
  }
  console.log(`current language "${acceptLanguage.get(language)}"`);

  return next();
})

app.get('/', (req, res) => {
  const message = req.i18n.t('message');
  return res.json({ message });
});


app.listen(3333, () => {
  console.log('[backend] started! 🙌');
});
