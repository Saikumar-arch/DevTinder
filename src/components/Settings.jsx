import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../Utility/constants";
import toast from "react-hot-toast";

const Settings = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async () => {
    // 1. Basic Validation
    if (!oldPassword || !newPassword || !confirmPassword) {
        toast.error("Please fill all fields");
        return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }
    try {
      const res = await axios.patch(
        BASE_URL + "/api/user/password",
        { oldPassword, newPassword },
        { withCredentials: true }
      );
      
      toast.success(res.data.message || "Password updated successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error updating password");
    }
  };

  return (
    <div className="flex justify-center my-10 px-4">
      <div className="card bg-slate-700 w-full max-w-md shadow-2xl p-2">
        <h1 className="text-3xl font-bold text-center text-white my-6">Settings</h1>
        <div className="collapse collapse-arrow bg-base-200 text-black mb-3">
          <input type="radio" name="settings-accordion" defaultChecked />
          <div className="collapse-title text-xl font-medium text-red-700">
            🔐 Change Password
          </div>
          <div className="collapse-content">
            <div className="flex flex-col gap-3 py-2 text-white">
              
              <div className="form-control w-full">
                <label className="label"><span className="label-text">Current Password</span></label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="input input-bordered w-full text-white"
                />
              </div>

              <div className="form-control w-full ">
                <label className="label"><span className="label-text">New Password</span></label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="input input-bordered w-full text-white"
                />
              </div>

              <div className="form-control w-full">
                <label className="label"><span className="label-text">Confirm New Password</span></label>
                <input
                  type="password"
                  placeholder="Re-type new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input input-bordered w-full text-white"
                />
              </div>

              <button
                onClick={handleChangePassword}
                className="btn btn-primary w-full mt-4"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200 text-black mb-3">
          <input type="radio" name="settings-accordion" />
          <div className="collapse-title text-xl font-medium text-white">
            🌙 Appearance
          </div>
          <div className="collapse-content">
            <div className="form-control py-4">
              <label className="label cursor-pointer text-white">
                <span className="label-text text-lg">Dark Mode</span>
                <input type="checkbox" className="toggle toggle-primary" defaultChecked />
              </label>
              <p className="text-xs text-gray-500 mt-2">
                Toggle between dark and light themes for the application.
              </p>
            </div>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-red-50 text-black border border-red-200">
            <input type="radio" name="settings-accordion" />
            <div className="collapse-title text-xl font-medium text-red-600">
                ⚠️ Danger Zone
            </div>
            <div className="collapse-content">
                <p className="text-sm my-4 text-white">
                    Once you delete your account, there is no going back. All your connections and messages will be permanently removed.
                </p>
                <button 
                    className="btn btn-error w-full text-white"
                    onClick={() => toast.error("Feature coming soon!")}
                >
                    Delete My Account
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Settings;
