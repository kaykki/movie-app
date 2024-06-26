import {BrowserRouter, Routes, Route} from 'react-router-dom';

// Components
import Header from '../components/Header';
import Footer from '../components/Footer';
// Pages
import PageHome from '../pages/PageHome';
import PageAbout from '../pages/PageAbout';
import PageFavourites from '../pages/PageFavourites';
import PageNotFound from '../pages/PageNotFound';
import PageMovieInfo from '../pages/PageMovieInfo';

function AppRouter() {
  return (
    <BrowserRouter basename='/seenema/'>
      <div className="wrapper">
        <Header />
          <Routes>
            <Route path="/" exact element={<PageHome />} />
            <Route path="/about" element={<PageAbout />} />
            <Route path="/favourites" element={<PageFavourites />} />
            <Route path="/movieinfo/:id" element={<PageMovieInfo />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;