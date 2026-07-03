import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <p className="font-heading font-extrabold text-8xl text-gold/20 mb-4">404</p>
      <h1 className="font-heading font-bold text-2xl text-cream mb-2">Page Not Found</h1>
      <p className="text-muted text-sm mb-8">This page doesn't exist — but the music does.</p>
      <Link href="/" className="btn-gold">Back to Home</Link>
    </div>
  );
}
