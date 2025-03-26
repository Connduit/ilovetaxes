# TODO-DESIGN

### Notes

    - Washington has 7% on capital gains
    - California Formula Example: =IF(inputs!B1  > 1000000, 0.133, IF(inputs!B1 > 721314, 0.123, IF(inputs!B1 > 432787, 0.113, IF(inputs!B1 > 360659, 0.103, IF(inputs!B1 > 70606, 0.093, IF(inputs!B1 >55866, 0.08, IF(inputs!B1>40245, 0.06, IF(inputs!B1>25499,0.04,IF(inputs!B1>10756,0.02,0.01)))))))))

### Design Decision

    - have values (like tax rates) saved off in a csv or should they be pulled from a website every time?

### Resources

    - Federal Income Tax:
        - https://taxfoundation.org/data/all/federal/2025-tax-brackets/
        
    - State Income Tax:
        - https://taxfoundation.org/data/all/state/state-income-tax-rates/

    - State Sales Tax:
        - https://www.salestaxhandbook.com/
        - https://taxfoundation.org/data/all/state/sales-tax-rates/

    - Property Tax:
        - https://taxfoundation.org/data/all/state/property-taxes-by-state-county/
