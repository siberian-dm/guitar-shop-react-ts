import { TGuitarCards } from '../../../types/app-data';

export const adaptDataToClient = (data: TGuitarCards | undefined) => {
  if (data === undefined) {
    return [];
  }

  const adaptedData = data.map((card) => (
    {...card,
      previewImg: card.previewImg.replace('img/', '/img/content/'),
    }
  ));

  return adaptedData;
};
