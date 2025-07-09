"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  X,
  Edit,
  Trash2,
  ExternalLink,
  Calendar,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { TrackedApplication } from "@/types/scheme"
import { getTrackedApplications, updateTrackedApplication, removeTrackedApplication } from "@/lib/application-tracker"

interface ApplicationTrackerProps {
  onClose: () => void
}

const statusConfig = {
  applied: { label: "Applied", icon: CheckCircle, color: "bg-blue-100 text-blue-800" },
  "in-progress": { label: "In Progress", icon: Clock, color: "bg-yellow-100 text-yellow-800" },
  "pending-documents": { label: "Pending Documents", icon: AlertCircle, color: "bg-orange-100 text-orange-800" },
  approved: { label: "Approved", icon: CheckCircle, color: "bg-green-100 text-green-800" },
  rejected: { label: "Rejected", icon: XCircle, color: "bg-red-100 text-red-800" },
}

export function ApplicationTracker({ onClose }: ApplicationTrackerProps) {
  const [applications, setApplications] = useState<TrackedApplication[]>([])
  const [editingApp, setEditingApp] = useState<TrackedApplication | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  useEffect(() => {
    setApplications(getTrackedApplications())
  }, [])

  const handleUpdateApplication = (id: string, updates: Partial<TrackedApplication>) => {
    updateTrackedApplication(id, updates)
    setApplications(getTrackedApplications())
  }

  const handleRemoveApplication = (id: string) => {
    if (confirm("Are you sure you want to remove this application from tracking?")) {
      removeTrackedApplication(id)
      setApplications(getTrackedApplications())
    }
  }

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingApp) return

    const formData = new FormData(e.target as HTMLFormElement)
    const updates = {
      status: formData.get("status") as TrackedApplication["status"],
      applicationNumber: formData.get("applicationNumber") as string,
      notes: formData.get("notes") as string,
      nextSteps: formData.get("nextSteps") as string,
    }

    handleUpdateApplication(editingApp.id, updates)
    setIsEditDialogOpen(false)
    setEditingApp(null)
  }

  const getStatusStats = () => {
    const stats = applications.reduce(
      (acc, app) => {
        acc[app.status] = (acc[app.status] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return Object.entries(statusConfig).map(([status, config]) => ({
      status,
      label: config.label,
      count: stats[status] || 0,
      color: config.color,
    }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Application Tracker</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {applications.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Applications Tracked</h3>
              <p className="text-gray-600">Start tracking your scheme applications to monitor their progress.</p>
            </div>
          ) : (
            <>
              {/* Status Overview */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                {getStatusStats().map(({ status, label, count, color }) => (
                  <Card key={status}>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-gray-900">{count}</div>
                      <div className={`text-sm font-medium px-2 py-1 rounded-full ${color} inline-block mt-1`}>
                        {label}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Applications List */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {applications.map((app) => {
                  const StatusIcon = statusConfig[app.status].icon
                  return (
                    <Card key={app.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg leading-tight">{app.schemeName}</CardTitle>
                          <Badge className={statusConfig[app.status].color}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusConfig[app.status].label}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{app.state}</p>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          Applied: {new Date(app.appliedDate).toLocaleDateString()}
                        </div>

                        {app.applicationNumber && (
                          <div className="text-sm">
                            <span className="font-medium">App #:</span> {app.applicationNumber}
                          </div>
                        )}

                        {app.notes && (
                          <div className="text-sm">
                            <span className="font-medium">Notes:</span>
                            <p className="text-gray-600 mt-1">{app.notes}</p>
                          </div>
                        )}

                        {app.nextSteps && (
                          <div className="text-sm">
                            <span className="font-medium">Next Steps:</span>
                            <p className="text-gray-600 mt-1">{app.nextSteps}</p>
                          </div>
                        )}

                        <div className="flex gap-2 pt-2">
                          <Dialog
                            open={isEditDialogOpen && editingApp?.id === app.id}
                            onOpenChange={setIsEditDialogOpen}
                          >
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" onClick={() => setEditingApp(app)} className="flex-1">
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                              <DialogHeader>
                                <DialogTitle>Edit Application</DialogTitle>
                              </DialogHeader>
                              <form onSubmit={handleEditSubmit} className="space-y-4">
                                <div>
                                  <Label htmlFor="status">Status</Label>
                                  <Select name="status" defaultValue={app.status}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="applied">Applied</SelectItem>
                                      <SelectItem value="in-progress">In Progress</SelectItem>
                                      <SelectItem value="pending-documents">Pending Documents</SelectItem>
                                      <SelectItem value="approved">Approved</SelectItem>
                                      <SelectItem value="rejected">Rejected</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div>
                                  <Label htmlFor="applicationNumber">Application Number</Label>
                                  <Input
                                    name="applicationNumber"
                                    defaultValue={app.applicationNumber || ""}
                                    placeholder="Enter application/reference number"
                                  />
                                </div>

                                <div>
                                  <Label htmlFor="notes">Notes</Label>
                                  <Textarea
                                    name="notes"
                                    defaultValue={app.notes || ""}
                                    placeholder="Add any notes about this application"
                                    rows={3}
                                  />
                                </div>

                                <div>
                                  <Label htmlFor="nextSteps">Next Steps</Label>
                                  <Textarea
                                    name="nextSteps"
                                    defaultValue={app.nextSteps || ""}
                                    placeholder="What needs to be done next?"
                                    rows={2}
                                  />
                                </div>

                                <div className="flex gap-2">
                                  <Button type="submit" className="flex-1">
                                    Save Changes
                                  </Button>
                                  <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                                    Cancel
                                  </Button>
                                </div>
                              </form>
                            </DialogContent>
                          </Dialog>

                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(app.applicationLink, "_blank")}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>

                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRemoveApplication(app.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
