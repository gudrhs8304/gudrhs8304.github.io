import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Github, Mail, FileDown, ExternalLink, Code2, Star } from "lucide-react";
import { FaJava, FaDatabase, FaProjectDiagram, FaReact, FaLeaf, FaGithub } from "react-icons/fa";
import { SiSpringboot, SiMariadb, SiSwagger } from "react-icons/si";

const CONFIG = {
  name: "김형곤",
  role: "Backend-leaning Full‑stack Developer",
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
  ],
  skills: [
    { name: "Java", icon: FaJava },
    { name: "Spring Boot", icon: SiSpringboot },
    { name: "MyBatis", icon: FaDatabase },
    { name: "JPA", icon: FaDatabase },
    { name: "MariaDB", icon: SiMariadb },
    { name: "REST API", icon: FaProjectDiagram },
    { name: "React", icon: FaReact },
    { name: "Thymeleaf", icon: FaLeaf },
    { name: "Swagger", icon: SiSwagger },
    { name: "Git/GitHub", icon: FaGithub },
  ],
};

function Chip({ children }) {
  return (
    <span className="inline-block rounded-full border border-zinc-300 px-3 py-1 text-sm text-zinc-700 dark:border-zinc-700 dark:text-zinc-200">
      {children}
    </span>
  );
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="border-t border-zinc-200 px-4 py-16 dark:border-zinc-800">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          className="mb-6 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
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
          headers: { Accept: "application/vnd.github+json" },
        });
        if (!res.ok) throw new Error("GitHub API 요청 실패");
        const data = await res.json();
        const filtered = data
          .filter((r) => !r.fork && !r.archived)
          .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
          .slice(0, 6);
        setRepos(filtered);
      } catch (e) {
        if (e.name !== "AbortError") setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => abort.abort();
  }, [username]);

  return { repos, loading, error };
}

export default function App() {
  const { repos, loading } = useGithubRepos(CONFIG.githubUser);
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className="min-h-screen scroll-smooth bg-white text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-100">
      <header className="bg-zinc-950 px-4 py-16 text-white dark:bg-black">
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{CONFIG.name}</h1>
            <p className="mt-2 text-lg text-zinc-300">{CONFIG.role}</p>
            <p className="text-zinc-400">{CONFIG.tagline}</p>
          </motion.div>

          <nav className="flex flex-wrap items-center gap-3">
            <a href="#about" className="text-zinc-300 hover:text-white">소개</a>
            <a href="#projects" className="text-zinc-300 hover:text-white">프로젝트</a>
            <a href="#skills" className="text-zinc-300 hover:text-white">기술</a>
            <a href="#contact" className="text-zinc-300 hover:text-white">연락처</a>
            <div className="flex flex-1 justify-end gap-2">
              <a
                href={`https://github.com/${CONFIG.githubUser}`}
                target="_blank"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 px-3 py-2 text-sm hover:bg-zinc-900"
              >
                <Github size={18} /> GitHub
              </a>
              <a
                href={CONFIG.resumePath}
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 px-3 py-2 text-sm hover:bg-zinc-900"
              >
                <FileDown size={18} /> 이력서
              </a>
            </div>
          </nav>
        </div>
      </header>

      <Section id="about" title="소개">
        <motion.p
          className="max-w-3xl text-zinc-700 dark:text-zinc-300"
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          실무형 프로젝트로 역량을 키우고 있는 백엔드 지향 풀스택 개발자입니다. Spring Boot + MyBatis/JPA, MariaDB를
          중심으로 REST API와 관리자/사용자 기능을 구현했습니다. 유지보수하기 쉬운 구조, 예외 처리, 데이터 모델링을
          특히 신경 씁니다.
        </motion.p>
      </Section>

      <Section id="projects" title="프로젝트">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {CONFIG.projects.map((p) => (
            <motion.article
              key={p.title}
              className="rounded-2xl border border-zinc-200 p-5 shadow-sm hover:shadow-md dark:border-zinc-800"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
            >
              <h3 className="mb-1 text-lg font-semibold">
                <span className="mr-1">{p.emoji}</span>
                {p.title}
              </h3>
              <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-300">{p.summary}</p>
              <ul className="mb-3 list-disc space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
                {p.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              <div className="mb-4 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
              <div className="flex gap-2">
                {p.repo && (
                  <a
                    href={p.repo}
                    target="_blank"
                    className="inline-flex items-center gap-1 rounded-xl border border-zinc-300 px-3 py-2 text-sm hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
                  >
                    <Code2 size={16} /> 코드 보기
                  </a>
                )}
                {p.demo && (
                  <a
                    href={p.demo}
                    target="_blank"
                    className="inline-flex items-center gap-1 rounded-xl border border-zinc-300 px-3 py-2 text-sm hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
                  >
                    <ExternalLink size={16} /> 데모
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </Section>

      <Section id="github" title="GitHub 상위 레포">
        {loading ? (
          <p className="text-sm text-zinc-500">불러오는 중…</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {repos.map((r) => (
              <a
                key={r.id}
                href={r.html_url}
                target="_blank"
                className="rounded-2xl border border-zinc-200 p-4 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
              >
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="font-medium">{r.name}</h4>
                  <span className="inline-flex items-center gap-1 text-xs text-zinc-500">
                    <Star size={14} /> {r.stargazers_count}
                  </span>
                </div>
                <p className="line-clamp-2 text-sm text-zinc-600 dark:text-zinc-300">{r.description || "설명 없음"}</p>
              </a>
            ))}
          </div>
        )}
      </Section>

      <Section id="skills" title="기술">
        <div className="flex flex-wrap gap-2">
          {CONFIG.skills.map((s) => (
            <Chip key={s.name}>
              <s.icon className="inline-block mr-1" /> {s.name}
            </Chip>
          ))}
        </div>
      </Section>

      <Section id="contact" title="연락처">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <a
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 px-3 py-2 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
            href={`mailto:${CONFIG.email}`}
          >
            <Mail size={18} /> {CONFIG.email}
          </a>
          <a
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 px-3 py-2 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
            href={`https://github.com/${CONFIG.githubUser}`}
            target="_blank"
          >
            <Github size={18} /> @{CONFIG.githubUser}
          </a>
          <a
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 px-3 py-2 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
            href={CONFIG.resumePath}
          >
            <FileDown size={18} /> 이력서 다운로드
          </a>
        </div>
      </Section>

      <footer className="border-t border-zinc-200 px-4 py-10 text-sm text-zinc-500 dark:border-zinc-800">
        <div className="mx-auto max-w-5xl">© {year} {CONFIG.name}. All rights reserved.</div>
      </footer>
    </div>
  );
}
