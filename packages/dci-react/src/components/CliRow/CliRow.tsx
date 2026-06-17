import { useState } from 'react';
import { Button, Icon } from '@iskra-dci/react';
import './CliRow.css';

export interface CliRowProps {
  /** The command string to display and copy. */
  command: string;
  /** Custom copy handler. Defaults to the Clipboard API. */
  onCopy?: (command: string) => void;
  copyLabel?: string;
  copiedLabel?: string;
  className?: string;
}

/**
 * CliRow — monospace command row with a copy-to-clipboard affordance. Used to
 * surface the equivalent API/CLI call for an action performed in the UI.
 */
export function CliRow({
  command,
  onCopy,
  copyLabel = 'Copy',
  copiedLabel = 'Copied',
  className,
}: CliRowProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (onCopy) {
      onCopy(command);
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      void navigator.clipboard.writeText(command);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={['dci-cli', className].filter(Boolean).join(' ')}>
      <span className="dci-cli-icon" aria-hidden="true">
        &lt;/&gt;
      </span>
      <code className="dci-cli-text">{command}</code>
      <Button
        variant="outline"
        size="s"
        onClick={handleCopy}
        iconBefore={<Icon name={copied ? 'check' : 'copy'} size={13} />}
      >
        {copied ? copiedLabel : copyLabel}
      </Button>
    </div>
  );
}
