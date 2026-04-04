interface LogoComponentProps {
    clickCallback: () => void;
}

export default function Logo({ clickCallback }: LogoComponentProps) {
    return <div className="flex items-center">
    <a
      href="#"
      className="text-2xl font-extrabold tracking-tight group"
      onClick={(e) => { e.preventDefault(); clickCallback(); }}
    >
      <span className="text-primary font-brand inline-block">modl</span>
      <span className="text-foreground font-brand">.gg</span>
    </a>
  </div>
}
