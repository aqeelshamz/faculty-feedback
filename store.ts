import { create } from "zustand";
import { serverURL } from "./lib/utils";
import axios from "axios";
import { toast } from "sonner";

type UserStore = {
    email: string;
    password: string;
    type: string;
    signIn: (email: String, password: String) => {};
    logOut: () => void;
};

type FeedbackStore = {
    feedbacks: string;
    setFeedbacks: () => void;
    fetchFeedbacks: () => void;
    addFeedback: () => void;
};

type ProgramStore = {
    programs: {
        program: string;
        paymentStatus: string;
        totalAmount: string;
        paymentMethod: string;
    }[];
    setPrograms: () => void;
    fetchPrograms: () => void;
    addProgram: () => void;
};

type StudentStore = {
    students: {
        student: string;
        paymentStatus: string;
        totalAmount: string;
        paymentMethod: string;
    }[];
    setStudents: () => void;
    fetchStudents: () => void;
    addStudent: () => void;
};

type FacultyStore = {
    faculties: {
        faculty: string;
        paymentStatus: string;
        totalAmount: string;
        paymentMethod: string;
    }[];
    setFaculties: () => void;
    fetchFaculties: () => void;
    addFaculty: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
    email: "",
    password: "",
    type: "admin",

    signIn: async (email, password) => {
        try {
            const response = await axios.post(`${serverURL}/users/login`, { email, password });
            set({ email: response.data.email, type: response.data.user.role });
            localStorage.setItem("token", response.data.token);
            window.location.href = "/dashboard";
        } catch (err: any) {
            toast.error(err.response.data.message);
        }
    },

    logOut: () => {
        set({ email: "", password: "", type: "" });
        localStorage.clear();
        window.location.href = "/signin";
    },
}));

export const useFeedbackStore = create<FeedbackStore>((set) => ({
    feedbacks: "your feedback",

    setFeedbacks: () => {
        set({ feedbacks: "my feedback" });
    },

    fetchFeedbacks: () => { },

    addFeedback: () => { },
}));

export const useProgramStore = create<ProgramStore>((set) => ({
    programs: [
        {
            program: "INV001",
            paymentStatus: "Paid",
            totalAmount: "$250.00",
            paymentMethod: "Credit Card",
        },
        {
            program: "INV002",
            paymentStatus: "Pending",
            totalAmount: "$150.00",
            paymentMethod: "PayPal",
        },
        {
            program: "INV003",
            paymentStatus: "Unpaid",
            totalAmount: "$350.00",
            paymentMethod: "Bank Transfer",
        },
        {
            program: "INV004",
            paymentStatus: "Paid",
            totalAmount: "$450.00",
            paymentMethod: "Credit Card",
        },
        {
            program: "INV005",
            paymentStatus: "Paid",
            totalAmount: "$550.00",
            paymentMethod: "PayPal",
        },
        {
            program: "INV006",
            paymentStatus: "Pending",
            totalAmount: "$200.00",
            paymentMethod: "Bank Transfer",
        },
        {
            program: "INV007",
            paymentStatus: "Unpaid",
            totalAmount: "$300.00",
            paymentMethod: "Credit Card",
        },
    ],

    setPrograms: () => { },

    fetchPrograms: () => { },

    addProgram: () => { },
}));

export const useStudentStore = create<StudentStore>((set) => ({
    students: [
        {
            student: "INV001",
            paymentStatus: "Paid",
            totalAmount: "$250.00",
            paymentMethod: "Credit Card",
        },
        {
            student: "INV002",
            paymentStatus: "Pending",
            totalAmount: "$150.00",
            paymentMethod: "PayPal",
        },
        {
            student: "INV003",
            paymentStatus: "Unpaid",
            totalAmount: "$350.00",
            paymentMethod: "Bank Transfer",
        },
        {
            student: "INV004",
            paymentStatus: "Paid",
            totalAmount: "$450.00",
            paymentMethod: "Credit Card",
        },
        {
            student: "INV005",
            paymentStatus: "Paid",
            totalAmount: "$550.00",
            paymentMethod: "PayPal",
        },
        {
            student: "INV006",
            paymentStatus: "Pending",
            totalAmount: "$200.00",
            paymentMethod: "Bank Transfer",
        },
        {
            student: "INV007",
            paymentStatus: "Unpaid",
            totalAmount: "$300.00",
            paymentMethod: "Credit Card",
        },
    ],

    setStudents: () => { },

    fetchStudents: () => { },

    addStudent: () => { },
}));

export const useFacultyStore = create<FacultyStore>((set) => ({
    faculties: [
        {
            faculty: "INV001",
            paymentStatus: "Paid",
            totalAmount: "$250.00",
            paymentMethod: "Credit Card",
        },
        {
            faculty: "INV002",
            paymentStatus: "Pending",
            totalAmount: "$150.00",
            paymentMethod: "PayPal",
        },
        {
            faculty: "INV003",
            paymentStatus: "Unpaid",
            totalAmount: "$350.00",
            paymentMethod: "Bank Transfer",
        },
        {
            faculty: "INV004",
            paymentStatus: "Paid",
            totalAmount: "$450.00",
            paymentMethod: "Credit Card",
        },
        {
            faculty: "INV005",
            paymentStatus: "Paid",
            totalAmount: "$550.00",
            paymentMethod: "PayPal",
        },
        {
            faculty: "INV006",
            paymentStatus: "Pending",
            totalAmount: "$200.00",
            paymentMethod: "Bank Transfer",
        },
        {
            faculty: "INV007",
            paymentStatus: "Unpaid",
            totalAmount: "$300.00",
            paymentMethod: "Credit Card",
        },
    ],

    setFaculties: () => { },

    fetchFaculties: () => { },

    addFaculty: () => { },
}));
