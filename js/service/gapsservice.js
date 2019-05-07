class GapsService {
    constructor() {
  
    }
  
    findGapsPoll(pollLink) {
      return $.get(AppConfig.backendServer+'/meetPoll_TSW/rest/gap/' + pollLink);
    }
  
    addGaps(pollLink, gaps) {
      return $.ajax({
        url: AppConfig.backendServer+'/meetPoll_TSW/rest/gap/' + pollLink,
        method: 'POST',
        data: JSON.stringify(gaps),
        contentType: 'application/json'
      });
    }

    editGaps(pollLink, gaps) {
      return $.ajax({
        url: AppConfig.backendServer+'/meetPoll_TSW/rest/gap/' + pollLink,
        method: 'PUT',
        data: JSON.stringify(gaps),
        contentType: 'application/json'
      });
    }
  
  }
  