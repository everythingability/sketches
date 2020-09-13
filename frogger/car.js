class Car extends Rectangle {

    constructor(x, y, width, height, speed, img) {
        super(x, y, width, height, img);
        this.speed = speed;
      
    }

    show(){
        fill(255);
        //rect(this.x, this.y, this.width, this.height);
       print(this.width)
      if (this.width == 50){
        image(soldiers, this.x, this.y, 50, 50);
        
      }else if (this.width == 100){
        image(soldiers, this.x, this.y, 50, 50);
        image(soldiers, this.x+50, this.y, 50, 50);
        
      } else if (this.width == 150){
        
        print( this.img)
         image(this.img, this.x, this.y, this.width, 50);
       

       } else if (this.width == 200){
         
         image(tank, this.x, this.y, 150, 50);
         image(soldiers, this.x, this.y,50, 50);
      } 
    }

    update(){
       this.x += this.speed;

       if(this.speed > 0 && this.x > width+grid){
           this.x = - this.width - grid;
         //leftwards
       } else if(this.speed < 0 && this.x < -this.width-grid){
            this.x = width + grid;
         //rightwards
       }
    }

}
