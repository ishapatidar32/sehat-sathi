import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const AdminDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rejectingId, setRejectingId] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  const getToken = () => localStorage.getItem("adminToken");

  const fetchPending = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/admin/doctors/pending", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setDoctors(res.data);
    } catch (err) {
      console.error("Failed to fetch pending doctors:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axiosInstance.patch(
        `/admin/doctors/${id}/approve`,
        {},
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      fetchPending();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to approve");
    }
  };

  const handleReject = async (id) => {
    try {
      await axiosInstance.patch(
        `/admin/doctors/${id}/reject`,
        { reason: rejectReason },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      setRejectingId(null);
      setRejectReason("");
      fetchPending();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to reject");
    }
  };

  if (loading) return <p className="text-center py-16">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h2 className="text-2xl font-bold mb-6">Pending Doctor Approvals</h2>

      {doctors.length === 0 && (
        <p className="text-gray-500">No pending applications right now.</p>
      )}

      {doctors.map((doc) => (
        <div key={doc._id} className="bg-white shadow rounded-xl p-6 mb-4">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <p className="font-semibold text-lg">{doc.name}</p>
              <p className="text-sm text-gray-600">{doc.email} | {doc.phone}</p>
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-medium">Reg No:</span> {doc.registrationNumber} |{" "}
                <span className="font-medium">Council:</span> {doc.registrationCouncil}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Qualification:</span> {doc.qualification} |{" "}
                <span className="font-medium">Specialization:</span> {doc.specialization}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Experience:</span> {doc.experienceYears} yrs |{" "}
                <span className="font-medium">Hospital:</span> {doc.hospitalAffiliation}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Fee:</span> ₹{doc.consultationFee} |{" "}
                <span className="font-medium">Languages:</span> {doc.languagesSpoken?.join(", ")}
              </p>
              {doc.bio && <p className="text-sm text-gray-500 mt-2 italic">"{doc.bio}"</p>}
            </div>

            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => handleApprove(doc._id)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                Approve
              </button>
              <button
                onClick={() => setRejectingId(rejectingId === doc._id ? null : doc._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                Reject
              </button>
            </div>
          </div>

          {rejectingId === doc._id && (
            <div className="mt-4 flex gap-2">
              <input
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                placeholder="Reason for rejection..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />
              <button
                onClick={() => handleReject(doc._id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
              >
                Confirm Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;