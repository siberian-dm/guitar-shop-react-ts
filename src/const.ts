export enum AppRoute {
  Root = '/',
  Catalog = '/catalog',
  Product = '/product',
  ProductById = '/product/:id',
  NotFound = '/not-found'
}

export enum SortType {
  Price = 'price',
  Rating = 'rating',
}

export enum SortOrder {
  Descending = 'desc',
  Ascending = 'asc',
}

export enum QueryField {
  Name = 'name',
  Type = 'type',
  Sort = '_sort',
  Order = '_order',
  Start = '_start',
  End = '_end',
  PriceMin = 'price_gte',
  PriceMax = 'price_lte',
}

export enum GuitarType {
  Acoustic = 'acoustic',
  Electric = 'electric',
  Ukulele = 'ukulele',
}
