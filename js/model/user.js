class UserModel extends Fronty.Model {
  constructor() {
    super('UserModel');
    this.isLogged = false;
    this.currentUser = '';
  }

  setLoggeduser(loggedUser) {
    this.set((self) => {
      self.currentUser = loggedUser;
      self.isLogged = true;
      this.currentUser = loggedUser;
    });
  }


  logout() {
    this.set((self) => {
      delete self.currentUser;
      self.isLogged = false;
    });
  }


  setSelectedUser(loggedUser) {
    this.set((self) => {
      self.selectedUser = loggedUser;
    });
  }

}
