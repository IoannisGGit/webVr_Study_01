AFRAME.registerComponent('color-change', {
    schema: {
      
    },
  
    //init runs once 
    init: function () {
       //listens to event emitted from teleport platform
        this.el.addEventListener('colorChange',function(evt){
            
            this.setAttribute('material', 'color', evt.detail.color);
            if(evt.detail.color == "red"){
                console.log("deactivate",this.getAttribute('id'));
                this.emit('deactivate');
                //entity.emit('activate');
                
            }
            
        })
    
    
    },
  });