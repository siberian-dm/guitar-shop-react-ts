import Price from './price/price';
import Strings from './strings/strings';
import Type from './type/type';

function Filter(): JSX.Element {
  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <Price />
      <Type />
      <Strings />
    </form>
  );
}

export default Filter;
