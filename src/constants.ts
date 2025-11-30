
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

import type { Project, SkillCategory, ProcessStep, ResearchPaper, Achievement } from './types';

// =========================================
// 👤 PERSONAL LINKS & CONTACT
// =========================================
export const SOCIAL_LINKS = {
  email: 'kaveeshadhananjaya2002@gmail.com', // Put your actual email here
  linkedin: 'https://www.linkedin.com/in/kaveesha-dhananjaya/', // Your LinkedIn URL
  github: 'https://github.com/KD-27', // Your GitHub URL
  resume: `${import.meta.env.BASE_URL}resume.pdf` // The filename of your PDF in the public folder
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
    image: `${import.meta.env.BASE_URL}academic_p.jpg`,
  },
  {
    id: 'a2',
    title: 'Publication at KDU IRC 2024',
    image: `${import.meta.env.BASE_URL}KDUIRC24.jpg`,
  },
  {
    id: 'a3',
    title: 'Genesis 23 - Research In Charge',
    image: `${import.meta.env.BASE_URL}genisis23.jpg`,
  },
  {
    id: 'a4',
    title: 'Genesis 22 - PR Team',
    image: `${import.meta.env.BASE_URL}genisis22.jpg`,
  },
  {
    id: 'a5',
    title: 'MATRIX 24 | Champions',
    image: `${import.meta.env.BASE_URL}Quadruped_Robot.png`,
  },
  {
    id: 'a6',
    title: 'Ignition Exhibition',
    image: `${import.meta.env.BASE_URL}Quadruped_Robot.png`,
  },
  {
    id: 'a7',
    title: 'MSD Competition | Champions',
    image: `${import.meta.env.BASE_URL}box_p_robot.jpg`,
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
    `${import.meta.env.BASE_URL}robot motion.mp4`,
    `${import.meta.env.BASE_URL}quad model.mp4`,
    `${import.meta.env.BASE_URL}Walking.mp4`,
    `${import.meta.env.BASE_URL}Architecture.png`,
    `${import.meta.env.BASE_URL}TkinterGUI.mp4`,
    `${import.meta.env.BASE_URL}balancing POV1.mp4`,
    `${import.meta.env.BASE_URL}balancing POV2.mp4`,
    `${import.meta.env.BASE_URL}Simulink.png`
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
    title: 'Haptic Feedback Exoskeleton',
    description: 'Upper-body exoskeleton arm for teleoperation with force feedback.',
    longDescription: 'This project focuses on human-robot interaction (HRI), specifically allowing a human operator to "feel" the weight and resistance of objects handled by a remote robotic arm. The system uses series elastic actuators (SEAs) to measure torque and provide realistic force feedback to the wearer. Low-latency communication is achieved via a custom UDP protocol over WiFi.',
    tags: ['C++', 'STM32', 'Fusion 360', 'Control Theory'],
    gallery: [
      'https://picsum.photos/id/201/400/300',
      'https://picsum.photos/id/202/400/300',
      'https://picsum.photos/id/203/400/300'
    ],
    details: [
      'Inverse kinematics solver running on STM32F4 microcontroller',
      'Low-latency UDP communication protocol (<5ms roundtrip)',
      '3D printed ergonomic mounts using carbon fiber nylon composite',
      'PID force loop tuning for realistic resistance simulation'
    ]
  },
  {
    id: '3',
    title: 'Industrial Pick & Place Cell',
    description: 'Computer vision guided SCARA robot for automated assembly lines.',
    longDescription: 'An industrial automation solution designed to increase throughput in small-parts assembly. This cell integrates a high-speed SCARA robot with an Intel RealSense camera. The system identifies random parts on a moving conveyor, calculates their orientation, and executes a synchronized pick-and-place maneuver.',
    tags: ['OpenCV', 'PLC', 'Industrial Automation', 'Python'],
    gallery: [
      'https://picsum.photos/id/301/400/300',
      'https://picsum.photos/id/302/400/300',
      'https://picsum.photos/id/304/400/300'
    ],
    details: [
      'Integrated RealSense camera for object detection and pose estimation',
      'Optimized trajectory planning for 20% cycle time reduction vs standard implementation',
      'Designed pneumatic gripper system with custom jaws',
      'Safety system integration with light curtains and emergency stop logic'
    ]
  },
  {
    id: '4',
    title: 'Prediction of CAD Using Artificial Neural Networks',
    description: 'A machine learning model for early prediction and diagnosis of Coronary Artery Disease achieving ~90% accuracy.',
    longDescription: `Coronary Artery Disease is one of the leading causes of death worldwide. Early detection can be life-saving, but traditional diagnostic methods often miss subtle patterns in patient data that indicate risk.

    This project develops an Artificial Neural Network that analyzes clinical data—demographics, medical history, and diagnostic test results—to predict CAD with approximately 90% accuracy. By identifying at-risk individuals earlier, healthcare providers can intervene sooner with lifestyle changes or treatment, potentially reducing mortality rates.

    The model was built with direct input from cardiologists, ensuring the features it analyzes are clinically meaningful rather than just statistically convenient. This collaboration between data science and medical expertise resulted in a tool that's both accurate and practical for real-world clinical settings.`,
    tags: ['Python', 'TensorFlow', 'Machine Learning', 'ANN', 'Healthcare', 'SMOTE'],
    gallery: [
      `${import.meta.env.BASE_URL}CAD.png`,
      `${import.meta.env.BASE_URL}ArchitectureCAD.png`,
      `${import.meta.env.BASE_URL}SMOTE.png`,
      `${import.meta.env.BASE_URL}Neural Network.png`,
      `${import.meta.env.BASE_URL}confusion matrix.png`,
      `${import.meta.env.BASE_URL}metrics.png`,
      `${import.meta.env.BASE_URL}accuraccy plot.png`,
      `${import.meta.env.BASE_URL}loss plot.png`,
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
    image: `${import.meta.env.BASE_URL}Quadruped_Robot.png`,
    link: '#',
    publisher: 'International Journal of Control, Automation, and System (ICROS KIEE)',
    date: 'In Progress',
    tags: ['Quadruped robot', 'Five-bar parallel mechanism', 'Trajectory optimization']
  },
  {
    id: 'p2',
    title: 'Prediction of Coronary Artery Disease Using Artificial Neural Network',
    abstract: 'An ANN for early CAD diagnosis achieved ~90% accuracy using SMOTE, expert-guided feature selection, optimized hyperparameters, and stratified k-fold validation. The model showed strong reliability and clinical relevance, outperforming conventional machine-learning methods',
    image: `${import.meta.env.BASE_URL}CAD_Diagnosis.png`,
    link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=s9AT2TYAAAAJ&citation_for_view=s9AT2TYAAAAJ:9yKSN-GCB0IC',
    publisher: 'International Research Conference (KDU IRC)',
    date: '2024',
    tags: ['Neural Networks', 'Coranary Artery Disease', 'SMOTE']
  },
  {
    id: 'p3',
    title: 'Development of an automated clothesline system',
    abstract: 'An automated clothes-drying system integrates sensors and actuators to detect rain and darkness, automatically sheltering garments while offering manual and remote control. It reduces household inconvenience, protects clothes from weather, and demonstrates how smart technology streamlines everyday domestic tasks.',
    image: `${import.meta.env.BASE_URL}Automated_Clothesline.png`,
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
