/* =====================================================
   PROJECT JESSICA
   APPLICATION ENGINE
   ===================================================== */


class BirthdayExperience {

    constructor() {

        this.loader =
            document.getElementById("loader");

        this.experience =
            document.getElementById("experience");

        this.progressBar =
            document.getElementById("loaderProgress");

        this.loaderStatus =
            document.getElementById("loaderStatus");

        this.currentTime =
            document.getElementById("currentTime");

        this.foundationButton =
            document.getElementById("foundationButton");
       /* ============================================
   COUNTDOWN REFERENCES
   ============================================ */

this.countdown = {

    container:
        document.getElementById(
            "birthdayCountdown"
        ),

    days:
        document.getElementById(
            "countdownDays"
        ),

    hours:
        document.getElementById(
            "countdownHours"
        ),

    minutes:
        document.getElementById(
            "countdownMinutes"
        ),

    seconds:
        document.getElementById(
            "countdownSeconds"
        ),

    message:
        document.getElementById(
            "countdownMessage"
        ),

    status:
        document.getElementById(
            "countdownStatusText"
        )

};


/* ============================================
   COUNTDOWN STATE
   ============================================ */

this.countdownInterval =
    null;

this.birthdayUnlocked =
    false;

        this.particleSystem =
            null;

        this.init();

    }


    /* ================================================
       INITIALIZE
       ================================================ */

    async init() {

        this.setupCursor();

        this.setupParticles();

        this.setupClock();

        this.setupInteractions();

        await this.runLoader();

        this.revealExperience();

    }


    /* ================================================
       LOADER
       ================================================ */

    runLoader() {

        return new Promise(resolve => {

            const stages = [

                {
                    progress: 15,
                    text: "INITIALIZING"
                },

                {
                    progress: 32,
                    text: "PREPARING THE EXPERIENCE"
                },

                {
                    progress: 54,
                    text: "BUILDING THE ATMOSPHERE"
                },

                {
                    progress: 76,
                    text: "ADDING A LITTLE MAGIC"
                },

                {
                    progress: 91,
                    text: "ALMOST READY"
                },

                {
                    progress: 100,
                    text: "WELCOME"
                }

            ];


            let index = 0;


            const nextStage = () => {

                if (
                    index >=
                    stages.length
                ) {

                    setTimeout(
                        resolve,
                        500
                    );

                    return;

                }


                const stage =
                    stages[index];


                this.progressBar.style.width =
                    `${stage.progress}%`;


                this.loaderStatus.textContent =
                    stage.text;


                index++;


                setTimeout(
                    nextStage,
                    350
                );

            };


            nextStage();

        });

    }


    /* ================================================
       REVEAL
       ================================================ */

    revealExperience() {

        setTimeout(() => {

            this.loader.classList.add(
                "is-hidden"
            );

            this.experience.classList.add(
                "is-visible"
            );

            this.experience.setAttribute(
                "aria-hidden",
                "false"
            );

        }, 300);

    }


    /* ================================================
       PARTICLES
       ================================================ */

    setupParticles() {

        if (
            !PROJECT_CONFIG.experience
                .enableParticles
        ) {

            return;

        }


        const canvas =
            document.getElementById(
                "particleCanvas"
            );


        if (!canvas) {

            return;

        }


        this.particleSystem =
            new ParticleSystem(canvas);

    }


    /* ================================================
       CLOCK
       ================================================ */

    setupClock() {

        const updateClock = () => {

            const now =
                new Date();


            const hours =
                String(
                    now.getHours()
                ).padStart(2, "0");


            const minutes =
                String(
                    now.getMinutes()
                ).padStart(2, "0");


            this.currentTime.textContent =
                `${hours}:${minutes}`;

        };


        updateClock();


        setInterval(
            updateClock,
            1000
        );

    }


    /* ================================================
       INTERACTIONS
       ================================================ */

    setupInteractions() {

        this.foundationButton
            ?.addEventListener(
                "click",
                () => {

                    this.foundationButton
                        .classList.add(
                            "is-clicked"
                        );


                    /*
                     * The actual birthday
                     * experience will eventually
                     * begin here.
                     *
                     * For now, this simply gives
                     * us a controlled foundation
                     * interaction.
                     */

                    console.log(
                        "Foundation interaction triggered."
                    );

                }
            );

    }


    /* ================================================
       CUSTOM CURSOR
       ================================================ */

    setupCursor() {

        if (
            !PROJECT_CONFIG.experience
                .enableCustomCursor
        ) {

            return;

        }


        if (
            window.matchMedia(
                "(pointer: coarse)"
            ).matches
        ) {

            return;

        }


        const cursor =
            document.getElementById(
                "cursor"
            );


        const follower =
            document.getElementById(
                "cursorFollower"
            );


        if (!cursor || !follower) {

            return;

        }


        let mouseX = 0;
        let mouseY = 0;

        let followerX = 0;
        let followerY = 0;


        window.addEventListener(
            "mousemove",
            event => {

                mouseX =
                    event.clientX;

                mouseY =
                    event.clientY;

                cursor.style.left =
                    `${mouseX}px`;

                cursor.style.top =
                    `${mouseY}px`;

                document.body.classList.add(
                    "cursor-active"
                );

            },
            { passive: true }
        );


        const animateFollower = () => {

            followerX +=
                (mouseX - followerX) *
                0.12;

            followerY +=
                (mouseY - followerY) *
                0.12;


            follower.style.left =
                `${followerX}px`;

            follower.style.top =
                `${followerY}px`;


            requestAnimationFrame(
                animateFollower
            );

        };


        animateFollower();


        const interactiveElements =
            document.querySelectorAll(
                "button, a, [data-cursor-hover]"
            );


        interactiveElements.forEach(
            element => {

                element.addEventListener(
                    "mouseenter",
                    () => {

                        document.body.classList.add(
                            "cursor-hover"
                        );

                    }
                );


                element.addEventListener(
                    "mouseleave",
                    () => {

                        document.body.classList.remove(
                            "cursor-hover"
                        );

                    }
                );

            }
        );

    }

}


/* =====================================================
   BOOT
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        window.BirthdayExperience =
            new BirthdayExperience();

    }
);
