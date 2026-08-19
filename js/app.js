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
       this.setupCountdown() {
          if (
             !this.countdown ||
             !this.countdown.container
             ) {
             console.warn(
                "countdown elements dont found."
                );
             return;
          }
          this.updateCountdown();

          this.countdownInterval = 
             window.setInterval(
                () => {
                   this.updateCountdown();
                },
                1000
                );
       }
       this.setupTierTwo();
updateCountdown()
       handleBirthdayUnlock()
       /* =================================================
   TIER 2 — INITIALIZATION
   ================================================= */

setupTierTwo() {

    /*
     * Listen for the countdown finishing.
     */

    window.addEventListener(
        "birthdayUnlocked",
        () => {

            this.unlockBirthdayExperience();

        }
    );


    /*
     * Manual PIN access.
     */

    if (
        this.pinAccessButton
    ) {

        this.pinAccessButton
            .addEventListener(
                "click",
                () => {

                    this.openPinModal();

                }
            );

    }


    /*
     * Close PIN modal.
     */

    if (
        this.pinCloseButton
    ) {

        this.pinCloseButton
            .addEventListener(
                "click",
                () => {

                    this.closePinModal();

                }
            );

    }


    /*
     * Backdrop closes modal.
     */

    document
        .querySelector(
            "[data-pin-close]"
        )
        ?.addEventListener(
            "click",
            () => {

                this.closePinModal();

            }
        );


    /*
     * PIN keypad.
     */

    if (
        this.pinKeypad
    ) {

        this.pinKeypad
            .addEventListener(
                "click",
                (event) => {

                    const button =
                        event.target
                            .closest(
                                "[data-pin-key]"
                            );


                    if (
                        !button
                    ) {

                        return;

                    }


                    const key =
                        button.dataset
                            .pinKey;


                    this.handlePinInput(
                        key
                    );

                }
            );

    }


    /*
     * Continue button.
     *
     * This will become the bridge
     * to Tier 3.
     */

    if (
        this.revealContinueButton
    ) {

        this.revealContinueButton
            .addEventListener(
                "click",
                () => {

                    window.dispatchEvent(
                        new CustomEvent(
                            "birthdayRevealContinue"
                        )
                    );

                }
            );

    }

}


/* =================================================
   OPEN PIN MODAL
   ================================================= */

openPinModal() {

    if (
        !this.pinModal
    ) {

        return;

    }


    this.enteredPin =
        "";


    this.updatePinDots();


    if (
        this.pinMessage
    ) {

        this.pinMessage.textContent =
            "Enter the secret four-digit code.";

    }


    this.pinModal
        .classList.add(
            "active"
        );


    this.pinModal
        .setAttribute(
            "aria-hidden",
            "false"
        );

}


/* =================================================
   CLOSE PIN MODAL
   ================================================= */

closePinModal() {

    if (
        !this.pinModal
    ) {

        return;

    }


    this.pinModal
        .classList.remove(
            "active"
        );


    this.pinModal
        .setAttribute(
            "aria-hidden",
            "true"
        );

}


/* =================================================
   HANDLE PIN
   ================================================= */

handlePinInput(
    key
) {

    if (
        key === "clear"
    ) {

        this.enteredPin =
            "";

        this.updatePinDots();

        return;

    }


    if (
        key === "back"
    ) {

        this.enteredPin =
            this.enteredPin.slice(
                0,
                -1
            );

        this.updatePinDots();

        return;

    }


    if (
        !/^\d$/.test(key)
    ) {

        return;

    }


    if (
        this.enteredPin.length >=
        this.maxPinLength
    ) {

        return;

    }


    this.enteredPin +=
        key;


    this.updatePinDots();


    /*
     * Four digits entered.
     */

    if (
        this.enteredPin.length ===
        this.maxPinLength
    ) {

        window.setTimeout(
            () => {

                this.verifyPin();

            },
            180
        );

    }

}


/* =================================================
   UPDATE PIN DOTS
   ================================================= */

updatePinDots() {

    if (
        !this.pinDots
    ) {

        return;

    }


    const dots =
        this.pinDots
            .querySelectorAll(
                "span"
            );


    dots.forEach(
        (
            dot,
            index
        ) => {

            dot.classList.toggle(
                "filled",
                index <
                this.enteredPin.length
            );

        }
    );

}


/* =================================================
   VERIFY PIN
   ================================================= */

verifyPin() {

    if (
        this.enteredPin ===
        this.secretPin
    ) {

        if (
            this.pinMessage
        ) {

            this.pinMessage.textContent =
                "Access granted.";

        }


        window.setTimeout(
            () => {

                this.closePinModal();

                this.unlockBirthdayExperience();

            },
            500
        );


        return;

    }


    /*
     * Wrong PIN.
     */

    if (
        this.pinMessage
    ) {

        this.pinMessage.textContent =
            "Hmm... that isn't the secret.";

    }


    if (
        this.pinDots
    ) {

        this.pinDots.classList.add(
            "pin-error"
        );


        window.setTimeout(
            () => {

                this.pinDots
                    .classList.remove(
                        "pin-error"
                    );

            },
            500
        );

    }


    window.setTimeout(
        () => {

            this.enteredPin =
                "";

            this.updatePinDots();

        },
        650
    );

}


/* =================================================
   UNLOCK BIRTHDAY EXPERIENCE
   ================================================= */

unlockBirthdayExperience() {

    /*
     * Prevent duplicate unlocks.
     */

    if (
        this.birthdayExperienceUnlocked
    ) {

        return;

    }


    this.birthdayExperienceUnlocked =
        true;


    /*
     * Hide countdown if it still exists.
     */

    if (
        this.countdown &&
        this.countdown.container
    ) {

        this.countdown.container
            .classList.remove(
                "is-unlocked"
            );

    }


    /*
     * Activate lock screen first.
     */

    if (
        this.lockScreen
    ) {

        this.lockScreen
            .classList.add(
                "active"
            );

        this.lockScreen
            .setAttribute(
                "aria-hidden",
                "false"
            );

    }


    /*
     * After the lock chamber appears,
     * reveal the birthday.
     */

    window.setTimeout(
        () => {

            this.showBirthdayReveal();

        },
        2200
    );

}


/* =================================================
   SHOW BIRTHDAY REVEAL
   ================================================= */

showBirthdayReveal() {

    if (
        this.lockScreen
    ) {

        this.lockScreen
            .classList.remove(
                "active"
            );

        this.lockScreen
            .setAttribute(
                "aria-hidden",
                "true"
            );

    }


    if (
        this.birthdayReveal
    ) {

        this.birthdayReveal
            .classList.add(
                "active"
            );

        this.birthdayReveal
            .setAttribute(
                "aria-hidden",
                "false"
            );

    }


    /*
     * Notify Tier 3.
     */

    window.dispatchEvent(
        new CustomEvent(
            "birthdayRevealShown"
        )
    );

}
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
/* ============================================
   TIER 2 — LOCK / REVEAL REFERENCES
   ============================================ */

this.lockScreen =
    document.getElementById(
        "birthdayLockScreen"
    );

this.pinModal =
    document.getElementById(
        "pinModal"
    );

this.pinAccessButton =
    document.getElementById(
        "pinAccessButton"
    );

this.pinCloseButton =
    document.getElementById(
        "pinCloseButton"
    );

this.pinKeypad =
    document.getElementById(
        "pinKeypad"
    );

this.pinDots =
    document.getElementById(
        "pinDots"
    );

this.pinMessage =
    document.getElementById(
        "pinMessage"
    );

this.birthdayReveal =
    document.getElementById(
        "birthdayReveal"
    );

this.revealContinueButton =
    document.getElementById(
        "revealContinueButton"
    );


/* ============================================
   PIN STATE
   ============================================ */

this.enteredPin =
    "";

this.maxPinLength =
    4;


/*
 * CHANGE THIS ONE VALUE
 * when you decide your private PIN.
 */

this.secretPin =
    "0709";
