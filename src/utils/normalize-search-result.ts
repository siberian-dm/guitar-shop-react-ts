import { TSearchedGuitars } from '../types/app-data';

export const normalizeSearchResult = (
  result: TSearchedGuitars,
  searchString: string,
) => {
  const searchName = searchString.toUpperCase().trim();

  return result.filter(
    ({ name }) => {
      const currentName = name.toUpperCase().trim();

      if (currentName.startsWith(searchName)) {
        return true;
      }

      const words = currentName.split(' ');
      let isMatched = false;

      for (const word of words) {
        if (word.startsWith(searchName)) {
          isMatched = true;
          break;
        }
      }

      return isMatched;
    })
    .sort((a, b) => {
      const nameA = a.name.toLocaleUpperCase();
      const nameB = b.name.toLocaleUpperCase();

      if (nameA.startsWith(searchName) && !nameB.startsWith(searchName)) {
        return -1;
      }
      else if (nameB.startsWith(searchName) && !nameA.startsWith(searchName)) {
        return 1;
      }

      return nameA.localeCompare(nameB);
    });
};
