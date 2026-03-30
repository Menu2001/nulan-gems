export default function PlaceholderPage({ title }) {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#020617",
        color: "#ffffff",
        paddingTop: "80px",
        textAlign: "center"
      }}
    >
      <div>
        <h1>{title}</h1>
        <p>This page will be developed next.</p>
      </div>
    </main>
  );
}