class PollModel extends Fronty.Model {

  constructor(id, title, ubication, author, link) {
    super('PollModel'); //call super
    
    if (id) {
      this.id = id;
    }
    
    if (title) {
      this.title = title;
    }

    if (ubication) {
      this.ubication = ubication;
    }
    
    if (author) {
      this.author = author;
    }

    if (link) {
      this.link = link;
    }
    
  }

  setTitle(title) {
    this.set((self) => {
      self.title = title;
    });
  }

  setUbication(ubication) {
    this.set((self) => {
      self.ubication = ubication;
    });
  }

  setAuthor(author) {
    this.set((self) => {
      self.author = author;
    });
  }

  setLink(link) {
    this.set((self) => {
      self.link = link;
    });
  }

}
