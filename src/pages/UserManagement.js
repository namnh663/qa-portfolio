import { useState, useEffect } from 'react';
import { fetchUsers, fetchUserById, searchUsers } from '../services/dummyJson';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Footer from '../components/common/Footer';

const USERS_PER_PAGE = 10;

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  const totalPages = Math.ceil(totalUsers / USERS_PER_PAGE);

  useEffect(() => {
    const load = async () => {
      try {
        setLoadingUsers(true);
        if (searchTerm.trim()) {
          const response = await searchUsers(searchTerm);
          setUsers(response.users);
          setTotalUsers(response.total);
          if (currentPage !== 1) setCurrentPage(1);
        } else {
          const skip = (currentPage - 1) * USERS_PER_PAGE;
          const response = await fetchUsers(USERS_PER_PAGE, skip);
          setUsers(response.users);
          setTotalUsers(response.total);
        }
      } catch (err) {
        setError('Failed to load users. Please try again.');
      } finally {
        setLoadingUsers(false);
      }
    };

    load();
  }, [currentPage, searchTerm]);

  const handleViewUser = async (id) => {
    try {
      setLoadingProfile(true);
      const user = await fetchUserById(id);
      setSelectedUser(user);
      document.getElementById('user-profile-modal')?.focus();
    } catch (err) {
      setError('Unable to load user profile. Please try again.');
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8" role="main">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  User Data Management
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Efficiently manage and view user information
                </p>
              </div>
              <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-4">
                <div className="relative">
                  <label htmlFor="search-users" className="sr-only">Search users</label>
                  <input
                    type="search"
                    id="search-users"
                    placeholder="Search by name or email..."
                    className="w-full lg:w-80 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    value={searchTerm}
                    onChange={handleSearchInputChange}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setViewMode('grid')}
                    variant={viewMode === 'grid' ? 'primary' : 'default'}
                    className="flex items-center"
                    aria-pressed={viewMode === 'grid'}
                    aria-label="Grid view"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </Button>
                  <Button
                    onClick={() => setViewMode('list')}
                    variant={viewMode === 'list' ? 'primary' : 'default'}
                    className="flex items-center"
                    aria-pressed={viewMode === 'list'}
                    aria-label="List view"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </header>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/50 border-l-4 border-red-500 p-4 mb-6 rounded-lg" role="alert" aria-live="polite">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-700 dark:text-red-200">{error}</p>
                </div>
              </div>
            </div>
          )}

          <Card className="shadow-xl">
            {loadingUsers ? (
              <div className="flex justify-center items-center h-64">
                <LoadingSpinner size="large" />
              </div>
            ) : (
              <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-4 p-6`}>
                {users.map(user => (
                  <div key={user.id} className={`${viewMode === 'grid' ? 'bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200' : 'border-b dark:border-gray-700 pb-4'} p-4`}>
                    <div className={`flex ${viewMode === 'grid' ? 'flex-col items-center' : 'items-center'} gap-4`}>
                      <img src={user.image} alt={`${user.firstName} ${user.lastName}`} className={`${viewMode === 'grid' ? 'w-24 h-24' : 'w-16 h-16'} rounded-full object-cover`} />
                      <div className={`${viewMode === 'grid' ? 'text-center' : 'flex-1'}`}>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {user.firstName} {user.lastName}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                      </div>
                      <Button onClick={() => handleViewUser(user.id)} variant="primary" className={`${viewMode === 'grid' ? 'w-full mt-4' : ''} transform hover:scale-105 transition-transform duration-150`}>
                        View Profile
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between items-center p-6 border-t border-gray-200 dark:border-gray-700">
              <Button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} variant="default" className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </Button>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700 dark:text-gray-300">Page {currentPage} of {totalPages}</span>
              </div>
              <Button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} variant="default" className="flex items-center gap-2">
                Next
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </div>
          </Card>

          {selectedUser && (
            <div id="user-profile-modal" className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" role="dialog" aria-labelledby="profile-title" tabIndex="-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full m-4 transform transition-all">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <h2 id="profile-title" className="text-2xl font-bold text-gray-900 dark:text-white">User Profile Details</h2>
                    <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors" aria-label="Close profile modal">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex flex-col items-center">
                    {loadingProfile ? (
                      <LoadingSpinner size="large" />
                    ) : (
                      <>
                        <img src={selectedUser.image} alt={`${selectedUser.firstName} ${selectedUser.lastName}`} className="w-32 h-32 rounded-full object-cover ring-4 ring-blue-500 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{selectedUser.firstName} {selectedUser.lastName}</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">{selectedUser.email}</p>
                        <Button onClick={handleCloseModal} variant="primary" className="w-full" aria-label="Close profile">Close Profile</Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserManagement;