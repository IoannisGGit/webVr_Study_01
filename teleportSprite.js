AFRAME.registerComponent('teleport-spot',{
    schema: {
        camera: {type: 'selector'},
        cameraRig: {type: 'selector'}
    },
    init:function(){
        var self = this;
        
        //  https://threejs.org/docs/#api/en/math/Vector3
        self.cameraPosition = new THREE.Vector3();
        
                         
        self.el.addEventListener('click',function(evt){
            
            var targetSpot = evt.target;
            var spotArray = document.querySelectorAll("[teleport-spot]");

            for(var i = 0; i < spotArray.length; i++){
                spotArray[i].setAttribute("visible",true);
            }
            
            targetSpot.setAttribute("visible",false);
            
            //  https://aframe.io/docs/1.1.0/components/position.html
            self.data.cameraRig.object3D.position.set(
                targetSpot.object3D.position.x,
                0,//always want to stay at ground level
                targetSpot.object3D.position.z
            );
        });
             
    },
    tick:function(){
        var self = this;
        
        //get camera object's position
        self.data.camera.object3D.getWorldPosition(this.cameraPosition);
        //make the sprite / image always look at the camera
        self.el.object3D.lookAt(this.cameraPosition);  
    }
});



