import { normalizeSearchResult } from './normalize-search-result';

describe('Function: normalizeSearchResult', () => {
  const mockSearchresult = [
    {id: 1, name: 'Roman RX'},
    {id: 2, name: 'Roman LX'},
    {id: 3, name: 'Dania LX'},
    {id: 4, name: 'Dania RX'},
    {id: 5, name: 'Liana Z200'},
    {id: 6, name: 'Liana Z100'},
    {id: 7, name: 'Честер Z200'},
    {id: 8, name: 'Честер ZR'},
    {id: 9, name: 'Rolan L200'},
    {id: 10, name: 'Rolan L100'},
    {id: 11, name: 'Zola'},
  ];

  it('should return expected array when search string is "z"', () => {
    expect(normalizeSearchResult(mockSearchresult, 'z')).toEqual([
      {id: 11, name: 'Zola'},
      {id: 7, name: 'Честер Z200'},
      {id: 8, name: 'Честер ZR'},
      {id: 6, name: 'Liana Z100'},
      {id: 5, name: 'Liana Z200'},
    ]);
  });

  it('should return expected array when search string is "rx"', () => {
    expect(normalizeSearchResult(mockSearchresult, 'rx')).toEqual([
      {id: 4, name: 'Dania RX'},
      {id: 1, name: 'Roman RX'},
    ]);
  });

  it('should return expected array when search string is "ro"', () => {
    expect(normalizeSearchResult(mockSearchresult, 'ro')).toEqual([
      {id: 10, name: 'Rolan L100'},
      {id: 9, name: 'Rolan L200'},
      {id: 2, name: 'Roman LX'},
      {id: 1, name: 'Roman RX'},
    ]);
  });

  it('should return expected array when search string is "rom"', () => {
    expect(normalizeSearchResult(mockSearchresult, 'rom')).toEqual([
      {id: 2, name: 'Roman LX'},
      {id: 1, name: 'Roman RX'},
    ]);
  });

  it('should return expected array when search string is "roman rx"', () => {
    expect(normalizeSearchResult(mockSearchresult, 'roman rx')).toEqual([
      {id: 1, name: 'Roman RX'},
    ]);
  });

  it('should return expected array when search string is "z z"', () => {
    expect(normalizeSearchResult(mockSearchresult, 'z z')).toEqual([]);
  });
});
