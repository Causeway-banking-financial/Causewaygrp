# Islamic Finance Calculator Research

## 1. MURABAHA (Cost-Plus Financing)

### Definition
Murabaha is a cost-plus-profit sale agreement where the seller discloses the cost of the commodity and adds a known profit margin.

### Formula
```
Total Sale Price = Cost Price + Profit Amount
Profit Amount = Cost Price × Profit Rate × (Financing Period / 12)
Monthly Payment = Total Sale Price / Number of Months
Effective Annual Rate = (Profit Amount / Cost Price) × (12 / Financing Period) × 100
```

### AAOIFI Standards Reference
- AAOIFI Shariah Standard No. 8: Murabaha
- Key requirements: Full disclosure of cost, profit margin must be fixed and known

### Key Parameters
- Principal Amount (Cost Price)
- Profit Rate (Annual %)
- Financing Period (Months)
- Payment Frequency

---

## 2. IJARA (Islamic Lease)

### Definition
Ijara is a lease contract where the lessor (owner) transfers the usufruct of an asset to the lessee for an agreed period at an agreed rental.

### Formula
```
Total Lease Payments = Monthly Rent × Lease Term
Residual Value = Asset Value × (1 - Depreciation Rate)^Years
Monthly Rent = (Asset Value - Residual Value + Profit) / Lease Term
Implicit Rate = ((Total Payments - Asset Value) / Asset Value) × (12 / Term) × 100
```

### AAOIFI Standards Reference
- AAOIFI Shariah Standard No. 9: Ijarah and Ijarah Muntahia Bittamleek
- AAOIFI FAS 32: Ijarah (Accounting Standard)
- Key: Risk remains with lessor, ownership transfer at end (Muntahia Bittamleek)

### Types
1. **Operating Ijara** - Simple lease, no ownership transfer
2. **Ijara Muntahia Bittamleek** - Lease ending with ownership transfer
3. **Ijara wa Iqtina** - Lease with purchase option

---

## 3. SUKUK (Islamic Bonds)

### Definition
Sukuk are Shariah-compliant investment certificates representing ownership in tangible assets, usufruct, or services.

### Yield Calculation Formula
```
Current Yield = (Annual Coupon Payment / Current Market Price) × 100
Yield to Maturity (YTM) = Approximate using:
YTM ≈ [C + (F - P) / n] / [(F + P) / 2]

Where:
C = Annual coupon payment
F = Face value
P = Current price
n = Years to maturity
```

### Sukuk Pricing
```
Price = Σ [Coupon / (1 + r)^t] + [Face Value / (1 + r)^n]
```

### AAOIFI Standards Reference
- AAOIFI Shariah Standard No. 17: Investment Sukuk
- Types: Ijara Sukuk, Murabaha Sukuk, Musharaka Sukuk, Mudaraba Sukuk

---

## 4. ZAKAT (Wealth Purification)

### Definition
Zakat is the obligatory annual payment of 2.5% on wealth above the nisab threshold.

### Nisab Thresholds
- **Gold Nisab**: 87.48 grams (≈ 3 oz)
- **Silver Nisab**: 612.36 grams (≈ 21.5 oz)

### Formula
```
Net Zakatable Wealth = Cash + Gold + Silver + Investments + Business Assets - Liabilities
If Net Wealth ≥ Nisab: Zakat = Net Wealth × 2.5%
```

### Zakatable Assets
1. Cash and bank balances
2. Gold and silver (jewelry, bullion)
3. Stocks and investments
4. Business inventory
5. Rental income
6. Agricultural produce (different rates)

### Non-Zakatable
- Primary residence
- Personal vehicles
- Household items
- Tools of trade

---

## Implementation Notes

### User Experience
- Step-by-step wizard format
- Real-time calculation updates
- Methodology explanation panel
- Export to PDF functionality
- Save calculation history

### Compliance Features
- AAOIFI standard references
- Shariah compliance notes
- Disclaimer about consulting scholars
- Links to authoritative sources
