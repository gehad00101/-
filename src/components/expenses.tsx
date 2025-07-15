"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Expenses = () => (
    <Card>
        <CardHeader>
            <CardTitle>المصروفات</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-gray-600">تسجيل المصروفات التشغيلية والعامة.</p>
        </CardContent>
    </Card>
);

export default Expenses;
