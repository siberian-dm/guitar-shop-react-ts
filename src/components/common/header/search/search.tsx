import SearchedItemList from './searched-item-list/searched-item-list';
import SearchForm from './search-form/search-form';
import { useEffect, useState } from 'react';

function Search(): JSX.Element {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isItemListShow, setIsItemListShow] = useState(false);
  const [inputElement, setInputElement] = useState<HTMLInputElement | null>(null);
  const [uListElement, setUListElement] = useState<HTMLUListElement | null>(null);

  const onInputFocus = () => {
    setIsInputFocused(true);
    setIsItemListShow(true);
  };

  const onInputBlur = () => {
    setIsInputFocused(false);
  };

  useEffect(() => {
    const onDocumentClick = (evt: MouseEvent) => {
      if (evt.target !== inputElement && evt.target !== uListElement) {
        setIsItemListShow(false);
      }
    };

    if (isItemListShow) {
      document.addEventListener('click', onDocumentClick);
    }
    else {
      document.removeEventListener('click', onDocumentClick);
    }

    return () => {
      document.removeEventListener('click', onDocumentClick);
    };
  },
  [inputElement, isItemListShow, uListElement]);

  return (
    <div className="form-search">
      <SearchForm
        setInputElement={setInputElement}
        onInputFocus={onInputFocus}
        onInputBlur={onInputBlur}
      />
      <SearchedItemList
        setUListElement={setUListElement}
        isInputFocused={isInputFocused}
        isItemListShow={isItemListShow}
      />
    </div>
  );
}

export default Search;
