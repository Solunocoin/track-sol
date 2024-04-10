'use client';

import InfoTip from '../InfoTip/InfoTip';
import styles from './Clipboard.module.scss';

const Clipboard = ({ text, title }: IClipboard) => {
  return (
    <div className={styles.clipboard}>
      <h3>{title}:</h3>
      <button
        onClick={() => {
          navigator.clipboard.writeText(text);
        }}
      >
        <div className={styles.clipboardText}>
          {text.substring(0, 6)}...
          {text.substring(text.length - 7)}
        </div>
        <InfoTip
          id="tool-tip-copy-contract"
          description="Copy Address"
          type="copy"
        />
      </button>
    </div>
  );
};

export default Clipboard;
