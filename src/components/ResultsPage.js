import React, { useState } from 'react';
import './ResultsPage.css';

function ResultsPage({ calculationResults }) {
  const companyName = calculationResults?.companyName || 'Your Company';
  const [isExplanationOpen, setIsExplanationOpen] = useState(false);

  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  }

  // Calculate total annual loss directly
  const calculateTotalAnnualLoss = () => {
    const currentState = calculationResults?.currentState || {};
    return (
      (currentState.timeTheftLoss || 0) +
      (currentState.overtimeLoss || 0) +
      (currentState.overSchedulingLoss || 0) +
      (currentState.productivityLoss || 0) +
      (currentState.turnoverLoss || 0) +
      (currentState.callOutLoss || 0)
    );
  };

  // Calculate total annual savings directly
  const calculateTotalAnnualSavings = () => {
    const futureState = calculationResults?.futureState || {};
    return (
      (futureState.timeTheftSavings || 0) +
      (futureState.overtimeSavings || 0) +
      (futureState.overSchedulingSavings || 0) +
      (futureState.productivitySavings || 0) +
      (futureState.turnoverSavings || 0) +
      (futureState.callOutSavings || 0)
    );
  };

  return (
    <div className="main-container">
      <div className="content">
        <h1 className="main-title">{companyName} — Deputy ROI Analysis</h1>
        
        <div className="results-columns">
          {/* Left Column */}
          <div className="results-column">
            <h2 className="column-title">{companyName} Current State</h2>
            <p className="column-subtitle">Current Estimated Losses for {companyName}</p>
            
            <div className="loss-items">
              <div className="loss-item">
                <span className="loss-label">Time Theft Loss:</span>
                <span className="loss-value">
                  {formatCurrency(calculationResults?.currentState?.timeTheftLoss || 0)} USD
                </span>
              </div>
              <div className="loss-item">
                <span className="loss-label">Overtime Loss:</span>
                <span className="loss-value">
                  {formatCurrency(calculationResults?.currentState?.overtimeLoss || 0)} USD
                </span>
              </div>
              <div className="loss-item">
                <span className="loss-label">Over-scheduling Loss:</span>
                <span className="loss-value">
                  {formatCurrency(calculationResults?.currentState?.overSchedulingLoss || 0)} USD
                </span>
              </div>
              <div className="loss-item">
                <span className="loss-label">Productivity Loss:</span>
                <span className="loss-value">
                  {formatCurrency(calculationResults?.currentState?.productivityLoss || 0)} USD
                </span>
              </div>
              <div className="loss-item">
                <span className="loss-label">Employee Turnover Loss:</span>
                <span className="loss-value">
                  {formatCurrency(calculationResults?.currentState?.turnoverLoss || 0)} USD
                </span>
              </div>
              <div className="loss-item">
                <span className="loss-label">Employee Call-out Loss:</span>
                <span className="loss-value">
                  {formatCurrency(calculationResults?.currentState?.callOutLoss || 0)} USD
                </span>
              </div>
            </div>

            <div className="divider"></div>

            <div className="loss-item total">
              <span className="loss-label">Total Annual Loss:</span>
              <span className="loss-value">
                {formatCurrency(calculateTotalAnnualLoss())} USD
              </span>
            </div>
          </div>

          {/* Right Column */}
          <div className="results-column">
            <h2 className="column-title">Future State with Deputy</h2>
            <p className="column-subtitle">Projected Annual Savings for {companyName}</p>
            
            <div className="savings-items">
              <div className="savings-item">
                <span className="savings-label">Time Theft Savings:</span>
                <span className="savings-value">
                  {formatCurrency(calculationResults?.futureState?.timeTheftSavings || 0)} USD
                </span>
              </div>
              <div className="savings-item">
                <span className="savings-label">Overtime Savings:</span>
                <span className="savings-value">
                  {formatCurrency(calculationResults?.futureState?.overtimeSavings || 0)} USD
                </span>
              </div>
              <div className="savings-item">
                <span className="savings-label">Over-scheduling Savings:</span>
                <span className="savings-value">
                  {formatCurrency(calculationResults?.futureState?.overSchedulingSavings || 0)} USD
                </span>
              </div>
              <div className="savings-item">
                <span className="savings-label">Productivity Savings:</span>
                <span className="savings-value">
                  {formatCurrency(calculationResults?.futureState?.productivitySavings || 0)} USD
                </span>
              </div>
              <div className="savings-item">
                <span className="savings-label">Employee Turnover Savings:</span>
                <span className="savings-value">
                  {formatCurrency(calculationResults?.futureState?.turnoverSavings || 0)} USD
                </span>
              </div>
              <div className="savings-item">
                <span className="savings-label">Employee Call-out Savings:</span>
                <span className="savings-value">
                  {formatCurrency(calculationResults?.futureState?.callOutSavings || 0)} USD
                </span>
              </div>
            </div>

            <div className="divider"></div>

            <div className="savings-item total">
              <span className="savings-label">Projected Annual Savings:</span>
              <span className="savings-value">
                {formatCurrency(calculateTotalAnnualSavings())} USD
              </span>
            </div>
          </div>
        </div>

        {/* New Compliance Risk Analysis Section */}
        <div className="compliance-section">
          <h2 className="section-title">{companyName} Compliance Risk Analysis</h2>
          
          <div className="compliance-items">
            <div className="compliance-item">
              <span className="compliance-label">Meal and Rest Violations:</span>
              <span className="compliance-value">
                {formatCurrency(calculationResults?.complianceRisk?.mealRestViolations || 0)} USD
              </span>
            </div>
            <div className="compliance-item">
              <span className="compliance-label">Fair Workweek Violations:</span>
              <span className="compliance-value">
                {formatCurrency(calculationResults?.complianceRisk?.fairWorkweekViolations || 0)} USD
              </span>
            </div>
          </div>

          <div className="divider"></div>

          <div className="compliance-item total">
            <span className="compliance-label">Total Meal & Rest + Fair Workweek Compliance Risk:</span>
            <span className="compliance-value">
              {formatCurrency(calculationResults?.complianceRisk?.totalComplianceRisk || 0)} USD
            </span>
          </div>
        </div>

        {/* Add disclaimer */}
        <div className="disclaimer">
          These calculations are projections based on industry research and/or your provided data.<br />
          They are meant for educational purposes only and do not constitute a guarantee of performance.
        </div>

        {/* Add explanation dropdown */}
        <div className="explanation-dropdown">
          <button 
            className="explanation-toggle"
            onClick={() => setIsExplanationOpen(!isExplanationOpen)}
          >
            <span>Explanation of calculations</span>
            <span className={`arrow-icon ${isExplanationOpen ? 'open' : ''}`}>▼</span>
          </button>
          
          <div className={`explanation-content ${isExplanationOpen ? 'open' : ''}`}>
            <div className="calculation-explanation">
              <h3>Time Theft Calculation</h3>
              <ol>
                <li>Calculate fully-burdened labor cost (Average wage × 1.3)</li>
                <li>Calculate cost per minute (Fully-burdened rate ÷ 60)</li>
                <li>Calculate annual time theft (Minutes per day × Days per week × 52 weeks × Number of employees)</li>
                <li>Calculate annual cost (Total minutes × Cost per minute)</li>
                <li>Calculate savings with Deputy (Total cost × Improvement rate)</li>
              </ol>
              <p className="note">Note: Fully-burdened cost includes base wage plus an estimated 30% for taxes and benefits.</p>

              <h3>Overtime Calculation</h3>
              <ol>
                <li>Calculate base overtime cost (Annual payroll × Overtime percentage)</li>
                <li>Calculate savings with Deputy (Total cost × Improvement rate)</li>
              </ol>

              <h3>Over Scheduling Calculation</h3>
              <ol>
                <li>Calculate weekly excess hours per location (Actual hours - Budgeted hours per week)</li>
                <li>Calculate total weekly excess hours (Weekly excess hours × Number of locations)</li>
                <li>Calculate weekly cost (Total weekly excess hours × Average wage)</li>
                <li>Calculate annual cost (Weekly cost × 52 weeks)</li>
                <li>Calculate savings with Deputy (Total cost × Improvement rate)</li>
              </ol>

              <h3>Scheduling & Timekeeping Productivity Calculation</h3>
              <ol>
                <li>Calculate fully-burdened hourly rate (Annual salary × 1.3 ÷ 2080)</li>
                <li>Calculate total weekly hours (Hours per location × Number of locations)</li>
                <li>Calculate annual cost (Total weekly hours × Hourly rate × 52 weeks)</li>
                <li>Calculate savings with Deputy (Total cost × Improvement rate)</li>
              </ol>
              <p className="note">Note: Fully-burdened cost includes base salary plus an estimated 30% for taxes and benefits.</p>
              <p className="note">Note: Calculations include time spent on both scheduling, timekeeping, and payroll management.</p>

              <h3>Employee Turnover Calculation</h3>
              <ol>
                <li>Calculate quarterly employee turnover (Total employees × Turnover rate)</li>
                <li>Calculate annual turnover (Quarterly turnover × 4)</li>
                <li>Calculate replacement cost (Annual turnover × Cost per replacement)</li>
                <li>Calculate savings with Deputy (Total cost × Improvement rate)</li>
              </ol>
              <p className="note">Note: Cost to replace includes direct and indirect costs like advertising, recruiting, salaries, training, ramp, lost productivity, lost revenue, etc.</p>
              <p className="note">Note: The average cost to replace an hourly employee is $4,700 based on industry research.</p>

              <h3>Employee Call-outs Calculation</h3>
              <ol>
                <li>Calculate revenue loss per shift (Revenue per hour × Shift duration)</li>
                <li>Calculate weekly loss per location (Revenue loss per shift × Call-outs per week)</li>
                <li>Calculate annual loss (Weekly loss × Number of locations × 52 weeks)</li>
                <li>Calculate savings with Deputy (Total cost × Improvement rate)</li>
              </ol>
              <p className="note">Note: Call-outs impact both labor costs and potential revenue.</p>
              <p className="note">Note: Calculations assume each call-out results in lost revenue for the entire shift.</p>

              <h3>Meal & Rest Compliance Risk Calculation</h3>
              <ol>
                <li>Calculate penalty per violation (Average wage × 2)</li>
                <li>Calculate affected employees (Total employees × 48%)</li>
                <li>Calculate annual risk (Penalty × Affected employees × 52 weeks)</li>
              </ol>
              <p className="note">Note: This calculation is based on research indicating 48% of employees skip lunch and one break at least once per week</p>
              <p className="note">Note: The calculation assumes California penalty rates apply</p>
              <p className="note">Note: This is meant to be a benchmark; actual legal risk may be higher or lower</p>
              <p className="note">Note: These calculations do not include legal representation costs, litigation or auditing expenses, backpay (regular time and overtime,) and administrative time and resources</p>

              <h3>Fair Workweek Compliance Risk Calculation</h3>
              <ol>
                <li>Calculate total affected employees (Average employees per location × Number of FWW locations)</li>
                <li>Calculate annual days (Days open per week × 52 weeks)</li>
                <li>Calculate low-end annual risk (Total employees × Annual days × $300)</li>
              </ol>
              <p className="note">Note: Calculations are based on low-end of fair workweek violation penalties ($300) for each day the business operates. The typical range is $300-$500 per day/violation per employee.</p>
              <p className="note">Note: The calculation assumes California penalty rates apply</p>
              <p className="note">Note: This is meant to be a benchmark; actual legal risk may be higher or lower</p>
              <p className="note">Note: These calculations do not include legal representation costs, litigation or auditing expenses, backpay (regular time and overtime,) administrative time and resources</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultsPage; 