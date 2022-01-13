import faker from 'faker';
import { TComments, TGuitarCards } from '../types/app-data';

const getMockComment = (guitarId: number) => ({
  id: faker.datatype.uuid(),
  userName: faker.name.firstName(),
  advantages: faker.lorem.paragraph(),
  disadvantages: faker.lorem.paragraph(),
  comment: faker.lorem.paragraph(),
  rating: faker.datatype.float({min: 1, max: 5, precision: 0.1}),
  createAt: faker.date.past().toString(),
  guitarId,
});

const getMockGuitarCard = (id: number) => ({
  id,
  name: faker.random.arrayElement(['Честер Bass', 'CURT Z300', 'CURT Z300', 'Честер WX', 'Dania VX']),
  vendorCode: faker.datatype.uuid(),
  type: faker.random.arrayElement(['acoustic', 'electric', 'ukulele']),
  description: faker.lorem.paragraph(),
  previewImg: faker.random.arrayElement(['img/guitar-1.jpg', 'img/guitar-2.jpg', 'img/guitar-3.jpg']),
  stringCount: faker.random.arrayElement([4, 6, 7, 12]),
  rating: faker.datatype.float({min: 1, max: 5, precision: 0.1}),
  price: faker.datatype.number({min: 2000, max: 30000, precision: 50}),
});

const getMockComments = (guitarId: number): TComments => {
  const commentCount = faker.datatype.number({min: 1, max: 10, precision: 1});

  return new Array(commentCount)
    .fill(null)
    .map(() => getMockComment(guitarId));
};

export const getMockGuitarCardsWithComments = (cardCount = 15): TGuitarCards => new Array(cardCount)
  .fill(null)
  .map((_val, index) => ({
    ...getMockGuitarCard(index),
    comments: getMockComments(index),
  }));
