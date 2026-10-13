import React from 'react';
import { ACHIEVEMENTS } from '../constants';
import { CONTAINER } from '../utils/layout';
import Contact from './Contact';
import HonourTile from './HonourTile';

// Every award, featured ones first, on its own page (#honours)
const ALL = [...ACHIEVEMENTS.filter((a) => a.featured), ...ACHIEVEMENTS.filter((a) => !a.featured)];

const HonoursPage: React.FC = () => (
  <>
    <main>
      <section className={`${CONTAINER} pt-12 pb-12 md:pt-20 md:pb-16`}>
        <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
          Honours · {ALL.length} entries
        </p>
        <h1 className="font-serif text-5xl leading-[1.05] tracking-tight text-ink md:text-7xl">
          Honours &amp; achievements
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted md:text-lg">
          Awards, competitions and research roles.
        </p>
      </section>

      <section className="border-t border-rule">
        <div className={`${CONTAINER} py-14 md:py-20`}>
          <ul className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3 lg:gap-x-8">
            {ALL.map((item) => (
              <HonourTile key={item.id} item={item} />
            ))}
          </ul>
        </div>
      </section>
    </main>
    <Contact />
  </>
);

export default HonoursPage;
