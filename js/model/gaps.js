class GapsModel extends Fronty.Model {

    constructor() {
      super('GapsModel'); //call super
  
      // model attributes
      this.gaps = [];
      this.emptyGap = 0;
      this.emptyGaps = [];
    }
  
    setSelectedGap(gap) {
      this.set((self) => {
        self.selectedGap = gap;
      });
    }

    // setEmptyGap() {
    //   this.set((self) => {
    //     self.emptyGap = 0;
    //     self.emptyGaps = [];
    //   });
      
    // }
  
    setGaps(gaps) {
      this.set((self) => {
        self.gaps = gaps;
      });
    }
  }
  