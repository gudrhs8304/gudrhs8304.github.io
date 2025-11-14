import {useEffect, useMemo, useState, useRef} from "react";
import {motion, useScroll, useTransform, useSpring, useInView} from "framer-motion";
import {Code2, ExternalLink, FileDown, Github, Mail, Moon, Star, Sun, Phone, Sparkles, Zap, Rocket} from "lucide-react";
import {FaDatabase, FaGithub, FaJava, FaLeaf, FaProjectDiagram, FaReact} from "react-icons/fa";
import {SiMariadb, SiSpringboot, SiSwagger} from "react-icons/si";
import { SiApachetomcat } from "react-icons/si";
import { RiFileCodeLine } from "react-icons/ri";

const TECH_ICON = {
    Java: FaJava,
    "Spring Boot": SiSpringboot,
    MyBatis: FaDatabase,
    JPA: FaDatabase,
    MariaDB: SiMariadb,
    "REST API": FaProjectDiagram,
    React: FaReact,
    Thymeleaf: FaLeaf,
    Swagger: SiSwagger,
    "Git/GitHub": FaGithub,
    JSP: SiApachetomcat,
};

const CONFIG = {
    name: "김형곤",
    role: "백엔드 지향 풀스택 개발자",
    tagline: "Spring Boot · MyBatis/JPA · MariaDB · React",
    email: "gudrhs8304@gmail.com",
    githubUser: "gudrhs8304",
    resumePath: "/resume.pdf",
    projects: [
        {
            title: "햄버거 키오스크",
            emoji: "🍔",
            summary:
                "주문/결제 흐름 · 관리자(메뉴/재고/매출) · 사용자 UI. Spring Boot + MyBatis + Thymeleaf.",
            tech: ["Spring Boot", "MyBatis", "MariaDB", "Thymeleaf"],
            repo: "https://github.com/gudrhs8304/hamburgerKiosk",
            demo: "",
            bullets: [
                "주문부터 결제까지 핵심 흐름 구현 및 예외 처리",
                "관리자 대시보드: 매출 통계, 인기 메뉴 TOP5, 재고 경고",
                "이미지 업로드/관리, Swagger 기반 API 문서화",
            ],
        },
        {
            title: "Ticketory – 영화 예매",
            emoji: "🎬",
            summary:
                "상영시간 · 좌석 선택 · 예매 흐름(결제 시뮬). Spring Boot + React + MariaDB.",
            tech: ["Spring Boot", "React", "MariaDB", "REST API"],
            repo: "https://github.com/gudrhs8304/ticketory_project",
            demo: "",
            bullets: [
                "상영관/좌석 모델링, 예매 트랜잭션 처리",
                "QR 티켓/마이페이지, 관리자 상영시간 관리",
                "CI/CD 및 GitHub Pages 간단 배포 경험",
            ],
        },
        {
            title: "일기장",
            emoji: "📔",
            summary:
                "일기장 · 사용자 UI. React + JavaScript.",
            tech: ["React", "JavaScript"],
            repo: "https://github.com/gudrhs8304/react_edu_diary_250805",
            demo: "",
            bullets: [
                "일기장",
                "등록, 수정, 삭제, 감정표현 가능",
                "React, JavaScript, CSS 기반 구현",
            ],
        },
         {
            title: "주차장관리시스템",
            emoji: "🚘",
            summary:
                "주차관리 · MVC패턴 · JSP · 관리자 페이지",
            tech: ["JAVA", "JSP"],
            repo: "https://github.com/gudrhs8304/koreaitParkingSystem",
            demo: "",
            bullets: [
                "주차장관리",
                "입차, 출차, 할인, 요금계산",
                "MVC 패턴, JSP 기반 구현",
            ],
        },
    ],
    skills: [
        {name: "Java", icon: FaJava},
        {name: "Spring Boot", icon: SiSpringboot},
        {name: "MyBatis", icon: FaDatabase},
        {name: "JPA", icon: FaDatabase},
        {name: "MariaDB", icon: SiMariadb},
        {name: "REST API", icon: FaProjectDiagram},
        {name: "React", icon: FaReact},
        {name: "Thymeleaf", icon: FaLeaf},
        {name: "Swagger", icon: SiSwagger},
        {name: "Git/GitHub", icon: FaGithub},
        { name: "JSP", icon: SiApachetomcat },
    ],
    seeking: "신입 백엔드 포지션 구직 중",
    repoSort: "recent",
    about: "끈기있게 소통하며 맡은일에 책임감있게 성과내는 소중한 인재",
};

// Floating particles background component
function FloatingParticles() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                    }}
                />
            ))}
        </div>
    );
}

// Typing animation component
function TypingText({ text, className }) {
    const [displayText, setDisplayText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, 100);
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, text]);

    return <span className={className}>{displayText}<span className="animate-pulse">|</span></span>;
}

function Chip({children}) {
    return (
        <span
            className="inline-block rounded-full border border-zinc-300 px-3 py-1 text-sm text-zinc-700 dark:border-zinc-700 dark:text-zinc-200">
      {children}
    </span>
    );
}

function Section({id, title, children}) {
    return (
        <section id={id} className="border-t border-zinc-200 px-4 py-16 dark:border-zinc-800">
            <div className="mx-auto max-w-5xl">
                <motion.h2
                    className="mb-6 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white"
                    initial={{opacity: 0, y: 8}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.4}}
                >
                    {title}
                </motion.h2>
                {children}
            </div>
        </section>
    );
}

function useGithubRepos(username) {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let abort = new AbortController();

        async function load() {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
                    signal: abort.signal,
                    headers: {Accept: "application/vnd.github+json"},
                });
                if (!res.ok) throw new Error("GitHub API 요청 실패");
                const data = await res.json();
                const filtered = data.filter((r) => !r.fork && !r.archived);
                const sorted = CONFIG.repoSort === 'recent'
                    ? filtered.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
                    : filtered.sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0));
                setRepos(sorted.slice(0, 6));
            } catch (e) {
                if (e.name !== "AbortError") setError(e.message);
            } finally {
                setLoading(false);
            }
        }

        load();
        return () => abort.abort();
    }, [username]);

    return {repos, loading, error};
}

export default function App() {
    const {repos, loading} = useGithubRepos(CONFIG.githubUser);
    const year = useMemo(() => new Date().getFullYear(), []);
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll();
    const scaleProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== "undefined") {
            return document.documentElement.classList.contains("dark");
        }
        return false;
    });

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const toggleDarkMode = () => {
        setDarkMode((prev) => {
            const next = !prev;
            if (next) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
            return next;
        });
    };

    return (
        <div ref={containerRef}
            className="min-h-screen scroll-smooth bg-gradient-to-br from-zinc-50 via-white to-blue-50 text-zinc-900 antialiased dark:from-zinc-950 dark:via-zinc-900 dark:to-blue-950 dark:text-zinc-100">

            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-50"
                style={{ scaleX: scrollYProgress }}
            />

            {/* Custom Cursor Trail */}
            <motion.div
                className="fixed w-6 h-6 border-2 border-blue-500 rounded-full pointer-events-none z-50 mix-blend-difference"
                animate={{
                    x: mousePosition.x - 12,
                    y: mousePosition.y - 12,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
            />

            {/* Hero Header with 3D Effect */}
            <header
                className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 px-4 py-32 text-white transition-all duration-500">

                {/* Floating Particles */}
                <FloatingParticles />

                {/* Animated Mesh Gradient */}
                <div className="absolute inset-0 opacity-30">
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
                        animate={{
                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        style={{ backgroundSize: "200% 200%" }}
                    />
                </div>

                {/* Neon Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e510_1px,transparent_1px),linear-gradient(to_bottom,#4f46e510_1px,transparent_1px)] bg-[size:4rem_4rem]" />

                <div className="relative mx-auto flex max-w-5xl flex-col gap-10">
                    <motion.div
                        initial={{opacity: 0, scale: 0.9}}
                        animate={{opacity: 1, scale: 1}}
                        transition={{duration: 0.8, ease: "easeOut"}}
                        className="space-y-6"
                    >
                        {/* Badge with pulse animation */}
                        <motion.div
                            className="inline-block"
                            animate={{
                                scale: [1, 1.05, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-5 py-2 text-sm font-bold text-white shadow-[0_0_20px_rgba(59,130,246,0.5)] animate-pulse-glow">
                                <Sparkles size={16} />
                                {CONFIG.seeking}
                                <Zap size={16} />
                            </span>
                        </motion.div>

                        {/* Name with 3D Text Effect */}
                        <motion.h1
                            className="text-6xl font-black tracking-tight sm:text-7xl lg:text-8xl"
                            initial={{opacity: 0, y: 50}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.8, delay: 0.2}}
                        >
                            <span className="inline-block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:scale-105 transition-transform duration-300">
                                {CONFIG.name}
                            </span>
                        </motion.h1>

                        {/* Typing Animation for Role */}
                        <motion.div
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{duration: 0.8, delay: 0.5}}
                        >
                            <p className="text-2xl sm:text-3xl font-bold text-blue-200 flex items-center gap-2">
                                <Rocket className="inline animate-bounce" size={28} />
                                <TypingText text={CONFIG.role} className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300" />
                            </p>
                        </motion.div>

                        <motion.p
                            className="text-xl text-slate-300 max-w-2xl"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{duration: 0.8, delay: 0.8}}
                        >
                            {CONFIG.tagline}
                        </motion.p>
                    </motion.div>

                    <motion.nav
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.8, delay: 1}}
                        className="flex flex-wrap items-center gap-4"
                    >
                        {["소개", "프로젝트", "기술", "연락처"].map((item, i) => (
                            <motion.a
                                key={item}
                                href={`#${item === "소개" ? "about" : item === "프로젝트" ? "projects" : item === "기술" ? "skills" : "contact"}`}
                                className="relative text-blue-100 hover:text-white transition-colors duration-200 font-bold text-lg group"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {item}
                                <motion.span
                                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"
                                />
                            </motion.a>
                        ))}

                        <motion.button
                            onClick={toggleDarkMode}
                            className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/30 px-5 py-2.5 text-sm hover:bg-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 font-bold"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {darkMode ? <Sun size={18} className="animate-spin-slow"/> : <Moon size={18}/>}
                            {darkMode ? "라이트" : "다크"}
                        </motion.button>

                        <div className="flex flex-1 justify-end gap-3">
                            <motion.a
                                href={`https://github.com/${CONFIG.githubUser}`}
                                target="_blank"
                                className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/30 px-5 py-2.5 text-sm hover:bg-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 font-bold"
                                whileHover={{ scale: 1.05, rotate: 5 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Github size={18}/> GitHub
                            </motion.a>
                            <motion.a
                                href={CONFIG.resumePath}
                                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-5 py-2.5 text-sm font-bold shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:shadow-[0_0_30px_rgba(139,92,246,0.8)] transition-all duration-300"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                animate={{
                                    boxShadow: [
                                        "0 0 20px rgba(139,92,246,0.5)",
                                        "0 0 30px rgba(139,92,246,0.8)",
                                        "0 0 20px rgba(139,92,246,0.5)",
                                    ],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                }}
                            >
                                <FileDown size={18}/> 이력서 다운로드
                            </motion.a>
                        </div>
                    </motion.nav>
                </div>
            </header>

            <Section id="about" title="소개">
                <motion.p
                    className="max-w-3xl text-zinc-700 dark:text-zinc-300"
                    initial={{opacity: 0, y: 6}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.35}}
                >
                    {CONFIG.about}
                </motion.p>
            </Section>

            <Section id="projects" title="프로젝트">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    {CONFIG.projects.map((p, idx) => {
                        const cardRef = useRef(null);
                        const isInView = useInView(cardRef, { once: true, amount: 0.3 });

                        return (
                            <motion.article
                                key={p.title}
                                ref={cardRef}
                                className="group relative overflow-hidden rounded-3xl border-2 border-transparent bg-gradient-to-br from-white/80 via-blue-50/50 to-purple-50/50 backdrop-blur-xl p-8 shadow-[0_0_0_1px_rgba(59,130,246,0.1)] hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] dark:from-zinc-900/80 dark:via-blue-950/50 dark:to-purple-950/50 transition-all duration-500 hover:-translate-y-2 tilt-3d"
                                initial={{opacity: 0, y: 50, rotateX: 10}}
                                animate={isInView ? {opacity: 1, y: 0, rotateX: 0} : {}}
                                transition={{duration: 0.8, delay: idx * 0.15, type: "spring"}}
                                whileHover={{
                                    scale: 1.02,
                                    rotateY: 2,
                                    rotateX: 2,
                                }}
                            >
                                {/* Animated Border Gradient */}
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

                                {/* Shimmer Effect */}
                                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 animate-shimmer transition-opacity duration-500"></div>

                                {/* Neon Glow on Hover */}
                                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-500"></div>

                                <div className="relative z-10">
                                    {/* Project Header with Float Animation */}
                                    <motion.div
                                        className="mb-5 flex items-start justify-between"
                                        whileHover={{ y: -5 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <h3 className="text-3xl font-black flex items-center gap-3 text-zinc-900 dark:text-white">
                                            <motion.span
                                                className="text-5xl"
                                                animate={{
                                                    rotate: [0, 10, -10, 0],
                                                    scale: [1, 1.1, 1],
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    repeatDelay: 3,
                                                }}
                                            >
                                                {p.emoji}
                                            </motion.span>
                                            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                                                {p.title}
                                            </span>
                                        </h3>
                                    </motion.div>

                                    <p className="mb-5 text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">{p.summary}</p>

                                    <ul className="mb-6 space-y-3 text-base text-zinc-700 dark:text-zinc-300">
                                        {p.bullets.map((b, i) => (
                                            <motion.li
                                                key={i}
                                                className="flex items-start gap-3"
                                                initial={{opacity: 0, x: -20}}
                                                animate={isInView ? {opacity: 1, x: 0} : {}}
                                                transition={{delay: 0.5 + i * 0.1}}
                                            >
                                                <motion.span
                                                    className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                                                    animate={{
                                                        scale: [1, 1.3, 1],
                                                        boxShadow: [
                                                            "0 0 0 0 rgba(59, 130, 246, 0.7)",
                                                            "0 0 0 10px rgba(59, 130, 246, 0)",
                                                        ],
                                                    }}
                                                    transition={{
                                                        duration: 1.5,
                                                        repeat: Infinity,
                                                        delay: i * 0.2,
                                                    }}
                                                />
                                                <span>{b}</span>
                                            </motion.li>
                                        ))}
                                    </ul>

                                    <div className="mb-6 flex flex-wrap gap-2">
                                        {p.tech.map((t, i) => {
                                            const Icon = TECH_ICON[t];
                                            return (
                                                <motion.span
                                                    key={t}
                                                    className="inline-flex items-center gap-2 rounded-full border-2 border-blue-300/50 bg-gradient-to-r from-blue-100/80 to-purple-100/80 px-4 py-2 text-sm font-bold text-blue-700 shadow-md hover:shadow-lg hover:scale-110 dark:border-blue-700/50 dark:from-blue-950/80 dark:to-purple-950/80 dark:text-blue-300 transition-all duration-300"
                                                    initial={{opacity: 0, scale: 0}}
                                                    animate={isInView ? {opacity: 1, scale: 1} : {}}
                                                    transition={{delay: 0.8 + i * 0.05, type: "spring"}}
                                                    whileHover={{ rotate: 5 }}
                                                >
                                                    {Icon ? <Icon size={16} aria-hidden/> : null}
                                                    {t}
                                                </motion.span>
                                            );
                                        })}
                                    </div>

                                    <div className="flex gap-4">
                                        {p.repo && (
                                            <motion.a
                                                href={p.repo}
                                                target="_blank"
                                                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-zinc-900 to-zinc-700 px-6 py-3 text-sm font-bold text-white shadow-lg hover:shadow-xl dark:from-white dark:to-zinc-100 dark:text-zinc-900 transition-all duration-300"
                                                whileHover={{scale: 1.05, y: -2}}
                                                whileTap={{scale: 0.95}}
                                            >
                                                <Code2 size={18}/> 코드 보기
                                            </motion.a>
                                        )}
                                        {p.demo && (
                                            <motion.a
                                                href={p.demo}
                                                target="_blank"
                                                className="inline-flex items-center gap-2 rounded-full border-2 border-zinc-300 bg-white/50 px-6 py-3 text-sm font-bold hover:bg-white dark:border-zinc-700 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 transition-all duration-300 shadow-md hover:shadow-lg"
                                                whileHover={{scale: 1.05, y: -2}}
                                                whileTap={{scale: 0.95}}
                                            >
                                                <ExternalLink size={18}/> 데모
                                            </motion.a>
                                        )}
                                    </div>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            </Section>

            <Section id="github" title="GitHub 상위 레포">
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {repos.map((r, idx) => (
                            <motion.a
                                key={r.id}
                                href={r.html_url}
                                target="_blank"
                                initial={{opacity: 0, y: 20}}
                                whileInView={{opacity: 1, y: 0}}
                                viewport={{once: true}}
                                transition={{duration: 0.4, delay: idx * 0.05}}
                                className="group relative overflow-hidden rounded-2xl border border-zinc-200/50 bg-white/50 backdrop-blur-sm p-5 hover:bg-white dark:border-zinc-800/50 dark:bg-zinc-900/50 dark:hover:bg-zinc-800/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300"></div>
                                <div className="relative">
                                    <div className="mb-3 flex items-start justify-between gap-2">
                                        <h4 className="font-semibold text-zinc-900 dark:text-white line-clamp-1">{r.name}</h4>
                                        <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                                            <Star size={12} fill="currentColor"/> {r.stargazers_count}
                                        </span>
                                    </div>
                                    <p className="line-clamp-2 text-sm text-zinc-600 dark:text-zinc-300">{r.description || "설명 없음"}</p>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                )}
            </Section>

            <Section id="skills" title="기술">
                <div className="flex flex-wrap gap-3">
                    {CONFIG.skills.map((s, idx) => {
                        // 각 기술별 고유 색상 정의
                        const iconColors = {
                            "Java": "text-[#007396]",
                            "Spring Boot": "text-[#6DB33F]",
                            "MyBatis": "text-[#EC1C24]",
                            "JPA": "text-[#59666C]",
                            "MariaDB": "text-[#003545]",
                            "REST API": "text-[#0080FF]",
                            "React": "text-[#61DAFB]",
                            "Thymeleaf": "text-[#005F0F]",
                            "Swagger": "text-[#85EA2D]",
                            "Git/GitHub": "text-[#F05032]",
                            "JSP": "text-[#F89820]"
                        };

                        return (
                            <motion.div
                                key={s.name}
                                initial={{opacity: 0, scale: 0.8}}
                                whileInView={{opacity: 1, scale: 1}}
                                viewport={{once: true}}
                                transition={{duration: 0.3, delay: idx * 0.05}}
                                className="group"
                            >
                                <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 shadow-sm hover:shadow-md hover:scale-105 hover:border-blue-300 hover:bg-blue-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-blue-700 dark:hover:bg-blue-950 transition-all duration-200">
                                    <s.icon
                                        size={18}
                                        className={`group-hover:scale-110 transition-transform ${iconColors[s.name] || 'text-blue-600'}`}
                                        aria-hidden
                                    />
                                    {s.name}
                                </span>
                            </motion.div>
                        );
                    })}
                </div>
            </Section>

            <Section id="contact" title="연락처">
                <div className="flex flex-wrap items-center gap-4">
                    <motion.a
                        initial={{opacity: 0, y: 10}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{duration: 0.3}}
                        className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-medium shadow-sm hover:shadow-md hover:scale-105 hover:border-blue-300 hover:bg-blue-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-700 dark:hover:bg-blue-950 transition-all duration-200"
                        href={`mailto:${CONFIG.email}`}
                    >
                        <Mail size={18} className="text-blue-600 dark:text-blue-400"/> {CONFIG.email}
                    </motion.a>
                    <motion.a
                        initial={{opacity: 0, y: 10}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{duration: 0.3, delay: 0.1}}
                        className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-medium shadow-sm hover:shadow-md hover:scale-105 hover:border-purple-300 hover:bg-purple-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-purple-700 dark:hover:bg-purple-950 transition-all duration-200"
                        href={`https://github.com/${CONFIG.githubUser}`}
                        target="_blank"
                    >
                        <Github size={18} className="text-purple-600 dark:text-purple-400"/> @{CONFIG.githubUser}
                    </motion.a>
                    <motion.a
                        initial={{opacity: 0, y: 10}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{duration: 0.3, delay: 0.2}}
                        className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-medium shadow-sm hover:shadow-md hover:scale-105 hover:border-green-300 hover:bg-green-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-green-700 dark:hover:bg-green-950 transition-all duration-200"
                        href="tel:010-7253-3804"
                    >
                        <Phone size={18} className="text-green-600 dark:text-green-400"/> 010-7253-3804
                    </motion.a>
                    <motion.a
                        initial={{opacity: 0, y: 10}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{duration: 0.3, delay: 0.3}}
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 text-sm font-medium text-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
                        href={CONFIG.resumePath}
                    >
                        <FileDown size={18}/> 이력서 다운로드
                    </motion.a>
                </div>
            </Section>

            <footer className="relative overflow-hidden border-t border-zinc-200/50 px-4 py-12 dark:border-zinc-800/50">
                <div className="absolute inset-0 bg-gradient-to-t from-blue-50/30 to-transparent dark:from-blue-950/30"></div>
                <div className="relative mx-auto max-w-5xl text-center">
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">© {year} {CONFIG.name}. All rights reserved.</p>
                    <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">
                        Built with React, Tailwind CSS & Framer Motion
                    </p>
                </div>
            </footer>
        </div>
      );
}
