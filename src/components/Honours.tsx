import React from 'react';
import { ACHIEVEMENTS } from '../constants';
import Section from './Section';

const Honours: React.FC = () => (
  <Section id="honours" label="Honours" title="Honours & achievements">
    <ul className="grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-3">
      {ACHIEVEMENTS.map((item) => {
        const [name, distinction] = item.title.split('|').map((part) => part.trim());
        return (
          <li key={item.id}>
            <figure>
              <div className="overflow-hidden rounded-sm bg-wash">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                />
              </div>
              <figcaption className="mt-3">
                <span className="block text-[15px] font-medium leading-snug text-ink">{name}</span>
                {distinction && <span className="mt-0.5 block text-sm text-accent">{distinction}</span>}
              </figcaption>
            </figure>
          </li>
        );
      })}
    </ul>
  </Section>
);

export default Honours;
