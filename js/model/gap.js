class GapModel extends Fronty.Model {

    constructor(id, date, timeStart, timeEnd, poll_id) {
      super('GapModel'); //call super
      
      if (id) {
        this.id = id;
      }
      
      if (date) {
        this.date = date;
      }
  
      if (timeStart) {
        this.timeStart = timeStart;
      }
      
      if (timeEnd) {
        this.timeEnd = timeEnd;
      }
  
      if (poll_id) {
        this.poll_id = poll_id;
      }
      
    }
  
  }
  