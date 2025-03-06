import React, { useState } from 'react';
import Navbar from './components/Navbar';
import MainContainer from './components/MainContainer';
import LoadingPage from './components/LoadingPage';
import ResultsPage from './components/ResultsPage';
import CalculatorService from './services/calculatorService';
import './App.css';

function App() {
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [calculationResults, setCalculationResults] = useState(null);
  
  const defaultSettings = {
    timeTheftImprovement: '25',
    overtimeImprovement: '15',
    overSchedulingImprovement: '15',
    schedulingImprovement: '25',
    turnoverImprovement: '25',
    calloutImprovement: '25'
  };

  const handleLogoClick = () => {
    setIsCalculating(false);
    setShowResults(false);
    setCalculationResults(null);
  };

  const handleCalculate = async (calculatorInputs) => {
    console.log('Starting calculation...');
    setIsCalculating(true); // This should trigger LoadingPage
    
    try {
      // Add artificial delay to see loading state (increased from 2000 to 4000 ms)
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      const calculator = new CalculatorService(calculatorInputs);
      const results = await calculator.calculateAll();
      
      setCalculationResults({
        companyName: calculatorInputs.companyName || 'Your Company',
        ...results
      });
      
      setShowResults(true);
      setIsCalculating(false);
    } catch (error) {
      console.error('Calculation error:', error);
      setIsCalculating(false);
    }
  };

  const renderContent = () => {
    console.log('Current state:', { isCalculating, showResults });
    
    if (isCalculating) {
      return <LoadingPage />;
    }
    if (showResults) {
      return <ResultsPage calculationResults={calculationResults} />;
    }
    return <MainContainer onCalculate={handleCalculate} defaultSettings={defaultSettings} />;
  };

  return (
    <div className="app">
      <Navbar onLogoClick={handleLogoClick} />
      {renderContent()}
    </div>
  );
}

export default App; 