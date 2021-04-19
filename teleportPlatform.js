AFRAME.registerComponent('teleport-platform',{
    schema: {
        cameraRig: {type: 'selector'},
        sphere1:{type:'selector'},
        sphere2:{type:'selector'},
        sphere3:{type:'selector'},
        index:{type:'number'}
    }, 
    init:function(){
        var self = this;
        var sphere1 = this.data.sphere1;
        var sphere2 = this.data.sphere2;
        var sphere3 = this.data.sphere3;
    
        this.el.addEventListener('click',function(evt){
            
            //move camera-rig to platform location
            self.data.cameraRig.object3D.position.set(
                self.el.object3D.position.x,
                self.data.cameraRig.object3D.position.y,//always want to stay at ground level
                self.el.object3D.position.z
            );
            
            
            

            //we activate the clickable class only for the corresponding sphere while deactivating the others
            switch(self.data.index) {
                case 1:
                    sphere1.classList.add("clickable");
                    sphere2.classList.remove('clickable');
                    sphere3.classList.remove('clickable');
                    sphere1.emit('colorChange', {color: 'green'},);
                    sphere2.emit('colorChange', {color: 'red'},);
                    sphere3.emit('colorChange', {color: 'red'},);
                  break;
                case 2:
                    sphere1.classList.remove('clickable');
                    sphere2.classList.add('clickable');
                    
                    sphere3.classList.remove('clickable');
                    sphere1.emit('colorChange', {color: 'red'},);
                    sphere2.emit('colorChange', {color: 'green'},);
                    sphere3.emit('colorChange', {color: 'red'},);
                  break;
                case 3:
                    sphere1.classList.remove('clickable');
                    sphere2.classList.remove('clickable');
                    sphere3.classList.add('clickable');
                    sphere1.emit('colorChange', {color: 'red'},);
                    sphere2.emit('colorChange', {color: 'red'},);
                    sphere3.emit('colorChange', {color: 'green'},);
                  break;
              }; 
            
        });
             
    }
});
