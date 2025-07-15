"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PaymentsCollections = () => (
    <Card>
        <CardHeader>
            <CardTitle>المدفوعات والتحصيلات</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-gray-600">تسجيل عمليات الدفع والاستلام نقدًا أو عبر البنك.</p>
        </CardContent>
    </Card>
);

export default PaymentsCollections;
