import FilterByPrice from './filter-by-price/filter-by-price';
import FilterByStrings from './filter-by-strings/filter-by-strings';
import FilterByType from './filter-by-type/filter-by-type';

function Filter(): JSX.Element {
  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <FilterByPrice />
      <FilterByType />
      <FilterByStrings />
    </form>
  );
}

export default Filter;
