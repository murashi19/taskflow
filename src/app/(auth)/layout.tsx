export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-8 sm:px-6">
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-600/30 blur-3xl" />
      <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="relative w-full max-w-md">{children}</div>
    </div>
  );
}
