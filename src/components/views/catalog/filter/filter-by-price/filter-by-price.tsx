import { ChangeEvent, useEffect, useState } from 'react';
import { getPriceMaxLimit, getPriceMinLimit } from '../../../../../store/reducers/catalog-slice/selectors';
import { NumberParam, useQueryParam } from 'use-query-params';
import { QueryField } from '../../../../../const';
import { useKeyPress } from '../../../../../hooks/use-key-press';
import { useSelector } from 'react-redux';
import { validatePriceMax, validatePriceMin } from '../../../../../utils/validate-price';

function FilterByPrice(): JSX.Element {
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [isPriceMinInputFocused, setIsPriceMinInputFocused] = useState(false);
  const [isPriceMaxInputFocused, setIsPriceMaxInputFocused] = useState(false);

  const isEnterKeyPressOnPriceMin = useKeyPress('Enter', isPriceMinInputFocused);
  const isEnterKeyPressOnPriceMax = useKeyPress('Enter', isPriceMaxInputFocused);

  const [queryPriceMin, setQueryPriceMin] = useQueryParam(QueryField.PriceMin, NumberParam);
  const [queryPriceMax, setQueryPriceMax] = useQueryParam(QueryField.PriceMax, NumberParam);

  const priceMinLimit = useSelector(getPriceMinLimit);
  const priceMaxLimit = useSelector(getPriceMaxLimit);

  useEffect(() => {
    const initialMin = queryPriceMin ? String(queryPriceMin) : '';
    const initialMax = queryPriceMax ? String(queryPriceMax) : '';

    setPriceMin(initialMin);
    setPriceMax(initialMax);
  },
  [queryPriceMax, queryPriceMin]);

  useEffect(() => {
    if (isEnterKeyPressOnPriceMin || !isPriceMinInputFocused) {
      const validatedPriceMin = validatePriceMin({
        currentMin: priceMin,
        currentMax: priceMax,
        limitMin: priceMinLimit,
        limitMax: priceMaxLimit,
      });

      const newQueryPriceMin = validatedPriceMin !== ''
        ? Number(validatedPriceMin)
        : undefined;

      if (validatedPriceMin !== priceMin) {
        setPriceMin(validatedPriceMin);
      }

      if (newQueryPriceMin !== queryPriceMin) {
        setQueryPriceMin(newQueryPriceMin);
      }
    }
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [isEnterKeyPressOnPriceMin, isPriceMinInputFocused]);

  useEffect(() => {
    if (isEnterKeyPressOnPriceMax || !isPriceMaxInputFocused) {
      const validatedPriceMax = validatePriceMax({
        currentMin: priceMin,
        currentMax: priceMax,
        limitMin: priceMinLimit,
        limitMax: priceMaxLimit,
      });

      const newQueryPriceMax = validatedPriceMax !== ''
        ? Number(validatedPriceMax)
        : undefined;

      if (validatedPriceMax !== priceMax) {
        setPriceMax(validatedPriceMax);
      }

      if (newQueryPriceMax !== queryPriceMax) {
        setQueryPriceMax(newQueryPriceMax);
      }
    }
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [isEnterKeyPressOnPriceMax, isPriceMaxInputFocused]);

  const onPriceMinInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setPriceMin(evt.target.value);
  };

  const onPriceMaxInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setPriceMax(evt.target.value);
  };

  const onPriceMinInputFocus = () => {
    setIsPriceMinInputFocused(true);
  };

  const onPriceMaxInputFocus = () => {
    setIsPriceMaxInputFocused(true);
  };

  const onPriceMinInputBlur = () => {
    setIsPriceMinInputFocused(false);
  };

  const onPriceMaxInputBlur = () => {
    setIsPriceMaxInputFocused(false);
  };

  return (
    <fieldset
      data-testid="filter-by-price"
      className="catalog-filter__block"
    >
      <legend className="catalog-filter__block-title">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="form-input">
          <label className="visually-hidden">Минимальная цена</label>
          <input
            type="number"
            placeholder={String(priceMinLimit)}
            id="priceMin"
            name="от"
            onChange={onPriceMinInputChange}
            onFocus={onPriceMinInputFocus}
            onBlur={onPriceMinInputBlur}
            value={priceMin}
          />
        </div>
        <div className="form-input">
          <label className="visually-hidden">Максимальная цена</label>
          <input
            type="number"
            placeholder={String(priceMaxLimit)}
            id="priceMax"
            name="до"
            onChange={onPriceMaxInputChange}
            onFocus={onPriceMaxInputFocus}
            onBlur={onPriceMaxInputBlur}
            value={priceMax}
          />
        </div>
      </div>
    </fieldset>
  );
}

export default FilterByPrice;
