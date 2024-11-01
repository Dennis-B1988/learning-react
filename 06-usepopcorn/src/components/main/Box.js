import { useState } from 'react';
import { Button } from './Button';

export function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <Button
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      {isOpen && children}
    </div>
  );
}
