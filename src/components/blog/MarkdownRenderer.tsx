import React from "react";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  // Simple, robust, lightweight markdown parser tailored for Grovision's design
  const parseMarkdown = (text: string) => {
    const lines = text.split("\n");
    const elements: React.ReactNode[] = [];
    let inList = false;
    let listItems: string[] = [];
    let inTable = false;
    let tableHeaders: string[] = [];
    let tableRows: string[][] = [];

    const flushList = () => {
      if (inList && listItems.length > 0) {
        elements.push(
          <ul key={`ul-${elements.length}`} className="my-4 space-y-2 pl-6 list-disc text-navy/80">
            {listItems.map((item, idx) => (
              <li key={idx} className="leading-relaxed">
                {renderInlineFormatting(item)}
              </li>
            ))}
          </ul>,
        );
        listItems = [];
        inList = false;
      }
    };

    const flushTable = () => {
      if (inTable && (tableHeaders.length > 0 || tableRows.length > 0)) {
        elements.push(
          <div
            key={`table-${elements.length}`}
            className="my-6 overflow-x-auto rounded border border-border"
          >
            <table className="w-full text-left text-xs sm:text-sm">
              {tableHeaders.length > 0 && (
                <thead className="border-b border-border bg-beige/60 text-navy font-semibold">
                  <tr>
                    {tableHeaders.map((h, i) => (
                      <th key={i} className="px-4 py-2.5">
                        {renderInlineFormatting(h)}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody className="divide-y divide-border bg-white text-navy/80">
                {tableRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-ivory transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-4 py-2.5">
                        {renderInlineFormatting(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>,
        );
        tableHeaders = [];
        tableRows = [];
        inTable = false;
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]!;
      const trimmed = line.trim();

      // Check if line is a table row
      if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
        flushList();
        const cells = trimmed
          .split("|")
          .map((c) => c.trim())
          .slice(1, -1);

        // Check if separator line like | :--- | :--- |
        if (cells.every((c) => /^:?-+:?$/.test(c))) {
          // separator row, skip
          continue;
        }

        if (!inTable) {
          inTable = true;
          tableHeaders = cells;
        } else {
          tableRows.push(cells);
        }
        continue;
      } else {
        flushTable();
      }

      // Check for horizontal divider
      if (trimmed === "---" || trimmed === "***") {
        flushList();
        elements.push(<hr key={`hr-${i}`} className="my-8 border-t border-border" />);
        continue;
      }

      // Check for headings
      if (trimmed.startsWith("### ")) {
        flushList();
        elements.push(
          <h3
            key={`h3-${i}`}
            className="mt-8 mb-3 font-display text-lg font-bold text-navy sm:text-xl"
          >
            {renderInlineFormatting(trimmed.slice(4))}
          </h3>,
        );
        continue;
      }

      if (trimmed.startsWith("## ")) {
        flushList();
        elements.push(
          <h2
            key={`h2-${i}`}
            className="mt-10 mb-4 font-display text-xl font-bold tracking-tight text-navy sm:text-2xl border-b border-border/60 pb-2"
          >
            {renderInlineFormatting(trimmed.slice(3))}
          </h2>,
        );
        continue;
      }

      if (trimmed.startsWith("# ")) {
        flushList();
        elements.push(
          <h1
            key={`h1-${i}`}
            className="mt-10 mb-4 font-display text-2xl font-bold text-navy sm:text-3xl"
          >
            {renderInlineFormatting(trimmed.slice(2))}
          </h1>,
        );
        continue;
      }

      // Check for blockquote
      if (trimmed.startsWith("> ")) {
        flushList();
        elements.push(
          <blockquote
            key={`bq-${i}`}
            className="my-6 border-l-4 border-gold bg-beige/40 px-5 py-4 font-medium italic text-navy/90 rounded-r"
          >
            {renderInlineFormatting(trimmed.slice(2))}
          </blockquote>,
        );
        continue;
      }

      // Check for list items
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        inList = true;
        listItems.push(trimmed.slice(2));
        continue;
      }

      // Check for checklist items like - [ ] or - [x]
      if (trimmed.startsWith("- [ ] ") || trimmed.startsWith("- [x] ")) {
        flushList();
        const isChecked = trimmed.startsWith("- [x] ");
        const text = trimmed.slice(6);
        elements.push(
          <div
            key={`check-${i}`}
            className="flex items-start gap-2.5 my-2 text-xs sm:text-sm text-navy/85"
          >
            <span
              className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                isChecked
                  ? "bg-emerald-600 border-emerald-600 text-white"
                  : "border-navy/30 bg-white"
              }`}
            >
              {isChecked && "✓"}
            </span>
            <span>{renderInlineFormatting(text)}</span>
          </div>,
        );
        continue;
      }

      // Regular paragraph or empty line
      flushList();
      if (trimmed.length > 0) {
        elements.push(
          <p key={`p-${i}`} className="my-3 text-sm sm:text-base leading-relaxed text-navy/80">
            {renderInlineFormatting(trimmed)}
          </p>,
        );
      }
    }

    flushList();
    flushTable();

    return elements;
  };

  const renderInlineFormatting = (text: string): React.ReactNode => {
    // Process bold, code, links
    // Split by markdown link pattern [text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(formatText(text.substring(lastIndex, match.index)));
      }
      const linkText = match[1] ?? "";
      const linkUrl = match[2] ?? "#";
      parts.push(
        <a
          key={`link-${match.index}`}
          href={linkUrl}
          className="font-medium text-gold hover:text-navy underline underline-offset-2 transition-colors"
        >
          {linkText}
        </a>,
      );
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push(formatText(text.substring(lastIndex)));
    }

    return parts.length > 0 ? parts : text;
  };

  const formatText = (text: string): React.ReactNode => {
    // Parse **bold** and `code`
    const tokens: React.ReactNode[] = [];
    const regex = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g;
    let last = 0;
    let m: RegExpExecArray | null;

    while ((m = regex.exec(text)) !== null) {
      if (m.index > last) {
        tokens.push(text.substring(last, m.index));
      }
      const token = m[0];
      if (token.startsWith("**") && token.endsWith("**")) {
        tokens.push(
          <strong key={`b-${m.index}`} className="font-semibold text-navy">
            {token.slice(2, -2)}
          </strong>,
        );
      } else if (token.startsWith("`") && token.endsWith("`")) {
        tokens.push(
          <code
            key={`c-${m.index}`}
            className="rounded bg-beige/80 px-1.5 py-0.5 font-mono text-xs text-navy border border-border"
          >
            {token.slice(1, -1)}
          </code>,
        );
      } else if (token.startsWith("*") && token.endsWith("*")) {
        tokens.push(
          <em key={`i-${m.index}`} className="italic">
            {token.slice(1, -1)}
          </em>,
        );
      }
      last = m.index + token.length;
    }

    if (last < text.length) {
      tokens.push(text.substring(last));
    }

    return tokens.length > 0 ? tokens : text;
  };

  return <div className={`space-y-2 ${className}`}>{parseMarkdown(content)}</div>;
}
