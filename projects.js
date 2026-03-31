// ============================================================
//  projects.js — 你的作品集数据
//  编辑这个文件来添加 / 删除 / 修改项目
//  添加完后刷新浏览器即可看到效果
// ============================================================

const PROJECTS = [
  {
    id: "symbiotic-parasite",           // URL hash，用于跳转，不能有空格
    title: "Symbiotic Parasite",
    year: "2025",
    category: "Generative System · Interactive World",
    medium: "p5.js · ml5.js",
    role: "Solo",
    shortDesc: "A living ecosystem of autonomous agents navigating attraction and survival — where invisible forces shape emergent behaviors in a synthetic world.",
    fullDesc: `Symbiotic Parasite constructs a synthetic ecosystem where autonomous agents navigate a field of invisible forces. Attractors function as organs within the environment, drawing entities into cycles of dependence, collision, and adaptation.
Through interaction, users intervene in this system — introducing new forces, shifting balances, and observing how complex behaviors emerge from simple rules. The work reflects on control, dependency, and the blurred boundary between host and parasite.`,
    details: [
      "Real-time agent system with steering behaviors (seek, arrive, avoid)",
      "Dynamic attractor logic influencing population flow and clustering",
      "Interactive input via hand tracking and gesture-based spawning",
      "Large-scale navigable world with camera-centered perspective"
    ],
    coverColor: "#0c1520",
    coverImg: "images/symbiotic-parasite-01.JPG",        // 填图片URL，或留空用颜色块
    images: [],          // 详情页额外图片，填URL数组
    link: "https://editor.p5js.org/Florence228/full/fdMoIA8VS",
    github: "https://editor.p5js.org/Florence228/sketches/fdMoIA8VS"
  },
  {
    id: "escape-city",
    title: "Escape City",
    year: "2025",
    category: "Generative Environment · Real-Time Performance",
    medium: "Unreal Engine 5",
    role: "Solo",
    shortDesc: "A real-time interactive cityscape where the player's movement activates sound, light, and disruption — transforming navigation into a performative act of survival.",
    fullDesc: `Escape City is an immersive real-time environment built in Unreal Engine, where the player navigates a city in a state of collapse. Movement through space activates a network of triggers — sound, light, and environmental disruption unfold progressively.
The experience transforms navigation into a performative act, where urgency is constructed through spatial tension. The city is not static, but reactive — responding to presence, proximity, and direction.`,
    details: [
      "Built in Unreal Engine 5 using Blueprint-based interaction systems",
      "Spatial trigger zones driving audio, lighting, and event sequences",
      "Dynamic atmosphere design: alarm states, explosions, and visual shifts",
      "First-person navigation guiding users through a staged escape narrative"
    ],
    coverColor: "#0a0a1e",
    coverImg: "images/escape-city-01.JPG",
    images: [],
    link: "https://youtu.be/LbNawtBKbJA?si=qNjLwmR6mg_WgziC",
    github: ""
  },
  {
    id: "luminous-spine",
    title: "Luminous Spine",
    year: "2026",
    category: "Kinetic Installation · Physical Computing",
    medium: "Arduino · FastLED · 3D Printing",
    role: "Solo",
    shortDesc: "A kinetic wearable installation that activates when users bend their body — feel your spine.",
    fullDesc: `Luminous Spine is a wearable kinetic installation that translates bodily movement into light. A series of illuminated vertebrae respond to bending, activating a flowing sequence across the spine.
The piece explores the relationship between internal structure and external expression — making the invisible mechanics of the body visible through responsive illumination.`,
    details: [
      "Custom 3D-printed vertebrae integrated with LED strip system",
      "Bend sensors capturing body movement and triggering light changes",
      "Arduino-based control using real-time sensor input",
      "Wearable assembly combining soft structure and rigid components"
    ],
    coverColor: "#1a1410",
    coverImg: "images/luminous-spine-01.jpg",
    images: [],
    link: "https://youtu.be/p4oU7MnkNEo?si=Z_szVnqNNRWpATCk",
    github: ""
  },
  {
    id: "chromatic-reverie",
    title: "Chromatic Reverie",
    year: "2025",
    category: "Interactive Visualisation · KALEIDOSCOPIC SYSTEM",
    medium: "p5.js",
    role: "Solo",
    shortDesc: "A shifting field of symmetry and color — where user input dissolves into infinite reflections and hypnotic visual echoes.",
    fullDesc: `Chromatic Reverie is an interactive visual system generating infinite kaleidoscopic patterns through symmetry and repetition. User input continuously reshapes the composition, dissolving control into recursive transformation.
The work invites users into a state of visual immersion, where color, motion, and reflection create a shifting perceptual field between order and chaos.`,
    details: [
      "Real-time generative visuals built with p5.js",
      "Symmetry-based rendering system with dynamic transformations",
      "Interactive controls for color, scale, and pattern evolution",
      "Continuous feedback loop between input and visual output"
    ],
    coverColor: "#0a1a10",
    coverImg: "images/chromatic-reverie-01.jpg",
    images: [],
    link: "https://editor.p5js.org/Florence228/full/CJO2VaZBF",
    github: "https://editor.p5js.org/Florence228/sketches/CJO2VaZBF"
  }
];

// ============================================================
//  关于页面信息 — 同样在这里修改
// ============================================================
const ABOUT = {
  name: "Florence Jiang 蒋可欣",
  nameDisplay: "Florence Jiang",
  program: "Interactive Media Arts · NYU Shanghai · Class of 2027",
  lead: "I make work at the intersection of code, space, and human presence.",
  bio: [
    "I'm an interactive media artist and creative technologist based between Shanghai and New York. My practice spans generative systems, physical computing, game development, and immersive installation. I'm interested in technology as a medium for creating experiences people can feel before they can articulate.",
    "Currently a junior at NYU Shanghai studying Interactive Media Arts. Open to collaborations, residencies, and internships globally."
  ],
  tools: ["p5.js", "Unreal Engine", "Arduino", "TouchDesigner", "Blender", "Unity", "Three.js", "Web Design", "After Effects", "Python"],
  photo: "images/self-photo.JPG",   // 填你的照片URL，或留空
  email: "kj2527@nyu.edu",
  github: "",
  instagram: "https://www.instagram.com/dyaksh5/",
  linkedin: "",
  arena: ""
};
