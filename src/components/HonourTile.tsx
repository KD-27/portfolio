import React from 'react';
import type { Achievement } from '../types';

// One award: photo, name, optional distinction ("Champions") and a line of context
const HonourTile: React.FC<{ item: Achievement }> = ({ item }) => {
  const [name, distinction] = item.title.split('|').map((part) => part.trim());
  return (
    <li>
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
          {item.description && <span className="mt-1 block text-sm leading-snug text-muted">{item.description}</span>}
        </figcaption>
      </figure>
    </li>
  );
};

export default HonourTile;
