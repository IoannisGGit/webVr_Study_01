AFRAME.registerComponent('plx-activate', {
    schema: {
        sphere: {type: 'selector'}
    },
  
    //init runs once 
    init: function () {
         console.log(this.data.sphere);     
    },
  
    //tick runs continuously, useful for animation
    tick: function (time, timeDelta) { 
     
    
    }
  });