"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { LogOut, Edit3, Save, User } from "lucide-react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Mehmood.Hassan");
  const [email, setEmail] = useState("mehmood9395@example.com");

  const handleEditToggle = () => setIsEditing(!isEditing);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100 flex items-center justify-center p-6">
      <Card className="w-full max-w-lg shadow-2xl rounded-3xl border-amber-200 bg-white/80 backdrop-blur-md">
        <CardContent className="p-8 text-center">
          {/* Avatar */}
          <div className="flex flex-col items-center mb-6">
            <div className="h-24 w-24 rounded-full bg-amber-200 flex items-center justify-center shadow-md">
              <User className="h-12 w-12 text-amber-700" />
            </div>
            <h1 className="text-2xl font-semibold text-amber-800 mt-4">{name}</h1>
            <p className="text-gray-600">{email}</p>
          </div>

          {/* Editable Fields */}
          {isEditing ? (
            <div className="space-y-4">
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="border-amber-300 focus:ring-amber-500"
              />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="border-amber-300 focus:ring-amber-500"
              />
              <Button
                onClick={handleEditToggle}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Save className="h-4 w-4" /> Save Changes
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleEditToggle}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Edit3 className="h-4 w-4" /> Edit Profile
            </Button>
          )}

          {/* Logout and Home Buttons */}
          <div className="mt-6 flex flex-col gap-3">
            <Link href="/">
              <Button
                variant="outline"
                className="w-full border-amber-400 text-amber-700 hover:bg-amber-100 transition-all"
              >
                Go Back Home
              </Button>
            </Link>
            <Link href="/login">
             <Button
                variant="destructive"
               className="bg-red-500 hover:bg-red-600 w-full text-white flex items-center justify-center gap-2"
              >
               <LogOut className="h-4 w-4" /> Logout
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
