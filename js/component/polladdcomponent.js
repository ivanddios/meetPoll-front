class PollAddComponent extends Fronty.ModelComponent {
  constructor(pollsModel, userModel, router) {
    super(Handlebars.templates.polladd, pollsModel);
    this.pollsModel = pollsModel; 
    
    this.userModel = userModel; 
    this.addModel('user', userModel);
    this.router = router;
    this.pollsService = new PollsService();

    this.addEventListener('click', '#addPoll', () => {
      var newPoll = {};
      newPoll.title = $('#title').val();
      newPoll.ubication = $('#ubication').val();
      newPoll.author = this.userModel.currentUser;
      this.pollsService.addPoll(newPoll)
        .then((xhr) => {
          this.pollsModel.set((model) => {
            model.addGap = I18n.translate('Poll ').concat(newPoll.title).concat(I18n.translate(' successfully added.'));
          });
          this.router.goToPage('add-gaps?poll='.concat(xhr.link));
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
  
  onStart() {
    this.pollsModel.setSelectedPoll(new PollModel());
  }
}
