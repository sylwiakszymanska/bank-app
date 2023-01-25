import React, { type FC, type ReactNode } from 'react';
import { Waypoint } from 'react-waypoint';

interface IProps {
  onBottomReach: () => void;
  children?: ReactNode | ReactNode[];
  isActive: boolean;
}

export const InfiniteScroll: FC<IProps> = ({ children, onBottomReach, isActive }) => {
  return (
    <>
      {children}
      {isActive && (
        <div>
          <Waypoint onEnter={onBottomReach} />
        </div>
      )}
    </>
  );
};
