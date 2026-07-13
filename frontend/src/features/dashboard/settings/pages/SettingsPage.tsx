import { SettingsIcon } from "lucide-react";
import { DashboardHeader } from "../../shared/components/DashboardHeader";
import { DeleteAccount } from "../components/DeleteAccount";
import { DisplaySettings } from "../components/DisplaySettings";
import { PersonalInformationSettings } from "../components/PersonalInformationSettings";
import { UpdatePassword } from "../components/UpdatePassword";


export default function SettingsPage() {

    return (
        <section className="flex min-h-screen flex-col gap-6 pb-24 md:pb-6">

            <DashboardHeader Icon={SettingsIcon} title="Settings" description={"Manage your account settings and preferences."} />
            
            <div className="mt-8 p-6">
                <DisplaySettings />

                <PersonalInformationSettings />

                <UpdatePassword />

                <DeleteAccount />
            </div>

        </section>
    );

}