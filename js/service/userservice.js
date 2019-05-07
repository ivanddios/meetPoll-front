class UserService {
  constructor() {

  }
  
  loginWithSessionData() {
    var self = this;
    return new Promise((resolve, reject) => {
      if (window.sessionStorage.getItem('login') &&
        window.sessionStorage.getItem('pass')) {
        self.login(window.sessionStorage.getItem('login'), window.sessionStorage.getItem('pass'))
          .then(() => {
            resolve(window.sessionStorage.getItem('login'));
          })
          .catch(() => {
            reject();
          });
      } else {
        resolve(null);
      }
    });
  }

  login(login, pass) {
    return new Promise((resolve, reject) => {

      $.get({
          url: AppConfig.backendServer+'/meetPoll_TSW/rest/user/' + login,
          beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(login + ":" + pass));
          }
        })
        .then(() => {
          //keep this authentication forever
          window.sessionStorage.setItem('login', login);
          window.sessionStorage.setItem('pass', pass);
          $.ajaxSetup({
            beforeSend: (xhr) => {
              xhr.setRequestHeader("Authorization", "Basic " + btoa(login + ":" + pass));
            }
          });
          resolve();
        })
        .fail((error) => {
          window.sessionStorage.removeItem('login');
          window.sessionStorage.removeItem('pass');
          $.ajaxSetup({
            beforeSend: (xhr) => {}
          });
          reject(error);
        });
    });
  }


  logout() {
    window.sessionStorage.removeItem('login');
    window.sessionStorage.removeItem('pass');
    $.ajaxSetup({
      beforeSend: (xhr) => {}
    });
  }

  register(user) {
    return $.ajax({
      url: AppConfig.backendServer+'/meetPoll_TSW/rest/user',
      method: 'POST',
      data: JSON.stringify(user),
      contentType: 'application/json'
    });
  }

  updateUser(data) {
    return $.ajax({
      url: AppConfig.backendServer+'/meetPoll_TSW/rest/user',
      method: 'PUT',
      data: JSON.stringify(data),
      contentType: 'application/json'
    });
  }


  deleteUser(username) {
    return $.ajax({
      url: AppConfig.backendServer+'/meetPoll_TSW/rest/user/' + username,
      method: 'DELETE'
    });
  }


  findUser() {
    return $.get(AppConfig.backendServer+'/meetPoll_TSW/rest/user');
  }


}
