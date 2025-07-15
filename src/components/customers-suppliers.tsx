"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CustomersSuppliers = () => (
    <Card>
        <CardHeader>
            <CardTitle>العملاء والموردين</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-gray-600">بيانات العملاء والموردين وربطهم بالحسابات والفواتير.</p>
        </CardContent>
    </Card>
);

export default CustomersSuppliers;
