import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

const content = document.querySelectorAll(".scroll-trigger");
const hero = document.querySelectorAll(".hero");
const heroSpans = document.querySelectorAll(".hero > h2 > span");
const ground = document.querySelector(".ground");
const darknessOverlay = document.querySelector(".darkness-overlay");
const clouds = document.querySelector(".clouds");
const waves = document.querySelector(".waves");
const boat = document.querySelector(".boat");
const bird = document.querySelector(".bird");
const gradientOverlay = document.querySelector(".gradient-overlay");
const statues = document.querySelector(".statues");
const statuesShadows = document.querySelector(".statues-shadows");
let groundHeight = ground?.clientHeight ? ground?.clientHeight - 50 : 250;
let contentAreaHeight = window.innerHeight - groundHeight;
const steinL = document.querySelector('[data-name="stein-l"]');
const steinR = document.querySelector('[data-name="stein-r"]');
const foamR = document.querySelector('[data-name="foam-r"]');
const foamL = document.querySelector('[data-name="foam-l"]');
const banner = document.querySelector('[data-name="text-banner"]');
const ribbonR = document.querySelector('[data-name="ribbon-right"]');
const ribbonL = document.querySelector('[data-name="ribbon-left"]');
const textRing = document.querySelector('[data-name="text-ring"]');

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// WAVES
gsap.to(waves, {
  x: "-10%",
  duration: 60,
  repeat: -1,
  yoyo: true,
  ease: "linear",
});

// BOAT
let boattl = gsap.timeline({ repeat: -1, paused: false, yoyo: true });
boattl.to(boat, { x: "-20vw", duration: 120, ease: "linear" }, "boating").to(
  boat,
  {
    y: "-2",
    duration: 2,
    ease: "power1.inOut",
    repeat: -1,
    yoyo: true,
  },
  "boating"
);

// BIRD
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
    ease: "power1.inOut",
  },
  "flying"
);

// LOGO - WAVY RIBBON
gsap.to(ribbonR, {
  skewX: -5,
  skewY: -5,
  transformOrigin: "left center",
  duration: 0.8,
  repeat: -1,
  yoyo: true,
  ease: "power1.in",
});

// LOGO - WAVY RIBBON
gsap.to(ribbonL, {
  skewX: 5,
  skewY: 5,
  transformOrigin: "right center",
  duration: 0.8,
  repeat: -1,
  yoyo: true,
  ease: "power1.in",
});

// LOGO - BANNER MOVEMENT
gsap.fromTo(
  banner,
  { y: 2 },
  { y: -2, transformOrigin: "center", duration: 2, repeat: -1, yoyo: true }
);

// STATUE SHADOWS
gsap.to(statuesShadows, {
  skewX: "-90deg",
  ease: "none",
  scrollTrigger: {
    trigger: "body",
    scrub: 0.5,
  },
});

// LOGO SHOW ANIMATION
function logoTimeline() {
  let ltl = gsap.timeline();
  ltl.fromTo("header", { opacity: 0 }, { opacity: 1, duration: 0.25 }, "start");
  ltl.fromTo(
    steinL,
    { x: -20, y: -3 },
    {
      keyframes: [
        { x: -10, y: 2 },
        { x: 0, y: 0 },
      ],
      duration: 0.66,
      ease: "power4.in",
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
  ltl.to(steinL, { x: -5, duration: 0.5, ease: "power1.out" }, "foam");
  ltl.to(steinR, { x: 5, duration: 0.5, ease: "power1.out" }, "foam");
  return ltl;
}

// PAN DOWN SCENE REVEAL
function panInTimeline() {
  let panDownTL = gsap.timeline();

  panDownTL.fromTo(
    clouds,
    { y: 50 },
    { y: 0, duration: 2, delay: 1.5, ease: "power1" },
    "intro"
  );
  panDownTL.from(
    ground,
    { y: groundHeight, duration: 2, delay: 1.75, ease: "power1" },
    "intro"
  );
  panDownTL.from(
    statues,
    { y: 120, duration: 2, delay: 1.5, ease: "power1" },
    "intro"
  );
  panDownTL.from(
    hero,
    { opacity: 0, duration: 0.1, ease: "power1" },
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
        ease: "power1",
      },
      "contentShow"
    );
  });
  return panDownTL;
}
// COMPOSE LOAD TIMELINE
let intialLoadTimeline = gsap.timeline({ repeat: 0, paused: false });
intialLoadTimeline
  .add(panInTimeline(), "panIn")
  .add("content", ">+0.25")
  .add(logoTimeline(), "content")
  .from(
    ".hero > div",
    {
      opacity: 0,
      scale: 1.1,
      delay: 0,
      duration: 0.25,
      ease: "power1",
    },
    "content"
  );

// SCALE LOGO ON SCROLL
let scrollFromTopTL = gsap.timeline({
  scrollTrigger: {
    trigger: "main",
    start: "+=75",
    end: "+=150",
    scrub: 0.5,
  },
});
//Scale down
scrollFromTopTL.to(
  "#logo",
  {
    y: -40,
    // scale: 0.9,
    // transformOrigin: "left center",
    ease: "power1:out",
  },
  "hideStuff"
);
// Hide graphical elements
scrollFromTopTL.to(
  [steinL, steinR],
  {
    opacity: 0,
    ease: "power1:out",
  },
  "hideStuff"
);
// Show "Geelong"
scrollFromTopTL.to(
  '[data-name="geelong"]',
  {
    scale: 1.5,
    y: -15,
    transformOrigin: "top center",
    ease: "power1:out",
  },
  "hideStuff"
);

// FADE OUT HERO ON SCROLL
let heroOutTL = gsap.timeline({
  scrollTrigger: {
    trigger: hero,
    start: "top 31",
    end: "bottom center",
    scrub: 0.1,
    pin: true,
  },
});
heroOutTL.to(
  hero,
  {
    opacity: 0,
    // x: -50,
  },
  "out"
);

// CONTENT SECTIONS
console.log("content area:" + contentAreaHeight);
content.forEach((item, i) => {
  let isSecondLastItem = i === content.length - 2;
  let isLastItem = i === content.length - 1;
  let h3 = item.querySelector("h3");
  const startPoint = `60% ${contentAreaHeight - 51}`;
  const endPoint = `top top`;
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: item,
      start: startPoint,
      end: endPoint,
      scrub: 0.5,
      pin: false,
      pinSpacing: false,
      markers: false,
    },
  });
  // start night time overlays on second last time card
  if (isSecondLastItem) {
    tl.to(
      darknessOverlay,
      { opacity: 0.05, ease: "linear", duration: 0.5 },
      "entry"
    )
      .to(clouds, { filter: "blur(1px)", opacity: 0.5, duration: 0.5 }, "entry")
      .to(
        gradientOverlay,
        { opacity: 0.3, ease: "linear", duration: 0.5 },
        "entry"
      );
  }
  // complete night time overlays on last time card
  else if (isLastItem) {
    tl.to(
      darknessOverlay,
      { opacity: 0.3, ease: "linear", duration: 0.5 },
      "entry"
    )
      .to(
        clouds,
        {
          filter: "blur(3px)",
          opacity: 0.3,
          ease: "linear",
          duration: 0.5,
        },
        "entry"
      )
      .to(
        gradientOverlay,
        { opacity: 0.7, ease: "linear", duration: 0.5 },
        "entry"
      );
    // start night time overlays on second last time card
  }
  // show the content
  tl.from(item, { opacity: 0, duration: 0.5, ease: "power1.in" }, "entry")
    .from(h3, { opacity: 0, x: 20, duration: 0.5 }, "entry")
    .addLabel("entry")
    .to(item, { opacity: 0, duration: 1, delay: 1, ease: "power1.Out" });

  // Make sure focused element gets snapped to
  item.addEventListener("focus", () => {
    gsap.to(window, {
      scrollTo: tl.scrollTrigger?.labelToScroll("entry"),
    });
  });
});
