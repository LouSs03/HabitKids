export function ChildLoginPage() {
  return (
    <main>
      <h2>Hola, pequeño héroe</h2>
      <p>Ingresa con tu usuario y pin para ver tus rutinas de hoy.</p>
      <form>
        <input type="text" placeholder="Usuario" />
        <input type="password" placeholder="PIN" />
        <button type="submit">Entrar</button>
      </form>
    </main>
  );
}
