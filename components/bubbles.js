class Bubbles extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `<svg id="bubbles" width="100%" height="100%"></svg>`;
        this.initBubbles();
    }

    initBubbles() {
        const width = window.innerWidth;
        const height = this.offsetHeight || 400;

        const colors = ["#7DBEA5", "#EE9D31", "#F26C1A", "#5A392B"];
        const bgColor = "#e7f4ff";                

        const svg = d3.select(this.querySelector("#bubbles"))
            .attr("width", "100%")
            .attr("height", "100%");

        svg.append("rect")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("fill", bgColor);


         // TEXT CENTRÉ
        svg.append("text")
        .attr("x", "50%")
        .attr("y", "50%")
        // .attr("text-anchor", "middle")
        // .attr("dominant-baseline", "middle")
        // .style("font-weight", "bold")
        // .style("font-size", "2.5rem")
        // .style("fill", "#23639f")
        .text("Elina Marveaux");

        const defs = svg.append('defs');
        const filter = defs.append('filter').attr('id', 'gooey');
        filter.append('feGaussianBlur')
            .attr('in', 'SourceGraphic')
            .attr('stdDeviation', '10')
            .attr('result', 'blur');
        filter.append('feColorMatrix')
            .attr('in', 'blur')
            .attr('mode', 'matrix')
            .attr('values', '1 0 0 0 0  0 1 0 0 10  0 0 1 0 0  0 0 0 18 -7')
            .attr('result', 'gooey');
        filter.append('feComposite')
            .attr('in', 'SourceGraphic')
            .attr('in2', 'gooey')
            .attr('operator', 'atop');

        const g = svg.append("g")
            .style("filter", "url(#gooey)")
            .attr("transform", "translate(10, 10)");

        // Mini Vector class
        class Vector {
            constructor(x, y) { [this.x, this.y] = [x || 0, y || 0]; }
            clone() { return new Vector(this.x, this.y); }
            add(v) { return new Vector(this.x + v.x, this.y + v.y); }
            dot(v) { return this.x * v.x + this.y * v.y; }
            mag() { return Math.sqrt(this.dot(this)); }
            scale(s) { return new Vector(this.x * s, this.y * s); }
            normalize() { return this.scale(1 / this.mag()); }
            limit(max) { return this.mag() > max ? this.normalize().scale(max) : this; }
        }

        class Particle {
            constructor(x, y, g, color) {
                this.pos = new Vector(x, y);
                this.vel = new Vector(Math.random(), Math.random());
                this.acc = new Vector(0, 0);
                this.maxspeed = 3;
                this.p = g.append("circle")
                    .attr("cx", x)
                    .attr("cy", y)
                    .attr("r", Math.random() * 50 + 5)
                    .attr("fill", color);
            }
            update() {
                this.vel = this.vel.add(this.acc).limit(this.maxspeed);
                this.pos = this.pos.add(this.vel);
                this.acc = this.acc.scale(0);
                this.p.attr("cx", this.pos.x).attr("cy", this.pos.y);
            }
            applyForce(force) { this.acc = this.acc.add(force); }
            edges(w, h) {
                const padding = 50;
                if (this.pos.x > w + padding) this.pos.x = -padding;
                if (this.pos.x < -padding) this.pos.x = w + padding;
                if (this.pos.y > h + padding) this.pos.y = -padding;
                if (this.pos.y < -padding) this.pos.y = h + padding;
            }
        }

        const particles = d3.range(40).map(() =>
            new Particle(Math.random() * width, Math.random() * height, g, colors[Math.floor(Math.random() * colors.length)])
        );

        const render = () => {
            particles.forEach(p => {
                p.update();
                p.edges(width, height);
            });
        };

        const animate = () => {
            render();
            requestAnimationFrame(animate);
        };

        animate();
    }
}

customElements.define('bubbles-component', Bubbles);
