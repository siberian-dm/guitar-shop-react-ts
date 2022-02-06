import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');

export const formatDate = (date: string, format = 'D MMMM') => dayjs(date).format(format);
