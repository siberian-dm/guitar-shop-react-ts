import { GuitarCards } from '../../../types/app-data';

export const adaptDataToClient = (data: GuitarCards | []) => {
  const adaptedData = data.length !== 0
    ?
    data.map((card) => (
      {...card,
        previewImg: card.previewImg.replace('img/', 'img/content/'),
      }
    ))
    : [];

  return adaptedData;
};
