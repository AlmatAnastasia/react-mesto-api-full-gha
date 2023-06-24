export default function Footer() {
  return (
    // Блок 4 footer
    <footer className="footer">
      <p className="footer__copyright">
        &copy; {new Date().getFullYear()} Mesto Russia
      </p>
    </footer>
  );
}