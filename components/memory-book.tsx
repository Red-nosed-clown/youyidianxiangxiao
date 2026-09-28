'use client';
import { useEffect, useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Sparkles, LockKeyhole, Play, ChevronLeft, ChevronRight, Menu, X, ArrowRight } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { site, photos, dances, timeline, moments } from '@/content/memories';
const nav = [['home','首页'],['about','关于 TA'],['dance','舞蹈作品'],['timeline','时光档案'],['gallery','影像集'],['moments','日常随记']];
function Reveal({ children, className = '' }: {children: ReactNode; className?: string}) {
 const reduced = useReducedMotion();
 return <motion.div className={className} initial={reduced ? false : {opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true, amount:0.08}} transition={{duration:0.65}}>{children}</motion.div>;
}
function Photo({src,alt,className=''}:{src:string;alt:string;className?:string}) {
 const [failed,setFailed]=useState(false);
 return failed ? <div className={`photo-fallback ${className}`} role="img" aria-label={alt}><Sparkles size={32}/><span>{alt}</span></div> : <img src={src} alt={alt} className={className} loading="lazy" onError={()=>setFailed(true)}/>;
}
function Heading({num,en,title,description}:{num:string;en:string;title:string;description?:string}) {
 return <div className="section-heading"><div><span className="eyebrow">{num} / {en}</span><h2>{title}</h2></div>{description && <p>{description}</p>}</div>;
}
export default function MemoryBook() {
 const [active,setActive]=useState('home'); const [menu,setMenu]=useState(false);
 const [filter,setFilter]=useState('全部'); const [photo,setPhoto]=useState<number|null>(null);
 const [video,setVideo]=useState<number|null>(null); const [videoError,setVideoError]=useState(false);
 const [entry,setEntry]=useState(false); const [password,setPassword]=useState('');
 const [error,setError]=useState(''); const [unlocked,setUnlocked]=useState(false); const [days,setDays]=useState<number|null>(null);
 useEffect(()=>{
  const today=new Date(); const [year,month,day]=site.startDate.split('-').map(Number);
  setDays(Math.max(0,Math.floor((Date.UTC(today.getFullYear(),today.getMonth(),today.getDate())-Date.UTC(year,month-1,day))/86400000)));
  const observer=new IntersectionObserver(entries=>{for(const item of entries) if(item.isIntersecting) setActive(item.target.id);},{rootMargin:'-15% 0px -60% 0px'});
  document.querySelectorAll('main section[id]').forEach(el=>observer.observe(el));return ()=>observer.disconnect();
 },[]);
 const visible=photos.map((p,index)=>({...p,index})).filter(p=>filter==='全部'||p.category===filter);
 const stepPhoto=(direction:number)=>setPhoto(current=>{const at=visible.findIndex(p=>p.index===current);return visible[(at+direction+visible.length)%visible.length].index;});
 return <>
 <a href="#main" className="skip-link">跳转至正文</a>
 <header className="site-header"><a className="brand" href="#home">有一点想笑<span>PERSONAL<br/>ARCHIVE</span></a>
 <nav aria-label="主导航" className={menu?'navigation open':'navigation'}>{nav.map(([id,label])=><a key={id} href={`#${id}`} aria-current={active===id?'location':undefined} className={active===id?'active':''} onClick={()=>setMenu(false)}>{label}</a>)}</nav>
 <button className="entry-button" onClick={()=>setEntry(true)}><LockKeyhole size={15}/><span>幕后入口</span></button>
 <button className="menu-button" aria-label={menu?'关闭菜单':'打开菜单'} aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></header>
 <main id="main">
 <section id="home" className="hero section-wrap"><div className="hero-copy"><div className="eyebrow"><span className="small-line"/> INDEPENDENT SPIRIT / PERSONAL ARCHIVE</div><h1>保持热爱，<br/>自由<span className="title-us">出场<Sparkles size={28} strokeWidth={1}/></span>。</h1><p>关于舞蹈，关于生活，关于我。<br/>一些正在发生的事，和不想错过的瞬间。<br/>不设限，不急着被定义。</p><a href="#timeline" className="primary-button">探索个人档案 <ArrowUpRight size={18}/></a><div className="hero-sign">STAY TRUE. KEEP MOVING.</div></div>
 <div className="hero-visual"><div className="photo-mat"><img src={site.hero} alt="舞者的身体表达，个人作品集示例封面" fetchPriority="high"/><div className="photo-caption"><span>FIG. 01 — IN MY ELEMENT</span><Sparkles size={17}/></div></div><div className="photo-stamp">VOL.<br/><span>01</span></div><span className="vertical-note">MOVEMENT / EXPRESSION / LIFE</span></div>
 <div className="hero-bottom"><span><Sparkles size={15}/> 从 {site.startDate.replaceAll('-','.')} 开始记录</span><a href="#about">继续往下探索 <ArrowDown size={15}/></a></div></section>
 <div className="days-strip"><span>DANCE / LIFE / VISUAL DIARY</span><div>持续记录 · <strong>{days===null?'—':days}</strong> 天</div><span className="serif-italic">ALWAYS IN PROGRESS ↗</span></div>
 <section id="about" className="section-wrap about-section"><Reveal className="about-photo"><Photo src="/media/dance.jpg" alt="舞者剪影"/><span className="photo-label">NO LABELS. JUST ME.</span></Reveal><Reveal className="about-copy"><span className="eyebrow">01 / ABOUT</span><h2>不止一种风格，<br/>不止一种可能。</h2><p className="name-intro">你好，我是<span>{site.name}</span>。</p><p>{site.intro}</p><div className="tags">{site.tags.map(tag=><span key={tag}>{tag}</span>)}</div><blockquote>“找到自己的节奏，<br/>然后，把声音调大。”</blockquote><span className="tiny-note">DANCER / OBSERVER / FREE SPIRIT</span></Reveal></section>
 <section id="dance" className="dance-section"><div className="section-wrap"><Reveal><Heading num="02" en="SELECTED MOTION" title="身体，比语言先一步。" description="练习室内外，保持表达。"/></Reveal><div className="dance-grid">{dances.map((d,i)=><Reveal key={d.title}><button className="dance-card" onClick={()=>{setVideo(i);setVideoError(false);}} aria-label={`播放 ${d.title}`}><div className="dance-image"><Photo src={d.image} alt={d.title}/><span className="play-circle"><Play size={22} fill="currentColor"/></span><span className="video-badge">视频示例</span></div><div className="card-meta"><span>{d.type}</span><span>{d.date}</span></div><h3>{d.title}</h3><p>{d.note}</p></button></Reveal>)}</div></div></section>
 <section id="timeline" className="section-wrap timeline-section"><Reveal><Heading num="03" en="THE TIMELINE" title="走过的路，都算数。" description="一些坐标，一些转折，一些新的开始。"/></Reveal><div className="timeline-list">{timeline.map((item,i)=><Reveal key={item.date} className="timeline-item"><div className="timeline-date">{item.date}<span>ENTRY 0{i+1}</span></div><div className="timeline-dot"><Sparkles size={12} fill="currentColor"/></div><div className="timeline-copy"><h3>{item.title}</h3><p>{item.text}</p></div><Photo src={item.image} alt={item.title}/></Reveal>)}<div className="timeline-future"><Sparkles size={18}/><span>下一站，未定义。</span></div></div></section>
 <section id="gallery" className="gallery-section"><div className="section-wrap"><Reveal><Heading num="04" en="VISUAL ARCHIVE" title="取景框里的片刻。"/><div className="gallery-toolbar"><p>随手捕捉。按自己的方式整理。</p><div className="filters" aria-label="照片分类">{['全部','日常','旅行','舞蹈'].map(label=><button key={label} aria-pressed={filter===label} className={filter===label?'selected':''} onClick={()=>setFilter(label)}>{label}</button>)}</div></div></Reveal><div className="gallery-grid">{visible.map(p=><Reveal key={p.index}><button className="gallery-card" onClick={()=>setPhoto(p.index)} aria-label={`放大照片：${p.title}`}><Photo src={p.src} alt={p.title}/><div><span>{p.title}</span><ArrowUpRight size={18}/></div><small>{p.date} / {p.category}</small></button></Reveal>)}</div></div></section>
 <section id="moments" className="section-wrap moments-section"><Reveal><Heading num="05" en="OFF THE RECORD" title="不在计划里的生活。" description="不必每一天都精彩，但都值得留一笔。"/></Reveal><div className="moments-grid">{moments.map(m=><Reveal key={m.title} className="moment-card"><Photo src={m.image} alt={m.title}/><div className="moment-content"><div className="card-meta"><span>{m.date}</span><span>#{m.tag}</span></div><h3>{m.title}</h3><p>{m.text}</p><Sparkles size={16}/></div></Reveal>)}</div></section>
 <section className="closing"><Sparkles size={26} strokeWidth={1}/><span className="eyebrow">END OF PAGE. NOT THE STORY.</span><h2>保持好奇。<br/>下次见。</h2><p>生活持续更新，风格也是。</p><span className="hero-sign">MORE TO COME ↗</span><a href="#home">BACK TO TOP ↑</a></section></main>
 <footer><a className="brand" href="#home">有一点想笑</a><span>DANCE. LIFE. EVERYTHING IN BETWEEN.</span><small>个人档案演示 · 素材与文案为占位内容</small></footer>
 <Dialog open={photo!==null} onOpenChange={open=>{if(!open)setPhoto(null);}}><DialogContent className="memory-dialog" onKeyDown={event=>{if(event.key==='ArrowLeft')stepPhoto(-1);if(event.key==='ArrowRight')stepPhoto(1);}}>{photo!==null&&<><DialogTitle>{photos[photo].title}</DialogTitle><DialogDescription>{photos[photo].date} · {photos[photo].note}</DialogDescription><Photo src={photos[photo].src} alt={photos[photo].title} className="lightbox-image"/><div className="lightbox-controls"><button aria-label="上一张照片" onClick={()=>stepPhoto(-1)}><ChevronLeft/></button><span>{visible.findIndex(p=>p.index===photo)+1} / {visible.length}</span><button aria-label="下一张照片" onClick={()=>stepPhoto(1)}><ChevronRight/></button></div></>}</DialogContent></Dialog>
 <Dialog open={video!==null} onOpenChange={open=>{if(!open)setVideo(null);}}><DialogContent className="memory-dialog">{video!==null&&<><DialogTitle>{dances[video].title}</DialogTitle><DialogDescription>播放功能演示：当前为自然风景测试短片，后续可替换成真实舞蹈视频。</DialogDescription><video controls playsInline preload="metadata" poster={dances[video].image} key={video} onError={()=>setVideoError(true)}><source src={dances[video].video} type="video/mp4"/></video>{videoError&&<p role="alert">视频暂时无法加载，请稍后重试或替换本地视频素材。</p>}<p>{dances[video].note}</p></>}</DialogContent></Dialog>
 <Dialog open={entry} onOpenChange={open=>{setEntry(open);setError('');setPassword('');}}><DialogContent className="entry-dialog"><Sparkles className="entry-heart" size={32}/><DialogTitle>{unlocked?'幕后手记':'BEHIND THE SCENES.'}</DialogTitle><DialogDescription>演示入口 · 密码 0520，仅展示交互，不提供真实隐私保护。</DialogDescription>{unlocked?<div className="secret-letter"><p>作品之外，是一次次练习、停顿和重新开始。</p><p>这里留给未完成的想法。下一次更新，也许就是一个全新的方向。</p><button className="primary-button" onClick={()=>setEntry(false)}>继续浏览 <ArrowRight size={16}/></button></div>:<form onSubmit={event=>{event.preventDefault();if(password===site.password){setUnlocked(true);setError('');}else setError('代码不匹配，请输入演示代码 0520。');}}><label htmlFor="password">访问代码</label><input id="password" type="password" autoComplete="off" value={password} onChange={event=>setPassword(event.target.value)} aria-invalid={!!error} aria-describedby={error?'password-error':undefined} placeholder="输入演示代码 0520" required/>{error&&<p id="password-error" className="form-error" role="alert">{error}</p>}<button className="primary-button" type="submit">进入幕后 <ArrowRight size={16}/></button></form>}</DialogContent></Dialog>
 </>;
}


