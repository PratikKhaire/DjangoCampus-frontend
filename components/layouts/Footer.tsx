export default function Footer() {
  return (
    <footer className="py-12 px-4 bg-card border-t border-border">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/Campus_crop.png" alt="Django Campus" className="h-10 w-20" />
              <div>
                <h3 className="font-serif font-bold text-lg">Django Campus</h3>
                <p className="text-sm text-muted-foreground">Powered by Django</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">
              Empowering youth to learn programming through free Django workshops across the world.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Twitter
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Facebook
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Instagram
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                LinkedIn
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#about" className="hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/workshops" className="hover:text-primary transition-colors">
                  Workshops
                </a>
              </li>
              <li>
                <a href="#community" className="hover:text-primary transition-colors">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Resources
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>juliusboakye@pythonghana.org</li>
              <li>Accra, Ghana</li>
              <li>+233 50 015 9892</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2025 Django Campus. We are building a community of vibrant Django Developers.</p>
        </div>
      </div>
    </footer>
  )
}