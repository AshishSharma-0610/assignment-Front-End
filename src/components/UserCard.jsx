import { useState } from "react"

function UserCard({ user, onEdit, onDelete }) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)

    return (
        <>
            <div className="bg-white rounded-xl shadow-lg p-6 transform transition duration-200 hover:scale-[1.02]">
                <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                        <img
                            src={user.avatar || "https://via.placeholder.com/150"}
                            alt={`${user.first_name} ${user.last_name}`}
                            className="w-16 h-16 rounded-full object-cover border-2 border-blue-100"
                        />
                        <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-400 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">{`${user.first_name} ${user.last_name}`}</h3>
                        <p className="text-gray-600 text-sm">{user.email}</p>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                    <div className="flex justify-between gap-2">
                        <button
                            onClick={onEdit}
                            className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition duration-200"
                        >
                            Edit Profile
                        </button>
                        <button
                            onClick={() => setShowDeleteDialog(true)}
                            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition duration-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {showDeleteDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
                        <div className="text-center mb-6">
                            <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Delete Confirmation</h3>
                            <p className="text-gray-600">
                                Are you sure you want to delete {user.first_name} {user.last_name}'s profile? This action cannot be undone.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition duration-200"
                                onClick={() => setShowDeleteDialog(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition duration-200"
                                onClick={() => {
                                    onDelete()
                                    setShowDeleteDialog(false)
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default UserCard