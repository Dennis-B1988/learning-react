import { useState } from 'react';
import { Button } from './Button';

export function ListBox({ children }) {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <div className="box">
      <Button
        isOpen={isOpen1}
        setIsOpen={setIsOpen1}
      />
      {isOpen1 && children}
    </div>
  );
}
