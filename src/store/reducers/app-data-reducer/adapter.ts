import { TGuitarCards } from '../../../types/app-data';

export const adaptDataToClient = (data: TGuitarCards | []) => {
  const adaptedData = data.length !== 0
    ?
    data.map((card) => (
      {...card,
        previewImg: card.previewImg.replace('img/', '/img/content/'),
      }
    ))
    : [];

  return adaptedData;
};
