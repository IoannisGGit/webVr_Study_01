AFRAME.registerComponent('phyllotaxis', {
    schema: {
        angle: {type: 'number'},
        mode:{type:'number'}
    },
  
    //init runs once 
    init: function () {
            this.c = 2;
            this.angle = this.data.angle; 
            this.numPoints = 600;
            this.positions = [];
            this.object = this.el.object3D;
           
            

            //create an array of positions
            for (var i = 0; i < this.numPoints; i++) {
                var total = this.numPoints;
                var phi = i*THREE.MathUtils.degToRad(this.angle);
                var radius = this.c * Math.sqrt(i);

                var x = radius * Math.cos(phi);
                var y = radius * Math.sin(phi);
                //var z = Math.sqrt(i*this.c)*i*0.01;
                //var z = Math.sqrt(i*this.c)*(total-i)*0.01;
                var z;
                if(this.data.mode == 1) z = Math.sqrt(i*this.c)*Math.sqrt(total-i)*0.1;
                
                //var z = Math.sqrt(total-i);

                var pos = new THREE.Vector3(x,y,z);
                this.positions.push(pos);
            
                ;
            }

            for (var i = 0; i < this.positions.length; i++) {
                var color ;
                if(i % 2 ==0) color = "black"
                else color ="white"
                var material = new THREE.MeshBasicMaterial({color: color});
                var geometry = new THREE.SphereGeometry(1, 6, 6);
                var sphere = new THREE.Mesh(geometry, material);
                sphere.position.x = this.positions[i].x;
                sphere.position.y = this.positions[i].y;
                sphere.position.z = this.positions[i].z;
            
                this.object.add(sphere);
            }
            this.object.scale.multiplyScalar(0.15);
            console.log(this.object);
            
    },
  
    //tick runs continuously, useful for animation
    tick: function (time, timeDelta) { 
        
        var z = time*0.001;    
        this.object.rotation.set(0,0,z );

        for(var i=0; i<this.object.children.length;i++){
            var sphere =this.object.children[i];
            sphere.position.z=THREE.MathUtils.mapLinear(Math.cos(time*0.001),1,-1,Math.sqrt(i*this.c)*Math.sqrt(this.numPoints-i)*0.1,Math.sqrt(i*this.c)*i*0.01);
            
        }
       // THREE.MathUtils.mapLinear(cos(time*0.001),1,-1,Math.sqrt(i*this.c)*Math.sqrt(total-i)*0.1,Math.sqrt(i*this.c)*i*0.01)
    }
  });