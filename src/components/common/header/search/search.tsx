import SearchedItemList from './searched-item-list/searched-item-list';
import SearchForm from './search-form/search-form';
import { useEffect, useState } from 'react';
import { BtnKey } from '../../../../const';

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

  useEffect(() => {
    const onInputElementKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === BtnKey.ArrowDown) {
        evt.preventDefault();
        const firstListItem = uListElement?.firstChild as HTMLLIElement | null | undefined;

        firstListItem?.focus();
      }
    };

    if (isInputFocused) {
      inputElement?.addEventListener('keydown', onInputElementKeyDown);
    }
    else {
      inputElement?.removeEventListener('keydown', onInputElementKeyDown);
    }
    return () => {
      inputElement?.removeEventListener('keydown', onInputElementKeyDown);
    };
  },
  [inputElement, isInputFocused, uListElement?.firstChild]);

  return (
    <div className="form-search">
      <SearchForm
        setInputElement={setInputElement}
        onInputFocus={onInputFocus}
        onInputBlur={onInputBlur}
      />
      <SearchedItemList
        setUListElement={setUListElement}
        isItemListShow={isItemListShow}
      />
    </div>
  );
}

export default Search;
