// reference to canvas is odd. WHAT canvas?

class P5 extends p5 {
    constructor({
        width = window.innerWidth,
        height = window.innerHeight,
        mode = 'P2D'
    } = {}) {
        let cnvs = {}
        super((p) => {
            p.pixelDensity(1)
            p.setup = () => { cnvs = p.createCanvas(width, height, p[mode]) }
            p.draw = () => { }
            console.log('p5 initiated!')
        })
        this.width = width
        this.height = height
        this.mode = mode
        this.canvas = cnvs // document.createElement('canvas')
        // this.id = 'p5_canvas'
        // this.canvas.style.position = "absolute"
        // this.canvas.style.top = "0px"
        // this.canvas.style.left = "0px"
        // this.canvas.style.zIndex = -1
        // document.body.appendChild(this.canvas)
        console.log('a canvas appended')
        console.log('p5', this)
    }

    show () {
        this.canvas.style.zIndex = -1
    }

    hide () {
        this.canvas.style.zIndex = -10
    }
}