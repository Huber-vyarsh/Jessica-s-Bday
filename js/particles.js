/* =====================================================
   PARTICLE SYSTEM
   ===================================================== */


class ParticleSystem {

    constructor(canvas) {

        this.canvas = canvas;

        this.ctx =
            canvas.getContext("2d");

        this.particles = [];

        this.width = 0;

        this.height = 0;

        this.dpr =
            Math.min(
                window.devicePixelRatio || 1,
                2
            );

        this.animationFrame = null;

        this.mouse = {

            x: null,

            y: null

        };

        this.init();

    }


    /* ================================================
       INITIALIZATION
       ================================================ */

    init() {

        this.resize();

        this.createParticles();

        this.bindEvents();

        this.animate();

    }


    /* ================================================
       RESIZE
       ================================================ */

    resize() {

        this.width =
            window.innerWidth;

        this.height =
            window.innerHeight;

        this.canvas.width =
            this.width * this.dpr;

        this.canvas.height =
            this.height * this.dpr;

        this.canvas.style.width =
            `${this.width}px`;

        this.canvas.style.height =
            `${this.height}px`;

        this.ctx.setTransform(
            this.dpr,
            0,
            0,
            this.dpr,
            0,
            0
        );

        this.createParticles();

    }


    /* ================================================
       CREATE
       ================================================ */

    createParticles() {

        const area =
            this.width *
            this.height;

        const density =
            window.innerWidth < 700
                ? 0.000025
                : 0.000035;

        const count =
            Math.min(
                Math.max(
                    Math.floor(area * density),
                    30
                ),
                100
            );

        this.particles =
            Array.from(
                { length: count },
                () => this.createParticle()
            );

    }


    createParticle() {

        return {

            x:
                Math.random() *
                this.width,

            y:
                Math.random() *
                this.height,

            radius:
                Math.random() *
                1.3
                + 0.2,

            opacity:
                Math.random() *
                0.45
                + 0.05,

            speed:
                Math.random() *
                0.18
                + 0.03,

            drift:
                Math.random() *
                0.4
                - 0.2,

            phase:
                Math.random() *
                Math.PI *
                2

        };

    }


    /* ================================================
       EVENTS
       ================================================ */

    bindEvents() {

        window.addEventListener(
            "resize",
            () => this.resize(),
            { passive: true }
        );

        window.addEventListener(
            "mousemove",
            event => {

                this.mouse.x =
                    event.clientX;

                this.mouse.y =
                    event.clientY;

            },
            { passive: true }
        );

        window.addEventListener(
            "mouseleave",
            () => {

                this.mouse.x = null;

                this.mouse.y = null;

            }
        );

    }


    /* ================================================
       DRAW
       ================================================ */

    drawParticle(particle, time) {

        const drift =
            Math.sin(
                time * 0.0005 +
                particle.phase
            ) *
            particle.drift;

        particle.y -=
            particle.speed;

        particle.x +=
            drift * 0.02;


        if (particle.y < -10) {

            particle.y =
                this.height + 10;

            particle.x =
                Math.random() *
                this.width;

        }


        /*
         * Very subtle mouse interaction.
         */

        if (
            this.mouse.x !== null &&
            this.mouse.y !== null
        ) {

            const dx =
                particle.x -
                this.mouse.x;

            const dy =
                particle.y -
                this.mouse.y;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );

            const radius = 100;

            if (distance < radius) {

                const force =
                    (radius - distance) /
                    radius;

                particle.x +=
                    (dx / distance || 0) *
                    force *
                    0.15;

                particle.y +=
                    (dy / distance || 0) *
                    force *
                    0.15;

            }

        }


        /*
         * Gold / white particle.
         */

        this.ctx.beginPath();

        this.ctx.arc(
            particle.x,
            particle.y,
            particle.radius,
            0,
            Math.PI * 2
        );

        this.ctx.fillStyle =
            `rgba(231, 200, 120, ${particle.opacity})`;

        this.ctx.fill();

    }


    /* ================================================
       ANIMATION LOOP
       ================================================ */

    animate(time = 0) {

        this.ctx.clearRect(
            0,
            0,
            this.width,
            this.height
        );

        for (
            const particle
            of this.particles
        ) {

            this.drawParticle(
                particle,
                time
            );

        }

        this.animationFrame =
            requestAnimationFrame(
                nextTime =>
                    this.animate(nextTime)
            );

    }


    /* ================================================
       DESTROY
       ================================================ */

    destroy() {

        if (this.animationFrame) {

            cancelAnimationFrame(
                this.animationFrame
            );

        }

    }

}
