
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
  resume: '/resume.pdf' // The filename of your PDF in the public folder
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
    title: 'National Robotics Champion 2023',
    image: 'https://picsum.photos/id/146/300/200',
  },
  {
    id: 'a2',
    title: 'Best Innovation Award - TechExpo',
    image: 'https://picsum.photos/id/250/300/200',
  },
  {
    id: 'a3',
    title: 'IEEE Publication of the Year',
    image: 'https://picsum.photos/id/366/300/200',
  },
  {
    id: 'a4',
    title: 'Dean\'s List - Engineering',
    image: 'https://picsum.photos/id/454/300/200',
  },
  {
    id: 'a5',
    title: 'Patent: Soft Gripper Mechanism',
    image: 'https://picsum.photos/id/534/300/200',
  },
  {
    id: 'a6',
    title: 'Hackathon Winner: Smart City',
    image: 'https://picsum.photos/id/674/300/200',
  }
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Autonomous Delivery Rover',
    description: 'A 6-wheeled outdoor rover capable of navigating unstructured environments using SLAM.',
    longDescription: 'Designed to tackle the "last-mile" delivery challenge in suburban environments, this rover utilizes a custom rocker-bogie suspension system to climb curbs and traverse rough terrain. The core intelligence is powered by an NVIDIA Jetson Nano running ROS2 Galactic, processing data from a LiDAR and stereo camera setup to perform real-time SLAM and obstacle avoidance.',
    tags: ['ROS2', 'Python', 'SolidWorks', 'NVIDIA Jetson'],
    image: 'https://picsum.photos/id/1/800/600',
    video: 'https://www.youtube.com/watch?v=lxIFMMsCTfA', // Example YouTube Link
    gallery: [
      'https://picsum.photos/id/101/400/300',
      'https://picsum.photos/id/102/400/300',
      'https://picsum.photos/id/103/400/300'
    ],
    details: [
      'Designed rocker-bogie suspension in SolidWorks for stability on 30-degree inclines',
      'Implemented EKF sensor fusion (IMU + Odometry + LiDAR) for precise localization',
      'Designed custom PCB for power distribution and high-current motor control',
      'Developed global and local path planning using Nav2 stack'
    ]
  },
  {
    id: '2',
    title: 'Haptic Feedback Exoskeleton',
    description: 'Upper-body exoskeleton arm for teleoperation with force feedback.',
    longDescription: 'This project focuses on human-robot interaction (HRI), specifically allowing a human operator to "feel" the weight and resistance of objects handled by a remote robotic arm. The system uses series elastic actuators (SEAs) to measure torque and provide realistic force feedback to the wearer. Low-latency communication is achieved via a custom UDP protocol over WiFi.',
    tags: ['C++', 'STM32', 'Fusion 360', 'Control Theory'],
    image: 'https://picsum.photos/id/20/800/600',
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
    image: 'https://picsum.photos/id/3/800/600',
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
    title: 'Quadruped Robot Dog',
    description: 'Open-source 12-DOF quadruped robot with dynamic gait stabilization.',
    longDescription: 'A high-performance quadruped robot built from scratch to study legged locomotion. The robot features 12 degrees of freedom driven by high-torque brushless motors with quasi-direct drive gearing. The control software uses Model Predictive Control (MPC) for stabilization and can execute trot, walk, and crawl gaits.',
    tags: ['PyBullet', 'Raspberry Pi', 'BLDC Motors', 'Gait Analysis'],
    image: 'https://picsum.photos/id/4/800/600',
    gallery: [
      'https://picsum.photos/id/401/400/300',
      'https://picsum.photos/id/402/400/300',
      'https://picsum.photos/id/403/400/300'
    ],
    details: [
      'Implemented Bezier curve gait generation for smooth foot trajectories',
      'Custom quasi-direct drive actuator design (9:1 planetary gear)',
      'Real-time balance control using IMU feedback @ 1kHz',
      'Simulation environment in PyBullet for Reinforcement Learning training'
    ]
  },
  {
    id: '5',
    title: 'Underwater ROV Explorer',
    description: 'Remotely operated underwater vehicle for pipeline inspection.',
    longDescription: 'Designed for subsea inspection tasks, this ROV is rated for depths up to 100 meters. It features a watertight aluminum electronics enclosure and a vectored thruster configuration allowing for 6-DOF movement (surge, sway, heave, roll, pitch, yaw). It streams HD video back to the surface via a fiber optic tether.',
    tags: ['Marine Robotics', 'Fluid Dynamics', 'ArduSub', 'Video Streaming'],
    image: 'https://picsum.photos/id/5/800/600',
    gallery: [
      'https://picsum.photos/id/501/400/300',
      'https://picsum.photos/id/502/400/300',
      'https://picsum.photos/id/503/400/300'
    ],
    details: [
      'Pressure hull design rated for 100m depth with dual O-ring seals',
      'Vector thruster configuration for full 6-DOF control authority',
      'High-brightness LED lighting system (4000 lumens)',
      'Tether management system with fiber optic comms for low-latency video'
    ]
  },
  {
    id: '6',
    title: 'Smart Prosthetic Hand',
    description: 'Low-cost, EMG-controlled prosthetic hand with adaptive grip.',
    longDescription: 'An affordable, open-source prosthetic hand designed for transradial amputees. The hand uses surface electromyography (sEMG) sensors to detect muscle impulses in the forearm. A machine learning classifier distinguishes between different grip patterns (pinch, power grasp, pointer) based on the user\'s muscle signals.',
    tags: ['Biomedical', 'Signal Processing', 'Machine Learning', '3D Printing'],
    image: 'https://picsum.photos/id/6/800/600',
    gallery: [
      'https://picsum.photos/id/600/400/300',
      'https://picsum.photos/id/602/400/300',
      'https://picsum.photos/id/603/400/300'
    ],
    details: [
      'Pattern recognition for EMG muscle signals using Support Vector Machines',
      'Compliant finger mechanism using TPU 3D printing for durability',
      'Compact PCB design fitting inside the palm',
      'Battery management for all-day usage (12+ hours)'
    ]
  },
  {
    id: '7',
    title: 'Vertical Farming IoT',
    description: 'Automated hydroponic system with climate control and monitoring.',
    longDescription: 'A fully automated aeroponic vertical farm unit. This system maximizes crop yield per square foot by precisely controlling the root environment. IoT sensors monitor pH, electrical conductivity (EC), and water temperature, while a Raspberry Pi controls solenoid valves and peristaltic pumps to maintain optimal growing conditions.',
    tags: ['IoT', 'MQTT', 'React', 'Node.js'],
    image: 'https://picsum.photos/id/75/800/600',
    gallery: [
      'https://picsum.photos/id/700/400/300',
      'https://picsum.photos/id/701/400/300',
      'https://picsum.photos/id/702/400/300'
    ],
    details: [
      'Sensors for pH, EC, temperature, and humidity logging to AWS',
      'Automated dosing pumps for nutrient regulation based on PID control',
      'Cloud dashboard built with React for remote monitoring',
      'Energy optimization algorithms for LED grow lights'
    ]
  }
];

export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: 'p1',
    title: 'Prediction of Coronary Artery Disease Using Artificial Neural Network',
    abstract: 'An ANN for early CAD diagnosis achieved ~90% accuracy using SMOTE, expert-guided feature selection, optimized hyperparameters, and stratified k-fold validation. The model showed strong reliability and clinical relevance, outperforming conventional machine-learning methods',
    image: '/CAD_Diagnosis.png',
    link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=s9AT2TYAAAAJ&citation_for_view=s9AT2TYAAAAJ:9yKSN-GCB0IC',
    publisher: 'International Research Conference (KDU IRC)',
    date: '2024',
    tags: ['Neural Networks', 'Coranary Artery Disease', 'SMOTE']
  },
  {
    id: 'p2',
    title: 'Development of an automated clothesline system',
    abstract: 'An automated clothes-drying system integrates sensors and actuators to detect rain and darkness, automatically sheltering garments while offering manual and remote control. It reduces household inconvenience, protects clothes from weather, and demonstrates how smart technology streamlines everyday domestic tasks.',
    image: '/Automated_Clothesline.png',
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
      { name: 'SolidWorks', level: 95 },
      { name: 'Fusion 360', level: 90 },
      { name: 'FEA Simulation', level: 80 },
      { name: 'GD&T / Drafting', level: 85 }
    ]
  },
  {
    title: 'Embedded Firmware',
    icon: 'Cpu',
    skills: [
      { name: 'C / C++', level: 90 },
      { name: 'STM32 / ARM', level: 85 },
      { name: 'RTOS', level: 80 },
      { name: 'Motor Control (FOC)', level: 95 }
    ]
  },
  {
    title: 'PCB & Electronics',
    icon: 'Layers',
    skills: [
      { name: 'Altium Designer', level: 85 },
      { name: 'KiCad', level: 90 },
      { name: 'High Speed Layout', level: 75 },
      { name: 'SMD Soldering', level: 100 }
    ]
  },
  {
    title: 'Robotics Software',
    icon: 'Bot',
    skills: [
      { name: 'ROS 2 (Galactic)', level: 90 },
      { name: 'Navigation Stack', level: 85 },
      { name: 'MoveIt Planning', level: 80 },
      { name: 'Gazebo / Ignition', level: 85 }
    ]
  },
  {
    title: 'Computer Vision & AI',
    icon: 'Eye',
    skills: [
      { name: 'OpenCV / Python', level: 85 },
      { name: 'TensorFlow Lite', level: 70 },
      { name: 'YOLO Object Detect', level: 80 },
      { name: 'Point Cloud (PCL)', level: 75 }
    ]
  },
  {
    title: 'Rapid Prototyping',
    icon: 'Wrench',
    skills: [
      { name: '3D Printing (FDM/SLA)', level: 100 },
      { name: 'Laser Cutting', level: 95 },
      { name: 'CNC Machining', level: 70 },
      { name: 'Silicon Casting', level: 80 }
    ]
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    title: 'Concept & CAD',
    year: 'Phase 1',
    description: 'Iterative design using Fusion 360 to validate mechanics before cutting metal.',
    image: 'https://picsum.photos/400/300?random=1'
  },
  {
    title: 'Electronics & Firmware',
    year: 'Phase 2',
    description: 'Breadboarding sensors, designing custom PCBs, and writing driver code.',
    image: 'https://picsum.photos/400/300?random=2'
  },
  {
    title: 'Integration & Test',
    year: 'Phase 3',
    description: 'Putting it all together. Smoke testing, debugging, and system tuning.',
    image: 'https://picsum.photos/400/300?random=3'
  },
  {
    title: 'Deployment',
    year: 'Phase 4',
    description: 'Field testing and final optimizations for real-world environments.',
    image: 'https://picsum.photos/400/300?random=4'
  }
];
