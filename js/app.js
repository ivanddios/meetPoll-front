/* Main mvcblog-front script */

//load external resources
function loadTextFile(url) {
  return new Promise((resolve, reject) => {
    $.get({
      url: url,
      cache: true,
      dataType: 'text'
    }).then((source) => {
      resolve(source);
    }).fail(() => reject());
  });
}


// Configuration
var AppConfig = {
  backendServer: 'http://localhost'
  //backendServer: '/mvcblog'
}

Handlebars.templates = {};
Promise.all([
    I18n.initializeCurrentLanguage('js/i18n'),
    loadTextFile('templates/components/main.hbs').then((source) =>
      Handlebars.templates.main = Handlebars.compile(source)),
    loadTextFile('templates/components/language.hbs').then((source) =>
      Handlebars.templates.language = Handlebars.compile(source)),
    loadTextFile('templates/components/user-nav.hbs').then((source) =>
      Handlebars.templates.user = Handlebars.compile(source)),
    loadTextFile('templates/components/login.hbs').then((source) =>
      Handlebars.templates.login = Handlebars.compile(source)),
    loadTextFile('templates/components/user-edit.hbs').then((source) =>
      Handlebars.templates.profile = Handlebars.compile(source)),
    loadTextFile('templates/components/polls-table.hbs').then((source) =>
      Handlebars.templates.pollstable = Handlebars.compile(source)),
    loadTextFile('templates/components/poll-edit.hbs').then((source) =>
      Handlebars.templates.polledit = Handlebars.compile(source)),
      loadTextFile('templates/components/poll-add.hbs').then((source) =>
      Handlebars.templates.polladd = Handlebars.compile(source)),
    loadTextFile('templates/components/poll-view.hbs').then((source) =>
      Handlebars.templates.pollview = Handlebars.compile(source)),
    loadTextFile('templates/components/poll-row.hbs').then((source) =>
      Handlebars.templates.pollrow = Handlebars.compile(source)),
    loadTextFile('templates/components/gap-add.hbs').then((source) =>
      Handlebars.templates.gapadd = Handlebars.compile(source)),
    loadTextFile('templates/components/gap-edit.hbs').then((source) =>
      Handlebars.templates.gapedit = Handlebars.compile(source)),
    loadTextFile('templates/components/poll-view-row.hbs').then((source) =>
      Handlebars.templates.pollviewrow = Handlebars.compile(source)),
    loadTextFile('templates/components/assignation-add.hbs').then((source) =>
      Handlebars.templates.assignationadd = Handlebars.compile(source)),
    loadTextFile('templates/components/gap-row.hbs').then((source) =>
      Handlebars.templates.gaprow = Handlebars.compile(source))
  ])
  .then(() => {
    $(() => {
      new MainComponent().start();
    });
  }).catch((err) => {
    alert('FATAL: could not start app ' + err);
  });
