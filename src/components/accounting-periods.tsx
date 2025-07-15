"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AccountingPeriods = () => (
    <Card>
        <CardHeader>
            <CardTitle>الفترات المحاسبية</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-gray-600">فتح وإقفال الفترات المحاسبية ومراقبتها.</p>
        </CardContent>
    </Card>
);

export default AccountingPeriods;
