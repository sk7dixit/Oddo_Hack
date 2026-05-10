import React from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import SettingsSection from "../../components/admin/SettingsSection";
import ProfileSettingsForm from "../../components/admin/ProfileSettingsForm";
import SecuritySettings from "../../components/admin/SecuritySettings";
import PreferencesSettings from "../../components/admin/PreferencesSettings";
import PageHeader from "../../components/admin/PageHeader";

const AdminSettingsPage = () => {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <PageHeader 
          title="Settings" 
          description="Manage admin account settings" 
        />

        <SettingsSection
          title="Profile"
          description="Update admin profile information"
        >
          <ProfileSettingsForm />
        </SettingsSection>

        <SettingsSection
          title="Preferences"
          description="Customize dashboard preferences"
        >
          <PreferencesSettings />
        </SettingsSection>

        <SettingsSection
          title="Security"
          description="Manage account security"
        >
          <SecuritySettings />
        </SettingsSection>
      </div>
    </AdminLayout>
  );
};

export default AdminSettingsPage;
