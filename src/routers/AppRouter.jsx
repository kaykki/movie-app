import { Routes, Route, BrowserRouter } from 'react-router-dom'

// Pages
import PageHome        from '../pages/PageHome'
import PageFavourites  from '../pages/PageFavourites'
import PageAbout       from '../pages/PageAbout'
import PageSingleMovie from '../pages/PageSingleMovie'
import PageNotFound    from '../pages/PageNotFound'
import Footer          from '../components/Footer'
import Header          from '../components/Header'

function AppRouter() {
  return (
    <BrowserRouter>
        <Header />
        <main>
            <Routes>
                <Route path="/" element={<PageHome />} />
                <Route path="/favourites" element={<PageFavourites />} />
                <Route path="/about" element={<PageAbout />} />
                <Route path="/movie" element={<PageSingleMovie />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </main>
        <Footer />
    </BrowserRouter>
  )
}

export default AppRouter