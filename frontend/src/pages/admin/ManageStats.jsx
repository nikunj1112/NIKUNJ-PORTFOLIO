import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { statsAPI } from '../../services/api';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';

const ManageStats = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ label: '', value: '', order: '' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStat, setNewStat] = useState({ label: '', value: '', order: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const res = await statsAPI.getStats();
      setStats(res.data);
    } catch (err) {
      console.error('Error loading stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (stat) => {
    setEditingId(stat._id);
    setEditForm({ label: stat.label, value: stat.value, order: stat.order || '' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({ label: '', value: '', order: '' });
  };

  const handleSaveEdit = async () => {
    try {
      await statsAPI.updateStat(editingId, editForm);
      loadStats();
      handleCancelEdit();
    } catch (err) {
      console.error('Error updating stat:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this stat?')) {
      try {
        await statsAPI.deleteStat(id);
        loadStats();
      } catch (err) {
        console.error('Error deleting stat:', err);
      }
    }
  };

  const handleAddStat = async (e) => {
    e.preventDefault();
    try {
      await statsAPI.createStat(newStat);
      setNewStat({ label: '', value: '', order: 0 });
      setShowAddForm(false);
      loadStats();
    } catch (err) {
      console.error('Error creating stat:', err);
    }
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="flex justify-center items-center h-64">
          <div className="loader-large" />
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-light-gray">Manage Stats</h1>
          <p className="text-light-gray/60 mt-2">Manage statistics displayed on About page</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn-primary flex items-center gap-2"
        >
          <FaPlus />
          {showAddForm ? 'Cancel' : 'Add Stat'}
        </button>
      </div>

      {/* Add New Stat Form */}
      {showAddForm && (
        <div className="glass p-6 rounded-xl mb-8 border border-accent/30">
          <form onSubmit={handleAddStat} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Label</label>
              <input
                type="text"
                value={newStat.label}
                onChange={(e) => setNewStat({ ...newStat, label: e.target.value })}
                className="input-field w-full"
                placeholder="e.g. Projects Completed"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Value</label>
              <input
                type="text"
                value={newStat.value}
                onChange={(e) => setNewStat({ ...newStat, value: e.target.value })}
                className="input-field w-full"
                placeholder="e.g. 12"
                required
              />
            </div>
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">Order</label>
                <input
                  type="number"
                  value={newStat.order}
                  onChange={(e) => setNewStat({ ...newStat, order: parseInt(e.target.value) || 0 })}
                  className="input-field w-full"
                  placeholder="0"
                  min="0"
                />
              </div>
              <button type="submit" className="btn-accent px-6">
                <FaSave />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Stats Table */}
      <div className="glass p-6 rounded-xl border border-light-gray/20">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-light-gray/30">
                <th className="text-left p-4 font-semibold text-light-gray">Label</th>
                <th className="text-left p-4 font-semibold text-light-gray">Value</th>
                <th className="text-left p-4 font-semibold text-light-gray">Order</th>
                <th className="text-right p-4 font-semibold text-light-gray">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((stat) => (
                <tr key={stat._id} className="border-b border-light-gray/10 hover:bg-light-gray/10">
                  <td className="p-4">
                    {editingId === stat._id ? (
                      <input
                        type="text"
                        value={editForm.label}
                        onChange={(e) => setEditForm({ ...editForm, label: e.target.value })}
                        className="input-field w-full text-sm"
                      />
                    ) : (
                      <span className="font-medium text-light-gray">{stat.label}</span>
                    )}
                  </td>
                  <td className="p-4">
                    {editingId === stat._id ? (
                      <input
                        type="text"
                        value={editForm.value}
                        onChange={(e) => setEditForm({ ...editForm, value: e.target.value })}
                        className="input-field w-full text-sm"
                      />
                    ) : (
                      <span className="font-bold text-accent">{stat.value}</span>
                    )}
                  </td>
                  <td className="p-4">
                    {editingId === stat._id ? (
                      <input
                        type="number"
                        value={editForm.order}
                        onChange={(e) => setEditForm({ ...editForm, order: parseInt(e.target.value) || 0 })}
                        className="input-field w-20 text-sm"
                        min="0"
                      />
                    ) : (
                      <span className="text-light-gray/70">{stat.order || 0}</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    {editingId === stat._id ? (
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={handleSaveEdit}
                          className="btn-accent p-2 rounded-lg hover:bg-accent/80"
                          title="Save"
                        >
                          <FaSave />
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="btn-secondary p-2 rounded-lg hover:bg-light-gray/20"
                          title="Cancel"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => handleEdit(stat)}
                          className="btn-primary p-2 rounded-lg hover:bg-accent/80"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(stat._id)}
                          className="btn-danger p-2 rounded-lg hover:bg-red-600/80"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {stats.length === 0 && (
          <div className="text-center py-12">
            <p className="text-light-gray/50">No stats found. Add your first stat above!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageStats;

