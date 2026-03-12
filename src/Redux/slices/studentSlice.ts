import { createSlice, type PayloadAction, nanoid } from "@reduxjs/toolkit";

// NOTE: passwordHash is btoa-encoded for mock purposes ONLY.
// Replace with proper bcrypt hashing when the backend is ready.

export interface Student {
  id: string;
  name: string;
  email: string;
  passwordHash: string; // btoa(password) — dev mock, NOT production-safe
  createdAt: string;
}

export interface CurrentStudent {
  id: string;
  name: string;
  email: string;
}

interface StudentState {
  currentStudent: CurrentStudent | null;
  token: string | null;
  students: Student[];
}

const initialState: StudentState = {
  currentStudent: null,
  token: null,
  students: [],
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    signUp(
      state,
      action: PayloadAction<{
        id: string;
        name: string;
        email: string;
        passwordHash: string;
        token: string;
      }>,
    ) {
      const { id, name, email, passwordHash, token } = action.payload;
      const newStudent: Student = {
        id,
        name,
        email,
        passwordHash,
        createdAt: new Date().toISOString(),
      };
      state.students.push(newStudent);
      state.currentStudent = { id, name, email };
      state.token = token;
    },

    login(
      state,
      action: PayloadAction<{
        studentId: string;
        name: string;
        email: string;
        token: string;
      }>,
    ) {
      const { studentId, name, email, token } = action.payload;
      state.currentStudent = { id: studentId, name, email };
      state.token = token;
    },

    logout(state) {
      state.currentStudent = null;
      state.token = null;
    },

    updateStudentInList(
      state,
      action: PayloadAction<Partial<Student> & { id: string }>,
    ) {
      const index = state.students.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) {
        state.students[index] = { ...state.students[index], ...action.payload };
      }
    },
  },
});

export const { signUp, login, logout, updateStudentInList } =
  studentSlice.actions;

export const nanoidUtil = nanoid;

// helper selector that decodes the token and returns the user's role string
// (or null if there is no token / role).  Usage:
//   const role = useAppSelector(selectStudentRole);
// The token is a mock JWT encoded by `generateMockToken` so we can reuse the
// same decoder here.
import { decodeMockToken } from "@/lib/jwt";
import type { RootState } from "../store";

export const selectStudentRole = (state: RootState): string | null => {
  const token = state.student.token;
  if (!token) return null;
  const payload = decodeMockToken(token);
  if (!payload) return null;
  return (payload.role as string) || null;
};

export default studentSlice.reducer;
