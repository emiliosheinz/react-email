export default function Home() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>React Email Hydration Issue Reproduction</h1>
      <p>This reproduction demonstrates hydration markers being added to emails.</p>
      <h2>Test the issue:</h2>
      <ul>
        <li>
          <strong>API Route:</strong> <code>curl http://localhost:3000/api/test</code>
        </li>
        <li>
          <strong>Standalone:</strong> <code>node test.mjs</code>
        </li>
      </ul>
    </div>
  )
}
