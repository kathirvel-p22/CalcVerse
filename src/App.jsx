import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Themes from './pages/Themes';
import NotFound from './pages/NotFound';
import BasicCalc from './calculators/BasicCalc';
import ScientificCalc from './calculators/ScientificCalc';
import AgeCalc from './calculators/AgeCalc';
import BMICalc from './calculators/BMICalc';
import EMICalc from './calculators/EMICalc';
import CompoundInterestCalc from './calculators/CompoundInterestCalc';
import PercentageCalc from './calculators/PercentageCalc';
import CurrencyConverter from './converters/CurrencyConverter';
import TimeConverter from './converters/TimeConverter';
import TemperatureConverter from './converters/TemperatureConverter';
import DataConverter from './converters/DataConverter';
import LengthWeightConverter from './converters/LengthWeightConverter';

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full theme-light theme-dark theme-blue theme-green theme-purple theme-orange theme-pink theme-teal flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/themes" element={<Themes />} />
            <Route path="/calculator/basic" element={<BasicCalc />} />
            <Route path="/calculator/scientific" element={<ScientificCalc />} />
            <Route path="/calculator/age" element={<AgeCalc />} />
            <Route path="/calculator/bmi" element={<BMICalc />} />
            <Route path="/calculator/emi" element={<EMICalc />} />
            <Route path="/calculator/compound" element={<CompoundInterestCalc />} />
            <Route path="/calculator/percentage" element={<PercentageCalc />} />
            <Route path="/converter/currency" element={<CurrencyConverter />} />
            <Route path="/converter/time" element={<TimeConverter />} />
            <Route path="/converter/temperature" element={<TemperatureConverter />} />
            <Route path="/converter/data" element={<DataConverter />} />
            <Route path="/converter/length" element={<LengthWeightConverter />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
