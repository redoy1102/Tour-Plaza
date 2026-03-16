import { useState, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "@/Redux/hooks";
import { updateStudentInList } from "@/Redux/slices/studentSlice";
import type { Student } from "@/Redux/slices/studentSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Search, Users, BookOpen, SquarePen } from "lucide-react";
import toast from "react-hot-toast";
import PageHeader from "../shared/PageHeader";
import { formatDateShort } from "@/lib/utils";
import CopyButton from "@/components/shared/CopyButton";

const Students = () => {
  const dispatch = useAppDispatch();
  const students = useAppSelector((state) => state.student.students);
  console.log("Students from Redux:", students);
  const enrollments = useAppSelector((state) => state.enrollments.items);

  const [searchQuery, setSearchQuery] = useState("");
  const [editStudent, setEditStudent] = useState<Student | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return students;
    const q = searchQuery.toLowerCase();
    return students.filter(
      (s) =>
        s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q),
    );
  }, [students, searchQuery]);

  const getEnrollmentCount = (studentId: string) =>
    enrollments.filter((e) => e.studentId === studentId).length;

  const [copied, setCopied] = useState<string | null>(null);
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(null), 2000);
  };

  const openEdit = (student: Student) => {
    setEditStudent(student);
    setEditName(student.name);
    setEditEmail(student.email);
    setEditPhone(student.phone);
  };

  const handleSaveEdit = () => {
    if (!editStudent) return;
    if (!editName.trim() || !editEmail.trim() || !editPhone.trim()) {
      toast.error("Name, email, and phone cannot be empty.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(editEmail.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!/^\+?\d{7,15}$/.test(editPhone.trim())) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    dispatch(
      updateStudentInList({
        id: editStudent.id,
        name: editName.trim(),
        email: editEmail.trim(),
        phone: editPhone.trim(),
      }),
    );
    toast.success("Student updated successfully!");
    setEditStudent(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <PageHeader>Students</PageHeader>
        <Badge variant="secondary" className="text-sm px-3 py-1">
          Total: {students.length}
        </Badge>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search by name or email..."
            className="pl-9 h-9 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      {students.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-20 text-slate-400">
          <Users className="w-12 h-12 opacity-30" />
          <p className="text-sm">No students have registered yet.</p>
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-slate-500 text-sm py-8 text-center">
          No students match your search.
        </p>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="w-10">#</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Enrolled Courses</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((student, index) => {
                const enrollmentCount = getEnrollmentCount(student.id);
                return (
                  <TableRow key={student.id} className="hover:bg-slate-50/50">
                    <TableCell className="text-slate-400 text-xs">
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                          {student.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-sm text-slate-800">
                          {student.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-slate-500">
                      <div className="flex items-center gap-3 group">
                        <span className="font-medium text-slate-600">
                          {student.email}
                        </span>

                        <CopyButton
                          copied={copied}
                          onCopy={handleCopy}
                          targetCopy={student.email}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-slate-500">
                      <div className="flex items-center gap-2 group">
                        <span className="font-medium text-slate-600">
                          {student.phone}
                        </span>

                        {student.phone && (
                          <CopyButton
                            copied={copied}
                            onCopy={handleCopy}
                            targetCopy={student.phone}
                          />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                        <span
                          className={`text-sm font-semibold ${
                            enrollmentCount > 0
                              ? "text-emerald-600"
                              : "text-slate-400"
                          }`}
                        >
                          {enrollmentCount}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-slate-500">
                      {formatDateShort(student.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <button
                        onClick={() => openEdit(student)}
                        className="p-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition cursor-pointer"
                      >
                        <SquarePen className="w-3 h-3" />
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog
        open={!!editStudent}
        onOpenChange={(open) => {
          if (!open) setEditStudent(null);
        }}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit Student</DialogTitle>
            <DialogDescription>
              Update the student's name, email, or phone number.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-slate-700">Name</Label>
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Full name"
                className="h-10"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-slate-700">
                Email
              </Label>
              <Input
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                placeholder="Email address"
                className="h-10"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-slate-700">
                Phone
              </Label>
              <Input
                type="tel"
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
                placeholder="Phone number"
                className="h-10"
              />
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditStudent(null)}
              >
                Cancel
              </Button>
              <Button size="sm" onClick={handleSaveEdit}>
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Students;
