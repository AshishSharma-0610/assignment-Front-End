import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import UserCard from "../components/UserCard"

function Dashboard() {
    const navigate = useNavigate()
    const { logout } = useContext(AuthContext)
    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        fetchUsers(currentPage)
    }, [currentPage])

    useEffect(() => {
        if (users.length > 0) {
            const filtered = users.filter(
                (user) =>
                    user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchTerm.toLowerCase())
            )
            setFilteredUsers(filtered)
        }
    }, [searchTerm, users])

    const fetchUsers = async (page) => {
        setIsLoading(true)
        try {
            const response = await fetch(`https://reqres.in/api/users?page=${page}`)
            const data = await response.json()
            setUsers(data.data)
            setFilteredUsers(data.data)
            setTotalPages(data.total_pages)
        } catch (error) {
            console.error("Error fetching users:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleLogout = () => {
        logout()
        navigate("/login")
    }

    const handleDeleteUser = async (id) => {
        try {
            const response = await fetch(`https://reqres.in/api/users/${id}`, {
                method: "DELETE",
            })

            if (response.ok) {
                setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id))
                setFilteredUsers((prevUsers) => prevUsers.filter((user) => user.id !== id))
            }
        } catch (error) {
            console.error("Error deleting user:", error)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition duration-200"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <div className="relative">
                        <input
                            type="search"
                            placeholder="Search users by name or email..."
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <svg
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                                    <div className="space-y-2">
                                        <div className="h-4 w-32 bg-gray-200 rounded"></div>
                                        <div className="h-3 w-24 bg-gray-200 rounded"></div>
                                    </div>
                                </div>
                                <div className="border-t border-gray-100 pt-4">
                                    <div className="flex justify-between gap-2">
                                        <div className="h-10 flex-1 bg-gray-200 rounded-lg"></div>
                                        <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredUsers.map((user) => (
                                <UserCard
                                    key={user.id}
                                    user={user}
                                    onEdit={() => navigate(`/edit/${user.id}`)}
                                    onDelete={() => handleDeleteUser(user.id)}
                                />
                            ))}
                        </div>

                        {filteredUsers.length === 0 && (
                            <div className="text-center py-12">
                                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                                <p className="text-gray-600">No users found</p>
                            </div>
                        )}
                    </>
                )}

                <div className="mt-8 flex justify-center">
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium
                                    ${currentPage === i + 1
                                        ? 'z-10 bg-blue-600 border-blue-600 text-white'
                                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                                    }
                                    ${i === 0 ? 'rounded-l-md' : ''}
                                    ${i === totalPages - 1 ? 'rounded-r-md' : ''}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </nav>
                </div>
            </main>
        </div>
    )
}

export default Dashboard