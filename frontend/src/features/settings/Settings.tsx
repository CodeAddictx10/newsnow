import PasswordSetting from "@/components/settings/PasswordSetting";
import { Preferences } from "@/components/settings/Prefrences";
import ProfileSetting from "@/components/settings/ProfileSetting";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Settings() {
    return (
        <Tabs defaultValue="profile" className="w-full ">
            <TabsList className="flex justify-center pt-8 mb-20 bg-transparent">
                <TabsTrigger
                    value="profile"
                    className="lg:px-20 lg:py-4 text-xs py-3 lg:text-md data-[state=active]:bg-primary data-[state=active]:text-white ">
                    Account
                </TabsTrigger>
                <TabsTrigger
                    value="news"
                    className="lg:px-20 lg:py-4 text-xs py-3 lg:text-md data-[state=active]:bg-primary data-[state=active]:text-white ">
                    News Preferences
                </TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
                <section className="grid grid-cols-2 gap-x-48">
                    <div className="mb-8">
                        <ProfileSetting />
                    </div>

                    <div className="mb-8">
                        <PasswordSetting />
                    </div>
                </section>
            </TabsContent>
            <TabsContent value="news">
                <Preferences />
            </TabsContent>
        </Tabs>
    );
}
