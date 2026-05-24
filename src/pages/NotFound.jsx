import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <div style={{ minHeight:'calc(100vh - 64px)', display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center', gap:'16px', padding:'24px' }}>
      <span style={{ fontSize:60 }}>🚧</span>
      <h1 style={{ fontSize:28, fontWeight:800, color:'var(--text)' }}>404 — Сторінку не знайдено</h1>
      <p style={{ color:'var(--text-3)', fontSize:15 }}>Такої сторінки не існує</p>
      <button
        onClick={() => navigate('/')}
        style={{ padding:'11px 24px', background:'var(--accent)', color:'#fff',
          border:'none', borderRadius:'var(--r-lg)', fontSize:14, fontWeight:600,
          cursor:'pointer', transition:'all var(--tr)' }}
      >
        ← На головну
      </button>
    </div>
  )
}