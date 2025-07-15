"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Reports = () => (
    <Card>
        <CardHeader>
            <CardTitle>التقارير</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-gray-600">هنا ستجد كل تقارير المحاسبة المهمة:</p>
            <ul className="list-disc list-inside text-gray-600 mt-2">
            <li>تقرير الأرباح والخسائر (قائمة الدخل)</li>
            <li>تقرير المركز المالي (الميزانية العمومية)</li>
            <li>تقرير التدفقات النقدية</li>
            <li>تقرير المبيعات</li>
            <li>تقرير المصروفات</li>
            <li>كشف حساب عميل / مورد</li>
            <li>تقرير القيود اليومية</li>
            <li>تقرير الحسابات العامة (بديل دفتر الأستاذ)</li>
            </ul>
        </CardContent>
    </Card>
);

export default Reports;
