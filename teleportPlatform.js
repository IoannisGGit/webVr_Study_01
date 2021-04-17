AFRAME.registerComponent('teleport-platform',{
    schema: {
        cameraRig: {type: 'selector'}
    }, 
    init:function(){
        var self = this;
    
        self.el.addEventListener('click',function(evt){
            
            console.log(this, self, evt.target);
            
            self.data.cameraRig.object3D.position.set(
                self.el.object3D.position.x,
                0,//always want to stay at ground level
                self.el.object3D.position.z
            );
            
        });
             
    }
});
