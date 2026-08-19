/* =====================================================
   PROJECT JESSICA
   MASTER CONFIGURATION
   ===================================================== */


const PROJECT_CONFIG = {

    /* ================================================
       PERSON
       ================================================ */

    person: {

        name: "Jessica",

        nicknames: [
            "Pulaji",
            "Sweetheart",
            "Khil"
        ]

    },


    /* ================================================
       BIRTHDAY
       ================================================ */

   birthday: {

    /*
     * ============================================
     * MASTER BIRTHDAY TIME
     * ============================================
     *
     * 07 September 2026
     * 12:00 PM
     * India Standard Time
     *
     * +05:30 = IST
     */

    target:
        "2026-09-07T12:00:00+05:30",


    /*
     * Display information.
     * These are NOT used for calculations.
     */

    name:
        "Jessica",

    displayDate:
        "07 · 09 · 2026",

    timezone:
        "Asia/Kolkata"

}


    /* ================================================
       SECRET ACCESS
       ================================================ */

    security: {

        /*
         * Temporary development PIN.
         *
         * CHANGE THIS before the final deployment.
         */

        pin: "0709"

    },


    /* ================================================
       THEME
       ================================================ */

    theme: {

        primary:
            "#050507",

        midnight:
            "#0c0d17",

        crimson:
            "#8d1028",

        crimsonBright:
            "#c52a49",

        gold:
            "#e7c878",

        white:
            "#f8f6f0"

    },


    /* ================================================
       EXPERIENCE SETTINGS
       ================================================ */

    experience: {

        enableParticles:
            true,

        enableCustomCursor:
            true,

        enableAmbientMotion:
            true,

        reducedMotionRespect:
            true

    },


    /* ================================================
       DEVELOPMENT MODE
       ================================================ */

    development: {

        /*
         * Keep TRUE while building.
         *
         * We'll turn this OFF before final deployment.
         */

        enabled:
            true

    }

};


/*
 * Freeze the configuration so accidental
 * modifications don't silently happen.
 */

Object.freeze(PROJECT_CONFIG);
