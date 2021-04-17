//WARNING! This is a very basic camera locomotion script
//Meant for experimenting
//You are entering dangerous territory for those who get motion sickness

AFRAME.registerComponent('continual-movement',{
    schema: {
        camera: {type: 'selector'}
    },
    init:function(){
        this.initialDirection = new THREE.Vector3();
        
        //store the camera's initial direction in a vector 
        //https://threejs.org/docs/#api/en/core/Object3D.getWorldDirection
        this.data.camera.object3D.getWorldDirection(this.initialDirection);

    },
    tick:function(time, timeDelta){

        //A very basic movement loop in the default forward direction of the camera
        if(this.el.object3D.position.z > -10){
            this.el.object3D.position.set(
                0,
                0,
                this.el.object3D.position.z - 1 * (timeDelta / 1000),
            );
        }else{
            this.el.object3D.position.set(
                0,
                0,
                0,
            );
        }
        
           
        //What if you just went off in the initial direction the user's head is facing?
        //What if you were getting the camera world dirction every tick? Could you start to make a potentially vomit inducing flying mechanic?
//        this.el.object3D.position.set(
//            this.el.object3D.position.x - this.initialDirection.x * (timeDelta / 1000),
//            0,
//            this.el.object3D.position.z - this.initialDirection.z * (timeDelta / 1000),
//        );
        
    }
});