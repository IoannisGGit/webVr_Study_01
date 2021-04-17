AFRAME.registerComponent('phyllotaxis', {
    schema: {
        angle: {type: 'number'}
    },
  
    //init runs once 
    init: function () {
            this.c = 5;
            this.angle = this.data.angle; 
            this.numPoints = 500;
            this.positions = [];
            this.object = this.el.object3D;
            //this.object.position.set(-5,1,-5);
            

            //create an array of positions
            for (var i = 0; i < this.numPoints; i++) {

                var phi = i*THREE.MathUtils.degToRad(this.angle);
                var radius = this.c * Math.sqrt(i);

                var x = radius * Math.cos(phi);
                var y = radius * Math.sin(phi);
                var pos = new THREE.Vector3(x,y,0);
                this.positions.push(pos);
            
                ;
            }

            for (var i = 0; i < this.positions.length; i++) {
                var material = new THREE.MeshBasicMaterial({color: "red"});
                var geometry = new THREE.SphereGeometry(1, 6, 6);
                var sphere = new THREE.Mesh(geometry, material);
                sphere.position.x = this.positions[i].x;
                sphere.position.y = this.positions[i].y;
                sphere.position.z = this.positions[i].z;
            
                this.object.add(sphere);
            }
            this.object.scale.multiplyScalar(0.04);
            console.log(this.object);
            
    },
  
    //tick runs continuously, useful for animation
    tick: function (time, timeDelta) { 
     
    
    }
  });