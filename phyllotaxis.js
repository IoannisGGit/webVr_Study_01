AFRAME.registerComponent('phyllotaxis', {
    schema: {
        angle: {type: 'number'},
        mode:{type:'number'}
    },
  
    //init runs once 
    init: function () {
            this.c = 3.0;
            this.angle = this.data.angle; 
            this.numPoints = 600;
            this.init_positions = []
            this.positions = [];
            this.object = this.el.object3D;
            this.active = false;
            this.time =0;

            //initialize an array of positions at 0 0 0
            for (var i = 0; i < this.numPoints; i++) {
                var x,y,z =0;
                var pos = new THREE.Vector3(x,y,z);
                this.init_positions.push(pos);
            
            }
            
            //create meshes for those positions
            for (var i = 0; i < this.init_positions.length; i++) {
                var color ="white";
                // if(i % 2 ==0) color = "black"
                // else color ="white"
                var material = new THREE.MeshBasicMaterial({color: color});
                var geometry = new THREE.SphereGeometry(1, 6, 6);
                var sphere = new THREE.Mesh(geometry, material);
                sphere.position.x = this.init_positions[i].x;
                sphere.position.y = this.init_positions[i].y;
                sphere.position.z = this.init_positions[i].z;
            
                this.object.add(sphere);
            }
            this.object.scale.multiplyScalar(0.15);

            //using this on the event listener will refer to the whole entity while we want only the phyllotaxis
            //this can be solved by casting this on self before the event listener
             var self = this;
            this.el.addEventListener('activate',function(evt){
                
                //create an array of phylotaxis positions
                for (var i = 0; i < self.numPoints; i++) {
                    var total = self.numPoints;
                    var phi = i*THREE.MathUtils.degToRad(self.angle);
                    var radius = self.c * Math.sqrt(i);

                    var x = radius * Math.cos(phi);
                    var y = radius * Math.sin(phi);
                    
                    var z;
                    if(self.data.mode == 1) z = Math.sqrt(i*self.c)*Math.sqrt(total-i)*0.1;
                

                    var pos = new THREE.Vector3(x,y,z);
                    self.positions.push(pos);
                    
                
                    
                }
                self.active = true;
                self.time = 0;

            })
            this.el.addEventListener('deactivate',function(evt){
                for(var i=0; i<self.object.children.length;i++){
                    var sphere =self.object.children[i];
                    sphere.position.x =self.init_positions[i].x;
                    sphere.position.y =self.init_positions[i].y;
                    sphere.position.z =self.init_positions[i].z;
                }
                self.active = false;
                for (var i = 0; i < self.numPoints; i++){
                    self.positions.pop();
                }
                
            })

            
    },
  
    //tick runs continuously, useful for animation
    tick: function (time, timeDelta) { 
        if(this.active){
            var z = time*0.001;    
            this.object.rotation.set(0,0,z );
            //console.log(time*0.001);

            for(var i=0; i<this.object.children.length;i++){
                var sphere =this.object.children[i];
                sphere.position.x = THREE.MathUtils.lerp(this.init_positions[i].x,this.positions[i].x,this.time);
                sphere.position.y = THREE.MathUtils.lerp(this.init_positions[i].y,this.positions[i].y,this.time);
                sphere.position.z = THREE.MathUtils.lerp(this.init_positions[i].z,this.positions[i].z,this.time);
                //sphere.position.z=THREE.MathUtils.mapLinear(Math.cos(time*0.001),1,-1,Math.sqrt(i*this.c)*Math.sqrt(this.numPoints-i)*0.1,Math.sqrt(i*this.c)*i*0.01);
            
            }
           if(this.time<1) this.time += 0.001;
            console.log(this.time);
        }
        
        
       // THREE.MathUtils.mapLinear(cos(time*0.001),1,-1,Math.sqrt(i*this.c)*Math.sqrt(total-i)*0.1,Math.sqrt(i*this.c)*i*0.01)
    },

   
    
  });


    //z variables
   //var z = Math.sqrt(i*this.c)*i*0.01;
   //var z = Math.sqrt(i*this.c)*(total-i)*0.01;
   //var z = Math.sqrt(total-i);