
//the keyword "this" refers to the scope of the A-Frame component object
//Read More about "this" in Javascript:
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this

AFRAME.registerComponent('mover', {
  schema: {
    target: {type: 'selector'},
    speed: {type: 'number'}
  },

  //init runs once 
  init: function () {
    //  https://threejs.org/docs/#api/en/math/Vector3
    this.directionVec3 = new THREE.Vector3();
    this.targetPosition = new THREE.Vector3();
      
    //We are dynamically adding a shpere child to our parent "mover" entity 
    this.parentSphere = document.createElement('a-sphere');

    this.parentSphere.setAttribute('radius','0.2');
    this.parentSphere.setAttribute('color','#3a3636');
      
    this.el.appendChild(this.parentSphere);
      
    //Task 2: Add another child element and animate it later in tick
    //Follow the pattern above for adding the parentSphere
    //-------------    
        
      
  
      
    //-------------    
            
  },

  //tick runs continuously, useful for animation
  tick: function (time, timeDelta) { 
    var vector = this.directionVec3;
    var speed = this.data.speed;    

    // Grab position vectors (THREE.Vector3) from the entities' three.js objects.
    //Using getWorldPosition as our Target is a child of the camera
    this.data.target.object3D.getWorldPosition(this.targetPosition);
    var currentPosition = this.el.object3D.position;

    // Subtract the vectors to get the vector (direction and magnitude) between points
    vector.copy(this.targetPosition).sub(currentPosition);

    // Calculate the distance.
    var distance = vector.length();
      
    // Get the unit vector which only shows direction
    var direction = vector.normalize();
    
    
    //Task 3: Animate your child element
    //-------------    
        
      
  
      
    //-------------  
      
      
    // Don't go any closer if a close proximity has been reached.
    if (distance < 0.5) { 
        
        speed = 0;
        
         //Hide Debug line if not moving
        this.el.setAttribute('line',{
            start: "0, 0, -0.2",
            end: "0 0 " + speed, //change to velocity 
            color: "red"
        });

        return; 
    }  
      

    //Task 1: Play around with the value of speed
    //-------------    
        
      // speed = etc...

      
    //-------------  
      
    //timeDelta is the difference between frames and smoothes the animation if framerate slows  
    direction.multiplyScalar(speed * (timeDelta / 1000));
              
    //Look toward target  
    this.el.object3D.lookAt(this.targetPosition);  
            
    
    //Debug line
    this.el.setAttribute('line',{
        start: "0, 0, -0.2",
        end: "0 0 " + -speed, //change to velocity 
        color: "red"
    });
        
      
    //  Setting position of mover object 
    //  https://aframe.io/docs/1.1.0/components/position.html
    this.el.object3D.position.set(
        currentPosition.x + direction.x,
        currentPosition.y + direction.y,
        currentPosition.z + direction.z
    );   
          
  }
});