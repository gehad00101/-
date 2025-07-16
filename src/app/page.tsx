'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound, Mail } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100" dir="rtl">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">تسجيل الدخول</CardTitle>
          <CardDescription>أدخل بياناتك للدخول إلى لوحة التحكم</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input id="email" type="email" placeholder="example@domain.com" required className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">كلمة المرور</Label>
              <Link href="#" className="text-sm text-blue-600 hover:underline" prefetch={false}>
                هل نسيت كلمة المرور؟
              </Link>
            </div>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input id="password" type="password" required className="pl-10" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full text-lg py-6" asChild>
            <Link href="/dashboard">دخول</Link>
          </Button>
          <div className="text-center text-sm">
            ليس لديك حساب؟{" "}
            <Link href="#" className="text-blue-600 hover:underline" prefetch={false}>
              إنشاء حساب جديد
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
