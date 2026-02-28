import React, { useRef, useEffect } from "react";
import JoditEditor from "jodit-react";

export interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  config?: Record<string, unknown>;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder,
  config = {},
}) => {
  type EditorCandidate = {
    getEditorValue?: () => string;
    setEditorValue?: (value: string) => void;
    editor?: EditorCandidate;
    element?: HTMLElement;
  };

  const editor = useRef<EditorCandidate | null>(null);

  // merge defaults with passed config
  const defaultConfig: Record<string, unknown> = {
    readonly: false,
    placeholder: placeholder || "",
    height: 300,
    toolbarAdaptive: true,
    ...config,
  };

  // JoditEditor does not update its internal state when the value prop changes
  // so we make sure to set it manually if someone controls the value externally.
  useEffect(() => {
    const inst = editor.current as EditorCandidate | null;
    if (!inst) return;

    // Try several strategies to update the editor content without assuming a specific shape.
    try {
      // 1. Direct instance methods
      if (
        typeof inst.getEditorValue === "function" &&
        typeof inst.setEditorValue === "function"
      ) {
        if (inst.getEditorValue() !== value) inst.setEditorValue(value);
        return;
      }

      // 2. Nested editor object methods
      const nested = inst.editor;
      if (
        nested &&
        typeof nested.getEditorValue === "function" &&
        typeof nested.setEditorValue === "function"
      ) {
        if (nested.getEditorValue() !== value) nested.setEditorValue(value);
        return;
      }

      // 3. Fallback: find a contenteditable element inside the instance and set innerHTML
      const root: HTMLElement | null = inst.element || (inst as HTMLElement);
      if (root) {
        const editable = root.querySelector(
          '[contenteditable="true"]'
        ) as HTMLElement | null;
        if (editable && editable.innerHTML !== value) {
          editable.innerHTML = value;
        }
      }
    } catch {
      // swallow errors to avoid crashing the app at runtime
    }
  }, [value]);

  return (
    <JoditEditor
      ref={(instance) => {
        editor.current = instance as unknown as EditorCandidate | null;
      }}
      value={value}
      config={defaultConfig}
      tabIndex={0} // tabIndex of textarea
      onBlur={(newContent) => onChange(newContent)}
      onChange={() => {
        /* required by jodit-react but we handle updates onBlur */
      }}
    />
  );
};

export default RichTextEditor;
