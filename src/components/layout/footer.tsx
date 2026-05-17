export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto px-4 py-8 text-center text-sm text-zinc-500">
        &copy; {new Date().getFullYear()} EC Shop. All rights reserved.
      </div>
    </footer>
  );
}
