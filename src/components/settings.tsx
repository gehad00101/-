"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Settings = () => (
    <Card>
        <CardHeader>
            <CardTitle>الإعدادات</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-gray-600">إعداد النظام الأساسي، اللغة، التقويم، الفروع، تنسيقات الفواتير.</p>
        </CardContent>
    </Card>
);

export default Settings;
