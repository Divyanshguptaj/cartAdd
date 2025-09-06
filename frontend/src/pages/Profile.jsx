import React from 'react';

const Profile = () => {
    // In a real app, you would fetch user data from your backend using the stored token
    return (
        <div className="container mx-auto px-6 py-16">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">My Profile</h1>
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-500">Username</label>
                        <p className="text-lg text-gray-800">User123</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-500">Email</label>
                        <p className="text-lg text-gray-800">user@example.com</p>
                    </div>
                    <button className="w-full mt-6 bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition">
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;