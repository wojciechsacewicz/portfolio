import { Canvas, useFrame } from '@react-three/fiber';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CanvasTexture, InstancedMesh, NearestFilter, Object3D, OrthographicCamera, SRGBColorSpace } from 'three';
import {
  EMPTY_PERMANENT_UPGRADES,
  ROUND_DURATION_SECONDS,
  type PermanentUpgrades,
  type ScratchReward,
  type UpgradeStat,
  getNintendoDropChance,
  getRoundTuning,
  getScratchDropChance,
  incrementPermanentUpgrade,
  nintendoXpBase,
  permanentMultiplier,
  rollScratchReward,
  xpToNextLevel,
} from './bunnyHordeProgression';
import './bunny-horde.css';

const STORAGE_KEY = 'sacewi-bunny-king-v1';
const MAX_ENEMIES = 140;
const MAX_SHOTS = 48;
const MAX_ORBS = 120;
const dummy = new Object3D();

type Vec = { x: number; y: number };
type Enemy = Vec & { hp: number; speed: number; xp: number; elite: boolean; hit: number };
type Shot = Vec & { vx: number; vy: number; life: number; damage: number };
type Orb = Vec & { value: number; phase: number };
type Drop = Vec & { kind: 'scratch' | 'nintendo'; phase: number };
type Temp = { stat: UpgradeStat; amount: number; throughRound: number; title: string };
type Hud = { round: number; time: number; hp: number; level: number; xp: number; next: number; kills: number; enemies: number };
type Phase = 'ready' | 'playing' | 'scratch' | 'nintendo' | 'dead';
type Mini = 'void' | 'click' | 'dice';

function texture(draw: (ctx: CanvasRenderingContext2D) => void) {
  const canvas = document.createElement('canvas');
  canvas.width = 16; canvas.height = 16;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas unavailable');
  ctx.imageSmoothingEnabled = false; draw(ctx);
  const result = new CanvasTexture(canvas);
  result.magFilter = NearestFilter; result.minFilter = NearestFilter;
  result.generateMipmaps = false; result.colorSpace = SRGBColorSpace;
  return result;
}

function rect(ctx: CanvasRenderingContext2D, color: string, x: number, y: number, w: number, h: number) {
  ctx.fillStyle = color; ctx.fillRect(x, y, w, h);
}

function useSprites() {
  return useMemo(() => ({
    king: texture((c) => { rect(c,'#edf2f7',4,4,3,7);rect(c,'#edf2f7',9,4,3,7);rect(c,'#afc0d4',3,8,10,7);rect(c,'#23384c',5,10,2,2);rect(c,'#23384c',9,10,2,2);rect(c,'#d7e8f8',5,1,6,3);rect(c,'#3d5874',6,0,1,3);rect(c,'#3d5874',9,0,1,3); }),
    enemy: texture((c) => { rect(c,'#e2e5e6',4,2,3,7);rect(c,'#e2e5e6',9,2,3,7);rect(c,'#9d4454',5,3,1,4);rect(c,'#9d4454',10,3,1,4);rect(c,'#c8cccf',3,7,10,8);rect(c,'#7a2435',5,9,2,2);rect(c,'#7a2435',9,9,2,2); }),
    shot: texture((c) => { rect(c,'#d7e8f8',3,7,10,2);rect(c,'#6f8fae',5,6,7,1); }),
    orb: texture((c) => { rect(c,'#d7e8f8',6,2,4,12);rect(c,'#d7e8f8',2,6,12,4);rect(c,'#5d7fa3',5,5,6,6); }),
    scratch: texture((c) => { rect(c,'#afc0d4',2,2,12,12);rect(c,'#3d5874',4,5,8,1);rect(c,'#3d5874',4,8,8,1); }),
    nintendo: texture((c) => { rect(c,'#5d7fa3',2,1,12,14);rect(c,'#101820',5,3,6,6);rect(c,'#d7e8f8',6,4,4,4);rect(c,'#17212c',4,11,3,1); }),
  }), []);
}

function Sprite({ map, x, y, scale = 1, z = 1 }: { map: CanvasTexture; x: number; y: number; scale?: number; z?: number }) {
  return <sprite position={[x,y,z]} scale={[scale,scale,1]}><spriteMaterial map={map} transparent /></sprite>;
}

function Field({ input, paused, run, permanent, onHud, onDrop, onDead, onApi }: {
  input: React.MutableRefObject<Vec>; paused: boolean; run: number; permanent: PermanentUpgrades;
  onHud: (hud: Hud) => void; onDrop: (kind: Drop['kind']) => void; onDead: () => void;
  onApi: (api: { xp: (value:number)=>void; temp: (r:ScratchReward)=>void }) => void;
}) {
  const sprites = useSprites();
  const enemiesMesh = useRef<InstancedMesh>(null); const shotsMesh = useRef<InstancedMesh>(null); const orbsMesh = useRef<InstancedMesh>(null);
  const camera = useRef<OrthographicCamera>(null);
  const state = useRef({ player:{x:0,y:0,hp:100}, enemies:[] as Enemy[], shots:[] as Shot[], orbs:[] as Orb[], drops:[] as Drop[], temps:[] as Temp[], round:1,time:ROUND_DURATION_SECONDS,level:1,xp:0,next:xpToNextLevel(1),kills:0,spawn:0,fire:0,hud:0,dead:false });
  const [, render] = useState(0);

  const addXp = useCallback((value:number) => {
    const s=state.current; s.xp += value * permanentMultiplier('xpGain', permanent.xpGain);
    while(s.xp>=s.next){ s.xp-=s.next; s.level++; s.next=xpToNextLevel(s.level); s.player.hp=Math.min(100,s.player.hp+10); }
  },[permanent]);
  const addTemp = useCallback((r:ScratchReward) => { state.current.temps.push({stat:r.stat,amount:r.amount,throughRound:state.current.round+r.rounds-1,title:r.title}); },[]);
  useEffect(()=>onApi({xp:addXp,temp:addTemp}),[addXp,addTemp,onApi]);
  useEffect(()=>{ state.current={player:{x:0,y:0,hp:100},enemies:[],shots:[],orbs:[],drops:[],temps:[],round:1,time:ROUND_DURATION_SECONDS,level:1,xp:0,next:xpToNextLevel(1),kills:0,spawn:0,fire:0,hud:0,dead:false}; render(v=>v+1); },[run]);

  useFrame((_, rawDt) => {
    if(paused) return; const dt=Math.min(rawDt,0.05); const s=state.current; if(s.dead)return;
    const temp=(stat:UpgradeStat)=>s.temps.filter(t=>t.stat===stat&&t.throughRound>=s.round).reduce((a,t)=>a+t.amount,0);
    const move=5.2*permanentMultiplier('moveSpeed',permanent.moveSpeed)*(1+temp('moveSpeed'));
    const damage=8*(1+(s.level-1)*0.045)*permanentMultiplier('damage',permanent.damage)*(1+temp('damage'));
    const rate=Math.min(7,2.1*(1+(s.level-1)*0.012)*permanentMultiplier('fireRate',permanent.fireRate)*(1+temp('fireRate')));
    const luck=permanentMultiplier('luck',permanent.luck)*(1+temp('luck'));
    const length=Math.hypot(input.current.x,input.current.y)||1; s.player.x+=input.current.x/length*move*dt; s.player.y+=input.current.y/length*move*dt;
    s.player.x=Math.max(-28,Math.min(28,s.player.x)); s.player.y=Math.max(-28,Math.min(28,s.player.y));
    if(camera.current){ camera.current.position.x+=(s.player.x-camera.current.position.x)*Math.min(1,dt*3.8); camera.current.position.y+=(s.player.y-camera.current.position.y)*Math.min(1,dt*3.8); }
    s.time-=dt; if(s.time<=0){s.round++;s.time=ROUND_DURATION_SECONDS;s.temps=s.temps.filter(t=>t.throughRound>=s.round);}
    const tuning=getRoundTuning(s.round); s.spawn-=dt;
    if(s.spawn<=0&&s.enemies.length<MAX_ENEMIES){ const a=Math.random()*Math.PI*2,r=11+Math.random()*5,elite=Math.random()<tuning.eliteChance;s.enemies.push({x:s.player.x+Math.cos(a)*r,y:s.player.y+Math.sin(a)*r,hp:tuning.enemyHealth*(elite?2.8:1),speed:tuning.enemySpeed*(elite?.86:1),xp:tuning.enemyXp*(elite?4:1),elite,hit:0});s.spawn=tuning.spawnInterval; }
    s.fire-=dt;
    if(s.fire<=0&&s.enemies.length&&s.shots.length<MAX_SHOTS){ let target=s.enemies[0]!,best=Infinity;for(const e of s.enemies){const d=(e.x-s.player.x)**2+(e.y-s.player.y)**2;if(d<best){best=d;target=e;}}const dx=target.x-s.player.x,dy=target.y-s.player.y,l=Math.hypot(dx,dy)||1;s.shots.push({x:s.player.x,y:s.player.y,vx:dx/l*13,vy:dy/l*13,life:1.1,damage});s.fire=1/rate; }
    for(let i=s.shots.length-1;i>=0;i--){const p=s.shots[i]!;p.x+=p.vx*dt;p.y+=p.vy*dt;p.life-=dt;let hit=false;for(let j=s.enemies.length-1;j>=0;j--){const e=s.enemies[j]!;if((e.x-p.x)**2+(e.y-p.y)**2<(e.elite?.7:.45)){e.hp-=p.damage;e.hit=.08;hit=true;if(e.hp<=0){s.kills++;s.orbs.push({x:e.x,y:e.y,value:e.xp,phase:Math.random()*6});const scratch=getScratchDropChance(s.round,luck),handheld=getNintendoDropChance(s.round,luck);if(Math.random()<handheld)s.drops.push({x:e.x,y:e.y,kind:'nintendo',phase:0});else if(Math.random()<scratch)s.drops.push({x:e.x,y:e.y,kind:'scratch',phase:0});s.enemies.splice(j,1);}break;}}if(hit||p.life<=0)s.shots.splice(i,1);}
    for(let i=s.enemies.length-1;i>=0;i--){const e=s.enemies[i]!,dx=s.player.x-e.x,dy=s.player.y-e.y,l=Math.hypot(dx,dy)||1;e.x+=dx/l*e.speed*dt;e.y+=dy/l*e.speed*dt;e.hit=Math.max(0,e.hit-dt);if(l<.7){s.player.hp-=tuning.enemyDamage*dt*.55;if(s.player.hp<=0){s.dead=true;onDead();}}}
    for(let i=s.orbs.length-1;i>=0;i--){const o=s.orbs[i]!,dx=s.player.x-o.x,dy=s.player.y-o.y,l=Math.hypot(dx,dy)||1;if(l<3.2){o.x+=dx/l*dt*9;o.y+=dy/l*dt*9;}if(l<.45){addXp(o.value);s.orbs.splice(i,1);}}
    for(let i=s.drops.length-1;i>=0;i--){const d=s.drops[i]!,l=Math.hypot(s.player.x-d.x,s.player.y-d.y);d.phase+=dt;if(l<.7){onDrop(d.kind);s.drops.splice(i,1);}}
    const paint=(mesh:InstancedMesh|null,items:Array<Vec>,scale:(v:any)=>number)=>{if(!mesh)return;items.forEach((v,i)=>{dummy.position.set(v.x,v.y,1.3);const z=scale(v);dummy.scale.set(z,z,1);dummy.updateMatrix();mesh.setMatrixAt(i,dummy.matrix);});mesh.count=items.length;mesh.instanceMatrix.needsUpdate=true;};
    paint(enemiesMesh.current,s.enemies,(e:Enemy)=>e.elite?1.28:1);paint(shotsMesh.current,s.shots,()=>.42);paint(orbsMesh.current,s.orbs,()=>.34);
    s.hud-=dt;if(s.hud<=0){onHud({round:s.round,time:s.time,hp:s.player.hp,level:s.level,xp:s.xp,next:s.next,kills:s.kills,enemies:s.enemies.length});s.hud=.1;render(v=>v+1);}
  });
  const s=state.current;
  return <>
    <orthographicCamera ref={camera} makeDefault position={[0,0,20]} zoom={48} />
    <mesh position={[0,0,-2]}><planeGeometry args={[80,80]} /><meshBasicMaterial color="#17261f" /></mesh>
    <gridHelper args={[80,80,'#294638','#20382e']} rotation={[Math.PI/2,0,0]} position={[0,0,-1.8]} />
    <Sprite map={sprites.king} x={s.player.x} y={s.player.y} scale={1.25} z={2} />
    <instancedMesh ref={enemiesMesh} args={[undefined,undefined,MAX_ENEMIES]}><planeGeometry args={[1,1]} /><meshBasicMaterial map={sprites.enemy} transparent /></instancedMesh>
    <instancedMesh ref={shotsMesh} args={[undefined,undefined,MAX_SHOTS]}><planeGeometry args={[1,1]} /><meshBasicMaterial map={sprites.shot} transparent /></instancedMesh>
    <instancedMesh ref={orbsMesh} args={[undefined,undefined,MAX_ORBS]}><planeGeometry args={[1,1]} /><meshBasicMaterial map={sprites.orb} transparent /></instancedMesh>
    {s.drops.map((d,i)=><Sprite key={`${d.kind}-${i}`} map={d.kind==='scratch'?sprites.scratch:sprites.nintendo} x={d.x} y={d.y+Math.sin(d.phase*4)*.12} scale={.72} z={2} />)}
  </>;
}

function ScratchModal({ reward, onBank }: { reward: ScratchReward; onBank:()=>void }) {
  const [revealed,setRevealed]=useState(false);
  return <div className="pixel-modal"><p>ROYAL SCRATCH // {reward.rarity}</p><h2>{revealed?reward.title:'SCRATCH TO REVEAL'}</h2><button className={`scratch-card ${revealed?'revealed':''}`} onPointerMove={(e)=>{if(e.buttons)setRevealed(true)}} onClick={()=>setRevealed(true)}>{revealed?<><strong>{reward.description}</strong><span>+{reward.bonusXp} XP</span></>:<span>████████████</span>}</button><button className="pixel-button" disabled={!revealed} onClick={onBank}>BANK REWARD</button></div>;
}

function NintendoModal({ mode, base, onDone }: { mode:Mini;base:number;onDone:(xp:number,label:string)=>void }) {
  const [time,setTime]=useState(mode==='dice'?4:15);const [score,setScore]=useState(0);const [done,setDone]=useState(false);
  useEffect(()=>{const id=window.setInterval(()=>setTime(t=>{if(t<=.1){window.clearInterval(id);setDone(true);return 0;}return t-.1}),100);return()=>window.clearInterval(id)},[]);
  useEffect(()=>{if(mode==='dice'){const id=window.setTimeout(()=>{setScore(1+Math.floor(Math.random()*6));setDone(true)},1100);return()=>window.clearTimeout(id)}},[mode]);
  const xp=mode==='dice'?Math.round(base*(.5+score*.3)):Math.round(base*(1+score*.12));
  return <div className="pixel-modal nintendo-modal"><p>LOST NINTENDO // {mode.toUpperCase()}</p><h2>{done?`${score} SCORE`:`${time.toFixed(1)}s`}</h2>{mode==='void'&&<VoidGame active={!done} score={score} setScore={setScore}/>} {mode==='click'&&<button className="click-core" disabled={done} onClick={()=>setScore(s=>s+1)}>CLICK</button>} {mode==='dice'&&<div className="pixel-die">{score||'?'}</div>}<button className="pixel-button" disabled={!done} onClick={()=>onDone(xp,`${mode.toUpperCase()} +${xp} XP`)}>COLLECT {xp} XP</button></div>;
}

function VoidGame({active,score,setScore}:{active:boolean;score:number;setScore:React.Dispatch<React.SetStateAction<number>>}){
  const [p,setP]=useState({x:50,y:50});const [food,setFood]=useState(()=>Array.from({length:12},(_,i)=>({id:i,x:5+Math.random()*90,y:8+Math.random()*84})));
  const move=(e:React.PointerEvent<HTMLDivElement>)=>{if(!active)return;const r=e.currentTarget.getBoundingClientRect(),n={x:(e.clientX-r.left)/r.width*100,y:(e.clientY-r.top)/r.height*100};setP(n);setFood(fs=>fs.map(f=>{if(Math.hypot(f.x-n.x,f.y-n.y)<5+score*.12){setScore(s=>s+1);return{...f,x:5+Math.random()*90,y:8+Math.random()*84}}return f}))};
  return <div className="void-game" onPointerMove={move}>{food.map(f=><i key={f.id} style={{left:`${f.x}%`,top:`${f.y}%`}}/>)}<b style={{left:`${p.x}%`,top:`${p.y}%`,transform:`translate(-50%,-50%) scale(${1+score*.035})`}}/></div>
}

export function WorkflowScene({ reducedMotion }: { readonly reducedMotion:boolean }) {
  const input=useRef<Vec>({x:0,y:0});const api=useRef<{xp:(n:number)=>void;temp:(r:ScratchReward)=>void}|null>(null);
  const [phase,setPhase]=useState<Phase>('ready');const [run,setRun]=useState(0);const [scratch,setScratch]=useState(0);const [nintendo,setNintendo]=useState(0);const [reward,setReward]=useState<ScratchReward|null>(null);const [mini,setMini]=useState<Mini>('dice');
  const [hud,setHud]=useState<Hud>({round:1,time:60,hp:100,level:1,xp:0,next:xpToNextLevel(1),kills:0,enemies:0});
  const [permanent,setPermanent]=useState<PermanentUpgrades>(()=>{try{return{...EMPTY_PERMANENT_UPGRADES,...JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}')}}catch{return EMPTY_PERMANENT_UPGRADES}});
  useEffect(()=>localStorage.setItem(STORAGE_KEY,JSON.stringify(permanent)),[permanent]);
  useEffect(()=>{const keys=new Set<string>();const update=()=>{const x=(keys.has('d')||keys.has('arrowright')?1:0)-(keys.has('a')||keys.has('arrowleft')?1:0),y=(keys.has('w')||keys.has('arrowup')?1:0)-(keys.has('s')||keys.has('arrowdown')?1:0);input.current={x,y}};const down=(e:KeyboardEvent)=>{const k=e.key.toLowerCase();if(['w','a','s','d','arrowup','arrowdown','arrowleft','arrowright'].includes(k)){e.preventDefault();keys.add(k);update()}if(k==='e'&&phase==='playing'&&scratch){setScratch(v=>v-1);setReward(rollScratchReward(Math.random,hud.round,hud.level));setPhase('scratch')}if(k==='q'&&phase==='playing'&&nintendo){setNintendo(v=>v-1);setMini((['void','click','dice'] as Mini[])[Math.floor(Math.random()*3)]!);setPhase('nintendo')}};const up=(e:KeyboardEvent)=>{keys.delete(e.key.toLowerCase());update()};window.addEventListener('keydown',down,{passive:false});window.addEventListener('keyup',up);return()=>{window.removeEventListener('keydown',down);window.removeEventListener('keyup',up)}},[phase,scratch,nintendo,hud]);
  const start=()=>{setRun(v=>v+1);setHud({round:1,time:60,hp:100,level:1,xp:0,next:xpToNextLevel(1),kills:0,enemies:0});setPhase('playing')};
  const bank=()=>{if(!reward)return;api.current?.xp(reward.bonusXp);if(reward.kind==='permanent')setPermanent(v=>incrementPermanentUpgrade(v,reward.stat));else api.current?.temp(reward);setReward(null);setPhase('playing')};
  return <div className="workflow-canvas bunny-horde-shell" tabIndex={0}>
    <Canvas orthographic dpr={1} frameloop={reducedMotion?'demand':'always'} gl={{antialias:false,powerPreference:'high-performance'}}><Field input={input} paused={phase!=='playing'} run={run} permanent={permanent} onHud={setHud} onDrop={k=>k==='scratch'?setScratch(v=>v+1):setNintendo(v=>v+1)} onDead={()=>setPhase('dead')} onApi={v=>{api.current=v}} /></Canvas>
    <div className="game-dither"/><div className="game-hud"><header><span>● BUNNY KING // CASINO FIELD</span><strong>R{hud.round.toString().padStart(2,'0')} · {Math.ceil(hud.time)}s</strong></header><label>HP <i style={{width:`${hud.hp}%`}}/></label><label>LVL {hud.level} <i style={{width:`${hud.xp/hud.next*100}%`}}/></label><footer><button disabled={!scratch||phase!=='playing'} onClick={()=>{setScratch(v=>v-1);setReward(rollScratchReward(Math.random,hud.round,hud.level));setPhase('scratch')}}>E SCRATCH ×{scratch}</button><span>{hud.kills} KILLS · {hud.enemies} HOSTILES</span><button disabled={!nintendo||phase!=='playing'} onClick={()=>{setNintendo(v=>v-1);setMini((['void','click','dice'] as Mini[])[Math.floor(Math.random()*3)]!);setPhase('nintendo')}}>Q NINTENDO ×{nintendo}</button></footer></div>
    {phase==='ready'&&<div className="game-cover"><p>PIXEL CASINO HORDE PROTOCOL</p><h2>BUNNY KING</h2><span>WASD · auto-fire · 60-second rounds · persistent rare upgrades</span><button className="pixel-button" onClick={start}>ENTER THE FIELD</button></div>}
    {phase==='dead'&&<div className="game-cover"><p>CROWN DOWN</p><h2>{hud.kills} BUNNIES</h2><span>Permanent scratch upgrades remain in this browser.</span><button className="pixel-button" onClick={start}>RECLAIM THE CROWN</button></div>}
    {phase==='scratch'&&reward&&<ScratchModal reward={reward} onBank={bank}/>} {phase==='nintendo'&&<NintendoModal mode={mini} base={nintendoXpBase(hud.round,hud.level)} onDone={(xp)=>{api.current?.xp(xp);setPhase('playing')}}/>}
    <div className="canvas-caption"><span>WASD · E scratch · Q console</span><span>instanced / pixel dither</span></div>
  </div>
}
