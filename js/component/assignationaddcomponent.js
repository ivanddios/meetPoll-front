class AssignationAddComponent extends Fronty.ModelComponent {
    constructor(pollsModel, gapsModel, assignationsModel, userModel, router) {
        super(Handlebars.templates.assignationadd, pollsModel);
    
        this.pollsModel = pollsModel; 
        this.userModel = userModel; 
        this.addModel('user', userModel);
        this.gapsModel = gapsModel;
        this.addModel('gaps', gapsModel)
        this.assignationsModel = assignationsModel;
        this.addModel('assignations', assignationsModel)
    
        this.router = router;
    
        this.pollsService = new PollsService();
        this.gapsService = new GapsService();
        this.assignationsService = new AssignationsService();
    
  
      this.addEventListener('click', '#addAssignation', () => {
        var pollLink = this.router.getRouteQueryParam('link');
        var checkboxChecked = [];
        var checkbox = document.getElementsByName('assignation');
    
        for (var i = 0; i < checkbox.length; i++) {
            if (checkbox[i].checked) {
                checkboxChecked.push({"gap":checkbox[i].value});
            }
        }
       
        this.assignationsService.addAssignation(checkboxChecked, pollLink)
        .then(() => {
          this.assignationsModel.set((model) => {
            model.message = I18n.translate('Your participation has been successfully registered.');
          });
          this.router.goToPage('view-poll?link='.concat(pollLink));
        })
        .fail((xhr, errorThrown, statusText) => {
          if (xhr.status == 400) {
            this.assignationsModel.set((model) => {
              model.errors = xhr.responseJSON;
            });
          } else {
            alert('An error has occurred during request: ' + statusText + '.' + xhr.responseText);
          }
        });
      });
    
  }
    
    afterRender() {

      var table = document.getElementById('dataTable');
      if(table !== null){
      $.each(this.gapsModel.selectedGap, function(index, gap) {
        var formatDate = gap.date.split("/").reverse().join("-");
        var dateToShow = new Date(formatDate);
        $('#gap-date-item-'.concat(gap.id)).html(I18n.translate(dateToShow.toString().substr(0,3).toUpperCase()).concat(',').concat(dateToShow.toString().substr(7,3)).concat(dateToShow.toString().substr(3,5))); 
      }); 
    }
  }
  

    loadPoll(pollLink) {
        if (pollLink != null) {
          this.pollsService.findPoll(pollLink)
            .then((poll) => {
              this.pollsModel.setSelectedPoll(poll);
            });
    
        }
      }
    
      loadGapsPoll(pollLink) {
        if (pollLink != null) {
          this.gapsService.findGapsPoll(pollLink)
            .then((gaps) => {
              this.gapsModel.setSelectedGap(gaps.map((gap) => new GapModel(gap.id, gap.date, gap.timeStart, gap.timeEnd, gap.poll_id)));
            });
    
        }
      }
    
      loadAssignationsPoll(pollLink) {
        if (pollLink != null) {
          this.assignationsService.findAssignationsPoll(pollLink)
            .then((assignations) => {
              this.assignationsModel.setSelectedAssignation(assignations);
            });
    
        }
      }
    
    
      onStart() {
        var selectedLink = this.router.getRouteQueryParam('link');
        this.loadPoll(selectedLink);
        this.loadGapsPoll(selectedLink);
        this.loadAssignationsPoll(selectedLink);
      }
  }
  