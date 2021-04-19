AFRAME.registerComponent('color-change', {
    schema: {
      
    },
  
    //init runs once 
    init: function () {
        var self = this;
        this.el.addEventListener('colorChange',function(evt){
            console.log(evt.detail.color);
            this.setAttribute('material', 'color', evt.detail.color);

        })
    
    
    },
  
    //tick runs continuously, useful for animation
    tick: function (time, timeDelta) { 
     
    
    }
  });