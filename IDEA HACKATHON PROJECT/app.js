// App State
let currentUser = null;
let currentPage = 'dashboard';

// Helper functions for toggling forms
function toggleToRegister() {
    console.log('toggleToRegister called');
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('registerPage').classList.remove('hidden');
}

function toggleToLogin() {
    console.log('toggleToLogin called');
    document.getElementById('registerPage').classList.add('hidden');
    document.getElementById('loginPage').classList.remove('hidden');
}

// Logout function
function logout() {
    currentUser = null;
    document.getElementById('mainApp').classList.add('hidden');
    document.getElementById('loginPage').classList.remove('hidden');
    document.getElementById('registerPage').classList.add('hidden');
    console.log('User logged out');
}

// Get registered users from localStorage
function getRegisteredUsers() {
    const users = localStorage.getItem('registeredUsers');
    return users ? JSON.parse(users) : [];
}

// Save registered users to localStorage
function saveRegisteredUsers(users) {
    localStorage.setItem('registeredUsers', JSON.stringify(users));
}

// Helper function to get user initials
function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
}

// Dashboard and other data
const dashboardData = {
    totalSubjects: 6,
    attendance: 85,
    feesPending: 12000,
    upcomingDeadlines: 3
};

const attendanceData = [
    { subject: 'Data Structures', attended: 27, total: 30, percentage: 90 },
    { subject: 'Database Management', attended: 24, total: 30, percentage: 80 },
    { subject: 'Computer Networks', attended: 26, total: 30, percentage: 87 },
    { subject: 'Operating Systems', attended: 25, total: 30, percentage: 83 },
    { subject: 'Web Development', attended: 28, total: 30, percentage: 93 },
    { subject: 'Software Engineering', attended: 23, total: 30, percentage: 77 }
];

const curriculumData = [
    {
        semester: 'Semester 3',
        subjects: [
            { code: 'CS301', name: 'Data Structures', credits: 4 },
            { code: 'CS302', name: 'Database Management Systems', credits: 4 },
            { code: 'CS303', name: 'Computer Networks', credits: 3 },
            { code: 'MA301', name: 'Discrete Mathematics', credits: 3 }
        ]
    },
    {
        semester: 'Semester 4',
        subjects: [
            { code: 'CS401', name: 'Operating Systems', credits: 4 },
            { code: 'CS402', name: 'Web Development', credits: 3 },
            { code: 'CS403', name: 'Software Engineering', credits: 4 },
            { code: 'CS404', name: 'Machine Learning', credits: 3 }
        ]
    }
];

const feesData = {
    total: 50000,
    paid: 38000,
    pending: 12000,
    history: [
        { date: '2026-01-15', amount: 20000, method: 'Online', status: 'Completed' },
        { date: '2025-08-10', amount: 18000, method: 'Bank Transfer', status: 'Completed' },
        { date: '2025-01-05', amount: 15000, method: 'Cash', status: 'Completed' }
    ]
};

const formsData = [
    {
        id: 'bonafide',
        title: 'Bonafide Certificate',
        description: 'Request a bonafide certificate for official purposes',
        icon: '📜'
    },
    {
        id: 'leave',
        title: 'Leave Application',
        description: 'Apply for leave from college',
        icon: '📝'
    },
    {
        id: 'exam',
        title: 'Exam Registration',
        description: 'Register for upcoming semester examinations',
        icon: '📋'
    }
];

// Document tracking data for performance analyzer
const requiredDocuments = [
    { id: 'bonafide', name: 'Bonafide Certificate', uploaded: true },
    { id: 'leaving', name: 'Leaving Certificate', uploaded: false },
    { id: 'tenth', name: '10th Marksheet', uploaded: true },
    { id: 'twelfth', name: '12th Marksheet', uploaded: true },
    { id: 'aadhar', name: 'Aadhar Card', uploaded: true },
    { id: 'photo', name: 'Passport Photo', uploaded: true },
    { id: 'income', name: 'Income Certificate', uploaded: false },
    { id: 'caste', name: 'Caste Certificate', uploaded: false },
    { id: 'medical', name: 'Medical Certificate', uploaded: true },
    { id: 'transfer', name: 'Transfer Certificate', uploaded: false }
];

// Previous semester results data
const semesterResults = [
    {
        semester: 'Semester 1',
        sgpa: 8.5,
        status: 'Passed',
        subjects: [
            { code: 'CS101', name: 'Programming Fundamentals', credits: 4, grade: 'A', points: 9 },
            { code: 'MA101', name: 'Engineering Mathematics I', credits: 4, grade: 'A', points: 9 },
            { code: 'PH101', name: 'Engineering Physics', credits: 3, grade: 'B+', points: 8 },
            { code: 'CH101', name: 'Engineering Chemistry', credits: 3, grade: 'A', points: 9 },
            { code: 'EE101', name: 'Basic Electrical Engineering', credits: 3, grade: 'B', points: 7 }
        ]
    },
    {
        semester: 'Semester 2',
        sgpa: 8.8,
        status: 'Passed',
        subjects: [
            { code: 'CS201', name: 'Data Structures', credits: 4, grade: 'A+', points: 10 },
            { code: 'MA201', name: 'Engineering Mathematics II', credits: 4, grade: 'A', points: 9 },
            { code: 'CS202', name: 'Digital Logic Design', credits: 3, grade: 'A', points: 9 },
            { code: 'ME201', name: 'Engineering Mechanics', credits: 3, grade: 'B+', points: 8 },
            { code: 'CS203', name: 'Computer Organization', credits: 3, grade: 'A', points: 9 }
        ]
    },
    {
        semester: 'Semester 3',
        sgpa: 9.0,
        status: 'Passed',
        subjects: [
            { code: 'CS301', name: 'Database Management Systems', credits: 4, grade: 'A+', points: 10 },
            { code: 'CS302', name: 'Computer Networks', credits: 4, grade: 'A+', points: 10 },
            { code: 'CS303', name: 'Operating Systems', credits: 3, grade: 'A', points: 9 },
            { code: 'MA301', name: 'Discrete Mathematics', credits: 3, grade: 'A', points: 9 },
            { code: 'CS304', name: 'Software Engineering', credits: 3, grade: 'A', points: 9 }
        ]
    }
];

// Initialize App
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM Content Loaded');

    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showApp();
    }

    // Login Form
    const loginFormEl = document.getElementById('loginForm');
    if (!loginFormEl) {
        console.error('Login form element not found!');
        return;
    }

    loginFormEl.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.getElementById('emailInput').value.trim();
        const password = document.getElementById('passwordInput').value;

        // Get registered users
        const users = getRegisteredUsers();
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (!user) {
            alert('No account found with this email. Please register first.');
            return;
        }

        if (user.password !== password) {
            alert('Incorrect password. Please try again.');
            return;
        }

        // Login successful
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showApp();
    });

    // Registration Form
    const registerFormEl = document.getElementById('registerForm');
    if (!registerFormEl) {
        console.error('Register form element not found!');
    } else {
        registerFormEl.addEventListener('submit', function (e) {
            e.preventDefault();
            console.log('Register form submitted');

            const name = document.getElementById('regName').value.trim();
            const email = document.getElementById('regEmail').value.trim();
            const password = document.getElementById('regPassword').value;
            const confirmPassword = document.getElementById('regConfirmPassword').value;
            const rollNumber = document.getElementById('regRollNumber').value.trim();
            const course = document.getElementById('regCourse').value;
            const year = document.getElementById('regYear').value;

            // Validation
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            if (password.length < 6) {
                alert('Password must be at least 6 characters long!');
                return;
            }

            // Check if email already exists
            const users = getRegisteredUsers();
            if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
                alert('An account with this email already exists!');
                return;
            }

            // Create new user
            const newUser = {
                name,
                email,
                password,
                rollNumber,
                course,
                year,
                initials: getInitials(name)
            };

            // Save user
            users.push(newUser);
            saveRegisteredUsers(users);

            alert('Registration successful! Please login with your credentials.');
            showLoginPage();
        });
    }

    // Show Register Page
    const showRegisterBtn = document.getElementById('showRegisterBtn');
    if (!showRegisterBtn) {
        console.error('showRegisterBtn not found!');
    } else {
        console.log('showRegisterBtn found, attaching click handler');
        showRegisterBtn.addEventListener('click', function (e) {
            e.preventDefault();
            console.log('Register button clicked');
            document.getElementById('loginPage').classList.add('hidden');
            document.getElementById('registerPage').classList.remove('hidden');
        });
    }

    // Show Login Page
    const showLoginBtn = document.getElementById('showLoginBtn');
    if (!showLoginBtn) {
        console.error('showLoginBtn not found!');
    } else {
        console.log('showLoginBtn found, attaching click handler');
        showLoginBtn.addEventListener('click', function (e) {
            e.preventDefault();
            console.log('Login button clicked');
            document.getElementById('registerPage').classList.add('hidden');
            document.getElementById('loginPage').classList.remove('hidden');
        });
    }

    // Forgot Password
    document.getElementById('forgotPasswordBtn').addEventListener('click', function () {
        const email = prompt('Enter your registered email address:');
        if (!email) return;

        const users = getRegisteredUsers();
        const user = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());

        if (!user) {
            alert('No account found with this email address.');
            return;
        }

        alert(`Password reset link has been sent to ${email}.\n\nFor this demo, your password is: ${user.password}`);
    });

    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            navigateTo(page);
        });
    });

    // Mobile menu toggle
    document.getElementById('menuToggle').addEventListener('click', function () {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('-translate-x-full');
    });

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', function () {
        localStorage.removeItem('currentUser');
        currentUser = null;
        document.getElementById('mainApp').classList.add('hidden');
        showLoginPage();
    });

    // Modal Close
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('modalBackdrop').addEventListener('click', closeModal);
});

function showLoginPage() {
    document.getElementById('registerPage').classList.add('hidden');
    document.getElementById('loginPage').classList.remove('hidden');
    // Clear form fields
    document.getElementById('emailInput').value = '';
    document.getElementById('passwordInput').value = '';
}

function showApp() {
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('registerPage').classList.add('hidden');
    document.getElementById('mainApp').classList.remove('hidden');
    document.getElementById('headerUserName').textContent = currentUser.name;

    // Update user avatar initials
    const avatarElements = document.querySelectorAll('.w-10.h-10.bg-gradient-to-br');
    avatarElements.forEach(el => {
        if (el.textContent.trim().length <= 2) {
            el.textContent = currentUser.initials;
        }
    });

    navigateTo('dashboard');
}

function navigateTo(page) {
    currentPage = page;

    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-page') === page) {
            item.classList.add('active');
        }
    });

    // Update page title
    const titles = {
        dashboard: 'Dashboard',
        profile: 'My Profile',
        attendance: 'Attendance',
        curriculum: 'Curriculum',
        fees: 'Fees & Payments',
        forms: 'Forms & Applications',
        results: 'Semester Results',
        performance: 'Document Performance',
        risk: 'Risk Analyzer',
        timetable: 'Weekly Timetable',
        studentid: 'Student ID Card'
    };
    document.getElementById('pageTitle').textContent = titles[page] || 'Dashboard';

    // Close mobile menu
    document.getElementById('sidebar').classList.add('-translate-x-full');
    document.getElementById('sidebar').classList.remove('lg:-translate-x-full');
    setTimeout(() => {
        document.getElementById('sidebar').classList.add('lg:translate-x-0');
    }, 10);

    // Load page content
    const contentArea = document.getElementById('contentArea');
    contentArea.innerHTML = getPageContent(page);
    contentArea.classList.add('fade-in');

    // Attach event listeners for the current page
    attachPageEventListeners(page);
}

function getPageContent(page) {
    switch (page) {
        case 'dashboard':
            return getDashboardContent();
        case 'profile':
            return getProfileContent();
        case 'attendance':
            return getAttendanceContent();
        case 'curriculum':
            return getCurriculumContent();
        case 'fees':
            return getFeesContent();
        case 'forms':
            return getFormsContent();
        case 'results':
            return getResultsContent();
        case 'performance':
            return getPerformanceContent();
        case 'risk':
            return getRiskAnalyzerContent();
        case 'timetable':
            return getTimetableContent();
        case 'studentid':
            return getStudentIdContent();
        default:
            return getDashboardContent();
    }
}

function getDashboardContent() {
    return `
        <div class="max-w-7xl mx-auto">
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-800 mb-2">Welcome back, ${currentUser.name}! 👋</h1>
                <p class="text-gray-600">Here's what's happening with your academics today.</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all">
                    <div class="flex items-center justify-between mb-4">
                        <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                            <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                            </svg>
                        </div>
                    </div>
                    <p class="text-2xl font-bold text-gray-800 mb-1">${dashboardData.totalSubjects}</p>
                    <p class="text-sm text-gray-600">Total Subjects</p>
                </div>
                
                <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all">
                    <div class="flex items-center justify-between mb-4">
                        <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        </div>
                    </div>
                    <p class="text-2xl font-bold text-gray-800 mb-1">${dashboardData.attendance}%</p>
                    <p class="text-sm text-gray-600">Overall Attendance</p>
                </div>
                
                <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all">
                    <div class="flex items-center justify-between mb-4">
                        <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        </div>
                    </div>
                    <p class="text-2xl font-bold text-red-600 mb-1">₹${dashboardData.feesPending.toLocaleString()}</p>
                    <p class="text-sm text-gray-600">Fees Pending</p>
                </div>
                
                <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all">
                    <div class="flex items-center justify-between mb-4">
                        <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                            </svg>
                        </div>
                    </div>
                    <p class="text-2xl font-bold text-gray-800 mb-1">${dashboardData.upcomingDeadlines}</p>
                    <p class="text-sm text-gray-600">Upcoming Deadlines</p>
                </div>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="bg-white rounded-xl shadow-md p-6">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
                    <div class="space-y-4">
                        <div class="flex items-start space-x-3">
                            <div class="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                            <div>
                                <p class="text-sm font-medium text-gray-800">Attendance marked for Web Development</p>
                                <p class="text-xs text-gray-500">2 hours ago</p>
                            </div>
                        </div>
                        <div class="flex items-start space-x-3">
                            <div class="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                            <div>
                                <p class="text-sm font-medium text-gray-800">Assignment submitted for Data Structures</p>
                                <p class="text-xs text-gray-500">1 day ago</p>
                            </div>
                        </div>
                        <div class="flex items-start space-x-3">
                            <div class="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                            <div>
                                <p class="text-sm font-medium text-gray-800">Exam schedule released</p>
                                <p class="text-xs text-gray-500">3 days ago</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-xl shadow-md p-6">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                    <div class="grid grid-cols-2 gap-4">
                        <button onclick="navigateTo('attendance')" class="p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-all text-left">
                            <div class="text-2xl mb-2">📊</div>
                            <p class="text-sm font-medium text-gray-800">View Attendance</p>
                        </button>
                        <button onclick="navigateTo('fees')" class="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-all text-left">
                            <div class="text-2xl mb-2">💳</div>
                            <p class="text-sm font-medium text-gray-800">Pay Fees</p>
                        </button>
                        <button onclick="navigateTo('forms')" class="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-all text-left">
                            <div class="text-2xl mb-2">📝</div>
                            <p class="text-sm font-medium text-gray-800">Apply Forms</p>
                        </button>
                        <button onclick="navigateTo('curriculum')" class="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-all text-left">
                            <div class="text-2xl mb-2">📚</div>
                            <p class="text-sm font-medium text-gray-800">View Curriculum</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getProfileContent() {
    return `
        <div class="max-w-4xl mx-auto">
            <div class="bg-white rounded-xl shadow-md overflow-hidden">
                <div class="h-32 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
                <div class="px-8 pb-8">
                    <div class="flex flex-col sm:flex-row items-center sm:items-end -mt-16 mb-6">
                        <div class="w-32 h-32 bg-white rounded-2xl shadow-xl flex items-center justify-center border-4 border-white mb-4 sm:mb-0">
                            <div class="w-28 h-28 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white text-4xl font-bold">
                                ${currentUser.initials}
                            </div>
                        </div>
                        <div class="sm:ml-6 text-center sm:text-left">
                            <h2 class="text-2xl font-bold text-gray-800">${currentUser.name}</h2>
                            <p class="text-gray-600">${currentUser.course}</p>
                        </div>
                        <button class="sm:ml-auto mt-4 sm:mt-0 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all">
                            Edit Profile
                        </button>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="space-y-4">
                            <h3 class="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
                            
                            <div class="flex items-center space-x-3">
                                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                </svg>
                                <div>
                                    <p class="text-xs text-gray-500">Full Name</p>
                                    <p class="font-medium text-gray-800">${currentUser.name}</p>
                                </div>
                            </div>
                            
                            <div class="flex items-center space-x-3">
                                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                </svg>
                                <div>
                                    <p class="text-xs text-gray-500">Email Address</p>
                                    <p class="font-medium text-gray-800">${currentUser.email}</p>
                                </div>
                            </div>
                            
                            <div class="flex items-center space-x-3">
                                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"/>
                                </svg>
                                <div>
                                    <p class="text-xs text-gray-500">Roll Number</p>
                                    <p class="font-medium text-gray-800">${currentUser.rollNumber}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="space-y-4">
                            <h3 class="text-lg font-semibold text-gray-800 mb-4">Academic Details</h3>
                            
                            <div class="flex items-center space-x-3">
                                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                                </svg>
                                <div>
                                    <p class="text-xs text-gray-500">Course</p>
                                    <p class="font-medium text-gray-800">${currentUser.course}</p>
                                </div>
                            </div>
                            
                            <div class="flex items-center space-x-3">
                                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                </svg>
                                <div>
                                    <p class="text-xs text-gray-500">Current Year</p>
                                    <p class="font-medium text-gray-800">${currentUser.year}</p>
                                </div>
                            </div>
                            
                            <div class="flex items-center space-x-3">
                                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                <div>
                                    <p class="text-xs text-gray-500">Overall Attendance</p>
                                    <p class="font-medium text-gray-800">${dashboardData.attendance}%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="mt-8 pt-8 border-t border-gray-200">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">Account Settings</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button class="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-medium flex items-center justify-center space-x-2">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                            </svg>
                            <span>Change Password</span>
                        </button>
                        
                        <button onclick="logout()" class="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-medium flex items-center justify-center space-x-2">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                            </svg>
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getAttendanceContent() {
    const avgAttendance = Math.round(attendanceData.reduce((sum, item) => sum + item.percentage, 0) / attendanceData.length);

    return `
        <div class="max-w-6xl mx-auto">
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-800 mb-2">Attendance Overview</h1>
                <p class="text-gray-600">Track your attendance across all subjects</p>
            </div>
            
            <div class="bg-white rounded-xl shadow-md p-6 mb-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold text-gray-800">Overall Attendance</h3>
                    <span class="text-2xl font-bold ${avgAttendance >= 75 ? 'text-green-600' : 'text-red-600'}">${avgAttendance}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-4">
                    <div class="h-4 rounded-full ${avgAttendance >= 75 ? 'bg-green-500' : 'bg-red-500'}" style="width: ${avgAttendance}%"></div>
                </div>
                <p class="text-sm text-gray-500 mt-2">${avgAttendance >= 75 ? 'Great! You meet the minimum attendance requirement.' : 'Warning: Below 75% attendance requirement.'}</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${attendanceData.map(subject => `
                    <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all">
                        <h4 class="font-semibold text-gray-800 mb-3">${subject.subject}</h4>
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-sm text-gray-600">Classes Attended</span>
                            <span class="text-sm font-medium">${subject.attended}/${subject.total}</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-3 mb-2">
                            <div class="h-3 rounded-full ${subject.percentage >= 75 ? 'bg-green-500' : 'bg-red-500'}" style="width: ${subject.percentage}%"></div>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-xs text-gray-500">Percentage</span>
                            <span class="text-lg font-bold ${subject.percentage >= 75 ? 'text-green-600' : 'text-red-600'}">${subject.percentage}%</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function getCurriculumContent() {
    return `
        <div class="max-w-5xl mx-auto">
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-800 mb-2">Curriculum</h1>
                <p class="text-gray-600">View your semester-wise subjects and credits</p>
            </div>
            
            <div class="space-y-4">
                ${curriculumData.map((sem, index) => `
                    <div class="bg-white rounded-xl shadow-md overflow-hidden">
                        <button onclick="toggleAccordion('sem${index}')" class="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-all">
                            <div class="flex items-center space-x-3">
                                <div class="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                                    <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                                    </svg>
                                </div>
                                <div class="text-left">
                                    <h3 class="font-semibold text-gray-800">${sem.semester}</h3>
                                    <p class="text-sm text-gray-500">${sem.subjects.length} subjects</p>
                                </div>
                            </div>
                            <svg id="sem${index}-icon" class="w-6 h-6 text-gray-400 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                            </svg>
                        </button>
                        <div id="sem${index}" class="hidden px-6 pb-6">
                            <div class="space-y-3">
                                ${sem.subjects.map(subject => `
                                    <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                                        <div>
                                            <p class="font-medium text-gray-800">${subject.name}</p>
                                            <p class="text-sm text-gray-500">Code: ${subject.code}</p>
                                        </div>
                                        <div class="text-right">
                                            <span class="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">${subject.credits} Credits</span>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function getFeesContent() {
    return `
        <div class="max-w-5xl mx-auto">
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-800 mb-2">Fees & Payments</h1>
                <p class="text-gray-600">Manage your fee payments and view history</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="bg-white rounded-xl shadow-md p-6">
                    <p class="text-sm text-gray-600 mb-2">Total Fees</p>
                    <p class="text-3xl font-bold text-gray-800">₹${feesData.total.toLocaleString()}</p>
                </div>
                
                <div class="bg-white rounded-xl shadow-md p-6">
                    <p class="text-sm text-gray-600 mb-2">Paid Amount</p>
                    <p class="text-3xl font-bold text-green-600">₹${feesData.paid.toLocaleString()}</p>
                </div>
                
                <div class="bg-gradient-to-br from-red-50 to-red-100 rounded-xl shadow-md p-6 border-2 border-red-200">
                    <p class="text-sm text-red-700 mb-2 font-medium">Pending Amount</p>
                    <p class="text-3xl font-bold text-red-600">₹${feesData.pending.toLocaleString()}</p>
                    <button class="mt-4 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-all font-medium">
                        Pay Now
                    </button>
                </div>
            </div>
            
            <div class="bg-white rounded-xl shadow-md p-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">Payment History</h3>
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead>
                            <tr class="border-b border-gray-200">
                                <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                                <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">Amount</th>
                                <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">Method</th>
                                <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${feesData.history.map(payment => `
                                <tr class="border-b border-gray-100 hover:bg-gray-50">
                                    <td class="py-3 px-4 text-sm text-gray-800">${payment.date}</td>
                                    <td class="py-3 px-4 text-sm font-medium text-gray-800">₹${payment.amount.toLocaleString()}</td>
                                    <td class="py-3 px-4 text-sm text-gray-600">${payment.method}</td>
                                    <td class="py-3 px-4">
                                        <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">${payment.status}</span>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function getFormsContent() {
    return `
        <div class="max-w-5xl mx-auto">
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-800 mb-2">Forms & Applications</h1>
                <p class="text-gray-600">Apply for various certificates and requests</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${formsData.map(form => `
                    <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all cursor-pointer" onclick="openFormModal('${form.id}', '${form.title}')">
                        <div class="text-4xl mb-4">${form.icon}</div>
                        <h3 class="text-lg font-semibold text-gray-800 mb-2">${form.title}</h3>
                        <p class="text-sm text-gray-600 mb-4">${form.description}</p>
                        <button class="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-medium">
                            Apply Now
                        </button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function attachPageEventListeners(page) {
    // This function can be used to attach specific event listeners for each page
}

function toggleAccordion(id) {
    const content = document.getElementById(id);
    const icon = document.getElementById(id + '-icon');

    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        icon.style.transform = 'rotate(180deg)';
    } else {
        content.classList.add('hidden');
        icon.style.transform = 'rotate(0deg)';
    }
}

function openFormModal(formId, formTitle) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');

    modalTitle.textContent = formTitle;
    modalContent.innerHTML = `
        <form class="space-y-4" onsubmit="submitForm(event, '${formTitle}')">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required>
            </div>
            
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Roll Number</label>
                <input type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required>
            </div>
            
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Reason</label>
                <textarea class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" rows="3" required></textarea>
            </div>
            
            <button type="submit" class="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all font-medium">
                Submit Application
            </button>
        </form>
    `;

    modal.classList.remove('hidden');
}

function closeModal() {
    document.getElementById('modal').classList.add('hidden');
}

function submitForm(e, formTitle) {
    e.preventDefault();
    alert(`${formTitle} submitted successfully! You will receive a confirmation email shortly.`);
    closeModal();
}

// Results Page Content
function getResultsContent() {
    const cgpa = (semesterResults.reduce((sum, sem) => sum + sem.sgpa, 0) / semesterResults.length).toFixed(2);

    return `
        <div class="max-w-6xl mx-auto">
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-800 mb-2">Previous Semester Results</h1>
                <p class="text-gray-600">View your academic performance across all semesters</p>
            </div>
            
            <div class="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-6 mb-8 text-white">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-indigo-100 mb-1">Cumulative Grade Point Average</p>
                        <p class="text-5xl font-bold">${cgpa}</p>
                    </div>
                    <div class="text-right">
                        <p class="text-indigo-100 mb-1">Total Semesters Completed</p>
                        <p class="text-3xl font-bold">${semesterResults.length}</p>
                    </div>
                </div>
            </div>
            
            <div class="space-y-6">
                ${semesterResults.map((sem, index) => `
                    <div class="bg-white rounded-xl shadow-md overflow-hidden">
                        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-gray-200">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h3 class="text-xl font-semibold text-gray-800">${sem.semester}</h3>
                                    <p class="text-sm text-gray-600">Status: <span class="text-green-600 font-medium">${sem.status}</span></p>
                                </div>
                                <div class="text-right">
                                    <p class="text-sm text-gray-600">SGPA</p>
                                    <p class="text-3xl font-bold text-indigo-600">${sem.sgpa}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="p-6">
                            <div class="overflow-x-auto">
                                <table class="w-full">
                                    <thead>
                                        <tr class="border-b border-gray-200">
                                            <th class="text-left py-3 px-2 text-sm font-semibold text-gray-700">Code</th>
                                            <th class="text-left py-3 px-2 text-sm font-semibold text-gray-700">Subject</th>
                                            <th class="text-center py-3 px-2 text-sm font-semibold text-gray-700">Credits</th>
                                            <th class="text-center py-3 px-2 text-sm font-semibold text-gray-700">Grade</th>
                                            <th class="text-center py-3 px-2 text-sm font-semibold text-gray-700">Points</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${sem.subjects.map(subject => `
                                            <tr class="border-b border-gray-100 hover:bg-gray-50">
                                                <td class="py-3 px-2 text-sm font-medium text-gray-700">${subject.code}</td>
                                                <td class="py-3 px-2 text-sm text-gray-800">${subject.name}</td>
                                                <td class="py-3 px-2 text-sm text-center text-gray-600">${subject.credits}</td>
                                                <td class="py-3 px-2 text-center">
                                                    <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">${subject.grade}</span>
                                                </td>
                                                <td class="py-3 px-2 text-sm text-center font-semibold text-indigo-600">${subject.points}</td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Performance Analyzer Content
function getPerformanceContent() {
    const uploadedCount = requiredDocuments.filter(doc => doc.uploaded).length;
    const totalCount = requiredDocuments.length;
    const percentage = Math.round((uploadedCount / totalCount) * 100);

    return `
        <div class="max-w-5xl mx-auto">
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-800 mb-2">Document Performance Analyzer</h1>
                <p class="text-gray-600">Track your document upload progress</p>
            </div>
            
            <div class="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-8 mb-8 text-white">
                <div class="text-center mb-6">
                    <p class="text-indigo-100 text-lg mb-2">Documents Uploaded</p>
                    <p class="text-6xl font-bold mb-2">${uploadedCount}/${totalCount}</p>
                    <p class="text-2xl font-semibold">${percentage}% Complete</p>
                </div>
                
                <div class="w-full bg-indigo-400 rounded-full h-6">
                    <div class="bg-white rounded-full h-6 transition-all duration-500" style="width: ${percentage}%"></div>
                </div>
                
                <div class="mt-6 text-center">
                    ${percentage === 100
            ? '<p class="text-xl">🎉 Excellent! All documents uploaded!</p>'
            : `<p class="text-lg">⚠️ ${totalCount - uploadedCount} documents pending upload</p>`
        }
                </div>
            </div>
            
            <div class="bg-white rounded-xl shadow-md p-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-6">Document Checklist</h3>
                
                <div class="space-y-3">
                    ${requiredDocuments.map(doc => `
                        <div class="flex items-center justify-between p-4 rounded-lg border-2 ${doc.uploaded
                ? 'bg-green-50 border-green-200'
                : 'bg-red-50 border-red-200'
            } hover:shadow-md transition-all">
                            <div class="flex items-center space-x-4">
                                <div class="w-10 h-10 rounded-full flex items-center justify-center ${doc.uploaded
                ? 'bg-green-500'
                : 'bg-red-500'
            } text-white text-xl">
                                    ${doc.uploaded ? '✓' : '✗'}
                                </div>
                                <div>
                                    <p class="font-medium text-gray-800">${doc.name}</p>
                                    <p class="text-sm ${doc.uploaded
                ? 'text-green-600'
                : 'text-red-600'
            }">
                                        ${doc.uploaded ? 'Uploaded' : 'Not Uploaded'}
                                    </p>
                                </div>
                            </div>
                            
                            ${!doc.uploaded
                ? `<button class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all">
                                    Upload Now
                                </button>`
                : '<span class="text-green-600 font-medium">Complete</span>'
            }
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

// Risk Analyzer Content
function getRiskAnalyzerContent() {
    const avgAttendance = Math.round(attendanceData.reduce((sum, item) => sum + item.percentage, 0) / attendanceData.length);
    const lowAttendanceSubjects = attendanceData.filter(s => s.percentage < 75);
    const criticalSubjects = attendanceData.filter(s => s.percentage < 65);

    let riskLevel = 'Low';
    let riskColor = 'green';
    let riskMessage = 'Great job! Your attendance is well above the required threshold.';

    if (avgAttendance < 75) {
        riskLevel = 'High';
        riskColor = 'red';
        riskMessage = 'Critical! Your attendance is below the 75% requirement. Immediate action needed.';
    } else if (avgAttendance < 80) {
        riskLevel = 'Medium';
        riskColor = 'yellow';
        riskMessage = 'Warning! Your attendance is close to the minimum threshold. Please improve.';
    }

    return `
        <div class="max-w-6xl mx-auto">
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-800 mb-2">Attendance Risk Analyzer</h1>
                <p class="text-gray-600">Monitor your attendance risk based on 75% requirement</p>
            </div>
            
            <div class="bg-gradient-to-r from-${riskColor}-600 to-${riskColor}-700 rounded-xl shadow-lg p-8 mb-8 text-white">
                <div class="text-center">
                    <div class="text-6xl mb-4">
                        ${riskLevel === 'Low' ? '✅' : riskLevel === 'Medium' ? '⚠️' : '🚨'}
                    </div>
                    <p class="text-xl mb-2 opacity-90">Risk Level</p>
                    <p class="text-5xl font-bold mb-4">${riskLevel}</p>
                    <p class="text-lg mb-6">${riskMessage}</p>
                    
                    <div class="bg-white bg-opacity-20 rounded-lg p-4 inline-block">
                        <p class="text-sm opacity-90">Current Overall Attendance</p>
                        <p class="text-4xl font-bold">${avgAttendance}%</p>
                    </div>
                </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="bg-white rounded-xl shadow-md p-6">
                    <div class="flex items-center justify-between mb-2">
                        <p class="text-sm text-gray-600">Total Subjects</p>
                        <div class="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                            <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                            </svg>
                        </div>
                    </div>
                    <p class="text-3xl font-bold text-gray-800">${attendanceData.length}</p>
                </div>
                
                <div class="bg-white rounded-xl shadow-md p-6">
                    <div class="flex items-center justify-between mb-2">
                        <p class="text-sm text-gray-600">Low Attendance</p>
                        <div class="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                            </svg>
                        </div>
                    </div>
                    <p class="text-3xl font-bold text-yellow-600">${lowAttendanceSubjects.length}</p>
                </div>
                
                <div class="bg-white rounded-xl shadow-md p-6">
                    <div class="flex items-center justify-between mb-2">
                        <p class="text-sm text-gray-600">Critical Status</p>
                        <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                            <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </div>
                    </div>
                    <p class="text-3xl font-bold text-red-600">${criticalSubjects.length}</p>
                </div>
            </div>
            
            ${lowAttendanceSubjects.length > 0 ? `
                <div class="bg-white rounded-xl shadow-md p-6 mb-8">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <svg class="w-6 h-6 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                        </svg>
                        Subjects Requiring Attention
                    </h3>
                    
                    <div class="space-y-4">
                        ${lowAttendanceSubjects.map(subject => {
        const classesNeeded = Math.ceil((75 * subject.total - 100 * subject.attended) / 25);
        return `
                                <div class="p-4 rounded-lg ${subject.percentage < 65
                ? 'bg-red-50 border-2 border-red-200'
                : 'bg-yellow-50 border-2 border-yellow-200'
            }">
                                    <div class="flex items-center justify-between mb-3">
                                        <div>
                                            <h4 class="font-semibold text-gray-800">${subject.subject}</h4>
                                            <p class="text-sm text-gray-600">Current: ${subject.attended}/${subject.total} classes</p>
                                        </div>
                                        <div class="text-right">
                                            <p class="text-2xl font-bold ${subject.percentage < 65 ? 'text-red-600' : 'text-yellow-600'
            }">${subject.percentage}%</p>
                                        </div>
                                    </div>
                                    
                                    <div class="w-full bg-gray-200 rounded-full h-3 mb-3">
                                        <div class="h-3 rounded-full ${subject.percentage < 65 ? 'bg-red-500' : 'bg-yellow-500'
            }" style="width: ${subject.percentage}%"></div>
                                    </div>
                                    
                                    <div class="flex items-center space-x-2 text-sm">
                                        <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                        <span class="text-gray-700">
                                            ${classesNeeded > 0
                ? `Attend next <strong>${classesNeeded}</strong> consecutive classes to reach 75%`
                : 'You are above 75%'
            }
                                        </span>
                                    </div>
                                </div>
                            `;
    }).join('')}
                    </div>
                </div>
            ` : ''}
            
            <div class="bg-white rounded-xl shadow-md p-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">Recommendations</h3>
                
                <div class="space-y-3">
                    ${avgAttendance >= 75
            ? `
                            <div class="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                                <div class="text-2xl">✅</div>
                                <div>
                                    <p class="font-medium text-gray-800">Excellent Attendance</p>
                                    <p class="text-sm text-gray-600">Keep up the good work! Your attendance is well above the requirement.</p>
                                </div>
                            </div>
                        `
            : `
                            <div class="flex items-start space-x-3 p-4 bg-red-50 rounded-lg">
                                <div class="text-2xl">🚨</div>
                                <div>
                                    <p class="font-medium text-gray-800">Immediate Action Required</p>
                                    <p class="text-sm text-gray-600">Your attendance is below 75%. You may not be eligible for exams.</p>
                                </div>
                            </div>
                            <div class="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg">
                                <div class="text-2xl">📝</div>
                                <div>
                                    <p class="font-medium text-gray-800">Contact Your Advisor</p>
                                    <p class="text-sm text-gray-600">Schedule a meeting with your academic advisor to discuss your attendance.</p>
                                </div>
                            </div>
                        `
        }
                    
                    <div class="flex items-start space-x-3 p-4 bg-indigo-50 rounded-lg">
                        <div class="text-2xl">📊</div>
                        <div>
                            <p class="font-medium text-gray-800">Monitor Regularly</p>
                            <p class="text-sm text-gray-600">Check your attendance status weekly to stay on track.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Timetable data
const timetableData = [
    {
        day: 'Monday',
        classes: [
            { time: '09:00 - 10:00', subject: 'Data Structures', room: 'Lab 301', type: 'Lab' },
            { time: '10:00 - 11:00', subject: 'Data Structures', room: 'Lab 301', type: 'Lab' },
            { time: '11:15 - 12:15', subject: 'Database Management', room: 'Room 205', type: 'Lecture' },
            { time: '12:15 - 01:15', subject: 'Computer Networks', room: 'Room 303', type: 'Lecture' },
            { time: '02:00 - 03:00', subject: 'Operating Systems', room: 'Room 401', type: 'Lecture' }
        ]
    },
    {
        day: 'Tuesday',
        classes: [
            { time: '09:00 - 10:00', subject: 'Web Development', room: 'Lab 302', type: 'Lab' },
            { time: '10:00 - 11:00', subject: 'Web Development', room: 'Lab 302', type: 'Lab' },
            { time: '11:15 - 12:15', subject: 'Software Engineering', room: 'Room 204', type: 'Lecture' },
            { time: '12:15 - 01:15', subject: 'Database Management', room: 'Lab 305', type: 'Lab' },
            { time: '02:00 - 03:00', subject: 'Computer Networks', room: 'Room 303', type: 'Tutorial' }
        ]
    },
    {
        day: 'Wednesday',
        classes: [
            { time: '09:00 - 10:00', subject: 'Operating Systems', room: 'Room 401', type: 'Lecture' },
            { time: '10:00 - 11:00', subject: 'Data Structures', room: 'Room 205', type: 'Lecture' },
            { time: '11:15 - 12:15', subject: 'Software Engineering', room: 'Lab 301', type: 'Lab' },
            { time: '12:15 - 01:15', subject: 'Software Engineering', room: 'Lab 301', type: 'Lab' }
        ]
    },
    {
        day: 'Thursday',
        classes: [
            { time: '09:00 - 10:00', subject: 'Computer Networks', room: 'Room 303', type: 'Lecture' },
            { time: '10:00 - 11:00', subject: 'Database Management', room: 'Room 205', type: 'Lecture' },
            { time: '11:15 - 12:15', subject: 'Web Development', room: 'Room 304', type: 'Lecture' },
            { time: '12:15 - 01:15', subject: 'Data Structures', room: 'Room 205', type: 'Tutorial' },
            { time: '02:00 - 03:00', subject: 'Operating Systems', room: 'Lab 303', type: 'Lab' }
        ]
    },
    {
        day: 'Friday',
        classes: [
            { time: '09:00 - 10:00', subject: 'Software Engineering', room: 'Room 204', type: 'Lecture' },
            { time: '10:00 - 11:00', subject: 'Web Development', room: 'Room 304', type: 'Lecture' },
            { time: '11:15 - 12:15', subject: 'Database Management', room: 'Room 205', type: 'Tutorial' },
            { time: '12:15 - 01:15', subject: 'Computer Networks', room: 'Lab 304', type: 'Lab' }
        ]
    }
];

// Timetable Page Content
function getTimetableContent() {
    const dayColors = {
        'Monday': 'indigo',
        'Tuesday': 'purple',
        'Wednesday': 'blue',
        'Thursday': 'green',
        'Friday': 'orange'
    };

    const typeColors = {
        'Lecture': 'bg-blue-100 text-blue-800',
        'Lab': 'bg-green-100 text-green-800',
        'Tutorial': 'bg-purple-100 text-purple-800'
    };

    return `
        <div class="max-w-7xl mx-auto">
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-800 mb-2">Weekly Timetable</h1>
                <p class="text-gray-600">Your class schedule for the current semester</p>
            </div>
            
            <div class="space-y-6">
                ${timetableData.map(day => {
        const color = dayColors[day.day];
        return `
                        <div class="bg-white rounded-xl shadow-md overflow-hidden">
                            <div class="bg-gradient-to-r from-${color}-600 to-${color}-700 px-6 py-4">
                                <h3 class="text-xl font-bold text-white">${day.day}</h3>
                                <p class="text-${color}-100 text-sm">${day.classes.length} classes scheduled</p>
                            </div>
                            
                            <div class="p-6">
                                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    ${day.classes.map(cls => `
                                        <div class="border-l-4 border-${color}-500 bg-gray-50 p-4 rounded-lg hover:shadow-md transition-all">
                                            <div class="flex items-start justify-between mb-2">
                                                <div>
                                                    <p class="font-semibold text-gray-800">${cls.subject}</p>
                                                    <p class="text-sm text-gray-600">${cls.time}</p>
                                                </div>
                                                <span class="px-2 py-1 ${typeColors[cls.type]} rounded-full text-xs font-medium">
                                                    ${cls.type}
                                                </span>
                                            </div>
                                            <div class="flex items-center space-x-2 text-sm text-gray-600">
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                                </svg>
                                                <span>${cls.room}</span>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    `;
    }).join('')}
            </div>
            
            <div class="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">Legend</h3>
                <div class="flex flex-wrap gap-4">
                    <div class="flex items-center space-x-2">
                        <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Lecture</span>
                        <span class="text-sm text-gray-600">Theory Classes</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Lab</span>
                        <span class="text-sm text-gray-600">Practical Sessions</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <span class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">Tutorial</span>
                        <span class="text-sm text-gray-600">Problem Solving</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Student ID Card Content
function getStudentIdContent() {
    const courseCode = currentUser.course.substring(0, 2).toUpperCase();
    const yearCode = currentUser.year.charAt(0);
    const rollHash = currentUser.rollNumber.substring(currentUser.rollNumber.length - 4);
    const studentCode = `${courseCode}${yearCode}-${rollHash}-2026`;
    const barcodeLines = studentCode.split('').filter(c => c !== '-').map((char, i) => {
        const x = i * 20 + 10;
        const width = !isNaN(char) ? 12 : 6;
        return `<rect x="${x}" y="5" width="${width}" height="50" fill="black"/>`;
    }).join('');

    return `
        <div class="max-w-4xl mx-auto">
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-800 mb-2">Student ID Card</h1>
                <p class="text-gray-600">Your official student identification</p>
            </div>
            
            <div class="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 rounded-2xl shadow-2xl p-8 mb-8 text-white">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="flex flex-col items-center">
                        <div class="w-32 h-32 bg-white rounded-2xl shadow-xl flex items-center justify-center border-4 border-white mb-4">
                            <div class="w-28 h-28 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white text-4xl font-bold">
                                ${currentUser.initials}
                            </div>
                        </div>
                        <div class="bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                            <p class="text-xs text-center">VALID UNTIL 2027</p>
                        </div>
                    </div>
                    
                    <div class="md:col-span-2">
                        <div class="mb-6">
                            <p class="text-indigo-200 text-sm mb-1">University Name</p>
                            <p class="text-2xl font-bold">Tech University</p>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <p class="text-indigo-200 text-xs mb-1">Student Name</p>
                                <p class="font-semibold">${currentUser.name}</p>
                            </div>
                            <div>
                                <p class="text-indigo-200 text-xs mb-1">Roll Number</p>
                                <p class="font-semibold">${currentUser.rollNumber}</p>
                            </div>
                            <div>
                                <p class="text-indigo-200 text-xs mb-1">Course</p>
                                <p class="font-semibold text-sm">${currentUser.course}</p>
                            </div>
                            <div>
                                <p class="text-indigo-200 text-xs mb-1">Year</p>
                                <p class="font-semibold">${currentUser.year}</p>
                            </div>
                            <div>
                                <p class="text-indigo-200 text-xs mb-1">Email</p>
                                <p class="font-semibold text-sm">${currentUser.email}</p>
                            </div>
                            <div>
                                <p class="text-indigo-200 text-xs mb-1">Student ID Code</p>
                                <p class="font-bold text-lg tracking-wider">${studentCode}</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="mt-6 pt-6 border-t border-indigo-400">
                    <div class="bg-white rounded-lg p-4">
                        <div class="text-center">
                            <p class="text-sm text-gray-600 font-semibold mb-3">Student Identification Barcode</p>
                            <svg class="mx-auto" width="300" height="60" viewBox="0 0 300 60">
                                ${barcodeLines}
                            </svg>
                            <p class="text-center text-sm text-gray-600 font-mono mt-2">${studentCode}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white rounded-xl shadow-md p-6">
                    <div class="flex items-center space-x-3 mb-3">
                        <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                            <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                            </svg>
                        </div>
                        <div>
                            <p class="text-sm text-gray-600">Security Level</p>
                            <p class="font-bold text-gray-800">Verified</p>
                        </div>
                    </div>
                    <p class="text-xs text-gray-500">This ID is digitally verified and secure</p>
                </div>
                
                <div class="bg-white rounded-xl shadow-md p-6">
                    <div class="flex items-center space-x-3 mb-3">
                        <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        </div>
                        <div>
                            <p class="text-sm text-gray-600">Valid Until</p>
                            <p class="font-bold text-gray-800">Dec 2027</p>
                        </div>
                    </div>
                    <p class="text-xs text-gray-500">Please renew before expiry date</p>
                </div>
                
                <div class="bg-white rounded-xl shadow-md p-6">
                    <div class="flex items-center space-x-3 mb-3">
                        <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                            </svg>
                        </div>
                        <div>
                            <p class="text-sm text-gray-600">Actions</p>
                            <p class="font-bold text-gray-800">Download</p>
                        </div>
                    </div>
                    <button class="text-xs text-indigo-600 hover:text-indigo-800 font-medium">Download ID Card</button>
                </div>
            </div>
            
            <div class="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
                <div class="flex items-start space-x-3">
                    <svg class="w-6 h-6 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <div>
                        <h4 class="font-semibold text-gray-800 mb-1">Important Notice</h4>
                        <p class="text-sm text-gray-600">Keep your student ID code confidential. This ID is required for library access, exam entry, and campus facilities. Report any loss or theft immediately to the administration office.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getStudentIdContent() {
    const courseCode = currentUser.course.substring(0, 2).toUpperCase();
    const yearCode = currentUser.year.charAt(0);
    const rollHash = currentUser.rollNumber.substring(currentUser.rollNumber.length - 4);
    const studentCode = `${courseCode}${yearCode}-${rollHash}-2026`;
    const barcodeLines = studentCode.split('').filter(c => c !== '-').map((char, i) => { const x = i * 20 + 10; const width = !isNaN(char) ? 12 : 6; return `<rect x="${x}" y="5" width="${width}" height="50" fill="black"/>`; }).join('');
    return `<div class="max-w-4xl mx-auto"><div class="mb-8"><h1 class="text-3xl font-bold text-gray-800 mb-2">Student ID Card</h1><p class="text-gray-600">Your official student identification</p></div><div class="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 rounded-2xl shadow-2xl p-8 mb-8 text-white"><div class="grid grid-cols-1 md:grid-cols-3 gap-6"><div class="flex flex-col items-center"><div class="w-32 h-32 bg-white rounded-2xl shadow-xl flex items-center justify-center border-4 border-white mb-4"><div class="w-28 h-28 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white text-4xl font-bold">${currentUser.initials}</div></div><div class="bg-white bg-opacity-20 px-4 py-2 rounded-lg"><p class="text-xs text-center">VALID UNTIL 2027</p></div></div><div class="md:col-span-2"><div class="mb-6"><p class="text-indigo-200 text-sm mb-1">University Name</p><p class="text-2xl font-bold">Tech University</p></div><div class="grid grid-cols-2 gap-4"><div><p class="text-indigo-200 text-xs mb-1">Student Name</p><p class="font-semibold">${currentUser.name}</p></div><div><p class="text-indigo-200 text-xs mb-1">Roll Number</p><p class="font-semibold">${currentUser.rollNumber}</p></div><div><p class="text-indigo-200 text-xs mb-1">Course</p><p class="font-semibold text-sm">${currentUser.course}</p></div><div><p class="text-indigo-200 text-xs mb-1">Year</p><p class="font-semibold">${currentUser.year}</p></div><div><p class="text-indigo-200 text-xs mb-1">Email</p><p class="font-semibold text-sm">${currentUser.email}</p></div><div><p class="text-indigo-200 text-xs mb-1">Student ID Code</p><p class="font-bold text-lg tracking-wider">${studentCode}</p></div></div></div></div><div class="mt-6 pt-6 border-t border-indigo-400"><div class="bg-white rounded-lg p-4"><div class="text-center"><p class="text-sm text-gray-600 font-semibold mb-3">Student Identification Barcode</p><svg class="mx-auto" width="300" height="60" viewBox="0 0 300 60">${barcodeLines}</svg><p class="text-center text-sm text-gray-600 font-mono mt-2">${studentCode}</p></div></div></div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6"><div class="bg-white rounded-xl shadow-md p-6"><div class="flex items-center space-x-3 mb-3"><div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center"><svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg></div><div><p class="text-sm text-gray-600">Security Level</p><p class="font-bold text-gray-800">Verified</p></div></div><p class="text-xs text-gray-500">This ID is digitally verified and secure</p></div><div class="bg-white rounded-xl shadow-md p-6"><div class="flex items-center space-x-3 mb-3"><div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center"><svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div><div><p class="text-sm text-gray-600">Valid Until</p><p class="font-bold text-gray-800">Dec 2027</p></div></div><p class="text-xs text-gray-500">Please renew before expiry date</p></div><div class="bg-white rounded-xl shadow-md p-6"><div class="flex items-center space-x-3 mb-3"><div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center"><svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg></div><div><p class="text-sm text-gray-600">Actions</p><p class="font-bold text-gray-800">Download</p></div></div><button class="text-xs text-indigo-600 hover:text-indigo-800 font-medium">Download ID Card</button></div></div><div class="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg"><div class="flex items-start space-x-3"><svg class="w-6 h-6 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><h4 class="font-semibold text-gray-800 mb-1">Important Notice</h4><p class="text-sm text-gray-600">Keep your student ID code confidential. This ID is required for library access, exam entry, and campus facilities. Report any loss or theft immediately to the administration office.</p></div></div></div></div>`;
}
