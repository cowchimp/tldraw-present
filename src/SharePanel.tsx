import { TldrawUiButton, TldrawUiIcon } from "tldraw";
import { useWelcomeDialog } from "./WelcomeDialog/useWelcomeDialog";

export function SharePanel() {
  const { showDialog } = useWelcomeDialog();

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <TldrawUiButton type="icon" onClick={showDialog}>
        <TldrawUiIcon icon="help" label="Help" />
      </TldrawUiButton>
      <Link href="https://yonatan.dev" icon="blog" label="Visit my blog" />
      <Link href="https://twitter.com/cowchimp" icon="twitter" label="Reach out on Twitter" />
      <Link href="https://github.com/cowchimp/tldraw-present" icon="github" label="View source code on GitHub" />
    </div>
  );
}

function Link({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <a href={href} title={label} className="tlui-button" target="_blank" rel="noopener noreferrer">
      <TldrawUiIcon icon={icon} label={label} />
    </a>
  );
}
