// Function to fetch and parse CSV file
async function loadCSVData() {
    debugger;
    const response = await fetch('data/2025-State-Individual-Income-Tax-Rates-and-Brackets-2025.csv'); // Replace with your actual CSV file path
    const text = await response.text();
    return parseCSV(text);
}

// Parse CSV into a usable structure
function parseCSV(text) {
    debugger;
    const rows = text.split('\n').map(row => row.trim()).filter(row => row.length > 0);
    const headers = rows[0].split('\t'); // Assuming tab-separated values
    const data = rows.slice(1).map(row => {
        const columns = row.split('\t');
        const state = columns[0];
        const singleRates = [];
        const marriedRates = [];
        let brackets = [];
        let deductions = {};
        let dependentCredits = {};

        for (let i = 1; i < columns.length; i++) {
            // Parse rate and bracket information (modify this as needed for your format)
            if (columns[i].includes('%')) {
                if (i % 2 === 1) {
                    singleRates.push(columns[i]); // Single filer rates
                } else {
                    marriedRates.push(columns[i]); // Married filer rates
                }
            }
            // Extract other data like brackets, deductions, etc.
            else if (columns[i].includes('$')) {
                brackets.push(columns[i]);
            } else if (columns[i].includes('credit')) {
                dependentCredits = { ...dependentCredits, [headers[i]]: columns[i] };
            }
        }

        deductions = {
            single: columns[columns.length - 4],
            couple: columns[columns.length - 3],
            dependent: columns[columns.length - 2],
        };

        return {
            state,
            singleRates,
            marriedRates,
            brackets,
            deductions,
            dependentCredits,
        };
    });

    return data;
}

// Function to calculate tax based on the state and filing status
async function calculateTax() {
    debugger;
    const income = parseFloat(document.getElementById("income").value);
    const state = document.getElementById("state").value;
    const status = document.getElementById("status").value;

    const taxData = await loadCSVData(); // Load the CSV data

    // Find the relevant state data
    const stateData = taxData.find(data => data.state === state);
    if (!stateData) {
        document.getElementById('result').innerText = 'State not found in tax data.';
        return;
    }

    let tax = 0;
    let taxableIncome = income;

    // Apply standard deduction for the selected filing status
    if (status === 'single') {
        taxableIncome -= parseFloat(stateData.deductions.single);
    } else if (status === 'married') {
        taxableIncome -= parseFloat(stateData.deductions.couple);
    }

    // Calculate tax based on brackets and rates
    for (let i = 0; i < stateData.brackets.length; i++) {
        const bracket = parseFloat(stateData.brackets[i].replace('$', '').replace(',', ''));
        const rate = parseFloat(stateData.singleRates[i].replace('%', ''));

        if (taxableIncome > bracket) {
            tax += (taxableIncome - bracket) * rate / 100;
            taxableIncome = bracket;
        }
    }

    document.getElementById('result').innerText = `Estimated State Income Tax: $${tax.toFixed(2)}`;
}
