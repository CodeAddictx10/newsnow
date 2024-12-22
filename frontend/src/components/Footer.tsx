import Logo from "./Logo";

const sections = [
    {
        title: "Resources",
        links: [
            { name: "Help", href: "#" },
            { name: "Advertise", href: "#" },
        ],
    },
    {
        title: "Social",
        links: [
            { name: "Twitter", href: "#" },
            { name: "Instagram", href: "#" },
            { name: "LinkedIn", href: "#" },
        ],
    },
];

export default function Footer() {
    return (
        <footer className="container mx-auto ">
            <div className="flex justify-between">
                <div className="mb-8 lg:mb-0">
                    <Logo />
                </div>
                <div className="flex gap-10 md:gap-20">
                    {sections.map((section, sectionIdx) => (
                        <div key={sectionIdx} className="justify-self-end mb-3">
                            <h3 className="mb-4 font-bold">{section.title}</h3>
                            <ul className="space-y-4 text-muted-foreground">
                                {section.links.map((link, linkIdx) => (
                                    <li
                                        key={linkIdx}
                                        className="font-medium hover:text-primary">
                                        <a href={link.href}>{link.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col justify-between gap-4 border-t py-8 text-sm font-medium text-muted-foreground md:flex-row md:items-center">
                <p>© 2024 NewsNow. All rights reserved.</p>
                <ul className="flex gap-4">
                    <li className="underline hover:text-primary">
                        <a href="#"> Terms and Conditions</a>
                    </li>
                    <li className="underline hover:text-primary">
                        <a href="#"> Privacy Policy</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}
