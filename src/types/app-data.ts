export type TComment = {
  id: string;
  userName: string;
  advantage: string;
  disadvantage: string;
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
  comments: TComments;
}

export type TSearchedGuitar = Pick<TGuitarCard, 'id' | 'name'>;
export type TGuitarCards = TGuitarCard[];
export type TComments = TComment[];
export type TSearchedGuitars = TSearchedGuitar[];
