import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check, ArrowRight, BookOpen, Play, Users } from "lucide-react";
import { Link } from "react-router-dom";

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      icon: BookOpen,
      badge: "EM BREVE",
      badgeColor: "bg-yellow-500/20 text-yellow-400",
      title: "Manual do Devocionalzeiro",
      description: "O guia completo sobre os 4 pilares do devocional: Oração, Leitura, Prática e Constância.",
      publisher: "Editora Santorini",
      cta: "Seja notificado",
      ctaDisabled: true,
      link: "#",
    },
    {
      icon: Play,
      badge: "CURSO ONLINE",
      badgeColor: "bg-primary/20 text-primary",
      title: "Método HD",
      price: { original: "R$ 39,90", current: "R$ 9,90" },
      description: "O método exato que uso para manter uma prática devocional constante e vencer a procrastinação.",
      features: [
        "6 módulos em vídeo",
        "Grupo VIP de suporte",
        "Bônus: Planos de leitura + Templates",
      ],
      cta: "Quero ser constante",
      ctaDisabled: false,
      link: "https://pay.kiwify.com.br",
    },
    {
      icon: Users,
      badge: "MASTERMIND ANUAL",
      badgeColor: "bg-primary/20 text-primary",
      title: "Clube HD",
      description: "Comunidade exclusiva de desenvolvimento integral: Mente, Corpo e Espírito.",
      features: [
        "6 encontros presenciais/ano",
        "Mentorias online mensais",
        "Kit físico exclusivo",
        "Clube de leitura bíblica",
      ],
      cta: "Candidate-se ao Clube",
      ctaDisabled: false,
      isInternal: true,
      link: "/clubehd",
    },
  ];

  return (
    <section id="projetos" ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title text-foreground mb-4">O Ecossistema Devocionalzeiros</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Três caminhos para sua transformação
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
              className="glass-card-hover rounded-2xl p-6 lg:p-8 flex flex-col card-tilt"
            >
              {/* Badge */}
              <div className="flex items-center justify-between mb-6">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${project.badgeColor}`}>
                  {project.badge}
                </span>
                <project.icon className="w-8 h-8 text-primary" />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-foreground mb-3">
                {project.title}
              </h3>

              {/* Price (if exists) */}
              {project.price && (
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-muted-foreground line-through text-sm">{project.price.original}</span>
                  <span className="text-2xl font-bold text-primary">{project.price.current}</span>
                </div>
              )}

              {/* Publisher (if exists) */}
              {project.publisher && (
                <p className="text-muted-foreground text-sm mb-4">{project.publisher}</p>
              )}

              {/* Description */}
              <p className="text-gray-light/80 leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Features (if exists) */}
              {project.features && (
                <ul className="space-y-3 mb-8 flex-1">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-gray-light/80">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* CTA */}
              <div className="mt-auto">
                {project.isInternal ? (
                  <Link
                    to={project.link}
                    className={`w-full inline-flex items-center justify-center gap-2 ${
                      project.ctaDisabled
                        ? "btn-secondary opacity-50 cursor-not-allowed"
                        : "btn-primary"
                    }`}
                  >
                    {project.cta}
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                ) : (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full inline-flex items-center justify-center gap-2 ${
                      project.ctaDisabled
                        ? "btn-secondary opacity-50 cursor-not-allowed pointer-events-none"
                        : "btn-primary"
                    }`}
                  >
                    {project.cta}
                    {!project.ctaDisabled && <ArrowRight className="w-5 h-5" />}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;