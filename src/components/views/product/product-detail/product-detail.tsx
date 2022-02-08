import classNames from 'classnames';
import ProductRate, { RateType } from '../../../common/product-rate/product-rate';
import { formatPrice } from '../../../../utils/common';
import { GuitarType } from '../../../../const';
import { MouseEvent, useState } from 'react';
import { TGuitarCard } from '../../../../types/app-data';

export const productTypes: {[key: string]: string} = {
  [GuitarType.Acoustic]: 'Акустическая гитара',
  [GuitarType.Electric]: 'Электрогитара',
  [GuitarType.Ukulele]: 'Укулеле',
};

enum TabName {
  Characteristics,
  Description,
}

type TProps = {
  data: TGuitarCard;
}

function ProductDetail({ data }: TProps): JSX.Element {
  const [activeTab, setActiveTab] = useState(TabName.Characteristics);

  const {
    name,
    vendorCode,
    type,
    description,
    previewImg,
    stringCount,
    rating,
    price,
    comments,
  } = data;

  const adaptedPreviewImg = previewImg.replace('img/', '/img/content/');

  const onTabClick = (tabName: TabName) =>
    (evt: MouseEvent) => {
      evt.preventDefault();
      setActiveTab(tabName);
    };

  const setTabClass = (tabName: TabName) => classNames(
    'button button--medium tabs__button',
    {
      'button--black-border': activeTab !== tabName,
    });

  const tabsTableClass = classNames(
    'tabs__table',
    {
      'hidden': activeTab !== TabName.Characteristics,
    });

  const tabsDescriptionClass = classNames(
    'tabs__product-description',
    {
      'hidden': activeTab !== TabName.Description,
    });

  return (
    <div
      className="product-container"
      data-testid="product-detail"
    >
      <img className="product-container__img" src={adaptedPreviewImg} width="90" height="235" alt={name}/>
      <div className="product-container__info-wrapper">
        <h2 className="product-container__title title title--big title--uppercase">{name}</h2>
        <ProductRate
          rating={rating}
          rateType={RateType.ProductPage}
          rateCount={comments.length}
        />
        <div className="tabs">
          <a
            className={setTabClass(TabName.Characteristics)}
            href="#characteristics"
            onClick={onTabClick(TabName.Characteristics)}
          >
            Характеристики
          </a>
          <a
            className={setTabClass(TabName.Description)}
            href="#description"
            onClick={onTabClick(TabName.Description)}
          >
            Описание
          </a>
          <div className="tabs__content" id="characteristics">
            <table
              className={tabsTableClass}
              data-testid="characteristics"
            >
              <tbody>
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
              </tbody>
            </table>
            <p
              className={tabsDescriptionClass}
              data-testid="description"
            >
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
