import { useState } from "react";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleClick = async () => {
    setLoading(true);
    setResult("");
    try {
      const res = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
          import.meta.env.VITE_GEMINI_API_KEY,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text:
                      "Crée une grille d’évaluation critériée pour la compétence : repérer le sujet dans une phrase simple (CE1, français).",
                  },
                ],
              },
            ],
          }),
        }
      );
      const data = await res.json();
      setResult(
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
          "Aucune réponse reçue."
      );
    } catch (e: any) {
      setResult("Erreur : " + e?.message ?? String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h1>🧮 Éval’Lab</h1>
      <p>Génère une grille d’évaluation avec Gemini.</p>
      <button onClick={handleClick} disabled={loading}>
        {loading ? "Génération en cours…" : "Générer une grille"}
      </button>
      {!!result && (
        <pre style={{ whiteSpace: "pre-wrap", background: "#f5f5f5", padding: 16, marginTop: 16, borderRadius: 8 }}>
          {result}
        </pre>
      )}
    </div>
  );
}
