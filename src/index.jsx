import { createRoot } from 'react-dom/client';
import "./index.scss";

const FilmForgeApplication = () => {
    return (
      <div className="filmforge">
        <div>Good morning</div>
      </div>
    );
  };


  const container = document.querySelector("#root");
  const root = createRoot(container);

  root.render(<FilmForgeApplication />);