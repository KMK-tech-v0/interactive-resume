import { useState, useEffect } from "react";
import { motion, AnimatePresence, Transition } from "framer-motion";
import { Badge } from "./components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
} from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Progress } from "./components/ui/progress";

import profileImage from "@/assets/Kaung Myat Kyaw.png";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  Briefcase,
  GraduationCap,
  BarChart3,
  Users,
  Award,
  Lightbulb,
  Heart,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Home,
  FileText,
  Target,
  BookOpen,
  Code2,
  Brain,
  Download,
  Zap,
  Camera,
} from "lucide-react";

const slides = [
  { id: "intro", title: "Profile", icon: Home },
  { id: "summary", title: "Summary", icon: FileText },
  { id: "experience", title: "Experience", icon: Briefcase },
  { id: "education", title: "Education", icon: BookOpen },
  { id: "skills", title: "Skills", icon: Code2 },
  { id: "personal", title: "Personal", icon: Brain },
  { id: "contact", title: "Contact", icon: Mail },
];

const colorMap = {
  blue: {
    icon: "text-blue-400",
    badge: "bg-blue-900/50 text-blue-300 border-blue-700/50",
  },
  green: {
    icon: "text-green-400",
    badge: "bg-green-900/50 text-green-300 border-green-700/50",
  },
  purple: {
    icon: "text-purple-400",
    badge: "bg-purple-900/50 text-purple-300 border-purple-700/50",
  },
  yellow: {
    icon: "text-yellow-400",
    badge: "bg-yellow-900/50 text-yellow-300 border-yellow-700/50",
  },
} as const;

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const [typedName, setTypedName] = useState("");
  
  const fullName = "Kaung Myat Kyaw";

  useEffect(() => {
    

    // Typing animation for name
    let i = 0;
    const typeTimer = setInterval(() => {
      if (i < fullName.length) {
        setTypedName(fullName.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typeTimer);
      }
    }, 100);

    return () => clearInterval(typeTimer);
  }, []);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    
  };

  

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  const slideTransition: Transition = {
    x: { type: "spring", stiffness: 300, damping: 30 },
    opacity: { duration: 0.3 },
    scale: { duration: 0.3 },
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* New Horizontal Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container h-14 flex items-center">
          <nav className="flex items-center space-x-4 lg:space-x-6">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  currentSlide === index
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {slide.title}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Animated background elements */}
      
      

      

      

      {/* Main Content Area */}
      <div className="min-h-screen relative">
        {/* Slide Container */}
        <div className="h-screen overflow-hidden relative">
          <AnimatePresence mode="wait" custom={currentSlide}>
            <motion.div
              key={currentSlide}
              custom={currentSlide}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideTransition}
              className="absolute inset-0 p-6 md:p-12 overflow-y-auto"
            >
              {renderSlideContent(
                currentSlide,
                typedName,
                
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-6 right-6 flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="bg-slate-800/80 backdrop-blur-sm border-slate-600 text-slate-300 hover:text-slate-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <div className="flex items-center gap-2 px-3 py-2 bg-slate-800/80 backdrop-blur-sm rounded-lg border border-slate-600">
            <span className="text-sm font-medium text-blue-400">
              {currentSlide + 1}
            </span>
            <span className="text-xs text-slate-500">of</span>
            <span className="text-sm font-medium text-blue-400">
              {slides.length}
            </span>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="bg-slate-800/80 backdrop-blur-sm border-slate-600 text-slate-300 hover:text-slate-100"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-6 flex gap-2">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "bg-blue-500 scale-125"
                  : "bg-slate-600 hover:bg-slate-500"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function renderSlideContent(
  slideIndex: number,
  typedName: string,
) {
  const slideVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  switch (slideIndex) {
    case 0: // Profile/Intro
      return (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-8 relative">
          

          <motion.div
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-3xl shadow-2xl relative overflow-hidden border-4 border-slate-700/50">
              <img
                src={profileImage}
                alt="Kaung Myat Kyaw"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-green-500 rounded-3xl border-8 border-slate-900  flex items-center justify-center">
              <Zap className="w-8 h-8 text-white" />
            </div>
          </motion.div>

          <motion.div
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-slate-100 min-h-[1.2em]">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 bg-clip-text text-transparent">
                {typedName}
              </span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-blue-500"
              >
                |
              </motion.span>
            </h1>
            <div className="flex items-center justify-center gap-3 text-blue-400">
              <Briefcase className="w-6 h-6" />
              <span className="text-2xl font-medium">
                Data Analyst
              </span>
            </div>
            <p className="text-lg text-slate-300 max-w-2xl">
              Transforming data into{" "}
              <span className="text-blue-400 font-semibold">
                actionable insights
              </span>{" "}
              with over{" "}
              <span className="text-purple-400 font-semibold">
                10 years
              </span>{" "}
              of experience
            </p>
          </motion.div>

          <motion.div
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
          >
            <div className="p-4 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50">
              <div className="text-2xl font-bold text-blue-400">
                10+
              </div>
              <div className="text-sm text-slate-300">
                Years Experience
              </div>
            </div>
            <div className="p-4 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50">
              <div className="text-2xl font-bold text-green-400">
                50+
              </div>
              <div className="text-sm text-slate-300">
                Projects Completed
              </div>
            </div>
            <div className="p-4 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50">
              <div className="text-2xl font-bold text-purple-400">
                15+
              </div>
              <div className="text-sm text-slate-300">
                Skills Mastered
              </div>
            </div>
            <div className="p-4 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50">
              <div className="text-2xl font-bold text-yellow-400">
                100%
              </div>
              <div className="text-sm text-slate-300">
                Dedication
              </div>
            </div>
          </motion.div>
        </div>
      );

    case 1: // Summary
      return (
        <div className="max-w-4xl mx-auto space-y-8 relative">
          

          <motion.div
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold text-slate-100 mb-6 flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl border border-slate-700/50">
                <User className="w-8 h-8 text-blue-400" />
              </div>
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Professional Summary
              </span>
            </h2>
          </motion.div>

          <motion.div
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            <Card className="border-0 shadow-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
              <CardContent className="p-8">
                <p className="text-lg text-slate-200 leading-relaxed mb-6">
                  Detail-oriented and results-driven{" "}
                  <span className="text-blue-400 font-semibold">
                    Data Analyst
                  </span>{" "}
                  with over{" "}
                  <span className="text-purple-400 font-semibold">
                    10 years of experience
                  </span>{" "}
                  spanning telecom analytics, production
                  management, and business operations. Proven
                  ability to gather, clean, and interpret{" "}
                  <span className="text-green-400 font-semibold">
                    complex datasets
                  </span>
                  to uncover actionable insights.
                </p>
                <p className="text-lg text-slate-200 leading-relaxed">
                  Skilled in{" "}
                  <span className="text-yellow-400 font-semibold">
                    SQL, Python, R, and Power BI
                  </span>
                  , with a strong foundation in{" "}
                  <span className="text-blue-400 font-semibold">
                    statistical analysis
                  </span>{" "}
                  and dashboard development. Adept at
                  collaborating across departments, leading
                  teams, and driving
                  <span className="text-purple-400 font-semibold">
                    {" "}
                    data-informed decision-making
                  </span>
                  .
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-900/30 to-blue-800/30 border border-blue-700/50">
              <CardContent className="p-6 text-center">
                <Target className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="font-semibold text-blue-300 mb-3">
                  Mission
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Transform complex data into clear, actionable
                  business insights that drive strategic
                  decision-making and measurable business growth
                  through innovative analytics solutions.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-900/30 to-green-800/30 border border-green-700/50">
              <CardContent className="p-6 text-center">
                <BarChart3 className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="font-semibold text-green-300 mb-3">
                  Expertise
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Advanced statistical analysis, interactive
                  dashboard development, data visualization,
                  predictive modeling, and business intelligence
                  solutions using cutting-edge tools and
                  methodologies.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-900/30 to-purple-800/30 border border-purple-700/50">
              <CardContent className="p-6 text-center">
                <Users className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="font-semibold text-purple-300 mb-3">
                  Leadership
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Cross-functional collaboration, team
                  management, stakeholder communication,
                  training delivery, and fostering data-driven
                  culture across organizations with proven
                  leadership experience.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      );

    case 2: // Experience
      return (
        <div className="max-w-5xl mx-auto space-y-8 relative">
          

          <motion.div
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold text-slate-100 mb-6 flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl border border-slate-700/50">
                <Briefcase className="w-8 h-8 text-orange-400" />
              </div>
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Work Experience
              </span>
            </h2>
          </motion.div>

          <div className="space-y-8">
            {/* Current Position */}
            <motion.div
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
              className="relative pl-8 pb-8 border-l-2 border-blue-500/50"
            >
              <div className="absolute -left-3 top-0 w-6 h-6 bg-blue-500 rounded-full border-4 border-slate-900 shadow-lg" />
              <Card className="border-0 shadow-xl bg-gradient-to-r from-slate-800/50 via-slate-800/50 to-blue-900/30 border border-slate-700/50">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-2xl font-semibold text-blue-300">
                        Data Analyst
                      </h3>
                      <p className="text-blue-400 font-medium text-lg">
                        Myanmar Padauk Engineering &
                        Construction Co., Ltd – Yangon
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className="self-start px-4 py-2 text-sm bg-blue-900/50 text-blue-300 border-blue-700/50"
                    >
                      Mar 2024 – Present
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "Gather and compile telecom data from network logs and usage records",
                      "Ensure data integrity through validation and quality checks",
                      "Maintain and update databases and data management systems",
                      "Analyze trends, patterns, and anomalies in telecom datasets",
                      "Develop dashboards and visualizations to present insights",
                      "Conduct training sessions to promote data literacy within the team",
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-slate-800/30 rounded-lg border border-slate-700/30"
                      >
                        <ArrowRight className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-200 text-sm">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Production Assistant Manager */}
            <motion.div
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.6 }}
              className="relative pl-8 pb-8 border-l-2 border-slate-600/50"
            >
              <div className="absolute -left-3 top-0 w-6 h-6 bg-green-500 rounded-full border-4 border-slate-900" />
              <Card className="border-0 shadow-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-green-300">
                        Production Assistant Manager
                      </h3>
                      <p className="text-green-400 font-medium">
                        Nilar Frozen Foods Co., Ltd – Nay Pyi
                        Taw
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className="self-start border-green-700/50 text-green-400"
                    >
                      May 2021 – Feb 2024
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      "Led production scheduling and resource coordination to meet delivery targets",
                      "Implemented quality control procedures and corrective actions",
                      "Supervised and trained production staff, fostering culture of safety and efficiency",
                      "Managed inventory levels and optimized resource utilization",
                      "Collaborated with engineering, QA, and logistics teams for seamless operations",
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 text-sm"
                      >
                        <ArrowRight className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-300">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Personal Assistant */}
            <motion.div
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.8 }}
              className="relative pl-8 pb-8 border-l-2 border-slate-600/50"
            >
              <div className="absolute -left-3 top-0 w-6 h-6 bg-purple-500 rounded-full border-4 border-slate-900" />
              <Card className="border-0 shadow-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-purple-300">
                        Personal Assistant
                      </h3>
                      <p className="text-purple-400 font-medium">
                        Nilar Holding Co., Ltd – Yangon
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className="self-start border-purple-700/50 text-purple-400"
                    >
                      Sep 2019 – Nov 2021
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      "Managed executive schedules, travel, and communications",
                      "Coordinated meetings, events, and logistics",
                      "Supported research, data collection, and budget monitoring",
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 text-sm"
                      >
                        <ArrowRight className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-300">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Sales & Marketing Supervisor */}
            <motion.div
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.0 }}
              className="relative pl-8 pb-8 border-l-2 border-slate-600/50"
            >
              <div className="absolute -left-3 top-0 w-6 h-6 bg-yellow-500 rounded-full border-4 border-slate-900" />
              <Card className="border-0 shadow-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-yellow-300">
                        Sales & Marketing Supervisor
                      </h3>
                      <p className="text-yellow-400 font-medium">
                        Myanmar Nilar Food Stuffs – Yangon
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className="self-start border-yellow-700/50 text-yellow-400"
                    >
                      Feb 2017 – Aug 2019
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      "Developed sales strategies and forecasts",
                      "Handled customer inquiries and performance reporting",
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 text-sm"
                      >
                        <ArrowRight className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-300">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Earlier Experience */}
            <motion.div
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.2 }}
              className="relative pl-8 border-l-2 border-slate-600/50"
            >
              <div className="absolute -left-3 top-0 w-6 h-6 bg-slate-500 rounded-full border-4 border-slate-900" />
              <Card className="border-0 shadow-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-300 mb-2">
                        Office Executive
                      </h3>
                      <p className="text-slate-400 text-sm">
                        ITN Company Limited – Nay Pyi Taw (Jul
                        2014 – Oct 2015)
                      </p>
                      <p className="text-slate-300 text-sm mt-1">
                        Verified daily sales records and managed
                        credit collections
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-300 mb-2">
                        Warehouse Assistant
                      </h3>
                      <p className="text-slate-400 text-sm">
                        Pro-One Home Center – Yangon (Dec 2015 –
                        Oct 2016)
                      </p>
                      <p className="text-slate-300 text-sm mt-1">
                        Maintained inventory records and ensured
                        accuracy in goods handling
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-300 mb-2">
                        Interviewer (Internship)
                      </h3>
                      <p className="text-slate-400 text-sm">
                        Neilsen MMRD – Yangon (Jan 2016 – Apr
                        2016)
                      </p>
                      <p className="text-slate-300 text-sm mt-1">
                        Conducted consumer media research and
                        data collection
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      );

    case 3: // Education
      return (
        <div className="max-w-4xl mx-auto space-y-8 relative">
          

          <motion.div
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold text-slate-100 mb-6 flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-slate-700/50">
                <GraduationCap className="w-8 h-8 text-purple-400" />
              </div>
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Education & Certifications
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
            >
              <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-900/30 to-purple-800/30 border border-purple-700/50 h-full">
                <CardHeader>
                  <h3 className="text-2xl font-bold text-purple-300 flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-purple-400" />
                    Education
                  </h3>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-6 bg-slate-800/50 rounded-xl shadow-lg border border-slate-700/50">
                    <h4 className="text-xl font-semibold text-slate-200 mb-2">
                      B.A. History
                    </h4>
                    <p className="text-purple-400 font-medium mb-1">
                      Kyaukse University, Mandalay
                    </p>
                    <p className="text-slate-400 text-sm">
                      Graduated June 2018
                    </p>
                  </div>
                  <div className="p-6 bg-slate-800/50 rounded-xl shadow-lg border border-slate-700/50">
                    <h4 className="text-xl font-semibold text-slate-200 mb-2">
                      Business in Marketing (IQN)
                    </h4>
                    <p className="text-purple-400 font-medium mb-1">
                      MIBA, Yangon
                    </p>
                    <p className="text-slate-400 text-sm">
                      Completed November 2018
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.6 }}
            >
              <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-900/30 to-cyan-800/30 border border-blue-700/50 h-full">
                <CardHeader>
                  <h3 className="text-2xl font-bold text-blue-300 flex items-center gap-3">
                    <Award className="w-6 h-6 text-blue-400" />
                    Certifications
                  </h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      name: "SOP Training",
                      level: "Advanced",
                      color: "blue" as const,
                    },
                    {
                      name: "ISO 22000 Training",
                      level: "Certified",
                      color: "green" as const,
                    },
                    {
                      name: "Customer Service Training",
                      level: "Professional",
                      color: "purple" as const,
                    },
                    {
                      name: "Leadership & Management",
                      level: "Advanced",
                      color: "yellow" as const,
                    },
                  ].map((cert, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg shadow-sm border border-slate-700/50"
                      whileHover={{ scale: 1.02 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <Award className={`w-5 h-5 ${colorMap[cert.color].icon} flex-shrink-0`} />
                        <span className="text-slate-200 font-medium">
                          {cert.name}
                        </span>
                      </div>
                      <Badge
                        variant="secondary"
                        className={`text-xs ${colorMap[cert.color].badge}`}
                      >
                        {cert.level}
                      </Badge>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      );

    case 4: // Skills
      return (
        <div className="max-w-5xl mx-auto space-y-8 relative">
          <motion.div
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold text-slate-100 mb-6 flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl border border-slate-700/50">
                <Code2 className="w-8 h-8 text-blue-400" />
              </div>
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Technical Skills
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Programming & Data */}
            <motion.div
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.35 }}
            >
              <Card className="border-0 shadow-xl bg-gradient-to-br from-slate-800/50 to-blue-900/30 border border-slate-700/50 h-full">
                <CardHeader>
                  <h3 className="text-2xl font-bold text-blue-300 flex items-center gap-3">
                    <BarChart3 className="w-6 h-6 text-blue-400" />
                    Programming & Data
                  </h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "Python", value: 85 },
                    { name: "SQL", value: 90 },
                    { name: "R", value: 70 },
                    { name: "JavaScript/TypeScript", value: 75 },
                  ].map((skill, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-200">{skill.name}</span>
                        <span className="text-blue-300 text-sm font-medium">{skill.value}%</span>
                      </div>
                      <Progress value={skill.value} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Analytics & BI */}
            <motion.div
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 }}
            >
              <Card className="border-0 shadow-xl bg-gradient-to-br from-slate-800/50 to-purple-900/30 border border-slate-700/50 h-full">
                <CardHeader>
                  <h3 className="text-2xl font-bold text-purple-300 flex items-center gap-3">
                    <Award className="w-6 h-6 text-purple-400" />
                    Analytics & BI
                  </h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "Power BI", value: 85 },
                    { name: "Excel (Advanced)", value: 90 },
                    { name: "Statistics", value: 75 },
                    { name: "Data Visualization", value: 80 },
                  ].map((skill, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-200">{skill.name}</span>
                        <span className="text-purple-300 text-sm font-medium">{skill.value}%</span>
                      </div>
                      <Progress value={skill.value} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Tools */}
            <motion.div
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.65 }}
            >
              <Card className="border-0 shadow-xl bg-gradient-to-br from-slate-800/50 to-cyan-900/30 border border-slate-700/50 h-full">
                <CardHeader>
                  <h3 className="text-2xl font-bold text-cyan-300 flex items-center gap-3">
                    <Lightbulb className="w-6 h-6 text-cyan-400" />
                    Tools & Platforms
                  </h3>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-3">
                  {["Git", "Vite", "Tailwind CSS", "Figma", "Jira", "Power Query"].map((t, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="justify-center py-3 w-full text-slate-200 bg-slate-800/50 border-cyan-700/50"
                    >
                      {t}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Soft Skills */}
            <motion.div
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.8 }}
            >
              <Card className="border-0 shadow-xl bg-gradient-to-br from-slate-800/50 to-emerald-900/30 border border-slate-700/50 h-full">
                <CardHeader>
                  <h3 className="text-2xl font-bold text-emerald-300 flex items-center gap-3">
                    <Heart className="w-6 h-6 text-emerald-400" />
                    Soft Skills
                  </h3>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-3">
                  {["Communication", "Leadership", "Problem Solving", "Teamwork", "Adaptability", "Attention to Detail"].map((t, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="justify-center py-3 w-full text-slate-200 bg-slate-800/50 border-emerald-700/50"
                    >
                      {t}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      );

    case 5: // Personal
      return (
        <div className="max-w-4xl mx-auto space-y-8 relative">
          

          <motion.div
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold text-slate-100 mb-6 flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl border border-slate-700/50">
                <Brain className="w-8 h-8 text-orange-400" />
              </div>
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Personal Qualities
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
            >
              <Card className="border-0 shadow-xl bg-gradient-to-br from-orange-900/30 to-red-800/30 border border-orange-700/50 h-full">
                <CardHeader>
                  <h3 className="text-2xl font-bold text-orange-300 flex items-center gap-3">
                    <Lightbulb className="w-6 h-6 text-orange-400" />
                    Personal Attributes
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      "Critical Thinking",
                      "Problem Solving",
                      "Fast Learner",
                      "Detail-Oriented",
                      "Leadership",
                      "Adaptability",
                      "Multitasking",
                      "Team Player",
                    ].map((attr, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Badge
                          variant="secondary"
                          className="justify-center py-3 w-full text-slate-200 bg-slate-800/50 border-orange-700/50"
                        >
                          {attr}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.6 }}
            >
              <Card className="border-0 shadow-xl bg-gradient-to-br from-pink-900/30 to-purple-800/30 border border-pink-700/50 h-full">
                <CardHeader>
                  <h3 className="text-2xl font-bold text-pink-300 flex items-center gap-3">
                    <Heart className="w-6 h-6 text-pink-400" />
                    Interests & Hobbies
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        name: "Programming & Coding",
                        icon: Code2,
                        color: "blue",
                      },
                      {
                        name: "Exploring New Technologies",
                        icon: Lightbulb,
                        color: "yellow",
                      },
                      {
                        name: "Photography",
                        icon: Camera,
                        color: "green",
                      },
                      {
                        name: "Puzzles & Logical Games",
                        icon: Brain,
                        color: "purple",
                      },
                    ].map((hobby, index) => (
                      <motion.div
                        key={index}
                        className={`flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg shadow-sm border border-slate-700/50`}
                        whileHover={{ scale: 1.02, x: 10 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      >
                        <hobby.icon
                          className={`w-6 h-6 ${colorMap[hobby.color as keyof typeof colorMap].icon}`}
                        />
                        <span className="font-medium text-slate-200">
                          {hobby.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      );

    case 6: // Contact
      return (
        <div className="max-w-4xl mx-auto space-y-8 relative">
          

          <motion.div
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold text-slate-100 mb-6 flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl border border-slate-700/50">
                <Mail className="w-8 h-8 text-blue-400" />
              </div>
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h2>
          </motion.div>

          <motion.div
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            <Card className="border-0 shadow-xl bg-gradient-to-br from-slate-800/50 via-slate-800/50 to-blue-900/30 border border-slate-700/50">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <motion.div
                    className="flex items-center gap-4 p-6 bg-slate-800/50 rounded-xl hover:bg-slate-700/50 transition-colors border border-slate-700/50"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Mail className="w-8 h-8 text-blue-400" />
                    <div>
                      <p className="font-medium text-blue-300">
                        Email
                      </p>
                      <a
                        href="mailto:kaungmyatkyaw446844590@gmail.com"
                        className="text-blue-400 hover:underline text-sm"
                      >
                        kaungmyatkyaw446844590@gmail.com
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-4 p-6 bg-slate-800/50 rounded-xl hover:bg-slate-700/50 transition-colors border border-slate-700/50"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Phone className="w-8 h-8 text-green-400" />
                    <div>
                      <p className="font-medium text-green-300">
                        Phone
                      </p>
                      <span className="text-slate-200">
                        +95 9446844590
                      </span>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-4 p-6 bg-slate-800/50 rounded-xl hover:bg-slate-700/50 transition-colors border border-slate-700/50 col-span-1 md:col-span-2"
                    whileHover={{ scale: 1.02 }}
                  >
                    <MapPin className="w-8 h-8 text-purple-400" />
                    <div>
                      <p className="font-medium text-purple-300">
                        Address
                      </p>
                      <span className="text-slate-200">
                        No.27, Pathein Nyunt 6st, Mingalar
                        Taungnyunt Tsp, Yangon, Myanmar
                      </span>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-4 p-6 bg-slate-800/50 rounded-xl hover:bg-slate-700/50 transition-colors border border-slate-700/50"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Calendar className="w-8 h-8 text-yellow-400" />
                    <div>
                      <p className="font-medium text-yellow-300">
                        Date of Birth
                      </p>
                      <span className="text-slate-200">
                        January 6, 1998
                      </span>
                    </div>
                  </motion.div>
                </div>

                <div className="text-center">
                  <p className="text-lg text-slate-200 mb-6">
                    Ready to transform your{" "}
                    <span className="text-blue-400 font-semibold">
                      data into actionable insights
                    </span>
                    ? Let's connect and discuss how I can help
                    drive your business forward.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      <Mail className="w-5 h-5 mr-2" />
                      Send Message
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-slate-600 text-slate-300 hover:text-slate-100 hover:bg-slate-800/50"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download Resume
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      );

    default:
      return null;
  }
}

