import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Welcome } from './pages/Welcome';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { AboutEnvironment } from './pages/AboutEnvironment';
import { AboutProducts } from './pages/AboutProducts';
import { AboutRental } from './pages/AboutRental';
import { VillageActivities } from './pages/VillageActivities';
import { VillageStay } from './pages/VillageStay';
import { VillageWorkSwap } from './pages/VillageWorkSwap';
import { VillageTraffic } from './pages/VillageTraffic';
import { Stories } from './pages/Stories';
import { Services } from './pages/Services';
import { Contact } from './pages/Contact';
import { BookingStay } from './pages/BookingStay'; // Added BookingStay import

import { ScrollToTop } from './components/ScrollToTop';
import { VillageMap } from './pages/VillageMap';

function App() {
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/about/environment" element={<AboutEnvironment />} />
                <Route path="/stories" element={<Stories />} />
                <Route path="/services" element={<Services />} />
                <Route path="/about/rental" element={<AboutRental />} />
                <Route path="/services/rental" element={<AboutRental />} /> {/* Legacy Redirect Support */}
                <Route path="/village/activities" element={<VillageActivities />} />
                <Route path="/services/activity" element={<VillageActivities />} /> {/* Legacy Redirect Support */}
                <Route path="/village/stay" element={<VillageStay />} />
                <Route path="/services/stay" element={<VillageStay />} /> {/* Legacy Redirect Support */}
                <Route path="/village/work-swap" element={<VillageWorkSwap />} />
                <Route path="/services/work-swap" element={<VillageWorkSwap />} /> {/* Legacy Redirect Support */}
                <Route path="/village/traffic" element={<VillageTraffic />} />
                <Route path="/village/map" element={<VillageMap />} />
                <Route path="/products" element={<AboutProducts />} />
                <Route path="/booking/stay" element={<BookingStay />} /> {/* Added BookingStay route */}
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </Router>
    )
}

export default App
