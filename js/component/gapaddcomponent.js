class GapAddComponent extends Fronty.ModelComponent {
    constructor(pollsModel, gapsModel, userModel, router) {
      super(Handlebars.templates.gapadd, gapsModel);
      
      this.gapsModel = gapsModel; 
      this.addModel('gaps', gapsModel);
      this.pollsModel = pollsModel;
      this.addModel('poll', pollsModel);
      this.userModel = userModel;
      this.addModel('user', userModel);

      this.router = router;

      this.gapsService = new GapsService();
      this.pollsService = new PollsService();


      this.addEventListener('click', '#addRow-button', () => {
        this.gapsModel.set(() => {
          this.gapsModel.emptyGap += 1;
          this.gapsModel.emptyGaps.push({"gap": this.gapsModel.emptyGap});
        });

      });

  
      this.addEventListener('click', '#addGap', () => {
        var link = $('#poll-link').val();
        var dataArray = [];
        var inputsDate = document.getElementsByClassName('date');
        var inputsTimeStart = document.getElementsByClassName('timeStart');
        var inputsTimeEnd = document.getElementsByClassName('timeEnd');
    
        for (var i = 0; i < inputsDate.length; i++) {
            dataArray.push({"date":inputsDate[i].value, "start": inputsTimeStart[i].value.toString(), "end": inputsTimeEnd[i].value.toString()});
        }
        
        this.gapsService.addGaps(link, dataArray)
          .then((xhr) => {
            // this.pollsModel.set((model) => {
            //   model.message = I18n.translate('Gaps successfully added.');
            // });
            this.router.goToPage('view-poll?link='.concat(link));
          })
          .fail((xhr, errorThrown, statusText) => {
            if (xhr.status == 400) {
              this.gapsModel.set(() => {
                this.gapsModel.errors =  I18n.translate(xhr.responseJSON);
              });
            } else {
              alert('An error has occurred during request: ' + statusText + '.' + xhr.responseText);
            }
          });
      });
    }
    
    
    afterRender() {

      setTimeout(function() {
        $("#success-alert").alert('close');}, 7000);
      
      $('#date-item-0').bootstrapMaterialDatePicker 
      ({
        format: 'DD/MM/YYYY',
        lang: 'es',
        time: false,
        weekStart: 1, 
        nowButton : true,
        switchOnClick : true,
        minDate : new Date()
      });


      $('#timeStart-item-0').bootstrapMaterialDatePicker
      ({
        date: false,
        shortTime: false,
        format: 'HH:mm'
      });


      $('#timeEnd-item-0').bootstrapMaterialDatePicker
      ({
        date: false,
        shortTime: false,
        format: 'HH:mm'
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

    $.material.init()
    }

    onStart() {
      var selectedLink = this.router.getRouteQueryParam('poll');
      this.pollsService.findPoll(selectedLink)
      .then((poll) => {
        this.pollsModel.setSelectedPoll(poll);
        this.gapsModel.emptyGap = 0;
        this.gapsModel.emptyGaps = [];
        this.gapsModel.errors = null;
      });
      this.gapsModel.setSelectedGap(new GapModel());
    }
      createChildModelComponent(className, element, id, modelItem) {
        return new GapAddRowComponent(modelItem, this.router, this);
      }
    }
  
    class GapAddRowComponent extends Fronty.ModelComponent {
      constructor(gapModel, router, gapAddComponent) {
        super(Handlebars.templates.gaprow, gapModel, null, null);
        
        this.gapAddComponent = gapAddComponent;
        this.router = router;
    
        this.addEventListener('click', '.deleteRow', (event) => {
         
        });
      }
    }
    