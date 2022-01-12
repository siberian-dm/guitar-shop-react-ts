export type TComment = {
  id: string;
  userName: string;
  advantages: string;
  disadvantages: string;
  comment: string;
  rating: number;
  createAt: string;
  guitarId: number;
}

export type TGuitarCard = {
  id: number;
  name: string;
  vendorCode: string;
  type: string;
  description: string;
  previewImg: string;
  stringCount: number;
  rating: number;
  price: number;
  comments: TComment[];
}

export type TGuitarCards = TGuitarCard[];

export type TSearchedGuitar = Pick<TGuitarCard, 'id' | 'name'>;

export type TSearchedGuitars = TSearchedGuitar[];
