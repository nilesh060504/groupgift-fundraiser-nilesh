import axios from 'axios';

// Axios instance ready for backend integration
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    headers: { 'Content-Type': 'application/json' },
});

// ==================== MOCK DATA ====================

export const mockFunds = [
    {
        id: 'fund_1',
        title: "Sarah's Birthday Surprise",
        description: "Let's pool together for an amazing birthday gift for Sarah! She's been eyeing that new MacBook Air. Let's make her dream come true!",
        target: 1500,
        collected: 1125,
        contributors: 8,
        deadline: '2026-04-15',
        createdAt: '2026-03-01T10:00:00Z',
        status: 'active',
        image: null,
        creator: 'Alex Johnson',
    },
    {
        id: 'fund_2',
        title: "Team Farewell Gift for Mike",
        description: "Mike is leaving the company after 5 incredible years. Let's give him a farewell gift he'll never forget!",
        target: 500,
        collected: 500,
        contributors: 12,
        deadline: '2026-03-20',
        createdAt: '2026-02-28T14:00:00Z',
        status: 'completed',
        image: null,
        creator: 'Emily Chen',
    },
    {
        id: 'fund_3',
        title: "Wedding Gift for Priya & Raj",
        description: "Priya and Raj are tying the knot! Let's contribute to their honeymoon fund and wish them a beautiful journey ahead.",
        target: 2000,
        collected: 780,
        contributors: 6,
        deadline: '2026-05-10',
        createdAt: '2026-03-10T09:00:00Z',
        status: 'active',
        image: null,
        creator: 'David Kim',
    },
    {
        id: 'fund_4',
        title: "New Baby Gift for Jess",
        description: "Jessica is expecting! Let's come together and get something special for the baby shower.",
        target: 800,
        collected: 320,
        contributors: 4,
        deadline: '2026-06-01',
        createdAt: '2026-03-15T11:00:00Z',
        status: 'active',
        image: null,
        creator: 'Maria Lopez',
    },
    {
        id: 'fund_5',
        title: "Teacher Appreciation Gift",
        description: "Mrs. Thompson has been an amazing teacher. Let's show her how much we appreciate everything she does!",
        target: 300,
        collected: 190,
        contributors: 15,
        deadline: '2026-04-30',
        createdAt: '2026-03-12T16:00:00Z',
        status: 'active',
        image: null,
        creator: 'Parent Committee',
    },
    {
        id: 'fund_6',
        title: "Graduation Gift for Tom",
        description: "Tom is graduating with honors! Let's get him something special to celebrate this milestone.",
        target: 600,
        collected: 45,
        contributors: 1,
        deadline: '2026-05-25',
        createdAt: '2026-03-17T08:00:00Z',
        status: 'active',
        image: null,
        creator: 'Lisa Wang',
    },
];

export const mockContributions = [
    { id: 'c1', fundId: 'fund_1', name: 'Alex Johnson', amount: 200, date: '2026-03-02T10:00:00Z', avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=6366f1&color=fff' },
    { id: 'c2', fundId: 'fund_1', name: 'Emily Chen', amount: 150, date: '2026-03-03T14:30:00Z', avatar: 'https://ui-avatars.com/api/?name=Emily+Chen&background=8b5cf6&color=fff' },
    { id: 'c3', fundId: 'fund_1', name: 'David Kim', amount: 200, date: '2026-03-05T09:15:00Z', avatar: 'https://ui-avatars.com/api/?name=David+Kim&background=3b82f6&color=fff' },
    { id: 'c4', fundId: 'fund_1', name: 'Maria Lopez', amount: 100, date: '2026-03-06T11:00:00Z', avatar: 'https://ui-avatars.com/api/?name=Maria+Lopez&background=ec4899&color=fff' },
    { id: 'c5', fundId: 'fund_1', name: 'James Wilson', amount: 175, date: '2026-03-08T16:45:00Z', avatar: 'https://ui-avatars.com/api/?name=James+Wilson&background=14b8a6&color=fff' },
    { id: 'c6', fundId: 'fund_1', name: 'Sophie Brown', amount: 100, date: '2026-03-10T13:20:00Z', avatar: 'https://ui-avatars.com/api/?name=Sophie+Brown&background=f59e0b&color=fff' },
    { id: 'c7', fundId: 'fund_1', name: 'Ryan Taylor', amount: 100, date: '2026-03-12T10:00:00Z', avatar: 'https://ui-avatars.com/api/?name=Ryan+Taylor&background=ef4444&color=fff' },
    { id: 'c8', fundId: 'fund_1', name: 'Nina Patel', amount: 100, date: '2026-03-14T15:30:00Z', avatar: 'https://ui-avatars.com/api/?name=Nina+Patel&background=22c55e&color=fff' },
    { id: 'c9', fundId: 'fund_2', name: 'Emily Chen', amount: 50, date: '2026-03-01T09:00:00Z', avatar: 'https://ui-avatars.com/api/?name=Emily+Chen&background=8b5cf6&color=fff' },
    { id: 'c10', fundId: 'fund_2', name: 'Alex Johnson', amount: 50, date: '2026-03-01T10:00:00Z', avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=6366f1&color=fff' },
    { id: 'c11', fundId: 'fund_2', name: 'Tom Harris', amount: 40, date: '2026-03-02T11:00:00Z', avatar: 'https://ui-avatars.com/api/?name=Tom+Harris&background=3b82f6&color=fff' },
    { id: 'c12', fundId: 'fund_2', name: 'Lisa Wang', amount: 45, date: '2026-03-03T14:00:00Z', avatar: 'https://ui-avatars.com/api/?name=Lisa+Wang&background=ec4899&color=fff' },
    { id: 'c13', fundId: 'fund_3', name: 'David Kim', amount: 200, date: '2026-03-11T10:00:00Z', avatar: 'https://ui-avatars.com/api/?name=David+Kim&background=3b82f6&color=fff' },
    { id: 'c14', fundId: 'fund_3', name: 'Sarah Adams', amount: 150, date: '2026-03-12T12:00:00Z', avatar: 'https://ui-avatars.com/api/?name=Sarah+Adams&background=14b8a6&color=fff' },
    { id: 'c15', fundId: 'fund_3', name: 'Chris Lee', amount: 130, date: '2026-03-13T15:00:00Z', avatar: 'https://ui-avatars.com/api/?name=Chris+Lee&background=f59e0b&color=fff' },
    { id: 'c16', fundId: 'fund_4', name: 'Maria Lopez', amount: 120, date: '2026-03-16T10:00:00Z', avatar: 'https://ui-avatars.com/api/?name=Maria+Lopez&background=ec4899&color=fff' },
    { id: 'c17', fundId: 'fund_4', name: 'Sophie Brown', amount: 100, date: '2026-03-16T14:00:00Z', avatar: 'https://ui-avatars.com/api/?name=Sophie+Brown&background=f59e0b&color=fff' },
    { id: 'c18', fundId: 'fund_4', name: 'Ryan Taylor', amount: 50, date: '2026-03-17T09:00:00Z', avatar: 'https://ui-avatars.com/api/?name=Ryan+Taylor&background=ef4444&color=fff' },
    { id: 'c19', fundId: 'fund_4', name: 'Nina Patel', amount: 50, date: '2026-03-17T16:00:00Z', avatar: 'https://ui-avatars.com/api/?name=Nina+Patel&background=22c55e&color=fff' },
    { id: 'c20', fundId: 'fund_5', name: 'Parent 1', amount: 15, date: '2026-03-13T10:00:00Z', avatar: 'https://ui-avatars.com/api/?name=Parent+1&background=6366f1&color=fff' },
    { id: 'c21', fundId: 'fund_5', name: 'Parent 2', amount: 20, date: '2026-03-13T11:00:00Z', avatar: 'https://ui-avatars.com/api/?name=Parent+2&background=8b5cf6&color=fff' },
];

export const mockActivities = [
    { id: 'a1', fundId: 'fund_1', type: 'created', message: 'Alex Johnson created this fund', date: '2026-03-01T10:00:00Z' },
    { id: 'a2', fundId: 'fund_1', type: 'contribution', message: 'Alex Johnson contributed $200.00', date: '2026-03-02T10:00:00Z' },
    { id: 'a3', fundId: 'fund_1', type: 'contribution', message: 'Emily Chen contributed $150.00', date: '2026-03-03T14:30:00Z' },
    { id: 'a4', fundId: 'fund_1', type: 'contribution', message: 'David Kim contributed $200.00', date: '2026-03-05T09:15:00Z' },
    { id: 'a5', fundId: 'fund_1', type: 'contribution', message: 'Maria Lopez contributed $100.00', date: '2026-03-06T11:00:00Z' },
    { id: 'a6', fundId: 'fund_1', type: 'milestone', message: 'Fund reached 50% of target! 🎉', date: '2026-03-06T11:00:00Z' },
    { id: 'a7', fundId: 'fund_1', type: 'contribution', message: 'James Wilson contributed $175.00', date: '2026-03-08T16:45:00Z' },
    { id: 'a8', fundId: 'fund_1', type: 'contribution', message: 'Sophie Brown contributed $100.00', date: '2026-03-10T13:20:00Z' },
    { id: 'a9', fundId: 'fund_1', type: 'contribution', message: 'Ryan Taylor contributed $100.00', date: '2026-03-12T10:00:00Z' },
    { id: 'a10', fundId: 'fund_1', type: 'contribution', message: 'Nina Patel contributed $100.00', date: '2026-03-14T15:30:00Z' },
    { id: 'a11', fundId: 'fund_1', type: 'milestone', message: 'Fund reached 75% of target! 🚀', date: '2026-03-14T15:30:00Z' },
    { id: 'a12', fundId: 'fund_2', type: 'created', message: 'Emily Chen created this fund', date: '2026-02-28T14:00:00Z' },
    { id: 'a13', fundId: 'fund_2', type: 'completed', message: 'Goal reached! Fund is now complete! 🎊', date: '2026-03-15T10:00:00Z' },
    { id: 'a14', fundId: 'fund_3', type: 'created', message: 'David Kim created this fund', date: '2026-03-10T09:00:00Z' },
    { id: 'a15', fundId: 'fund_3', type: 'contribution', message: 'David Kim contributed $200.00', date: '2026-03-11T10:00:00Z' },
    { id: 'a16', fundId: 'fund_4', type: 'created', message: 'Maria Lopez created this fund', date: '2026-03-15T11:00:00Z' },
];

// ==================== API FUNCTIONS (ready for backend) ====================

export const fetchFunds = async () => {
    // When backend is ready: return api.get('/funds');
    return { data: mockFunds };
};

export const fetchFundById = async (id) => {
    // When backend is ready: return api.get(`/funds/${id}`);
    return { data: mockFunds.find(f => f.id === id) };
};

export const createFundAPI = async (fundData) => {
    // When backend is ready: return api.post('/funds', fundData);
    return { data: { ...fundData, id: `fund_${Date.now()}` } };
};

export const contributeAPI = async (fundId, data) => {
    // When backend is ready: return api.post(`/funds/${fundId}/contribute`, data);
    return { data: { success: true } };
};

export default api;
