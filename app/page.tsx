export default function Home() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      gap: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#f9fafb'
    }}>
      <h1 style={{ fontSize: '48px', margin: 0, color: '#111' }}>
        🎉 Welcome to Lakay Social
      </h1>
      <p style={{ fontSize: '18px', color: '#666', margin: 0 }}>
        Your secure admin panel is ready!
      </p>
      <a 
        href="/settings" 
        style={{ 
          padding: '14px 28px', 
          background: '#0070f3', 
          color: 'white', 
          borderRadius: '8px', 
          textDecoration: 'none', 
          fontSize: '16px',
          fontWeight: '600'
        }}
      >
        Go to Settings →
      </a>
    </div>
  );
}