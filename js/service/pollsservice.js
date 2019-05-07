class PollsService {
  constructor() {

  }

  findAllPolls() {
    return $.get(AppConfig.backendServer+'/meetPoll_TSW/rest/poll');
  }

  findPoll(link) {
    return $.get(AppConfig.backendServer+'/meetPoll_TSW/rest/poll/' + link);
  }

  updatePoll(poll) {
    return $.ajax({
      url: AppConfig.backendServer+'/meetPoll_TSW/rest/poll/' + poll.link,
      method: 'PUT',
      data: JSON.stringify(poll),
      contentType: 'application/json'
    });
  }

  addPoll(poll) {
    return $.ajax({
      url: AppConfig.backendServer+'/meetPoll_TSW/rest/poll',
      method: 'POST',
      data: JSON.stringify(poll),
      contentType: 'application/json'
    });
  }

  deletePoll(link) {
    return $.ajax({
      url: AppConfig.backendServer+'/meetPoll_TSW/rest/poll/' + link,
      method: 'DELETE'
    });
  }

}
