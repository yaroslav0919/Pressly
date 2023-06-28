import { useEffect, useRef } from 'react';
import ReactDropdown, { Option } from 'react-dropdown';
import classNames from 'classnames';

import 'react-dropdown/style.css';
import styles from './Dropdown.module.scss';

type TDropdown = {
  options: Record<string, any>[];
  className?: string;
  dropdownControllClassName?: string;
  placeholder?: string;
  placeholderClassName?: string;
  replacePlaceholderAfterSelected?: boolean; //this would make the Dropdown action like a Menu
  defaultOption?: string;
  menuClassName?: string;
};

const Dropdown: React.FC<TDropdown> = (props) => {
  const {
    options: passedOptions,
    className,
    dropdownControllClassName,
    placeholder,
    placeholderClassName,
    menuClassName,
    defaultOption,
    replacePlaceholderAfterSelected = true,
  } = props;

  const rootClasses = classNames(styles.root, className);
  const dropdownControlClasses = classNames(
    styles.dropdownControl,
    dropdownControllClassName
  );
  const placeholderClasses = classNames(
    styles.placeholder,
    placeholderClassName,
    {
      [styles.hidePlaceholder]: !replacePlaceholderAfterSelected,
    }
  );
  const arrowClasses = classNames(styles.arrows);
  const menuClasses = classNames(styles.menu, menuClassName);

  const isOptionsWithValue = passedOptions.every((option) => option.value);
  const options = isOptionsWithValue
    ? passedOptions
    : passedOptions.map((option, index) => ({ ...option, value: index }));

  const onSelect = (selectedOption: Option) => {
    const myOption = options.find(
      (option) => option.value === selectedOption.value
    );
    if (myOption?.handler) {
      myOption.handler();
    }
  };

  if (!replacePlaceholderAfterSelected && !placeholder) {
    throw new Error('Disable placeholder changing required placeholder');
  }

  const unchangeablePlaceholderRef = useRef<HTMLElement | null>();

  const createUnchangeablePlaceholderElement = (parentElement: Element) => {
    const unchangeablePlaceholderElement = document.createElement('p');
    unchangeablePlaceholderElement.setAttribute(
      'id',
      'unchangeablePlaceholder'
    );
    unchangeablePlaceholderElement.classList.add(styles.placeholder);
    unchangeablePlaceholderElement.textContent = placeholder as string;
    parentElement.insertBefore(
      unchangeablePlaceholderElement,
      parentElement.firstChild
    );
    return unchangeablePlaceholderElement;
  };

  useEffect(() => {
    const dropdownControlElement =
      document.getElementsByClassName('Dropdown-control')[0];
    if (!dropdownControlElement || replacePlaceholderAfterSelected) return;

    const existedUnchangeablePlaceholder = document.getElementById(
      'unchangeablePlaceholder'
    );
    if (unchangeablePlaceholderRef.current) {
      unchangeablePlaceholderRef.current = existedUnchangeablePlaceholder;
      return;
    }

    const createdElement = createUnchangeablePlaceholderElement(
      dropdownControlElement
    );
    unchangeablePlaceholderRef.current = createdElement;
  }, []);

  useEffect(() => {
    if (!placeholderClassName || !unchangeablePlaceholderRef) return;

    unchangeablePlaceholderRef.current?.classList.add(
      placeholderClassName as string
    );
  }, [unchangeablePlaceholderRef.current, placeholderClassName]);

  return (
    <ReactDropdown
      options={options as Option[]}
      onChange={onSelect}
      placeholder={placeholder || (defaultOption as string)}
      className={rootClasses}
      controlClassName={dropdownControlClasses}
      placeholderClassName={placeholderClasses}
      arrowClassName={arrowClasses}
      menuClassName={menuClasses}
    />
  );
};

export default Dropdown;
