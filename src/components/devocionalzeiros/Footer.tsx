import { Link } from "react-router-dom";
import { Youtube, Instagram, Music2, MessageCircle, Mail } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { label: "Devocionais gratuitos", href: "#devocionais" },
    { label: "Método HD", href: "https://pay.kiwify.com.br" },
    { label: "Clube HD", href: "/clubehd", isInternal: true },
    { label: "Sobre", href: "#sobre" },
  ];

  const socialLinks = [
    { icon: Youtube, href: "https://youtube.com/@devocionalzeiros" },
    { icon: Instagram, href: "https://instagram.com/devocionalzeiros" },
    { icon: Music2, href: "https://tiktok.com/@devocionalzeiros" },
    { icon: MessageCircle, href: "https://threads.net/@devocionalzeiros" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 sm:px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 lg:gap-20">
          {/* Logo & Tagline */}
          <div>
            <Link to="/" className="text-2xl font-bold text-foreground">
              Devocionalzeiros
            </Link>
            <p className="text-muted-foreground mt-3">
              Fé prática. Constância diária.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Links rápidos</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  {link.isInternal ? (
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : link.href.startsWith("#") ? (
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contato</h4>
            <a
              href="mailto:contato@devocionalzeiros.com.br"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <Mail className="w-5 h-5" />
              contato@devocionalzeiros.com.br
            </a>

            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2025 Devocionalzeiros. Todos os direitos reservados.</p>
            <p>Desenvolvido com propósito.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;