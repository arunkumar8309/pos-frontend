
import React, { lazy, Suspense, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import Loader from './Components/Loader/Loader';
const App = lazy(() => import('./App'));

function IndexComponent() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowLoader(false);
    }, 1000); 
  }, []);

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          {showLoader ? <Loader /> : <App />}
        </Suspense>
      </BrowserRouter>
    </React.StrictMode>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<IndexComponent />);


