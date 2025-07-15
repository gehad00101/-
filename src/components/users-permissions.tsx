"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const UsersPermissions = () => (
    <Card>
        <CardHeader>
            <CardTitle>المستخدمين والصلاحيات</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-gray-600">إنشاء مستخدمين ومنحهم صلاحيات معينة.</p>
        </CardContent>
    </Card>
);

export default UsersPermissions;
