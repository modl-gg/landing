interface LogoComponentProps {
    clickCallback: Function;
}

export default function Logo({ clickCallback }: LogoComponentProps) {
    return <div className="flex items-center">
    <a
      href="#"
      className="text-2xl font-extrabold tracking-tight"
      onClick={(e) => { e.preventDefault(); clickCallback(); }}
    >
      <span className="text-primary font-['Audiowide',cursive]">modl</span>
      <span className="text-white font-['Audiowide',cursive]">.gg</span>
    </a>
  </div>
}