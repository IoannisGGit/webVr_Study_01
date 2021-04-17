AFRAME.registerComponent('stars', {
    schema: {
      
    },
    
    //init runs once 
    init: function () {

          
            this.object = this.el.object3D;
            this.object.position.set(0,1,-20);
            
            var numParticles = 600;
            for (var i = 0; i < numParticles; i++) {
                var material = new THREE.MeshBasicMaterial({color: "red"});
                //var geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
                var geometry = new THREE.SphereGeometry(0.01, 6, 6);
                var cube = new THREE.Mesh(geometry, material);
                cube.position.x = i * 2-2;
                cube.position.y = 1;
                cube.position.z = 0;
            
                this.object.add(cube);
            }
            

            
    },
  
    //tick runs continuously, useful for animation
    tick: function (time, timeDelta) { 
        for(var i=0; i<this.object.children.length;i++){
            var particle =this.object.children[i];
            particle.position.z+= 0.01;
            
        }
    
    }
  });