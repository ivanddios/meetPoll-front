class AssignationModel extends Fronty.Model {

    constructor(username, gap_id, poll_id) {
      super('AssignationModel'); //call super
      
      if (username) {
        this.username = username;
      }
      
      if (gap_id) {
        this.gap_id = gap_id;
      }
  
      if (poll_id) {
        this.poll_id = poll_id;
      }
      
    }
  
    setUsername(username) {
      this.set((self) => {
        self.username = username;
      });
    }
  
    setGap_Id(gap_id) {
      this.set((self) => {
        self.gap_id = gap_id;
      });
    }
  
    setPoll_Id(poll_id) {
      this.set((self) => {
        self.poll_id = poll_id;
      });
    }
  
  }
  