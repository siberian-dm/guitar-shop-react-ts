import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Footer from './footer';


describe('Component: Footer', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Footer />
      </Router>,
    );

    const links = screen.getAllByRole('link');

    expect(links[0]).toHaveClass('footer__logo');
    expect(links[1]).toHaveAccessibleName('facebook');
    expect(links[2]).toHaveAccessibleName('instagram');
    expect(links[3]).toHaveAccessibleName('twitter');
    expect(links[4]).toHaveTextContent('Где купить?');
    expect(links[5]).toHaveTextContent('Блог');
    expect(links[6]).toHaveTextContent('Вопрос - ответ');
    expect(links[7]).toHaveTextContent('Возврат');
    expect(links[8]).toHaveTextContent('Сервис-центры');
    expect(links[9]).toHaveTextContent('8-812-500-50-50');

    expect(screen.getByText('О нас')).toBeInTheDocument();
    expect(screen.getByText(/Магазин гитар, музыкальных инструментов и гитарная мастерская/)).toBeInTheDocument();
    expect(screen.getByText(/в Санкт-Петербурге./)).toBeInTheDocument();
    expect(screen.getByText(/Все инструменты проверены, отстроены/)).toBeInTheDocument();
    expect(screen.getByText(/и доведены до идеала!/)).toBeInTheDocument();
    expect(screen.getByText('Информация')).toBeInTheDocument();
    expect(screen.getByText('Контакты')).toBeInTheDocument();
    expect(screen.getByText(/г. Санкт-Петербург,/)).toBeInTheDocument();
    expect(screen.getByText(/м. Невский проспект,/)).toBeInTheDocument();
    expect(screen.getByText(/ул. Казанская 6./)).toBeInTheDocument();
    expect(screen.getByText('Режим работы:')).toBeInTheDocument();
    expect(screen.getByText('с 11:00 до 20:00')).toBeInTheDocument();
    expect(screen.getByText('без выходных')).toBeInTheDocument();
  });
});
