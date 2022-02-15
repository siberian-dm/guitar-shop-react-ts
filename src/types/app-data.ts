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

export type TCartGuitar = Omit<TGuitarCard, 'comments' | 'rating' | 'description'>;
export type TSearchedGuitar = Pick<TGuitarCard, 'id' | 'name'>;
export type TCartGuitars = TCartGuitar[];
export type TGuitarCards = TGuitarCard[];
export type TComments = TComment[];
export type TSearchedGuitars = TSearchedGuitar[];
