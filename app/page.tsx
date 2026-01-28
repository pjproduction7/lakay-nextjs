export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', gap: '20px' }}>
      <h1>Welcome to Lakay Social</h1>
      <p>Your secure admin panel is ready!</p>
      <a href="/settings" style={{ padding: '12px 24px', background: '#0070f3', color: 'white', borderRadius: '8px', textDecoration: 'none' }}>
        Go to Settings
      </a>
    </div>
  );
}