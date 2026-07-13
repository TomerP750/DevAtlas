import { SettingsIcon } from "lucide-react";
import { DashboardHeader } from "../../shared/components/DashboardHeader";
import { DeleteAccount } from "../components/DeleteAccount";
import { DisplaySettings } from "../components/DisplaySettings";
import { PersonalInformationSettings } from "../components/PersonalInformationForm";
import { UpdatePasswordForm } from "../components/UpdatePasswordForm";


export default function SettingsPage() {

    return (
        <section className="flex min-h-screen flex-col gap-6 pb-24 md:pb-6">

            <DashboardHeader Icon={SettingsIcon} title="Settings" description={"Manage your account settings and preferences."} />
            
            <div className="p-6 flex max-w-4xl flex-col gap-6">
                <DisplaySettings />

                <PersonalInformationSettings />

                <UpdatePasswordForm />

                <DeleteAccount />
            </div>

        </section>
    );

}