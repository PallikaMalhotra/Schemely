"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, RotateCcw } from "lucide-react"
import type { UserProfile } from "@/types/scheme"

interface SchemeFormProps {
  onSubmit: (profile: UserProfile) => void
  isLoading: boolean
  onReset: () => void
}

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
]

const EDUCATION_LEVELS = [
  "Below Class 5",
  "Class 5",
  "Class 8",
  "Class 10",
  "Class 12",
  "Diploma",
  "Graduate",
  "Postgraduate",
  "Professional Degree",
]

const CATEGORY_OPTIONS = [
  "Student",
  "Unemployed",
  "Farmer",
  "Rural Worker",
  "Urban Worker",
  "Women",
  "Senior Citizen",
  "Entrepreneur",
  "Small Business Owner",
  "Graduate",
  "Minority",
  "BPL",
  "Dropout",
  "Youth",
  "Digital Skills",
  "Girl Child",
  "Pregnant Women",
  "Unorganized Worker",
  "Marginal Groups",
]

export function SchemeForm({ onSubmit, isLoading, onReset }: SchemeFormProps) {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    education: "",
    area: "",
    state: "",
    categories: [] as string[],
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.age || Number(formData.age) < 0 || Number(formData.age) > 100) {
      newErrors.age = "Please enter a valid age between 0 and 100"
    }
    if (!formData.gender) newErrors.gender = "Please select your gender"
    if (!formData.education) newErrors.education = "Please select your education level"
    if (!formData.area) newErrors.area = "Please select your area type"
    if (!formData.state) newErrors.state = "Please select your state"
    if (formData.categories.length === 0) {
      newErrors.categories = "Please select at least one category"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    const profile: UserProfile = {
      age: Number(formData.age),
      gender: formData.gender,
      education: formData.education,
      area: formData.area,
      state: formData.state,
      tags: formData.categories,
      categories: formData.categories,
    }

    console.log("📝 Form submitted with profile:", profile)
    onSubmit(profile)
  }

  const handleCategoryChange = (category: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      categories: checked ? [...prev.categories, category] : prev.categories.filter((c) => c !== category),
    }))
  }

  const handleReset = () => {
    setFormData({
      age: "",
      gender: "",
      education: "",
      area: "",
      state: "",
      categories: [],
    })
    setErrors({})
    onReset()
  }

  // Filter categories based on gender
  const getFilteredCategories = () => {
    if (formData.gender === "Male") {
      // Remove female-specific categories for male users
      return CATEGORY_OPTIONS.filter((category) => !["Women", "Girl Child", "Pregnant Women"].includes(category))
    }
    return CATEGORY_OPTIONS
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Find Your Schemes</CardTitle>
        <CardDescription className="text-center">
          Fill in your details to get personalized government scheme recommendations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Age Input */}
          <div className="space-y-2">
            <Label htmlFor="age">Age *</Label>
            <Input
              id="age"
              type="number"
              min="0"
              max="100"
              value={formData.age}
              onChange={(e) => setFormData((prev) => ({ ...prev, age: e.target.value }))}
              placeholder="Enter your age"
              className={errors.age ? "border-red-500" : ""}
            />
            {errors.age && <p className="text-sm text-red-500">{errors.age}</p>}
          </div>

          {/* Gender Selection */}
          <div className="space-y-2">
            <Label htmlFor="gender">Gender *</Label>
            <Select
              value={formData.gender}
              onValueChange={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  gender: value,
                  // Reset categories when gender changes to avoid invalid selections
                  categories: prev.categories.filter((cat) => {
                    if (value === "Male") {
                      return !["Women", "Girl Child", "Pregnant Women"].includes(cat)
                    }
                    return true
                  }),
                }))
              }}
            >
              <SelectTrigger className={errors.gender ? "border-red-500" : ""}>
                <SelectValue placeholder="Select your gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.gender && <p className="text-sm text-red-500">{errors.gender}</p>}
          </div>

          {/* Education Level */}
          <div className="space-y-2">
            <Label htmlFor="education">Education Level *</Label>
            <Select
              value={formData.education}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, education: value }))}
            >
              <SelectTrigger className={errors.education ? "border-red-500" : ""}>
                <SelectValue placeholder="Select your education level" />
              </SelectTrigger>
              <SelectContent>
                {EDUCATION_LEVELS.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.education && <p className="text-sm text-red-500">{errors.education}</p>}
          </div>

          {/* Area Type */}
          <div className="space-y-2">
            <Label htmlFor="area">Area Type *</Label>
            <Select value={formData.area} onValueChange={(value) => setFormData((prev) => ({ ...prev, area: value }))}>
              <SelectTrigger className={errors.area ? "border-red-500" : ""}>
                <SelectValue placeholder="Select your area type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Rural">Rural</SelectItem>
                <SelectItem value="Urban">Urban</SelectItem>
              </SelectContent>
            </Select>
            {errors.area && <p className="text-sm text-red-500">{errors.area}</p>}
          </div>

          {/* State Selection */}
          <div className="space-y-2">
            <Label htmlFor="state">State *</Label>
            <Select
              value={formData.state}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, state: value }))}
            >
              <SelectTrigger className={errors.state ? "border-red-500" : ""}>
                <SelectValue placeholder="Select your state" />
              </SelectTrigger>
              <SelectContent>
                {INDIAN_STATES.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.state && <p className="text-sm text-red-500">{errors.state}</p>}
          </div>

          {/* Categories Selection */}
          <div className="space-y-3">
            <Label>Categories/Tags * (Select all that apply)</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {getFilteredCategories().map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={formData.categories.includes(category)}
                    onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                  />
                  <Label htmlFor={category} className="text-sm font-normal cursor-pointer">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
            {errors.categories && <p className="text-sm text-red-500">{errors.categories}</p>}
            {formData.categories.length > 0 && (
              <div className="text-sm text-gray-600">Selected: {formData.categories.join(", ")}</div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={isLoading} className="flex-1 bg-blue-600 hover:bg-blue-700">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                "Find Schemes"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              disabled={isLoading}
              className="flex items-center bg-transparent"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
