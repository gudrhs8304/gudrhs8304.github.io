import {useEffect, useMemo, useState} from "react";
import profile from "./assets/profile.jpg";
import "./index.css";
import { FaJava, FaReact, FaDatabase, FaGithub } from "react-icons/fa";
import { SiSpringboot, SiMariadb, SiThymeleaf, SiSwagger } from "react-icons/si";
import { TbApi } from "react-icons/tb";


const SKILL_ICONS = {
    "Java": <FaJava />,
    "Spring Boot": <SiSpringboot />,
    "MyBatis": <FaDatabase />,   // MyBatis 전용 아이콘이 없어서 DB 아이콘 사용
    "MariaDB": <SiMariadb />,
    "REST API": <TbApi />,
    "React": <FaReact />,
    "Thymeleaf": <SiThymeleaf />,
    "Swagger": <SiSwagger />,
    "Git/GitHub": <FaGithub />,
};


const CONFIG = {
    name: "김형곤",
    role: "백엔드 지향 풀스택 개발자",
    tagline: "Spring Boot · MyBatis/JPA · MariaDB · React",
    seeking: "신입 백엔드 포지션 구직 중",
    email: "gudrhs8304@gmail.com",
    phone: "010-7253-3804",
    githubUser: "gudrhs8304",
    resumePath: "/kimhyeonggon.pdf",
    projects: [
        {
            title: "햄버거 키오스크",
            emoji: "🍔",
            summary: "주문/결제 · 관리자(메뉴/재고/매출) · 사용자 UI",
            tech: ["Spring Boot", "MyBatis", "MariaDB", "Thymeleaf"],
            repo: "https://github.com/gudrhs8304/hamburgerKiosk",
        },
        {
            title: "Ticketory – 영화 예매",
            emoji: "🎬",
            summary: "상영시간 · 좌석선택 · 예매 흐름",
            tech: ["Spring Boot", "React", "MariaDB", "REST API", "Swagger"],
            repo: "https://github.com/gudrhs8304/ticketory_project",
        },
        {
            title: "일기장",
            emoji: "📔",
            summary: "일기 등록/수정/삭제, 감정표현",
            tech: ["React", "JavaScript"],
            repo: "https://github.com/gudrhs8304/react_edu_diary_250805",
        },
    ],
    skills: ["Java","Spring Boot","MyBatis","JPA","MariaDB","REST API","React","Thymeleaf","Swagger","Git/GitHub"],
};

function Chip({ children }) {
    return (
        <span className="chip">
            {SKILL_ICONS[children] && <span style={{ marginRight: "6px" }}>{SKILL_ICONS[children]}</span>}
            {children}
        </span>
    );
}

function Section({ id, title, children }) {
    return (
        <section id={id} className="section">
            <h2>{title}</h2>
            {children}
        </section>
    );
}

export default function App() {
    const year = useMemo(() => new Date().getFullYear(), []);
    const [dark, setDark] = useState(true);

    useEffect(() => {
        if (dark) {
            document.body.classList.add("dark");
            document.body.classList.remove("light");
        } else {
            document.body.classList.add("light");
            document.body.classList.remove("dark");
        }
    }, [dark]);

    return (
        <div className={dark ? "dark" : ""}>
            <div className="container">
                <header className="topbar" role="banner">
                    <div className="hero">
                        <div className="title">
                            <div className="nameWrap">
                                <h1 className="name">{CONFIG.name}</h1>
                                <img src={profile} alt={CONFIG.name} className="avatar" />
                            </div>
                            <div className="row">
                                <span className="chip">{CONFIG.role}</span>
                                <span className="chip">{CONFIG.tagline}</span>
                                <span className="chip pill">{CONFIG.seeking}</span>
                            </div>
                        </div>

                        <div className="right">
                            <a className="btn link" href={`https://github.com/${CONFIG.githubUser}`} target="_blank" rel="noopener"><FaGithub size={18} />GitHub</a>
                            <a className="btn link" href={CONFIG.resumePath} download>이력서 다운로드</a>
                            <button className="btn" onClick={() => setDark(v=>!v)}>🌓 모드</button>
                        </div>
                    </div>
                </header>

                <Section id="about" title="소개">
                    <p className="muted">끈기있게 소통하며 맡은일에 책임감있게 성과내는 소중한 인재</p>
                </Section>

                <Section id="projects" title="프로젝트">
                    <div className="grid">
                        {CONFIG.projects.map(p => (
                            <article key={p.title} className="card">
                                <h3>{p.emoji} {p.title}</h3>
                                <p className="muted">{p.summary}</p>
                                <div className="tags">
                                    {p.tech.map(t => <span key={t} className="tag">{t}</span>)}
                                </div>
                                <div className="row" style={{marginTop:10}}>
                                    {p.repo && <a className="btn" href={p.repo} target="_blank" rel="noopener">🔗 코드 보기</a>}
                                </div>
                            </article>
                        ))}
                    </div>
                </Section>

                <Section id="skills" title="기술 스택">
                    <div className="row wrap">
                        {CONFIG.skills.map(s => <Chip key={s}>{s}</Chip>)}
                    </div>
                </Section>

                <Section id="contact" title="연락처">
                    <div className="row wrap">
                        <a className="btn" href={`mailto:${CONFIG.email}`}>📧 {CONFIG.email}</a>
                        <a className="btn" href={`tel:${CONFIG.phone}`}>📞 {CONFIG.phone}</a>
                        <a className="btn" href={`https://github.com/${CONFIG.githubUser}`} target="_blank" rel="noopener"> <FaGithub size={18} />@{CONFIG.githubUser}</a>
                    </div>
                </Section>

                <footer className="footer">© {year} {CONFIG.name}. All rights reserved.</footer>
            </div>
        </div>
    );
}