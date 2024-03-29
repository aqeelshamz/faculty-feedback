import { create } from "zustand";
import { serverURL } from "./lib/utils";
import axios from "axios";
import { toast } from "sonner";
import { Key } from "react";

type UserStore = {
    email: string;
    password: string;
    role: string;
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
        [x: string]: Key | null | undefined;
        name: string;
        hod: string;
    }[];
    setPrograms: () => void;
    fetchPrograms: () => void;
    addProgram: () => void;
};

type StudentStore = {
    students: {
        [x: string]: Key | null | undefined;
        name: string;
        admNo: string;
        email: string;
        phone: string;
        address: string;
        rollNo: string;
        batchId: string;
        collegeId: string;
        userId: string;
    }[];

    setStudents: (
        name: string,
        admNo: string,
        email: string,
        phone: string,
        address: string,
        rollNo: string,
        batchId: string,
        collegeId: string,
        userId: string,
    ) => void;
    fetchStudents: () => void;
    addStudent: () => void;
};

type FacultyStore = {
    faculties: {
        [x: string]: Key | null | undefined;
        name: string;
        email: string;
        title: string;
        deptId: string;
        role: string;
        collegeId: string;
        userId: string;
    }[];
    setFaculties: () => void;
    fetchFaculties: () => void;
    addFaculty: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
    email: "",
    password: "",
    role: "admin",

    signIn: async (email, password) => {
        try {
            const response = await axios.post(`${serverURL}/users/login`, { email, password });
            set({ email: response.data.user.email, role: response.data.user.role });
            localStorage.setItem("token", response.data.token);
            window.location.href = "/dashboard";
        } catch (err: any) {
            toast.error(err.response.data.message);
        }
    },

    logOut: () => {
        set({ email: "", password: "", role: "" });
        localStorage.clear();
        window.location.href = "/signin";
    },
}));

export const useFeedbackStore = create<FeedbackStore>((set) => ({
    feedbacks: "your feedback",

    setFeedbacks: () => {
        set({ feedbacks: "my feedback" });
    },

    fetchFeedbacks: () => {},

    addFeedback: () => {},
}));

export const useProgramStore = create<ProgramStore>((set) => ({
    programs: [
        {
            name: "B. Tech Computer Science & Engineering",
            hod: "Shibily Joseph",
        },
        {
            name: "B. Tech Mechanical Engineering",
            hod: "John Doe",
        },
        {
            name: "B. Tech Electrical Engineering",
            hod: "Jane Smith",
        },
        {
            name: "B. Tech Civil Engineering",
            hod: "Michael Johnson",
        },
        {
            name: "B. Tech Information Technology",
            hod: "Emily Brown",
        },
        {
            name: "B. Tech Electronics & Communication Engineering",
            hod: "David Wilson",
        },
        {
            name: "B. Tech Chemical Engineering",
            hod: "Sarah Anderson",
        },
        {
            name: "B. Tech Aerospace Engineering",
            hod: "Robert Martinez",
        },
        {
            name: "B. Tech Biotechnology",
            hod: "Maria Garcia",
        },
        {
            name: "B. Tech Artificial Intelligence & Data Science",
            hod: "Christopher Lee",
        },
    ],

    setPrograms: () => {},

    fetchPrograms: () => {},

    addProgram: () => {},
}));

export const useStudentStore = create<StudentStore>((set) => ({
    students: [
        {
            name: "John Doe",
            admNo: "2022001",
            email: "john.doe@example.com",
            phone: "1234567890",
            address: "123 Main Street",
            rollNo: "A001",
            batchId: "61f103f06d2f3a0012345678",
            collegeId: "61f103f06d2f3a0012345679",
            userId: "61f103f06d2f3a001234567a",
        },
        {
            name: "Jane Smith",
            admNo: "2022002",
            email: "jane.smith@example.com",
            phone: "9876543210",
            address: "456 Elm Street",
            rollNo: "A002",
            batchId: "61f103f06d2f3a0012345678",
            collegeId: "61f103f06d2f3a0012345679",
            userId: "61f103f06d2f3a001234567b",
        },
        {
            name: "Alice Johnson",
            admNo: "2022003",
            email: "alice.johnson@example.com",
            phone: "5551234567",
            address: "789 Oak Avenue",
            rollNo: "A003",
            batchId: "61f103f06d2f3a0012345678",
            collegeId: "61f103f06d2f3a0012345679",
            userId: "61f103f06d2f3a001234567c",
        },
        {
            name: "Bob Brown",
            admNo: "2022004",
            email: "bob.brown@example.com",
            phone: "1112223333",
            address: "321 Pine Road",
            rollNo: "A004",
            batchId: "61f103f06d2f3a0012345678",
            collegeId: "61f103f06d2f3a0012345679",
            userId: "61f103f06d2f3a001234567d",
        },
        {
            name: "Eve Wilson",
            admNo: "2022005",
            email: "eve.wilson@example.com",
            phone: "4445556666",
            address: "555 Maple Lane",
            rollNo: "A005",
            batchId: "61f103f06d2f3a0012345678",
            collegeId: "61f103f06d2f3a0012345679",
            userId: "61f103f06d2f3a001234567e",
        },
        {
            name: "Charlie Davis",
            admNo: "2022006",
            email: "charlie.davis@example.com",
            phone: "7778889999",
            address: "777 Walnut Street",
            rollNo: "A006",
            batchId: "61f103f06d2f3a0012345678",
            collegeId: "61f103f06d2f3a0012345679",
            userId: "61f103f06d2f3a001234567f",
        },
        {
            name: "Grace Martinez",
            admNo: "2022007",
            email: "grace.martinez@example.com",
            phone: "9990001111",
            address: "999 Cedar Avenue",
            rollNo: "A007",
            batchId: "61f103f06d2f3a0012345678",
            collegeId: "61f103f06d2f3a0012345679",
            userId: "61f103f06d2f3a0012345680",
        },
        {
            name: "David Clark",
            admNo: "2022008",
            email: "david.clark@example.com",
            phone: "2223334444",
            address: "222 Birch Drive",
            rollNo: "A008",
            batchId: "61f103f06d2f3a0012345678",
            collegeId: "61f103f06d2f3a0012345679",
            userId: "61f103f06d2f3a0012345681",
        },
        {
            name: "Sarah Lee",
            admNo: "2022009",
            email: "sarah.lee@example.com",
            phone: "6667778888",
            address: "666 Pineapple Avenue",
            rollNo: "A009",
            batchId: "61f103f06d2f3a0012345678",
            collegeId: "61f103f06d2f3a0012345679",
            userId: "61f103f06d2f3a0012345682",
        },
        {
            name: "Michael Adams",
            admNo: "2022010",
            email: "michael.adams@example.com",
            phone: "8889990000",
            address: "888 Orange Street",
            rollNo: "A010",
            batchId: "61f103f06d2f3a0012345678",
            collegeId: "61f103f06d2f3a0012345679",
            userId: "61f103f06d2f3a0012345683",
        },
    ],
    setStudents: () => {},

    fetchStudents: () => {},

    addStudent: () => {},
}));

export const useFacultyStore = create<FacultyStore>((set) => ({
    faculties: [
        {
            name: "John Doe",
            email: "john.doe@example.com",
            title: "Professor",
            deptId: "613fc8f4e363996d1b2c5e0d",
            role: "teacher",
            collegeId: "613fc8f4e363996d1b2c5e0e",
            userId: "613fc8f4e363996d1b2c5e0f",
        },
        {
            name: "Jane Smith",
            email: "jane.smith@example.com",
            title: "Associate Professor",
            deptId: "613fc8f4e363996d1b2c5e0d",
            role: "teacher",
            collegeId: "613fc8f4e363996d1b2c5e0e",
            userId: "613fc8f4e363996d1b2c5e10",
        },
        {
            name: "Alice Johnson",
            email: "alice.johnson@example.com",
            title: "Assistant Professor",
            deptId: "613fc8f4e363996d1b2c5e0d",
            role: "teacher",
            collegeId: "613fc8f4e363996d1b2c5e0e",
            userId: "613fc8f4e363996d1b2c5e11",
        },
        {
            name: "Bob Brown",
            email: "bob.brown@example.com",
            title: "Lecturer",
            deptId: "613fc8f4e363996d1b2c5e0d",
            role: "teacher",
            collegeId: "613fc8f4e363996d1b2c5e0e",
            userId: "613fc8f4e363996d1b2c5e12",
        },
        {
            name: "Eve Williams",
            email: "eve.williams@example.com",
            title: "Professor",
            deptId: "613fc8f4e363996d1b2c5e0d",
            role: "teacher",
            collegeId: "613fc8f4e363996d1b2c5e0e",
            userId: "613fc8f4e363996d1b2c5e13",
        },
        {
            name: "Michael Davis",
            email: "michael.davis@example.com",
            title: "Professor",
            deptId: "613fc8f4e363996d1b2c5e0d",
            role: "hod",
            collegeId: "613fc8f4e363996d1b2c5e0e",
            userId: "613fc8f4e363996d1b2c5e14",
        },
        {
            name: "Sarah Wilson",
            email: "sarah.wilson@example.com",
            title: "Associate Professor",
            deptId: "613fc8f4e363996d1b2c5e0d",
            role: "hod",
            collegeId: "613fc8f4e363996d1b2c5e0e",
            userId: "613fc8f4e363996d1b2c5e15",
        },
        {
            name: "David Martinez",
            email: "david.martinez@example.com",
            title: "Professor",
            deptId: "613fc8f4e363996d1b2c5e0d",
            role: "hod",
            collegeId: "613fc8f4e363996d1b2c5e0e",
            userId: "613fc8f4e363996d1b2c5e16",
        },
        {
            name: "Linda Lee",
            email: "linda.lee@example.com",
            title: "Professor",
            deptId: "613fc8f4e363996d1b2c5e0d",
            role: "tutor",
            collegeId: "613fc8f4e363996d1b2c5e0e",
            userId: "613fc8f4e363996d1b2c5e17",
        },
        {
            name: "Steven Garcia",
            email: "steven.garcia@example.com",
            title: "Assistant Professor",
            deptId: "613fc8f4e363996d1b2c5e0d",
            role: "tutor",
            collegeId: "613fc8f4e363996d1b2c5e0e",
            userId: "613fc8f4e363996d1b2c5e18",
        },
    ],

    setFaculties: () => {},

    fetchFaculties: () => {},

    addFaculty: () => {},
}));
