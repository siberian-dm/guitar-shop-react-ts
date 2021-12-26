function Type(): JSX.Element {
  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Тип гитар</legend>
      <div className="form-checkbox catalog-filter__block-item">
        <input className="visually-hidden" type="checkbox" id="acoustic" name="acoustic"/>
        <label htmlFor="acoustic">Акустические гитары</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        <input className="visually-hidden" type="checkbox" id="electric" name="electric" checked/>
        <label htmlFor="electric">Электрогитары</label>
      </div>
      <div className="form-checkbox catalog-filter__block-item">
        <input className="visually-hidden" type="checkbox" id="ukulele" name="ukulele" checked/>
        <label htmlFor="ukulele">Укулеле</label>
      </div>
    </fieldset>
  );
}

export default Type;
