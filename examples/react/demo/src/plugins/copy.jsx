import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

function CopyContenet() {
  return (
    <CopyToClipboard
      text="Copy to clipboard with span"
      onCopy={() => alert("已成功复制到剪切板")}
    >
      <button>Copy to clipboard with span</button>
    </CopyToClipboard>
  );
}

export default CopyContenet;
