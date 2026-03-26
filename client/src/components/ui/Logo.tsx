interface LogoComponentProps {
    clickCallback: Function;
}

export default function Logo({ clickCallback }: LogoComponentProps) {
    return <div className="flex items-center">
    <a
      href="#"
      className="text-2xl font-extrabold tracking-tight group"
      onClick={(e) => { e.preventDefault(); clickCallback(); }}
    >
      <span className="text-primary font-['Audiowide',cursive] inline-block animate-glitch">modl</span>
      <span className="text-foreground font-['Audiowide',cursive]">.gg</span>
    </a>
  </div>
}
