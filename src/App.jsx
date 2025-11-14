import {useEffect, useMemo, useState} from "react";
import {motion} from "framer-motion";
import {Code2, ExternalLink, FileDown, Github, Mail, Moon, Star, Sun, Phone} from "lucide-react";
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
            repo: "https://github.com/gudrhs8304/ticketory",
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

    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== "undefined") {
            return document.documentElement.classList.contains("dark");
        }
        return false;
    });

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
        <div
            className="min-h-screen scroll-smooth bg-gradient-to-br from-zinc-50 via-white to-blue-50 text-zinc-900 antialiased dark:from-zinc-950 dark:via-zinc-900 dark:to-blue-950 dark:text-zinc-100">
            {/* Hero Header with Gradient */}
            <header
                className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 px-4 py-24 text-white transition-all duration-500">
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 animate-gradient-x"></div>

                {/* Glass effect overlay */}
                <div className="absolute inset-0 backdrop-blur-3xl bg-white/5"></div>

                <div className="relative mx-auto flex max-w-5xl flex-col gap-8">
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.6, ease: "easeOut"}}
                        className="space-y-4"
                    >
                        <div className="inline-block">
                            <span className="inline-block rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-1.5 text-sm font-medium text-white shadow-lg">
                                {CONFIG.seeking}
                            </span>
                        </div>
                        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                            {CONFIG.name}
                        </h1>
                        <p className="mt-3 text-xl text-blue-100 font-medium">{CONFIG.role}</p>
                        <p className="text-lg text-slate-300">{CONFIG.tagline}</p>
                    </motion.div>

                    <motion.nav
                        initial={{opacity: 0, y: 10}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.6, delay: 0.2}}
                        className="flex flex-wrap items-center gap-3"
                    >
                        <a href="#about" className="text-blue-100 hover:text-white transition-colors duration-200 font-medium">소개</a>
                        <a href="#projects" className="text-blue-100 hover:text-white transition-colors duration-200 font-medium">프로젝트</a>
                        <a href="#skills" className="text-blue-100 hover:text-white transition-colors duration-200 font-medium">기술</a>
                        <a href="#contact" className="text-blue-100 hover:text-white transition-colors duration-200 font-medium">연락처</a>
                        <button
                            onClick={toggleDarkMode}
                            className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 text-sm hover:bg-white/20 transition-all duration-200 font-medium"
                        >
                            {darkMode ? <Sun size={16}/> : <Moon size={16}/>}
                            {darkMode ? "라이트 모드" : "다크 모드"}
                        </button>
                        <div className="flex flex-1 justify-end gap-3">
                            <a
                                href={`https://github.com/${CONFIG.githubUser}`}
                                target="_blank"
                                className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 text-sm hover:bg-white/20 hover:scale-105 transition-all duration-200 font-medium"
                            >
                                <Github size={18}/> GitHub
                            </a>
                            <a
                                href={CONFIG.resumePath}
                                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 text-sm hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium"
                            >
                                <FileDown size={18}/> 이력서
                            </a>
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
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {CONFIG.projects.map((p, idx) => (
                        <motion.article
                            key={p.title}
                            className="group relative overflow-hidden rounded-3xl border border-zinc-200/50 bg-white/50 backdrop-blur-sm p-6 shadow-lg hover:shadow-2xl dark:border-zinc-800/50 dark:bg-zinc-900/50 transition-all duration-300 hover:-translate-y-1"
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            transition={{duration: 0.5, delay: idx * 0.1}}
                        >
                            {/* Gradient overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-blue-500/5 transition-all duration-300 rounded-3xl"></div>

                            <div className="relative">
                                <div className="mb-4 flex items-start justify-between">
                                    <h3 className="text-2xl font-bold flex items-center gap-2 text-zinc-900 dark:text-white">
                                        <span className="text-3xl">{p.emoji}</span>
                                        <span className="bg-gradient-to-r from-zinc-900 via-blue-800 to-zinc-900 dark:from-white dark:via-blue-200 dark:to-white bg-clip-text text-transparent">
                                            {p.title}
                                        </span>
                                    </h3>
                                </div>
                                <p className="mb-4 text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">{p.summary}</p>
                                <ul className="mb-5 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                                    {p.bullets.map((b, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></span>
                                            <span>{b}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mb-5 flex flex-wrap gap-2">
                                    {p.tech.map((t) => {
                                        const Icon = TECH_ICON[t];
                                        return (
                                            <span
                                                key={t}
                                                className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/50 bg-blue-50/50 px-3 py-1.5 text-sm font-medium text-blue-700 dark:border-blue-800/50 dark:bg-blue-950/50 dark:text-blue-300 transition-colors"
                                            >
                                                {Icon ? <Icon size={14} aria-hidden/> : null}
                                                {t}
                                            </span>
                                        );
                                    })}
                                </div>
                                <div className="flex gap-3">
                                    {p.repo && (
                                        <a
                                            href={p.repo}
                                            target="_blank"
                                            className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 transition-all duration-200 hover:scale-105"
                                        >
                                            <Code2 size={16}/> 코드 보기
                                        </a>
                                    )}
                                    {p.demo && (
                                        <a
                                            href={p.demo}
                                            target="_blank"
                                            className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-4 py-2.5 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900 transition-all duration-200 hover:scale-105"
                                        >
                                            <ExternalLink size={16}/> 데모
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.article>
                    ))}
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
                    {CONFIG.skills.map((s, idx) => (
                        <motion.div
                            key={s.name}
                            initial={{opacity: 0, scale: 0.8}}
                            whileInView={{opacity: 1, scale: 1}}
                            viewport={{once: true}}
                            transition={{duration: 0.3, delay: idx * 0.05}}
                            className="group"
                        >
                            <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 shadow-sm hover:shadow-md hover:scale-105 hover:border-blue-300 hover:bg-blue-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-blue-700 dark:hover:bg-blue-950 transition-all duration-200">
                                <s.icon size={18} className="group-hover:scale-110 transition-transform" aria-hidden/>
                                {s.name}
                            </span>
                        </motion.div>
                    ))}
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
