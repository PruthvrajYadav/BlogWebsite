import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Mail, Bookmark, Edit2, X, Camera, Save, Loader2, User } from 'lucide-react';
import { updateUserInfo } from '../Slice/userSlice';
import { getSafeImageUrl } from '../config';
import BlogCard from '../Components/BlogCard';
import api from '../utils/api';

const Profile = () => {
    const { data: currentUser, token } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    // Edit Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        bio: '',
        profilePic: '',
        socialLinks: {
            twitter: '',
            linkedin: '',
            github: ''
        }
    });

    const fetchProfile = async () => {
        try {
            const res = await api.get(`/user/me`);
            setProfileData(res.data.data);
            setFormData({
                name: res.data.data.name,
                email: res.data.data.email,
                bio: res.data.data.bio || '',
                profilePic: res.data.data.profilePic || '',
                socialLinks: res.data.data.socialLinks || { twitter: '', linkedin: '', github: '' }
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) fetchProfile();
    }, [token]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await api.put(`/user/${currentUser._id}`, formData);
            dispatch(updateUserInfo(res.data.data)); // Update Redux
            setProfileData(prev => ({ ...prev, ...res.data.data })); // Update Local State
            setIsEditing(false);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error(error);
            alert("Failed to update profile");
        }
    };

    if (!token) return <div className="pt-40 text-center text-gray-400">Please login to view profile.</div>;
    if (loading) return <div className="pt-40 flex justify-center"><Loader2 className="animate-spin text-brand-primary" size={40} /></div>;

    return (
        <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
            {/* Profile Header */}
            <div className="glass rounded-[2.5rem] p-8 md:p-12 mb-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                    {/* Avatar */}
                    <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-brand-primary to-brand-secondary p-[2px] shadow-2xl">
                        <div className="w-full h-full rounded-full bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
                            {profileData?.profilePic ? (
                                <img src={getSafeImageUrl(profileData.profilePic)} alt={profileData.name} className="w-full h-full object-cover" />
                            ) : (
                                <User size={64} className="text-gray-400" />
                            )}
                        </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 text-center md:text-left space-y-4">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">{profileData?.name}</h1>
                            <div className="flex items-center justify-center md:justify-start text-gray-400 gap-2">
                                <Mail size={16} />
                                <span>{profileData?.email}</span>
                            </div>
                        </div>

                        {profileData?.bio && (
                            <p className="text-lg text-gray-300 max-w-2xl">{profileData.bio}</p>
                        )}

                        <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
                            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                                <Bookmark size={16} className="text-brand-primary" />
                                <span className="font-bold">{profileData?.savedBlogs?.length || 0}</span>
                                <span className="text-gray-400 text-sm">Saved</span>
                            </div>
                        </div>
                    </div>

                    {/* Edit Button & Social Links */}
                    <div className="flex flex-col gap-4">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all flex items-center gap-2 font-medium justify-center"
                        >
                            <Edit2 size={18} />
                            <span>Edit Profile</span>
                        </button>
                        
                        <div className="flex items-center gap-3 justify-center md:justify-start">
                            {profileData?.socialLinks?.twitter && (
                                <a href={profileData.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/5 hover:bg-brand-primary/20 hover:text-brand-primary transition-all">
                                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                                </a>
                            )}
                            {profileData?.socialLinks?.linkedin && (
                                <a href={profileData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/5 hover:bg-brand-primary/20 hover:text-brand-primary transition-all">
                                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                                </a>
                            )}
                            {profileData?.socialLinks?.github && (
                                <a href={profileData.socialLinks.github} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/5 hover:bg-brand-primary/20 hover:text-brand-primary transition-all">
                                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Saved Blogs Section */}
            <div>
                <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                    <Bookmark className="text-brand-primary" />
                    <span>Saved Stories</span>
                </h2>

                {profileData?.savedBlogs?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {profileData.savedBlogs.map(blog => (
                            <BlogCard key={blog._id} blog={blog} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 glass rounded-3xl">
                        <p className="text-gray-400 text-lg">You haven&apos;t saved any stories yet.</p>
                    </div>
                )}
            </div>

            {/* Edit Modal */}
            {isEditing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="glass w-full max-w-lg rounded-3xl p-8 relative animate-in fade-in zoom-in duration-300">
                        <button
                            onClick={() => setIsEditing(false)}
                            className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <h2 className="text-2xl font-bold mb-8">Edit Profile</h2>

                        <form onSubmit={handleUpdate} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Full Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full glass p-4 rounded-xl outline-none focus:ring-2 ring-brand-primary/20"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Email Address</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full glass p-4 rounded-xl outline-none focus:ring-2 ring-brand-primary/20"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Bio</label>
                                <textarea
                                    value={formData.bio}
                                    onChange={e => setFormData({ ...formData, bio: e.target.value })}
                                    rows={3}
                                    className="w-full glass p-4 rounded-xl outline-none focus:ring-2 ring-brand-primary/20 resize-none"
                                    placeholder="Tell us about yourself..."
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Profile Image URL</label>
                                    <div className="relative">
                                        <Camera className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                                        <input
                                            type="text"
                                            value={formData.profilePic}
                                            onChange={e => setFormData({ ...formData, profilePic: e.target.value })}
                                            className="w-full glass pl-12 pr-4 py-4 rounded-xl outline-none focus:ring-2 ring-brand-primary/20"
                                            placeholder="https://..."
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Twitter URL</label>
                                    <input
                                        type="text"
                                        value={formData.socialLinks.twitter}
                                        onChange={e => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, twitter: e.target.value } })}
                                        className="w-full glass p-4 rounded-xl outline-none focus:ring-2 ring-brand-primary/20"
                                        placeholder="https://x.com/username"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">LinkedIn URL</label>
                                    <input
                                        type="text"
                                        value={formData.socialLinks.linkedin}
                                        onChange={e => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, linkedin: e.target.value } })}
                                        className="w-full glass p-4 rounded-xl outline-none focus:ring-2 ring-brand-primary/20"
                                        placeholder="https://linkedin.com/in/username"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">GitHub URL</label>
                                    <input
                                        type="text"
                                        value={formData.socialLinks.github}
                                        onChange={e => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, github: e.target.value } })}
                                        className="w-full glass p-4 rounded-xl outline-none focus:ring-2 ring-brand-primary/20"
                                        placeholder="https://github.com/username"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-brand-primary rounded-xl text-white font-bold shadow-lg shadow-indigo-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                            >
                                <Save size={20} />
                                <span>Save Changes</span>
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
