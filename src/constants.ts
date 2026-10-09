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
  scholar: 'https://scholar.google.com/citations?user=s9AT2TYAAAAJ',
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
    id: 'p4',
    title: 'FusionGrasp: A Modular Framework for Integrating Heterogeneous 6D Grasp Planners for Multimodal Cluttered Sorting',
    abstract: 'FusionGrasp integrates independently trained 6D grasp planners for multimodal cluttered waste sorting without retraining or labelled grasp outcomes. A quantile-based confidence harmonisation layer makes their scores comparable, and real-world UR10 experiments achieved a 74.53% grasp success rate, exceeding both single-modality baselines.',
    image: `${import.meta.env.BASE_URL}research_papers/FusionGrasp_paper.png`,
    link: '#',
    publisher: 'Australasian Conference on Robotics and Automation (ACRA)',
    venue: 'ACRA',
    date: 'Under Review',
    tags: ['Multimodal Grasping', '6D Grasp Planning', 'Waste Sorting']
  },
  {
    id: 'p1',
    title: 'Design & Development of a Quadruped Robot for Inspection in Human-Inaccessible Structured Areas',
    abstract: 'A quadruped robot using a five-bar leg mechanism was developed for inspection in structured, inaccessible areas. Its optimized kinematics, stable locomotion, long-range ESP-NOW communication, and ROS2/MicroROS control architecture enable accurate, reliable, and modular operation on flat terrains.',
    image: `${import.meta.env.BASE_URL}research_papers/Quadruped_Robot.png`,
    link: '#',
    publisher: 'International Journal of Control, Automation, and System (ICROS KIEE)',
    venue: 'IJCAS',
    date: 'Under Review',
    tags: ['Quadruped robot', 'Five-bar parallel mechanism', 'Trajectory optimization']
  },
  {
    id: 'p2',
    title: 'Prediction of Coronary Artery Disease Using Artificial Neural Network',
    abstract: 'An ANN for early CAD diagnosis achieved ~90% accuracy using SMOTE, expert-guided feature selection, optimized hyperparameters, and stratified k-fold validation. The model showed strong reliability and clinical relevance, outperforming conventional machine-learning methods',
    image: `${import.meta.env.BASE_URL}research_papers/CAD_Diagnosis.png`,
    link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=s9AT2TYAAAAJ&citation_for_view=s9AT2TYAAAAJ:9yKSN-GCB0IC',
    publisher: 'International Research Conference (KDU IRC)',
    venue: 'KDU IRC',
    date: '2024',
    tags: ['Neural Networks', 'Coronary Artery Disease', 'SMOTE']
  },
  {
    id: 'p3',
    title: 'Development of an automated clothesline system',
    abstract: 'An automated clothes-drying system integrates sensors and actuators to detect rain and darkness, automatically sheltering garments while offering manual and remote control. It reduces household inconvenience, protects clothes from weather, and demonstrates how smart technology streamlines everyday domestic tasks.',
    image: `${import.meta.env.BASE_URL}research_papers/Automated_Clothesline.png`,
    link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=s9AT2TYAAAAJ&citation_for_view=s9AT2TYAAAAJ:u5HHmVD_uO8C',
    publisher: 'International Research Conference (KDU IRC)',
    venue: 'KDU IRC',
    date: '2023',
    tags: ['Automation', 'Clothesline', 'Smart']
  }
];

export const SKILLS: SkillCategory[] = [
  {
    title: 'Mechanical Design',
    usedIn: ['Elissa 1.0 quadruped', 'Mars rover'],
    icon: 'PenTool',
    skills: ['SolidWorks', 'Fusion 360', 'ANSYS', 'MATLAB/Simulink']
  },
  {
    title: 'PCB & Electronics',
    icon: 'Layers',
    skills: ['KiCAD', 'EasyEDA', 'Proteus', 'LTSpice']
  },
  {
    title: 'Robotics',
    usedIn: ['Elissa 1.0 quadruped', 'Mars rover'],
    icon: 'Bot',
    skills: ['ROS2', 'Gazebo Simulation', 'Kinematic Modeling', 'SLAM/Navigation']
  },
  {
    title: 'Programming & AI',
    usedIn: ['CAD prediction ANN', 'Mars rover'],
    icon: 'Code',
    skills: ['Python', 'C++', 'Machine Learning', 'CNN/Computer Vision']
  },
  {
    title: 'PLC & Automation',
    icon: 'Cpu',
    skills: ['ISPSoft', 'SIMATIC STEP7', 'HMI Programming', 'Nextion IDE']
  },
  {
    title: 'Rapid Prototyping',
    icon: 'Wrench',
    skills: ['3D Printing', 'Laser Cutting', 'Electronics Assembly', 'System Integration']
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
      subtitle: 'A gamified daily discipline tracker, modeled on the "System" from Solo Leveling',
      icon: 'Trophy',
      category: 'project',
      coverImage: `${import.meta.env.BASE_URL}thought_lab/Monthly%20plan/calendar.png`,
      introduction: "Monthly Plan is a single-page, offline daily discipline tracker built for exactly one user: me. Every day is a quest with assigned tasks, the day locks in at midnight, and failing a task costs points instead of just earning none. It's not a neutral habit checklist — the penalty is the point. It started in August 2026 as a calendar and a score, and daily use grew it into a journal, a finances drawer, deadlines, mind maps, a focus timer, a dark theme and a phone app that stays in sync with the laptop. It was designed and built end-to-end through iterative collaboration with Claude.",
      tags: ['Gamification', 'Self-Improvement', 'Habit Tracking', 'Claude', 'Local-First', 'Firebase', 'PWA'],
      status: 'published',
      publishedDate: 'October 2026',
      readTime: '8 min read',
      contentBlocks: [
        { type: 'heading', content: 'Why It Exists', level: 2 },
        { type: 'text', content: "Monthly Plan exists to keep one person honest about a daily routine — diet, gym, water, sleep, spending, and weight — by scoring each day and turning the run into a visible rank, level, and set of titles. It was built after the previous version's log was silently wiped by Chrome clearing local storage, so the whole architecture is designed around one hard rule: opening the app must never require a manual step, or the log goes cold and the habit dies with it." },

        { type: 'image', src: `${import.meta.env.BASE_URL}thought_lab/Monthly%20plan/calendar.png`, caption: 'The main screen — sticky notes on the left, the month colored by score in the middle, deadlines and mind maps on the right, with the flip clock and Focus tile below' },

        { type: 'heading', content: 'How It Runs', level: 3 },
        {
          type: 'list',
          items: [
            'A launcher script starts a tiny stdlib-only Python server on localhost and opens the app full screen in its own dedicated Chrome app-window profile, isolated from normal browsing so clearing browser data can never touch it again.',
            'The laptop keeps the log in a JSON file, written atomically (temp file + replace) with a rolling backup copy. The server shuts itself down about 90 seconds after the window closes.',
            'Signed in with Google, every key of the log is also its own Firestore document. A change on one device reaches the other in a second or two, keys merge one by one, and the latest change to a day wins.',
            "If Python isn't available, the app falls back to a plain file:// page backed by localStorage, so it still works, just without durable file storage."
          ]
        },

        { type: 'divider' },

        { type: 'heading', content: 'The Day Sheet', level: 2 },
        { type: 'text', content: "Tapping any day opens its sheet: tasks grouped into All day / Morning / Afternoon / Evening / Night, with a live score bar against that day's maximum. Water is entered in millilitres and scored on a curve toward a 3.0 L target (bottle icons fill at 1 L each), and sleep is scored on a curve that gives full points inside 6–8 hours and falls off outside it. Ticking \"Went to gym\" swaps the morning tasks to their gym-day variants." },
        { type: 'image', src: `${import.meta.env.BASE_URL}thought_lab/Monthly%20plan/day-sheet.png`, caption: 'Day sheet — every unticked task shows the points it will cost' },

        { type: 'heading', content: 'The Design Signature: Penalty-Based Scoring', level: 2 },
        { type: 'quote', content: "An unchecked task actively subtracts its weight rather than simply not adding — it mirrors a game system's daily quest penalty, not a forgiving habit tracker." },
        { type: 'text', content: "With the built-in tasks a day runs from −77 to +77, and gym days and rest days cap at the same total. Days land in three zones: Good (60+), Moderate (20–59) and Bad (below 20). Missing the weekly 4-session gym target docks that week's average by a flat 5 points, without touching or repainting any individual day's score." },
        { type: 'text', content: "A task added mid-run carries a start date. On days before it, it shows faded and doesn't count, so adding a task never rewrites past scores." },

        { type: 'heading', content: 'Rank and Level', level: 3 },
        { type: 'text', content: "Rank (E → D → C → B → A → S) is a rolling 7-day average that can rise or fall, with a 3-day confirmation before promotion and a 3-day grace period before demotion, so one great or one bad day can't whipsaw it. The top two ranks are gated: A needs full hygiene on 5 of the 7 days, and S needs all 7 plus last week's gym quota." },
        { type: 'text', content: "Level is the permanent record and never falls. XP is the sum of positive day scores, so a bad day earns nothing but takes nothing back. Nothing derived is stored anywhere — rank, level and titles are recomputed from the log on every load, so editing a past day correctly rewrites everything downstream." },
        { type: 'image', src: `${import.meta.env.BASE_URL}thought_lab/Monthly%20plan/rank.png`, caption: 'Rank & Level drawer — the ladder, the gates on A and S, and how the rank has moved' },

        { type: 'heading', content: 'Titles Instead of Points', level: 3 },
        { type: 'text', content: "Weekly body-weight and daily spending are deliberately kept outside the score — logged, charted and totaled, but never penalized, because biology and money don't answer to willpower the way a checklist does. Each earns a title instead: weight climbs Unforged → Kindled → Tempered → Ironclad → Ascendant, and spending climbs Spendthrift → Steward → Warden → Ironpurse → Vaultkeeper." },

        { type: 'divider' },

        { type: 'heading', content: 'Analytics', level: 2 },
        { type: 'text', content: 'The Analytics view shows the stat tiles, the rank history, a daily score chart shaded by zone, the weekly average with the gym-quota table, a per-task breakdown of where the points actually go, weight progress toward the target, and hydration month by month.' },
        { type: 'image', src: `${import.meta.env.BASE_URL}thought_lab/Monthly%20plan/analytics-overview.png`, caption: 'Stat tiles, rank history and the daily score chart' },
        { type: 'image', src: `${import.meta.env.BASE_URL}thought_lab/Monthly%20plan/analytics-weekly.png`, caption: 'Weekly average — weeks under the gym quota lose 5 points' },
        { type: 'image', src: `${import.meta.env.BASE_URL}thought_lab/Monthly%20plan/analytics-weight.png`, caption: 'Where the points go, and weight progress toward the target' },
        { type: 'image', src: `${import.meta.env.BASE_URL}thought_lab/Monthly%20plan/hydration.png`, caption: 'Hydration — each month against the 3.0 L target' },

        { type: 'divider' },

        { type: 'heading', content: 'Everything Around the Score', level: 2 },
        { type: 'text', content: 'Daily use kept asking for more than a checklist. Each of these lives completely outside the score:' },
        {
          type: 'list',
          items: [
            'Journal — a spiral notepad that slides in from the right, one page per day with 14 ruled lines and a strip summarising the day. Pages curl as you turn them.',
            'Finances drawer — dated income, the credit card bill, a "Where it went" split, daily spending against the budget line, and a standing list of fixed deposits.',
            'Deadlines — a yellow rail of dated to-dos, soonest first, with "In N days" / "Due today" / "N days overdue". Nothing is ever deleted; completing or cancelling only changes the status.',
            'Mind maps — linked to a deadline, with tapered branches, tick circles that fade finished branches toward the centre, folding, drag-to-move, undo/redo and spring animation.',
            'Sticky notes — a light-orange rail of free-form notes with basic formatting, five colours and drag-to-reorder.',
            'Flip clock and Focus — a 24-hour flip clock that grows to full screen, and a Forest-style focus timer where every session grows a different generated tree.'
          ]
        },
        { type: 'image', src: `${import.meta.env.BASE_URL}thought_lab/Monthly%20plan/journal.png`, caption: 'Journal — one page per day, saved as you type' },
        { type: 'image', src: `${import.meta.env.BASE_URL}thought_lab/Monthly%20plan/finances.png`, caption: 'Finances drawer — money stays apart from the daily score' },
        { type: 'image', src: `${import.meta.env.BASE_URL}thought_lab/Monthly%20plan/mind-map.png`, caption: 'Mind map linked to a deadline — finished branches fade toward the centre' },
        { type: 'image', src: `${import.meta.env.BASE_URL}thought_lab/Monthly%20plan/focus.png`, caption: 'Focus — drag the ring to set 10–120 minutes, then plant' },

        { type: 'divider' },

        { type: 'heading', content: 'Phone, Sync and Dark Mode', level: 2 },
        { type: 'text', content: 'Under 640 px wide the app turns into pages picked from a bar at the bottom: Today, Calendar, Notes, Deadlines and More. Hosted on GitHub Pages, it installs from Chrome as a full-screen app, and a service worker keeps an offline copy. Firestore keeps a copy on the device too, so the app opens without signal and sends queued changes once it is back online.' },
        { type: 'image', src: `${import.meta.env.BASE_URL}thought_lab/Monthly%20plan/phone.png`, caption: 'The phone layout — Today and Calendar' },
        { type: 'text', content: 'Settings hold the Google sign-in, your name, which parts are shown, data and backups, and the theme. Switching between light and dark spreads the new theme out in a circle from the button you pressed.' },
        { type: 'image', src: `${import.meta.env.BASE_URL}thought_lab/Monthly%20plan/dark-mode.png`, caption: 'Dark theme' },

        { type: 'divider' },

        { type: 'heading', content: 'Data & Backups', level: 2 },
        {
          type: 'list',
          items: [
            'One log, two devices: the laptop file and the Firestore copy are kept in step, and each account can reach only its own folder.',
            'An automatic previous-copy backup is refreshed on every save.',
            'A damaged file is quarantined to its own timestamped file rather than silently discarded, and a file that is only locked for a moment by cloud sync or antivirus is retried, never overwritten.',
            'A linked CSV copy (optional, e.g. on Google Drive) serves as a portable, human-readable spare, with export and import as a fallback.'
          ]
        },

        { type: 'callout', content: 'The code is public on GitHub (KD-27/monthly-plan) under the MIT license — copy config.example.js to config.local.js to set your own tasks, points and targets. Visiting with ?demo=1 loads made-up sample data from a separate storage key, so the real log is never read or written while demoing. All the screenshots here come from demo mode.', variant: 'tip' }
      ]
    },

    // =====================================================================
    // Blunder Breakdown - automated chess YouTube channel pipeline
    // =====================================================================
    {
      id: 'blunder-breakdown',
      title: 'Blunder Breakdown',
      subtitle: 'One month of trying to run a YouTube chess channel on an automated video pipeline',
      icon: 'Clapperboard',
      category: 'project',
      coverImage: `${import.meta.env.BASE_URL}thought_lab/blunder_breakdown/cover.jpg`,
      introduction: "Blunder Breakdown started as a simple question: could my own Lichess games become YouTube videos with almost no manual editing? Over about a month I built, with Claude as a pair programmer, a pipeline that fetches my games, uses Stockfish to find the most dramatic mistake, writes and voices a narration, renders the board animation, and outputs a finished video with its thumbnail, title, description and tags. It then grew into five video formats, a local dashboard, a YouTube analytics tab and scheduled uploads. The channel published 60+ videos and passed 11,000 views, mostly from Shorts.",
      tags: ['Content Automation', 'Python', 'Stockfish', 'LLM Narration', 'ElevenLabs', 'YouTube API', 'Claude'],
      status: 'published',
      publishedDate: 'October 2026',
      readTime: '8 min read',
      contentBlocks: [
        { type: 'heading', content: 'The Idea', level: 2 },
        { type: 'text', content: "I play a lot of fast games on Lichess, and every game is already a complete record in PGN form. Every move, every mistake and the result are all there. The idea was to treat that PGN as raw material and let software do the editing a human creator would normally do: pick the interesting game, find the moment that matters, explain it, and package it for YouTube." },
        { type: 'quote', content: "Stockfish decides what is true on the board. The AI only decides how to say it." },
        { type: 'text', content: "That split was the most important design rule. Language models are not trusted to calculate chess. Every evaluation, blunder, missed mate and best move comes from Stockfish. The LLM is only used for wording: narration scripts, titles and descriptions. If the narration service fails, the pipeline falls back to a deterministic script and still produces a video." },

        { type: 'heading', content: 'How the Pipeline Works', level: 2 },
        {
          type: 'flow',
          steps: [
            { title: 'Fetch', detail: 'Pull my recent games from Lichess as PGN files.', icon: 'Download', phase: 'FIND THE MOMENT', tools: ['Lichess API'] },
            { title: 'Rank', detail: 'Score every game for drama, not accuracy. A CSV remembers which games are already used.', icon: 'BarChart3', phase: 'FIND THE MOMENT', tools: ['Stockfish', 'CSV'] },
            { title: 'Extract', detail: 'Pick the one key move: missed mate › blunder › eval swing.', icon: 'Crosshair', phase: 'FIND THE MOMENT', tools: ['Stockfish'] },
            { title: 'Story', detail: 'Three acts: what happened, why it was wrong, the best move.', icon: 'BookOpen', phase: 'TELL THE STORY', tools: ['Python'] },
            { title: 'Narrate', detail: 'A long script and a condensed Shorts script, written from facts Stockfish supplied.', icon: 'PenLine', phase: 'TELL THE STORY', tools: ['DeepSeek', 'OpenRouter'], note: 'LLM fails? Fall back to a deterministic script' },
            { title: 'Voice', detail: 'Read in a clone of my own voice, then loudness-normalized.', icon: 'Mic', phase: 'TELL THE STORY', tools: ['ElevenLabs', 'FFmpeg'] },
            { title: 'Render', detail: 'Board, arrows, captions, capture animations and eval bar. The voice-over length sets the timeline.', icon: 'Clapperboard', phase: 'MAKE THE VIDEO', tools: ['Pillow', 'NumPy', 'FFmpeg'] },
            { title: 'Package', detail: 'Thumbnails plus title options, description and tags.', icon: 'Package', phase: 'MAKE THE VIDEO', tools: ['Pillow', 'DeepSeek'] }
          ],
          outputs: [
            { label: '16:9 Video', detail: 'long-form', icon: 'Monitor' },
            { label: '9:16 Short', detail: 'captions + intro', icon: 'Smartphone' },
            { label: 'Thumbnails', detail: 'both formats', icon: 'Image' },
            { label: 'Metadata', detail: 'titles · desc · tags', icon: 'FileText' }
          ],
          caption: 'One run: from a raw PGN file to an upload-ready folder'
        },

        { type: 'image', src: `${import.meta.env.BASE_URL}thought_lab/blunder_breakdown/thumb_blunder.jpg`, caption: 'An auto-generated thumbnail: the key square highlighted, text drawn from the highlight type' },

        { type: 'divider' },

        { type: 'heading', content: 'The Journey: How It Evolved', level: 2 },
        { type: 'text', content: "The first version made 16:9 long-form blunder breakdown videos and nothing else. The design guide I wrote for myself at the start had one rule in bold: publish for one month before over-engineering anything, and let real YouTube numbers decide what to improve. Here is roughly how that month went." },

        {
          type: 'timeline',
          entries: [
            {
              label: 'WEEK 1',
              title: 'Long-form blunder videos',
              detail: "Daily 30–50 second landscape videos in three acts. The pipeline worked, but impressions weren't turning into clicks or watch time.",
              stat: { value: '30–70', label: 'views per video' },
              added: ['16:9 three-act video', 'Cloned voice', 'Auto thumbnails'],
              media: [{ type: 'video', src: `${import.meta.env.BASE_URL}thought_lab/blunder_breakdown/blunder_long.mp4`, caption: 'The original 16:9 three-act format' }]
            },
            {
              label: 'WEEK 2',
              title: 'Shorts: the turning point',
              detail: 'A 9:16 Shorts generator with its own condensed narration, plus a local dashboard so a full run became a few clicks. Views jumped the week the Shorts went out.',
              stat: { value: '21×', label: 'weekly views (242 → 5,185)' },
              added: ['9:16 Shorts', 'Burned-in captions', 'Rook intro + SFX', 'Flask dashboard'],
              media: [{ type: 'video', src: `${import.meta.env.BASE_URL}thought_lab/blunder_breakdown/blunder_short.mp4`, caption: 'A blunder Short', vertical: true }]
            },
            {
              label: 'WEEK 3',
              title: 'New formats',
              detail: '~7 minute opening lessons built from the Lichess Opening Explorer with Stockfish-checked traps, and short games replayed move by move with a live eval bar.',
              stat: { value: '2:37', label: 'avg view on the Italian Game lesson' },
              added: ['Opening theory', 'Full game replays', 'Analytics tab'],
              media: [
                { type: 'video', src: `${import.meta.env.BASE_URL}thought_lab/blunder_breakdown/theory_excerpt.mp4`, caption: 'First minute of the Italian Game lesson' },
                { type: 'video', src: `${import.meta.env.BASE_URL}thought_lab/blunder_breakdown/full_game_short.mp4`, caption: 'Full game replay', vertical: true }
              ]
            },
            {
              label: 'WEEK 4',
              title: 'Puzzles and hands-off publishing',
              detail: "'Find the win' puzzles from a Lichess study, with the eval bar hidden so it doesn't spoil the answer. A script uploads a batch with YouTube's publishAt, so they go live daily with my computer off.",
              stat: { value: '16', label: 'Shorts auto-scheduled' },
              added: ['Brilliancy puzzles', 'YouTube API upload', 'publishAt scheduling'],
              media: [{ type: 'video', src: `${import.meta.env.BASE_URL}thought_lab/blunder_breakdown/brilliancy_short.mp4`, caption: "'Find the win' puzzle", vertical: true }]
            }
          ]
        },

        { type: 'image', src: `${import.meta.env.BASE_URL}thought_lab/blunder_breakdown/shorts_covers.jpg`, caption: 'Auto-generated 9:16 covers for three formats: blunder Short, full game replay, brilliancy puzzle' },

        { type: 'divider' },

        { type: 'heading', content: 'The Control Room: A Local Dashboard', level: 2 },
        { type: 'text', content: "Running a dozen scripts from a terminal every day doesn't last, so the whole pipeline sits behind a local Flask dashboard opened from a desktop shortcut. Each format has its own tab with live progress and logs. Every generated video can be previewed with its thumbnail and copy-ready metadata, and a password-protected settings area keeps the API keys out of the code." },
        { type: 'image', src: `${import.meta.env.BASE_URL}thought_lab/blunder_breakdown/dash_home.jpg`, caption: 'Dashboard: fetch games, run the lesson pipeline, or build a full game replay with one click' },
        { type: 'image', src: `${import.meta.env.BASE_URL}thought_lab/blunder_breakdown/dash_media.jpg`, caption: 'Media tab: every run in its own folder, with the video, thumbnail and one-click copy for titles, description and tags' },
        { type: 'image', src: `${import.meta.env.BASE_URL}thought_lab/blunder_breakdown/dash_theory.jpg`, caption: 'Theory tab: the opening catalog with done and published tracking' },
        { type: 'image', src: `${import.meta.env.BASE_URL}thought_lab/blunder_breakdown/dash_database.jpg`, caption: 'Database tab: the Stockfish drama ranking that decides which game becomes the next video' },
        { type: 'image', src: `${import.meta.env.BASE_URL}thought_lab/blunder_breakdown/dash_analytics.jpg`, caption: 'Analytics tab: live YouTube numbers, monetization progress and daily views, pulled over OAuth' },

        { type: 'divider' },

        { type: 'heading', content: 'Results', level: 2 },
        {
          type: 'list',
          items: [
            '60+ videos published across five formats, nearly all generated end to end by the pipeline.',
            '11,400+ views, 30 hours of watch time and 30 subscribers in the 28 days to August 5, on a brand-new channel with no existing audience. Daily views peaked at around 1,400 in mid-July.',
            'In the first month of analytics, 84% of views (6,599 of 7,833) came from the Shorts feed.',
            "Best performer: 'White Had a Forced Mate – Then Played This', a 26 second Short with 1,842 views and 82% average viewed.",
            'The Italian Game theory video held viewers for an average of 2 min 37 s, against roughly 20–30 s for blunder-style videos. That told me that teaching content keeps people watching.'
          ]
        },
        { type: 'callout', content: 'Shorts brought the reach and long-form theory brought the watch time. Tweaking titles barely moved the numbers. Changing the format did.', variant: 'info' },

        { type: 'heading', content: 'What I Learned', level: 2 },
        {
          type: 'list',
          items: [
            'Ship first, then optimize. The pipeline was rough when the first video went out, and real analytics changed my priorities more than any amount of polishing beforehand would have.',
            "Keep the source of truth deterministic. PGN plus Stockfish is the ground truth, and the LLM only adds wording on top. That made AI mistakes easy to spot and contain. The one time the metadata step claimed a variation that didn't exist, it was traced and fixed the same day.",
            'Every optional step must fail softly. LLM APIs sometimes return empty or malformed output. When narration, voice, thumbnail or metadata fails, the pipeline logs a warning and still finishes a video.',
            'Let the audio drive the timeline. Sizing each video to the measured voice-over solved the cut-off narration problems that fixed-length renders kept causing.',
            'Retention and click-through rate are what count. Most YouTube SEO advice turned out to be noise. The opening seconds and the thumbnail matter most.',
            'Working with Claude as a collaborator made a month-long solo project possible. It handled the rendering math, FFmpeg plumbing and API integration while I made the product and content decisions.'
          ]
        },

        { type: 'heading', content: 'Tech Stack', level: 3 },
        {
          type: 'list',
          items: [
            'Python, python-chess, Stockfish, Pillow, NumPy, imageio, FFmpeg',
            'OpenRouter (DeepSeek) for narration and metadata, ElevenLabs voice cloning, Microsoft edge-tts for free drafts',
            'Lichess API and Opening Explorer, YouTube Data and Analytics APIs (OAuth)',
            'Flask dashboard with Chart.js, launched from a desktop shortcut and shut down automatically when the last tab closes',
            'Channel: https://www.youtube.com/channel/UCAW9Z0uZu_nww26nI5ZF8hA'
          ]
        }
      ]
    },

    // =====================================================================
    // Seven-IMU Gait Monitor - wearable gait deviation detector
    // =====================================================================
    {
      id: 'gait-imu-monitor',
      title: 'Seven-IMU Gait Monitor',
      subtitle: 'A wearable that learns how I walk, then tells me what changed and when',
      icon: 'Footprints',
      category: 'hardware',
      coverImage: `${import.meta.env.BASE_URL}thought_lab/gait_imu/cover.jpg`,
      introduction: "Seven motion sensors strapped to the thighs, shins, feet and lower back, one ESP32-S3 at the waist, and a Wi-Fi stream into a Python pipeline that turns raw accelerometer and gyroscope readings into knee, hip and ankle angles. The goal was narrow and testable: record one good walk to learn what normal looks like for me, then check any other walk against it and say what was wrong and when. On a deliberately stiff-kneed walk it flagged the right joint in the right 45–86 second window, without being told the fault was there.",
      tags: ['Wearables', 'ESP32-S3', 'IMU Sensor Fusion', 'Gait Analysis', 'Python', 'SolidWorks'],
      status: 'published',
      publishedDate: 'October 2026',
      readTime: '9 min read',
      contentBlocks: [
        { type: 'heading', content: 'The Idea', level: 2 },
        { type: 'text', content: "Gait labs use force plates and optical motion capture. I wanted to see how far a cheap wearable could get with the simplest useful question: is this walk different from my own normal one? Comparing against my own baseline instead of a textbook curve sidesteps most of the accuracy problems of cheap sensors. The system doesn't need to know the true hip angle. It only needs to measure the same thing the same way twice." },
        { type: 'quote', content: "Faults are local in time, so detection has to be local in time too." },

        { type: 'heading', content: 'The Hardware', level: 2 },
        { type: 'image', src: `${import.meta.env.BASE_URL}thought_lab/gait_imu/kit.jpg`, caption: 'The harness: waist band with the electronics, and six leg bands with printed sensor mounts' },
        { type: 'list', items: [
          'ESP32-S3 at the waist, streaming over Wi-Fi',
          '7 × MPU6050 6-axis IMUs: thigh, shank and foot on each leg, plus one on the pelvis',
          'TCA9548A I²C multiplexer, one sensor per channel',
          'Buzzer on the waist band for on-device alerts, plus a vibration module for haptic feedback (not yet wired in)',
          '3D-printed sensor mounts and electronics housing designed in SolidWorks, on Velcro straps',
          'JST connectors at every segment so the harness can be taken apart'
        ] },
        { type: 'callout', content: "Every MPU6050 has the same I²C address (0x68), so only one can be on the bus at a time. The multiplexer switches between them, which means the seven sensors are never sampled at exactly the same moment. Each reading carries its own microsecond timestamp so the pipeline can line them back up, and almost every later design decision follows from this.", variant: 'info' },
        {
          type: 'gallery',
          images: [
            { src: `${import.meta.env.BASE_URL}thought_lab/gait_imu/cad_waist.jpg`, caption: 'Waist band (CAD)' },
            { src: `${import.meta.env.BASE_URL}thought_lab/gait_imu/cad_sensor.jpg`, caption: 'Sensor mount (CAD)' },
            { src: `${import.meta.env.BASE_URL}thought_lab/gait_imu/cover.jpg`, caption: 'Waist electronics' },
            { src: `${import.meta.env.BASE_URL}thought_lab/gait_imu/straps.jpg`, caption: 'Printed sensor mounts' }
          ]
        },

        { type: 'divider' },

        { type: 'heading', content: 'The Build, Phase by Phase', level: 2 },
        { type: 'text', content: "I built it in small verified steps, one sensor on its own first, so that every new problem had only one new thing that could be causing it. That paid off more than once." },
        {
          type: 'timeline',
          entries: [
            {
              label: 'PHASE 1',
              title: 'Hardware bring-up',
              detail: "One sensor wired straight to the ESP32, then through the multiplexer, then all seven. Two channels failed on the first full test; swapping sensors between channels showed the fault moved with the jumper wires, not the sensors. On the soldered harness the bus went completely silent. After stripping back to a breadboard to prove nothing was damaged, the cause turned out to be the multiplexer's power wire soldered one pin over.",
              stat: { value: '7 / 7', label: 'sensors answering through the mux' },
              added: ['Mux channel scanner', 'Soldered harness', 'JST leads']
            },
            {
              label: 'PHASE 2',
              title: 'Timestamped capture and Wi-Fi streaming',
              detail: "A paced round-robin loop reads all seven sensors 150 times a second and packs each sweep into a 126-byte binary frame with a sequence number, sent over a WebSocket to a browser dashboard. The first 5-minute test had 18 pauses of about 0.18 s each. The frames were intact, but the stream kept stalling. The cause was Wi-Fi modem power-saving, and one line (WiFi.setSleep(false)) fixed it.",
              stat: { value: '0.004%', label: 'dropped samples after the fix (was ~1%)' },
              added: ['WebSocket stream', 'Live dashboard', 'Capture validator'],
              media: [{ type: 'video', src: `${import.meta.env.BASE_URL}thought_lab/gait_imu/live_stream.mp4`, caption: 'The live dashboard: all seven sensors at 150 Hz, tapping one lights up its lane' }]
            },
            {
              label: 'PHASE 3',
              title: 'From raw signals to joint angles',
              detail: "One complementary filter per body segment fuses the gyroscope (smooth but drifts) with the accelerometer (noisy but drift-free). Heel strikes from the foot sensors cut the walk into strides, each one stretched onto a 0–100% gait cycle. The first right-knee curve peaked in completely the wrong place because only the thigh's sign was being corrected, not the shank's. Fixing that took the left/right difference from 37° down to 5°.",
              stat: { value: '5.2°', label: 'left vs right knee difference over the gait cycle' },
              added: ['Complementary filter', 'Heel-strike detection', 'Stride normalization'],
              media: [{ type: 'image', src: `${import.meta.env.BASE_URL}thought_lab/gait_imu/gaitcycle.jpg`, caption: 'Normalized knee gait cycle, mean ± SD across strides, both legs' }]
            },
            {
              label: 'PHASE 4',
              title: 'Calibration and fault detection',
              detail: "A short routine at the start of each session (stand, sit, extend each knee, flex each ankle) pins down how every sensor is actually sitting on the leg. Then the real test: a walk that was normal for the first half, then deliberately stiff-kneed. Averaging all its strides only showed a mild change. Tracking knee swing in short windows along the walk showed the fault clearly, and exactly when it started and stopped.",
              stat: { value: '45–86 s', label: 'fault window found without being told' },
              added: ['Per-session calibration', 'Windowed detector', 'gait_monitor.py'],
              media: [{ type: 'image', src: `${import.meta.env.BASE_URL}thought_lab/gait_imu/alert.jpg`, caption: 'Alert timeline: knee swing per window against my normal band. Red = under-flexion, grey = standing' }]
            }
          ]
        },

        { type: 'divider' },

        { type: 'heading', content: 'How the Pipeline Works', level: 2 },
        {
          type: 'flow',
          steps: [
            { title: 'Sample', detail: 'The mux selects each sensor in turn for a 14-byte burst read, timestamped to the microsecond. 150 sweeps a second.', icon: 'Cpu', phase: 'CAPTURE', tools: ['ESP32-S3', 'TCA9548A', 'MPU6050'] },
            { title: 'Stream', detail: 'One binary frame per sweep over a WebSocket. A sequence number makes any dropped frame countable.', icon: 'Wifi', phase: 'CAPTURE', tools: ['WebSocket', 'Wi-Fi'], note: 'Modem power-save caused stalls → WiFi.setSleep(false)' },
            { title: 'Calibrate', detail: "A short movement routine finds each segment's bending axis for this wearing of the rig.", icon: 'Compass', phase: 'MEASURE', tools: ['Python', 'NumPy'] },
            { title: 'Orient', detail: 'A complementary filter per segment gives a drift-free angle. Knee = thigh − shank.', icon: 'Activity', phase: 'MEASURE', tools: ['Complementary filter'] },
            { title: 'Segment', detail: 'Heel strikes split the walk into strides, each normalized to 0–100%. Turning strides are rejected using the pelvis sensor.', icon: 'Footprints', phase: 'MEASURE', tools: ['NumPy'] },
            { title: 'Learn normal', detail: 'One good walk becomes a personal reference band for knee swing.', icon: 'Ruler', phase: 'JUDGE', tools: ['reference_band.json'] },
            { title: 'Check', detail: 'Slide a 4 s window along a new walk, compare against the band, skip standing, group the red windows into fault episodes with a severity.', icon: 'Gauge', phase: 'JUDGE', tools: ['gait_monitor.py'] }
          ],
          outputs: [
            { label: 'Alert timeline', detail: 'what & when', icon: 'BarChart3' },
            { label: 'Cycle overlay', detail: 'which part of the stride', icon: 'Activity' },
            { label: 'Browser analyzer', detail: 'no install', icon: 'Monitor' },
            { label: 'JSON report', detail: 'episodes + severity', icon: 'FileText' }
          ],
          caption: 'From strapping on the rig to a verdict on a walk'
        },

        { type: 'heading', content: 'The Lesson: Don\'t Average a Fault Away', level: 2 },
        { type: 'text', content: "My first attempt pooled every stride of the faulty walk into one average and compared it against normal. The result was a weak, everywhere-at-once change of a few degrees, easy to dismiss as noise. In reality the fault was strong (knee swing roughly halved) but only lasted about 40 seconds, and averaging it together with the normal half of the walk hid it. The fix was to judge the walk window by window along the timeline and leave out the periods spent standing still. The per-stride overlay below makes the same point from the other side: the faulty strides fall clearly outside the band." },
        { type: 'image', src: `${import.meta.env.BASE_URL}thought_lab/gait_imu/vs_normal_cycle.jpg`, caption: 'Strides from the faulty walk (red) against my good-walk band (green)' },
        { type: 'heading', content: 'An Alert You Can Hear', level: 2 },
        { type: 'text', content: "The pipeline needs a laptop, so I also wrote a much lighter stiff-knee check that runs on the ESP32 itself and sounds the buzzer. It needs no calibration, so it still works after the rig is taken off and put back on. When the knee bends, the thigh and shank rotate at different rates. When it's held stiff, they move together. The firmware watches that difference on both legs, learns my normal level from the first 30–40 seconds of walking, and buzzes if either knee drops below 60% of it for a few seconds while I'm walking. Standing still is ignored." },
        { type: 'callout', content: "Replayed against the recorded walks, the good walk never triggered the buzzer, and the stiff-knee walk set it off from about 51 to 86 seconds on both legs. That matches the window the full pipeline found.", variant: 'tip' },
        { type: 'text', content: "The same detector also runs entirely in the browser. You drop in a calibration file, a good walk and a walk to check, and it produces the same flags as the Python version." },
        { type: 'video', src: `${import.meta.env.BASE_URL}thought_lab/gait_imu/analyzer.mp4`, caption: 'The in-browser analyzer: three files in, fault episodes out' },

        { type: 'divider' },

        { type: 'heading', content: 'Honest Limitations', level: 2 },
        { type: 'list', items: [
          'The knee is the trustworthy joint. Hip and ankle angles depend on weaker sensor axes, so the tool only flags the knee and says so.',
          'It detects stiff-knee (reduced flexion) only. Overstriding and limping have different signatures and need their own test walks.',
          'It measures movement relative to my own baseline. It does not diagnose injuries, which would need muscle and force data.',
          'Taking the rig off and putting it back on means a new calibration, and ideally a fresh good walk.',
          'It still runs from a USB power bank. The battery path browns out under Wi-Fi load and needs a boost converter.'
        ] },

        { type: 'heading', content: 'What\'s Next', level: 2 },
        { type: 'list', items: [
          'Detectors for overstriding (stride length) and limping (left/right asymmetry), each validated with its own normal-then-fault walk',
          'Haptic feedback: drive the vibration module so alerts can be felt as well as heard, with a different buzz pattern for each fault type',
          'A boost converter for untethered battery power'
        ] }
      ]
    },

    // =====================================================================
    // RGB Colour Mixer - three-knob ESP32-C3 colour mixer with OLED readout
    // =====================================================================
    {
      id: 'rgb-colour-mixer',
      title: 'Three-Knob RGB Colour Mixer',
      subtitle: 'Three knobs, one LED, and a hex code on a tiny screen, running all day on one battery',
      icon: 'Palette',
      category: 'hardware',
      coverImage: `${import.meta.env.BASE_URL}thought_lab/rgb_mixer/violet.jpg`,
      introduction: "A small battery-powered instrument built on an ESP32-C3. Three potentiometers set the red, green and blue levels of an RGB LED, and a 0.96\" OLED shows each value as a number and a bar, along with the colour's hex code. It's a simple idea, but getting it right on a perfboard with whatever parts were in the drawer took real circuit maths, a few firmware workarounds and a careful power budget.",
      tags: ['Embedded Systems', 'ESP32-C3', 'PWM', 'Circuit Design', 'Arduino', 'Power Budgeting'],
      status: 'published',
      publishedDate: 'October 2026',
      readTime: '5 min read',
      contentBlocks: [
        { type: 'heading', content: 'The Build', level: 2 },
        { type: 'image', src: `${import.meta.env.BASE_URL}thought_lab/rgb_mixer/board.jpg`, caption: 'Component placement on the perfboard before wiring: OLED, ESP32-C3 SuperMini, power switch, LED resistors and the three knobs' },
        { type: 'list', items: [
          'ESP32-C3 SuperMini, clocked down to 80 MHz with the radio never started',
          '3 × 10 kΩ linear potentiometers on the ADC1 pins',
          '5 mm common-anode RGB LED driven by 5 kHz, 8-bit PWM (256 levels per channel, 16.7 million colours)',
          '0.96" 128×64 SSD1306 OLED over software SPI',
          '1000 mAh LiPo cell with a TP4056 charger and protection board, and a slide switch'
        ] },
        { type: 'callout', content: "The display I had turned out to be a 7-pin SPI module, not the 4-pin I²C one the design assumed. That meant reassigning five GPIOs and switching the display driver to software SPI, while staying clear of the C3's strapping and USB pins.", variant: 'warning' },

        { type: 'heading', content: 'The Problem with Green and Blue', level: 2 },
        { type: 'text', content: "Each LED colour drops a different voltage. Red drops about 2.0 V, which leaves 1.3 V across its resistor from a 3.3 V pin. Green and blue drop 3.0–3.1 V, which leaves only 0.2–0.3 V. With the usual 330 Ω resistor on every channel, green and blue got well under 1 mA and were barely visible." },
        { type: 'equation', content: 'R = (V_GPIO − V_f) / I   →   green: 0.3 V / 2.7 mA ≈ 110 Ω' },
        { type: 'text', content: "I only had 330 Ω and 1 kΩ resistors, so green and blue each got three 330 Ω resistors in parallel, which gives exactly 110 Ω (R/n for n equal resistors). Even in the worst case, a green chip dropping only 2.8 V draws 4.5 mA, far below the 20 mA pin limit." },
        { type: 'callout', content: "The trade-off is that red still carries about 40% more current than green and twice as much as blue, so full 255/255/255 comes out warm rather than white. That was predicted on paper before the test confirmed it. A per-channel cap in firmware (around 150 on red) balances it.", variant: 'tip' },

        { type: 'heading', content: 'Firmware: Cleaning Up a Noisy Knob', level: 2 },
        { type: 'text', content: "Two parts that should have been on the board weren't: series resistors to keep the ADC in its linear range, and filter capacitors on the knob wipers. The firmware does their job instead. The ESP32-C3's ADC is only linear up to about 2.5 V, and without filter capacitors the last digits flickered." },
        {
          type: 'flow',
          steps: [
            { title: 'Read', detail: 'Average 16 samples per knob, which cuts random noise by √16 = 4×.', icon: 'SlidersHorizontal', phase: 'READ', tools: ['ADC1', '12-bit'] },
            { title: 'Clamp', detail: 'Treat anything at or above 2,500 mV as full scale, where the ADC stops being linear.', icon: 'Gauge', phase: 'READ', note: 'Hardware fix: a 3.3 kΩ series resistor per knob' },
            { title: 'Scale', detail: 'Map 30–2,500 mV to 0–255. The 30 mV floor makes true zero reachable.', icon: 'Ruler', phase: 'CLEAN' },
            { title: 'Filter', detail: 'Exponential smoothing, y = 0.7·y + 0.3·x, about 56 ms time constant at a 50 Hz loop.', icon: 'Filter', phase: 'CLEAN', note: 'Hardware fix: 0.1 µF from each wiper to ground' },
            { title: 'Drive', detail: 'Three 5 kHz, 8-bit PWM channels, inverted for the common-anode LED.', icon: 'Lightbulb', phase: 'SHOW', tools: ['ledcWrite'] },
            { title: 'Display', detail: 'Redraw the OLED only when a value moves by 2+ counts, or once a second, to save power.', icon: 'Monitor', phase: 'SHOW', tools: ['U8g2'] }
          ],
          outputs: [
            { label: 'RGB LED', detail: '16.7M colours', icon: 'Lightbulb' },
            { label: 'OLED readout', detail: 'values · bars · #hex', icon: 'Monitor' }
          ],
          caption: 'The main loop, every 20 ms'
        },

        { type: 'heading', content: 'Results', level: 2 },
        { type: 'text', content: "All eight functional tests passed. The only qualified result was the expected one: with every knob at maximum, the mix leans warm instead of neutral white." },
        {
          type: 'gallery',
          images: [
            { src: `${import.meta.env.BASE_URL}thought_lab/rgb_mixer/red.jpg`, caption: '255 / 0 / 0 · #FF0000' },
            { src: `${import.meta.env.BASE_URL}thought_lab/rgb_mixer/green.jpg`, caption: '0 / 255 / 0 · #00FF00' },
            { src: `${import.meta.env.BASE_URL}thought_lab/rgb_mixer/blue.jpg`, caption: '0 / 0 / 255 · #0000FF' },
            { src: `${import.meta.env.BASE_URL}thought_lab/rgb_mixer/violet.jpg`, caption: '143 / 13 / 237 · #8F0DED' }
          ]
        },

        { type: 'heading', content: 'Power Budget', level: 2 },
        { type: 'text', content: "The whole thing draws about 45 mA typical and 63 mA worst case from the 3.3 V rail: roughly 20 mA for the ESP32 with the radio off, 12 mA for the OLED, 8 mA for the LED and the rest for the knobs and board overhead. From a 1000 mAh cell at 85% usable capacity, that's about 18 hours typical and 13 hours worst case. The cell feeds the board's 5 V pin rather than 3V3, so it goes through the onboard regulator. A full cell at 4.2 V would exceed the chip's 3.6 V maximum if fed in directly." },
        { type: 'text', content: "One unexpected result: the battery gives no gradual warning. The rail holds 3.3 V until the cell sags to about 3.4 V, then blue fades first (it has the least voltage headroom), then green. So a white or violet mix drifting warm is the low-battery warning, and a pure red setting gives no warning at all." },

        { type: 'heading', content: 'What I\'d Add Next', level: 2 },
        { type: 'list', items: [
          'The missing 3.3 kΩ and 0.1 µF parts, so the full knob travel is usable and noise is filtered in hardware',
          'MOSFET drivers powering the LED from the battery, so green and blue reach full brightness and true white is possible',
          'Gamma correction, so brightness tracks the knob evenly',
          'A battery-voltage monitor on a spare ADC pin, saved favourite colours and an HSV mode'
        ] }
      ]
    }
  ]
};
