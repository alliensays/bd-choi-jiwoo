import { useState } from "react"

export default function LoginPage({ onLoginSuccess, onCancel }: { onLoginSuccess: () => void; onCancel?: () => void }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleLogin = () => {
    if (email === "admin@jiwoo.com" && password === "heart2heart") {
      setError(null)
      onLoginSuccess()
    } else {
      setError("Email atau kata sandi salah.")
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#faf9f6", padding: "24px" }}>
      <div style={{ width: "100%", maxWidth: "420px", background: "#fff", border: "1px solid #ebe3d6", borderRadius: "16px", padding: "28px", boxShadow: "0 12px 40px rgba(0,0,0,0.06)" }}>
        <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 600 }}>Admin Login</h2>
        <p style={{ marginTop: "10px", marginBottom: "18px", color: "rgba(30,26,22,0.54)", fontFamily: "var(--font-body)" }}>Masuk untuk mengakses panel admin.</p>

        <label style={{ display: "block", marginBottom: "12px" }}>
          <div style={{ fontSize: "12px", marginBottom: "6px", fontFamily: "var(--font-mono)" }}>Email</div>
          <input value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid #dcd6c9" }} />
        </label>

        <label style={{ display: "block", marginBottom: "12px" }}>
          <div style={{ fontSize: "12px", marginBottom: "6px", fontFamily: "var(--font-mono)" }}>Password</div>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid #dcd6c9" }} />
        </label>

        {error && <div style={{ color: "#9b2c2c", marginBottom: "12px" }}>{error}</div>}

        <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
          <button type="button" onClick={handleLogin} style={{ flex: "1", border: "1px solid #c4d4bc", borderRadius: "999px", background: "#eef4ea", padding: "10px 14px", cursor: "pointer" }}>Login</button>
          <button type="button" onClick={() => onCancel?.()} style={{ flex: "1", border: "1px solid #d6c6b0", borderRadius: "999px", background: "#fff", padding: "10px 14px", cursor: "pointer" }}>Batal</button>
        </div>
      </div>
    </div>
  )
}
