class AssignationsModel extends Fronty.Model {

    constructor() {
      super('AssignationsModel'); //call super
  
      // model attributes
      this.assignations = [];
    }
  
    setSelectedAssignation(assignation) {
      this.set((self) => {
        self.selectedAssignation = assignation.assignations;
        self.selectedParticipation = assignation.isParticipant;
      });
    }
  
    setAssignations(assignations) {
      this.set((self) => {
        self.assignations = assignations;
      });
    }
  }
  