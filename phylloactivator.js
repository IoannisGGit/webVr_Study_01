AFRAME.registerComponent('plx-activate', {
    schema: {
        sphere:{type:'selector'}
    },
  
    
    //init runs once 
    init: function () {
        //get a refence of the parent entity
        var entity = this.el;
        
        //get a reference of the corresponding sphere
        var sphere = this.data.sphere;

        //when the corresponding sphere emits a click event we transfer that event to the phyllotaxis
        sphere.addEventListener('click',function(evt){
            
            console.log(sphere.getAttribute('id'));
            entity.emit('activate');
            
         })

         sphere.addEventListener('deactivate',function(evt){
            
            entity.emit('deactivate');
            
         })
       
        
    },
  
  });