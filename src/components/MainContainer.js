import React, { useState } from 'react';
import './MainContainer.css';

function MainContainer({ onCalculate, defaultSettings }) {
  const [calculatorInputs, setCalculatorInputs] = useState({
    // General Information
    companyName: '',
    totalHourlyEmployees: '',
    averageHourlyWage: '',
    numberOfLocations: '',
    daysOpenPerWeek: '',

    // Time Theft Information
    averageTimeTheftPerDay: '',

    // Overtime Information
    trailingPayroll: '',
    overtimePercentage: '',

    // Over-Scheduling Information
    budgetedHoursPerLocation: '',
    actualHoursPerLocation: '',

    // Productivity Information
    hoursSpentOnSchedules: '',
    schedulingManagerSalary: '',

    // Turnover Information
    quarterlyTurnover: '',
    replacementCost: '',

    // Call-out Information
    revenuePerLaborHour: '',
    averageShiftDuration: '',
    callOutsPerWeek: '',

    // Compliance Information
    averageEmployeesPerLocation: '',
    fairWorkweekLocations: '',

    // Improvement Settings with default values
    ...defaultSettings
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCalculatorInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="main-container">
      <div className="content">
        <h1 className="main-title">Deputy ROI Calculator</h1>
        
        <div className="calculator-rows">
          {/* General Information Section */}
          <div className="section-heading">General Information</div>
          <div className="calculator-row">
            <div className="row-heading">
              <h3>Company Name</h3>
              <p>Enter your company's name</p>
            </div>
            <div className="input-container">
              <input
                type="text"
                name="companyName"
                value={calculatorInputs.companyName}
                onChange={handleInputChange}
                placeholder="Enter company name"
              />
            </div>
          </div>

          <div className="calculator-row">
            <div className="row-heading">
              <h3>Total Hourly Employees</h3>
              <p>Enter the total number of hourly employees</p>
            </div>
            <div className="input-container">
              <input
                type="number"
                name="totalHourlyEmployees"
                value={calculatorInputs.totalHourlyEmployees}
                onChange={handleInputChange}
                placeholder="0"
              />
            </div>
          </div>

          <div className="calculator-row">
            <div className="row-heading">
              <h3>Average Hourly Wage</h3>
              <p>Enter the average hourly wage paid to employees</p>
            </div>
            <div className="input-container">
              <span className="currency-symbol">$</span>
              <input
                type="number"
                name="averageHourlyWage"
                value={calculatorInputs.averageHourlyWage}
                onChange={handleInputChange}
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="calculator-row">
            <div className="row-heading">
              <h3>Number of Locations</h3>
              <p>Enter the total number of business locations</p>
            </div>
            <div className="input-container">
              <input
                type="number"
                name="numberOfLocations"
                value={calculatorInputs.numberOfLocations}
                onChange={handleInputChange}
                placeholder="0"
              />
            </div>
          </div>

          <div className="calculator-row">
            <div className="row-heading">
              <h3>Days Open Per Week</h3>
              <p>Number of days your business operates per week</p>
            </div>
            <div className="input-container">
              <input
                type="number"
                name="daysOpenPerWeek"
                value={calculatorInputs.daysOpenPerWeek}
                onChange={handleInputChange}
                placeholder="0"
                min="1"
                max="7"
              />
            </div>
          </div>

          {/* Time Theft Section */}
          <div className="section-heading">Time Theft Information</div>
          <div className="calculator-row">
            <div className="row-heading">
              <h3>Average Time Theft Per Day (Minutes)</h3>
              <p>Average time theft per employee per day in minutes. Industry average: 4 minutes.</p>
            </div>
            <div className="input-container">
              <input
                type="number"
                name="averageTimeTheftPerDay"
                value={calculatorInputs.averageTimeTheftPerDay}
                onChange={handleInputChange}
                placeholder="0"
              />
            </div>
          </div>

          {/* Overtime Section */}
          <div className="section-heading">Overtime Information</div>
          <div className="calculator-row">
            <div className="row-heading">
              <h3>Trailing 12-months Payroll - All Locations</h3>
              <p>Total payroll for all locations in the past 12 months</p>
            </div>
            <div className="input-container">
              <span className="currency-symbol">$</span>
              <input
                type="number"
                name="trailingPayroll"
                value={calculatorInputs.trailingPayroll}
                onChange={handleInputChange}
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="calculator-row">
            <div className="row-heading">
              <h3>Overtime Percentage for Same Period</h3>
              <p>Percentage of overtime hours in the past 12 months</p>
            </div>
            <div className="input-container">
              <input
                type="number"
                name="overtimePercentage"
                value={calculatorInputs.overtimePercentage}
                onChange={handleInputChange}
                placeholder="0"
              />
              <span className="percentage-symbol">%</span>
            </div>
          </div>

          {/* Over-Scheduling Section */}
          <div className="section-heading">Over-Scheduling Information</div>
          <div className="calculator-row">
            <div className="row-heading">
              <h3>Average Budgeted Hours per Location per Week</h3>
              <p>Planned weekly hours per location</p>
            </div>
            <div className="input-container">
              <input
                type="number"
                name="budgetedHoursPerLocation"
                value={calculatorInputs.budgetedHoursPerLocation}
                onChange={handleInputChange}
                placeholder="0"
              />
            </div>
          </div>

          <div className="calculator-row">
            <div className="row-heading">
              <h3>Average Actual Hours per Location per Week</h3>
              <p>Actual weekly hours worked per location</p>
            </div>
            <div className="input-container">
              <input
                type="number"
                name="actualHoursPerLocation"
                value={calculatorInputs.actualHoursPerLocation}
                onChange={handleInputChange}
                placeholder="0"
              />
            </div>
          </div>

          {/* Productivity Section */}
          <div className="section-heading">Scheduling, Time & Payroll Productivity Information</div>
          <div className="calculator-row">
            <div className="row-heading">
              <h3>Hours Spent on Schedules/Timesheets per Week</h3>
              <p>Time spent managing schedules and timesheets weekly. Industry average: 6 hours.</p>
            </div>
            <div className="input-container">
              <input
                type="number"
                name="hoursSpentOnSchedules"
                value={calculatorInputs.hoursSpentOnSchedules}
                onChange={handleInputChange}
                placeholder="0"
              />
            </div>
          </div>

          <div className="calculator-row">
            <div className="row-heading">
              <h3>Average Annual Salary of a Scheduling Manager</h3>
              <p>Annual salary for scheduling management position</p>
            </div>
            <div className="input-container">
              <span className="currency-symbol">$</span>
              <input
                type="number"
                name="schedulingManagerSalary"
                value={calculatorInputs.schedulingManagerSalary}
                onChange={handleInputChange}
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Turnover Section */}
          <div className="section-heading">Employee Turnover Information</div>
          <div className="calculator-row">
            <div className="row-heading">
              <h3>Quarterly Employee Turnover</h3>
              <p>Percentage of employee turnover per quarter. Industry average: 25%-30%.</p>
            </div>
            <div className="input-container">
              <input
                type="number"
                name="quarterlyTurnover"
                value={calculatorInputs.quarterlyTurnover}
                onChange={handleInputChange}
                placeholder="0"
              />
              <span className="percentage-symbol">%</span>
            </div>
          </div>

          <div className="calculator-row">
            <div className="row-heading">
              <h3>Cost to Replace</h3>
              <p>Average cost to replace an employee. Industry average: $4,700.</p>
            </div>
            <div className="input-container">
              <span className="currency-symbol">$</span>
              <input
                type="number"
                name="replacementCost"
                value={calculatorInputs.replacementCost}
                onChange={handleInputChange}
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Call-out Section */}
          <div className="section-heading">Call-out Information</div>
          <div className="calculator-row">
            <div className="row-heading">
              <h3>Average Revenue per Labor Hour</h3>
              <p>Revenue generated per hour of labor</p>
            </div>
            <div className="input-container">
              <span className="currency-symbol">$</span>
              <input
                type="number"
                name="revenuePerLaborHour"
                value={calculatorInputs.revenuePerLaborHour}
                onChange={handleInputChange}
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="calculator-row">
            <div className="row-heading">
              <h3>Average Shift Duration</h3>
              <p>Average length of a work shift in hours</p>
            </div>
            <div className="input-container">
              <input
                type="number"
                name="averageShiftDuration"
                value={calculatorInputs.averageShiftDuration}
                onChange={handleInputChange}
                placeholder="0"
              />
            </div>
          </div>

          <div className="calculator-row">
            <div className="row-heading">
              <h3>Average Call-outs per Week per Location</h3>
              <p>Number of employee call-outs per week per location. Industry average: 4.</p>
            </div>
            <div className="input-container">
              <input
                type="number"
                name="callOutsPerWeek"
                value={calculatorInputs.callOutsPerWeek}
                onChange={handleInputChange}
                placeholder="0"
              />
            </div>
          </div>

          {/* Compliance Section */}
          <div className="section-heading">Compliance Risk Information</div>
          <div className="calculator-row">
            <div className="row-heading">
              <h3>Average Employees Per Location</h3>
              <p>Average number of employees working at each location</p>
            </div>
            <div className="input-container">
              <input
                type="number"
                name="averageEmployeesPerLocation"
                value={calculatorInputs.averageEmployeesPerLocation}
                onChange={handleInputChange}
                placeholder="0"
              />
            </div>
          </div>

          <div className="calculator-row">
            <div className="row-heading">
              <h3>Number of Locations in Fair Workweek Jurisdictions</h3>
              <p>Locations subject to fair workweek regulations</p>
            </div>
            <div className="input-container">
              <input
                type="number"
                name="fairWorkweekLocations"
                value={calculatorInputs.fairWorkweekLocations}
                onChange={handleInputChange}
                placeholder="0"
              />
            </div>
          </div>

          {/* Calculate Button */}
          <div className="calculate-button-container">
            <button 
              className="calculate-button"
              onClick={() => {
                const mappedInputs = {
                  // Time Theft inputs
                  averageWage: calculatorInputs.averageHourlyWage,
                  timeTheftMinutes: calculatorInputs.averageTimeTheftPerDay,
                  daysOpenPerWeek: calculatorInputs.daysOpenPerWeek,
                  numberOfEmployees: calculatorInputs.totalHourlyEmployees,
                  timeTheftImprovement: calculatorInputs.timeTheftImprovement,

                  // Overtime inputs
                  annualPayroll: calculatorInputs.trailingPayroll,
                  overtimePercentage: calculatorInputs.overtimePercentage,
                  overtimeImprovement: calculatorInputs.overtimeImprovement,

                  // Over-scheduling inputs
                  actualHours: calculatorInputs.actualHoursPerLocation,
                  budgetedHours: calculatorInputs.budgetedHoursPerLocation,
                  numberOfLocations: calculatorInputs.numberOfLocations,
                  overSchedulingImprovement: calculatorInputs.overSchedulingImprovement,

                  // Productivity inputs
                  annualSalary: calculatorInputs.schedulingManagerSalary,
                  hoursPerLocation: calculatorInputs.hoursSpentOnSchedules,
                  schedulingImprovement: calculatorInputs.schedulingImprovement,

                  // Turnover inputs
                  turnoverRate: calculatorInputs.quarterlyTurnover,
                  turnoverImprovement: calculatorInputs.turnoverImprovement,

                  // Call-outs inputs
                  revenuePerHour: calculatorInputs.revenuePerLaborHour,
                  shiftDuration: calculatorInputs.averageShiftDuration,
                  calloutsPerWeek: calculatorInputs.callOutsPerWeek,
                  calloutImprovement: calculatorInputs.calloutImprovement,

                  // Compliance inputs
                  averageEmployeesPerLocation: calculatorInputs.averageEmployeesPerLocation,
                  fairWorkweekLocations: calculatorInputs.fairWorkweekLocations,

                  // Company info
                  companyName: calculatorInputs.companyName
                };

                onCalculate(mappedInputs);
              }}
            >
              Calculate ROI
            </button>
          </div>

          {/* Settings Dropdown */}
          <div className="settings-dropdown">
            <button 
              className="settings-toggle"
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            >
              <span>Deputy Improvement Settings</span>
              <span className={`arrow-icon ${isSettingsOpen ? 'open' : ''}`}>▼</span>
            </button>
            
            <div className={`settings-content ${isSettingsOpen ? 'open' : ''}`}>
              <div className="calculator-row">
                <div className="row-heading">
                  <h3>Time Theft Improvement</h3>
                  <p>Expected reduction in time theft with Deputy</p>
                </div>
                <div className="input-container">
                  <input
                    type="number"
                    name="timeTheftImprovement"
                    value={calculatorInputs.timeTheftImprovement}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                    max="100"
                  />
                  <span className="percentage-symbol">%</span>
                </div>
              </div>

              <div className="calculator-row">
                <div className="row-heading">
                  <h3>Overtime Improvement</h3>
                  <p>Expected reduction in overtime costs</p>
                </div>
                <div className="input-container">
                  <input
                    type="number"
                    name="overtimeImprovement"
                    value={calculatorInputs.overtimeImprovement}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                    max="100"
                  />
                  <span className="percentage-symbol">%</span>
                </div>
              </div>

              <div className="calculator-row">
                <div className="row-heading">
                  <h3>Over-scheduling Improvement</h3>
                  <p>Expected reduction in over-scheduling instances</p>
                </div>
                <div className="input-container">
                  <input
                    type="number"
                    name="overSchedulingImprovement"
                    value={calculatorInputs.overSchedulingImprovement}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                    max="100"
                  />
                  <span className="percentage-symbol">%</span>
                </div>
              </div>

              <div className="calculator-row">
                <div className="row-heading">
                  <h3>Scheduling, Time & Payroll Improvement</h3>
                  <p>Expected improvement in scheduling and payroll efficiency</p>
                </div>
                <div className="input-container">
                  <input
                    type="number"
                    name="schedulingImprovement"
                    value={calculatorInputs.schedulingImprovement}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                    max="100"
                  />
                  <span className="percentage-symbol">%</span>
                </div>
              </div>

              <div className="calculator-row">
                <div className="row-heading">
                  <h3>Employee Turnover Improvement</h3>
                  <p>Expected reduction in employee turnover rate</p>
                </div>
                <div className="input-container">
                  <input
                    type="number"
                    name="turnoverImprovement"
                    value={calculatorInputs.turnoverImprovement}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                    max="100"
                  />
                  <span className="percentage-symbol">%</span>
                </div>
              </div>

              <div className="calculator-row">
                <div className="row-heading">
                  <h3>Employee Call-out Improvement</h3>
                  <p>Expected reduction in employee call-outs</p>
                </div>
                <div className="input-container">
                  <input
                    type="number"
                    name="calloutImprovement"
                    value={calculatorInputs.calloutImprovement}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                    max="100"
                  />
                  <span className="percentage-symbol">%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainContainer; 