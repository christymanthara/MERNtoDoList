// src/components/AgeSorter.jsx
import React from 'react';
import Card from './Card';

function AgeSorter({ users }) {
    // Function to group users by age range
    const groupByAge = (users) => {
        const ageGroups = {};

        users.forEach((user) => {
            const ageGroup = `${Math.floor(user.age / 10) * 10}-${Math.floor(user.age / 10) * 10 + 9}`;
            
            if (!ageGroups[ageGroup]) {
                ageGroups[ageGroup] = [];
            }
            ageGroups[ageGroup].push(user);
        });

        return ageGroups;
    };

    const groupedUsers = groupByAge(users);

    return (
        <div>
            {Object.keys(groupedUsers).map((ageRange) => (
                <div key={ageRange} className="mb-8">
                    <h2 className="text-xl font-bold mb-4">Age Group: {ageRange}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {groupedUsers[ageRange].map((user) => (
                            <Card key={user.id} userName={user.name} todos={user.todos} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AgeSorter;
