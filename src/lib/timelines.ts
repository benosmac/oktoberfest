import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
gsap.registerPlugin(CustomEase);


// Custom easings 
export const defaultTimingIn = "0.47,0,0.75,0.72";
export const defaultTimingOut = "0.39,0.57,0.56,1";

// WAVES
export function wavesTimeline() {
    const waves = document.querySelector(".waves");
    let wavestl = gsap.timeline({ repeat: -1, paused: false, yoyo: true });

    wavestl.to(waves, {
        x: "-150px",
        duration: 30,
        ease: "linear",
    });

    return wavestl;
}

// BOAT
export function boatTimeline() {
    const boat = document.querySelector(".boat");
    let boattl = gsap.timeline({ repeat: -1, paused: false, yoyo: true });
    boattl.to(boat, { x: "-20vw", duration: 120, ease: "linear" }, "boating").to(
        boat,
        {
            y: "-2",
            duration: 2,
            ease: defaultTimingOut,
            repeat: -1,
            yoyo: true,
        },
        "boating"
    );
    return boattl;
}


// BIRD
export function birdTimeline() {
    const bird = document.querySelector(".bird");
    const wings = document.querySelectorAll('[data-name="wing"]');
    let birdtl = gsap.timeline({ repeat: -1, paused: false });
    birdtl.fromTo(
        bird,
        { x: "-80px" },
        { x: "100vw", duration: 60, repeat: -1, yoyo: false },
        "flying"
    );
    birdtl.fromTo(
        bird,
        { y: "-40px" },
        {
            y: "40px",
            duration: 30,
            yoyo: true,
            repeat: -1,
            ease: defaultTimingIn,
        },
        "flying"
    );
    wings.forEach((wing) => {
        birdtl.to(wing, {
            scaleY: ".4",
            transformOrigin: "bottom center",
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: "linear",
        }, "flying");
    });
    return birdtl;

}

// WHEEL

export function wheelTimeline() {
    let wheeltl = gsap.timeline({ repeat: -1, paused: false });
    const wheel = document.querySelector(".wheel");
    const seatsGroup = document.querySelectorAll(".wheel-seats");
    const seats = document.querySelectorAll(".wheel-seats > g");
    // Rotate the wheel
    wheeltl.to(wheel, {
        rotate: 360,
        transformOrigin: "center",
        duration: 120,
        repeat: -1,
        ease: "linear",
    }, 'spinning');
    // Rotate all the seats around with the wheel
    wheeltl.to(seatsGroup, {
        rotate: 360,
        transformOrigin: "center",
        duration: 120,
        repeat: -1,
        ease: "linear",
    }, 'spinning');
    //To keep the seats upright and aligned with the main wheel we rotate them individually the opposite way to the wheel.
    seats.forEach((seat) => {
        wheeltl.to(seat, {
            rotate: -360,
            transformOrigin: "center",
            duration: 120,
            repeat: -1,
            ease: "linear",
        }, 'spinning');
    });
    return wheeltl;
}
export function slideFgUpTimeline() {
    const fg = document.querySelector('.fg');
    let slideFgUpTimeline = gsap.timeline({ paused: false });
    slideFgUpTimeline.to(fg, { y: 0, duration: .5, ease: defaultTimingOut });
    return slideFgUpTimeline;
}
export function slideFgDownTimeline() {
    const fg = document.querySelector('.fg');
    const content = document.querySelector('.content-area');
    const slideFgDownTimeline = gsap.timeline({ paused: false });
    slideFgDownTimeline.to(content, { opacity: 0, duration: .25, ease: defaultTimingOut });
    slideFgDownTimeline.to(fg, { yPercent: 100, duration: 1, ease: defaultTimingOut });
    return slideFgDownTimeline;
}
// PAN DOWN SCENE REVEAL
export function panInTimeline() {
    const hero = document.querySelectorAll(".hero");
    const heroSpans = document.querySelectorAll(".hero > h2 > span");
    const ground = document.querySelector(".ground");
    const clouds = document.querySelector(".clouds");
    const statues = document.querySelector(".statues");
    const groundHeight = ground?.clientHeight ? ground?.clientHeight - 50 : 250;
    const panDownTL = gsap.timeline();

    panDownTL.from(
        clouds,
        { y: 50, duration: 2, delay: .25, ease: defaultTimingOut },
        "intro"
    );
    panDownTL.from(
        ground,
        { y: groundHeight, duration: 2, delay: .5, ease: defaultTimingOut },
        "intro"
    );
    panDownTL.from(
        statues,
        { y: 120, duration: 2, delay: .25, ease: defaultTimingOut },
        "intro"
    );
    panDownTL.from(
        hero,
        { opacity: 0, duration: 0.1, ease: defaultTimingOut },
        "content"
    );
    heroSpans.forEach((span, i) => {
        panDownTL.from(
            span,
            {
                opacity: 0,
                scale: 1.1,
                duration: 0.25,
                delay: i * 0.5,
                ease: defaultTimingOut,
            },
            "contentShow"
        );
    });
    return panDownTL;
}

// HERO
export function heroDetailsTimeline() {
    let herodtl = gsap.timeline({ repeat: 0, paused: false });
    herodtl.from(
        ".details",
        {
            opacity: 0,
            delay: 0,
            duration: 0.5,
            ease: defaultTimingIn,
        },
        "content"
    );
    return herodtl;

}

// LOGO SHOW ANIMATION
export function logoTimeline() {
    const steinL = document.querySelector('[data-name="stein-l"]');
    const steinR = document.querySelector('[data-name="stein-r"]');
    const foamR = document.querySelector('[data-name="foam-r"]');
    const foamL = document.querySelector('[data-name="foam-l"]');
    let ltl = gsap.timeline();
    ltl.fromTo("header", { opacity: 0 }, { opacity: 1, duration: .5, ease: defaultTimingIn }, "start");
    ltl.fromTo(
        steinL,
        { x: -20, y: -3 },
        {
            keyframes: [
                { x: -10, y: 2 },
                { x: 0, y: 0 },
            ],
            duration: 0.66,
            ease: defaultTimingIn,
        },
        "cheers"
    );
    ltl.fromTo(
        foamL,
        { scale: 0.9, transformOrigin: "right bottom", opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5 },
        "foam"
    );
    ltl.fromTo(
        steinR,
        { x: 20, y: -3 },
        {
            keyframes: [
                { x: 10, y: 2 },
                { x: 0, y: 0 },
            ],
            duration: 0.66,
            ease: "power4.in",
        },
        "cheers"
    );
    ltl.fromTo(
        foamR,
        { scale: 0.9, transformOrigin: "right bottom", opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5 },
        "foam"
    );
    ltl.to(steinL, { x: -5, duration: 0.5, ease: defaultTimingOut }, "foam");
    ltl.to(steinR, { x: 5, duration: 0.5, ease: defaultTimingOut }, "foam");
    return ltl;
}

// Assign scrollTriggers to cards
export function setCardTriggers(cards: NodeListOf<Element>) {
    const ground = document.querySelector(".ground");
    let groundHeight = ground?.clientHeight ? ground?.clientHeight - 50 : 250;
    let contentAreaHeight = window.innerHeight - groundHeight;
    cards.forEach((item, i) => {
        if (!(item instanceof HTMLElement)) {
            return
        }
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: item,
                start: `30% ${contentAreaHeight}`,
                end: `top top`,
                scrub: true,
                markers: true,
            },
        });

        // show the content
        tl.from(item, { opacity: 0, duration: 0.5, ease: defaultTimingIn }, "entry")
            // .from(h3, { opacity: 0, x: 20, duration: 0.5, delay:.25 }, "entry")
            .addLabel("entry")
            .to(item, { opacity: 0, duration: 1, delay: 1.5, ease: defaultTimingOut });

        // Make sure focused element gets snapped to
        item.addEventListener("focusin", () => {
            gsap.to(window, {
                scrollTo: tl.scrollTrigger?.labelToScroll("entry"),
            });
        });
    });
}

export function mapTimeline() {
    const maptl = gsap.timeline({ paused: false, repeat: 0 });
    const icons = gsap.utils.toArray('#map [data-icon]');
    maptl.from(icons, { opacity: 0, duration: 1, delay: .25, ease: defaultTimingIn });
    return maptl;
}

