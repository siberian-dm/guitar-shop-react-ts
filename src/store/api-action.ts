import { APIRoute } from '../services/api';
import { FetchState } from '../types/store';
import {
  loadGuitarsCards,
  loadPriceMaxLimit,
  loadPriceMinLimit,
  setFetchState
} from './reducers/catalog-slice/catalog-slice';
import { ThunkActionResult } from '../types/action';
import { toast } from 'react-toastify';
import { parse, stringify } from 'query-string';
import { QueryField } from '../const';

export const fetchGuitarsByQuery = (queryString: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      dispatch(setFetchState(FetchState.Pending));

      const parsed = parse(queryString);
      const priceRangeQuery = stringify({
        ...parsed,
        [QueryField.Sort]: '',
        [QueryField.Order]: '',
        [QueryField.PriceMin]: '',
        [QueryField.PriceMax]: '',
      }, {skipEmptyString: true});

      const [
        { data: guitarWithMinPrice },
        { data: guitarWithMaxPrice },
        { data: guitarsByQuery },
      ] =
      await Promise.all([
        api.get(`${APIRoute.GuitarWithMinPrice}${priceRangeQuery && `&${priceRangeQuery}`}`),
        api.get(`${APIRoute.GuitarWithMaxPrice}${priceRangeQuery && `&${priceRangeQuery}`}`),
        api.get(`${APIRoute.GuitarsWithComments}${queryString && `&${queryString}`}`),
      ]);

      dispatch(loadPriceMinLimit(guitarWithMinPrice[0].price));
      dispatch(loadPriceMaxLimit(guitarWithMaxPrice[0].price));
      dispatch(loadGuitarsCards(guitarsByQuery));
    }
    catch (error) {
      const errorMessage = (error as {message: string}).message;

      if (errorMessage) {
        toast.error(errorMessage);
      }
    }
    finally {
      dispatch(setFetchState(FetchState.Idle));
    }
  };
