class ProfileComponent extends Fronty.ModelComponent {
    constructor(userModel, router) {
      super(Handlebars.templates.profile, userModel);
     
      this.userModel = userModel;
      this.userService = new UserService();
      this.router = router;
  

      this.addEventListener('click', '#dropOut', () => {
        var username = $('#username').val()

        this.userService.deleteUser(username)
        .then(() => {
          this.userModel.set((model) => {
            model.dropOut = I18n.translate('User deleted!');

            this.userModel.logout();
            this.userService.logout();
            this.router.goToPage("login");
          });
        })
        .fail((xhr, errorThrown, statusText) => {
          if (xhr.status == 400) {
            this.userModel.set((model) => {
              model.error = I18n.translate(xhr.responseJSON);
            });
          } else {
            alert('An error has occurred during request: ' + statusText + '.' + xhr.responseText);
          }
        });
      });
      
  
      this.addEventListener('click', '#modifyprofile', () => {
        if( $('#notifications').is(':checked')){
          var notificationValue = 1;
        } else {
          notificationValue = 0;
        }
        this.userService.updateUser({
            username: $('#username').val(),
            password: $('#passwd').val(),
            confirmPassword: $('#confirmPasswd').val(),
            email: $('#email').val(),
            notifications: notificationValue
          })
          .then(() => {
            this.userModel.set((model) => {
              model.message = I18n.translate('User updated!');
              this.router.goToPage('polls');
            });
          })
          .fail((xhr, errorThrown, statusText) => {
            if (xhr.status == 400) {
              this.userModel.set((model) => {
                model.error = I18n.translate(xhr.responseJSON);
               // console.log(xhr);
              });
            } else {
              alert('An error has occurred during request: ' + statusText + '.' + xhr.responseText);
            }
          });
      });
    }
    
  
    afterRender(){
      
      setTimeout(function() {
        $(".alert-success").alert('close');
        }, 7000);
    }

    onStart() {

        this.userService.findUser()
          .then((user) => {
            this.userModel.set((model) => {
              this.userModel.message = null;
              this.userModel.setSelectedUser(user);
            });
          });
    }

  }
  
  