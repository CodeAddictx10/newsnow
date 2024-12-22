import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Layout from "@/components/Layout";
import Settings from "@/features/settings/Settings";
import NewsFeed from "@/features/feed/NewsFeed";
import { PrivateOutlet } from "@/utils/PrivateOutlet";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Layout>
                <App />
            </Layout>
        ),
    },
    {
        path: "/user",
        element: (
            <Layout>
                <PrivateOutlet />
            </Layout>
        ),
        children: [
            {
                path: "feed",
                element: <NewsFeed />,
            },
            {
                path: "settings",
                element: <Settings />,
            },
        ],
    },
]);

export default router;
