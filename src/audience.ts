/**
 * Which version of the site this build is. The same content ships as two sites:
 *  - 'phd' (default)  → kd-27.github.io/portfolio/           research-first, for PhD applications
 *  - 'industry'       → kd-27.github.io/portfolio/robotics/  projects-first, for robotics/autonomy jobs
 * Set by `vite --mode industry` (see .env.industry). Copy that differs lives in constants.ts (HERO_DATA).
 */
export const IS_INDUSTRY = import.meta.env.VITE_AUDIENCE === 'industry';

/** Home-page section order; Header nav follows the same order */
export type HomeSection = 'research' | 'projects' | 'writing' | 'experience' | 'honours' | 'skills';

export const SECTION_ORDER: HomeSection[] = IS_INDUSTRY
  ? ['projects', 'experience', 'skills', 'research', 'writing', 'honours']
  : ['research', 'projects', 'writing', 'experience', 'honours', 'skills'];
