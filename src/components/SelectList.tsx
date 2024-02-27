import { useState } from 'react';

const SelectList = (props: {data: string[], listText: string, onOptionClicked: (value: string) => void}) => {
  const [isOpen, setIsOpen] = useState(false);
  const onToggle = () => {
		setIsOpen(!isOpen);
	}
	const handleClick = (value: string) => {
		props.onOptionClicked(value);
		setIsOpen(false);
	}

	console.log(isOpen);
	
  return (
    <>
      <div className="listbox" onClick={onToggle}>
        <p>{props.listText}</p>
      </div>
      <div className="dropdown-wrapper">
        <ul className="dropdown-container">
          {isOpen && (
            <>
							{props.data.map((item, i) => {
								return (
									<li className="dropdown-component" key={i} onClick={()=>handleClick(item)}>{item}</li>)}
								)
							}
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default SelectList;