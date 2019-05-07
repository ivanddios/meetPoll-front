class GapEditComponent extends Fronty.ModelComponent {
    constructor(pollsModel,gapsModel, userModel, router) {
      super(Handlebars.templates.gapedit, gapsModel);

      this.gapsModel = gapsModel;
      this.addModel('gaps', gapsModel);
      this.pollsModel = pollsModel;
      this.addModel('polls', pollsModel)
      this.userModel = userModel;
      this.addModel('user', userModel);

      this.router = router;
      this.pollsService = new PollsService();
      this.gapsService = new GapsService();


      this.addEventListener('click', '#addrow-button', () => {

        this.gapsModel.set(() => {
          this.gapsModel.emptyGap += 1;
          this.gapsModel.emptyGaps.push({"gap": this.gapsModel.emptyGap});
        });

      });


      this.addEventListener('click', '.delrow', (event)=> {
        $('#gap-item-'.concat(event.target.getAttribute('item'))).remove();
      });

      this.addEventListener('click', '#editGap', () => {

        var link = $('#poll-link').val();
        var dataArray = [];
        var inputsDate = document.getElementsByClassName('date');
        var inputsTimeStart = document.getElementsByClassName('timeStart');
        var inputsTimeEnd = document.getElementsByClassName('timeEnd');
    
        for (var i = 0; i < inputsDate.length; i++) {
            dataArray.push({"date":inputsDate[i].value, "start": inputsTimeStart[i].value.toString(), "end": inputsTimeEnd[i].value.toString()});
        }
        
        this.gapsService.editGaps(link, dataArray)
        .then((xhr) => {
          // this.pollsModel.set((model) => {
          //   model.message = I18n.translate('Gaps successfully updated.');
          // });
          this.router.goToPage('view-poll?link='.concat(link));
        })
          .fail((xhr, errorThrown, statusText) => {
            if (xhr.status == 400) {
              this.gapsModel.set(() => {
                this.gapsModel.errors = I18n.translate(xhr.responseJSON);
              });
            } else {
              alert('an error has occurred during request: ' + statusText + '.' + xhr.responseText);
            }
          });
      });
    }


    afterRender() {
  

      $.each(this.gapsModel.selectedGap, function(index, gap) {

          $('#date-item-'.concat(gap.id)).bootstrapMaterialDatePicker 
          ({
            format: 'DD/MM/YYYY',
            lang: 'es',
            time: false,
            weekStart: 1, 
            nowButton : true,
            switchOnClick : true,
            minDate : new Date()
          });


          $('#timeStart-item-'.concat(gap.id)).bootstrapMaterialDatePicker
          ({
            date: false,
            shortTime: false,
            format: 'HH:mm'
          });


          $('#timeEnd-item-'.concat(gap.id)).bootstrapMaterialDatePicker
          ({
            date: false,
            shortTime: false,
            format: 'HH:mm'
          });
      });
      

      $.each(this.gapsModel.emptyGaps, function(index, gap) {

        $('#new-date-item-'.concat(gap.gap)).bootstrapMaterialDatePicker 
        ({
          format: 'DD/MM/YYYY',
          lang: 'es',
          time: false,
          weekStart: 1, 
          nowButton : true,
          switchOnClick : true,
          minDate : new Date()
        });


        $('#new-timeStart-item-'.concat(gap.gap)).bootstrapMaterialDatePicker
        ({
          date: false,
          shortTime: false,
          format: 'HH:mm'
        });


        $('#new-timeEnd-item-'.concat(gap.gap)).bootstrapMaterialDatePicker
        ({
          date: false,
          shortTime: false,
          format: 'HH:mm'
        });
    }); 



    $.material.init();
    }


    onStart() {
        var selectedLink = this.router.getRouteQueryParam('link');
        if (selectedLink != null) {
          this.gapsService.findGapsPoll(selectedLink)
            .then((gaps) => {
              this.gapsModel.emptyGap = 0;
              this.gapsModel.emptyGaps = [];
              this.gapsModel.errors = null;
              this.gapsModel.setSelectedGap(gaps);
            });

            this.pollsService.findPoll(selectedLink)
            .then((poll) => {
              this.pollsModel.setSelectedPoll(poll);
            });

        }
      }


    createChildModelComponent(className, element, id, modelItem) {
      return new GapRowComponent(modelItem, this.router, this);
    }
  }


  class GapRowComponent extends Fronty.ModelComponent {
    constructor(gapModel, router, gapEditComponent) {
      super(Handlebars.templates.gaprow, gapModel, null, null);
      
      this.gapEditComponent = gapEditComponent;
      this.router = router;
  
      this.addEventListener('click', '.delrow-item', (event)=> {
        $('#new-gap-item-'.concat(event.target.getAttribute('item'))).remove();
      });
  
    }
  
  }
  