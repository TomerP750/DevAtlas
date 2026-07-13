import { DeleteAccount } from "../components/DeleteAccount";
import { DisplaySettings } from "../components/DisplaySettings";
import { PersonalInformationSettings } from "../components/PersonalInformationSettings";
import { UpdatePassword } from "../components/UpdatePassword";


export function SettingsPage() {
    return (
        <main>
            <DisplaySettings />

            <PersonalInformationSettings />

            <UpdatePassword />

            <DeleteAccount />
        </main>
    );
}