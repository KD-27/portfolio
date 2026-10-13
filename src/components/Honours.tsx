import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ACHIEVEMENTS } from '../constants';
import HonourTile from './HonourTile';
import Section from './Section';

interface HonoursProps {
  onOpenAll: () => void;
}

// The home page shows the featured awards; the full list has its own page
const FEATURED = ACHIEVEMENTS.filter((item) => item.featured);

const Honours: React.FC<HonoursProps> = ({ onOpenAll }) => (
  <Section
    id="honours"
    label="Honours"
    title="Honours & achievements"
    action={
      FEATURED.length < ACHIEVEMENTS.length && (
        <button
          type="button"
          onClick={onOpenAll}
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-accent transition-colors"
        >
          See all {ACHIEVEMENTS.length}
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
        </button>
      )
    }
  >
    <ul className="grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-3">
      {FEATURED.map((item) => (
        <HonourTile key={item.id} item={item} />
      ))}
    </ul>
  </Section>
);

export default Honours;
