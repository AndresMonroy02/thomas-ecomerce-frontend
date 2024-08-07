import { Link, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button"; // Assuming your Button component path

const links = [
    { name: "Productos", path: "/products" },
];

export const NavLinks = () => {
    const params = useParams<{ platform: string; feature: string }>();

    return (
        <>
        {links.map((link) => (
            <Button key={link.path} variant="link" size="lg" className="px-0" asChild>
                <Link
                    to={`${link.path}/${params.feature || ''}`}
                    className={link.path === `${params.platform}`
                        ? "text-primary" // Adjust class names for your styling
                        : "text-muted-foreground hover:text-primary"}
                >
                    {link.name}
                </Link>
            </Button>
        ))}
        </>
    );
};