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
