/*
 * ====================================================================================
 * CONTENT DATABASE
 * ====================================================================================
 *
 * All site copy, project data, research papers, achievements, and Thought Lab
 * content live here rather than inside components. Assets referenced below are
 * served from the `public/` folder and must be prefixed with
 * `import.meta.env.BASE_URL` (the Vite base path, currently '/portfolio/') so
 * links resolve correctly both in dev and on GitHub Pages.
 *
 * A `Project` entry's media lives in `gallery: string[]` (images and/or video
 * file paths / YouTube URLs, first item doubles as the card thumbnail) — see
 * the `Project` interface in types.ts for the exact shape.
 *
 * Changes here only go live after running `npm run deploy`.
 */

import type { Project, SkillCategory, ProcessStep, ResearchPaper, Achievement, ThoughtLabData } from './types';

// =========================================
// 👤 PERSONAL LINKS & CONTACT
// =========================================
export const SOCIAL_LINKS = {
  email: 'kaveeshadhananjaya2002@gmail.com',
  linkedin: 'https://www.linkedin.com/in/kaveesha-dhananjaya/',
  github: 'https://github.com/KD-27',
  resume: `${import.meta.env.BASE_URL}resume.pdf`
};

export const HERO_DATA = {
  name: "KAVEESHA DHANANJAYA",
  title: "MECHATRONICS ENGINEER",
  tagline: "I build intelligent machines from the ground up.",
  intro: "Bridging the gap between mechanical design, electronics, and intelligent software. I turn complex problems into moving solutions."
};

export const ABOUT_DATA = {
  photo: `${import.meta.env.BASE_URL}my_pic.jpeg`,
  bio: `I am a multidisciplinary engineer obsessed with making things move. With a background in Mechatronic Engineering, I thrive in the "messy middle" where hardware meets software.

My goal is to build robust, intelligent robotic systems that solve real-world problems. Whether it's designing a custom PCB, machining a chassis, or writing ROS nodes, I love every step of the process.`
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'a1',
    title: 'Best Academic Performance | Mechatronic Engineering',
    image: `${import.meta.env.BASE_URL}achievements/academic_p.jpg`,
  },
  {
    id: 'a2',
    title: 'Publication at KDU IRC 2024',
    image: `${import.meta.env.BASE_URL}achievements/KDUIRC24.jpg`,
  },
  {
    id: 'a3',
    title: 'Genesis 23',
    image: `${import.meta.env.BASE_URL}achievements/Genisis23.jpg`,
  },
  {
    id: 'a4',
    title: 'Genesis 22',
    image: `${import.meta.env.BASE_URL}achievements/Genisis22.jpg`,
  },
  {
    id: 'a5',
    title: 'MATRIX 23',
    image: `${import.meta.env.BASE_URL}achievements/Mathrix23.jpg`,
  },
  {
    id: 'a6',
    title: 'MATRIX 24 | Champions',
    image: `${import.meta.env.BASE_URL}achievements/Mathrix24.jpg`,
  },
  {
    id: 'a7',
    title: 'Ignite Exhibition',
    image: `${import.meta.env.BASE_URL}achievements/Ignite Exhibition.jpg`,
  },
  {
    id: 'a8',
    title: 'MSD Competition | Champions',
    image: `${import.meta.env.BASE_URL}achievements/box_p_robot.jpg`,
  },
  {
    id: 'a9',
    title: 'ERIC | Research In Charge',
    image: `${import.meta.env.BASE_URL}achievements/ERIC Research In Charge.jpg`,
  }
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Elissa 1.0 - Quadruped Inspection Robot',
    description: 'A quadruped robot with five-bar parallel leg mechanism for inspection in human-inaccessible and hazardous environments.',
    longDescription: `Elissa 1.0 addresses the challenge of inspecting environments too dangerous or confined for humans—industrial facilities, tunnels, disaster zones, and hazardous infrastructure. Traditional inspection methods risk human safety or rely on wheeled robots that struggle with obstacles and uneven surfaces.
    This quadruped platform offers a practical, cost-effective alternative to complex systems like BigDog or ANYmal. It prioritizes stable, deliberate movement over speed, making it ideal for careful inspection tasks where reliability matters more than agility. The robot can carry sensor payloads while maintaining consistent locomotion, enabling remote visual inspection, environmental monitoring, and structural assessment in areas humans cannot safely access.
    Designed for real-world deployment, the system features extended wireless range for operation in large facilities and a modular architecture that allows easy integration of additional sensors and tools for specific inspection requirements.`,
    tags: ['ROS2', 'ESP32', 'MATLAB', 'Simscape', 'MicroROS', 'Quadruped', 'Parallel Mechanism'],
    gallery: [
      `${import.meta.env.BASE_URL}projects/ID1/robot motion.mp4`,
      `${import.meta.env.BASE_URL}projects/ID1/quad model.mp4`,
      `${import.meta.env.BASE_URL}projects/ID1/Walking.mp4`,
      `${import.meta.env.BASE_URL}projects/ID1/Architecture.png`,
      `${import.meta.env.BASE_URL}projects/ID1/TkinterGUI.mp4`,
      `${import.meta.env.BASE_URL}projects/ID1/balancing POV1.mp4`,
      `${import.meta.env.BASE_URL}projects/ID1/balancing POV2.mp4`,
      `${import.meta.env.BASE_URL}projects/ID1/Simulink.png`
    ],
    details: [
      'Five-bar parallel leg mechanism with curved links',
      'Variable Circle Method for real-time inverse kinematics',
      'Distributed ROS2 + MicroROS architecture (Raspberry Pi + ESP32)',
      'ESP-NOW wireless communication with 120-130m range',
      'Trajectory optimization using weighted stability metric',
      'Active body leveling using MPU6050 IMU with complementary filtering',
      '20 cm/s locomotion speed, 30°/s rotation, stability score: 987.9',
      'Custom Tkinter GUI for trajectory design and deployment'
    ]
  },
  {
    id: '2',
    title: 'Mars Rover-Inspired Six-Wheeled Robot for Mapping & Navigation',
    description: 'A six-wheeled robot with LiDAR-based SLAM for autonomous mapping and navigation in complex environments.',
    longDescription: `Modern industrial facilities, warehouses, and complex indoor spaces present significant challenges for autonomous robots—dynamic obstacles, changing layouts, and intricate pathways demand systems that can accurately map and navigate without human intervention.

    This Mars Rover-inspired platform addresses these challenges by combining LiDAR sensing with SLAM algorithms to autonomously map unknown environments and navigate optimal paths between points. The six-wheeled design, inspired by NASA's Mars rovers, provides stability and maneuverability across varied surfaces. The robot builds real-time occupancy grid maps and localizes itself without relying on external infrastructure like beacons or pre-programmed routes.

    Designed for practical deployment in industrial inspection, warehouse logistics, and research applications, the system demonstrates that robust autonomous navigation can be achieved with accessible hardware. The rocker-bogie-inspired suspension enables operation on rough terrain under manual control, while autonomous mode handles structured indoor environments.`,
    tags: ['ROS', 'LiDAR', 'SLAM', 'Python', 'Arduino', 'SolidWorks', 'Path Planning'],
    gallery: [
      `${import.meta.env.BASE_URL}projects/ID2/rover.jpg`,
      `${import.meta.env.BASE_URL}projects/ID2/robot_ assembly.mp4`,
      `${import.meta.env.BASE_URL}projects/ID2/model 6.png`,
      `${import.meta.env.BASE_URL}projects/ID2/Mapping.png`,
      `${import.meta.env.BASE_URL}projects/ID2/Navigation.png`,
      `${import.meta.env.BASE_URL}projects/ID2/mapping Vid.mp4`,
      `${import.meta.env.BASE_URL}projects/ID2/Navigation Vid.mp4`,
    ],
    details: [
      'Six-wheeled rocker-bogie suspension for terrain adaptability',
      'Hector SLAM for real-time 2D mapping without odometry',
      'A* global path planning with DWA local obstacle avoidance',
      'Extended Kalman Filter fusing IMU and wheel odometry',
      'ROS-based distributed architecture with Arduino interface',
      '10 cm position accuracy, 15° orientation accuracy'
    ]
  },
  {
    id: '3',
    title: 'Rick and Roll - Sweep the Table Robot',
    description: 'Award-winning autonomous wheeled robot that clears objects from an arena using a rotating hammer mechanism.',
    longDescription: `Rick and Roll was built for the KDU Faculty of Engineering "Sweep the Table Robot Contest"—a competition where robots autonomously push objects off a rectangular arena, scored on both speed and clearance rate.

    The challenge required balancing aggressive object removal with controlled movement to avoid falling off the table itself. After experimenting with multiple pushing mechanisms, we settled on a rotating hammer design that could sweep objects efficiently while maintaining stability.

    The result: first place in the competition. The robot's success came from optimizing the hammer's rotation speed and timing to maximize sweep coverage while the differential drive system maintained precise table-edge awareness.`,
    tags: ['Arduino', 'Motor Control', 'Sensors', 'Competition', 'Mechatronics'],
    gallery: [
      `${import.meta.env.BASE_URL}projects/ID3/rick vid.mp4`,
      `${import.meta.env.BASE_URL}projects/ID3/rick robot.jpg`,
    ],
    details: [
      'Differential drive for precise maneuvering',
      'Rotating hammer mechanism for 360° object clearance',
      'IR and ultrasonic sensors for table-edge detection',
      'Arduino-based control with custom sweep algorithms',
      '1st Place - KDU Sweep the Table Competition'
    ]
  },
  {
    id: '4',
    title: 'Coronary Artery Disease Prediction Using ANN',
    description: 'A neural network model achieving ~90% accuracy in predicting coronary artery disease from clinical data.',
    longDescription: `Coronary Artery Disease (CAD) remains a leading cause of death worldwide, often developing silently until a critical event occurs. Early detection significantly improves outcomes, but traditional diagnostic methods can be invasive, expensive, or require specialized equipment not available in all clinical settings.

    This project develops an Artificial Neural Network that analyzes clinical data—demographics, medical history, and diagnostic test results—to predict CAD with approximately 90% accuracy. By identifying at-risk individuals earlier, healthcare providers can intervene sooner with lifestyle changes or treatment, potentially reducing mortality rates.

    The model was built with direct input from cardiologists, ensuring the features it analyzes are clinically meaningful rather than just statistically convenient. This collaboration between data science and medical expertise resulted in a tool that's both accurate and practical for real-world clinical settings.`,
    tags: ['Python', 'TensorFlow', 'Machine Learning', 'ANN', 'Healthcare', 'SMOTE'],
    gallery: [
      `${import.meta.env.BASE_URL}projects/ID4/CAD.png`,
      `${import.meta.env.BASE_URL}projects/ID4/ArchitectureCAD.png`,
      `${import.meta.env.BASE_URL}projects/ID4/SMOTE.png`,
      `${import.meta.env.BASE_URL}projects/ID4/Neural Network.png`,
      `${import.meta.env.BASE_URL}projects/ID4/confusion matrix.png`,
      `${import.meta.env.BASE_URL}projects/ID4/metrics.png`,
      `${import.meta.env.BASE_URL}projects/ID4/accuraccy plot.png`,
      `${import.meta.env.BASE_URL}projects/ID4/loss plot.png`,
    ],
    details: [
      'Four-layer ANN with ReLU and sigmoid activation functions',
      'SMOTE for handling imbalanced medical datasets',
      'Clinician-guided feature selection for clinical relevance',
      'Stratified k-fold cross-validation for robust evaluation',
      '89.66% validation accuracy, 87.32% F1 score',
      'Adam optimizer with early stopping to prevent overfitting'
    ]
  }
];

export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: 'p1',
    title: 'Design & Development of a Quadruped Robot for Inspection in Human-Inaccessible Structured Areas',
    abstract: 'A quadruped robot using a five-bar leg mechanism was developed for inspection in structured, inaccessible areas. Its optimized kinematics, stable locomotion, long-range ESP-NOW communication, and ROS2/MicroROS control architecture enable accurate, reliable, and modular operation on flat terrains.',
    image: `${import.meta.env.BASE_URL}research_papers/Quadruped_Robot.png`,
    link: '#',
    publisher: 'International Journal of Control, Automation, and System (ICROS KIEE)',
    date: 'In Progress',
    tags: ['Quadruped robot', 'Five-bar parallel mechanism', 'Trajectory optimization']
  },
  {
    id: 'p2',
    title: 'Prediction of Coronary Artery Disease Using Artificial Neural Network',
    abstract: 'An ANN for early CAD diagnosis achieved ~90% accuracy using SMOTE, expert-guided feature selection, optimized hyperparameters, and stratified k-fold validation. The model showed strong reliability and clinical relevance, outperforming conventional machine-learning methods',
    image: `${import.meta.env.BASE_URL}research_papers/CAD_Diagnosis.png`,
    link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=s9AT2TYAAAAJ&citation_for_view=s9AT2TYAAAAJ:9yKSN-GCB0IC',
    publisher: 'International Research Conference (KDU IRC)',
    date: '2024',
    tags: ['Neural Networks', 'Coranary Artery Disease', 'SMOTE']
  },
  {
    id: 'p3',
    title: 'Development of an automated clothesline system',
    abstract: 'An automated clothes-drying system integrates sensors and actuators to detect rain and darkness, automatically sheltering garments while offering manual and remote control. It reduces household inconvenience, protects clothes from weather, and demonstrates how smart technology streamlines everyday domestic tasks.',
    image: `${import.meta.env.BASE_URL}research_papers/Automated_Clothesline.png`,
    link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=s9AT2TYAAAAJ&citation_for_view=s9AT2TYAAAAJ:u5HHmVD_uO8C',
    publisher: 'International Research Conference (KDU IRC)',
    date: '2023',
    tags: ['Automation', 'Clothesline', 'Smart']
  }
];

export const SKILLS: SkillCategory[] = [
  {
    title: 'Mechanical Design',
    icon: 'PenTool',
    skills: [
      { name: 'SolidWorks', level: 90 },
      { name: 'Fusion 360', level: 75 },
      { name: 'ANSYS', level: 70 },
      { name: 'MATLAB/Simulink', level: 85 }
    ]
  },
  {
    title: 'PCB & Electronics',
    icon: 'Layers',
    skills: [
      { name: 'KiCAD', level: 90 },
      { name: 'EasyEDA', level: 75 },
      { name: 'Proteus', level: 80 },
      { name: 'LTSpice', level: 80 }
    ]
  },
  {
    title: 'Robotics',
    icon: 'Bot',
    skills: [
      { name: 'ROS2', level: 80 },
      { name: 'Gazebo Simulation', level: 85 },
      { name: 'Kinematic Modeling', level: 85 },
      { name: 'SLAM/Navigation', level: 80 }
    ]
  },
  {
    title: 'Programming & AI',
    icon: 'Code',
    skills: [
      { name: 'Python', level: 85 },
      { name: 'C++', level: 80 },
      { name: 'Machine Learning', level: 75 },
      { name: 'CNN/Computer Vision', level: 75 }
    ]
  },
  {
    title: 'PLC & Automation',
    icon: 'Cpu',
    skills: [
      { name: 'ISPSoft', level: 85 },
      { name: 'SIMATIC STEP7', level: 80 },
      { name: 'HMI Programming', level: 80 },
      { name: 'Nextion IDE', level: 75 }
    ]
  },
  {
    title: 'Rapid Prototyping',
    icon: 'Wrench',
    skills: [
      { name: '3D Printing', level: 90 },
      { name: 'Laser Cutting', level: 85 },
      { name: 'Electronics Assembly', level: 85 },
      { name: 'System Integration', level: 80 }
    ]
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    title: 'BSc (Hons) Mechatronics Engineering',
    year: '2021 - 2025',
    description: 'Graduated from General Sir John Kotelawela Defense University with First class : 3.91 CGPA. Awarded for the Best Academic Performance in Mechatronics Engineering',
    image: ''
  },
  {
    title: 'Intern | Autonomation Engineer',
    year: '2023 - 2024',
    description: 'Developed self driven sewing machines and designed autonomus pipeline systems at Autonomation Lab, MAS Capital (Pvt) Ltd, Ratmalana. ',
    image: ''
  },
  {
    title: 'STEM Tutor | Engineer',
    year: '2023 - 2024',
    description: 'Delivered robotics courses in schools,designed STEM kits and led workshops to engage students aged 5–20 in STEM concepts at 360Labs, Borelasgamuwa.',
    image: ''
  },
  {
    title: '3D Modeling & Printing | Freelancer',
    year: '2024 - 2025',
    description: 'Designed mechanical models and gave it life using my ENDER 3 PRO (FDM Printer) ',
    image: ''
  },
  {
    title: 'Product Development Engineer',
    year: '2025',
    description: 'Fabricated and Developed Mechanical systems to enhance process Efficiency and researched on new technologies to Develop Product at Innovation, MAS Capital (Pvt) Ltd, Biyagama ',
    image: ''
  },
  {
    title: 'Senior Robotics Engineer',
    year: '2025',
    description: 'Developed a four-wheel AI-driven robot, explore rover and drone concepts, and build a mic array with an audio-processing pipeline at Hype Insight (Pty) Ltd.',
    image: ''
  }
];

// =========================================
// 🧪 THOUGHT LAB DATA
// =========================================
/*
 * ====================================================================================
 * HOW TO ADD CONTENT TO YOUR ARTICLES:
 * ====================================================================================
 * 
 * Each article uses "contentBlocks" - an array of different block types.
 * Mix and match these blocks in any order to create your article:
 * 
 * ─────────────────────────────────────────────────────────────────────────────────────
 * 📝 TEXT BLOCK - Regular paragraph
 * ─────────────────────────────────────────────────────────────────────────────────────
 *    { type: 'text', content: 'Your paragraph text here. Can be multiple sentences.' }
 * 
 * ─────────────────────────────────────────────────────────────────────────────────────
 * 📌 HEADING BLOCK - Section titles
 * ─────────────────────────────────────────────────────────────────────────────────────
 *    { type: 'heading', content: 'My Section Title', level: 2 }   // Big heading
 *    { type: 'heading', content: 'Smaller Subsection', level: 3 } // Smaller heading
 * 
 * ─────────────────────────────────────────────────────────────────────────────────────
 * 🖼️ IMAGE BLOCK - Image with caption
 * ─────────────────────────────────────────────────────────────────────────────────────
 *    { 
 *      type: 'image', 
 *      src: '/thought-lab/my-robot.jpg',           // Path in public folder
 *      caption: 'My robot during initial testing',  // Optional caption below image
 *      alt: 'Robot on test bench'                   // Optional alt text
 *    }
 * 
 *    For external images:
 *    { type: 'image', src: 'https://example.com/image.jpg', caption: 'External image' }
 * 
 * ─────────────────────────────────────────────────────────────────────────────────────
 * 🎬 VIDEO BLOCK - Video with caption (YouTube or local)
 * ─────────────────────────────────────────────────────────────────────────────────────
 *    YouTube:
 *    { 
 *      type: 'video', 
 *      src: 'https://www.youtube.com/watch?v=VIDEO_ID', 
 *      caption: 'Demo of the walking gait' 
 *    }
 * 
 *    Local video (put in public folder):
 *    { 
 *      type: 'video', 
 *      src: '/thought-lab/demo.mp4', 
 *      caption: 'Testing in the lab' 
 *    }
 * 
 * ─────────────────────────────────────────────────────────────────────────────────────
 * 💬 QUOTE BLOCK - Highlighted quote
 * ─────────────────────────────────────────────────────────────────────────────────────
 *    { 
 *      type: 'quote', 
 *      content: 'The best way to predict the future is to invent it.', 
 *      author: 'Alan Kay'  // Optional
 *    }
 * 
 * ─────────────────────────────────────────────────────────────────────────────────────
 * 📋 LIST BLOCK - Bullet or numbered list
 * ─────────────────────────────────────────────────────────────────────────────────────
 *    Bullet list:
 *    { type: 'list', items: ['First point', 'Second point', 'Third point'] }
 * 
 *    Numbered list:
 *    { type: 'list', items: ['Step one', 'Step two', 'Step three'], ordered: true }
 * 
 * ─────────────────────────────────────────────────────────────────────────────────────
 * ➖ DIVIDER BLOCK - Horizontal line separator
 * ─────────────────────────────────────────────────────────────────────────────────────
 *    { type: 'divider' }
 * 
 * ─────────────────────────────────────────────────────────────────────────────────────
 * 💡 CALLOUT BLOCK - Highlighted info box
 * ─────────────────────────────────────────────────────────────────────────────────────
 *    { type: 'callout', content: 'Important note here!', variant: 'info' }
 *    { type: 'callout', content: 'Warning message', variant: 'warning' }
 *    { type: 'callout', content: 'Pro tip for readers', variant: 'tip' }
 * 
 * ====================================================================================
 * EXAMPLE ARTICLE WITH ALL BLOCK TYPES:
 * ====================================================================================
 * See the first article 'foundation-models' below for a complete example!
 */

export const THOUGHT_LAB_DATA: ThoughtLabData = {
  pageTitle: 'THOUGHT LAB',
  pageSubtitle: '// PERSPECTIVES & PROJECTS ON ROBOTICS, AI & INTELLIGENT SYSTEMS',
  introduction: `This is my personal space for thinking out loud and building things at the intersection of robotics and AI. It's split into two halves: written perspectives on emerging technologies, practical challenges, and the questions that come up while building intelligent systems, and hands-on projects where I use AI as a collaborator to build real, working tools. None of this is formal — it's candid reflections and working software from someone in the trenches.`,
  ctaTitle: 'THOUGHT LAB',
  ctaSubtitle: 'Explore my perspectives and AI-built projects',
  articles: [
    // =====================================================================
    // Lazy Coulomb Planner - physics-inspired path planner (JS + ROS2 Nav2)
    // =====================================================================
    {
      id: 'lazy-coulomb-planner',
      title: 'Lazy Coulomb Planner',
      subtitle: 'Core ideology and mathematical foundation of a physics-inspired path planner',
      icon: 'Cpu',
      category: 'perspective',
      coverImage: `${import.meta.env.BASE_URL}thought_lab/lcp/Coverpage.jpeg`,
      introduction: "The Lazy Coulomb Planner (LCP) treats navigation as a correction problem, not a search problem: start with a straight line from start to goal, and apply localized, physics-inspired corrections only where the path actually collides with an obstacle. Borrowing the inverse-square repulsion of Coulomb's Law from electrostatics, LCP aims for fast, interpretable path planning in open environments — implemented both as a JavaScript visualization and as a full ROS 2 Nav2 global planner plugin.",
      tags: ['Path Planning', 'Physics-Inspired Robotics', 'ROS2 Nav2', 'Autonomous Navigation'],
      status: 'published',
      publishedDate: 'August 2026',
      readTime: '15 min read',
      contentBlocks: [
        { type: 'heading', content: 'External References', level: 2 },

        { type: 'heading', content: 'Stage 1 — JavaScript Visualization', level: 3 },
        {
          type: 'list',
          items: [
            'GitHub: https://github.com/KD-27/Lazy-Coulomb-Planner/tree/main',
            'LinkedIn Post: https://www.linkedin.com/feed/update/urn:li:activity:7403726788021116928/'
          ]
        },
        { type: 'heading', content: 'Demonstration', level: 4 },
        { type: 'video', src: `${import.meta.env.BASE_URL}thought_lab/lcp/LCP_Vid4.mp4`, caption: 'LCP Stage 1 demo' },
        { type: 'video', src: `${import.meta.env.BASE_URL}thought_lab/lcp/LCP_Vid1.mp4`, caption: 'LCP Stage 1 demo' },
        { type: 'video', src: `${import.meta.env.BASE_URL}thought_lab/lcp/LCP_Vid2.mp4`, caption: 'LCP Stage 1 demo' },
        { type: 'video', src: `${import.meta.env.BASE_URL}thought_lab/lcp/LCP_Vid3.mp4`, caption: 'LCP Stage 1 demo' },

        { type: 'heading', content: 'Stage 2 — Nav2 Global Planner Plugin (ROS 2 Humble)', level: 3 },
        {
          type: 'list',
          items: [
            'GitHub: https://github.com/KD-27/Lazy-Coulomb-Planner/tree/humble',
            'LinkedIn Post: https://www.linkedin.com/feed/update/urn:li:activity:7442531996205109250/'
          ]
        },
        { type: 'heading', content: 'Demonstration', level: 4 },
        { type: 'video', src: `${import.meta.env.BASE_URL}thought_lab/lcp/LCP_Vid5.mp4`, caption: 'LCP Stage 2 — Nav2 global planner plugin demo' },

        { type: 'divider' },

        { type: 'heading', content: 'The Core Idea', level: 2 },
        { type: 'quote', content: 'Assume the simplest path is valid — and only react when reality proves otherwise.' },
        { type: 'text', content: "Most planners approach navigation as a search problem. They explore the environment, weigh costs across a grid or graph, and produce an optimal path before the robot moves a single meter. The Lazy Coulomb Planner (LCP) rejects this premise entirely." },
        { type: 'text', content: 'LCP treats navigation as a correction problem:' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Start with the most optimistic assumption possible — a straight line from start to goal.',
            'Do nothing until that assumption is proven wrong by a real collision.',
            'When a failure is found, apply a localized, physics-inspired correction — and only at that failure point.',
            'Repeat until no failures remain.'
          ]
        },
        { type: 'text', content: "This is not laziness as a shortcut. It is laziness as a design principle: spend zero computation on paths that might never be needed, and spend targeted computation only where the environment demands it. The result is a planner that is fast in open environments, highly interpretable, and whose behavior you can trace step by step without inspecting a heatmap." },

        { type: 'heading', content: "Physical Foundation — Coulomb's Law", level: 2 },
        { type: 'text', content: "The correction mechanism is borrowed from electrostatics. Coulomb's Law describes the force between two point charges:" },
        { type: 'equation', content: 'F = k · q₁q₂ / r²' },
        {
          type: 'list',
          items: [
            'F = force magnitude',
            "k = Coulomb's constant",
            'q₁, q₂ = charge magnitudes',
            'r = distance between charges'
          ]
        },
        { type: 'text', content: 'The critical insight is the r² denominator: force grows explosively as distance shrinks. An obstacle that is far away barely matters. An obstacle you are about to enter matters enormously. This is exactly the behavior you want from a repulsion mechanism in path planning.' },

        { type: 'heading', content: 'Mapping to Path Planning', level: 3 },
        {
          type: 'list',
          items: [
            'Obstacle → Negative point charge (repeller)',
            'Blocked waypoint → Positive test particle (repelled)',
            'r → Distance from waypoint to obstacle boundary',
            'F → Displacement force applied to push waypoint clear'
          ]
        },
        { type: 'text', content: 'LCP does not compute the full Coulomb sum over every obstacle in the environment. It applies the principle — nearby obstacles exert strong repulsion — at precisely the point where a path segment has entered collision.' },

        { type: 'divider' },

        { type: 'heading', content: 'Complete Mathematical Foundation', level: 2 },

        { type: 'heading', content: '1. Path Representation', level: 3 },
        { type: 'text', content: 'A path is a finite ordered sequence of 2D points:' },
        { type: 'equation', content: 'P = {p₀, p₁, …, pₙ},  pᵢ ∈ ℝ²' },
        { type: 'text', content: 'At initialization, LCP sets:' },
        { type: 'equation', content: 'P₀ = {Start, Goal}' },
        { type: 'text', content: 'This is the laziest possible path — a single straight segment. All subsequent computation is about inserting and correcting intermediate points.' },

        { type: 'heading', content: '2. Segment Parameterization', level: 3 },
        { type: 'text', content: 'Any segment between two consecutive path points pᵢ and pᵢ₊₁ can be written as:' },
        { type: 'equation', content: 'p(t) = pᵢ + t·(pᵢ₊₁ − pᵢ),  t ∈ [0, 1]' },
        { type: 'text', content: 'This parameterization is used for two purposes:' },
        {
          type: 'list',
          items: [
            'Collision detection: sample p(t) at N values of t and test each sample against the costmap.',
            'Intersection finding: the first t at which p(t) enters an obstacle gives the insertion point for a new waypoint.'
          ]
        },
        { type: 'text', content: 'In the Nav2 implementation, the number of samples per segment is:' },
        { type: 'equation', content: 'N = max( segment_check_steps, ⌈‖pᵢ₊₁ − pᵢ‖ / Δmap⌉ )' },
        { type: 'text', content: 'where Δmap is the cost map resolution. This ensures no obstacle cell is skipped regardless of segment length.' },

        { type: 'heading', content: '3. Collision Condition', level: 3 },
        { type: 'text', content: 'A point (x, y) is considered in collision if its costmap cost C(x,y) meets or exceeds the lethal threshold:' },
        { type: 'equation', content: 'C(x, y) ≥ C_lethal' },
        { type: 'text', content: 'For circle-shaped obstacles (used in the JS visualisation), the geometric equivalent is:' },
        { type: 'equation', content: '√((x − cₓ)² + (y − c_y)²) ≤ r_obs + ρ' },
        { type: 'text', content: 'where ρ is an inflation radius added to guarantee a safety margin around the obstacle boundary. In the Nav2 plugin, this inflation is handled by the costmap’s own inflation layer — LCP reads the already-inflated cost directly.' },

        { type: 'heading', content: '4. The Directional Constraint — Key Innovation', level: 3 },
        { type: 'text', content: 'This is where LCP diverges most sharply from classical potential field planners.' },
        { type: 'text', content: 'In a standard potential field, the repulsion force on a point has arbitrary direction — it pushes away from whatever obstacles are nearby, which can pull the path in unpredictable directions or trap it in local minima.' },
        { type: 'text', content: 'LCP constrains all corrections to be perpendicular to the current path direction. This single constraint is what keeps detours minimal and behaviour interpretable.' },
        { type: 'text', content: 'Given the two locked neighbours of the blocked waypoint p_new:' },
        { type: 'equation', content: 'd = (p_next_locked − p_prev_locked) / ‖p_next_locked − p_prev_locked‖' },
        { type: 'text', content: 'The two perpendicular directions are:' },
        { type: 'equation', content: 'd_left = (−d_y, d_x)' },
        { type: 'equation', content: 'd_right = (d_y, −d_x)' },
        { type: 'text', content: 'The algorithm then probes outward in both directions (at cost map resolution steps) to find which side reaches free space first:' },
        { type: 'equation', content: 'd_left_clear = min{ d | C(p_new + d·d_left) < C_lethal }' },
        { type: 'equation', content: 'd_right_clear = min{ d | C(p_new + d·d_right) < C_lethal }' },
        { type: 'text', content: 'The push direction is chosen as whichever side reaches free space with the shorter distance: F_push = d_left if d_left_clear ≤ d_right_clear, otherwise d_right.' },
        { type: 'text', content: 'This means LCP always takes the shortest detour perpendicular to its heading — the detouring geometry is locally optimal even when the global path is not.' },

        { type: 'heading', content: '5. The Discrete Motion Update', level: 3 },
        { type: 'text', content: 'Once the push direction is determined, the blocked waypoint is iteratively displaced:' },
        { type: 'equation', content: 'p_new^(k+1) = p_new^(k) + α · F̂_push' },
        { type: 'text', content: 'Where:' },
        {
          type: 'list',
          items: [
            'α = step_size (metres per iteration)',
            'F̂_push = unit vector in the push direction'
          ]
        },
        { type: 'text', content: 'This repeats until C(p_new) < C_lethal or max_push_iterations is exhausted.' },
        { type: 'text', content: 'The normalisation to a unit vector is important: it makes the displacement per iteration constant regardless of how many obstacles are nearby, giving predictable convergence behaviour.' },

        { type: 'heading', content: '6. Force Balance Fallback', level: 3 },
        { type: 'text', content: 'In rare cases — typically when the waypoint is centred symmetrically inside a narrow passage — both d_left_clear and d_right_clear may be equal, or the net force magnitude falls below the threshold ε:' },
        { type: 'equation', content: '|F_push| < ε_balance' },
        { type: 'text', content: 'When this happens, LCP applies a deterministic perturbation: it always pushes perpendicular-left by perturbation_strength. This breaks the symmetry without randomness, preserving deterministic behaviour across repeated plan requests.' },

        { type: 'heading', content: '7. The Lock Mechanism', level: 3 },
        { type: 'text', content: 'Once a waypoint has been pushed clear, it is locked. Locked points are never moved again. This is critical to correctness: without locking, a later correction could re-enter a point into an obstacle that a previous correction had already avoided.' },
        { type: 'text', content: 'The path at any moment consists entirely of locked points. The algorithm terminates when a full scan of all segments finds no collision — meaning every locked point has been verified clear and every segment between them has been sampled.' },

        { type: 'heading', content: '8. Chaikin Smoothing (Optional Post-Process)', level: 3 },
        { type: 'text', content: "After the main loop, LCP can apply Chaikin's corner-cutting algorithm to smooth the piecewise-linear path into a curve. Given a sequence of control points, each pass generates two new points per segment:" },
        { type: 'equation', content: 'qᵢ = (3/4)pᵢ + (1/4)pᵢ₊₁' },
        { type: 'equation', content: 'rᵢ = (1/4)pᵢ + (3/4)pᵢ₊₁' },
        { type: 'text', content: 'After n passes, the path converges toward a quadratic B-spline approximation of the control polygon. Crucially, start and goal points are pinned — they are never moved by Chaikin — so the path always begins and ends exactly at the requested poses.' },
        { type: 'callout', variant: 'warning', content: 'Chaikin does not re-validate the smoothed path against the costmap. If the path is very close to obstacle boundaries, smoothing can potentially re-introduce small violations. In tight environments, this is worth checking, and it is one area flagged for future work.' },

        { type: 'divider' },

        { type: 'heading', content: 'Full Algorithm Loop (Conceptual)', level: 2 },
        {
          type: 'list',
          ordered: true,
          items: [
            'P ← {Start, Goal} — the laziest possible initialisation. lock(Start), lock(Goal).',
            'While iterations < max_iterations: find the first segment in P that intersects an obstacle. If none exists, the path is solved — break.',
            'p_new ← entry point of the collision on that segment; insert p_new into P right after the segment’s start.',
            'While p_new is inside the obstacle and push_iters < max_push_iters: determine the push direction from p_new’s locked neighbours, then p_new ← p_new + α·d, push_iters++.',
            'lock(p_new) — it will never move again. Remove all unlocked intermediates, keeping only locked points.',
            'If enable_smoothing, apply Chaikin smoothing to P.',
            'Return P.'
          ]
        },
        { type: 'text', content: 'The scan always restarts from the beginning of the path after each fix. This is by design: a correction at segment i can change the geometry in a way that affects segments i−1 or earlier.' },

        { type: 'divider' },

        { type: 'heading', content: 'LCP vs. Traditional Planners', level: 2 },
        {
          type: 'list',
          items: [
            'Search space — LCP: path segments only · A*/Dijkstra: full grid · Potential Fields: full grid',
            'Computation on empty paths — LCP: minimal · A*/Dijkstra: full grid expansion · Potential Fields: full field computation',
            'Local minima — LCP: not susceptible (perpendicular push) · A*/Dijkstra: not susceptible · Potential Fields: susceptible',
            'Path interpretability — LCP: very high · A*/Dijkstra: moderate · Potential Fields: low',
            'Narrow corridors — LCP: struggles · A*/Dijkstra: handles well · Potential Fields: struggles',
            'Dynamic replanning speed — LCP: fast (short paths re-plan quickly) · A*/Dijkstra: slow (re-expands grid) · Potential Fields: moderate',
            'Optimality — LCP: not globally optimal · A*/Dijkstra: globally optimal (with admissible heuristic) · Potential Fields: not optimal',
            'Determinism — LCP: full (no randomness) · A*/Dijkstra: full · Potential Fields: full'
          ]
        },
        { type: 'text', content: "LCP occupies a distinct niche: it is not trying to compete with A* on optimality. It trades global optimality for speed, interpretability, and computational locality. In open environments with scattered obstacles — which describes most outdoor robotics and warehouse navigation scenarios — LCP's straight-line-first assumption is correct most of the time, and corrections are cheap." },

        { type: 'divider' },

        { type: 'heading', content: 'Design Philosophy — Why "Lazy" is the Right Word', level: 2 },
        { type: 'text', content: 'The name is not just a quip. There is a formal sense in which LCP embodies lazy evaluation from functional programming: computation is deferred until the result is demanded. A* eagerly evaluates the entire search space to find the optimal path. LCP evaluates nothing until a segment actually fails.' },
        { type: 'text', content: "This has a useful property: if the environment is mostly open, LCP solves in very few iterations, potentially just one or two corrections. A* would still need to expand its full grid. In those cases, LCP's solution quality is essentially indistinguishable from optimal (a straight line with small detours), achieved at a fraction of the cost." },
        { type: 'text', content: 'The flip side is honest: when the environment is dense, LCP may struggle to find corrections that work, and A* or Smac should be used. LCP is designed to know its own limits, which is why the Nav2 plugin documents its failure modes explicitly and recommends fallback strategies.' },
        { type: 'quote', content: 'Why plan ahead when physics can push you around?', author: 'Kaveesha Dhananjaya' },

        { type: 'divider' },

        { type: 'heading', content: 'Known Limitations & Future Work', level: 2 },
        { type: 'heading', content: 'Current Limitations', level: 3 },
        {
          type: 'list',
          items: [
            'Narrow corridors: the perpendicular-push approach works best when there is open space on at least one side. In tight passages where both sides have obstacles at similar distances, the algorithm can fail to clear the point within max_push_iterations.',
            'Chaikin re-validation: smoothing is applied as a post-process and does not re-check the cost map. Near obstacle boundaries, smoothed paths may clip.',
            'No path shortcutting: LCP only adds points; it never re-evaluates whether existing locked points could be removed if later corrections make them redundant. This can lead to slightly longer paths than necessary.'
          ]
        },
        { type: 'heading', content: 'Planned Improvements', level: 3 },
        {
          type: 'list',
          items: [
            'Hybrid fallback: detect narrow-corridor failure and switch to A* / Smac for that segment',
            'Adaptive force scaling: increase α when far from free space, reduce it as the boundary approaches (analogous to variable step size in ODE solvers)',
            'Dynamic obstacle support: re-flag locked points as unlocked when the underlying cost map changes',
            'Post-lock shortcutting: after full solution, attempt to remove redundant locked points by checking if their neighboring segments are obstacle-free',
            'Smoothing re-validation: run a lightweight cost map check on the Chaikin-smoothed path and revert locally if violations are introduced'
          ]
        }
      ]
    },

    // =====================================================================
    // Monthly Plan - self-help gamified daily discipline tracker
    // =====================================================================
    {
      id: 'monthly-plan',
      title: 'Monthly Plan',
      subtitle: 'A self-help gamified daily discipline tracker, modeled on the "System" from Solo Leveling',
      icon: 'Trophy',
      category: 'project',
      coverImage: `${import.meta.env.BASE_URL}thought_lab/Monthly%20plan/Calender-view.png`,
      introduction: "Monthly Plan is a private, single-page daily discipline tracker built for exactly one user: me. Every day is a quest with assigned tasks, the day locks in at midnight, and failing a task costs points instead of just earning none. It's not a neutral habit checklist — the penalty is the point. It was designed and built end-to-end through iterative collaboration with Claude, from the scoring engine's math to the local server architecture.",
      tags: ['Gamification', 'Self-Improvement', 'Habit Tracking', 'Claude', 'Local-First'],
      status: 'published',
      publishedDate: 'August 2026',
      readTime: '6 min read',
      contentBlocks: [
        { type: 'heading', content: 'Why It Exists', level: 2 },
        { type: 'text', content: "Monthly Plan exists to keep one person honest about a daily routine — diet, gym, water, sleep, spending, and weight — by scoring each day out of 100 and turning the run into a visible rank and set of titles. It was built after the previous version's log was silently wiped by Chrome clearing local storage, so the whole architecture is designed around one hard rule: opening the app must never require a manual step, or the log goes cold and the habit dies with it." },

        { type: 'heading', content: 'How It Runs', level: 3 },
        {
          type: 'list',
          items: [
            'A launcher script starts a tiny stdlib-only Python server on localhost and opens the app in its own dedicated Chrome app-window profile, isolated from normal browsing so clearing browser data can never touch it again.',
            'A JSON file next to the app is the single source of truth — written atomically (temp file + replace) with a rolling backup copy. The server shuts itself down once the window closes.',
            "If Python isn't available, the app falls back to a plain file:// page backed by localStorage, so it still works, just without durable file storage."
          ]
        },

        { type: 'image', src: `${import.meta.env.BASE_URL}thought_lab/Monthly%20plan/Calender-view.png`, caption: 'Calendar view — a full month grid, each day colored by score band' },

        { type: 'heading', content: 'Core Features', level: 2 },
        {
          type: 'list',
          items: [
            'Calendar view — full month grid colored by score band (Good / Moderate / Bad / in progress), with a running month summary.',
            'Day sheet — tap any day to check off ~15 weighted tasks grouped into All day / Morning / Afternoon / Evening / Night, with a live 0–100 score bar.',
            'Analytics view — weekly score trend, gym attendance table, spending chart against a daily budget line, and weight progress toward target.',
            'Gym / rest day toggle — the morning task set reshapes itself depending on the day type, while both variants still sum to 100.',
            'CSV sync — the log can be linked directly to a .csv file on disk (e.g. inside a synced Drive folder) via the File System Access API.'
          ]
        },

        { type: 'image', src: `${import.meta.env.BASE_URL}thought_lab/Monthly%20plan/day-sheet.png`, caption: 'Day sheet — tasks grouped by time of day, with a live score bar' },

        { type: 'divider' },

        { type: 'heading', content: 'The Design Signature: Penalty-Based Scoring', level: 2 },
        { type: 'quote', content: "An unchecked task actively subtracts its weight rather than simply not adding — it mirrors a game system's daily quest penalty, not a forgiving habit tracker." },
        { type: 'text', content: 'The score runs −100 to +100, not 0–100. Two tasks (10 AM and 3 PM plain tea) are flagged as bonus: they add points if done but cost nothing if skipped — the one intentional exception to the penalty model. Missing the weekly 4-session gym target docks that week\'s average by a flat 5 points, without touching or repainting any individual day\'s score.' },

        { type: 'heading', content: 'Dual Rank System', level: 3 },
        { type: 'text', content: "Rank (E → D → C → B → A → S) is a rolling 7-day average that can rise or fall, with a 3-day confirmation before promotion and a 3-day grace period before demotion, so one great or one bad day can't whipsaw the rank. Rank history is never stored — it's replayed live from the score log, so editing a past day retroactively and correctly rewrites the whole rank timeline." },
        { type: 'text', content: "Weekly body-weight and daily spending are deliberately kept outside the 100-point score — logged, charted, and totaled, but never penalized. Each instead earns its own title track as it improves, a boundary that reflects that biology and money don't answer to willpower the way a checklist does." },

        { type: 'image', src: `${import.meta.env.BASE_URL}thought_lab/Monthly%20plan/rank-titles.png`, caption: 'Rank and title progression' },

        { type: 'heading', content: 'Analytics', level: 3 },
        { type: 'image', src: `${import.meta.env.BASE_URL}thought_lab/Monthly%20plan/analytics-weekly.png`, caption: 'Weekly score trend and gym attendance' },
        { type: 'image', src: `${import.meta.env.BASE_URL}thought_lab/Monthly%20plan/analytics-spending.png`, caption: 'Spending tracked against a daily budget line' },
        { type: 'image', src: `${import.meta.env.BASE_URL}thought_lab/Monthly%20plan/analytics-weight.png`, caption: 'Weight progress toward target' },

        { type: 'divider' },

        { type: 'heading', content: 'Data & Backups', level: 2 },
        {
          type: 'list',
          items: [
            'The live log is the single source of truth for everything — no derived state (rank, streaks, titles) is stored anywhere, it\'s all recomputed on load.',
            'An automatic previous-copy backup is refreshed on every save.',
            'A damaged file is quarantined to its own timestamped file rather than silently discarded, and the app starts fresh instead of crashing.',
            'A linked CSV copy (optional, e.g. on Google Drive) serves as a portable, human-readable spare.'
          ]
        },

        { type: 'callout', content: 'Visiting with ?demo=1 loads sample data from a completely separate storage key — the real log is never read or written while demoing.', variant: 'tip' }
      ]
    }
  ]
};