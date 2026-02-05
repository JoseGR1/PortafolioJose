

export function Footer() {
    return (
        <footer className="bg-muted/30 py-8 mt-20 border-t border-border">
            <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} Jose. All rights reserved.</p>
            </div>
        </footer>
    );
}
