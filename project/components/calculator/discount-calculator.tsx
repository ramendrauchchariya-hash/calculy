'use client';

import * as React from 'react';
import { InputField, ResultCard } from './shared';
import { calculateDiscount, formatINR } from '@/lib/calculations';

export function DiscountCalculator() {
  const [price, setPrice] = React.useState('1500');
  const [discount, setDiscount] = React.useState('30');

  const originalPrice = parseFloat(price) || 0;
  const discountPct = parseFloat(discount) || 0;

  const result = calculateDiscount(originalPrice, discountPct);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <InputField id="disc-price" label="Original Price" value={price} onChange={setPrice} prefix="₹" hint="Price before discount" />
        <InputField id="disc-pct" label="Discount Percentage" value={discount} onChange={setDiscount} suffix="%" hint="Discount being offered" />
      </div>

      <ResultCard
        rows={[
          { label: 'Discount Amount', value: formatINR(result.discountAmount) },
          { label: 'Final Price', value: formatINR(result.finalPrice), highlight: true },
          { label: 'You Save', value: formatINR(result.youSave) },
        ]}
      />
    </div>
  );
}
