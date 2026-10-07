import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowRight, Check, ChevronDown, CircleHelp, CodeXml, ExternalLink, GitBranch, Github, GitPullRequest, Globe, Heart, Menu, Moon, Search, SlidersHorizontal, Sparkles, Star, Sun, Timer, X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { demoIssues, type DemoIssue } from '@/lib/demo-issues';
import kitten from '@/assets/dev-kitten.png';

export const Route = createFileRoute('/')({
 head: () => ({ meta: [
  {title:'Primeira Issue — sua primeira contribuição começa aqui'},
  {name:'description',content:'Descubra good first issues do GitHub e dê seu primeiro passo no open source. Um mockup acolhedor para quem está começando.'},
  {property:'og:title',content:'Primeira Issue — seu começo no open source'},
  {property:'og:description',content:'Encontre uma issue que combina com você e comece a contribuir.'},
  {property:'og:type',content:'website'}, {name:'twitter:card',content:'summary_large_image'},
 ]}), component: Index,
});
const languages = ['JavaScript','TypeScript','Python','PHP','Go','Rust'];
const topics = ['acessibilidade','frontend','proteção animal','impacto social'];

function IssueCard({issue, favorite, onFavorite}: {issue:DemoIssue; favorite:boolean; onFavorite:()=>void}) {
 const repo = issue.repo.replaceAll(' ', '');
 return <article className="issue-card">
  <div className="card-top"><div className="repo-name"><Github size={14}/><span>{issue.repo}</span></div><Button variant="tool" size="icon" className="favorite" title={favorite?'Remover dos favoritos':'Favoritar issue'} aria-label={favorite?`Remover ${issue.title} dos favoritos`:`Favoritar ${issue.title}`} aria-pressed={favorite} onClick={onFavorite}><Star strokeWidth={2.5}/></Button></div>
  <h3>{issue.title}</h3>
  <div className="card-details"><span><i className="language-dot"/>{issue.language}</span><span><Timer size={12}/>{issue.updated}</span></div>
  <div className="tags">{issue.labels.map(label=><span className="tag" key={label}>{label}</span>)}</div>
  <div className="card-bottom"><span className="health-sticker">{issue.health==='Ativo'?<Zap size={11}/>:issue.health==='Responde rápido'?<Timer size={11}/>:<Heart size={11}/>} {issue.health}</span><Button variant="paper" asChild><a href={`https://github.com/${repo}/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22`} target="_blank" rel="noopener noreferrer">Ver no GitHub <ExternalLink size={12}/></a></Button></div>
 </article>;
}
function Index() {
 const [dark,setDark] = useState(false);
 const [scrolled,setScrolled] = useState(false);
 const [search,setSearch] = useState('');
 const [query,setQuery] = useState('');
 const [selectedLanguages,setSelectedLanguages] = useState<string[]>([]);
 const [selectedTopics,setSelectedTopics] = useState<string[]>([]);
 const [locale,setLocale] = useState('all');
 const [unassigned,setUnassigned] = useState(false);
 const [favorites,setFavorites] = useState<number[]>([]);
 const [favoritesOnly,setFavoritesOnly] = useState(false);
 const [limit,setLimit] = useState(6);
 const [loginOpen,setLoginOpen] = useState(false);
 const [mobileMenu,setMobileMenu] = useState(false);
 useEffect(()=>{ const update=()=>setScrolled(window.scrollY>15); update(); window.addEventListener('scroll',update,{passive:true}); return ()=>window.removeEventListener('scroll',update); },[]);
 useEffect(()=>{document.documentElement.classList.toggle('dark',dark); return ()=>document.documentElement.classList.remove('dark');},[dark]);
 useEffect(()=>{if(!loginOpen)return; const close=(e:KeyboardEvent)=>{if(e.key==='Escape')setLoginOpen(false);}; window.addEventListener('keydown',close); return ()=>window.removeEventListener('keydown',close);},[loginOpen]);
 const toggle = (value:string, items:string[], setter:(items:string[])=>void)=> {setter(items.includes(value)?items.filter(item=>item!==value):[...items,value]);setLimit(6);};
 const filtered = useMemo(()=>demoIssues.filter(issue=>(!query || `${issue.title} ${issue.repo} ${issue.language} ${issue.labels.join(' ')}`.toLowerCase().includes(query.toLowerCase())) && (!selectedLanguages.length || selectedLanguages.includes(issue.language)) && (!selectedTopics.length || selectedTopics.includes(issue.topic)) && (locale==='all'||issue.locale===locale) && (!unassigned||issue.unassigned) && (!favoritesOnly||favorites.includes(issue.id))),[query,selectedLanguages,selectedTopics,locale,unassigned,favoritesOnly,favorites]);
 const goSearch=()=>{setFavoritesOnly(false);setMobileMenu(false);document.getElementById('buscar')?.scrollIntoView({behavior:'smooth'});};
 const goFavorites=()=>{setFavoritesOnly(true);setMobileMenu(false);document.getElementById('buscar')?.scrollIntoView({behavior:'smooth'});};
 return <>
  <header className={`site-header ${scrolled?'scrolled':''}`}><div className="page-width header-inner">
   <a href="#" className="brand" aria-label="Primeira Issue, início"><CodeXml className="brand-icon" size={31} strokeWidth={3}/><span>primeira<span>.issue</span></span></a>
   <nav className="header-nav" aria-label="Menu principal"><a href="#buscar" onClick={()=>setFavoritesOnly(false)}>buscar</a><a href="#como-funciona">como funciona</a><a href="#buscar" onClick={()=>setFavoritesOnly(true)}>favoritos{favorites.length>0?` (${favorites.length})`:''}</a></nav>
   <div className="header-actions"><Button variant="tool" size="icon" onClick={()=>setDark(!dark)} title={dark?'Ativar modo claro':'Ativar modo escuro'} aria-label={dark?'Ativar modo claro':'Ativar modo escuro'}>{dark?<Sun strokeWidth={2.5}/>:<Moon strokeWidth={2.5}/>}</Button><Button variant="comic" className="github-login" onClick={()=>setLoginOpen(true)}><Github strokeWidth={2.5}/><span>Entrar com </span>GitHub</Button><Button variant="tool" size="icon" className="min-[641px]:hidden" aria-label="Abrir menu" aria-expanded={mobileMenu} onClick={()=>setMobileMenu(!mobileMenu)}>{mobileMenu?<X/>:<Menu/>}</Button></div>
  </div>{mobileMenu&&<nav className="mobile-nav" aria-label="Menu mobile"><Button variant="tool" onClick={goSearch}>buscar</Button><Button variant="tool" asChild><a href="#como-funciona" onClick={()=>setMobileMenu(false)}>como funciona</a></Button><Button variant="tool" onClick={goFavorites}>favoritos ({favorites.length})</Button></nav>}</header>
  <main>
   <section className="hero"><div className="page-width hero-layout"><div className="hero-copy"><div className="eyebrow"><Sparkles size={14} strokeWidth={2.5}/> Pequenos passos. Grandes contribuições.</div>
    <h1>Sua primeira<br/><span className="word-bubble">contribuição</span><br/>começa aqui<span className="text-primary">.</span></h1>
    <p className="hero-description">O open source também é seu lugar. Encontre uma issue que combina com você e dê o primeiro passo.</p>
    <form className="search-box" role="search" onSubmit={e=>{e.preventDefault();setQuery(search.trim());setFavoritesOnly(false);setLimit(6);goSearch();}}><Search size={21} strokeWidth={2.5}/><input aria-label="Buscar por projeto, assunto ou linguagem" placeholder="Projeto, assunto ou linguagem..." value={search} onChange={e=>setSearch(e.target.value)}/><Button type="submit" variant="comic">Buscar issues <ArrowRight size={15}/></Button></form>
    <div className="hero-footnote"><Heart size={12}/> Não precisa saber tudo. Só precisa começar.</div>
   </div><div className="mascot-area"><Sparkles className="doodle-star star-one" strokeWidth={2.5}/><div className="mascot-speech">bora dar um commit?</div><img className="mascot" src={kitten} width={1024} height={1024} alt="Gatinho roxo com óculos de dev, acenando atrás de um notebook"/><Star className="doodle-star star-two" strokeWidth={2.5}/><div className="mascot-sticker"><CodeXml size={16}/> todo dev começa de algum lugar!</div></div></div></section>
   <section id="buscar" className="result-section"><div className="page-width"><div className="section-heading"><h2>{favoritesOnly?'Suas favoritas':'Encontre sua issue'} <span className="number-sticker">good first issue</span></h2><p>Um primeiro passo do seu jeito <Sparkles size={12} className="inline"/></p></div>
    <div className="filters"><div className="filter-row"><span className="filter-name"><CodeXml size={14}/> Linguagem</span><Button variant="chip" aria-pressed={!selectedLanguages.length} onClick={()=>{setSelectedLanguages([]);setLimit(6);}}>Todas</Button>{languages.map(language=><Button variant="chip" key={language} aria-pressed={selectedLanguages.includes(language)} onClick={()=>toggle(language,selectedLanguages,setSelectedLanguages)}>{language}</Button>)}</div>
    <div className="filter-row"><span className="filter-name"><Heart size={13}/> Seu interesse</span>{topics.map(topic=><Button variant="chip" key={topic} aria-pressed={selectedTopics.includes(topic)} onClick={()=>toggle(topic,selectedTopics,setSelectedTopics)}>{topic==='acessibilidade'?<Sparkles size={12}/>:topic==='frontend'?<CodeXml size={12}/>:topic==='proteção animal'?<Heart size={12}/>:<Globe size={12}/>} {topic}</Button>)}</div>
    <div className="filter-row filter-last"><label className="select-wrap"><span className="filter-name"><Globe size={13}/> Idioma</span><select aria-label="Idioma das issues" value={locale} onChange={e=>{setLocale(e.target.value);setLimit(6);}}><option value="all">Todos os idiomas</option><option value="pt">Português</option><option value="en">Inglês</option></select></label><label className="checkbox-label"><input type="checkbox" checked={unassigned} onChange={e=>setUnassigned(e.target.checked)}/> Apenas issues sem responsável <CircleHelp size={13} aria-label="Issues disponíveis para contribuir"/></label></div></div>
    <div className="results-meta"><span><strong>{filtered.length} issues</strong> esperando sua contribuição{query&&` · “${query}”`}</span>{favoritesOnly?<Button variant="tool" size="sm" onClick={()=>setFavoritesOnly(false)}>Ver todas <X size={12}/></Button>:<span><SlidersHorizontal size={12} className="inline mr-1"/> Atualizadas recentemente</span>}</div>
    {filtered.length?<div className="issue-grid">{filtered.slice(0,limit).map(issue=><IssueCard key={issue.id} issue={issue} favorite={favorites.includes(issue.id)} onFavorite={()=>setFavorites(current=>current.includes(issue.id)?current.filter(id=>id!==issue.id):[...current,issue.id])}/>)}</div>:<div className="empty-state"><Search className="mx-auto mb-4" size={32}/><h3>{favoritesOnly?'Seu próximo favorito está por aí!':'Nenhuma issue por aqui, ainda.'}</h3><p>{favoritesOnly?'Marque uma estrelinha nas issues que você curtir.':'Experimente outro termo ou remova alguns filtros.'}</p><Button variant="paper" onClick={()=>{setSearch('');setQuery('');setSelectedLanguages([]);setSelectedTopics([]);setLocale('all');setUnassigned(false);setFavoritesOnly(false);}}>Ver todas as issues</Button></div>}
    {filtered.length>limit&&<div className="results-more"><Button variant="paper" onClick={()=>setLimit(current=>current+6)}>Mais issues, mais possibilidades <ArrowDown size={14}/></Button></div>}
    <p className="mockup-notice text-center">Prévia com issues ilustrativas — projetos e oportunidades sujeitos à disponibilidade no GitHub.</p>
   </div></section>
   <section id="como-funciona" className="how-section"><div className="page-width"><div className="how-intro"><span className="eyebrow"><GitBranch size={13}/> Do “será que eu consigo?” ao primeiro PR</span><h2>Um passo de cada vez.</h2><p>Ninguém nasce com 500 commits. Sua jornada começa com um.</p></div><div className="steps-grid">{[{icon:Search,title:'Encontre seu match',text:'Filtre por linguagem e por causas que você curte. Tem uma issue com a sua cara.'},{icon:Star,title:'Escolha sua missão',text:'Leia os detalhes, conheça o projeto e converse com quem mantém o código.'},{icon:GitPullRequest,title:'Mande seu primeiro PR',text:'Faça sua contribuição e abra um pull request. Pequena mudança, grande conquista!'}].map((step,index)=><article className="step-card" key={step.title}><span className="step-number">0{index+1}</span><step.icon className="step-icon" size={32} strokeWidth={2.5}/><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></div></section>
   <section className="final-section"><div className="page-width final-inner"><div><h2>Pronto para abrir seu primeiro PR?</h2><p>Tem um projeto esperando por alguém exatamente como você.</p></div><Button variant="paper" size="lg" onClick={goSearch}>Bora contribuir! <GitPullRequest strokeWidth={2.5}/></Button></div></section>
  </main><footer>Feito por <span>Evy</span> <Heart size={12} className="inline mx-1 text-primary"/> © {new Date().getFullYear()}</footer>
  {loginOpen&&<div className="login-dialog" onClick={()=>setLoginOpen(false)}><section className="login-content" role="dialog" aria-modal="true" aria-labelledby="login-title" onClick={e=>e.stopPropagation()}><Button autoFocus variant="tool" size="icon" className="login-close" aria-label="Fechar" onClick={()=>setLoginOpen(false)}><X/></Button><Github size={38}/><h2 id="login-title">Seu começo no open source</h2><p>Esta é uma prévia da Primeira Issue. O login com GitHub ainda não está conectado, mas você já pode explorar e favoritar as issues nesta sessão.</p><Button variant="comic" onClick={()=>{setLoginOpen(false);goSearch();}}>Explorar issues <ArrowRight/></Button></section></div>}
 </>;
}
