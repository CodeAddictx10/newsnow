import { useFetchUserQuery } from "@/store/services/auth";
import Footer from "./Footer";
import Navbar from "./Navbar";
import PageLoader from "./PageLoader";
import { useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { isLoading } = useFetchUserQuery({});
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoader(isLoading);
        }, 1000);

        return () => clearTimeout(timer);
    }, [isLoading]);

    return showLoader ? (
        <PageLoader />
    ) : (
        <>
            <Navbar />
            <main className="min-h-[calc(100vh-64px-330px)]  container mx-auto">
                {children}
            </main>
            <Footer />
        </>
    );
}
