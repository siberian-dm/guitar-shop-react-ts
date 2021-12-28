import ProductRate, { RateType } from '../../../common/product-rate/product-rate';
import { formatPrice } from '../../../../utils/common';
import { GuitarType } from '../../../../const';
import { TGuitarCard } from '../../../../types/app-data';

const productTypes: {[key: string]: string} = {
  [GuitarType.Acoustic]: 'Акустическая гитара',
  [GuitarType.Electric]: 'Электрогитара',
  [GuitarType.Ukulele]: 'Укулеле',
};

type TProps = {
  data: TGuitarCard;
}

function ProductDetail({ data }: TProps): JSX.Element {
  const {
    name,
    vendorCode,
    type,
    description,
    previewImg,
    stringCount,
    rating,
    price,
  } = data;

  const adaptedPreviewImg = previewImg.replace('img/', '/img/content/');

  return (
    <div className="product-container">
      <img className="product-container__img" src={adaptedPreviewImg} width="90" height="235" alt={name}/>
      <div className="product-container__info-wrapper">
        <h2 className="product-container__title title title--big title--uppercase">{name}</h2>
        <ProductRate
          rating={rating}
          rateType={RateType.ProductPage}
        />
        <div className="tabs">
          <a className="button button--medium tabs__button" href="#characteristics">
            Характеристики
          </a>
          <a className="button button--black-border button--medium tabs__button" href="#description">
            Описание
          </a>
          <div className="tabs__content" id="characteristics">
            <table className="tabs__table">
              <tr className="tabs__table-row">
                <td className="tabs__title">Артикул:</td>
                <td className="tabs__value">{vendorCode}</td>
              </tr>
              <tr className="tabs__table-row">
                <td className="tabs__title">Тип:</td>
                <td className="tabs__value">{productTypes[type]}</td>
              </tr>
              <tr className="tabs__table-row">
                <td className="tabs__title">Количество струн:</td>
                <td className="tabs__value">{`${stringCount} струнная`}</td>
              </tr>
            </table>
            <p className="tabs__product-description hidden">
              {description}
            </p>
          </div>
        </div>
      </div>
      <div className="product-container__price-wrapper">
        <p className="product-container__price-info product-container__price-info--title">
          Цена:
        </p>
        <p className="product-container__price-info product-container__price-info--value">
          {formatPrice(price)}
        </p>
        <a className="button button--red button--big product-container__button" href="#no_scroll">
          Добавить в корзину
        </a>
      </div>
    </div>
  );
}

export default ProductDetail;
