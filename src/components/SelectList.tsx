import { useState } from 'react';

const SelectList = (props: {setProjection: React.Dispatch<React.SetStateAction<string>>}) => {
  const [isOpen, setIsOpen] = useState(false);
  const onToggle = () => setIsOpen(!isOpen);
  const onOptionClicked = (value: string) => () => {
    props.setProjection(value);
    setIsOpen(false);
  };
  return (
    <>
      <div className="listbox" onClick={onToggle}>
        <p>Select Projection</p>
      </div>
      <div className="dropdown-wrapper">
        <ul className="dropdown-container">
          {isOpen && (
            <>
              <li className="dropdown-component" onClick={onOptionClicked("mercator")}>Mercator</li>
              <li className="dropdown-component" onClick={onOptionClicked("sinusoidal")}>Sinusoidal Equal-area</li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default SelectList;