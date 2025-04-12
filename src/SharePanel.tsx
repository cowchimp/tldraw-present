import { TldrawUiIcon } from "tldraw";

export function SharePanel() {
  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <Link href="https://yonatan.dev" icon="blog" label="Visit my blog" />
      <Link href="https://twitter.com/cowchimp" icon="twitter" label="Reach out on Twitter" />
      <Link href="https://github.com/cowchimp/tldraw-present" icon="github" label="View source code on GitHub" />
    </div>
  );
}

function Link({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <a href={href} title={label} className="tlui-button" target="_blank" rel="noopener noreferrer">
      <TldrawUiIcon icon={icon} />
    </a>
  );
}
