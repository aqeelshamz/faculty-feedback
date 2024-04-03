const departments = [
    {
        "name": "Computer Science",
        "collegeId": "6173b3a38eae680022000001",
        "vision": "To be a leader in computer science education and research.",
        "mission": "To provide high-quality education and research opportunities in computer science.",
        "createdBy": "6173b4658eae680022000002",
        "createdAt": "2024-04-03T12:00:00.000Z",
        "updatedAt": "2024-04-03T12:00:00.000Z"
    },
    {
        "name": "Electrical Engineering",
        "collegeId": "6173b3a38eae680022000001",
        "vision": "To excel in electrical engineering education and innovation.",
        "mission": "To prepare students for successful careers in electrical engineering.",
        "createdBy": "6173b4658eae680022000002",
        "createdAt": "2024-04-03T12:00:00.000Z",
        "updatedAt": "2024-04-03T12:00:00.000Z"
    },
    {
        "name": "Mechanical Engineering",
        "collegeId": "6173b3a38eae680022000001",
        "vision": "To be a center of excellence in mechanical engineering.",
        "mission": "To provide a comprehensive education in mechanical engineering.",
        "createdBy": "6173b4658eae680022000002",
        "createdAt": "2024-04-03T12:00:00.000Z",
        "updatedAt": "2024-04-03T12:00:00.000Z"
    },
    {
        "name": "Business Administration",
        "collegeId": "6173b3a38eae680022000001",
        "vision": "To produce future business leaders with integrity and innovation.",
        "mission": "To provide high-quality business education and foster entrepreneurial spirit.",
        "createdBy": "6173b4658eae680022000002",
        "createdAt": "2024-04-03T12:00:00.000Z",
        "updatedAt": "2024-04-03T12:00:00.000Z"
    },
    {
        "name": "Chemistry",
        "collegeId": "6173b3a38eae680022000001",
        "vision": "To advance knowledge in chemistry through research and education.",
        "mission": "To provide outstanding education in chemistry and conduct impactful research.",
        "createdBy": "6173b4658eae680022000002",
        "createdAt": "2024-04-03T12:00:00.000Z",
        "updatedAt": "2024-04-03T12:00:00.000Z"
    },
    {
        "name": "English Literature",
        "collegeId": "6173b3a38eae680022000001",
        "vision": "To foster a deep understanding and appreciation of literature.",
        "mission": "To provide students with a comprehensive education in English literature.",
        "createdBy": "6173b4658eae680022000002",
        "createdAt": "2024-04-03T12:00:00.000Z",
        "updatedAt": "2024-04-03T12:00:00.000Z"
    },
    {
        "name": "Physics",
        "collegeId": "6173b3a38eae680022000001",
        "vision": "To explore the fundamental laws of nature through research and education.",
        "mission": "To provide high-quality education in physics and conduct cutting-edge research.",
        "createdBy": "6173b4658eae680022000002",
        "createdAt": "2024-04-03T12:00:00.000Z",
        "updatedAt": "2024-04-03T12:00:00.000Z"
    },
    {
        "name": "Civil Engineering",
        "collegeId": "6173b3a38eae680022000001",
        "vision": "To be a global leader in civil engineering education and research.",
        "mission": "To prepare students to address the challenges of the built environment.",
        "createdBy": "6173b4658eae680022000002",
        "createdAt": "2024-04-03T12:00:00.000Z",
        "updatedAt": "2024-04-03T12:00:00.000Z"
    },
    {
        "name": "Biology",
        "collegeId": "6173b3a38eae680022000001",
        "vision": "To advance understanding of living organisms through education and research.",
        "mission": "To provide students with a strong foundation in biological sciences.",
        "createdBy": "6173b4658eae680022000002",
        "createdAt": "2024-04-03T12:00:00.000Z",
        "updatedAt": "2024-04-03T12:00:00.000Z"
    },
    {
        "name": "Psychology",
        "collegeId": "6173b3a38eae680022000001",
        "vision": "To unravel the mysteries of the human mind through research and education.",
        "mission": "To provide students with a comprehensive understanding of psychology.",
        "createdBy": "6173b4658eae680022000002",
        "createdAt": "2024-04-03T12:00:00.000Z",
        "updatedAt": "2024-04-03T12:00:00.000Z"
    }
];

const semesters = [
    {
        "name": "Semester 1",
        "number": 1,
        "collegeId": "6173b3a38eae680022000001",
        "createdAt": "2024-04-03T12:00:00.000Z",
        "updatedAt": "2024-04-03T12:00:00.000Z"
    },
    {
        "name": "Semester 2",
        "number": 2,
        "collegeId": "6173b3a38eae680022000001",
        "createdAt": "2024-04-03T12:00:00.000Z",
        "updatedAt": "2024-04-03T12:00:00.000Z"
    },
    {
        "name": "Semester 3",
        "number": 3,
        "collegeId": "6173b3a38eae680022000001",
        "createdAt": "2024-04-03T12:00:00.000Z",
        "updatedAt": "2024-04-03T12:00:00.000Z"
    },
    {
        "name": "Semester 4",
        "number": 4,
        "collegeId": "6173b3a38eae680022000001",
        "createdAt": "2024-04-03T12:00:00.000Z",
        "updatedAt": "2024-04-03T12:00:00.000Z"
    },
    {
        "name": "Semester 5",
        "number": 5,
        "collegeId": "6173b3a38eae680022000001",
        "createdAt": "2024-04-03T12:00:00.000Z",
        "updatedAt": "2024-04-03T12:00:00.000Z"
    }
];

const programs = [
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
];

export { departments, semesters, programs };