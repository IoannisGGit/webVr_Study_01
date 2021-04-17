AFRAME.registerComponent('rotation-reader', {
    schema: {
        target: {type: 'selector'}
    },

    init: function () {
        //    https://threejs.org/docs/#api/en/math/Euler
        this.cameraRotation = new THREE.Euler();

    },

    tick: function () {
        //    https://threejs.org/docs/#api/en/core/Object3D
        //Get the camera rotation using a selector and Three.js object rotation which is returned as a Euler  
        this.cameraRotation = this.data.target.object3D.rotation;
        
        //When in doubt log out a value (double click to inspect using the javascript console)
        //console.log(this.cameraRotation);

        //Set rotation of this object to match camera
        this.el.object3D.setRotationFromEuler(this.cameraRotation);

        //Inverse Rotation  
        //   https://threejs.org/docs/#api/en/math/Quaternion  
        //    var quat = new THREE.Quaternion();  // uncomment for inverse rotation

        //Set rotation to inverse of camera using invert method on quaternions
        //    quat.setFromEuler( this.cameraRotation ).invert(); // uncomment for inverse rotation
        //    this.el.object3D.setRotationFromQuaternion(quat); // uncomment for inverse rotation

    
        // Affecting scale of an object using rotation
        this.el.object3D.scale.set(1, 1 + this.cameraRotation.y, 1); 
        
        
        //We have some useful math utility functions from both javascript and Three.js
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
        //https://threejs.org/docs/#api/en/math/MathUtils
        
        //Here we floor (round down) a number so it is a valid rgb value 0 - 255
        //Then we use mapLinear to map the camera rotation from one range to another
        var col = Math.floor(THREE.MathUtils.mapLinear(this.cameraRotation.x,-1,1,0,255));
        
        this.el.setAttribute('color', 'rgb(0,0,'+ col +')');  
        
        //Try and mess around with change other material by setting the attribute
        //  https://aframe.io/docs/1.1.0/components/material.html

    }
});