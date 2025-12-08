import { Header } from "../widgets/header";
import { NotFound404 } from "../pages/not-found-404/NotFound404";
import { Footer } from "../widgets/footer";
import { Button } from "../shared/ui/Button/Button";
import searchIcon from "../assets/icons/search.svg";
import editIcon from "../assets/icons/edit.svg";
import heartIcon from "../assets/icons/heart.svg";
import sortIcon from "../assets/icons/sort.svg";
import chevronIcon from "../assets/icons/chevron-right.svg";
import "./App.css";

// Демо-компонент для тестирования кнопок
const ButtonDemo = () => {
  const handleClick = () => {
    console.log("Кнопка нажата");
  };

  return (
    <div className="demo-container">
      <h2>Демо кнопок с иконками (с поддержкой позиции)</h2>

      <div className="demo-section">
        <h3>Иконка слева (по умолчанию)</h3>
        <div className="button-group">
          <Button
            type="primary"
            onClick={handleClick}
            icon={<img src={searchIcon} alt="Поиск" />}
            iconPosition="left"
          >
            Поиск
          </Button>
          <Button
            type="secondary"
            onClick={handleClick}
            icon={<img src={editIcon} alt="Редактировать" />}
          >
            Редактировать
          </Button>
        </div>
      </div>

      <div className="demo-section">
        <h3>Иконка справа</h3>
        <div className="button-group">
          <Button
            type="primary"
            onClick={handleClick}
            icon={<img src={chevronIcon} alt="Стрелка" />}
            iconPosition="right"
          >
            Далее
          </Button>
          <Button
            type="secondary"
            onClick={handleClick}
            icon={<img src={sortIcon} alt="Сортировка" />}
            iconPosition="right"
          >
            Сортировать
          </Button>
        </div>
      </div>

      <div className="demo-section">
        <h3>Дополнительные классы для иконок</h3>
        <div className="button-group">
          <Button
            type="tertiary"
            onClick={handleClick}
            icon={<img src={heartIcon} alt="Лайк" />}
            iconClassName="custom-icon-red"
          >
            Избранное
          </Button>
          <Button
            type="primary"
            onClick={handleClick}
            icon={<img src={editIcon} alt="Редактировать" />}
            iconPosition="right"
            iconClassName="custom-icon-large"
          >
            Редактировать
          </Button>
        </div>
      </div>

      <div className="demo-section">
        <h3>Кнопки без иконок (обратная совместимость)</h3>
        <div className="button-group">
          <Button type="primary" onClick={handleClick}>
            Обычная кнопка
          </Button>
          <Button type="secondary" onClick={handleClick}>
            Без иконки
          </Button>
          <Button
            type="tertiary"
            onClick={handleClick}
            icon={<img src={heartIcon} alt="Лайк" />}
          >
            С иконкой
          </Button>
        </div>
      </div>

      <div className="demo-section">
        <h3>Full-width кнопки с разной позицией иконок</h3>
        <div className="button-group-full">
          <Button
            type="primary"
            onClick={handleClick}
            fullWidth
            icon={<img src={searchIcon} alt="Поиск" />}
            iconPosition="left"
          >
            Поиск на всю ширину
          </Button>
          <Button
            type="secondary"
            onClick={handleClick}
            fullWidth
            icon={<img src={chevronIcon} alt="Стрелка" />}
            iconPosition="right"
          >
            Далее
          </Button>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <>
      <Header />
      <main>
        <ButtonDemo />
        <NotFound404 />
      </main>
      <Footer />
    </>
  );
}

export default App;
