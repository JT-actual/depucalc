class CalculatorService {
  constructor(inputs) {
    this.inputs = inputs;
    this.results = {
      currentState: {
        timeTheftLoss: 0,
        overtimeLoss: 0,
        overSchedulingLoss: 0,
        productivityLoss: 0,
        turnoverLoss: 0,
        callOutLoss: 0,
        totalAnnualLoss: 0,
      },
      futureState: {
        timeTheftSavings: 0,
        overtimeSavings: 0,
        overSchedulingSavings: 0,
        productivitySavings: 0,
        turnoverSavings: 0,
        callOutSavings: 0,
        totalAnnualSavings: 0,
      },
      complianceRisk: {
        mealRestViolations: 0,
        fairWorkweekViolations: 0,
        totalComplianceRisk: 0,
      }
    };
  }

  async calculateAll() {
    // Individual calculations will be added here
    await this.calculateTimeTheft();
    await this.calculateOvertime();
    await this.calculateOverScheduling();
    await this.calculateProductivity();
    await this.calculateTurnover();
    await this.calculateCallOuts();
    await this.calculateMealRestCompliance();
    await this.calculateFairWorkweekCompliance();
    
    // Calculate totals
    this.calculateTotals();
    
    return this.results;
  }

  calculateTotals() {
    // Current state total
    this.results.currentState.totalAnnualLoss = 
      this.results.currentState.timeTheftLoss +
      this.results.currentState.overtimeLoss +
      this.results.currentState.overSchedulingLoss +
      this.results.currentState.productivityLoss +
      this.results.currentState.turnoverLoss +
      this.results.currentState.callOutLoss;

    // Future state total
    this.results.futureState.totalAnnualSavings = 
      this.results.futureState.timeTheftSavings +
      this.results.futureState.overtimeSavings +
      this.results.futureState.overSchedulingSavings +
      this.results.futureState.productivitySavings +
      this.results.futureState.turnoverSavings +
      this.results.futureState.callOutSavings;

    // Compliance risk total
    this.results.complianceRisk.totalComplianceRisk =
      this.results.complianceRisk.mealRestViolations +
      this.results.complianceRisk.fairWorkweekViolations;
  }

  validateInputs(requiredInputs) {
    return requiredInputs.every(input => 
      this.inputs.hasOwnProperty(input) && 
      this.inputs[input] !== null && 
      this.inputs[input] !== undefined && 
      this.inputs[input] !== ''
    );
  }

  async calculateTimeTheft() {
    const requiredInputs = ['averageWage', 'timeTheftMinutes', 'daysOpenPerWeek', 'numberOfEmployees', 'timeTheftImprovement'];
    if (!this.validateInputs(requiredInputs)) {
      this.results.currentState.timeTheftLoss = 0;
      this.results.futureState.timeTheftSavings = 0;
      return;
    }
    // Get required inputs with fallbacks to 0
    const averageWage = parseFloat(this.inputs.averageWage) || 0;
    const timeTheftMinutes = parseFloat(this.inputs.timeTheftMinutes) || 0;
    const daysOpenPerWeek = parseFloat(this.inputs.daysOpenPerWeek) || 0;
    const numberOfEmployees = parseFloat(this.inputs.numberOfEmployees) || 0;
    const timeTheftImprovement = parseFloat(this.inputs.timeTheftImprovement) / 100 || 0;

    // 1. Calculate fully-burdened labor cost (Average wage × 1.3)
    const fullyBurdenedRate = averageWage * 1.3;

    // 2. Calculate cost per minute (Fully-burdened rate ÷ 60)
    const costPerMinute = fullyBurdenedRate / 60;

    // 3. Calculate annual time theft (Minutes per day × Days per week × 52 weeks × Number of employees)
    const annualTimeTheftMinutes = timeTheftMinutes * daysOpenPerWeek * 52 * numberOfEmployees;

    // 4. Calculate annual cost (Total minutes × Cost per minute)
    const annualCost = annualTimeTheftMinutes * costPerMinute;

    // 5. Calculate savings with Deputy (Total cost × Improvement rate)
    const savings = annualCost * timeTheftImprovement;

    // Store results
    this.results.currentState.timeTheftLoss = annualCost;
    this.results.futureState.timeTheftSavings = savings;
  }

  async calculateOvertime() {
    const requiredInputs = ['annualPayroll', 'overtimePercentage', 'overtimeImprovement'];
    if (!this.validateInputs(requiredInputs)) {
      this.results.currentState.overtimeLoss = 0;
      this.results.futureState.overtimeSavings = 0;
      return;
    }
    // Get required inputs with fallbacks to 0
    const annualPayroll = parseFloat(this.inputs.annualPayroll) || 0;
    const overtimePercentage = parseFloat(this.inputs.overtimePercentage) / 100 || 0;
    const overtimeImprovement = parseFloat(this.inputs.overtimeImprovement) / 100 || 0;

    // 1. Calculate base overtime cost (Annual payroll × Overtime percentage)
    const annualCost = annualPayroll * overtimePercentage;

    // 2. Calculate savings with Deputy (Total cost × Improvement rate)
    const savings = annualCost * overtimeImprovement;

    // Store results
    this.results.currentState.overtimeLoss = annualCost;
    this.results.futureState.overtimeSavings = savings;
  }

  async calculateOverScheduling() {
    const requiredInputs = ['actualHours', 'budgetedHours', 'numberOfLocations', 'averageWage', 'overSchedulingImprovement'];
    if (!this.validateInputs(requiredInputs)) {
      this.results.currentState.overSchedulingLoss = 0;
      this.results.futureState.overSchedulingSavings = 0;
      return;
    }
    // Get required inputs with fallbacks to 0
    const actualHours = parseFloat(this.inputs.actualHours) || 0;
    const budgetedHours = parseFloat(this.inputs.budgetedHours) || 0;
    const numberOfLocations = parseFloat(this.inputs.numberOfLocations) || 0;
    const averageWage = parseFloat(this.inputs.averageWage) || 0;
    const overSchedulingImprovement = parseFloat(this.inputs.overSchedulingImprovement) / 100 || 0;

    // 1. Calculate weekly excess hours per location (Actual hours - Budgeted hours per week)
    const weeklyExcessHoursPerLocation = Math.max(0, actualHours - budgetedHours);

    // 2. Calculate total weekly excess hours (Weekly excess hours × Number of locations)
    const totalWeeklyExcessHours = weeklyExcessHoursPerLocation * numberOfLocations;

    // 3. Calculate weekly cost (Total weekly excess hours × Average wage)
    const weeklyCost = totalWeeklyExcessHours * averageWage;

    // 4. Calculate annual cost (Weekly cost × 52 weeks)
    const annualCost = weeklyCost * 52;

    // 5. Calculate savings with Deputy (Total cost × Improvement rate)
    const savings = annualCost * overSchedulingImprovement;

    // Store results
    this.results.currentState.overSchedulingLoss = annualCost;
    this.results.futureState.overSchedulingSavings = savings;
  }

  async calculateProductivity() {
    const requiredInputs = ['annualSalary', 'hoursPerLocation', 'numberOfLocations', 'schedulingImprovement'];
    if (!this.validateInputs(requiredInputs)) {
      this.results.currentState.productivityLoss = 0;
      this.results.futureState.productivitySavings = 0;
      return;
    }
    // Get required inputs with fallbacks to 0
    const annualSalary = parseFloat(this.inputs.annualSalary) || 0;
    const hoursPerLocation = parseFloat(this.inputs.hoursPerLocation) || 0;
    const numberOfLocations = parseFloat(this.inputs.numberOfLocations) || 0;
    const productivityImprovement = parseFloat(this.inputs.schedulingImprovement) / 100 || 0;

    // 1. Calculate fully-burdened hourly rate (Annual salary × 1.3 ÷ 2080)
    const fullyBurdenedHourlyRate = (annualSalary * 1.3) / 2080;

    // 2. Calculate total weekly hours (Hours per location × Number of locations)
    const totalWeeklyHours = hoursPerLocation * numberOfLocations;

    // 3. Calculate annual cost (Total weekly hours × Hourly rate × 52 weeks)
    const annualCost = totalWeeklyHours * fullyBurdenedHourlyRate * 52;

    // 4. Calculate savings with Deputy (Total cost × Improvement rate)
    const savings = annualCost * productivityImprovement;

    // Store results
    this.results.currentState.productivityLoss = annualCost;
    this.results.futureState.productivitySavings = savings;
  }

  async calculateTurnover() {
    const requiredInputs = ['numberOfEmployees', 'turnoverRate', 'turnoverImprovement'];
    if (!this.validateInputs(requiredInputs)) {
      this.results.currentState.turnoverLoss = 0;
      this.results.futureState.turnoverSavings = 0;
      return;
    }
    // Get required inputs with fallbacks to 0
    const totalEmployees = parseFloat(this.inputs.numberOfEmployees) || 0;
    const turnoverRate = parseFloat(this.inputs.turnoverRate) / 100 || 0;
    const turnoverImprovement = parseFloat(this.inputs.turnoverImprovement) / 100 || 0;
    const costPerReplacement = 4700; // Fixed cost based on industry research

    // 1. Calculate quarterly employee turnover (Total employees × Turnover rate)
    const quarterlyTurnover = totalEmployees * turnoverRate;

    // 2. Calculate annual turnover (Quarterly turnover × 4)
    const annualTurnover = quarterlyTurnover * 4;

    // 3. Calculate replacement cost (Annual turnover × Cost per replacement)
    const annualCost = annualTurnover * costPerReplacement;

    // 4. Calculate savings with Deputy (Total cost × Improvement rate)
    const savings = annualCost * turnoverImprovement;

    // Store results
    this.results.currentState.turnoverLoss = annualCost;
    this.results.futureState.turnoverSavings = savings;
  }

  async calculateCallOuts() {
    const requiredInputs = ['revenuePerHour', 'shiftDuration', 'calloutsPerWeek', 'numberOfLocations', 'calloutImprovement'];
    if (!this.validateInputs(requiredInputs)) {
      this.results.currentState.callOutLoss = 0;
      this.results.futureState.callOutSavings = 0;
      return;
    }
    // Get required inputs with fallbacks to 0
    const revenuePerHour = parseFloat(this.inputs.revenuePerHour) || 0;
    const shiftDuration = parseFloat(this.inputs.shiftDuration) || 0;
    const calloutsPerWeek = parseFloat(this.inputs.calloutsPerWeek) || 0;
    const numberOfLocations = parseFloat(this.inputs.numberOfLocations) || 0;
    const calloutImprovement = parseFloat(this.inputs.calloutImprovement) / 100 || 0;

    // 1. Calculate revenue loss per shift (Revenue per hour × Shift duration)
    const revenueLossPerShift = revenuePerHour * shiftDuration;

    // 2. Calculate weekly loss per location (Revenue loss per shift × Call-outs per week)
    const weeklyLossPerLocation = revenueLossPerShift * calloutsPerWeek;

    // 3. Calculate annual loss (Weekly loss × Number of locations × 52 weeks)
    const annualCost = weeklyLossPerLocation * numberOfLocations * 52;

    // 4. Calculate savings with Deputy (Total cost × Improvement rate)
    const savings = annualCost * calloutImprovement;

    // Store results
    this.results.currentState.callOutLoss = annualCost;
    this.results.futureState.callOutSavings = savings;
  }

  async calculateMealRestCompliance() {
    const requiredInputs = ['averageWage', 'numberOfEmployees'];
    if (!this.validateInputs(requiredInputs)) {
      this.results.complianceRisk.mealRestViolations = 0;
      return;
    }
    // Get required inputs with fallbacks to 0
    const averageWage = parseFloat(this.inputs.averageWage) || 0;
    const totalEmployees = parseFloat(this.inputs.numberOfEmployees) || 0;
    const AFFECTED_EMPLOYEE_PERCENTAGE = 0.48; // 48% based on research

    // 1. Calculate penalty per violation (Average wage × 2)
    const penaltyPerViolation = averageWage * 2;

    // 2. Calculate affected employees (Total employees × 48%)
    const affectedEmployees = totalEmployees * AFFECTED_EMPLOYEE_PERCENTAGE;

    // 3. Calculate annual risk (Penalty × Affected employees × 52 weeks)
    const annualRisk = penaltyPerViolation * affectedEmployees * 52;

    // Store results
    this.results.complianceRisk.mealRestViolations = annualRisk;
  }

  async calculateFairWorkweekCompliance() {
    // Required inputs based on the calculation steps
    const requiredInputs = [
      'averageEmployeesPerLocation',  // Average employees per location
      'fairWorkweekLocations',        // Number of FWW locations
      'daysOpenPerWeek'              // Days open per week
    ];

    // Validate required inputs
    if (!this.validateInputs(requiredInputs)) {
      this.results.complianceRisk.fairWorkweekViolations = 0;
      return;
    }

    // Step 1: Calculate total affected employees
    // (Average employees per location × Number of FWW locations)
    const totalAffectedEmployees = 
      parseFloat(this.inputs.averageEmployeesPerLocation) * 
      parseFloat(this.inputs.fairWorkweekLocations);

    // Step 2: Calculate annual days
    // (Days open per week × 52 weeks)
    const annualDays = parseFloat(this.inputs.daysOpenPerWeek) * 52;

    // Step 3: Calculate low-end annual risk
    // (Total employees × Annual days × $300)
    const PENALTY_AMOUNT = 300;
    const annualRisk = totalAffectedEmployees * annualDays * PENALTY_AMOUNT;

    // Store the result
    this.results.complianceRisk.fairWorkweekViolations = annualRisk;
  }

  // ... other calculation methods
}

export default CalculatorService; 