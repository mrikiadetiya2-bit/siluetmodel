import React from 'react';
import { createRoot } from 'react-dom/client';

import WomenRoster from './components/WomenRoster.jsx';
import MenRoster from './components/MenRoster.jsx';
import KidsRoster from './components/KidsRoster.jsx';
import HighlightsGallery from './components/HighlightsGallery.jsx';
import AcademyCourses from './components/AcademyCourses.jsx';
import MentorShowcase from './components/MentorShowcase.jsx';
import AboutInteractive from './components/AboutInteractive.jsx';
import ContactInteractive from './components/ContactInteractive.jsx';
import AuthPortal from './components/AuthPortal.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';

// Dedicated Modular Admin Components
import AdminOverview from './components/admin/AdminOverview.jsx';
import AdminPrograms from './components/admin/AdminPrograms.jsx';
import AdminStudents from './components/admin/AdminStudents.jsx';
import AdminMentors from './components/admin/AdminMentors.jsx';
import AdminSchedule from './components/admin/AdminSchedule.jsx';
import AdminPayments from './components/admin/AdminPayments.jsx';
import AdminCertificates from './components/admin/AdminCertificates.jsx';
import AdminTestimonials from './components/admin/AdminTestimonials.jsx';
import AdminGallery from './components/admin/AdminGallery.jsx';
import AdminRunway from './components/admin/AdminRunway.jsx';
import AdminReports from './components/admin/AdminReports.jsx';
import AdminSettings from './components/admin/AdminSettings.jsx';
import ParticipantDashboard from './components/ParticipantDashboard.jsx';

const components = {
    WomenRoster,
    MenRoster,
    KidsRoster,
    HighlightsGallery: (props) => <HighlightsGallery {...props} />,
    AcademyCourses,
    MentorShowcase,
    AboutInteractive,
    ContactInteractive,
    AuthPortal,
    AdminDashboard,
    AdminOverview,
    AdminPrograms,
    AdminStudents,
    AdminMentors,
    AdminSchedule,
    AdminPayments,
    AdminCertificates,
    AdminTestimonials,
    AdminGallery,
    AdminRunway,
    AdminReports,
    AdminSettings,
    ParticipantDashboard,
};


document.addEventListener('DOMContentLoaded', () => {
    const reactRoots = document.querySelectorAll('[data-react-component]');
    reactRoots.forEach((element) => {
        const componentName = element.getAttribute('data-react-component');
        const Component = components[componentName];
        if (Component) {
            const rawProps = element.getAttribute('data-props');
            const props = rawProps ? JSON.parse(rawProps) : {};
            createRoot(element).render(<Component {...props} />);
        } else {
            console.warn(`React component not found: ${componentName}`);
        }
    });
});
