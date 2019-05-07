class PollViewComponent extends Fronty.ModelComponent {
  constructor(pollsModel, gapsModel, assignationsModel, userModel, router) {
    super(Handlebars.templates.pollview, pollsModel);

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


    this.addEventListener('click', '#addAssignation', (event) => {
      var pollLink = event.target.getAttribute('item');
      this.router.goToPage('add-assignation?link=' + pollLink);
    });



    this.addEventListener('click', '#modifyAssignation', () => {
      var pollLink = this.router.getRouteQueryParam('link');
      var checkboxChecked = [];
      var checkbox = document.getElementsByName('assignation');
  
      for (var i = 0; i < checkbox.length; i++) {
          if (checkbox[i].checked) {
              checkboxChecked.push({"gap":checkbox[i].value});
          }
      }
     
      this.assignationsService.updateAssignation(checkboxChecked, pollLink)
      .then(() => {
        this.assignationsModel.set((model) => {
          model.message = I18n.translate('Your participation has been successfully updated.');
        });
        this.router.goToPage('view-poll?link='.concat(pollLink));
      })
      .fail((xhr, errorThrown, statusText) => {
        if (xhr.status == 400) {
          this.assignationsModel.set((model) => {
            model.errors = xhr.responseJSON;
          });
        } else {
          alert('an error has occurred during request: ' + statusText + '.' + xhr.responseText);
        }
      });
    });
}



  afterRender() {

    setTimeout(function() {
      $("#success-alert").alert('close');}, 7000);


    var table = document.getElementById('dataTable');
    if(table !== null){
      $.each(this.gapsModel.selectedGap, function(index, gap) {
        var formatDate = gap.date.split("/").reverse().join("-");
        var dateToShow = new Date(formatDate);
        $('#gap-date-item-'.concat(gap.id)).html(I18n.translate(dateToShow.toString().substr(0,3).toUpperCase()).concat(',').concat(dateToShow.toString().substr(7,3)).concat(dateToShow.toString().substr(3,5))); 
      }); 


      this.checkboxes(table);
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
          this.assignationsModel.message = null;
          this.assignationsModel.setSelectedAssignation(assignations);
        });

    }
  }


  onStart() {
    var selectedLink = this.router.getRouteQueryParam('link');
    if (this.userModel.isLogged) {
      this.loadPoll(selectedLink);
      this.loadGapsPoll(selectedLink);
      this.loadAssignationsPoll(selectedLink);
    }
  }

  // Override
  createChildModelComponent(className, element, id, modelItem) {;
    return new PollViewRowComponent(modelItem, this.assignationsModel, this.userModel, this);
  }



  removeCheckboxSuccess() {
    var filaSuccess = document.getElementsByClassName("table-success"); 
    for (var i = 0; i < filaSuccess.length; i++) {
        document.getElementById(filaSuccess[i].id).setAttribute("class",""); 
    }
  }

  removeCheckboxWarning() {
    var filaWarning = document.getElementsByClassName("table-warning"); 
    for (var i = 0; i < filaWarning.length; i++) {
        document.getElementById(filaWarning[i].id).setAttribute("class","");
    }
  }

  checkboxes(table){
    var rowCount = table.rows.length - 1;
    var inputElems = document.getElementsByTagName("input");
    var numInputsForRow = (inputElems.length - 1) / rowCount;
    var count = 0, max = 0, maxAbs = 0, trSelected = -1, trSelectedArray = new Array();
  
      
    for (var j = 1; j < inputElems.length; j++) {
      if(inputElems[j].type === "checkbox" && inputElems[j].checked) {
        count++;
      }
      if (j % numInputsForRow == 0) {
        if (count > maxAbs) {
          max = count;
          maxAbs = count;
          trSelected = inputElems[j].parentNode.parentNode.parentNode.id;
        } else if (count == max) {
            max = -1;
        }
          count = 0;
      }
    }
  
    if (trSelected != -1 && max != -1) {
      this.removeCheckboxWarning();
      document.getElementById(trSelected).setAttribute("class", "table-success");
    }
      
    for (var j = 1; j < inputElems.length; j++) { 
      if (inputElems[j].type === "checkbox" && inputElems[j].checked) {
        count++;
      }
      if (j % numInputsForRow == 0) {  
        if (count == maxAbs) {
          trSelectedArray.push(inputElems[j].parentNode.parentNode.parentNode.id);
        } 
        count = 0;
      }
    }
  
    if(trSelectedArray.length > 1){
      this.removeCheckboxSuccess();
      this.removeCheckboxWarning();
      for(var y=0; y<trSelectedArray.length; y++){
        document.getElementById(trSelectedArray[y]).setAttribute("class", "table-warning");
      }
    } 
  }

}


class PollViewRowComponent extends Fronty.ModelComponent {
  constructor(gapsModel, assignationsModel, userModel, pollViewComponent) {
    super(Handlebars.templates.pollviewrow, gapsModel);
    
    this.assignationsModel = assignationsModel;
    this.addModel('assignations', assignationsModel)

    this.userModel = userModel;
    this.addModel('user', userModel)

  }

}



