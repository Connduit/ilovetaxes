import csv

# Open the CSV file
#with open("data/federalIncomeTaxRates2025.csv", mode="r") as file:
#with open("data/propertyTaxByCounty2025.csv", mode="r") as file:
#with open("data/propertyTaxByState.csv", mode="r") as file:
with open("data/stateIncomeTaxRates2025.csv", mode="r") as file:
    # Create a CSV reader object
    csv_reader = csv.reader(file)
    
    # Loop through the rows
    for row in csv_reader:
        print(row)  # Each row is a list of values
