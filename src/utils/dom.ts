export function createDiv(): HTMLDivElement {
  return document.createElement("div");
}

export function createButton(content?: string): HTMLButtonElement {
  const button = document.createElement("button");

  if (content) {
    button.textContent = content;
  }

  return button;
}

export function createSpan(content: string): HTMLSpanElement {
  const span = document.createElement("span");
  span.textContent = content;
  return span;
}

export function createParagraph(content: string): HTMLParagraphElement {
  const paragraph = document.createElement("p");
  paragraph.textContent = content;
  return paragraph;
}

export function createInput(
  type: string,
  placeholder?: string
): HTMLInputElement {
  const input = document.createElement("input");
  input.type = type;

  if (placeholder) {
    input.placeholder = placeholder;
  }

  return input;
}

export function createSelect(): HTMLSelectElement {
  return document.createElement("select");
}

export function createSelectOption(
  value: string,
  content: string
): HTMLOptionElement {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = content;
  return option;
}
