/*
 * ====================================================================================
 * 🛒 CONTENT DATABASE
 * ====================================================================================
 * 
 * HOW TO ADD YOUR OWN IMAGES:
 * 1. Create a folder named "public" in your main project folder (next to src, package.json, etc).
 * 2. Drag and drop your image files (e.g., "my-face.jpg", "robot.png") into that "public" folder.
 * 3. In this file below, change the image path to just the filename with a slash:
 *    Example: image: '/my-face.jpg'
 * 
 * HOW TO ADD VIDEOS:
 * 1. You can use a YouTube link OR a local file in the public folder.
 * 2. Add the 'video' property to your project object.
 *    Example: video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
 *    Example: video: '/my-robot-demo.mp4'
 * 
 * HOW TO ADD RESUME:
 * 1. Put your PDF file in the "public" folder (e.g., "resume.pdf").
 * 2. Update the 'resume' field in SOCIAL_LINKS below to '/resume.pdf'.
 *
 * HOW TO UPDATE SITE:
 * ⚠️ IMPORTANT: After changing this file, you MUST run 'npm run deploy' for changes to appear online.
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
  pageSubtitle: '// PERSPECTIVES ON ROBOTICS & INTELLIGENT SYSTEMS',
  introduction: `This is my personal space for exploring and sharing perspectives on the evolving landscape of robotics and AI. Here, I document my thoughts on emerging technologies, practical challenges, and the philosophical questions that arise when building intelligent machines. These aren't formal papers—they're candid reflections from someone working in the trenches of robotics development.`,
  ctaTitle: 'THOUGHT LAB',
  ctaSubtitle: 'Explore my perspectives on current robotics topics',
  articles: [
    // =====================================================================
    // EXAMPLE ARTICLE - Shows how to use all content block types
    // Change status to 'published' when you add your real content
    // =====================================================================
    {
      id: 'foundation-models',
      title: 'Foundation Models for Robotics',
      subtitle: 'Can large-scale AI transform physical manipulation?',
      icon: 'Brain',
      coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
      introduction: 'Exploring how transformer-based models and large-scale training are reshaping robotic manipulation and decision-making.',
      tags: ['Foundation Models', 'Transformers', 'Manipulation'],
      status: 'coming-soon',  // Change to 'published' when ready
      readTime: '8 min read',
      contentBlocks: [
        // Example of all block types - replace with your real content:
        
        { type: 'text', content: 'This is where your first paragraph goes. Introduce the topic and set the context for your readers.' },
        
        { type: 'heading', content: 'The Current Landscape', level: 2 },
        
        { type: 'text', content: 'Another paragraph explaining the current state of foundation models in robotics. You can write as much as you want here.' },
        
        { 
          type: 'image', 
          src: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80', 
          caption: 'Example: A humanoid robot representing current advances in robotics',
          alt: 'Humanoid robot'
        },
        
        { type: 'text', content: 'Continue your explanation after the image. The caption below the image helps explain what the reader is seeing.' },
        
        { type: 'heading', content: 'Key Challenges', level: 3 },
        
        { 
          type: 'list', 
          items: [
            'Sim-to-real transfer gaps remain significant',
            'Data collection for robotics is expensive and slow',
            'Safety constraints limit exploration during training',
            'Generalization across environments is difficult'
          ] 
        },
        
        { 
          type: 'callout', 
          content: 'Pro tip: When testing new models, always start with simulation before deploying to real hardware.', 
          variant: 'tip' 
        },
        
        { type: 'text', content: 'Here is more text explaining your thoughts on the challenges listed above.' },
        
        { 
          type: 'quote', 
          content: 'The goal is not to replace human judgment but to augment human capabilities.', 
          author: 'Anonymous Roboticist' 
        },
        
        { type: 'divider' },
        
        { type: 'heading', content: 'My Experiments', level: 2 },
        
        { type: 'text', content: 'Describe your own experiments or observations here.' },
        
        { 
          type: 'video', 
          src: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Replace with your actual video
          caption: 'Example video - replace with your own demo footage'
        },
        
        { type: 'text', content: 'Explain what the video shows and what conclusions you draw from it.' },
        
        { 
          type: 'callout', 
          content: 'Warning: Results may vary significantly based on hardware and environmental conditions.', 
          variant: 'warning' 
        },
        
        { type: 'heading', content: 'Conclusions', level: 2 },
        
        { type: 'text', content: 'Wrap up your article with final thoughts and what you think the future holds for this topic.' }
      ]
    },
    
    // =====================================================================
    // REMAINING ARTICLES - Currently set as 'coming-soon'
    // =====================================================================
    {
      id: 'generalization-vs-messiness',
      title: 'Robot Generalization vs. Real-World Messiness',
      subtitle: 'Why lab demos fail in the wild',
      icon: 'AlertTriangle',
      coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
      introduction: 'The gap between controlled experiments and chaotic reality—and how we might bridge it.',
      tags: ['Generalization', 'Real-World Robotics', 'Deployment'],
      status: 'coming-soon',
      readTime: '6 min read',
      contentBlocks: []
    },
    {
      id: 'human-robot-collaboration',
      title: 'Human–Robot Collaboration and Safety',
      subtitle: 'Building trust between humans and machines',
      icon: 'Users',
      coverImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
      introduction: 'How do we design robots that work alongside humans safely and intuitively?',
      tags: ['Cobots', 'Safety', 'HRI'],
      status: 'coming-soon',
      readTime: '7 min read',
      contentBlocks: []
    },
    {
      id: 'edge-ai-robots',
      title: 'Edge AI on Robots',
      subtitle: 'Running intelligence at the edge',
      icon: 'Cpu',
      coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
      introduction: 'The challenges and opportunities of running ML models directly on robotic hardware.',
      tags: ['Edge AI', 'Jetson', 'TensorRT', 'Optimization'],
      status: 'coming-soon',
      readTime: '10 min read',
      contentBlocks: []
    },
    {
      id: 'modular-vs-monolithic',
      title: 'Modular vs. Monolithic Robot Architectures',
      subtitle: 'Build vs. buy, integrate vs. develop',
      icon: 'Blocks',
      coverImage: 'https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?w=800&q=80',
      introduction: 'When should you use off-the-shelf components versus building custom solutions?',
      tags: ['Architecture', 'System Design', 'Trade-offs'],
      status: 'coming-soon',
      readTime: '9 min read',
      contentBlocks: []
    },
    {
      id: 'affordable-manipulators',
      title: 'Affordable Robotic Manipulators',
      subtitle: 'Democratizing robotic arms',
      icon: 'Hand',
      coverImage: 'https://images.unsplash.com/photo-1561144257-e32e8efc6c4f?w=800&q=80',
      introduction: 'The rise of low-cost robot arms and what it means for research and small-scale automation.',
      tags: ['Manipulators', 'Affordable Robotics', 'Automation'],
      status: 'coming-soon',
      readTime: '8 min read',
      contentBlocks: []
    },
    {
      id: 'ethics-autonomous-decisions',
      title: 'Ethics of Autonomous Decision-Making',
      subtitle: 'When machines make choices',
      icon: 'Scale',
      coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
      introduction: 'The moral implications of robots that act without human intervention.',
      tags: ['Ethics', 'Autonomy', 'Philosophy'],
      status: 'coming-soon',
      readTime: '12 min read',
      contentBlocks: []
    },
    {
      id: 'llms-as-planners',
      title: 'LLMs as High-Level Planners',
      subtitle: 'Language models meet robotics',
      icon: 'MessageSquare',
      coverImage: 'https://images.unsplash.com/photo-1676299081847-824916de030a?w=800&q=80',
      introduction: 'Can ChatGPT-style models serve as the "brain" for robotic task planning?',
      tags: ['LLM', 'Planning', 'Task Decomposition'],
      status: 'coming-soon',
      readTime: '10 min read',
      contentBlocks: []
    },
    {
      id: 'ros2-interoperability',
      title: 'ROS2 Interoperability Realities',
      subtitle: 'The promise vs. the practice',
      icon: 'GitBranch',
      coverImage: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80',
      introduction: 'Real-world experiences integrating ROS2 with various hardware and software stacks.',
      tags: ['ROS2', 'Integration', 'Middleware'],
      status: 'coming-soon',
      readTime: '11 min read',
      contentBlocks: []
    },
    {
      id: 'robotics-regulations',
      title: 'Robotics Regulations and AI Safety Policies',
      subtitle: 'Navigating the regulatory landscape',
      icon: 'Shield',
      coverImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
      introduction: 'An overview of emerging regulations affecting robotics and autonomous systems.',
      tags: ['Regulations', 'Safety Standards', 'Compliance'],
      status: 'coming-soon',
      readTime: '9 min read',
      contentBlocks: []
    }
  ]
};