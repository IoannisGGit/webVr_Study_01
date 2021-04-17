AFRAME.registerComponent('clickable',{
    schema: {
        animateElement: {type: 'selector'},
        eventName: {type: 'string'}
    },
    init:function(){
        var self = this;
        
        self.el.addEventListener('click',function(evt){
            
            console.log(self, this, evt.target);
            
    //      What if you only wanted to trigger something once?
    //      We could remove the attributes that make the object interactive
//          this.removeAttribute('clickable');
//          this.classList.remove('clickable');

            // We can trigger animations on objects with these custom events
            //https://aframe.io/docs/1.1.0/components/animation.html#sidebar
          self.data.animateElement.emit(self.data.eventName);
            
        });
        
  }
});
