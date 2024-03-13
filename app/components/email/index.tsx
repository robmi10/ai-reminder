import React from 'react';
import { format } from 'date-fns';

type EmailTemplateProps = {
    reminder: string;
    dueDate: string;
};

const EmailTemplate: React.FC<EmailTemplateProps> = ({ reminder, dueDate }) => {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>
            <p>We hope this message finds you well.</p>
            <p>Just a friendly reminder that you have a pending task: <strong>{reminder}</strong>, which is due on <strong>{dueDate}</strong>. Completing tasks on time helps in maintaining progress and achieving your goals efficiently.</p>
            <p>If it’s already on your radar, great! If not, now might be a good time to tackle it. Remember, breaking tasks into smaller steps can make them more manageable.</p>
            <a href="http://localhost:3000/" style={{ display: 'inline-block', background: '#4A90E2', color: '#ffffff', padding: '10px 20px', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}>View Task</a>
            <p>Should you need any help or have questions, we’re here for you.</p>
            <p>Best regards,</p>
            <p><strong>AI-Task-Reminder Team</strong></p>
        </div>
    )
}

export default EmailTemplate;
