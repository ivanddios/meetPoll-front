class PollsComponent extends Fronty.ModelComponent {
  constructor(pollsModel, userModel, router) {
    super(Handlebars.templates.pollstable, pollsModel, null, null);
    
    
    this.pollsModel = pollsModel;
    this.userModel = userModel;
    this.addModel('user', userModel);
    this.router = router;

    this.pollsService = new PollsService();

  }


  afterRender() {

    setTimeout(function() {
      $(".alert").alert('close');
    }, 5000);

  }

  onStart() {
    this.updatePolls();

    this.userModel.set((model) => {
      model.message = null;
    });
  }

  updatePolls() {
    this.pollsService.findAllPolls().then((data) => {

      this.pollsModel.setPolls(
        // create a Fronty.Model for each item retrieved from the backend
        data.map(
          (item) => new PollModel(item.id, item.title, item.ubication, item.author, item.link)
      ));
    });
  }

  // Override
  createChildModelComponent(className, element, id, modelItem) {
    return new PollRowComponent(modelItem, this.userModel, this.router, this);
  }
}

class PollRowComponent extends Fronty.ModelComponent {
  constructor(pollModel, userModel, router, pollsComponent) {
    super(Handlebars.templates.pollrow, pollModel, null, null);
    
    this.pollsComponent = pollsComponent;
    this.pollsModel = pollModel;
    this.userModel = userModel;
    this.addModel('user', userModel); // a secondary model
    this.router = router;
    this.pollsService = new PollsService();


    this.addEventListener('click', '.editPoll', (event) => {
      var pollLink = event.target.getAttribute('item');
      this.router.goToPage('edit-poll?link=' + pollLink);
    });

    this.addEventListener('click', '.editGaps', (event) => {
      var pollLink = event.target.getAttribute('item');
      this.router.goToPage('edit-gaps?link=' + pollLink);
    });


    this.addEventListener('click', '#deletePoll', (event) => {
      var pollLink = event.target.getAttribute('item');
      this.pollsService.deletePoll(pollLink)
      .then((xhr) => {
        this.router.goToPage('login');
        this.router.goToPage('polls');
      })
      .fail((xhr, errorThrown, statusText) => {
        if (xhr.status == 400) {
          this.pollsModel.set(() => {
            this.pollsModel.errors = I18n.translate(xhr.responseJSON);
          });
        } else {
          alert('an error has occurred during request: ' + statusText + '.' + xhr.responseText);
        }
      });
  });
      
}
}
