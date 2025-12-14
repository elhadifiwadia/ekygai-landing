'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { AnimatedGradientMesh } from '@/components/AnimatedGradientMesh';
import { ScrollProgress } from '@/components/ScrollProgress';
import { CustomCursor } from '@/components/CustomCursor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 1.1]);
  
  // Header hide/show on scroll + transparent/white background
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isTransparent, setIsTransparent] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Transparent when in hero section (top), white when scrolled past
      setIsTransparent(currentScrollY < 100);
      
      // Show header when scrolling up or at top
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setHidden(false);
      } 
      // Hide header when scrolling down (and past 10px)
      else if (currentScrollY > lastScrollY && currentScrollY > 10) {
        setHidden(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className="bg-white text-gray-900 overflow-hidden relative">
      {/* Background noise texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.015] z-[60]" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E")' }} 
      />
      
      {/* Scroll Progress Indicator */}
      <ScrollProgress />
      
      {/* Custom Cursor */}
      <CustomCursor />
      {/* HumanGO-Style Navigation with Hide/Show on Scroll */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4">
        <motion.nav 
          className={`transition-all duration-300 w-full max-w-6xl mx-6 rounded-tl-[2rem] rounded-tr-sm rounded-bl-sm rounded-br-[2rem] ${
            isTransparent 
              ? 'bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl shadow-black/10' 
              : 'bg-white shadow-lg'
          }`}
          initial={{ y: 0 }}
          animate={{ y: hidden ? -100 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div className="px-6 lg:px-12">
            <div className="flex justify-between items-center h-20">
              {/* Logo - Simple and Clean like HumanGO */}
              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.02 }}
              >
                <Image 
                  src="/logos/logo-main.png" 
                  alt="EKYGAI Logo" 
                  width={140} 
                  height={40} 
                  className="h-10 w-auto"
                  priority
                />
              </motion.div>

              {/* Center Menu - Clean Links */}
              <div className={`hidden md:flex items-center space-x-10 text-sm font-medium transition-colors ${
                isTransparent ? 'text-gray-900' : 'text-gray-700'
              }`}>
                <a href="#features" className="hover:text-[#A8CABA] transition-colors">Fonctionnalités</a>
                <a href="#science" className="hover:text-[#A8CABA] transition-colors">Comment ça marche</a>
                <a href="#testimonials" className="hover:text-[#A8CABA] transition-colors">Témoignages</a>
                <a href="#pricing" className="hover:text-[#A8CABA] transition-colors">Tarifs</a>
              </div>

              {/* CTA Button - Single Bold Action */}
              <div className="flex items-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    className="px-8 py-3 bg-[#A8CABA] text-white rounded-tl-[1.5rem] rounded-tr-sm rounded-bl-sm rounded-br-[1.5rem] text-sm font-bold hover:bg-[#8BA89E] transition-colors shadow-md hover:shadow-xl"
                  >
                    Commencer
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.nav>
      </div>

      {/* HERO - Full Screen with Dramatic Image */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div 
          className="absolute inset-0"
          style={{ scale: heroScale }}
        >
          <Image
            src="/images-ai/Sunrise Track Athletes.png"
            alt="Athletes training at sunrise"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>

        {/* Floating EKYGAI Icon - Subtle Branding */}
        <motion.div
          className="absolute top-32 right-12 z-5 opacity-10 pointer-events-none hidden lg:block"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Image
            src="/logos/icon-light.svg"
            alt=""
            width={200}
            height={200}
            className="opacity-30"
          />
        </motion.div>

        {/* Hero Content */}
        <motion.div 
          className="relative z-10 max-w-5xl mx-auto px-6 text-center"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight text-white drop-shadow-2xl">
              Votre Coach
              <br />
              <span className="bg-gradient-to-r from-[#A8CABA] via-[#B3E5FC] to-white text-transparent bg-clip-text drop-shadow-2xl">
                Intelligent
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white mb-12 max-w-3xl mx-auto font-light drop-shadow-lg">
              L'IA qui transforme vos objectifs fitness en résultats réels. 
              Personnalisé, scientifique, révolutionnaire.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="px-12 py-5 bg-gradient-to-r from-[#A8CABA] to-[#8BA89E] text-white rounded-tl-[2rem] rounded-tr-sm rounded-bl-sm rounded-br-[2rem] text-lg font-bold hover:shadow-2xl hover:shadow-[#A8CABA]/40 transition-all shadow-lg h-auto"
                >
                  Commencer Gratuitement
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-12 py-5 border-2 border-white bg-white/10 backdrop-blur-sm text-white rounded-tl-[2rem] rounded-tr-sm rounded-bl-sm rounded-br-[2rem] text-lg font-bold hover:bg-white hover:text-gray-900 transition-all shadow-lg hover:shadow-xl h-auto"
                >
                  Voir la Démo
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* FEATURES - Slideshow with Special Effects */}
      <section id="features" className="relative py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images-ai/Triathlete Meditation Dawn (1).png"
            alt="Background"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/85 to-[#F4E1D2]/70" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-6 text-gray-900">
              Technologie
              <span className="bg-gradient-to-r from-[#A8CABA] to-[#B3E5FC] text-transparent bg-clip-text"> Avancée</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              L'intelligence artificielle au service de votre performance
            </p>
          </motion.div>

          <FeaturesSlideshow />
        </div>
      </section>

      {/* SCIENCE SECTION - With Video Background */}
      <section id="science" className="relative py-32 overflow-hidden">
        {/* Looping Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-85"
          >
            <source src="/grok-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-white/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="flex justify-end">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl text-right"
            >
              <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight text-gray-900">
                La Science
                <br />
                <span className="bg-gradient-to-r from-[#2C5F50] via-[#4A7C6F] to-[#6B8E7F] text-transparent bg-clip-text">
                  Qui Transforme
                </span>
              </h2>
              <p className="text-xl text-gray-800 mb-8 leading-relaxed">
                Notre algorithme analyse plus de 50 paramètres biométriques pour créer 
                des programmes d'entraînement optimisés scientifiquement.
              </p>

              <div className="space-y-6 flex flex-col items-end">
                <StatItem number="98%" label="Précision des prédictions" />
                <StatItem number="10K+" label="Athlètes actifs" />
                <StatItem number="50M+" label="Sessions complétées" />
                <StatItem number="24/7" label="Support disponible" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF - Testimonials */}
      <section className="py-32 bg-gradient-to-b from-white to-[#B3E5FC]/10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-gray-900">
              Ils ont
              <span className="bg-gradient-to-r from-[#B3E5FC] to-[#FADADD] text-transparent bg-clip-text"> Transformé</span>
            </h2>
            <p className="text-xl text-gray-600">Leurs résultats parlent d'eux-mêmes</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              name="Sophie M."
              role="Marathon Runner"
              quote="J'ai amélioré mon temps de 15 minutes en 3 mois. L'IA comprend vraiment mes besoins."
              rating={5}
            />
            <TestimonialCard
              name="Thomas D."
              role="CrossFit Athlete"
              quote="Le meilleur investissement pour ma progression. Les workouts sont toujours parfaitement dosés."
              rating={5}
            />
            <TestimonialCard
              name="Marie L."
              role="Yoga Instructor"
              quote="Enfin une app qui combine performance et bien-être. L'équilibre parfait."
              rating={5}
            />
          </div>
        </div>
      </section>

      {/* PRICING - Bold & Simple */}
      <section id="pricing" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-gray-900">
              Choisissez Votre
              <span className="bg-gradient-to-r from-[#A8CABA] to-[#B3E5FC] text-transparent bg-clip-text"> Plan</span>
            </h2>
            <p className="text-xl text-gray-600">Commencez gratuitement, évoluez à votre rythme</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free */}
            <PricingCard
              name="Gratuit"
              price="0"
              currency="DH"
              features={[
                "Programmes de base",
                "Suivi d'entraînement",
                "Communauté",
                "Analytics basiques"
              ]}
              buttonText="Commencer"
              buttonStyle="border-2 border-[#A8CABA] text-[#A8CABA] hover:bg-[#A8CABA] hover:text-white"
            />

            {/* Premium - Featured */}
            <PricingCard
              name="Premium"
              price="99"
              currency="DH"
              period="/mois"
              featured={true}
              features={[
                "Coach IA personnalisé",
                "Analytics avancés",
                "Plans nutrition",
                "Support prioritaire",
                "Programmes illimités",
                "Intégrations tierces"
              ]}
              buttonText="Essai Gratuit 14 Jours"
              buttonStyle="bg-gradient-to-r from-[#A8CABA] to-[#8BA89E] text-white hover:shadow-2xl hover:shadow-[#A8CABA]/40"
            />

            {/* Elite */}
            <PricingCard
              name="Elite"
              price="199"
              currency="DH"
              period="/mois"
              features={[
                "Tout Premium +",
                "Coach humain dédié",
                "Analyse vidéo IA",
                "Plans compétition",
                "Récupération optimisée",
                "Accès anticipé features"
              ]}
              buttonText="Contacter"
              buttonStyle="border-2 border-[#A8CABA] bg-transparent text-[#A8CABA] hover:bg-[#A8CABA] hover:text-white"
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA - Full Width Impact */}
      <section className="relative py-40 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images-ai/1764699346077.png"
            alt="Start your journey"
            fill
            className="object-cover"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight text-gray-900">
            Prêt à Commencer
            <br />
            <span className="bg-gradient-to-r from-[#7A9B8D] to-[#8BB3C4] text-transparent bg-clip-text">
              Votre Transformation?
            </span>
          </h2>
          <p className="text-2xl text-gray-700 mb-12">
            Rejoignez des milliers d'athlètes qui atteignent leurs objectifs avec EKYGAI
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="px-16 py-6 bg-gradient-to-r from-[#A8CABA] to-[#8BA89E] text-white rounded-tl-[2.5rem] rounded-tr-sm rounded-bl-sm rounded-br-[2.5rem] text-xl font-black hover:shadow-2xl hover:shadow-[#A8CABA]/40 transition-all shadow-xl h-auto"
            >
              Commencer Maintenant
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* FOOTER - Minimal & Modern */}
      <footer className="bg-gradient-to-b from-white to-[#F4E1D2]/20 border-t border-[#A8CABA]/20 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="mb-6">
                <Image 
                  src="/logos/logo-light.svg" 
                  alt="EKYGAI Logo" 
                  width={180} 
                  height={50} 
                  className="h-12 w-auto"
                />
              </div>
              <p className="text-gray-600 text-lg mb-6 max-w-md">
                L'intelligence artificielle au service de votre performance sportive.
              </p>
              <div className="flex space-x-4">
                <SocialIcon icon="🐦" label="Twitter" />
                <SocialIcon icon="📸" label="Instagram" />
                <SocialIcon icon="▶️" label="YouTube" />
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 text-gray-900">Produit</h3>
              <ul className="space-y-3 text-gray-600">
                <li><a href="#features" className="hover:text-[#A8CABA] transition-colors">Fonctionnalités</a></li>
                <li><a href="#pricing" className="hover:text-[#A8CABA] transition-colors">Tarifs</a></li>
                <li><a href="#" className="hover:text-[#A8CABA] transition-colors">Mobile App</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 text-gray-900">Support</h3>
              <ul className="space-y-3 text-gray-600">
                <li><a href="#" className="hover:text-[#A8CABA] transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-[#A8CABA] transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-[#A8CABA] transition-colors">FAQ</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#A8CABA]/20 pt-8 text-center text-gray-500 text-sm">
            <p>© 2025 EKYGAI. Tous droits réservés. Fait avec ❤️ pour les athlètes.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Component: Features Slideshow
function FeaturesSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const features = [
    {
      image: "/images-ai/Fitness App Dashboard Close-up.png",
      title: "Coach IA Personnalisé",
      description: "Algorithmes d'apprentissage profond qui s'adaptent à votre progression en temps réel",
      gradient: "from-[#A8CABA] to-[#B3E5FC]"
    },
    {
      image: "/images-ai/Gemini_Generated_Image_hk619qhk619qhk61.png",
      title: "Analytics Prédictifs",
      description: "Visualisez vos performances et anticipez vos résultats avec précision",
      gradient: "from-[#B3E5FC] to-[#FADADD]"
    },
    {
      image: "/images-ai/Ekygai Multisport Peaceful Hero.png",
      title: "Multisport Intelligent",
      description: "Course, musculation, yoga, natation - tous vos sports dans une seule app",
      gradient: "from-[#F4E1D2] to-[#FADADD]"
    },
    {
      image: "/images-ai/Gemini_Generated_Image_kb6uqtkb6uqtkb6u.png",
      title: "Nutrition Optimisée",
      description: "Plans nutritionnels personnalisés basés sur vos objectifs et métabolisme",
      gradient: "from-[#A8CABA] to-[#8BA89E]"
    },
    {
      image: "/images-ai/Triathlete Meditation Dawn (1).png",
      title: "Communauté Active",
      description: "Connectez-vous avec des athlètes qui partagent vos ambitions",
      gradient: "from-[#B3E5FC] to-[#A8CABA]"
    },
    {
      image: "/images-ai/Gemini_Generated_Image_r59wxbr59wxbr59w.png",
      title: "Science du Sport",
      description: "Méthodes validées par la recherche scientifique en physiologie",
      gradient: "from-[#FADADD] to-[#F4E1D2]"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % features.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);
  };

  const currentFeature = features[currentIndex];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="relative">
        {/* Main Slide */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95, rotateY: 10 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          exit={{ opacity: 0, scale: 0.95, rotateY: -10 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="relative overflow-hidden rounded-tl-[3rem] rounded-tr-sm rounded-bl-sm rounded-br-[3rem] bg-white shadow-2xl"
        >
          <div className="relative h-[500px] overflow-hidden">
            <Image
              src={currentFeature.image}
              alt={currentFeature.title}
              fill
              className="object-cover"
            />
          </div>
          
          <div className="p-12 bg-white">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-black mb-4 text-gray-900"
            >
              {currentFeature.title}
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-600 leading-relaxed"
            >
              {currentFeature.description}
            </motion.p>
          </div>
        </motion.div>

        {/* Navigation Buttons */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 pointer-events-none">
          <motion.button
            whileHover={{ scale: 1.1, x: -5, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="pointer-events-auto w-16 h-16 bg-white rounded-tl-[1.5rem] rounded-br-[1.5rem] rounded-tr-sm rounded-bl-sm flex items-center justify-center text-[#A8CABA] hover:bg-[#A8CABA] hover:text-white transition-all shadow-xl hover:shadow-2xl"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1, x: 5, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="pointer-events-auto w-16 h-16 bg-white rounded-tl-[1.5rem] rounded-br-[1.5rem] rounded-tr-sm rounded-bl-sm flex items-center justify-center text-[#A8CABA] hover:bg-[#A8CABA] hover:text-white transition-all shadow-xl hover:shadow-2xl"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-3 mt-8">
        {features.map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            animate={index === currentIndex ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 2, repeat: index === currentIndex ? Infinity : 0 }}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all ${
              index === currentIndex 
                ? 'bg-[#A8CABA] w-12 h-3 rounded-tl-[0.5rem] rounded-tr-sm rounded-bl-sm rounded-br-[0.5rem] shadow-md' 
                : 'w-3 h-3 bg-gray-300 hover:bg-gray-400 rounded-tl-[0.3rem] rounded-tr-sm rounded-bl-sm rounded-br-[0.3rem]'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// Component: Feature Card
function FeatureCard({ image, title, description, gradient }: {
  image: string;
  title: string;
  description: string;
  gradient: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, rotateY: 5, scale: 1.02 }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-tl-[2rem] rounded-tr-sm rounded-bl-sm rounded-br-[2rem] bg-white border border-[#A8CABA]/20 hover:border-[#A8CABA]/40 transition-all shadow-xl hover:shadow-2xl"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${gradient} opacity-40 group-hover:opacity-50 transition-opacity`} />
      </div>
      <div className="p-8">
        <h3 className="text-2xl font-bold mb-3 text-gray-900">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

// Component: Stat Item
function StatItem({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center space-x-4">
      <div className="text-5xl font-black bg-gradient-to-r from-[#2C5F50] to-[#4A7C6F] text-transparent bg-clip-text">
        {number}
      </div>
      <div className="text-lg text-gray-800">{label}</div>
    </div>
  );
}

// Component: Testimonial Card
function TestimonialCard({ name, role, quote, rating }: {
  name: string;
  role: string;
  quote: string;
  rating: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white rounded-tl-[2rem] rounded-tr-sm rounded-bl-sm rounded-br-[2rem] p-8 border border-[#A8CABA]/20 hover:border-[#A8CABA]/40 transition-all shadow-xl hover:shadow-2xl">
        <CardContent className="p-0">
          <div className="flex mb-4">
            {[...Array(rating)].map((_, i) => (
              <span key={i} className="text-[#FADADD] text-xl">★</span>
            ))}
          </div>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed italic">"{quote}"</p>
          <div>
            <div className="font-bold text-gray-900">{name}</div>
            <div className="text-sm text-gray-600">{role}</div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Component: Pricing Card
function PricingCard({ name, price, currency, period, features, buttonText, buttonStyle, featured }: {
  name: string;
  price: string;
  currency: string;
  period?: string;
  features: string[];
  buttonText: string;
  buttonStyle: string;
  featured?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, scale: 1.03 }}
      transition={{ duration: 0.5 }}
    >
      <Card className={`relative rounded-tl-[2rem] rounded-tr-sm rounded-bl-sm rounded-br-[2rem] shadow-xl ${
        featured 
          ? 'bg-gradient-to-b from-white to-[#F4E1D2]/10 border-2 border-[#A8CABA] shadow-2xl shadow-[#A8CABA]/20' 
          : 'bg-white border border-[#A8CABA]/20 shadow-lg'
      }`}>
        {featured && (
          <Badge className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-[#A8CABA] to-[#B3E5FC] rounded-tl-[1.5rem] rounded-tr-sm rounded-bl-sm rounded-br-[1.5rem] text-sm font-bold text-white shadow-lg border-0 hover:from-[#A8CABA] hover:to-[#B3E5FC]">
            POPULAIRE
          </Badge>
        )}

        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold mb-4 text-gray-900">{name}</CardTitle>
          <div className="flex items-baseline justify-center mb-2">
            <span className="text-6xl font-black bg-gradient-to-r from-[#A8CABA] to-[#B3E5FC] text-transparent bg-clip-text">{price}</span>
            <span className="text-2xl text-gray-600 ml-2">{currency}</span>
          </div>
          {period && <CardDescription className="text-gray-600">{period}</CardDescription>}
        </CardHeader>

        <CardContent>
          <ul className="space-y-4 mb-8">
            {features.map((feature, i) => (
              <li key={i} className="flex items-center text-gray-700">
                <span className="text-[#A8CABA] mr-3 text-lg">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter>
          <motion.div className="w-full" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              className={`w-full py-4 rounded-tl-[1.5rem] rounded-tr-sm rounded-bl-sm rounded-br-[1.5rem] font-bold transition-all shadow-lg h-auto ${buttonStyle}`}
            >
              {buttonText}
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

// Component: Social Icon
function SocialIcon({ icon, label }: { icon: string; label: string }) {
  return (
    <motion.a
      href="#"
      whileHover={{ scale: 1.1, y: -2 }}
      className="w-12 h-12 bg-[#F4E1D2]/40 rounded-tl-[1rem] rounded-tr-sm rounded-bl-sm rounded-br-[1rem] flex items-center justify-center text-xl hover:bg-[#A8CABA] hover:text-white transition-colors shadow-md hover:shadow-lg"
      aria-label={label}
    >
      {icon}
    </motion.a>
  );
}
