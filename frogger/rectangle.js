class Rectangle {

    constructor(x, y, width, height, img){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.img = img;
    }

    intersects(otherRectangle){
        let left = this.x
        let right = this.x + this.width;
        let top = this.y;
        let bottom = this.y + this.height;

        let oleft = otherRectangle.x
        let oright = otherRectangle.x + otherRectangle.width;
        let otop = otherRectangle.y;
        let obottom = otherRectangle.y + otherRectangle.height;
    
        return !(left >= oright ||
            right <= oleft ||
            top >= obottom ||
            bottom <= otop );
    }
}
