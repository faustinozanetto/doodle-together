'use client';

import React from 'react';

import RoomCustomizationSection from '../room-customization-section';
import RoomCustomizationSizeOption, { RoomCustomizationSizeOptionProps } from './room-customization-size-option';

const TOOL_SIZES: RoomCustomizationSizeOptionProps[] = [
  {
    size: 'small',
    icon: (
      <svg
        className="h-5 w-5 stroke-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M17 8a4 4 0 0 0 -4 -4h-2a4 4 0 0 0 0 8h2a4 4 0 0 1 0 8h-2a4 4 0 0 1 -4 -4" />
      </svg>
    ),
  },
  {
    size: 'medium',
    icon: (
      <svg
        className="h-5 w-5 stroke-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M6 20v-16l6 14l6 -14v16" />
      </svg>
    ),
  },
  {
    size: 'large',
    icon: (
      <svg
        className="h-5 w-5 stroke-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M7 4v16h10" />
      </svg>
    ),
  },
  {
    size: 'extra-large',
    icon: (
      <svg
        className="h-5 w-5 stroke-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <line x1="7" y1="4" x2="17" y2="20" />
        <line x1="17" y1="4" x2="7" y2="20" />
      </svg>
    ),
  },
];

const RoomCustomizationSize: React.FC = () => {
  return (
    <RoomCustomizationSection name="Size">
      <div className="flex gap-1 mx-auto">
        {TOOL_SIZES.map((size) => {
          return <RoomCustomizationSizeOption key={size.size} {...size} />;
        })}
      </div>
    </RoomCustomizationSection>
  );
};

export default RoomCustomizationSize;
