class AssignationsService {
    constructor() {
  
    }
  
    findAssignationsPoll(pollLink) {
      return $.get(AppConfig.backendServer+'/meetPoll_TSW/rest/assignation/' + pollLink);
    }
  

    updateAssignation(assignations, pollLink) {
      return $.ajax({
        url: AppConfig.backendServer+'/meetPoll_TSW/rest/assignation/' + pollLink,
        method: 'PUT',
        data: JSON.stringify(assignations),
        contentType: 'application/json'
      });
    }
  
    addAssignation(assignations, pollLink) {
      return $.ajax({
        url: AppConfig.backendServer+'/meetPoll_TSW/rest/assignation/'+ pollLink,
        method: 'POST',
        data: JSON.stringify(assignations),
        contentType: 'application/json'
      });
    }
  
  
  }
  